"use client"

import { useEffect } from "react"
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
    headingWeight: "700",
    bodyWeight: "400",
    googleFonts: "Inter:wght@400;700",
  },
  {
    id: "elegant",
    name: "Élégant",
    heading: "Playfair Display",
    body: "Lato",
    headingWeight: "700",
    bodyWeight: "400",
    googleFonts: "Playfair+Display:wght@700&family=Lato:wght@400",
  },
  {
    id: "bold",
    name: "Audacieux",
    heading: "Montserrat",
    body: "Open Sans",
    headingWeight: "800",
    bodyWeight: "400",
    googleFonts: "Montserrat:wght@800&family=Open+Sans:wght@400",
  },
  {
    id: "minimal",
    name: "Minimaliste",
    heading: "Helvetica",
    body: "Arial",
    headingWeight: "700",
    bodyWeight: "400",
    googleFonts: "", // Polices système
  },
  {
    id: "creative",
    name: "Créatif",
    heading: "Poppins",
    body: "Nunito",
    headingWeight: "700",
    bodyWeight: "400",
    googleFonts: "Poppins:wght@700&family=Nunito:wght@400",
  },
  {
    id: "classic",
    name: "Classique",
    heading: "Georgia",
    body: "Times New Roman",
    headingWeight: "700",
    bodyWeight: "400",
    googleFonts: "", // Polices système
  },
]

// Charger les polices Google Fonts dynamiquement
function loadGoogleFonts(fonts: string) {
  if (!fonts) return

  const existingLink = document.querySelector(`link[href*="${fonts}"]`)
  if (existingLink) return

  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`
  document.head.appendChild(link)
}

export function FontCustomizer({ shopConfig, setShopConfig }: FontCustomizerProps) {
  const selectedFont = shopConfig.fontPair || "modern"
  const selectedFontData = fontPairs.find((f) => f.id === selectedFont) || fontPairs[0]

  // Charger les polices Google Fonts au montage du composant
  useEffect(() => {
    fontPairs.forEach((font) => {
      if (font.googleFonts) {
        loadGoogleFonts(font.googleFonts)
      }
    })
  }, [])

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
                setShopConfig({
                  ...shopConfig,
                  fontPair: font.id,
                  fonts: {
                    heading: font.heading,
                    body: font.body,
                  }
                })
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
                {/* Aperçu avec vraies polices */}
                <div>
                  <p
                    className="text-2xl font-bold mb-1"
                    style={{
                      fontFamily: `'${font.heading}', sans-serif`,
                      fontWeight: font.headingWeight
                    }}
                  >
                    Titre Principal
                  </p>
                  <p
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: `'${font.body}', sans-serif`,
                      fontWeight: font.bodyWeight
                    }}
                  >
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

      {/* Preview avec vraies polices */}
      <Card className="bg-gradient-to-br from-muted/50 to-muted">
        <CardContent className="pt-6">
          <p className="text-sm font-medium mb-4">Aperçu complet :</p>
          <div className="space-y-4">
            <h1
              className="text-3xl font-bold"
              style={{
                fontFamily: `'${selectedFontData.heading}', sans-serif`,
                fontWeight: selectedFontData.headingWeight
              }}
            >
              Votre Produit Incroyable
            </h1>
            <p
              className="text-muted-foreground"
              style={{
                fontFamily: `'${selectedFontData.body}', sans-serif`,
                fontWeight: selectedFontData.bodyWeight
              }}
            >
              Découvrez notre produit révolutionnaire qui va changer votre vie.
              Qualité premium garantie avec livraison rapide partout en Afrique.
            </p>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white"
              style={{
                backgroundColor: shopConfig.brandColor,
                fontFamily: `'${selectedFontData.body}', sans-serif`,
                fontWeight: "600"
              }}
            >
              Acheter Maintenant
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
