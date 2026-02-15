import { Metadata } from "next"
import { Footer } from "@/components/marketing/footer"
import { AboutSection } from "@/components/marketing/about-section"

export const metadata: Metadata = {
  title: "À propos | AfriShop",
  description: "Découvrez l'histoire de AfriShop et notre mission d'aider les entrepreneurs africains à réussir dans l'e-commerce",
}

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
