/**
 * Amazon Scraper
 * Scrape les données produit depuis Amazon
 */

import { BaseScraper, ScraperResult, ScraperOptions, ScrapedProduct } from './types'
import * as cheerio from 'cheerio'

export class AmazonScraper extends BaseScraper {
  constructor(options?: ScraperOptions) {
    super('amazon', options)
  }

  async scrape(url: string, options?: ScraperOptions): Promise<ScraperResult> {
    try {
      if (!this.isValidUrl(url) || !this.isAmazonUrl(url)) {
        return {
          success: false,
          error: 'URL Amazon invalide',
        }
      }

      const productId = this.extractProductId(url)
      if (!productId) {
        return {
          success: false,
          error: 'Impossible d\'extraire l\'ASIN du produit',
        }
      }

      // Amazon bloque souvent les scrapers, utiliser une approche plus subtile
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return {
          success: false,
          error: `Erreur HTTP: ${response.status}. Amazon peut bloquer le scraping.`,
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
      console.error('Amazon scraping error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors du scraping Amazon',
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
      features: this.extractFeatures($),
      source: {
        platform: 'amazon',
        url,
        productId,
        scrapedAt: new Date().toISOString(),
      },
    }
  }

  private extractName($: cheerio.CheerioAPI): string {
    const selectors = [
      '#productTitle',
      '#title',
      'h1.product-title',
      'span[id*="productTitle"]',
    ]

    for (const selector of selectors) {
      const text = $(selector).text().trim()
      if (text) return text
    }

    return 'Produit Amazon'
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
      '.a-price .a-offscreen',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '.a-price-whole',
    ]

    for (const selector of priceSelectors) {
      const priceText = $(selector).first().text().trim()
      const match = priceText.match(/[\d.,]+/)
      if (match) {
        current = parseFloat(match[0].replace(',', '.'))
        break
      }
    }

    // Prix original (barré)
    let original: number | undefined
    const originalText = $('.a-price.a-text-price .a-offscreen').text().trim()
    const originalMatch = originalText.match(/[\d.,]+/)
    if (originalMatch) {
      original = parseFloat(originalMatch[0].replace(',', '.'))
    }

    // Devise
    const currencySymbol = $('.a-price-symbol').first().text().trim()
    let currency = 'USD'
    if (currencySymbol === '€') currency = 'EUR'
    else if (currencySymbol === '$') currency = 'USD'
    else if (currencySymbol === '£') currency = 'GBP'

    // Discount
    const discountText = $('.savingsPercentage').text().trim()
    const discountMatch = discountText.match(/(\d+)/)
    const discount = discountMatch ? parseInt(discountMatch[1]) : undefined

    return { current, original, currency, discount }
  }

  private extractImages($: cheerio.CheerioAPI): string[] {
    const images: string[] = []

    // Images principales
    $('#imgBlkFront').attr('data-a-dynamic-image')?.split(',').forEach((img) => {
      const match = img.match(/"(https?:\/\/[^"]+)"/)
      if (match && !images.includes(match[1])) {
        images.push(match[1])
      }
    })

    // Galerie d'images
    $('.imageThumbnail img').each((_, element) => {
      const src = $(element).attr('src')
      if (src && !images.includes(src)) {
        // Remplacer les miniatures par les images en haute résolution
        const highResSrc = src.replace(/_[A-Z]{2}\d+_/, '_AC_SL1500_')
        images.push(highResSrc)
      }
    })

    // Image principale alternative
    const mainImage = $('#landingImage').attr('data-old-hires') || $('#landingImage').attr('src')
    if (mainImage && !images.includes(mainImage)) {
      images.unshift(mainImage)
    }

    return images.length > 0 ? images : ['https://placehold.co/600x600/e5e5e5/666666?text=Amazon']
  }

  private extractDescription($: cheerio.CheerioAPI): string {
    const selectors = [
      '#feature-bullets ul li span',
      '#productDescription p',
      '#product-description-short',
    ]

    const descriptions: string[] = []

    for (const selector of selectors) {
      $(selector).each((_, element) => {
        const text = $(element).text().trim()
        if (text && text.length > 10 && !descriptions.includes(text)) {
          descriptions.push(text)
        }
      })
      if (descriptions.length > 0) break
    }

    return descriptions.join(' ') || 'Produit importé depuis Amazon'
  }

  private extractFeatures($: cheerio.CheerioAPI): string[] {
    const features: string[] = []

    $('#feature-bullets ul li span').each((_, element) => {
      const text = $(element).text().trim()
      if (text && !text.includes('CERTAINES APPLICATIONS')) {
        features.push(text)
      }
    })

    return features
  }

  private extractRating($: cheerio.CheerioAPI): number | undefined {
    const ratingText = $('.a-icon-star .a-icon-alt').first().text().trim()
    const match = ratingText.match(/([\d.,]+)/)
    return match ? parseFloat(match[1].replace(',', '.')) : undefined
  }

  private extractReviewCount($: cheerio.CheerioAPI): number | undefined {
    const countText = $('#acrCustomerReviewText').text().trim()
    const match = countText.match(/([\d\s,]+)/)
    return match ? parseInt(match[1].replace(/[\s,]/g, '')) : undefined
  }

  private extractStock($: cheerio.CheerioAPI): boolean {
    const stockText = $('#availability span').text().trim().toLowerCase()
    return !stockText.includes('indisponible') &&
           !stockText.includes('rupture') &&
           !stockText.includes('out of stock')
  }

  protected extractProductId(url: string): string | null {
    // Amazon ASIN: /dp/B08N5WRWNW/ ou /gp/product/B08N5WRWNW/
    const match = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/)
    return match ? match[1] : null
  }

  private isAmazonUrl(url: string): boolean {
    return url.includes('amazon.')
  }
}
