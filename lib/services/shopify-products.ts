/**
 * Shopify Products Service
 * Gestion des produits et variants sur Shopify
 */

import { createShopifyClient, ShopifyCredentials } from "./shopify-client"
import { GeneratedProduct } from "./product-generator"

export interface ShopifyProduct {
  id?: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  tags: string[]
  variants: ShopifyVariant[]
  images: ShopifyImage[]
  status: "active" | "draft" | "archived"
}

export interface ShopifyVariant {
  id?: number
  product_id?: number
  title: string
  price: string
  sku?: string
  inventory_quantity?: number
  option1?: string
  option2?: string
  option3?: string
}

export interface ShopifyImage {
  id?: number
  product_id?: number
  src: string
  alt?: string
  position?: number
}

/**
 * Crée un produit sur Shopify
 */
export async function createShopifyProduct(
  credentials: ShopifyCredentials,
  product: GeneratedProduct
): Promise<{ success: boolean; productId?: number; error?: string }> {
  try {
    const client = createShopifyClient(credentials)

    // Construire le produit Shopify
    const shopifyProduct: ShopifyProduct = {
      title: product.name,
      body_html: formatDescriptionHTML(product.description),
      vendor: "AfriShop",
      product_type: product.category || "General",
      tags: product.tags || [],
      status: "draft",
      variants: [
        {
          title: product.variant?.value || "Default",
          price: product.price.toString(),
          sku: product.id,
          inventory_quantity: 100,
          option1: product.variant?.value,
        },
      ],
      images: product.images.map((url, index) => ({
        src: url,
        alt: product.name,
        position: index + 1,
      })),
    }

    const response = await client.post({
      path: "products",
      data: { product: shopifyProduct },
      type: "application/json",
    })

    if (response.body && typeof response.body === "object" && "product" in response.body) {
      const createdProduct = (response.body as any).product
      return {
        success: true,
        productId: createdProduct.id,
      }
    }

    return {
      success: false,
      error: "Format de réponse invalide",
    }
  } catch (error: any) {
    console.error("Shopify product creation error:", error)
    return {
      success: false,
      error: error.message || "Erreur lors de la création du produit",
    }
  }
}

/**
 * Crée plusieurs produits en batch
 */
export async function createShopifyProductsBatch(
  credentials: ShopifyCredentials,
  products: GeneratedProduct[],
  onProgress?: (current: number, total: number) => void
): Promise<{
  success: boolean
  created: number
  failed: number
  results: Array<{ productId?: number; error?: string }>
}> {
  const results: Array<{ productId?: number; error?: string }> = []
  let created = 0
  let failed = 0

  for (let i = 0; i < products.length; i++) {
    const product = products[i]

    if (onProgress) {
      onProgress(i + 1, products.length)
    }

    const result = await createShopifyProduct(credentials, product)

    if (result.success) {
      created++
      results.push({ productId: result.productId })
    } else {
      failed++
      results.push({ error: result.error })
    }

    // Pause pour éviter rate limiting (2 req/sec max)
    await new Promise((resolve) => setTimeout(resolve, 600))
  }

  return {
    success: created > 0,
    created,
    failed,
    results,
  }
}

/**
 * Met à jour un produit Shopify existant
 */
export async function updateShopifyProduct(
  credentials: ShopifyCredentials,
  productId: number,
  updates: Partial<GeneratedProduct>
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = createShopifyClient(credentials)

    const shopifyUpdates: any = {}

    if (updates.name) shopifyUpdates.title = updates.name
    if (updates.description)
      shopifyUpdates.body_html = formatDescriptionHTML(updates.description)
    if (updates.price) {
      shopifyUpdates.variants = [{ price: updates.price.toString() }]
    }
    if (updates.tags) shopifyUpdates.tags = updates.tags

    await client.put({
      path: `products/${productId}`,
      data: { product: shopifyUpdates },
      type: "application/json",
    })

    return { success: true }
  } catch (error: any) {
    console.error("Shopify product update error:", error)
    return {
      success: false,
      error: error.message || "Erreur lors de la mise à jour",
    }
  }
}

/**
 * Supprime un produit Shopify
 */
export async function deleteShopifyProduct(
  credentials: ShopifyCredentials,
  productId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = createShopifyClient(credentials)

    await client.delete({
      path: `products/${productId}`,
    })

    return { success: true }
  } catch (error: any) {
    console.error("Shopify product deletion error:", error)
    return {
      success: false,
      error: error.message || "Erreur lors de la suppression",
    }
  }
}

/**
 * Récupère les produits d'une boutique Shopify
 */
export async function getShopifyProducts(
  credentials: ShopifyCredentials,
  params?: {
    limit?: number
    status?: "active" | "draft" | "archived"
  }
): Promise<{ success: boolean; products?: any[]; error?: string }> {
  try {
    const client = createShopifyClient(credentials)

    const queryParams: any = {
      limit: params?.limit || 50,
    }

    if (params?.status) {
      queryParams.status = params.status
    }

    const response = await client.get({
      path: "products",
      query: queryParams,
    })

    if (response.body && typeof response.body === "object" && "products" in response.body) {
      return {
        success: true,
        products: (response.body as any).products,
      }
    }

    return {
      success: false,
      error: "Format de réponse invalide",
    }
  } catch (error: any) {
    console.error("Shopify products fetch error:", error)
    return {
      success: false,
      error: error.message || "Erreur lors de la récupération",
    }
  }
}

/**
 * Formate la description en HTML pour Shopify
 */
function formatDescriptionHTML(description: string): string {
  // Convertir les retours à la ligne en <br>
  let html = description.replace(/\n/g, "<br>")

  // Ajouter des paragraphes
  html = `<div class="product-description">
    <p>${html}</p>
  </div>`

  return html
}

/**
 * Publie un produit draft
 */
export async function publishShopifyProduct(
  credentials: ShopifyCredentials,
  productId: number
): Promise<{ success: boolean; error?: string }> {
  return updateShopifyProduct(credentials, productId, {
    // On utilise un type any pour éviter les erreurs de type
  } as any).then((result) => {
    if (result.success) {
      // Mettre à jour le status
      const client = createShopifyClient(credentials)
      return client
        .put({
          path: `products/${productId}`,
          data: { product: { status: "active" } },
          type: "application/json",
        })
        .then(() => ({ success: true }))
        .catch((error: any) => ({
          success: false,
          error: error.message,
        }))
    }
    return result
  })
}
