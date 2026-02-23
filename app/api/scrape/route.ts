import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getScraperForUrl, detectPlatform } from "@/lib/scrapers"

// Rate limiting simple en mémoire (production: utiliser Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 10 // 10 requêtes
const RATE_LIMIT_WINDOW = 60000 // par minute

/**
 * POST /api/scrape
 * Scrape un produit depuis une URL
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Vérifier l'authentification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      )
    }

    // Rate limiting par user
    const rateLimitKey = `scrape:${user.id}`
    const now = Date.now()
    const userLimit = rateLimitMap.get(rateLimitKey)

    if (userLimit) {
      if (now < userLimit.resetAt) {
        if (userLimit.count >= RATE_LIMIT_MAX) {
          return NextResponse.json(
            {
              error: "Limite de scraping atteinte",
              details: "Veuillez patienter 1 minute avant de réessayer",
              retryAfter: Math.ceil((userLimit.resetAt - now) / 1000),
            },
            { status: 429 }
          )
        }
        userLimit.count++
      } else {
        // Reset window
        rateLimitMap.set(rateLimitKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
      }
    } else {
      rateLimitMap.set(rateLimitKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    }

    const body = await request.json()
    const { url, useCache = true } = body

    // Validation
    if (!url) {
      return NextResponse.json(
        { error: "URL requise" },
        { status: 400 }
      )
    }

    // Détecter la plateforme
    const platform = detectPlatform(url)
    if (!platform) {
      return NextResponse.json(
        {
          error: "Plateforme non supportée",
          details: "Plateformes supportées: AliExpress, Amazon, Jumia",
        },
        { status: 400 }
      )
    }

    // 1. Vérifier le cache d'abord
    if (useCache) {
      const { data: cachedProduct, error: cacheError } = await supabase
        .from("scraped_products")
        .select("*")
        .eq("product_url", url)
        .gte("cache_expires_at", new Date().toISOString())
        .maybeSingle()

      if (cachedProduct && !cacheError) {
        console.log("✅ Produit trouvé en cache:", url)

        // Log l'import
        await supabase.from("product_imports").insert({
          user_id: user.id,
          platform,
          product_url: url,
          product_data: cachedProduct.data,
          status: "success",
        })

        return NextResponse.json({
          success: true,
          data: cachedProduct.data,
          cached: true,
          cacheExpiresAt: cachedProduct.cache_expires_at,
        })
      }
    }

    // 2. Scraper le produit
    console.log("🔍 Scraping produit:", url, "Platform:", platform)

    const scraper = getScraperForUrl(url, {
      timeout: 30000,
      useCache,
    })

    const result = await scraper.scrape(url)

    if (!result.success || !result.data) {
      // Log l'échec
      await supabase.from("product_imports").insert({
        user_id: user.id,
        platform,
        product_url: url,
        product_data: null,
        status: "failed",
        error_message: result.error || "Erreur inconnue",
      })

      return NextResponse.json(
        {
          success: false,
          error: result.error || "Impossible de scraper ce produit",
        },
        { status: 500 }
      )
    }

    // 3. Sauvegarder en cache
    const cacheExpiresAt = new Date()
    cacheExpiresAt.setDate(cacheExpiresAt.getDate() + 7) // Cache de 7 jours

    const { error: insertError } = await supabase
      .from("scraped_products")
      .upsert(
        {
          platform,
          product_url: url,
          product_id: result.data.source.productId,
          data: result.data,
          scrape_success: true,
          cache_expires_at: cacheExpiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "product_url",
        }
      )

    if (insertError) {
      console.error("Erreur sauvegarde cache:", insertError)
    }

    // 4. Log l'import réussi
    await supabase.from("product_imports").insert({
      user_id: user.id,
      platform,
      product_url: url,
      product_data: result.data,
      status: "success",
    })

    return NextResponse.json({
      success: true,
      data: result.data,
      cached: false,
    })
  } catch (error: any) {
    console.error("Scraping error:", error)
    return NextResponse.json(
      {
        error: "Erreur serveur lors du scraping",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/scrape/platforms
 * Obtenir la liste des plateformes supportées
 */
export async function GET(request: NextRequest) {
  const platforms = [
    {
      id: "aliexpress",
      name: "AliExpress",
      icon: "🛍️",
      description: "Leader mondial du e-commerce B2C",
      countries: ["Global"],
      exampleUrl: "https://www.aliexpress.com/item/1234567890.html",
    },
    {
      id: "amazon",
      name: "Amazon",
      icon: "📦",
      description: "Marketplace mondiale #1",
      countries: ["Global"],
      exampleUrl: "https://www.amazon.com/dp/B08N5WRWNW",
    },
    {
      id: "jumia",
      name: "Jumia",
      icon: "🌍",
      description: "Leader e-commerce en Afrique",
      countries: [
        "Côte d'Ivoire",
        "Sénégal",
        "Nigeria",
        "Kenya",
        "Ghana",
        "Maroc",
        "Egypte",
      ],
      exampleUrl: "https://www.jumia.ci/product-name-12345.html",
    },
  ]

  return NextResponse.json({ platforms })
}
