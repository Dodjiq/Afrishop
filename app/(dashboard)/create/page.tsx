"use client"

import { useState } from "react"
import { ProductImport } from "@/components/shop-builder/product-import"
import { ShopCustomizer } from "@/components/shop-builder/shop-customizer"
import { ShopPreview } from "@/components/shop-builder/shop-preview"

export default function CreateShopPage() {
  const [step, setStep] = useState<"import" | "customize" | "preview">("import")
  const [productData, setProductData] = useState<any>(null)
  const [shopConfig, setShopConfig] = useState({
    brandColor: "#ea580c",
    brandTone: "modern",
    shopName: "",
    sections: [],
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Créer une nouvelle boutique</h1>
        <p className="text-muted-foreground">
          Importez un produit et générez automatiquement votre boutique en ligne
        </p>
      </div>

      {/* Main Content */}
      {step === "import" && (
        <ProductImport
          onProductImported={(data) => {
            setProductData(data)
            setStep("customize")
          }}
        />
      )}

      {step === "customize" && (
        <ShopCustomizer
          productData={productData}
          shopConfig={shopConfig}
          setShopConfig={setShopConfig}
          onBack={() => setStep("import")}
          onNext={() => setStep("preview")}
        />
      )}

      {step === "preview" && (
        <ShopPreview
          productData={productData}
          shopConfig={shopConfig}
          onBack={() => setStep("customize")}
        />
      )}
    </div>
  )
}
