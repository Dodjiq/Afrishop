"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DeviceMobileIcon,
  DeviceTabletIcon,
  MonitorIcon,
  FloppyDiskIcon,
  EyeIcon,
  ArrowLeftIcon,
  ArrowCounterClockwiseIcon,
  ArrowClockwiseIcon,
  CheckCircleIcon,
  WarningIcon,
  SidebarIcon,
  SidebarSimpleIcon,
  CornersOutIcon,
  CornersInIcon,
  ClockCounterClockwiseIcon,
  CaretDownIcon,
  FileIcon,
} from "@phosphor-icons/react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { WidgetsLibraryPanel } from "./widgets-library-panel"
import { PropertiesPanel } from "./properties-panel"
import { BuilderCanvas } from "./builder-canvas"
import { VersionHistory } from "./version-history"
import { useHistory } from "@/hooks/use-history"
import { useKeyboardShortcuts, BUILDER_SHORTCUTS } from "@/hooks/use-keyboard-shortcuts"
import { useAutoSave } from "@/hooks/use-auto-save"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface VisualBuilderProps {
  productData: any
  shopConfig: any
  setShopConfig: (config: any) => void
  onBack: () => void
  onSave: () => void
}

type DeviceMode = "desktop" | "tablet" | "mobile"

export function VisualBuilder({
  productData,
  shopConfig,
  setShopConfig,
  onBack,
  onSave,
}: VisualBuilderProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop")
  const [selectedSection, setSelectedSection] = useState<any>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showLeftSidebar, setShowLeftSidebar] = useState(true)
  const [showRightSidebar, setShowRightSidebar] = useState(true)
  const [showDashboardSidebar, setShowDashboardSidebar] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  // Pages management
  const [pages, setPages] = useState<any[]>([])
  const [currentPageId, setCurrentPageId] = useState<string | null>(null)
  const [isLoadingPages, setIsLoadingPages] = useState(true)

  // Masquer/afficher la sidebar du dashboard parent
  useEffect(() => {
    // Chercher la sidebar du dashboard dans le DOM
    const dashboardSidebar = document.querySelector('aside') as HTMLElement
    if (dashboardSidebar) {
      dashboardSidebar.style.display = showDashboardSidebar ? 'flex' : 'none'
      dashboardSidebar.style.transition = 'all 0.3s ease'
    }

    // Restaurer la sidebar quand on quitte le composant
    return () => {
      if (dashboardSidebar) {
        dashboardSidebar.style.display = 'flex'
      }
    }
  }, [showDashboardSidebar])

  // Détecter le mode plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement
      setIsFullscreen(isNowFullscreen)

      // Masquer automatiquement les sidebars en plein écran
      if (isNowFullscreen) {
        setShowLeftSidebar(false)
        setShowRightSidebar(false)
        setShowDashboardSidebar(false)
      } else {
        // Restaurer les sidebars quand on quitte le plein écran
        setShowLeftSidebar(true)
        setShowRightSidebar(true)
        setShowDashboardSidebar(true)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Fonction pour activer/désactiver le plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  // Charger les pages du shop
  useEffect(() => {
    const loadPages = async () => {
      if (!shopConfig.shopId) return

      setIsLoadingPages(true)
      try {
        const response = await fetch(`/api/pages?shopId=${shopConfig.shopId}`)
        const data = await response.json()

        if (data.success && data.pages) {
          setPages(data.pages)
          // Sélectionner la page d'accueil par défaut
          const homePage = data.pages.find((p: any) => p.is_home)
          if (homePage) {
            setCurrentPageId(homePage.id)
          } else if (data.pages.length > 0) {
            setCurrentPageId(data.pages[0].id)
          }
        }
      } catch (error) {
        console.error("Erreur chargement pages:", error)
      } finally {
        setIsLoadingPages(false)
      }
    }

    loadPages()
  }, [shopConfig.shopId])

  // Obtenir la page courante
  const currentPage = pages.find((p) => p.id === currentPageId)

  // Historique avec undo/redo (utilise les sections de la page courante)
  const {
    state: sections,
    setState: setSections,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<any[]>(currentPage?.sections || shopConfig.sections || [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Largeurs du canvas selon le device
  const canvasWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }

  const handleSectionsUpdate = async (newSections: any[]) => {
    setSections(newSections)

    // Si on a une page courante, mettre à jour ses sections
    if (currentPageId && currentPage) {
      try {
        const response = await fetch(`/api/pages/${currentPageId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sections: newSections,
          }),
        })

        if (response.ok) {
          // Mettre à jour l'état local des pages
          setPages((prevPages) =>
            prevPages.map((p) =>
              p.id === currentPageId ? { ...p, sections: newSections } : p
            )
          )
        }
      } catch (error) {
        console.error("Erreur mise à jour page:", error)
      }
    } else {
      // Fallback: mettre à jour shopConfig (ancien comportement)
      setShopConfig({ ...shopConfig, sections: newSections })
    }
  }

  // Auto-save
  const { isSaving, lastSaved, saveError, saveNow } = useAutoSave({
    data: sections,
    onSave: async (data) => {
      try {
        // 1. Sauvegarder la boutique
        const response = await fetch("/api/shops/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shopId: shopConfig.shopId || null, // Si null, crée une nouvelle boutique
            shopConfig: { ...shopConfig, sections: data },
            productData,
            sections: data,
            version: (shopConfig.version || 0) + 1,
          }),
        })

        if (!response.ok) {
          throw new Error("Erreur lors de la sauvegarde")
        }

        const result = await response.json()

        // Mettre à jour l'ID de la boutique si c'est une nouvelle création
        const currentShopId = result.shop?.id || shopConfig.shopId

        if (result.shop && !shopConfig.shopId) {
          setShopConfig({ ...shopConfig, shopId: result.shop.id, sections: data })
        } else {
          setShopConfig({ ...shopConfig, sections: data })
        }

        // 2. Créer un snapshot de version (auto-save)
        if (currentShopId) {
          await fetch("/api/shops/versions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              shopId: currentShopId,
              snapshot: {
                config: { ...shopConfig, sections: data },
                sections: data,
                productData,
              },
              isAutoSave: true,
            }),
          })
        }
      } catch (error) {
        console.error("Auto-save error:", error)
        throw error
      }
    },
    interval: 30000, // 30 secondes
    enabled: true,
    debounceDelay: 3000, // 3 secondes après modification
  })

  // Raccourcis clavier
  useKeyboardShortcuts([
    {
      ...BUILDER_SHORTCUTS.UNDO,
      action: undo,
    },
    {
      ...BUILDER_SHORTCUTS.REDO,
      action: redo,
    },
    {
      ...BUILDER_SHORTCUTS.REDO_ALT,
      action: redo,
    },
    {
      ...BUILDER_SHORTCUTS.SAVE,
      action: onSave,
    },
    {
      ...BUILDER_SHORTCUTS.DELETE,
      action: () => {
        if (selectedSection) {
          const index = sections.findIndex(
            (s) => (s.uniqueId || s.id) === (selectedSection.uniqueId || selectedSection.id)
          )
          if (index !== -1) {
            handleDeleteSection(index)
          }
        }
      },
    },
    {
      ...BUILDER_SHORTCUTS.DUPLICATE,
      action: () => {
        if (selectedSection) {
          const index = sections.findIndex(
            (s) => (s.uniqueId || s.id) === (selectedSection.uniqueId || selectedSection.id)
          )
          if (index !== -1) {
            handleDuplicateSection(index)
          }
        }
      },
    },
    {
      ...BUILDER_SHORTCUTS.ESCAPE,
      action: () => setSelectedSection(null),
      preventDefault: false,
    },
  ])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    // Si on dépose depuis la bibliothèque vers le canvas
    if (over.id === "canvas-drop-zone" && active.data.current) {
      const newWidget = active.data.current
      // Deep clone pour éviter le partage de références entre sections
      const uniqueSection = JSON.parse(JSON.stringify({
        ...newWidget,
        uniqueId: `${newWidget.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      }))
      const newSections = [...sections, uniqueSection]
      handleSectionsUpdate(newSections)
      return
    }

    // Si on réorganise les sections dans le canvas
    const oldIndex = sections.findIndex((s) => (s.uniqueId || s.id) === active.id)
    const newIndex = sections.findIndex((s) => (s.uniqueId || s.id) === over.id)

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      const newSections = arrayMove(sections, oldIndex, newIndex)
      handleSectionsUpdate(newSections)
    }
  }

  const handleUpdateSection = (index: number, updatedSection: any) => {
    const newSections = [...sections]
    newSections[index] = updatedSection
    handleSectionsUpdate(newSections)
    setSelectedSection(updatedSection)
  }

  const handleDeleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    handleSectionsUpdate(newSections)
    if (selectedSection?.uniqueId === sections[index]?.uniqueId) {
      setSelectedSection(null)
    }
  }

  const handleDuplicateSection = (index: number) => {
    const sectionToDuplicate = sections[index]
    // Deep clone pour éviter le partage de références
    const duplicatedSection = JSON.parse(JSON.stringify({
      ...sectionToDuplicate,
      uniqueId: `${sectionToDuplicate.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    }))
    const newSections = [
      ...sections.slice(0, index + 1),
      duplicatedSection,
      ...sections.slice(index + 1),
    ]
    handleSectionsUpdate(newSections)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-background">
        {/* Top Bar */}
        <div className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeftIcon size={18} weight="bold" />
              Retour
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h2 className="font-semibold text-sm">Visual Builder</h2>
              <p className="text-xs text-muted-foreground">{productData.name}</p>
            </div>
          </div>

          {/* Page Selector */}
          {pages.length > 0 && (
            <div className="flex items-center gap-2">
              <FileIcon size={16} className="text-muted-foreground" />
              <Select
                value={currentPageId || ""}
                onValueChange={(value) => setCurrentPageId(value)}
              >
                <SelectTrigger className="w-[200px] h-9">
                  <SelectValue placeholder="Sélectionner une page">
                    {currentPage?.name || "Sélectionner une page"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      <div className="flex items-center gap-2">
                        <span>{page.name}</span>
                        {page.is_home && (
                          <span className="text-xs text-muted-foreground">(Accueil)</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Device Mode Toggle */}
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            <Button
              variant={deviceMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDeviceMode("desktop")}
              className="gap-2"
            >
              <MonitorIcon size={18} weight={deviceMode === "desktop" ? "fill" : "regular"} />
              Desktop
            </Button>
            <Button
              variant={deviceMode === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDeviceMode("tablet")}
              className="gap-2"
            >
              <DeviceTabletIcon size={18} weight={deviceMode === "tablet" ? "fill" : "regular"} />
              Tablet
            </Button>
            <Button
              variant={deviceMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDeviceMode("mobile")}
              className="gap-2"
            >
              <DeviceMobileIcon size={18} weight={deviceMode === "mobile" ? "fill" : "regular"} />
              Mobile
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Toggle Sidebars & Fullscreen */}
            <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDashboardSidebar(!showDashboardSidebar)}
                title="Masquer/Afficher menu dashboard"
                className="gap-1"
              >
                <SidebarIcon size={16} weight={showDashboardSidebar ? "fill" : "regular"} className="text-orange-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLeftSidebar(!showLeftSidebar)}
                title="Masquer/Afficher panneau widgets"
                className="gap-1"
              >
                <SidebarIcon size={16} weight={showLeftSidebar ? "fill" : "regular"} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRightSidebar(!showRightSidebar)}
                title="Masquer/Afficher panneau propriétés"
                className="gap-1"
              >
                <SidebarSimpleIcon size={16} weight={showRightSidebar ? "fill" : "regular"} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Quitter le plein écran (Esc)" : "Plein écran (F11)"}
                className="gap-1"
              >
                {isFullscreen ? (
                  <CornersInIcon size={16} weight="bold" />
                ) : (
                  <CornersOutIcon size={16} weight="bold" />
                )}
              </Button>
            </div>

            {/* Undo/Redo & Version History */}
            <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                title="Annuler (Ctrl+Z)"
                className="gap-1"
              >
                <ArrowCounterClockwiseIcon size={16} weight="bold" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                title="Refaire (Ctrl+Y)"
                className="gap-1"
              >
                <ArrowClockwiseIcon size={16} weight="bold" />
              </Button>
              <div className="h-4 w-px bg-border mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVersionHistory(true)}
                title="Historique des versions"
                className="gap-1"
                disabled={!shopConfig.shopId}
              >
                <ClockCounterClockwiseIcon size={16} weight="bold" />
              </Button>
            </div>

            {/* Auto-save indicator */}
            {isSaving && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Sauvegarde...
              </div>
            )}
            {!isSaving && lastSaved && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                <CheckCircleIcon size={14} className="text-green-600" weight="fill" />
                Sauvegardé {new Date(lastSaved).toLocaleTimeString()}
              </div>
            )}
            {saveError && (
              <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded-lg">
                <WarningIcon size={14} weight="fill" />
                Erreur
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                // Encoder les données de la boutique pour la preview
                const previewConfig = {
                  ...shopConfig,
                  sections: sections
                }
                const encodedConfig = btoa(encodeURIComponent(JSON.stringify(previewConfig)))
                // Ouvrir dans un nouvel onglet
                window.open(`/preview/full?config=${encodedConfig}`, '_blank')
              }}
            >
              <EyeIcon size={18} weight="bold" />
              Prévisualiser
            </Button>
            <Button
              onClick={() => {
                saveNow() // Sauvegarde immédiate
                onSave() // Callback parent
              }}
              size="sm"
              className="gap-2"
              disabled={isSaving}
            >
              <FloppyDiskIcon size={18} weight="fill" />
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Widgets Library */}
          {showLeftSidebar && (
            <div className="w-80 border-r bg-card overflow-hidden transition-all duration-300">
              <WidgetsLibraryPanel
                productData={productData}
                currentSections={sections}
                onAddMultipleWidgets={(widgets) => {
                  // Si les widgets sont les mêmes sections (réordonnées), on remplace
                  // Sinon on ajoute
                  const isReorder = widgets.every((w: any) =>
                    sections.some((s: any) => s.uniqueId === w.uniqueId || s.id === w.id)
                  )

                  const newSections = isReorder ? widgets : [...sections, ...widgets]
                  handleSectionsUpdate(newSections)
                }}
              />
            </div>
          )}

          {/* Center - Canvas */}
          <div className="flex-1 bg-muted/30 overflow-x-auto overflow-y-auto">
            <div className="p-8 min-w-max">
              <div
                className={`bg-background shadow-2xl transition-all duration-300 min-h-full ${
                  deviceMode === "desktop" ? "w-full" : "mx-auto"
                }`}
                style={{
                  width: deviceMode === "desktop" ? "1280px" : canvasWidths[deviceMode]
                }}
              >
                <BuilderCanvas
                  sections={sections}
                  selectedSection={selectedSection}
                  brandColor={shopConfig.brandColor || "#ea580c"}
                  deviceMode={deviceMode}
                  onSelectSection={setSelectedSection}
                  onUpdateSection={handleUpdateSection}
                  onDeleteSection={handleDeleteSection}
                  onDuplicateSection={handleDuplicateSection}
                  onReorderSections={handleSectionsUpdate}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties Panel */}
          {showRightSidebar && (
            <div className="w-80 border-l bg-card overflow-hidden transition-all duration-300">
              <PropertiesPanel
                selectedSection={selectedSection}
                productData={productData}
                onUpdate={(updatedSection) => {
                  const index = sections.findIndex(
                    (s) => (s.uniqueId || s.id) === (updatedSection.uniqueId || updatedSection.id)
                  )
                  if (index !== -1) {
                    handleUpdateSection(index, updatedSection)
                  }
                }}
                onDelete={() => {
                  const index = sections.findIndex(
                    (s) => (s.uniqueId || s.id) === (selectedSection?.uniqueId || selectedSection?.id)
                  )
                  if (index !== -1) {
                    handleDeleteSection(index)
                  }
                }}
                onDuplicate={() => {
                  const index = sections.findIndex(
                    (s) => (s.uniqueId || s.id) === (selectedSection?.uniqueId || selectedSection?.id)
                  )
                  if (index !== -1) {
                    handleDuplicateSection(index)
                  }
                }}
                brandColor={shopConfig.brandColor || "#ea580c"}
              />
            </div>
          )}
        </div>
      </div>

      {/* Version History Dialog */}
      {shopConfig.shopId && (
        <VersionHistory
          open={showVersionHistory}
          onOpenChange={setShowVersionHistory}
          shopId={shopConfig.shopId}
          onRestore={(version) => {
            // Restaurer la version
            if (version.snapshot) {
              setSections(version.snapshot.sections || [])
              setShopConfig(version.snapshot.config || shopConfig)
            }
          }}
        />
      )}
    </DndContext>
  )
}
