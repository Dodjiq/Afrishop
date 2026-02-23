/**
 * AliExpress Scraper
 * Scrape les données produit depuis AliExpress
 */

import { BaseScraper, ScraperResult, ScraperOptions, ScrapedProduct } from './types'
import * as cheerio from 'cheerio'

export class AliExpressScraper extends BaseScraper {
  constructor(options?: ScraperOptions) {
    super('aliexpress', options)
  }

  async scrape(url: string, options?: ScraperOptions): Promise<ScraperResult> {
    try {
      // Validation URL
      if (!this.isValidUrl(url) || !this.isAliExpressUrl(url)) {
        return {
          success: false,
          error: 'URL AliExpress invalide',
        }
      }

      const productId = this.extractProductId(url)
      if (!productId) {
        return {
          success: false,
          error: 'Impossible d\'extraire l\'ID du produit',
        }
      }

      // Fetch page HTML
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
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

      // Extraire les données du produit
      const product = await this.extractProductData($, url, productId)

      return {
        success: true,
        data: product,
      }
    } catch (error: any) {
      console.error('AliExpress scraping error:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors du scraping',
      }
    }
  }

  private async extractProductData(
    $: cheerio.CheerioAPI,
    url: string,
    productId: string
  ): Promise<ScrapedProduct> {
    // AliExpress utilise souvent des données JSON embarquées dans window.runParams
    let jsonData: any = null

    // Chercher les scripts contenant les données produit
    $('script').each((_, element) => {
      const scriptContent = $(element).html() || ''

      // window.runParams contient les données produit
      if (scriptContent.includes('window.runParams')) {
        try {
          const match = scriptContent.match(/window\.runParams\s*=\s*({.+?});/)
          if (match && match[1]) {
            jsonData = JSON.parse(match[1])
          }
        } catch (e) {
          // Continuer si parsing échoue
        }
      }
    })

    // Fallback: extraction HTML classique
    const name = this.extractName($, jsonData)
    const price = this.extractPrice($, jsonData)
    const images = this.extractImages($, jsonData)
    const description = this.extractDescription($, jsonData)

    return {
      name,
      description,
      price: price.current,
      currency: price.currency,
      originalPrice: price.original,
      discount: price.discount,
      images,
      thumbnail: images[0],
      rating: this.extractRating($, jsonData),
      reviewCount: this.extractReviewCount($, jsonData),
      inStock: true, // AliExpress affiche rarement stock out
      seller: this.extractSeller($, jsonData),
      source: {
        platform: 'aliexpress',
        url,
        productId,
        scrapedAt: new Date().toISOString(),
      },
    }
  }

  private extractName($: cheerio.CheerioAPI, jsonData: any): string {
    // Depuis JSON
    if (jsonData?.data?.titleModule?.subject) {
      return jsonData.data.titleModule.subject
    }

    // Depuis HTML
    const selectors = [
      'h1[data-pl="product-title"]',
      '.product-title-text',
      'h1.product-name',
      'meta[property="og:title"]',
    ]

    for (const selector of selectors) {
      const element = $(selector)
      if (element.length) {
        const text = selector.includes('meta')
          ? element.attr('content')
          : element.text().trim()
        if (text) return text
      }
    }

    return 'Produit AliExpress'
  }

  private extractPrice($: cheerio.CheerioAPI, jsonData: any): {
    current: number
    original?: number
    currency: string
    discount?: number
  } {
    // Depuis JSON
    if (jsonData?.data?.priceModule) {
      const priceModule = jsonData.data.priceModule
      return {
        current: parseFloat(priceModule.minActivityAmount?.value || priceModule.minAmount?.value || '0'),
        original: parseFloat(priceModule.maxAmount?.value || '0'),
        currency: priceModule.minActivityAmount?.currency || 'USD',
        discount: priceModule.discount,
      }
    }

    // Depuis HTML
    const priceText = $('.product-price-current').first().text().trim()
    const match = priceText.match(/[\d.,]+/)
    const current = match ? parseFloat(match[0].replace(',', '.')) : 0

    return {
      current,
      currency: 'USD',
    }
  }

  private extractImages($: cheerio.CheerioAPI, jsonData: any): string[] {
    const images: string[] = []

    // Depuis JSON
    if (jsonData?.data?.imageModule?.imagePathList) {
      return jsonData.data.imageModule.imagePathList.map((img: string) =>
        img.startsWith('//') ? `https:${img}` : img
      )
    }

    // Depuis HTML
    $('.images-view-item img').each((_, element) => {
      const src = $(element).attr('src') || $(element).attr('data-src')
      if (src && !images.includes(src)) {
        images.push(src.startsWith('//') ? `https:${src}` : src)
      }
    })

    // Meta tags
    const ogImage = $('meta[property="og:image"]').attr('content')
    if (ogImage && !images.includes(ogImage)) {
      images.push(ogImage)
    }

    return images.length > 0 ? images : ['https://placehold.co/600x600/e5e5e5/666666?text=AliExpress']
  }

  private extractDescription($: cheerio.CheerioAPI, jsonData: any): string {
    // Depuis JSON
    if (jsonData?.data?.descriptionModule?.descriptionUrl) {
      return 'Description disponible sur la page produit'
    }

    // Depuis HTML
    const selectors = [
      '.product-description',
      '#product-description',
      'meta[name="description"]',
      'meta[property="og:description"]',
    ]

    for (const selector of selectors) {
      const element = $(selector)
      if (element.length) {
        const text = selector.includes('meta')
          ? element.attr('content')
          : element.text().trim()
        if (text && text.length > 10) return text
      }
    }

    return 'Produit importé depuis AliExpress'
  }

  private extractRating($: cheerio.CheerioAPI, jsonData: any): number | undefined {
    if (jsonData?.data?.titleModule?.feedbackRating?.averageStar) {
      return parseFloat(jsonData.data.titleModule.feedbackRating.averageStar)
    }

    const ratingText = $('.overview-rating-average').text().trim()
    const match = ratingText.match(/[\d.]+/)
    return match ? parseFloat(match[0]) : undefined
  }

  private extractReviewCount($: cheerio.CheerioAPI, jsonData: any): number | undefined {
    if (jsonData?.data?.titleModule?.feedbackRating?.totalValidNum) {
      return parseInt(jsonData.data.titleModule.feedbackRating.totalValidNum)
    }

    const countText = $('.product-reviewer-reviews').text().trim()
    const match = countText.match(/[\d,]+/)
    return match ? parseInt(match[0].replace(',', '')) : undefined
  }

  private extractSeller($: cheerio.CheerioAPI, jsonData: any): { name: string; rating?: number } | undefined {
    if (jsonData?.data?.sellerModule) {
      return {
        name: jsonData.data.sellerModule.storeName || 'AliExpress Seller',
        rating: jsonData.data.sellerModule.positiveRate ? parseFloat(jsonData.data.sellerModule.positiveRate) / 100 * 5 : undefined,
      }
    }

    return {
      name: 'AliExpress Seller',
    }
  }

  protected extractProductId(url: string): string | null {
    // AliExpress URLs: https://www.aliexpress.com/item/1234567890.html
    // ou https://fr.aliexpress.com/item/1234567890.html
    const match = url.match(/\/item\/(\d+)\.html/)
    return match ? match[1] : null
  }

  private isAliExpressUrl(url: string): boolean {
    return url.includes('aliexpress.com')
  }
}
