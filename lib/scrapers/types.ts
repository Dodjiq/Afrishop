/**
 * Types pour le système de scraping AfriShop
 */

export interface ScrapedProduct {
  // Informations de base
  name: string
  description: string
  price: number
  currency: string
  originalPrice?: number
  discount?: number

  // Images
  images: string[]
  thumbnail?: string

  // Catégorie et tags
  category?: string
  tags?: string[]

  // Détails produit
  specifications?: Record<string, string>
  features?: string[]
  variants?: ProductVariant[]

  // Informations vendeur
  seller?: {
    name: string
    rating?: number
    totalReviews?: number
  }

  // Avis et notes
  rating?: number
  reviewCount?: number
  reviews?: ProductReview[]

  // Stock et livraison
  inStock?: boolean
  shippingInfo?: {
    cost?: number
    estimatedDays?: string
    freeShipping?: boolean
  }

  // Métadonnées source
  source: {
    platform: Platform
    url: string
    productId: string
    scrapedAt: string
  }
}

export interface ProductVariant {
  name: string
  options: string[]
  price?: number
  image?: string
  inStock?: boolean
}

export interface ProductReview {
  author: string
  rating: number
  comment: string
  date?: string
  verified?: boolean
}

export type Platform = 'aliexpress' | 'amazon' | 'jumia' | 'temu' | 'shein'

export interface ScraperResult {
  success: boolean
  data?: ScrapedProduct
  error?: string
  cached?: boolean
  cacheExpiresAt?: Date
}

export interface ScraperOptions {
  useCache?: boolean
  cacheDuration?: number // en jours
  timeout?: number // en ms
  userAgent?: string
}

export abstract class BaseScraper {
  protected platform: Platform
  protected timeout: number
  protected userAgent: string

  constructor(platform: Platform, options?: ScraperOptions) {
    this.platform = platform
    this.timeout = options?.timeout || 30000
    this.userAgent = options?.userAgent || this.getDefaultUserAgent()
  }

  abstract scrape(url: string, options?: ScraperOptions): Promise<ScraperResult>

  protected getDefaultUserAgent(): string {
    return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }

  protected isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  protected extractProductId(url: string): string | null {
    // À implémenter dans chaque scraper spécifique
    return null
  }
}
