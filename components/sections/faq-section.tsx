"use client"

import { useState } from "react"
import { CaretDownIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface FAQSectionProps {
  section: any
  productData: any
  shopConfig: any
}

export function FAQSection({ section, productData, shopConfig }: FAQSectionProps) {
  const { content, style } = section
  const { brandColor } = shopConfig
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const getPadding = (value: string) => {
    switch (value) {
      case "none":
        return "py-0"
      case "small":
        return "py-8 md:py-12"
      case "normal":
        return "py-12 md:py-16"
      case "large":
        return "py-16 md:py-24"
      default:
        return "py-12 md:py-16"
    }
  }

  const getBackgroundColor = (value: string) => {
    switch (value) {
      case "white":
        return "bg-white"
      case "muted":
        return "bg-muted/30"
      case "primary":
        return "bg-primary/5"
      default:
        return "bg-transparent"
    }
  }

  const paddingTop = getPadding(style?.paddingTop || "normal")
  const paddingBottom = getPadding(style?.paddingBottom || "normal")
  const backgroundColor = getBackgroundColor(style?.backgroundColor || "transparent")

  const faqs = [
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "Nous livrons généralement sous 3 à 5 jours ouvrables dans toute l'Afrique de l'Ouest. Pour les zones plus éloignées, comptez 7 à 10 jours.",
    },
    {
      question: "Puis-je retourner mon produit ?",
      answer:
        "Oui, vous disposez de 14 jours pour retourner votre produit s'il ne vous convient pas, dans son emballage d'origine et en parfait état.",
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les cartes bancaires, le mobile money (MTN, Moov, Orange), et le paiement à la livraison dans certaines zones.",
    },
    {
      question: "Le produit est-il garanti ?",
      answer:
        "Oui, tous nos produits sont garantis 12 mois contre les défauts de fabrication.",
    },
    {
      question: "Comment suivre ma commande ?",
      answer:
        "Vous recevrez un numéro de suivi par email dès l'expédition de votre commande. Vous pourrez suivre votre colis en temps réel.",
    },
  ]

  return (
    <section className={cn(paddingTop, paddingBottom, backgroundColor, "px-6")}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {content?.subtitle && (
            <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">
              {content.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content?.title || "Questions fréquentes"}
          </h2>
          {content?.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <CaretDownIcon
                  size={20}
                  weight="bold"
                  className={cn(
                    "flex-shrink-0 transition-transform",
                    openIndex === index ? "rotate-180" : ""
                  )}
                  style={{ color: brandColor }}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
