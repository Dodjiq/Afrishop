/**
 * Jumia Scraper
 * Scrape les données produit depuis Jumia (leader e-commerce en Afrique)
 */

import { BaseScraper, ScraperResult, ScraperOptions, ScrapedProduct } from './types'
import * as cheerio from 'cheerio'

export class JumiaScraper extends BaseScraper {
  constructor(options?: ScraperOptions) {
    super('jumia', options)
  }

  async scrape(url: string, options?: ScraperOptions): Promise<ScraperResult> {
    try {
      if (!this.isValidUrl(url) || !this.isJumiaUrl(url)) {
        return {
          success: false,
          error: 'URL Jumia invalide',
        }
      }

      const productId = this.extractProductId(url)
      if (!productId) {
        return {
          success: false,
          error: 'Impossible d\'extraire l\'ID du produit',
        }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return {
          success: false,
          error: `Erreur HTTP: ${response.status}`,
        }
      }

      const html = await response.text()
      const $ = cheerio.load(html)

      const product = await this.extractProductData($, url, productId)

      return {
        success: true,
        data: product,
      }
    } catch (error: any) {
      console.error('Jumia scraping error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors du scraping Jumia',
      }
    }
  }

  private async extractProductData(
    $: cheerio.CheerioAPI,
    url: string,
    productId: string
  ): Promise<ScrapedProduct> {
    const name = this.extractName($)
    const price = this.extractPrice($)
    const images = this.extractImages($)
    const description = this.extractDescription($)

    return {
      name,
      description,
      price: price.current,
      currency: price.currency,
      originalPrice: price.original,
      discount: price.discount,
      images,
      thumbnail: images[0],
      rating: this.extractRating($),
      reviewCount: this.extractReviewCount($),
      inStock: this.extractStock($),
      specifications: this.extractSpecifications($),
      seller: this.extractSeller($),
      shippingInfo: this.extractShipping($),
      source: {
        platform: 'jumia',
        url,
        productId,
        scrapedAt: new Date().toISOString(),
      },
    }
  }

  private extractName($: cheerio.CheerioAPI): string {
    const selectors = [
      'h1.-fs20.-pts.-pbxs',
      'h1.title',
      '.name',
      'h1[class*="title"]',
    ]

    for (const selector of selectors) {
      const text = $(selector).text().trim()
      if (text) return text
    }

    return 'Produit Jumia'
  }

  private extractPrice($: cheerio.CheerioAPI): {
    current: number
    original?: number
    currency: string
    discount?: number
  } {
    // Prix actuel
    let current = 0
    const priceSelectors = [
      '.-b.-ubpt.-tal.-fs24.-prxs',
      '.price-box .current',
      '[class*="price"].-b',
      'span.-tal.-gy5',
    ]

    for (const selector of priceSelectors) {
      const priceText = $(selector).first().text().trim()
      const match = priceText.match(/[\d\s,]+/)
      if (match) {
        current = parseFloat(match[0].replace(/[\s,]/g, ''))
        break
      }
    }

    // Prix original (barré)
    let original: number | undefined
    const originalSelectors = [
      '.-tal.-gy5.-lthr.-s',
      '.price-box .old',
      'span[class*="old"]',
    ]

    for (const selector of originalSelectors) {
      const originalText = $(selector).text().trim()
      const match = originalText.match(/[\d\s,]+/)
      if (match) {
        original = parseFloat(match[0].replace(/[\s,]/g, ''))
        break
      }
    }

    // Devise (dépend du pays Jumia)
    let currency = 'XOF' // CFA par défaut pour Afrique de l'Ouest
    const currencyText = $('.-b.-ubpt.-tal.-fs24.-prxs').text().trim()
    if (currencyText.includes('FCFA') || currencyText.includes('CFA')) currency = 'XOF'
    else if (currencyText.includes('MAD')) currency = 'MAD'
    else if (currencyText.includes('EGP')) currency = 'EGP'
    else if (currencyText.includes('KES')) currency = 'KES'
    else if (currencyText.includes('NGN')) currency = 'NGN'

    // Discount percentage
    const discountText = $('.-paxs').text().trim()
    const discountMatch = discountText.match(/(\d+)%/)
    const discount = discountMatch ? parseInt(discountMatch[1]) : undefined

    return { current, original, currency, discount }
  }

  private extractImages($: cheerio.CheerioAPI): string[] {
    const images: string[] = []

    // Galerie d'images Jumia
    $('.itm').each((_, element) => {
      const src = $(element).attr('data-src') || $(element).find('img').attr('src')
      if (src) {
        // Convertir en haute résolution
        const highResSrc = src.replace(/\/s\d+\//, '/s1000/')
        if (!images.includes(highResSrc)) {
          images.push(highResSrc)
        }
      }
    })

    // Image principale
    const mainImage = $('img[data-src*="product"]').first().attr('data-src')
    if (mainImage) {
      const highResSrc = mainImage.replace(/\/s\d+\//, '/s1000/')
      if (!images.includes(highResSrc)) {
        images.unshift(highResSrc)
      }
    }

    return images.length > 0 ? images : ['https://placehold.co/600x600/e5e5e5/666666?text=Jumia']
  }

  private extractDescription($: cheerio.CheerioAPI): string {
    const descriptions: string[] = []

    // Description principale
    $('.markup').each((_, element) => {
      const text = $(element).text().trim()
      if (text && text.length > 20) {
        descriptions.push(text)
      }
    })

    // Points clés
    $('.-fs14.-pvxs').each((_, element) => {
      const text = $(element).text().trim()
      if (text && !descriptions.includes(text)) {
        descriptions.push(text)
      }
    })

    return descriptions.join('\n\n') || 'Produit importé depuis Jumia'
  }

  private extractSpecifications($: cheerio.CheerioAPI): Record<string, string> {
    const specs: Record<string, string> = {}

    // Tableau de spécifications Jumia
    $('.markup tbody tr, .-pvs.-bt tbody tr').each((_, element) => {
      const key = $(element).find('th').text().trim()
      const value = $(element).find('td').text().trim()
      if (key && value) {
        specs[key] = value
      }
    })

    return specs
  }

  private extractRating($: cheerio.CheerioAPI): number | undefined {
    const ratingText = $('.stars').attr('class') || ''
    const match = ratingText.match(/stars_(\d)/)
    if (match) {
      return parseInt(match[1])
    }

    // Alternative
    const ratingAlt = $('[class*="rating"]').text().trim()
    const matchAlt = ratingAlt.match(/([\d.]+)/)
    return matchAlt ? parseFloat(matchAlt[1]) : undefined
  }

  private extractReviewCount($: cheerio.CheerioAPI): number | undefined {
    const countText = $('.-fs14.-m').text().trim()
    const match = countText.match(/(\d+)\s+verified/i)
    return match ? parseInt(match[1]) : undefined
  }

  private extractStock($: cheerio.CheerioAPI): boolean {
    const stockText = $('body').text().toLowerCase()
    return !stockText.includes('out of stock') &&
           !stockText.includes('rupture de stock') &&
           !stockText.includes('indisponible')
  }

  private extractSeller($: cheerio.CheerioAPI): { name: string; rating?: number } | undefined {
    const sellerName = $('.-df.-i-ctr a[href*="seller"]').text().trim()
    if (sellerName) {
      return {
        name: sellerName || 'Jumia Seller',
      }
    }
    return undefined
  }

  private extractShipping($: cheerio.CheerioAPI): {
    cost?: number
    estimatedDays?: string
    freeShipping?: boolean
  } {
    const shippingText = $('.-fs14.-phm').text().trim()

    const freeShipping = shippingText.toLowerCase().includes('free') ||
                         shippingText.toLowerCase().includes('gratuit')

    // Extraire coût
    const costMatch = shippingText.match(/(\d+)\s*FCFA/)
    const cost = costMatch ? parseInt(costMatch[1]) : undefined

    // Extraire délai
    const daysMatch = shippingText.match(/(\d+-?\d*)\s*(?:jours?|days?)/i)
    const estimatedDays = daysMatch ? daysMatch[1] + ' jours' : undefined

    return {
      cost: freeShipping ? 0 : cost,
      estimatedDays,
      freeShipping,
    }
  }

  protected extractProductId(url: string): string | null {
    // Jumia URLs: https://www.jumia.ci/product-name-12345.html
    const match = url.match(/-(\d+)\.html/)
    return match ? match[1] : null
  }

  private isJumiaUrl(url: string): boolean {
    return url.includes('jumia.')
  }
}
