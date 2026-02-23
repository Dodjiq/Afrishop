"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@phosphor-icons/react"

export default function FullPreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [shopConfig, setShopConfig] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer les données depuis les search params
    const configData = searchParams.get('config')

    if (configData) {
      try {
        // Décoder depuis base64 UTF-8
        const decodedConfig = JSON.parse(decodeURIComponent(atob(configData)))
        setShopConfig(decodedConfig)
      } catch (error) {
        console.error('Erreur lors du décodage:', error)
      }
    }
    setIsLoading(false)
  }, [searchParams])

  const renderSection = (section: any, index: number) => {
    const brandColor = shopConfig?.brandColor || "#ea580c"

    // Helper functions
    const getPadding = (size: string) => {
      switch (size) {
        case "none": return "0"
        case "small": return "2rem"
        case "large": return "6rem"
        default: return "4rem" // normal
      }
    }

    const getBackgroundColor = (color: string) => {
      switch (color) {
        case "white": return "#ffffff"
        case "muted": return "#f5f5f5"
        case "primary": return brandColor
        case "dark": return "#1a1a1a"
        default: return "transparent"
      }
    }

    const paddingTop = getPadding(section.style?.paddingTop || "normal")
    const paddingBottom = getPadding(section.style?.paddingBottom || "normal")
    const backgroundColor = getBackgroundColor(section.style?.backgroundColor || "transparent")
    const textColor = section.style?.backgroundColor === "dark" || section.style?.backgroundColor === "primary" ? "#ffffff" : "#000000"

    // ============ ÉLÉMENTS DE BASE ============
    if (section.category === "elements") {
      if (section.id.includes("element-text")) {
        return (
          <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
            <div className="container mx-auto px-6">
              <div style={{ textAlign: section.content?.textAlign || "left" }}>
                <p style={{ fontSize: section.content?.fontSize || "16px", fontWeight: section.content?.fontWeight || "normal" }}>
                  {section.content?.text || "Texte"}
                </p>
              </div>
            </div>
          </div>
        )
      }

      if (section.id.includes("element-heading")) {
        const HeadingTag = section.content?.headingLevel || "h2"
        return (
          <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
            <div className="container mx-auto px-6">
              <div style={{ textAlign: section.content?.textAlign || "center" }}>
                {React.createElement(
                  HeadingTag,
                  {
                    style: {
                      fontSize: section.content?.fontSize || "32px",
                      fontWeight: section.content?.fontWeight || "bold",
                    }
                  },
                  section.content?.text || "Titre"
                )}
              </div>
            </div>
          </div>
        )
      }

      if (section.id.includes("element-button")) {
        return (
          <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
            <div className="container mx-auto px-6">
              <div style={{ textAlign: section.content?.textAlign || "center" }}>
                <button
                  className={`rounded-lg font-semibold shadow-lg transition-all hover:shadow-xl ${
                    section.content?.buttonSize === "small" ? "px-4 py-2 text-sm" :
                    section.content?.buttonSize === "large" ? "px-8 py-4 text-lg" :
                    "px-6 py-3 text-base"
                  }`}
                  style={{
                    backgroundColor: section.content?.buttonStyle === "outline" ? "transparent" : brandColor,
                    color: section.content?.buttonStyle === "outline" ? brandColor : "#ffffff",
                    border: section.content?.buttonStyle === "outline" ? `2px solid ${brandColor}` : "none",
                  }}
                >
                  {section.content?.buttonText || "Bouton"}
                </button>
              </div>
            </div>
          </div>
        )
      }

      if (section.id.includes("element-image")) {
        return (
          <div key={index} style={{ paddingTop, paddingBottom, backgroundColor }}>
            <div className="container mx-auto px-6">
              <div style={{ textAlign: section.content?.textAlign || "center" }}>
                <img
                  src={section.content?.imageUrl || "https://placehold.co/600x400"}
                  alt={section.content?.alt || "Image"}
                  style={{
                    width: section.content?.width || "100%",
                    height: section.content?.height || "auto",
                    borderRadius: section.content?.borderRadius || "8px",
                    maxWidth: "100%",
                    display: "inline-block",
                  }}
                />
              </div>
            </div>
          </div>
        )
      }

      if (section.id.includes("element-spacer")) {
        return <div key={index} style={{ height: section.content?.height || "40px" }} />
      }

      if (section.id.includes("element-divider")) {
        return (
          <div key={index} style={{ paddingTop, paddingBottom, backgroundColor }}>
            <div className="container mx-auto px-6">
              <hr
                style={{
                  borderStyle: section.content?.style || "solid",
                  borderWidth: section.content?.thickness || "1px",
                  borderColor: section.content?.color || "#e2e8f0",
                  width: section.content?.width || "100%",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        )
      }

      if (section.id.includes("element-icon")) {
        return (
          <div key={index} style={{ paddingTop, paddingBottom, backgroundColor }}>
            <div className="container mx-auto px-6">
              <div style={{ textAlign: section.content?.textAlign || "center" }}>
                <span
                  style={{
                    fontSize: section.content?.size || "48px",
                    color: section.content?.color || brandColor,
                    display: "inline-block",
                  }}
                >
                  {section.content?.icon || "⭐"}
                </span>
              </div>
            </div>
          </div>
        )
      }

      if (section.id.includes("element-video")) {
        return (
          <div key={index} style={{ paddingTop, paddingBottom, backgroundColor }}>
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div
                  style={{
                    position: "relative",
                    paddingBottom: section.content?.aspectRatio === "4/3" ? "75%" : "56.25%",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={section.content?.videoUrl || ""}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    // ============ SECTIONS COMPLEXES ============

    // HERO SECTIONS
    if (section.category === "hero") {
      return (
        <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
          <div className="container mx-auto px-4 sm:px-6">
            {section.id.includes("split") ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                <div className="space-y-3 sm:space-y-4 text-center md:text-left">
                  {section.content?.subtitle && (
                    <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold opacity-90">
                      {section.content.subtitle}
                    </div>
                  )}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    {section.content?.title || "Titre de la section"}
                  </h1>
                  {section.content?.description && (
                    <p className="text-base sm:text-lg opacity-90">{section.content.description}</p>
                  )}
                  {section.content?.buttonText && (
                    <button
                      className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg text-sm sm:text-base w-full sm:w-auto"
                      style={{
                        backgroundColor: section.style?.backgroundColor === "primary" ? "#ffffff" : brandColor,
                        color: section.style?.backgroundColor === "primary" ? brandColor : "#ffffff",
                      }}
                    >
                      {section.content.buttonText}
                    </button>
                  )}
                </div>
                <div className="h-48 sm:h-56 md:h-64 bg-muted/20 rounded-xl flex items-center justify-center border-2 border-dashed border-current/20">
                  <span className="opacity-50 text-sm sm:text-base">Image 📷</span>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-center">
                {section.content?.subtitle && (
                  <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold opacity-90">
                    {section.content.subtitle}
                  </div>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4">
                  {section.content?.title || "Titre de la section"}
                </h1>
                {section.content?.description && (
                  <p className="text-base sm:text-lg md:text-xl opacity-90 px-4">{section.content.description}</p>
                )}
                {section.content?.buttonText && (
                  <button
                    className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold shadow-lg text-sm sm:text-base w-full sm:w-auto max-w-xs mx-auto"
                    style={{
                      backgroundColor: section.style?.backgroundColor === "primary" ? "#ffffff" : brandColor,
                      color: section.style?.backgroundColor === "primary" ? brandColor : "#ffffff",
                    }}
                  >
                    {section.content.buttonText}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    // FEATURES SECTIONS
    if (section.category === "features") {
      return (
        <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
              {section.content?.subtitle && (
                <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold opacity-75 mb-2">
                  {section.content.subtitle}
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4">
                {section.content?.title || "Fonctionnalités"}
              </h2>
              {section.content?.description && (
                <p className="text-lg opacity-75 mt-3">{section.content.description}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-3 px-4">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl sm:text-2xl"
                    style={{ backgroundColor: brandColor }}
                  >
                    {i}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg">Fonctionnalité {i}</h3>
                  <p className="text-xs sm:text-sm opacity-75">Description de la fonctionnalité</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // HOW IT WORKS SECTIONS
    if (section.category === "how-it-works") {
      return (
        <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
              {section.content?.subtitle && (
                <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold opacity-75 mb-2">
                  {section.content.subtitle}
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4">
                {section.content?.title || "Comment ça marche ?"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-3 px-4">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl sm:text-3xl"
                    style={{ backgroundColor: brandColor }}
                  >
                    {i}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg">Étape {i}</h3>
                  <p className="text-xs sm:text-sm opacity-75">Description de l'étape</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // TESTIMONIALS SECTIONS
    if (section.category === "testimonials") {
      return (
        <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {section.content?.title || "Témoignages"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 rounded-xl bg-white/10 backdrop-blur border border-current/10">
                  <div className="flex gap-1 mb-3" style={{ color: brandColor }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </div>
                  <p className="italic opacity-90 mb-4">
                    "Excellent produit, je recommande vivement !"
                  </p>
                  <p className="font-semibold">— Client {i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // FAQ SECTIONS
    if (section.category === "faq") {
      return (
        <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {section.content?.title || "Questions fréquentes"}
              </h2>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 backdrop-blur border border-current/10">
                  <h3 className="font-bold mb-2">Question {i} ?</h3>
                  <p className="text-sm opacity-75">Réponse à la question</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // CTA SECTIONS
    if (section.category === "cta") {
      return (
        <div key={index} style={{ paddingTop, paddingBottom, backgroundColor, color: textColor }}>
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {section.content?.subtitle && (
                <div className="text-sm uppercase tracking-wider font-semibold opacity-90">
                  {section.content.subtitle}
                </div>
              )}
              <h2 className="text-4xl md:text-5xl font-bold">
                {section.content?.title || "Prêt à commencer ?"}
              </h2>
              {section.content?.description && (
                <p className="text-xl opacity-90">{section.content.description}</p>
              )}
              {section.content?.buttonText && (
                <button
                  className="px-10 py-4 rounded-lg font-semibold shadow-2xl text-lg"
                  style={{
                    backgroundColor: section.style?.backgroundColor === "primary" ? "#ffffff" : brandColor,
                    color: section.style?.backgroundColor === "primary" ? brandColor : "#ffffff",
                  }}
                >
                  {section.content.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Fallback pour sections inconnues
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Chargement de la prévisualisation...</p>
        </div>
      </div>
    )
  }

  if (!shopConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Aucune donnée de prévisualisation</p>
          <Button onClick={() => window.close()} className="mt-4">
            Fermer
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Contenu des sections - uniquement le canvas */}
      <div className="w-full">
        {shopConfig.sections && shopConfig.sections.length > 0 ? (
          shopConfig.sections.map((section: any, index: number) => renderSection(section, index))
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-muted-foreground">Aucune section à afficher</p>
            <p className="text-sm text-muted-foreground mt-2">Ajoutez des sections dans le Visual Builder</p>
          </div>
        )}
      </div>
    </div>
  )
}
