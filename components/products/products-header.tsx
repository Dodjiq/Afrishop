"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, DownloadIcon } from "@phosphor-icons/react"

export function ProductsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produits</h1>
        <p className="text-muted-foreground">
          Gérez et importez vos produits depuis AliExpress, Amazon et Alibaba.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="gap-2">
          <DownloadIcon size={18} weight="bold" />
          Exporter
        </Button>
        <Button className="gap-2">
          <PlusIcon size={18} weight="bold" />
          Importer produit
        </Button>
      </div>
    </div>
  )
}
