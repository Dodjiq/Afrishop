import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/marketing/footer"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "Politique de cookies | AfriShop",
  description: "Politique d'utilisation des cookies sur la plateforme AfriShop",
}

export default function CookiesPage() {
  return (
    <>
    <div className="container max-w-7xl py-16 px-6 md:px-8 mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="gap-2">
            <ArrowLeftIcon size={16} />
            Retour à l'accueil
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">Politique de cookies</h1>
        <p className="mt-2 text-muted-foreground">
          Dernière mise à jour : 15 février 2026
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette,
            smartphone) lorsque vous visitez un site web. Les cookies permettent au site de
            reconnaître votre appareil et de mémoriser certaines informations sur vos préférences
            ou actions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Comment utilisons-nous les cookies ?</h2>
          <p className="text-muted-foreground leading-relaxed">
            AfriShop utilise des cookies pour améliorer votre expérience, sécuriser votre compte,
            et analyser l'utilisation de notre plateforme. Nous utilisons à la fois nos propres
            cookies (cookies "first-party") et des cookies de partenaires tiers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Types de cookies utilisés</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-medium text-foreground mb-2">3.1 Cookies strictement nécessaires</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Ces cookies sont essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium">session_id</span> - Maintient votre session de connexion</li>
                <li><span className="font-medium">auth_token</span> - Authentification sécurisée</li>
                <li><span className="font-medium">csrf_token</span> - Protection contre les attaques CSRF</li>
                <li><span className="font-medium">cookie_consent</span> - Mémorise vos préférences de cookies</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Durée de conservation : Session ou 30 jours
              </p>
            </div>

            <div className="border-l-4 border-orange-400 pl-4">
              <h3 className="text-lg font-medium text-foreground mb-2">3.2 Cookies de performance</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Ces cookies nous aident à comprendre comment les utilisateurs interagissent avec notre site.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium">_ga</span> - Google Analytics - Analyse du trafic</li>
                <li><span className="font-medium">_gid</span> - Google Analytics - Identification des sessions</li>
                <li><span className="font-medium">_gat</span> - Google Analytics - Limitation du taux de requêtes</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Durée de conservation : 24 heures à 2 ans
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-medium text-foreground mb-2">3.3 Cookies fonctionnels</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Ces cookies permettent de mémoriser vos préférences et personnaliser votre expérience.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium">theme_preference</span> - Mode clair/sombre</li>
                <li><span className="font-medium">language</span> - Langue préférée</li>
                <li><span className="font-medium">dashboard_layout</span> - Configuration du tableau de bord</li>
                <li><span className="font-medium">recent_searches</span> - Historique de recherche</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Durée de conservation : 1 an
              </p>
            </div>

            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="text-lg font-medium text-foreground mb-2">3.4 Cookies de ciblage/publicitaires</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Ces cookies sont utilisés pour afficher des publicités pertinentes (avec votre consentement).
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium">_fbp</span> - Facebook Pixel - Suivi des conversions</li>
                <li><span className="font-medium">_gcl_au</span> - Google Ads - Suivi des conversions</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Durée de conservation : 3 mois
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Cookies tiers</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Nous utilisons les services de tiers qui peuvent déposer leurs propres cookies :</p>

            <div className="space-y-3">
              <div>
                <h3 className="text-base font-medium text-foreground">Google Analytics</h3>
                <p className="text-sm">
                  Analyse du trafic et du comportement des utilisateurs.
                  <Link href="https://policies.google.com/privacy" className="text-primary hover:underline ml-1">
                    Politique de confidentialité
                  </Link>
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground">Stripe</h3>
                <p className="text-sm">
                  Traitement sécurisé des paiements et prévention de la fraude.
                  <Link href="https://stripe.com/privacy" className="text-primary hover:underline ml-1">
                    Politique de confidentialité
                  </Link>
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground">Facebook Pixel</h3>
                <p className="text-sm">
                  Mesure de l'efficacité publicitaire (uniquement avec votre consentement).
                  <Link href="https://www.facebook.com/privacy/explanation" className="text-primary hover:underline ml-1">
                    Politique de confidentialité
                  </Link>
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground">Shopify</h3>
                <p className="text-sm">
                  Intégration avec votre boutique Shopify.
                  <Link href="https://www.shopify.com/legal/privacy" className="text-primary hover:underline ml-1">
                    Politique de confidentialité
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Gestion des cookies</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <h3 className="text-lg font-medium text-foreground">5.1 Paramètres du site</h3>
            <p>
              Vous pouvez gérer vos préférences de cookies directement depuis notre bannière de
              consentement qui apparaît lors de votre première visite. Vous pouvez également modifier
              vos choix à tout moment depuis les paramètres de votre compte.
            </p>

            <h3 className="text-lg font-medium text-foreground">5.2 Paramètres du navigateur</h3>
            <p>Vous pouvez configurer votre navigateur pour refuser tous les cookies ou certains types :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Chrome</span> : Paramètres → Confidentialité et sécurité → Cookies
              </li>
              <li>
                <span className="font-medium">Firefox</span> : Paramètres → Vie privée et sécurité → Cookies
              </li>
              <li>
                <span className="font-medium">Safari</span> : Préférences → Confidentialité → Cookies
              </li>
              <li>
                <span className="font-medium">Edge</span> : Paramètres → Cookies et autorisations de site
              </li>
            </ul>

            <div className="mt-4 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="text-sm font-medium text-foreground">
                ⚠️ Attention : Bloquer tous les cookies peut affecter le fonctionnement du site et vous
                empêcher d'utiliser certaines fonctionnalités (connexion, panier, préférences).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Stockage local et session storage</h2>
          <p className="text-muted-foreground leading-relaxed">
            En plus des cookies, nous utilisons également le stockage local (localStorage) et le
            stockage de session (sessionStorage) de votre navigateur pour stocker temporairement
            certaines données comme vos brouillons de produits, filtres de recherche, ou état de
            l'interface. Ces données restent sur votre appareil et ne sont pas transmises à nos serveurs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Mise à jour de cette politique</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous pouvons mettre à jour cette politique de cookies pour refléter les changements dans
            nos pratiques ou pour des raisons légales. Nous vous informerons des modifications
            importantes via notre site ou par email.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Désactivation des cookies publicitaires</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Pour désactiver les cookies publicitaires de manière globale, vous pouvez utiliser ces outils :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <Link href="https://www.youronlinechoices.com/fr/" className="text-primary hover:underline">
                  Your Online Choices (Europe)
                </Link>
              </li>
              <li>
                <Link href="https://optout.networkadvertising.org/" className="text-primary hover:underline">
                  Network Advertising Initiative
                </Link>
              </li>
              <li>
                <Link href="https://www.aboutads.info/choices/" className="text-primary hover:underline">
                  Digital Advertising Alliance
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Do Not Track (DNT)</h2>
          <p className="text-muted-foreground leading-relaxed">
            Certains navigateurs offrent une option "Do Not Track" (Ne pas suivre). Actuellement,
            il n'existe pas de norme industrielle pour répondre aux signaux DNT. Nous respectons
            cependant vos choix de cookies via notre bannière de consentement.
          </p>
        </section>

        <section className="border-t pt-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Questions sur les cookies ?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pour toute question concernant notre utilisation des cookies :
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>Email : privacy@afrishop.com</li>
            <li>WhatsApp : +228 90 00 00 00</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            Consultez également notre{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Politique de confidentialité
            </Link>{" "}
            pour plus d'informations sur la protection de vos données.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  )
}
