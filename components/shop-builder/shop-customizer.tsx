"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionsLibrary } from "./sections-library"
import { SectionsManager } from "./sections-manager"
import { ColorCustomizer } from "./color-customizer"
import { FontCustomizer } from "./font-customizer"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PaletteIcon,
  TextAaIcon,
  LayoutIcon,
} from "@phosphor-icons/react"

interface ShopCustomizerProps {
  productData: any
  shopConfig: any
  setShopConfig: (config: any) => void
  onBack: () => void
  onNext: () => void
}

export function ShopCustomizer({
  productData,
  shopConfig,
  setShopConfig,
  onBack,
  onNext,
}: ShopCustomizerProps) {
  const [activeTab, setActiveTab] = useState("sections")

  return (
    <div className="space-y-6">
      {/* Product Info Banner */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 bg-muted rounded-lg overflow-hidden">
              {productData.images && productData.images[0] && (
                <img
                  src={productData.images[0]}
                  alt={productData.name}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{productData.name}</h3>
              <p className="text-sm text-muted-foreground">
                Source : {productData.platform}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                ${productData.price}
              </p>
              <p className="text-xs text-muted-foreground">
                Prix suggéré
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customization Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Personnalisez votre boutique</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sections" className="gap-2">
                <LayoutIcon size={18} />
                Sections
              </TabsTrigger>
              <TabsTrigger value="colors" className="gap-2">
                <PaletteIcon size={18} />
                Couleurs
              </TabsTrigger>
              <TabsTrigger value="fonts" className="gap-2">
                <TextAaIcon size={18} />
                Polices
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Sections Library */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Bibliothèque de sections</h3>
                  <SectionsLibrary
                    shopConfig={shopConfig}
                    setShopConfig={setShopConfig}
                  />
                </div>

                {/* Right: Sections Manager */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Vos sections</h3>
                  <SectionsManager
                    sections={shopConfig.sections || []}
                    setSections={(sections) =>
                      setShopConfig({ ...shopConfig, sections })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="mt-6">
              <ColorCustomizer
                shopConfig={shopConfig}
                setShopConfig={setShopConfig}
              />
            </TabsContent>

            <TabsContent value="fonts" className="mt-6">
              <FontCustomizer
                shopConfig={shopConfig}
                setShopConfig={setShopConfig}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeftIcon size={16} weight="bold" />
          Retour
        </Button>
        <Button onClick={onNext} className="gap-2">
          Prévisualiser
          <ArrowRightIcon size={16} weight="bold" />
        </Button>
      </div>
    </div>
  )
}
