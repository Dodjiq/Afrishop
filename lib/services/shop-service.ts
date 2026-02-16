import type { Shop } from "@/app/api/shops/route"

export interface CreateShopData {
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
    shopName?: string
    sections: any[]
  }
  userId?: string
}

export class ShopService {
  private static baseUrl = "/api/shops"

  /**
   * Créer une nouvelle boutique
   */
  static async createShop(data: CreateShopData): Promise<Shop> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create shop")
      }

      const result = await response.json()
      return result.shop
    } catch (error) {
      console.error("Error creating shop:", error)
      throw error
    }
  }

  /**
   * Récupérer toutes les boutiques
   */
  static async getShops(userId?: string): Promise<Shop[]> {
    try {
      const url = userId
        ? `${this.baseUrl}?userId=${encodeURIComponent(userId)}`
        : this.baseUrl

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch shops")
      }

      const result = await response.json()
      return result.shops
    } catch (error) {
      console.error("Error fetching shops:", error)
      throw error
    }
  }

  /**
   * Mettre à jour une boutique
   */
  static async updateShop(
    id: string,
    updates: Partial<Shop>
  ): Promise<Shop> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updates }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update shop")
      }

      const result = await response.json()
      return result.shop
    } catch (error) {
      console.error("Error updating shop:", error)
      throw error
    }
  }

  /**
   * Supprimer une boutique
   */
  static async deleteShop(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete shop")
      }
    } catch (error) {
      console.error("Error deleting shop:", error)
      throw error
    }
  }

  /**
   * Sauvegarder localement (fallback)
   */
  static saveToLocalStorage(shop: Shop): void {
    try {
      const existingShops = this.getFromLocalStorage()
      const updatedShops = [...existingShops, shop]
      localStorage.setItem("afrishop_shops", JSON.stringify(updatedShops))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  /**
   * Récupérer depuis localStorage
   */
  static getFromLocalStorage(): Shop[] {
    try {
      const data = localStorage.getItem("afrishop_shops")
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return []
    }
  }

  /**
   * Supprimer du localStorage
   */
  static deleteFromLocalStorage(id: string): void {
    try {
      const existingShops = this.getFromLocalStorage()
      const updatedShops = existingShops.filter((shop) => shop.id !== id)
      localStorage.setItem("afrishop_shops", JSON.stringify(updatedShops))
    } catch (error) {
      console.error("Error deleting from localStorage:", error)
    }
  }

  /**
   * Exporter au format JSON
   */
  static exportAsJSON(shop: Shop): void {
    try {
      const dataStr = JSON.stringify(shop, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${shop.name}-${shop.id}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting shop:", error)
    }
  }

  /**
   * Générer le code HTML de la boutique
   */
  static generateHTML(shop: Shop): string {
    const { productData, shopConfig } = shop
    const { brandColor, fontPair = "modern", sections } = shopConfig

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${productData.name} - AfriShop</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --brand-color: ${brandColor};
    }
    .btn-primary {
      background-color: var(--brand-color);
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.3s;
    }
    .btn-primary:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  </style>
</head>
<body class="font-${fontPair === "elegant" ? "serif" : "sans"}">
  <!-- Hero Section -->
  <section class="py-20 px-6 text-center" style="background: linear-gradient(135deg, ${brandColor}15, ${brandColor}05);">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-5xl font-bold mb-6">${productData.name}</h1>
      <p class="text-xl text-gray-600 mb-8">${productData.description}</p>
      <button class="btn-primary">Acheter Maintenant - $${productData.price}</button>
    </div>
  </section>

  <!-- Features Section -->
  ${
    productData.features
      ? `
  <section class="py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">Caractéristiques</h2>
      <div class="grid md:grid-cols-2 gap-6">
        ${productData.features
          .map(
            (feature) => `
        <div class="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
          <svg class="w-6 h-6 flex-shrink-0" style="color: ${brandColor}" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span>${feature}</span>
        </div>
        `
          )
          .join("")}
      </div>
    </div>
  </section>
  `
      : ""
  }

  <!-- Custom Sections -->
  ${sections.map((section) => `<!-- ${section.name} -->`).join("\n  ")}

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-8 px-6 text-center">
    <p>Créé avec AfriShop</p>
  </footer>
</body>
</html>`
  }

  /**
   * Télécharger le HTML
   */
  static downloadHTML(shop: Shop): void {
    try {
      const html = this.generateHTML(shop)
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${shop.name.toLowerCase().replace(/\s+/g, "-")}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading HTML:", error)
    }
  }
}
