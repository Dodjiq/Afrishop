"use client"

import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StorefrontIcon, TagIcon } from "@phosphor-icons/react"
import { AsteriskIcon } from "@phosphor-icons/react"

interface Step3Props {
  shopName: string
  setShopName: (name: string) => void
  shopNiche: string
  setShopNiche: (niche: string) => void
}

const niches = [
  { value: "fashion", label: "Mode & Vêtements" },
  { value: "beauty", label: "Beauté & Cosmétiques" },
  { value: "electronics", label: "Électronique & Gadgets" },
  { value: "home", label: "Maison & Décoration" },
  { value: "sports", label: "Sports & Fitness" },
  { value: "jewelry", label: "Bijoux & Accessoires" },
  { value: "kids", label: "Enfants & Bébés" },
  { value: "health", label: "Santé & Bien-être" },
  { value: "pets", label: "Animaux de compagnie" },
  { value: "other", label: "Autre" },
]

export function Step3ShopInfo({
  shopName,
  setShopName,
  shopNiche,
  setShopNiche,
}: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Informations de votre boutique</h2>
        <p className="text-muted-foreground">
          Donnez un nom à votre boutique et choisissez votre niche
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            {/* Shop Name */}
            <Field>
              <FieldLabel htmlFor="shopName" className="flex items-center gap-1">
                Nom de la boutique
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <div className="relative">
                <StorefrontIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  id="shopName"
                  type="text"
                  placeholder="Ma Boutique Afrique"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ce nom apparaîtra sur votre boutique en ligne
              </p>
            </Field>

            {/* Shop Niche */}
            <Field>
              <FieldLabel htmlFor="shopNiche" className="flex items-center gap-1">
                Catégorie / Niche
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <Select value={shopNiche} onValueChange={setShopNiche} required>
                <SelectTrigger id="shopNiche">
                  <div className="flex items-center gap-2">
                    <TagIcon size={18} className="text-muted-foreground" />
                    <SelectValue placeholder="Sélectionnez votre niche" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {niches.map((niche) => (
                    <SelectItem key={niche.value} value={niche.value}>
                      {niche.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Cela nous aide à mieux personnaliser votre boutique
              </p>
            </Field>
          </FieldGroup>

          {/* Preview */}
          {shopName && shopNiche && (
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium mb-2 text-primary">
                Aperçu de votre boutique :
              </p>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <StorefrontIcon size={24} className="text-primary" weight="duotone" />
                </div>
                <div>
                  <p className="font-semibold">{shopName}</p>
                  <p className="text-sm text-muted-foreground">
                    {niches.find((n) => n.value === shopNiche)?.label}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="p-4 bg-accent/50 rounded-lg">
        <p className="text-sm font-medium mb-2">💡 Conseils :</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Choisissez un nom court et mémorable</li>
          <li>• Évitez les caractères spéciaux</li>
          <li>• Vous pourrez modifier ces informations plus tard</li>
        </ul>
      </div>
    </div>
  )
}
