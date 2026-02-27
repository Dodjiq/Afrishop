"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MonitorIcon,
  DeviceTabletIcon,
  DeviceMobileIcon,
  XIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react"

interface LivePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sections: any[]
  shopConfig: any
  productData: any
}

export function LivePreviewDialog({
  open,
  onOpenChange,
  sections,
  shopConfig,
  productData,
}: LivePreviewDialogProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }

  // Générer l'URL de prévisualisation
  const generatePreviewUrl = () => {
    // En production, cela pointera vers une vraie URL
    // Pour l'instant, on utilise une route locale
    const params = new URLSearchParams({
      sections: JSON.stringify(sections),
      config: JSON.stringify(shopConfig),
      product: JSON.stringify(productData),
    })
    return `/preview/full?${params.toString()}`
  }

  const previewUrl = generatePreviewUrl()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Prévisualisation en direct</DialogTitle>
              <DialogDescription>
                Visualisez votre boutique telle qu'elle apparaîtra aux clients
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              {/* Device Selector */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                <Button
                  variant={deviceMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDeviceMode("desktop")}
                >
                  <MonitorIcon size={18} weight={deviceMode === "desktop" ? "fill" : "regular"} />
                </Button>
                <Button
                  variant={deviceMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDeviceMode("tablet")}
                >
                  <DeviceTabletIcon size={18} weight={deviceMode === "tablet" ? "fill" : "regular"} />
                </Button>
                <Button
                  variant={deviceMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDeviceMode("mobile")}
                >
                  <DeviceMobileIcon size={18} weight={deviceMode === "mobile" ? "fill" : "regular"} />
                </Button>
              </div>

              {/* Open in New Tab */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(previewUrl, "_blank")}
                className="gap-2"
              >
                <ArrowSquareOutIcon size={18} weight="bold" />
                Ouvrir
              </Button>

              {/* Close */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                <XIcon size={20} weight="bold" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Preview Content */}
        <div className="flex-1 bg-muted/30 p-6 overflow-auto">
          <div
            className="mx-auto bg-background shadow-2xl rounded-lg overflow-hidden transition-all duration-300"
            style={{ width: deviceWidths[deviceMode], maxWidth: "100%" }}
          >
            {/* Preview Header */}
            <div className="bg-muted/50 px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-muted-foreground ml-2">
                  {shopConfig.shopName || productData?.name || "Boutique"}.afrishop.com
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                Prévisualisation
              </Badge>
            </div>

            {/* Preview IFrame */}
            <div className="relative" style={{ minHeight: "600px" }}>
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                style={{ minHeight: "600px" }}
                title="Prévisualisation boutique"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{sections.length} sections</span>
              <span className="w-px h-4 bg-border"></span>
              <span>v{shopConfig.version || 1}</span>
              {shopConfig.brandColor && (
                <>
                  <span className="w-px h-4 bg-border"></span>
                  <div className="flex items-center gap-2">
                    <span>Couleur:</span>
                    <div
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: shopConfig.brandColor }}
                    ></div>
                  </div>
                </>
              )}
            </div>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              size="sm"
            >
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
