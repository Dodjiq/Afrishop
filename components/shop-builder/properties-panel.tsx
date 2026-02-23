"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TextAaIcon,
  PaletteIcon,
  LayoutIcon,
  SparkleIcon,
  TrashIcon,
  CopyIcon,
  CircleNotchIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  MonitorIcon,
} from "@phosphor-icons/react"
import { useAIGeneration } from "@/hooks/use-ai-generation"

interface PropertiesPanelProps {
  selectedSection: any | null
  onUpdate: (updatedSection: any) => void
  onDelete: () => void
  onDuplicate: () => void
  brandColor?: string
  productData?: any
}

type DeviceMode = "desktop" | "tablet" | "mobile"

export function PropertiesPanel({
  selectedSection,
  onUpdate,
  onDelete,
  onDuplicate,
  brandColor = "#ea580c",
  productData,
}: PropertiesPanelProps) {
  const [localSection, setLocalSection] = useState(selectedSection)
  const [generatingField, setGeneratingField] = useState<string | null>(null)
  const [activeDevice, setActiveDevice] = useState<DeviceMode>("desktop")

  const {
    isGenerating,
    generateTitle,
    generateDescription,
    generateButton,
    generateFullSection,
    generateImage,
  } = useAIGeneration({ productData })

  useEffect(() => {
    setLocalSection(selectedSection)
  }, [selectedSection])

  if (!selectedSection) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm">Propriétés</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Sélectionnez une section pour l'éditer
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
              <span className="text-3xl">👈</span>
            </div>
            <div>
              <h4 className="font-semibold">Aucune sélection</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Cliquez sur une section dans le canvas
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (path: string, value: any, isResponsive = false) => {
    const newSection = { ...localSection }

    // Si c'est un style responsive, on le sauvegarde dans responsive.{device}.{path}
    if (isResponsive && path.startsWith("style.")) {
      // Initialiser la structure responsive si elle n'existe pas
      if (!newSection.responsive) {
        newSection.responsive = {
          desktop: {},
          tablet: {},
          mobile: {},
        }
      }
      if (!newSection.responsive[activeDevice]) {
        newSection.responsive[activeDevice] = {}
      }

      // Extraire le chemin sans "style."
      const stylePath = path.replace("style.", "")
      const keys = stylePath.split(".")
      let current = newSection.responsive[activeDevice]

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
    } else {
      // Style normal (non-responsive)
      const keys = path.split(".")
      let current = newSection

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
    }

    setLocalSection(newSection)
    onUpdate(newSection)
  }

  // Helper pour récupérer une valeur de style responsive
  const getResponsiveValue = (path: string, defaultValue: any = "") => {
    if (!localSection) return defaultValue

    // Vérifier d'abord si une valeur responsive existe pour cet appareil
    const stylePath = path.replace("style.", "")
    const responsive = localSection.responsive?.[activeDevice]

    if (responsive) {
      const keys = stylePath.split(".")
      let current: any = responsive
      for (const key of keys) {
        if (current && current[key] !== undefined) {
          current = current[key]
        } else {
          current = undefined
          break
        }
      }
      if (current !== undefined) return current
    }

    // Sinon, fallback sur la valeur par défaut (desktop)
    const keys = path.split(".")
    let current: any = localSection
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key]
      } else {
        return defaultValue
      }
    }
    return current !== undefined ? current : defaultValue
  }

  // Fonctions de génération IA
  const handleGenerateTitle = async () => {
    setGeneratingField("title")
    try {
      const generatedTitle = await generateTitle(
        selectedSection.category,
        localSection?.content?.title
      )
      handleChange("content.title", generatedTitle)
    } catch (error) {
      console.error("Erreur génération titre:", error)
    } finally {
      setGeneratingField(null)
    }
  }

  const handleGenerateDescription = async () => {
    setGeneratingField("description")
    try {
      const generatedDesc = await generateDescription(
        selectedSection.category,
        localSection?.content?.description
      )
      handleChange("content.description", generatedDesc)
    } catch (error) {
      console.error("Erreur génération description:", error)
    } finally {
      setGeneratingField(null)
    }
  }

  const handleGenerateButton = async () => {
    setGeneratingField("button")
    try {
      const generatedButton = await generateButton(
        selectedSection.category,
        localSection?.content?.buttonText
      )
      handleChange("content.buttonText", generatedButton)
    } catch (error) {
      console.error("Erreur génération bouton:", error)
    } finally {
      setGeneratingField(null)
    }
  }

  const handleGenerateAllContent = async () => {
    setGeneratingField("all")
    try {
      const fullContent = await generateFullSection(selectedSection.category)

      // Mettre à jour tous les champs
      if (fullContent.title) handleChange("content.title", fullContent.title)
      if (fullContent.subtitle) handleChange("content.subtitle", fullContent.subtitle)
      if (fullContent.description) handleChange("content.description", fullContent.description)
      if (fullContent.buttonText) handleChange("content.buttonText", fullContent.buttonText)
    } catch (error) {
      console.error("Erreur génération complète:", error)
    } finally {
      setGeneratingField(null)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with Section Info */}
      <div className="p-4 border-b shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
              {selectedSection.thumbnail}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{selectedSection.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">
                {selectedSection.category}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onDuplicate}
            className="flex-1 gap-2"
          >
            <CopyIcon size={14} />
            Dupliquer
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            className="flex-1 gap-2 text-destructive hover:text-destructive"
          >
            <TrashIcon size={14} />
            Supprimer
          </Button>
        </div>
      </div>

      {/* Device Mode Selector - Style Elementor */}
      <div className="px-4 py-3 border-b bg-muted/30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground mr-2">Appareil :</span>
          <div className="flex items-center gap-1 bg-background p-1 rounded-lg flex-1">
            <Button
              variant={activeDevice === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveDevice("desktop")}
              className="flex-1 gap-1 h-7"
              title="Desktop"
            >
              <MonitorIcon size={14} weight={activeDevice === "desktop" ? "fill" : "regular"} />
              <span className="hidden sm:inline text-xs">Desktop</span>
            </Button>
            <Button
              variant={activeDevice === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveDevice("tablet")}
              className="flex-1 gap-1 h-7"
              title="Tablet"
            >
              <DeviceTabletIcon size={14} weight={activeDevice === "tablet" ? "fill" : "regular"} />
              <span className="hidden sm:inline text-xs">Tablet</span>
            </Button>
            <Button
              variant={activeDevice === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveDevice("mobile")}
              className="flex-1 gap-1 h-7"
              title="Mobile"
            >
              <DeviceMobileIcon size={14} weight={activeDevice === "mobile" ? "fill" : "regular"} />
              <span className="hidden sm:inline text-xs">Mobile</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
            <TabsTrigger value="content" className="gap-2">
              <TextAaIcon size={16} />
              Contenu
            </TabsTrigger>
            <TabsTrigger value="style" className="gap-2">
              <PaletteIcon size={16} />
              Style
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <LayoutIcon size={16} />
              Avancé
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="p-4 space-y-4">
            {/* Bouton génération complète */}
            <Button
              onClick={handleGenerateAllContent}
              disabled={isGenerating}
              className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {generatingField === "all" ? (
                <>
                  <CircleNotchIcon size={16} className="animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <SparkleIcon size={16} weight="fill" />
                  Générer tout le contenu avec l'IA
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Ou modifier manuellement</span>
              </div>
            </div>

            {/* ========== PROPRIÉTÉS POUR LES ÉLÉMENTS DE BASE ========== */}
            {selectedSection.category === "elements" && (
              <FieldGroup>
                {selectedSection.id.includes("element-text") && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="text">Texte</FieldLabel>
                      <Textarea
                        id="text"
                        value={localSection?.content?.text || ""}
                        onChange={(e) => handleChange("content.text", e.target.value)}
                        placeholder="Votre texte ici..."
                        rows={4}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="fontSize">Taille de police</FieldLabel>
                      <Input
                        id="fontSize"
                        value={localSection?.content?.fontSize || "16px"}
                        onChange={(e) => handleChange("content.fontSize", e.target.value)}
                        placeholder="16px"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="fontWeight">Graisse de police</FieldLabel>
                      <select
                        id="fontWeight"
                        value={localSection?.content?.fontWeight || "normal"}
                        onChange={(e) => handleChange("content.fontWeight", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="normal">Normal</option>
                        <option value="500">Medium</option>
                        <option value="600">Semibold</option>
                        <option value="bold">Bold</option>
                      </select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="textAlign">Alignement</FieldLabel>
                      <select
                        id="textAlign"
                        value={localSection?.content?.textAlign || "left"}
                        onChange={(e) => handleChange("content.textAlign", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="left">Gauche</option>
                        <option value="center">Centre</option>
                        <option value="right">Droite</option>
                        <option value="justify">Justifié</option>
                      </select>
                    </Field>
                  </>
                )}

                {selectedSection.id.includes("element-heading") && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="text">Texte du titre</FieldLabel>
                      <Input
                        id="text"
                        value={localSection?.content?.text || ""}
                        onChange={(e) => handleChange("content.text", e.target.value)}
                        placeholder="Votre titre..."
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="headingLevel">Niveau de titre</FieldLabel>
                      <select
                        id="headingLevel"
                        value={localSection?.content?.headingLevel || "h2"}
                        onChange={(e) => handleChange("content.headingLevel", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="h1">H1 (Principal)</option>
                        <option value="h2">H2 (Secondaire)</option>
                        <option value="h3">H3 (Tertiaire)</option>
                      </select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="fontSize">Taille</FieldLabel>
                      <Input
                        id="fontSize"
                        value={localSection?.content?.fontSize || "32px"}
                        onChange={(e) => handleChange("content.fontSize", e.target.value)}
                        placeholder="32px"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="textAlign">Alignement</FieldLabel>
                      <select
                        id="textAlign"
                        value={localSection?.content?.textAlign || "center"}
                        onChange={(e) => handleChange("content.textAlign", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="left">Gauche</option>
                        <option value="center">Centre</option>
                        <option value="right">Droite</option>
                      </select>
                    </Field>
                  </>
                )}

                {selectedSection.id.includes("element-button") && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="buttonText">Texte du bouton</FieldLabel>
                      <Input
                        id="buttonText"
                        value={localSection?.content?.buttonText || ""}
                        onChange={(e) => handleChange("content.buttonText", e.target.value)}
                        placeholder="Cliquez ici"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="buttonUrl">URL du lien</FieldLabel>
                      <Input
                        id="buttonUrl"
                        value={localSection?.content?.buttonUrl || "#"}
                        onChange={(e) => handleChange("content.buttonUrl", e.target.value)}
                        placeholder="https://..."
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="buttonStyle">Style</FieldLabel>
                      <select
                        id="buttonStyle"
                        value={localSection?.content?.buttonStyle || "primary"}
                        onChange={(e) => handleChange("content.buttonStyle", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="primary">Primaire (plein)</option>
                        <option value="outline">Contour</option>
                      </select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="buttonSize">Taille</FieldLabel>
                      <select
                        id="buttonSize"
                        value={localSection?.content?.buttonSize || "medium"}
                        onChange={(e) => handleChange("content.buttonSize", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="small">Petit</option>
                        <option value="medium">Moyen</option>
                        <option value="large">Grand</option>
                      </select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="textAlign">Alignement</FieldLabel>
                      <select
                        id="textAlign"
                        value={localSection?.content?.textAlign || "center"}
                        onChange={(e) => handleChange("content.textAlign", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="left">Gauche</option>
                        <option value="center">Centre</option>
                        <option value="right">Droite</option>
                      </select>
                    </Field>
                  </>
                )}

                {selectedSection.id.includes("element-image") && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="imageUrl">URL de l'image</FieldLabel>
                      <div className="space-y-2">
                        <Input
                          id="imageUrl"
                          value={localSection?.content?.imageUrl || ""}
                          onChange={(e) => handleChange("content.imageUrl", e.target.value)}
                          placeholder="https://..."
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  // Vérifier la taille (max 2MB)
                                  if (file.size > 2 * 1024 * 1024) {
                                    alert("L'image est trop grande. Taille maximale : 2MB")
                                    return
                                  }
                                  const reader = new FileReader()
                                  reader.onloadend = () => {
                                    handleChange("content.imageUrl", reader.result)
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Button type="button" variant="outline" size="sm" className="w-full gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                              Téléverser
                            </Button>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full gap-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
                            onClick={async () => {
                              setGeneratingField("image")
                              try {
                                const prompt = productData?.name
                                  ? `Image professionnelle pour ${productData.name}`
                                  : "Image professionnelle pour e-commerce"
                                const result = await generateImage(prompt, {
                                  style: "moderne et professionnel",
                                  mood: "lumineuse et accueillante",
                                  productType: productData?.category || "e-commerce"
                                })
                                if (result.imageUrl) {
                                  handleChange("content.imageUrl", result.imageUrl)
                                }
                              } catch (error) {
                                console.error("Erreur génération image:", error)
                              } finally {
                                setGeneratingField(null)
                              }
                            }}
                            disabled={generatingField === "image"}
                          >
                            {generatingField === "image" ? (
                              <>
                                <CircleNotchIcon size={16} className="animate-spin" />
                                IA...
                              </>
                            ) : (
                              <>
                                <SparkleIcon size={16} weight="fill" />
                                Générer IA
                              </>
                            )}
                          </Button>
                        </div>
                        {localSection?.content?.imageUrl && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleChange("content.imageUrl", "")}
                          >
                            <TrashIcon size={16} className="mr-2" />
                            Supprimer l'image
                          </Button>
                        )}
                        {localSection?.content?.imageUrl && (
                          <div className="mt-2 rounded-lg overflow-hidden border">
                            <img
                              src={localSection.content.imageUrl}
                              alt="Aperçu"
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Téléversez une image ou collez une URL (max 2MB)
                      </p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="alt">Texte alternatif</FieldLabel>
                      <Input
                        id="alt"
                        value={localSection?.content?.alt || ""}
                        onChange={(e) => handleChange("content.alt", e.target.value)}
                        placeholder="Description de l'image"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="width">Largeur</FieldLabel>
                      <Input
                        id="width"
                        value={localSection?.content?.width || "100%"}
                        onChange={(e) => handleChange("content.width", e.target.value)}
                        placeholder="100% ou 500px"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="borderRadius">Arrondi des coins</FieldLabel>
                      <Input
                        id="borderRadius"
                        value={localSection?.content?.borderRadius || "8px"}
                        onChange={(e) => handleChange("content.borderRadius", e.target.value)}
                        placeholder="8px"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="textAlign">Alignement</FieldLabel>
                      <select
                        id="textAlign"
                        value={localSection?.content?.textAlign || "center"}
                        onChange={(e) => handleChange("content.textAlign", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="left">Gauche</option>
                        <option value="center">Centre</option>
                        <option value="right">Droite</option>
                      </select>
                    </Field>
                  </>
                )}

                {selectedSection.id.includes("element-spacer") && (
                  <Field>
                    <FieldLabel htmlFor="height">Hauteur de l'espace</FieldLabel>
                    <Input
                      id="height"
                      value={localSection?.content?.height || "40px"}
                      onChange={(e) => handleChange("content.height", e.target.value)}
                      placeholder="40px"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Exemples: 20px, 2rem, 50px
                    </p>
                  </Field>
                )}

                {selectedSection.id.includes("element-divider") && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="dividerStyle">Style de ligne</FieldLabel>
                      <select
                        id="dividerStyle"
                        value={localSection?.content?.style || "solid"}
                        onChange={(e) => handleChange("content.style", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="solid">Solide</option>
                        <option value="dashed">Tirets</option>
                        <option value="dotted">Points</option>
                      </select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="thickness">Épaisseur</FieldLabel>
                      <Input
                        id="thickness"
                        value={localSection?.content?.thickness || "1px"}
                        onChange={(e) => handleChange("content.thickness", e.target.value)}
                        placeholder="1px"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="color">Couleur</FieldLabel>
                      <Input
                        id="color"
                        type="color"
                        value={localSection?.content?.color || "#e2e8f0"}
                        onChange={(e) => handleChange("content.color", e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="width">Largeur</FieldLabel>
                      <Input
                        id="width"
                        value={localSection?.content?.width || "100%"}
                        onChange={(e) => handleChange("content.width", e.target.value)}
                        placeholder="100% ou 500px"
                      />
                    </Field>
                  </>
                )}

                {selectedSection.id.includes("element-icon") && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="icon">Icône/Emoji</FieldLabel>
                      <Input
                        id="icon"
                        value={localSection?.content?.icon || "⭐"}
                        onChange={(e) => handleChange("content.icon", e.target.value)}
                        placeholder="⭐ 🚀 💎"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Collez un emoji ou un symbole
                      </p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="size">Taille</FieldLabel>
                      <Input
                        id="size"
                        value={localSection?.content?.size || "48px"}
                        onChange={(e) => handleChange("content.size", e.target.value)}
                        placeholder="48px"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="color">Couleur</FieldLabel>
                      <Input
                        id="color"
                        type="color"
                        value={localSection?.content?.color || brandColor}
                        onChange={(e) => handleChange("content.color", e.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="textAlign">Alignement</FieldLabel>
                      <select
                        id="textAlign"
                        value={localSection?.content?.textAlign || "center"}
                        onChange={(e) => handleChange("content.textAlign", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="left">Gauche</option>
                        <option value="center">Centre</option>
                        <option value="right">Droite</option>
                      </select>
                    </Field>
                  </>
                )}

                {selectedSection.id.includes("element-video") && (
                  <>
                    <Field>
                      <FieldLabel htmlFor="videoUrl">URL de la vidéo</FieldLabel>
                      <Input
                        id="videoUrl"
                        value={localSection?.content?.videoUrl || ""}
                        onChange={(e) => handleChange("content.videoUrl", e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Format: YouTube ou Vimeo embed URL
                      </p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="aspectRatio">Ratio d'aspect</FieldLabel>
                      <select
                        id="aspectRatio"
                        value={localSection?.content?.aspectRatio || "16/9"}
                        onChange={(e) => handleChange("content.aspectRatio", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border bg-background"
                      >
                        <option value="16/9">16:9 (Paysage)</option>
                        <option value="4/3">4:3 (Standard)</option>
                      </select>
                    </Field>
                  </>
                )}
              </FieldGroup>
            )}

            {/* ========== PROPRIÉTÉS POUR LES SECTIONS CLASSIQUES ========== */}
            {selectedSection.category !== "elements" && (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Titre principal</FieldLabel>
                <Input
                  id="title"
                  value={localSection?.content?.title || ""}
                  onChange={(e) => handleChange("content.title", e.target.value)}
                  placeholder="Entrez le titre..."
                  disabled={isGenerating}
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {(localSection?.content?.title || "").length} caractères
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 gap-1 text-xs"
                    onClick={handleGenerateTitle}
                    disabled={isGenerating}
                  >
                    {generatingField === "title" ? (
                      <CircleNotchIcon size={12} className="animate-spin" />
                    ) : (
                      <SparkleIcon size={12} weight="fill" />
                    )}
                    {generatingField === "title" ? "Génération..." : "Générer"}
                  </Button>
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="subtitle">Sous-titre</FieldLabel>
                <Input
                  id="subtitle"
                  value={localSection?.content?.subtitle || ""}
                  onChange={(e) => handleChange("content.subtitle", e.target.value)}
                  placeholder="Sous-titre (optionnel)..."
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  value={localSection?.content?.description || ""}
                  onChange={(e) => handleChange("content.description", e.target.value)}
                  placeholder="Description détaillée..."
                  rows={4}
                  disabled={isGenerating}
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {(localSection?.content?.description || "").length} caractères
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 gap-1 text-xs"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                  >
                    {generatingField === "description" ? (
                      <CircleNotchIcon size={12} className="animate-spin" />
                    ) : (
                      <SparkleIcon size={12} weight="fill" />
                    )}
                    {generatingField === "description" ? "Génération..." : "Améliorer"}
                  </Button>
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="buttonText">Texte du bouton</FieldLabel>
                <Input
                  id="buttonText"
                  value={localSection?.content?.buttonText || ""}
                  onChange={(e) => handleChange("content.buttonText", e.target.value)}
                  placeholder="Ex: Acheter maintenant"
                  disabled={isGenerating}
                />
                <div className="flex items-center justify-end mt-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 gap-1 text-xs"
                    onClick={handleGenerateButton}
                    disabled={isGenerating}
                  >
                    {generatingField === "button" ? (
                      <CircleNotchIcon size={12} className="animate-spin" />
                    ) : (
                      <SparkleIcon size={12} weight="fill" />
                    )}
                    {generatingField === "button" ? "Génération..." : "Générer"}
                  </Button>
                </div>
              </Field>
            </FieldGroup>
            )}
          </TabsContent>

          {/* Style Tab */}
          <TabsContent value="style" className="p-4 space-y-4">
            {/* Spacing */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Espacement</h4>
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="paddingTop">Padding haut</FieldLabel>
                  <select
                    id="paddingTop"
                    className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                    value={localSection?.style?.paddingTop || "normal"}
                    onChange={(e) => handleChange("style.paddingTop", e.target.value)}
                  >
                    <option value="none">Aucun</option>
                    <option value="small">Petit (2rem)</option>
                    <option value="normal">Normal (4rem)</option>
                    <option value="large">Grand (6rem)</option>
                  </select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="paddingBottom">Padding bas</FieldLabel>
                  <select
                    id="paddingBottom"
                    className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                    value={localSection?.style?.paddingBottom || "normal"}
                    onChange={(e) => handleChange("style.paddingBottom", e.target.value)}
                  >
                    <option value="none">Aucun</option>
                    <option value="small">Petit (2rem)</option>
                    <option value="normal">Normal (4rem)</option>
                    <option value="large">Grand (6rem)</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Background */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Arrière-plan</h4>
              <Field>
                <FieldLabel htmlFor="backgroundColor">Couleur de fond</FieldLabel>
                <select
                  id="backgroundColor"
                  className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                  value={localSection?.style?.backgroundColor || "transparent"}
                  onChange={(e) => handleChange("style.backgroundColor", e.target.value)}
                >
                  <option value="transparent">Transparent</option>
                  <option value="white">Blanc</option>
                  <option value="muted">Gris clair</option>
                  <option value="primary">Couleur de marque</option>
                  <option value="dark">Sombre</option>
                  <option value="custom">Personnalisée</option>
                </select>
              </Field>

              {/* Custom Color Picker */}
              {localSection?.style?.backgroundColor === "custom" && (
                <Field>
                  <FieldLabel htmlFor="customBgColor">Couleur personnalisée</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      id="customBgColor"
                      type="color"
                      value={localSection?.style?.customBackgroundColor || "#ffffff"}
                      onChange={(e) => handleChange("style.customBackgroundColor", e.target.value)}
                      className="w-16 h-9 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={localSection?.style?.customBackgroundColor || "#ffffff"}
                      onChange={(e) => handleChange("style.customBackgroundColor", e.target.value)}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </Field>
              )}

              {/* Color Preview */}
              <div className="grid grid-cols-5 gap-2">
                {["transparent", "white", "muted", "primary", "dark"].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleChange("style.backgroundColor", color)}
                    className={`h-10 rounded-md border-2 transition-all ${
                      localSection?.style?.backgroundColor === color
                        ? "border-primary scale-105"
                        : "border-border hover:border-primary/50"
                    }`}
                    style={{
                      backgroundColor:
                        color === "transparent"
                          ? "transparent"
                          : color === "white"
                          ? "#ffffff"
                          : color === "muted"
                          ? "#f5f5f5"
                          : color === "primary"
                          ? brandColor
                          : "#1a1a1a",
                    }}
                  >
                    {color === "transparent" && (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                  </button>
                ))}
              </div>

              {/* Background Image */}
              <Field>
                <FieldLabel htmlFor="backgroundImage">Image d'arrière-plan</FieldLabel>
                <div className="space-y-2">
                  <Input
                    id="backgroundImage"
                    value={localSection?.style?.backgroundImage || ""}
                    onChange={(e) => handleChange("style.backgroundImage", e.target.value)}
                    placeholder="https://... ou URL de l'image"
                  />
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            // Vérifier la taille (max 2MB)
                            if (file.size > 2 * 1024 * 1024) {
                              alert("L'image est trop grande. Taille maximale : 2MB")
                              return
                            }
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              handleChange("style.backgroundImage", reader.result)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" size="sm" className="w-full gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Téléverser une image
                      </Button>
                    </div>
                    {localSection?.style?.backgroundImage && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleChange("style.backgroundImage", "")}
                      >
                        <TrashIcon size={16} />
                      </Button>
                    )}
                  </div>
                  {localSection?.style?.backgroundImage && (
                    <div className="mt-2 rounded-lg overflow-hidden border">
                      <img
                        src={localSection.style.backgroundImage}
                        alt="Aperçu"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Téléversez une image ou collez une URL (max 2MB)
                </p>
              </Field>

              {localSection?.style?.backgroundImage && (
                <>
                  <Field>
                    <FieldLabel htmlFor="backgroundSize">Taille de l'image</FieldLabel>
                    <select
                      id="backgroundSize"
                      className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                      value={localSection?.style?.backgroundSize || "cover"}
                      onChange={(e) => handleChange("style.backgroundSize", e.target.value)}
                    >
                      <option value="cover">Couvrir (Cover)</option>
                      <option value="contain">Contenir (Contain)</option>
                      <option value="auto">Taille originale (Auto)</option>
                    </select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="backgroundPosition">Position de l'image</FieldLabel>
                    <select
                      id="backgroundPosition"
                      className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                      value={localSection?.style?.backgroundPosition || "center"}
                      onChange={(e) => handleChange("style.backgroundPosition", e.target.value)}
                    >
                      <option value="center">Centre</option>
                      <option value="top">Haut</option>
                      <option value="bottom">Bas</option>
                      <option value="left">Gauche</option>
                      <option value="right">Droite</option>
                    </select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="backgroundRepeat">Répétition</FieldLabel>
                    <select
                      id="backgroundRepeat"
                      className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                      value={localSection?.style?.backgroundRepeat || "no-repeat"}
                      onChange={(e) => handleChange("style.backgroundRepeat", e.target.value)}
                    >
                      <option value="no-repeat">Pas de répétition</option>
                      <option value="repeat">Répéter</option>
                      <option value="repeat-x">Répéter horizontalement</option>
                      <option value="repeat-y">Répéter verticalement</option>
                    </select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="backgroundOverlay">Overlay (opacité)</FieldLabel>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        id="backgroundOverlay"
                        min="0"
                        max="100"
                        value={localSection?.style?.backgroundOverlay || 0}
                        onChange={(e) => handleChange("style.backgroundOverlay", e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {localSection?.style?.backgroundOverlay || 0}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ajoute une couche sombre pour améliorer la lisibilité du texte
                    </p>
                  </Field>
                </>
              )}
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Typographie</h4>
              <Field>
                <FieldLabel htmlFor="textAlign">Alignement du texte</FieldLabel>
                <select
                  id="textAlign"
                  className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                  value={localSection?.style?.textAlign || "center"}
                  onChange={(e) => handleChange("style.textAlign", e.target.value)}
                >
                  <option value="left">Gauche</option>
                  <option value="center">Centré</option>
                  <option value="right">Droite</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="titleSize">
                  Taille du titre
                  {activeDevice !== "desktop" && (
                    <span className="ml-2 text-xs text-primary">({activeDevice})</span>
                  )}
                </FieldLabel>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    id="titleSize"
                    min="16"
                    max="72"
                    step="2"
                    value={parseInt(getResponsiveValue("style.titleSize", "36"))}
                    onChange={(e) => handleChange("style.titleSize", e.target.value + "px", true)}
                    className="flex-1"
                  />
                  <Input
                    type="text"
                    value={getResponsiveValue("style.titleSize", "36px")}
                    onChange={(e) => handleChange("style.titleSize", e.target.value, true)}
                    className="w-20 text-center"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="descriptionSize">Taille de la description</FieldLabel>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    id="descriptionSize"
                    min="12"
                    max="32"
                    step="1"
                    value={parseInt(localSection?.style?.descriptionSize || "16")}
                    onChange={(e) => handleChange("style.descriptionSize", e.target.value + "px")}
                    className="flex-1"
                  />
                  <Input
                    type="text"
                    value={localSection?.style?.descriptionSize || "16px"}
                    onChange={(e) => handleChange("style.descriptionSize", e.target.value)}
                    className="w-20 text-center"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="titleColor">Couleur du titre</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="titleColor"
                    type="color"
                    value={localSection?.style?.titleColor || "#000000"}
                    onChange={(e) => handleChange("style.titleColor", e.target.value)}
                    className="w-16 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={localSection?.style?.titleColor || "#000000"}
                    onChange={(e) => handleChange("style.titleColor", e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="textColor">Couleur du texte</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={localSection?.style?.textColor || "#666666"}
                    onChange={(e) => handleChange("style.textColor", e.target.value)}
                    className="w-16 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={localSection?.style?.textColor || "#666666"}
                    onChange={(e) => handleChange("style.textColor", e.target.value)}
                    placeholder="#666666"
                    className="flex-1"
                  />
                </div>
              </Field>
            </div>

            {/* Layout */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Mise en page</h4>

              <Field>
                <FieldLabel htmlFor="layoutWidth">Largeur du contenu</FieldLabel>
                <select
                  id="layoutWidth"
                  className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                  value={localSection?.style?.layoutWidth || "container"}
                  onChange={(e) => handleChange("style.layoutWidth", e.target.value)}
                >
                  <option value="full">Pleine largeur</option>
                  <option value="container">Conteneur (max 1280px)</option>
                  <option value="narrow">Étroit (max 768px)</option>
                  <option value="wide">Large (max 1536px)</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="contentAlignment">Alignement du contenu</FieldLabel>
                <select
                  id="contentAlignment"
                  className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                  value={localSection?.style?.contentAlignment || "center"}
                  onChange={(e) => handleChange("style.contentAlignment", e.target.value)}
                >
                  <option value="start">Début</option>
                  <option value="center">Centre</option>
                  <option value="end">Fin</option>
                  <option value="between">Espacé</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="columnsLayout">Disposition en colonnes</FieldLabel>
                <select
                  id="columnsLayout"
                  className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                  value={localSection?.style?.columnsLayout || "1"}
                  onChange={(e) => handleChange("style.columnsLayout", e.target.value)}
                >
                  <option value="1">1 Colonne</option>
                  <option value="2">2 Colonnes</option>
                  <option value="3">3 Colonnes</option>
                  <option value="4">4 Colonnes</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="gapSize">Espacement entre éléments</FieldLabel>
                <select
                  id="gapSize"
                  className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                  value={localSection?.style?.gapSize || "normal"}
                  onChange={(e) => handleChange("style.gapSize", e.target.value)}
                >
                  <option value="none">Aucun</option>
                  <option value="small">Petit (1rem)</option>
                  <option value="normal">Normal (2rem)</option>
                  <option value="large">Grand (3rem)</option>
                </select>
              </Field>
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="p-4 space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Paramètres avancés</h4>

              <Field>
                <FieldLabel htmlFor="customClass">Classes CSS personnalisées</FieldLabel>
                <Input
                  id="customClass"
                  value={localSection?.style?.customClass || ""}
                  onChange={(e) => handleChange("style.customClass", e.target.value)}
                  placeholder="Ex: custom-animation fade-in"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="sectionId">ID de section (ancre)</FieldLabel>
                <Input
                  id="sectionId"
                  value={localSection?.style?.sectionId || ""}
                  onChange={(e) => handleChange("style.sectionId", e.target.value)}
                  placeholder="Ex: about-us"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Utilisé pour créer des liens d'ancrage (#about-us)
                </p>
              </Field>

              <div className="pt-4 border-t">
                <Field>
                  <div className="flex items-center justify-between">
                    <div>
                      <FieldLabel>Animations</FieldLabel>
                      <p className="text-xs text-muted-foreground">
                        Activer les animations au scroll
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localSection?.style?.animations !== false}
                      onChange={(e) => handleChange("style.animations", e.target.checked)}
                      className="w-10 h-5 rounded-full"
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Custom CSS */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm">CSS Personnalisé</h4>
              <Field>
                <FieldLabel htmlFor="customCSS">Code CSS</FieldLabel>
                <Textarea
                  id="customCSS"
                  value={localSection?.style?.customCSS || ""}
                  onChange={(e) => handleChange("style.customCSS", e.target.value)}
                  placeholder={`/* Exemple:\npadding: 20px;\nmargin-bottom: 30px;\nborder-radius: 10px;\nbox-shadow: 0 4px 6px rgba(0,0,0,0.1);\n*/`}
                  rows={8}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ajoutez vos propres styles CSS. Ils seront appliqués directement à cette section.
                </p>
              </Field>

              <div className="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>⚠️ Attention :</strong> Le CSS personnalisé sera injecté directement.
                  Assurez-vous que vos styles sont corrects pour éviter des problèmes d'affichage.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
