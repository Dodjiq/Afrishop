"use client"

import { StarIcon, QuotesIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface TestimonialsSectionProps {
  section: any
  productData: any
  shopConfig: any
}

export function TestimonialsSection({
  section,
  productData,
  shopConfig,
}: TestimonialsSectionProps) {
  const { content, style } = section
  const { brandColor } = shopConfig

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

  const testimonials = [
    {
      name: "Marie Kouassi",
      role: "Cliente fidèle",
      content:
        "Excellent produit ! La qualité est au rendez-vous et la livraison a été très rapide. Je recommande vivement.",
      rating: 5,
      avatar: "MK",
    },
    {
      name: "Jean-Paul Diop",
      role: "Abidjan, CI",
      content:
        "Service impeccable du début à la fin. Le produit correspond exactement à la description.",
      rating: 5,
      avatar: "JP",
    },
    {
      name: "Aminata Traoré",
      role: "Lomé, TG",
      content:
        "Très satisfaite de mon achat. Le rapport qualité-prix est imbattable !",
      rating: 5,
      avatar: "AT",
    },
  ]

  return (
    <section className={cn(paddingTop, paddingBottom, backgroundColor, "px-6")}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {content?.subtitle && (
            <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">
              {content.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content?.title || "Ce que disent nos clients"}
          </h2>
          {content?.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <QuotesIcon
                size={32}
                weight="fill"
                className="mb-4 opacity-20"
                style={{ color: brandColor }}
              />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={16}
                    weight="fill"
                    style={{ color: brandColor }}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: brandColor }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
