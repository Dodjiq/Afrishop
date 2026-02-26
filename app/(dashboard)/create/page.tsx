"use client"

import { useState, useEffect } from "react"
import { ProductImport } from "@/components/shop-builder/product-import"
import { ProductGeneration } from "@/components/shop-builder/product-generation"
import { ShopCustomizer } from "@/components/shop-builder/shop-customizer"
import { ShopPreview } from "@/components/shop-builder/shop-preview"
import { VisualBuilder } from "@/components/shop-builder/visual-builder"
import { TemplateSelectorPage } from "@/components/shop-builder/template-selector-page"
import { ShopTemplate } from "@/lib/templates"

export default function CreateShopPage() {
  const [step, setStep] = useState<"template" | "import" | "generate" | "customize" | "builder" | "preview">("template")
  const [productData, setProductData] = useState<any>(null)
  const [generatedProducts, setGeneratedProducts] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<ShopTemplate | null>(null)
  const [shopConfig, setShopConfig] = useState<any>({
    brandColor: "#ea580c",
    brandTone: "modern",
    shopName: "",
    sections: [],
  })

  // Créer un shop temporaire pour avoir un shopId
  useEffect(() => {
    const createTemporaryShop = async () => {
      if (shopConfig.shopId || !selectedTemplate) return

      try {
        const response = await fetch("/api/shops/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shopName: productData?.name || "Nouvelle boutique",
            brandColor: shopConfig.brandColor,
            brandTone: shopConfig.brandTone,
            sections: shopConfig.sections,
          }),
        })

        const data = await response.json()

        if (data.success && data.shopId) {
          setShopConfig((prev: any) => ({ ...prev, shopId: data.shopId }))
          console.log("✅ Shop créé avec ID:", data.shopId)
        }
      } catch (error) {
        console.error("Erreur création shop:", error)
      }
    }

    createTemporaryShop()
  }, [selectedTemplate, productData?.name, shopConfig])

  // Gérer la sélection de template
  const handleTemplateSelect = (template: ShopTemplate) => {
    setSelectedTemplate(template)
    setShopConfig({
      ...shopConfig,
      brandColor: template.brandColor,
      sections: template.sections,
    })
    setStep("import")
  }

  // Afficher le sélecteur de template en pleine page
  if (step === "template") {
    return <TemplateSelectorPage onSelectTemplate={handleTemplateSelect} />
  }

  // Pour le Visual Builder, on utilise le mode plein écran
  if (step === "builder") {
    return (
      <VisualBuilder
        productData={productData}
        shopConfig={shopConfig}
        setShopConfig={setShopConfig}
        onBack={() => setStep("customize")}
        onSave={() => setStep("preview")}
      />
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Créer une nouvelle boutique</h1>
          <p className="text-muted-foreground">
            {selectedTemplate
              ? `Template "${selectedTemplate.name}" - Importez un produit et générez votre boutique`
              : "Sélectionnez un template pour commencer"}
          </p>
        </div>

        {/* Main Content */}
        {step === "import" && (
          <ProductImport
            onProductImported={(data) => {
              setProductData(data)
              setStep("generate")
            }}
          />
        )}

        {step === "generate" && (
          <ProductGeneration
            baseProduct={productData}
            shopId={shopConfig.shopId}
            onGenerationComplete={(products) => {
              setGeneratedProducts(products)
              setStep("customize")
            }}
            onSkip={() => setStep("customize")}
          />
        )}

        {step === "customize" && (
          <ShopCustomizer
            productData={productData}
            shopConfig={shopConfig}
            setShopConfig={setShopConfig}
            onBack={() => setStep("generate")}
            onNext={() => setStep("builder")}
          />
        )}

        {step === "preview" && (
          <ShopPreview
            productData={productData}
            shopConfig={shopConfig}
            onBack={() => setStep("builder")}
          />
        )}
      </div>
    </>
  )
}
