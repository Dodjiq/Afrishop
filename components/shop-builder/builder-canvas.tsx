"use client"

import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import {
  DotsThreeVerticalIcon,
  TrashIcon,
  CopyIcon,
  EyeIcon,
} from "@phosphor-icons/react"

// Section rendue dans le canvas (draggable/sortable)
interface SortableSectionProps {
  section: any
  index: number
  isSelected: boolean
  brandColor: string
  deviceMode: "desktop" | "tablet" | "mobile"
  onSelect: () => void
  onDelete: () => void
  onDuplicate: () => void
}

function SortableSection({
  section,
  index,
  isSelected,
  brandColor,
  deviceMode,
  onSelect,
  onDelete,
  onDuplicate,
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.uniqueId || section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Helper pour obtenir les styles responsive
  const getResponsiveStyles = () => {
    const baseStyles = section.style || {}
    const responsiveStyles = section.responsive?.[deviceMode] || {}
    return { ...baseStyles, ...responsiveStyles }
  }

  const responsiveStyle = getResponsiveStyles()

  // Styles de padding basés sur les paramètres de la section
  const getPadding = (size: string) => {
    switch (size) {
      case "none": return "0"
      case "small": return "2rem"
      case "large": return "6rem"
      default: return "4rem" // normal
    }
  }

  const paddingTop = getPadding(responsiveStyle?.paddingTop || "normal")
  const paddingBottom = getPadding(responsiveStyle?.paddingBottom || "normal")

  // Couleur de fond
  const getBackgroundColor = (color: string) => {
    switch (color) {
      case "white": return "#ffffff"
      case "muted": return "#f5f5f5"
      case "primary": return brandColor
      case "dark": return "#1a1a1a"
      case "custom": return responsiveStyle?.customBackgroundColor || "#ffffff"
      default: return "transparent"
    }
  }

  const backgroundColor = getBackgroundColor(responsiveStyle?.backgroundColor || "transparent")
  const textColor = responsiveStyle?.backgroundColor === "dark" || responsiveStyle?.backgroundColor === "primary" ? "#ffffff" : "#000000"

  // Largeur du conteneur
  const getContainerWidth = (width: string) => {
    switch (width) {
      case "full": return "100%"
      case "narrow": return "768px"
      case "wide": return "1536px"
      default: return "1280px" // container
    }
  }

  // Gap entre éléments
  const getGapSize = (size: string) => {
    switch (size) {
      case "none": return "0"
      case "small": return "1rem"
      case "large": return "3rem"
      default: return "2rem" // normal
    }
  }

  // Styles personnalisés
  const customStyles: React.CSSProperties = {}

  // Background image
  if (responsiveStyle?.backgroundImage) {
    customStyles.backgroundImage = `url(${responsiveStyle.backgroundImage})`
    customStyles.backgroundSize = responsiveStyle?.backgroundSize || "cover"
    customStyles.backgroundPosition = responsiveStyle?.backgroundPosition || "center"
    customStyles.backgroundRepeat = responsiveStyle?.backgroundRepeat || "no-repeat"
    customStyles.position = "relative"
  }

  // Parse custom CSS
  const parseCustomCSS = (css: string): React.CSSProperties => {
    if (!css) return {}
    const styles: any = {}
    try {
      const lines = css.split(';').filter(line => line.trim())
      lines.forEach(line => {
        const [prop, value] = line.split(':').map(s => s.trim())
        if (prop && value) {
          const camelCaseProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
          styles[camelCaseProp] = value
        }
      })
    } catch (error) {
      console.error('Error parsing custom CSS:', error)
    }
    return styles
  }

  const customCSSStyles = responsiveStyle?.customCSS ? parseCustomCSS(responsiveStyle.customCSS) : {}

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isSelected ? "ring-2 ring-primary shadow-lg" : ""}`}
    >
      {/* Section Content */}
      <div
        onClick={onSelect}
        className={`cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all duration-200 ${section.style?.customClass || ""}`}
        id={section.style?.sectionId || undefined}
        style={{
          paddingTop,
          paddingBottom,
          backgroundColor,
          color: section.style?.textColor || textColor,
          textAlign: section.style?.textAlign || "center",
          ...customStyles,
          ...customCSSStyles,
        }}
      >
        {/* Background Overlay */}
        {section.style?.backgroundImage && section.style?.backgroundOverlay > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, " + (section.style.backgroundOverlay / 100) + ")",
              zIndex: 0,
            }}
          />
        )}

        {/* Content wrapper with z-index to be above overlay */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: getContainerWidth(section.style?.layoutWidth || "container"), margin: "0 auto", gap: getGapSize(section.style?.gapSize || "normal") }}>
        {/* Render based on category */}
        {section.category === "hero" && (
          <div className="container mx-auto px-4 sm:px-6">
            {section.id.includes("split") ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
                <div className="space-y-3 sm:space-y-4 text-center md:text-left">
                  {section.content?.subtitle && (
                    <div className="text-xs sm:text-sm uppercase tracking-wider font-semibold opacity-90">
                      {section.content.subtitle}
                    </div>
                  )}
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                    style={{
                      fontSize: responsiveStyle?.titleSize || undefined,
                      color: responsiveStyle?.titleColor || undefined,
                    }}
                  >
                    {section.content?.title || "Titre de la section"}
                  </h1>
                  {section.content?.description && (
                    <p
                      className="text-base sm:text-lg opacity-90"
                      style={{
                        fontSize: responsiveStyle?.descriptionSize || undefined,
                      }}
                    >
                      {section.content.description}
                    </p>
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
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4"
                  style={{
                    fontSize: section.style?.titleSize || undefined,
                    color: section.style?.titleColor || undefined,
                  }}
                >
                  {section.content?.title || "Titre de la section"}
                </h1>
                {section.content?.description && (
                  <p
                    className="text-base sm:text-lg md:text-xl opacity-90 px-4"
                    style={{
                      fontSize: section.style?.descriptionSize || undefined,
                    }}
                  >
                    {section.content.description}
                  </p>
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
        )}

        {section.category === "features" && (
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              {section.content?.subtitle && (
                <div className="text-sm uppercase tracking-wider font-semibold opacity-75 mb-2">
                  {section.content.subtitle}
                </div>
              )}
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{
                  fontSize: section.style?.titleSize || undefined,
                  color: section.style?.titleColor || undefined,
                }}
              >
                {section.content?.title || "Fonctionnalités"}
              </h2>
              {section.content?.description && (
                <p
                  className="text-lg opacity-75 mt-3"
                  style={{
                    fontSize: section.style?.descriptionSize || undefined,
                  }}
                >
                  {section.content.description}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-3">
                  <div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: brandColor }}
                  >
                    {i}
                  </div>
                  <h3 className="font-bold">Fonctionnalité {i}</h3>
                  <p className="text-sm opacity-75">Description de la fonctionnalité</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.category === "how-it-works" && (
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              {section.content?.subtitle && (
                <div className="text-sm uppercase tracking-wider font-semibold opacity-75 mb-2">
                  {section.content.subtitle}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold">
                {section.content?.title || "Comment ça marche ?"}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-3">
                  <div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-bold text-3xl"
                    style={{ backgroundColor: brandColor }}
                  >
                    {i}
                  </div>
                  <h3 className="font-bold text-lg">Étape {i}</h3>
                  <p className="text-sm opacity-75">Description de l'étape</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.category === "testimonials" && (
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
        )}

        {section.category === "faq" && (
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
        )}

        {section.category === "cta" && (
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
                <p className="text-xl opacity-90">
                  {section.content.description}
                </p>
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
        )}

        {/* ============ ÉLÉMENTS DE BASE ============ */}
        {section.category === "elements" && section.id.includes("element-text") && (
          <div className="container mx-auto px-6">
            <div style={{ textAlign: section.content?.textAlign || "left" }}>
              <p
                style={{
                  fontSize: section.content?.fontSize || "16px",
                  fontWeight: section.content?.fontWeight || "normal",
                }}
              >
                {section.content?.text || "Texte"}
              </p>
            </div>
          </div>
        )}

        {section.category === "elements" && section.id.includes("element-heading") && (
          <div className="container mx-auto px-6">
            <div style={{ textAlign: section.content?.textAlign || "center" }}>
              {section.content?.headingLevel === "h1" && (
                <h1
                  style={{
                    fontSize: section.content?.fontSize || "48px",
                    fontWeight: section.content?.fontWeight || "bold",
                  }}
                >
                  {section.content?.text || "Titre"}
                </h1>
              )}
              {section.content?.headingLevel === "h2" && (
                <h2
                  style={{
                    fontSize: section.content?.fontSize || "32px",
                    fontWeight: section.content?.fontWeight || "bold",
                  }}
                >
                  {section.content?.text || "Titre"}
                </h2>
              )}
              {section.content?.headingLevel === "h3" && (
                <h3
                  style={{
                    fontSize: section.content?.fontSize || "24px",
                    fontWeight: section.content?.fontWeight || "bold",
                  }}
                >
                  {section.content?.text || "Titre"}
                </h3>
              )}
            </div>
          </div>
        )}

        {section.category === "elements" && section.id.includes("element-button") && (
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
        )}

        {section.category === "elements" && section.id.includes("element-image") && (
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
        )}

        {section.category === "elements" && section.id.includes("element-spacer") && (
          <div style={{ height: section.content?.height || "40px" }} />
        )}

        {section.category === "elements" && section.id.includes("element-divider") && (
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
        )}

        {section.category === "elements" && section.id.includes("element-icon") && (
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
        )}

        {section.category === "elements" && section.id.includes("element-video") && (
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
        )}
        </div>
      </div>

      {/* Toolbar on Hover/Selection - Design amélioré */}
      <div className={`absolute -top-14 left-1/2 -translate-x-1/2 transition-all duration-200 z-50 ${isSelected || "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"}`}>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl flex items-center gap-1 p-1.5 backdrop-blur-sm">
          <button
            {...attributes}
            {...listeners}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing transition-colors"
            title="Déplacer"
          >
            <DotsThreeVerticalIcon size={18} weight="bold" className="text-gray-700 dark:text-gray-300" />
          </button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
          <Button
            size="sm"
            variant="ghost"
            onClick={onDuplicate}
            className="h-9 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            title="Dupliquer"
          >
            <CopyIcon size={18} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="h-9 px-3 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 text-gray-700 dark:text-gray-300"
            title="Supprimer"
          >
            <TrashIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Drop Zone pour le canvas vide
function EmptyCanvasDropZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-center min-h-[600px] p-8 transition-all ${
        isOver ? "bg-primary/10 border-primary" : "border-dashed"
      } border-2 rounded-xl`}
    >
      <div className="text-center space-y-4">
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all ${
          isOver ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10 text-primary"
        }`}>
          <EyeIcon size={48} weight={isOver ? "fill" : "regular"} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {isOver ? "Déposez ici !" : "Canvas vide"}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {isOver
              ? "Relâchez pour ajouter la section"
              : "Glissez des sections depuis la bibliothèque"}
          </p>
        </div>
      </div>
    </div>
  )
}

interface BuilderCanvasProps {
  sections: any[]
  selectedSection: any | null
  brandColor: string
  deviceMode?: "desktop" | "tablet" | "mobile"
  onSelectSection: (section: any) => void
  onUpdateSection: (index: number, updatedSection: any) => void
  onDeleteSection: (index: number) => void
  onDuplicateSection: (index: number) => void
  onReorderSections: (sections: any[]) => void
}

export function BuilderCanvas({
  sections,
  selectedSection,
  brandColor,
  deviceMode = "desktop",
  onSelectSection,
  onUpdateSection,
  onDeleteSection,
  onDuplicateSection,
  onReorderSections,
}: BuilderCanvasProps) {
  const { setNodeRef: setDropZoneRef, isOver: isOverDropZone } = useDroppable({
    id: "canvas-drop-zone",
  })

  // Helper pour obtenir les styles responsive
  const getResponsiveStyles = (section: any) => {
    const baseStyles = section.style || {}
    const responsiveStyles = section.responsive?.[deviceMode] || {}

    // Merger les styles responsive avec les styles de base
    return { ...baseStyles, ...responsiveStyles }
  }

  if (sections.length === 0) {
    return <EmptyCanvasDropZone />
  }

  return (
    <div ref={setDropZoneRef}>
      <SortableContext
        items={sections.map((s) => s.uniqueId || s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1">
          {sections.map((section, index) => (
            <SortableSection
              key={section.uniqueId || section.id}
              section={section}
              index={index}
              isSelected={selectedSection?.uniqueId === section.uniqueId || selectedSection?.id === section.id}
              brandColor={brandColor}
              deviceMode={deviceMode}
              onSelect={() => onSelectSection(section)}
              onDelete={() => onDeleteSection(index)}
              onDuplicate={() => onDuplicateSection(index)}
            />
          ))}
        </div>
      </SortableContext>

      {/* Drop zone en bas pour ajouter de nouvelles sections */}
      <div
        className={`mt-4 p-8 border-2 border-dashed rounded-lg transition-all ${
          isOverDropZone
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/20"
        }`}
      >
        <p className="text-center text-sm text-muted-foreground">
          {isOverDropZone
            ? "Relâchez pour ajouter la section"
            : "Glissez un élément ici pour l'ajouter"}
        </p>
      </div>
    </div>
  )
}
