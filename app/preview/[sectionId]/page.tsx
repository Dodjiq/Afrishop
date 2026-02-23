"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export default function SectionPreviewPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [template, setTemplate] = useState<any>(null)
  const [brandColor, setBrandColor] = useState("#ea580c")

  useEffect(() => {
    // Récupérer les données depuis les search params (encodées en base64)
    const templateData = searchParams.get('data')
    const colorParam = searchParams.get('color')

    if (templateData) {
      try {
        // Décoder depuis base64 UTF-8
        // Utiliser decodeURIComponent pour supporter les caractères UTF-8 (emojis, etc.)
        const decodedData = JSON.parse(decodeURIComponent(atob(templateData)))
        setTemplate(decodedData)
      } catch (error) {
        console.error('Erreur lors du décodage des données:', error)
      }
    }

    if (colorParam) {
      setBrandColor(colorParam)
    }
  }, [searchParams])

  const getPreviewContent = () => {
    if (!template) return null

    // HERO SECTIONS - Différentes variantes
    if (template.category === "hero") {
      if (template.id.includes("split")) {
        return (
          <div className="p-12 md:p-20">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <div className="space-y-6">
                <div className="text-sm uppercase tracking-wider text-primary font-semibold">Nouveau</div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">Innovation & Qualité</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">Un produit pensé pour répondre à tous vos besoins</p>
                <button className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg text-lg" style={{ backgroundColor: brandColor }}>
                  Découvrir
                </button>
              </div>
              <div className="h-96 bg-muted/50 rounded-2xl flex items-center justify-center">
                <span className="text-xl text-muted-foreground">Image produit</span>
              </div>
            </div>
          </div>
        )
      }
      if (template.id.includes("gradient")) {
        return (
          <div className="p-16 md:p-24 text-center" style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)` }}>
            <div className="text-white space-y-6 max-w-5xl mx-auto">
              <div className="text-sm uppercase tracking-wider font-semibold opacity-90">Innovation</div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">Le Futur est Maintenant</h1>
              <p className="text-2xl opacity-90">Rejoignez des milliers de clients satisfaits</p>
              <button className="px-10 py-5 rounded-lg font-semibold bg-white shadow-2xl mt-6 text-xl" style={{ color: brandColor }}>
                Commencer
              </button>
            </div>
          </div>
        )
      }
      // Hero centré par défaut
      return (
        <div className="p-12 md:p-20 text-center" style={{ background: `linear-gradient(135deg, ${brandColor}15, ${brandColor}05)` }}>
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="text-sm uppercase tracking-wider text-primary font-semibold">Nouveau</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Titre de votre produit</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Description captivante de votre produit qui attire l'attention et donne envie d'acheter.
            </p>
            <button className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg text-lg" style={{ backgroundColor: brandColor }}>
              Acheter Maintenant
            </button>
          </div>
        </div>
      )
    }

    // FEATURES SECTIONS - Différentes variantes
    if (template.category === "features") {
      const is4Cols = template.id.includes("4-colonnes")
      const is2Cols = template.id.includes("2-colonnes")

      if (template.id.includes("alternée")) {
        return (
          <div className="p-12 md:p-20 space-y-16">
            <h2 className="text-4xl font-bold text-center mb-12">Découvrez Chaque Détail</h2>
            {[1, 2].map((i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 0 ? 'md:order-2' : ''}>
                  <div className="h-64 bg-muted/50 rounded-2xl flex items-center justify-center">
                    <span className="text-xl text-muted-foreground">Illustration {i}</span>
                  </div>
                </div>
                <div className={i % 2 === 0 ? 'md:order-1' : ''}>
                  <h3 className="text-3xl font-bold mb-4">Fonctionnalité {i}</h3>
                  <p className="text-xl text-muted-foreground mb-6 leading-relaxed">Description détaillée de cette fonctionnalité importante</p>
                  <div className="flex items-center gap-3" style={{ color: brandColor }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium text-lg">Avantage clé</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }

      if (template.id.includes("cards")) {
        const numCards = is4Cols ? 4 : is2Cols ? 2 : 3
        return (
          <div className="p-12 md:p-20">
            <h2 className="text-4xl font-bold text-center mb-16">Caractéristiques Premium</h2>
            <div className={`grid gap-8 max-w-7xl mx-auto ${is4Cols ? 'md:grid-cols-4' : is2Cols ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {Array.from({ length: numCards }).map((_, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-shadow">
                  <div className="w-20 h-20 rounded-xl mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${brandColor}20` }}>
                    <svg className="w-10 h-10" style={{ color: brandColor }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-center mb-4 text-xl">Feature {i + 1}</h3>
                  <p className="text-base text-muted-foreground text-center leading-relaxed">
                    Description de la fonctionnalité
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      }

      const numFeatures = is4Cols ? 4 : is2Cols ? 2 : 3
      return (
        <div className="p-12 md:p-20">
          <h2 className="text-4xl font-bold text-center mb-16">Caractéristiques principales</h2>
          <div className={`grid gap-8 max-w-7xl mx-auto ${is4Cols ? 'md:grid-cols-4' : is2Cols ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {Array.from({ length: numFeatures }).map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-muted/50 text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white font-bold text-3xl" style={{ backgroundColor: brandColor }}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-xl">Feature {i + 1}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Description de la fonctionnalité
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // HOW IT WORKS
    if (template.category === "how-it-works") {
      if (template.id.includes("timeline")) {
        return (
          <div className="p-12 md:p-20">
            <h2 className="text-4xl font-bold text-center mb-16">Notre Processus</h2>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-10 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: `${brandColor}30` }} />
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative flex gap-8">
                    <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl z-10" style={{ backgroundColor: brandColor }}>
                      {i}
                    </div>
                    <div className="flex-1 pt-4">
                      <h3 className="text-2xl font-bold mb-3">Étape {i}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">Explication détaillée de cette étape du processus</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="p-12 md:p-20">
          <h2 className="text-4xl font-bold text-center mb-16">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto" style={{ backgroundColor: brandColor }}>
                  {i}
                </div>
                <h3 className="font-bold text-xl">Étape {i}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">Explication simple de cette étape</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // TESTIMONIALS
    if (template.category === "testimonials") {
      if (template.id.includes("grid")) {
        return (
          <div className="p-12 md:p-20 bg-muted/30">
            <h2 className="text-4xl font-bold text-center mb-16">Avis Clients</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-8 rounded-2xl border bg-card space-y-4">
                  <div className="flex gap-1 text-2xl" style={{ color: brandColor }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </div>
                  <p className="text-base text-muted-foreground italic leading-relaxed">"Excellent produit, je recommande vivement !"</p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: brandColor }}>
                      C{i}
                    </div>
                    <p className="text-base font-semibold">Client {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      return (
        <div className="p-12 md:p-20 bg-muted/30">
          <h2 className="text-4xl font-bold text-center mb-16">Témoignages clients</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl bg-background space-y-4">
                <div className="flex gap-1 text-2xl" style={{ color: brandColor }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
                <p className="text-base text-muted-foreground italic leading-relaxed">"Excellent produit, je recommande vivement !"</p>
                <p className="text-base font-semibold">- Client {i}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // FAQ
    if (template.category === "faq") {
      if (template.id.includes("two-columns")) {
        return (
          <div className="p-12 md:p-20 bg-muted/30">
            <h2 className="text-4xl font-bold text-center mb-16">Besoin d'Aide ?</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-8 rounded-2xl bg-background border">
                  <h3 className="font-bold text-xl mb-3">Question {i} ?</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">Réponse détaillée à cette question importante.</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
      return (
        <div className="p-12 md:p-20">
          <h2 className="text-4xl font-bold text-center mb-16">Questions fréquentes</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">Question fréquente {i} ?</h3>
                  <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: `${brandColor}40` }}>
                    <span className="text-xl" style={{ color: brandColor }}>▼</span>
                  </div>
                </div>
                <p className="text-base text-muted-foreground mt-4 leading-relaxed">Réponse détaillée à cette question importante.</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // CTA
    if (template.category === "cta") {
      if (template.id.includes("urgency")) {
        return (
          <div className="p-16 md:p-24 text-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)` }}>
            <div className="text-white space-y-6 max-w-5xl mx-auto">
              <div className="inline-block px-6 py-3 bg-white/20 rounded-full text-lg font-semibold">⏰ Offre limitée</div>
              <h2 className="text-5xl font-bold">Offre Limitée !</h2>
              <p className="text-2xl opacity-90">Plus que quelques heures</p>
              <button className="px-10 py-5 rounded-lg font-semibold bg-white shadow-2xl mt-6 text-xl" style={{ color: brandColor }}>
                J'en Profite
              </button>
              <p className="text-lg opacity-75 mt-4">Plus que 24h pour profiter de l'offre</p>
            </div>
          </div>
        )
      }
      if (template.id.includes("social-proof")) {
        return (
          <div className="p-12 md:p-20 bg-muted/30 rounded-2xl">
            <div className="text-center space-y-10 max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold">Rejoignez 10,000+ Clients Satisfaits</h2>
              <div className="flex flex-wrap justify-center gap-16">
                <div className="text-center">
                  <div className="text-6xl font-bold" style={{ color: brandColor }}>10,000+</div>
                  <div className="text-lg text-muted-foreground mt-2">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold" style={{ color: brandColor }}>4.9/5</div>
                  <div className="text-lg text-muted-foreground mt-2">Note</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold" style={{ color: brandColor }}>98%</div>
                  <div className="text-lg text-muted-foreground mt-2">Satisfaction</div>
                </div>
              </div>
              <button className="px-10 py-5 rounded-lg font-semibold text-white shadow-2xl text-xl" style={{ backgroundColor: brandColor }}>
                Me Lancer
              </button>
            </div>
          </div>
        )
      }
      return (
        <div className="p-12 md:p-20 text-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${brandColor}20, ${brandColor}10)` }}>
          <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Prêt à commencer ?</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">Ne manquez pas cette opportunité unique !</p>
            <button className="px-10 py-5 rounded-lg font-semibold text-white shadow-2xl text-xl" style={{ backgroundColor: brandColor }}>
              Commander maintenant
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="p-20 text-center text-muted-foreground">
        <p className="text-xl">Prévisualisation non disponible</p>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Chargement de la prévisualisation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeftIcon size={18} weight="bold" />
              Retour
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{template.thumbnail}</span>
              <div>
                <h1 className="text-xl font-bold">{template.name}</h1>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground bg-muted px-4 py-2 rounded-lg">
            Prévisualisation - Le contenu réel sera personnalisé
          </div>
        </div>
      </div>

      {/* Contenu de la preview */}
      <div className="w-full">
        {getPreviewContent()}
      </div>
    </div>
  )
}
