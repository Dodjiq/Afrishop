"use client"

import { HeroSection } from "./hero-section"
import { FeaturesSection } from "./features-section"
import { HowItWorksSection } from "./how-it-works-section"
import { TestimonialsSection } from "./testimonials-section"
import { FAQSection } from "./faq-section"
import { CTASection } from "./cta-section"

interface SectionRendererProps {
  sections: any[]
  productData: any
  shopConfig: any
}

export function SectionRenderer({
  sections,
  productData,
  shopConfig,
}: SectionRendererProps) {
  const renderSection = (section: any, index: number) => {
    const commonProps = {
      key: section.id || index,
      section,
      productData,
      shopConfig,
    }

    switch (section.category) {
      case "hero":
        return <HeroSection {...commonProps} />
      case "features":
        return <FeaturesSection {...commonProps} />
      case "how-it-works":
        return <HowItWorksSection {...commonProps} />
      case "testimonials":
        return <TestimonialsSection {...commonProps} />
      case "faq":
        return <FAQSection {...commonProps} />
      case "cta":
        return <CTASection {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  )
}
