/**
 * Scrapers Export
 * Point d'entrée pour tous les scrapers AfriShop
 */

export * from './types'
export { AliExpressScraper } from './aliexpress'
export { AmazonScraper } from './amazon'
export { JumiaScraper } from './jumia'

import { AliExpressScraper } from './aliexpress'
import { AmazonScraper } from './amazon'
import { JumiaScraper } from './jumia'
import { Platform, ScraperOptions } from './types'

/**
 * Factory function pour obtenir le bon scraper selon l'URL
 */
export function getScraperForUrl(url: string, options?: ScraperOptions) {
  if (url.includes('aliexpress.com')) {
    return new AliExpressScraper(options)
  } else if (url.includes('amazon.')) {
    return new AmazonScraper(options)
  } else if (url.includes('jumia.')) {
    return new JumiaScraper(options)
  }

  throw new Error('Plateforme non supportée. Plateformes supportées: AliExpress, Amazon, Jumia')
}

/**
 * Factory function pour obtenir un scraper selon la plateforme
 */
export function getScraperForPlatform(platform: Platform, options?: ScraperOptions) {
  switch (platform) {
    case 'aliexpress':
      return new AliExpressScraper(options)
    case 'amazon':
      return new AmazonScraper(options)
    case 'jumia':
      return new JumiaScraper(options)
    default:
      throw new Error(`Plateforme non supportée: ${platform}`)
  }
}

/**
 * Détecte la plateforme depuis une URL
 */
export function detectPlatform(url: string): Platform | null {
  if (url.includes('aliexpress.com')) return 'aliexpress'
  if (url.includes('amazon.')) return 'amazon'
  if (url.includes('jumia.')) return 'jumia'
  return null
}
