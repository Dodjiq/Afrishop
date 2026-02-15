import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/marketing/footer"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | AfriShop",
  description: "Conditions générales d'utilisation de la plateforme AfriShop",
}

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold tracking-tight">Conditions d'utilisation</h1>
        <p className="mt-2 text-muted-foreground">
          Dernière mise à jour : 15 février 2026
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
          <p className="text-muted-foreground leading-relaxed">
            En accédant et en utilisant AfriShop ("le Service"), vous acceptez d'être lié par ces
            Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser
            notre service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
          <p className="text-muted-foreground leading-relaxed">
            AfriShop est une plateforme SaaS qui permet aux entrepreneurs africains de créer et gérer
            des boutiques e-commerce en important des produits depuis des plateformes tierces
            (AliExpress, Amazon, Alibaba).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Inscription et compte utilisateur</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Pour utiliser AfriShop, vous devez :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Avoir au moins 18 ans</li>
              <li>Fournir des informations exactes et à jour lors de l'inscription</li>
              <li>Maintenir la sécurité de votre compte et mot de passe</li>
              <li>Nous informer immédiatement de toute utilisation non autorisée</li>
            </ul>
            <p>
              Vous êtes responsable de toutes les activités effectuées sous votre compte.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Abonnements et paiements</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <h3 className="text-lg font-medium text-foreground">4.1 Plans d'abonnement</h3>
            <p>AfriShop propose différents plans d'abonnement (Starter, Business, Agency) avec des fonctionnalités et limites spécifiques.</p>

            <h3 className="text-lg font-medium text-foreground">4.2 Paiements</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les paiements sont traités via Stripe de manière sécurisée</li>
              <li>Les abonnements sont facturés mensuellement</li>
              <li>Tous les prix sont en FCFA et incluent la TVA applicable</li>
              <li>7 jours d'essai gratuit pour tous les nouveaux utilisateurs</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground">4.3 Résiliation</h3>
            <p>
              Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord.
              L'annulation prendra effet à la fin de votre période de facturation en cours.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Utilisation acceptable</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Vous vous engagez à ne pas :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utiliser le service pour des activités illégales ou frauduleuses</li>
              <li>Vendre des produits contrefaits ou interdits</li>
              <li>Violer les droits de propriété intellectuelle de tiers</li>
              <li>Utiliser des bots ou scripts automatisés de manière abusive</li>
              <li>Tenter d'accéder aux systèmes de manière non autorisée</li>
              <li>Partager votre compte avec d'autres utilisateurs</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Propriété intellectuelle</h2>
          <p className="text-muted-foreground leading-relaxed">
            Tous les droits de propriété intellectuelle sur AfriShop (code, design, marque, contenu)
            appartiennent à AfriShop. Vous conservez tous les droits sur le contenu que vous créez
            (descriptions de produits, images personnalisées, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Limitation de responsabilité</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              AfriShop est fourni "tel quel" sans garantie d'aucune sorte. Nous ne sommes pas
              responsables de :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La qualité ou la légalité des produits importés depuis des plateformes tierces</li>
              <li>Les pertes de revenus ou de données</li>
              <li>Les interruptions de service ou bugs temporaires</li>
              <li>Les actions de plateformes tierces (Shopify, AliExpress, etc.)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Modifications des conditions</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
            importantes seront notifiées par email. Votre utilisation continue du service après
            modification constitue votre acceptation des nouvelles conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Résiliation du service</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous nous réservons le droit de suspendre ou résilier votre compte en cas de violation
            de ces conditions, sans préavis et sans remboursement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Loi applicable</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ces conditions sont régies par les lois du Togo. Tout litige sera soumis à la juridiction
            exclusive des tribunaux togolais.
          </p>
        </section>

        <section className="border-t pt-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pour toute question concernant ces conditions, contactez-nous :
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>Email : legal@afrishop.com</li>
            <li>WhatsApp : +228 90 00 00 00</li>
            <li>Adresse : Lomé, Togo</li>
          </ul>
        </section>
      </div>
    </div>
    <Footer />
    </>
  )
}
