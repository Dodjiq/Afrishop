import { Metadata } from "next"
import { ProductImportForm } from "@/components/products/import-form"

export const metadata: Metadata = {
  title: "Importer des produits | AfriShop",
  description: "Importez des produits depuis AliExpress, Amazon, Alibaba",
}

export default function ProductImportPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Importer des produits</h1>
        <p className="text-muted-foreground">
          Copiez-collez simplement l'URL d'un produit depuis AliExpress, Amazon ou Alibaba
        </p>
      </div>

      {/* Import Form */}
      <ProductImportForm />

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 font-semibold">🛍️ Plateformes supportées</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• AliExpress</li>
            <li>• Amazon</li>
            <li>• Alibaba</li>
            <li>• Plus à venir...</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 font-semibold">⚡ Import automatique</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Titre du produit</li>
            <li>• Description complète</li>
            <li>• Images HD</li>
            <li>• Prix avec marge</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 font-semibold">💰 Prix FCFA</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Conversion automatique</li>
            <li>• Marge personnalisable</li>
            <li>• Prix adaptés au marché</li>
            <li>• TVA incluse</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
