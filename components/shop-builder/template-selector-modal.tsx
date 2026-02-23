"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SHOP_TEMPLATES, applyTemplate, type ShopTemplate } from "@/lib/shop-templates"
import { CheckCircleIcon, RocketLaunchIcon } from "@phosphor-icons/react"

interface TemplateSelectorModalProps {
  open: boolean
  onClose: () => void
  onSelectTemplate: (config: any) => void
  productData?: any
}

export function TemplateSelectorModal({
  open,
  onClose,
  onSelectTemplate,
  productData,
}: TemplateSelectorModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ShopTemplate | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "Tous", icon: "🏪" },
    { id: "ecommerce", label: "E-commerce", icon: "🛍️" },
    { id: "tech", label: "Tech", icon: "📱" },
    { id: "fashion", label: "Mode", icon: "👗" },
    { id: "food", label: "Food", icon: "🍕" },
    { id: "services", label: "Services", icon: "💼" },
    { id: "minimal", label: "Minimal", icon: "✨" },
  ]

  const filteredTemplates =
    selectedCategory === "all"
      ? SHOP_TEMPLATES
      : SHOP_TEMPLATES.filter((t) => t.category === selectedCategory)

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      const config = applyTemplate(selectedTemplate, productData)
      onSelectTemplate(config)
      onClose()
    }
  }

  const handleStartBlank = () => {
    onSelectTemplate({
      brandColor: "#ea580c",
      brandTone: "modern",
      sections: [],
      shopName: productData?.name || "",
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choisir un Template de Boutique</DialogTitle>
          <DialogDescription>
            Démarrez rapidement avec un design pré-configuré ou créez votre boutique de zéro
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Categories */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>

          {/* Start Blank Option */}
          <div className="mb-6">
            <Card
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedTemplate === null ? "border-primary ring-2 ring-primary/20" : ""
              }`}
              onClick={() => setSelectedTemplate(null)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shrink-0">
                    <RocketLaunchIcon size={32} weight="fill" className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">Commencer de Zéro</h3>
                      {selectedTemplate === null && (
                        <CheckCircleIcon size={20} className="text-primary" weight="fill" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Créez votre boutique avec un canvas vide et ajoutez vos sections manuellement
                    </p>
                    <Badge variant="secondary">Canvas vide</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selectedTemplate?.id === template.id ? "border-primary ring-2 ring-primary/20" : ""
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Thumbnail */}
                    <div
                      className="h-32 rounded-lg flex items-center justify-center text-5xl"
                      style={{ backgroundColor: `${template.brandColor}10` }}
                    >
                      {template.thumbnail}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-sm">{template.name}</h3>
                        {selectedTemplate?.id === template.id && (
                          <CheckCircleIcon size={16} className="text-primary shrink-0" weight="fill" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {template.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {template.sections.length} sections
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{ borderColor: template.brandColor }}
                        >
                          <div
                            className="w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: template.brandColor }}
                          />
                          {template.brandTone}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={selectedTemplate ? handleUseTemplate : handleStartBlank}
            className="gap-2"
          >
            <RocketLaunchIcon size={18} weight="fill" />
            {selectedTemplate ? `Utiliser "${selectedTemplate.name}"` : "Commencer de Zéro"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
