/**
 * Shopify Client Service
 * Gestion de la connexion et des opérations Shopify API
 */

import "@shopify/shopify-api/adapters/node"
import { shopifyApi, Session, ApiVersion } from "@shopify/shopify-api"

// Configuration Shopify - Only initialize if credentials are available
let shopifyInstance: ReturnType<typeof shopifyApi> | null = null

function getShopify() {
  if (!shopifyInstance && process.env.SHOPIFY_API_KEY && process.env.SHOPIFY_API_SECRET) {
    shopifyInstance = shopifyApi({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      scopes: ["read_products", "write_products", "read_orders", "write_orders"],
      hostName: process.env.SHOPIFY_HOST_NAME || "localhost",
      apiVersion: ApiVersion.October24,
      isEmbeddedApp: false,
      isCustomStoreApp: true,
    })
  }
  return shopifyInstance
}

export interface ShopifyCredentials {
  shopDomain: string // mystore.myshopify.com
  accessToken: string
}

/**
 * Crée un client Shopify REST API
 */
export function createShopifyClient(credentials: ShopifyCredentials) {
  const shopify = getShopify()
  if (!shopify) {
    throw new Error("Shopify API not configured. Please set SHOPIFY_API_KEY and SHOPIFY_API_SECRET.")
  }

  const { shopDomain, accessToken } = credentials

  const session = new Session({
    id: `offline_${shopDomain}`,
    shop: shopDomain,
    state: "offline",
    isOnline: false,
    accessToken,
    scope: "read_products,write_products,read_orders,write_orders",
  })

  const client = new shopify.clients.Rest({ session })

  return client
}

/**
 * Crée un client Shopify GraphQL
 */
export function createShopifyGraphQLClient(credentials: ShopifyCredentials) {
  const shopify = getShopify()
  if (!shopify) {
    throw new Error("Shopify API not configured. Please set SHOPIFY_API_KEY and SHOPIFY_API_SECRET.")
  }

  const { shopDomain, accessToken } = credentials

  const session = new Session({
    id: `offline_${shopDomain}`,
    shop: shopDomain,
    state: "offline",
    isOnline: false,
    accessToken,
    scope: "read_products,write_products,read_orders,write_orders",
  })

  const client = new shopify.clients.Graphql({ session })

  return client
}

/**
 * Vérifie si les credentials Shopify sont valides
 */
export async function verifyShopifyCredentials(
  credentials: ShopifyCredentials
): Promise<{ valid: boolean; error?: string; shop?: any }> {
  try {
    const client = createShopifyClient(credentials)

    const response = await client.get({
      path: "shop",
    })

    if (response.body && typeof response.body === "object" && "shop" in response.body) {
      return {
        valid: true,
        shop: response.body.shop,
      }
    }

    return {
      valid: false,
      error: "Réponse invalide de Shopify",
    }
  } catch (error: any) {
    console.error("Shopify verification error:", error)
    return {
      valid: false,
      error: error.message || "Erreur de connexion à Shopify",
    }
  }
}

export { getShopify }
