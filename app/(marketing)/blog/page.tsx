"use client"

import { Footer } from "@/components/marketing/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon } from "@phosphor-icons/react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Comment démarrer le dropshipping en Afrique en 2026",
    excerpt: "Le guide complet pour lancer votre boutique e-commerce et générer vos premiers revenus en ligne.",
    category: "Guide",
    date: "15 Février 2026",
    readTime: "8 min",
    image: "/blog/dropshipping-afrique.jpg",
  },
  {
    id: 2,
    title: "Les 10 meilleurs produits à vendre en Afrique",
    excerpt: "Découvrez les produits les plus demandés sur le marché africain et comment les importer facilement.",
    category: "Stratégie",
    date: "12 Février 2026",
    readTime: "6 min",
    image: "/blog/meilleurs-produits.jpg",
  },
  {
    id: 3,
    title: "Shopify vs WooCommerce : Quel CMS choisir ?",
    excerpt: "Comparaison détaillée des deux plateformes e-commerce les plus populaires pour entrepreneurs africains.",
    category: "Comparaison",
    date: "8 Février 2026",
    readTime: "10 min",
    image: "/blog/shopify-vs-woocommerce.jpg",
  },
  {
    id: 4,
    title: "Comment optimiser vos marges en dropshipping",
    excerpt: "Stratégies pour maximiser vos profits tout en restant compétitif sur le marché.",
    category: "Business",
    date: "5 Février 2026",
    readTime: "7 min",
    image: "/blog/optimiser-marges.jpg",
  },
  {
    id: 5,
    title: "Marketing digital pour e-commerce : Les bases",
    excerpt: "Les fondamentaux du marketing digital pour attirer des clients et augmenter vos ventes.",
    category: "Marketing",
    date: "1 Février 2026",
    readTime: "12 min",
    image: "/blog/marketing-digital.jpg",
  },
  {
    id: 6,
    title: "Gérer la logistique en Afrique : Conseils pratiques",
    excerpt: "Comment gérer efficacement la livraison et le service client dans le contexte africain.",
    category: "Logistique",
    date: "28 Janvier 2026",
    readTime: "9 min",
    image: "/blog/logistique-afrique.jpg",
  },
]

export default function BlogPage() {
  return (
    <>
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          {/* Grid Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="mb-16 text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Blog AfriShop
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Conseils, guides et actualités pour réussir votre business e-commerce en Afrique
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                    {/* Image placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-orange-500/20" />

                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon size={16} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon size={16} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
