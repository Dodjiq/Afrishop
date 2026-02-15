import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/marketing/footer"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "Politique de confidentialité | AfriShop",
  description: "Politique de confidentialité et protection des données d'AfriShop",
}

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold tracking-tight">Politique de confidentialité</h1>
        <p className="mt-2 text-muted-foreground">
          Dernière mise à jour : 15 février 2026
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            AfriShop ("nous", "notre", "nos") s'engage à protéger votre vie privée et vos données
            personnelles. Cette politique de confidentialité explique comment nous collectons,
            utilisons, stockons et protégeons vos informations lorsque vous utilisez notre plateforme.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Données collectées</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <h3 className="text-lg font-medium text-foreground">2.1 Informations d'inscription</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Pays de résidence</li>
              <li>Mot de passe (crypté)</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground">2.2 Données de paiement</h3>
            <p>
              Les informations de paiement (carte bancaire, Mobile Money) sont traitées par notre
              partenaire de paiement sécurisé Stripe. Nous ne stockons jamais vos données bancaires
              complètes sur nos serveurs.
            </p>

            <h3 className="text-lg font-medium text-foreground">2.3 Données d'utilisation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adresse IP et localisation géographique</li>
              <li>Type de navigateur et appareil utilisé</li>
              <li>Pages visitées et actions effectuées</li>
              <li>Produits importés et boutiques créées</li>
              <li>Historique des transactions et abonnements</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground">2.4 Données de boutique</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nom de domaine et paramètres de boutique</li>
              <li>Catalogues de produits importés</li>
              <li>Paramètres de personnalisation</li>
              <li>Statistiques de vente et performances</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Utilisation des données</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Nous utilisons vos données pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Créer et gérer votre compte utilisateur</li>
              <li>Fournir et améliorer nos services</li>
              <li>Traiter vos paiements et abonnements</li>
              <li>Vous envoyer des notifications importantes (facturation, mises à jour)</li>
              <li>Fournir un support client personnalisé</li>
              <li>Analyser l'utilisation de la plateforme pour améliorer l'expérience</li>
              <li>Prévenir la fraude et assurer la sécurité</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Communications marketing</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Avec votre consentement, nous pouvons vous envoyer :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Newsletters avec des conseils e-commerce</li>
              <li>Offres promotionnelles et réductions</li>
              <li>Nouvelles fonctionnalités et mises à jour produit</li>
              <li>Invitations à des webinaires et formations</li>
            </ul>
            <p>
              Vous pouvez vous désabonner à tout moment via le lien présent dans chaque email ou
              depuis les paramètres de votre compte.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Partage des données</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Nous ne vendons jamais vos données personnelles. Nous partageons vos données uniquement avec :</p>

            <h3 className="text-lg font-medium text-foreground">5.1 Prestataires de services</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Stripe</span> - Traitement des paiements</li>
              <li><span className="font-medium">Supabase</span> - Hébergement de base de données</li>
              <li><span className="font-medium">Vercel</span> - Hébergement de l'application</li>
              <li><span className="font-medium">Resend</span> - Envoi d'emails transactionnels</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground">5.2 Plateformes tierces</h3>
            <p>
              Lorsque vous connectez votre boutique à des plateformes externes (Shopify, AliExpress,
              Amazon), nous partageons uniquement les données nécessaires au fonctionnement de
              l'intégration.
            </p>

            <h3 className="text-lg font-medium text-foreground">5.3 Obligations légales</h3>
            <p>
              Nous pouvons divulguer vos données si la loi l'exige ou pour protéger nos droits légaux.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Sécurité des données</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Nous mettons en œuvre des mesures de sécurité rigoureuses :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cryptage SSL/TLS pour toutes les communications</li>
              <li>Mots de passe hashés avec bcrypt</li>
              <li>Authentification à deux facteurs (2FA) disponible</li>
              <li>Sauvegardes automatiques quotidiennes</li>
              <li>Accès restreint aux données sensibles</li>
              <li>Surveillance continue des menaces de sécurité</li>
              <li>Conformité PCI DSS pour les paiements</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Conservation des données</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous conservons vos données personnelles tant que votre compte est actif ou aussi
            longtemps que nécessaire pour vous fournir nos services. Après la fermeture de votre
            compte, nous conservons certaines données pendant 3 ans pour respecter nos obligations
            légales (comptabilité, fiscalité). Vous pouvez demander la suppression complète de vos
            données en nous contactant.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Vos droits</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Conformément au RGPD et aux lois togolaises, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Droit d'accès</span> - Obtenir une copie de vos données</li>
              <li><span className="font-medium">Droit de rectification</span> - Corriger vos données inexactes</li>
              <li><span className="font-medium">Droit à l'effacement</span> - Supprimer vos données ("droit à l'oubli")</li>
              <li><span className="font-medium">Droit à la portabilité</span> - Recevoir vos données dans un format structuré</li>
              <li><span className="font-medium">Droit d'opposition</span> - Refuser certains traitements</li>
              <li><span className="font-medium">Droit de limitation</span> - Limiter l'utilisation de vos données</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à <span className="font-medium">privacy@afrishop.com</span>.
              Nous répondrons dans un délai de 30 jours.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Cookies et technologies similaires</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous utilisons des cookies pour améliorer votre expérience. Consultez notre{" "}
            <Link href="/cookies" className="text-primary hover:underline">
              Politique de cookies
            </Link>{" "}
            pour plus d'informations sur les types de cookies utilisés et comment les gérer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Transferts internationaux</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vos données peuvent être transférées et stockées sur des serveurs situés en dehors du
            Togo, notamment dans l'Union Européenne et aux États-Unis (avec nos prestataires cloud).
            Nous veillons à ce que ces transferts respectent les normes de protection des données
            appropriées.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Protection des mineurs</h2>
          <p className="text-muted-foreground leading-relaxed">
            Notre service est destiné aux personnes âgées de 18 ans et plus. Nous ne collectons pas
            sciemment de données auprès de mineurs. Si vous pensez qu'un mineur a fourni des données,
            contactez-nous immédiatement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Modifications de cette politique</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous pouvons modifier cette politique de confidentialité. Les changements significatifs
            seront notifiés par email 30 jours avant leur entrée en vigueur. Votre utilisation
            continue du service après modification constitue votre acceptation.
          </p>
        </section>

        <section className="border-t pt-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact - Délégué à la protection des données</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pour toute question concernant cette politique ou l'exercice de vos droits :
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>Email : privacy@afrishop.com</li>
            <li>DPO : dpo@afrishop.com</li>
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
