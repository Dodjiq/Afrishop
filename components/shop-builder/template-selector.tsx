"use client"

import { useState } from "react"
import { templates, ShopTemplate } from "@/lib/templates"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  SparkleIcon,
  CheckCircleIcon,
  PaintBrushIcon,
  CrownIcon,
  RocketLaunchIcon,
  GlobeIcon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTemplate: (template: ShopTemplate) => void
}

const categoryIcons = {
  minimaliste: SparkleIcon,
  coloré: PaintBrushIcon,
  luxe: CrownIcon,
  moderne: RocketLaunchIcon,
  africain: GlobeIcon,
}

const categoryColors = {
  minimaliste: "bg-gray-100 text-gray-900 border-gray-300",
  coloré: "bg-orange-100 text-orange-900 border-orange-300",
  luxe: "bg-amber-100 text-amber-900 border-amber-300",
  moderne: "bg-blue-100 text-blue-900 border-blue-300",
  africain: "bg-yellow-100 text-yellow-900 border-yellow-300",
}

export function TemplateSelector({
  open,
  onOpenChange,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const handleSelect = (template: ShopTemplate) => {
    setSelectedTemplate(template.id)
  }

  const handleConfirm = () => {
    const template = templates.find((t) => t.id === selectedTemplate)
    if (template) {
      onSelectTemplate(template)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <SparkleIcon size={28} weight="fill" className="text-primary" />
            Choisissez votre template
          </DialogTitle>
          <DialogDescription className="text-base">
            Sélectionnez un template pour démarrer rapidement votre boutique.
            Vous pourrez le personnaliser ensuite.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {templates.map((template) => {
            const Icon = categoryIcons[template.category]
            const isSelected = selectedTemplate === template.id
            const isHovered = hoveredTemplate === template.id

            return (
              <div
                key={template.id}
                className={cn(
                  "relative group cursor-pointer rounded-xl border-2 transition-all duration-300",
                  isSelected
                    ? "border-primary shadow-lg scale-105"
                    : "border-gray-200 hover:border-primary/50 hover:shadow-md"
                )}
                onClick={() => handleSelect(template)}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Badge sélectionné */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-primary text-white rounded-full p-2 shadow-lg">
                      <CheckCircleIcon size={24} weight="fill" />
                    </div>
                  </div>
                )}

                {/* Thumbnail */}
                <div
                  className={cn(
                    "h-48 rounded-t-xl flex items-center justify-center text-white font-bold text-2xl transition-transform duration-300",
                    categoryColors[template.category],
                    isHovered && "scale-105"
                  )}
                  style={{ backgroundColor: template.brandColor }}
                >
                  <div className="text-center">
                    <Icon size={64} weight="fill" className="mx-auto mb-2 opacity-80" />
                    <span className="text-white opacity-90">{template.name}</span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", categoryColors[template.category])}
                    >
                      {template.sections.length} sections
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {template.description}
                  </p>

                  {/* Aperçu des sections */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.sections.slice(0, 4).map((section, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {section.type.split("-")[0]}
                      </Badge>
                    ))}
                    {template.sections.length > 4 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        +{template.sections.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Color preview */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Couleur principale:</span>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: template.brandColor }}
                    />
                    <span className="font-mono">{template.brandColor}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                {isHovered && !isSelected && (
                  <div className="absolute inset-0 bg-primary/5 rounded-xl pointer-events-none" />
                )}
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedTemplate
              ? `Template "${templates.find((t) => t.id === selectedTemplate)?.name}" sélectionné`
              : "Sélectionnez un template pour continuer"}
          </p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedTemplate}
              className="gap-2"
            >
              <CheckCircleIcon size={18} weight="fill" />
              Utiliser ce template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
