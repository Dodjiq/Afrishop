"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, CheckCircleIcon, WarningIcon } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"

interface Step1Props {
  productLink: string
  setProductLink: (link: string) => void
}

export function Step1ProductLink({ productLink, setProductLink }: Step1Props) {
  const [isValidating, setIsValidating] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const handleLinkChange = (value: string) => {
    setProductLink(value)

    // Validation simple
    if (value.trim() === "") {
      setIsValid(null)
      return
    }

    const isAliExpress = value.includes("aliexpress.com")
    const isAlibaba = value.includes("alibaba.com")
    const isAmazon = value.includes("amazon.")

    setIsValid(isAliExpress || isAlibaba || isAmazon)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Commencez par votre produit</h2>
        <p className="text-muted-foreground">
          Collez le lien de votre produit depuis AliExpress, Amazon ou Alibaba
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="productLink">
                Lien du produit
              </FieldLabel>
              <div className="space-y-3">
                <div className="relative">
                  <LinkIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    id="productLink"
                    type="url"
                    placeholder="https://www.aliexpress.com/item/..."
                    value={productLink}
                    onChange={(e) => handleLinkChange(e.target.value)}
                    className="pl-10"
                  />
                  {isValid !== null && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isValid ? (
                        <CheckCircleIcon size={20} className="text-green-600" weight="fill" />
                      ) : (
                        <WarningIcon size={20} className="text-red-600" weight="fill" />
                      )}
                    </div>
                  )}
                </div>

                {isValid === false && productLink.trim() !== "" && (
                  <p className="text-sm text-red-600">
                    Veuillez entrer un lien valide depuis AliExpress, Amazon ou Alibaba
                  </p>
                )}

                {isValid && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircleIcon size={16} weight="fill" />
                    <span>Lien valide détecté !</span>
                  </div>
                )}
              </div>
            </Field>
          </FieldGroup>

          {/* Supported Platforms */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-3">Plateformes supportées :</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                AliExpress
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Amazon
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Alibaba
              </Badge>
            </div>
          </div>

          {/* Example */}
          <div className="mt-4 p-3 bg-accent/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Exemple :</span> https://www.aliexpress.com/item/1005006234567890.html
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
