"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FontCustomizerProps {
  shopConfig: any
  setShopConfig: (config: any) => void
}

const fontPairs = [
  {
    id: "modern",
    name: "Moderne",
    heading: "Inter",
    body: "Inter",
    preview: "font-sans",
  },
  {
    id: "elegant",
    name: "Élégant",
    heading: "Playfair Display",
    body: "Lato",
    preview: "font-serif",
  },
  {
    id: "bold",
    name: "Audacieux",
    heading: "Montserrat",
    body: "Open Sans",
    preview: "font-sans font-bold",
  },
  {
    id: "minimal",
    name: "Minimaliste",
    heading: "Helvetica",
    body: "Arial",
    preview: "font-sans",
  },
  {
    id: "creative",
    name: "Créatif",
    heading: "Poppins",
    body: "Nunito",
    preview: "font-sans",
  },
  {
    id: "classic",
    name: "Classique",
    heading: "Georgia",
    body: "Times New Roman",
    preview: "font-serif",
  },
]

export function FontCustomizer({ shopConfig, setShopConfig }: FontCustomizerProps) {
  const selectedFont = shopConfig.fontPair || "modern"

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choisissez vos polices</h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez un duo de polices harmonieux pour votre boutique
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fontPairs.map((font) => {
          const isSelected = selectedFont === font.id

          return (
            <button
              key={font.id}
              onClick={() =>
                setShopConfig({ ...shopConfig, fontPair: font.id })
              }
              className={cn(
                "text-left p-6 rounded-lg transition-all hover:scale-[1.02] border-2",
                isSelected
                  ? "border-primary ring-2 ring-primary ring-offset-2 bg-primary/5"
                  : "border-border"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{font.name}</p>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className={font.preview}>
                  <p className="text-2xl font-bold mb-1">Titre Principal</p>
                  <p className="text-sm text-muted-foreground">
                    Texte de corps pour la description du produit
                  </p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Titres : {font.heading}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Corps : {font.body}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Preview */}
      <Card className="bg-gradient-to-br from-muted/50 to-muted">
        <CardContent className="pt-6">
          <p className="text-sm font-medium mb-4">Aperçu complet :</p>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              Votre Produit Incroyable
            </h1>
            <p className="text-muted-foreground">
              Découvrez notre produit révolutionnaire qui va changer votre vie.
              Qualité premium garantie avec livraison rapide partout en Afrique.
            </p>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: shopConfig.brandColor }}
            >
              Acheter Maintenant
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
