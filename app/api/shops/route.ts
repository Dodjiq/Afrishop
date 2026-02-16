import { NextRequest, NextResponse } from "next/server"

// Type definitions
export interface Shop {
  id: string
  userId?: string
  name: string
  productData: {
    name: string
    description: string
    price: number
    images?: string[]
    features?: string[]
  }
  shopConfig: {
    brandColor: string
    brandTone: string
    fontPair?: string
    sections: any[]
  }
  createdAt: string
  updatedAt: string
  status: "draft" | "published" | "archived"
  url?: string
}

// In-memory storage (remplacer par une vraie DB plus tard)
let shops: Shop[] = []

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    // Filtrer par userId si fourni
    const filteredShops = userId
      ? shops.filter((shop) => shop.userId === userId)
      : shops

    return NextResponse.json({
      shops: filteredShops,
      total: filteredShops.length,
    })
  } catch (error) {
    console.error("Error fetching shops:", error)
    return NextResponse.json(
      { error: "Failed to fetch shops" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, productData, shopConfig, userId } = body

    // Validation
    if (!name || !productData || !shopConfig) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Créer un nouvel ID unique
    const shopId = `shop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Générer l'URL de la boutique
    const shopUrl = `${shopConfig.shopName || name}`.toLowerCase().replace(/\s+/g, "-")

    const newShop: Shop = {
      id: shopId,
      userId: userId || "anonymous",
      name,
      productData,
      shopConfig,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "published",
      url: `https://${shopUrl}.afrishop.com`,
    }

    shops.push(newShop)

    return NextResponse.json(
      {
        success: true,
        shop: newShop,
        message: "Boutique créée avec succès",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating shop:", error)
    return NextResponse.json(
      { error: "Failed to create shop" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Shop ID required" }, { status: 400 })
    }

    const shopIndex = shops.findIndex((shop) => shop.id === id)

    if (shopIndex === -1) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 })
    }

    shops[shopIndex] = {
      ...shops[shopIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      shop: shops[shopIndex],
    })
  } catch (error) {
    console.error("Error updating shop:", error)
    return NextResponse.json(
      { error: "Failed to update shop" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Shop ID required" }, { status: 400 })
    }

    const shopIndex = shops.findIndex((shop) => shop.id === id)

    if (shopIndex === -1) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 })
    }

    shops.splice(shopIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Shop deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting shop:", error)
    return NextResponse.json(
      { error: "Failed to delete shop" },
      { status: 500 }
    )
  }
}
