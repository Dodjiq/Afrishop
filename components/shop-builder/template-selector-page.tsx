"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { templates, ShopTemplate } from "@/lib/templates"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  SparkleIcon,
  CheckCircleIcon,
  PaintBrushIcon,
  CrownIcon,
  RocketLaunchIcon,
  GlobeIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

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

interface TemplateSelectorPageProps {
  onSelectTemplate: (template: ShopTemplate) => void
}

export function TemplateSelectorPage({ onSelectTemplate }: TemplateSelectorPageProps) {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const handleSelect = (template: ShopTemplate) => {
    setSelectedTemplate(template.id)
  }

  const handleConfirm = () => {
    const template = templates.find((t) => t.id === selectedTemplate)
    if (template) {
      onSelectTemplate(template)
    }
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <SparkleIcon size={32} weight="fill" className="text-primary" />
                <h1 className="text-3xl font-bold">Choisissez votre template</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Sélectionnez un template pour démarrer rapidement votre boutique. Vous pourrez le personnaliser ensuite.
              </p>
            </div>
            <Button variant="ghost" onClick={handleCancel} className="gap-2">
              <ArrowLeftIcon size={18} />
              Retour
            </Button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => {
            const Icon = categoryIcons[template.category]
            const isSelected = selectedTemplate === template.id
            const isHovered = hoveredTemplate === template.id

            return (
              <div
                key={template.id}
                className={cn(
                  "relative group cursor-pointer rounded-2xl border-2 transition-all duration-300 bg-white",
                  isSelected
                    ? "border-primary shadow-2xl scale-105 ring-4 ring-primary/20"
                    : "border-gray-200 hover:border-primary/50 hover:shadow-xl hover:scale-102"
                )}
                onClick={() => handleSelect(template)}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Badge sélectionné */}
                {isSelected && (
                  <div className="absolute -top-4 -right-4 z-10 animate-in zoom-in duration-300">
                    <div className="bg-primary text-white rounded-full p-3 shadow-lg">
                      <CheckCircleIcon size={28} weight="fill" />
                    </div>
                  </div>
                )}

                {/* Thumbnail */}
                <div
                  className={cn(
                    "h-64 rounded-t-2xl flex items-center justify-center text-white font-bold text-2xl transition-all duration-300 relative overflow-hidden",
                    categoryColors[template.category],
                    isHovered && "scale-105"
                  )}
                  style={{ backgroundColor: template.brandColor }}
                >
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  <div className="text-center relative z-10">
                    <Icon size={80} weight="fill" className="mx-auto mb-3 opacity-90 drop-shadow-lg" />
                    <span className="text-white opacity-95 text-3xl font-bold drop-shadow-lg">
                      {template.name}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-xl">{template.name}</h3>
                    <Badge
                      variant="outline"
                      className={cn("text-xs font-semibold", categoryColors[template.category])}
                    >
                      {template.sections.length} sections
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Aperçu des sections */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.sections.slice(0, 5).map((section, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs px-3 py-1"
                      >
                        {section.type.split("-")[0]}
                      </Badge>
                    ))}
                    {template.sections.length > 5 && (
                      <Badge variant="secondary" className="text-xs px-3 py-1">
                        +{template.sections.length - 5}
                      </Badge>
                    )}
                  </div>

                  {/* Color preview */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Couleur principale:</span>
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-gray-300 shadow-sm"
                      style={{ backgroundColor: template.brandColor }}
                    />
                    <span className="font-mono text-xs">{template.brandColor}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                {isHovered && !isSelected && (
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none transition-opacity duration-300" />
                )}
              </div>
            )
          })}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t shadow-lg rounded-t-2xl p-6">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              {selectedTemplate ? (
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <CheckCircleIcon size={24} weight="fill" className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      Template "{templates.find((t) => t.id === selectedTemplate)?.name}" sélectionné
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cliquez sur "Continuer" pour commencer à créer votre boutique
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <SparkleIcon size={24} weight="fill" className="text-gray-400" />
                  </div>
                  <p className="text-muted-foreground">
                    Sélectionnez un template pour continuer
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleCancel} size="lg">
                Annuler
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!selectedTemplate}
                size="lg"
                className="gap-2 px-8"
              >
                <CheckCircleIcon size={20} weight="fill" />
                Continuer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
