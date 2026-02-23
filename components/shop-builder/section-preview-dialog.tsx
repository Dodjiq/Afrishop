"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SectionPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  template: {
    id: string;
    name: string;
    description: string;
    category: string;
    thumbnail: string;
  } | null;
  brandColor: string;
}

export function SectionPreviewDialog({
  open,
  onClose,
  template,
  brandColor,
}: SectionPreviewDialogProps) {
  if (!template) return null;

  const getPreviewContent = () => {
    // HERO SECTIONS - Différentes variantes
    if (template.category === "hero") {
      if (template.id.includes("split")) {
        return (
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider text-primary font-semibold">
                  Nouveau
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Innovation & Qualité
                </h1>
                <p className="text-muted-foreground">
                  Un produit pensé pour répondre à tous vos besoins
                </p>
                <button
                  className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg"
                  style={{ backgroundColor: brandColor }}
                >
                  Découvrir
                </button>
              </div>
              <div className="h-64 bg-muted/50 rounded-xl flex items-center justify-center">
                <span className="text-muted-foreground">Image produit</span>
              </div>
            </div>
          </div>
        );
      }
      if (template.id.includes("gradient")) {
        return (
          <div
            className="p-12 md:p-16 text-center"
            style={{
              background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
            }}
          >
            <div className="text-white space-y-4">
              <div className="text-xs uppercase tracking-wider font-semibold opacity-90">
                Innovation
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">
                Le Futur est Maintenant
              </h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Rejoignez des milliers de clients satisfaits
              </p>
              <button
                className="px-8 py-4 rounded-lg font-semibold bg-white shadow-xl mt-4"
                style={{ color: brandColor }}
              >
                Commencer
              </button>
            </div>
          </div>
        );
      }
      // Hero centré par défaut
      return (
        <div
          className="p-8 md:p-12 text-center"
          style={{
            background: `linear-gradient(135deg, ${brandColor}15, ${brandColor}05)`,
          }}
        >
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-primary font-semibold">
              Nouveau
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Titre de votre produit
            </h1>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Description captivante de votre produit qui attire l'attention et
              donne envie d'acheter.
            </p>
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg"
              style={{ backgroundColor: brandColor }}
            >
              Acheter Maintenant
            </button>
          </div>
        </div>
      );
    }

    // FEATURES SECTIONS - Différentes variantes
    if (template.category === "features") {
      const is4Cols = template.id.includes("4-colonnes");
      const is2Cols = template.id.includes("2-colonnes");

      if (template.id.includes("alternée")) {
        return (
          <div className="p-8 md:p-12 space-y-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              Découvrez Chaque Détail
            </h2>
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={i % 2 === 0 ? "md:order-2" : ""}>
                  <div className="h-48 bg-muted/50 rounded-xl flex items-center justify-center">
                    <span className="text-muted-foreground">
                      Illustration {i}
                    </span>
                  </div>
                </div>
                <div className={i % 2 === 0 ? "md:order-1" : ""}>
                  <h3 className="text-xl font-bold mb-3">Fonctionnalité {i}</h3>
                  <p className="text-muted-foreground mb-4">
                    Description détaillée de cette fonctionnalité importante
                  </p>
                  <div
                    className="flex items-center gap-2"
                    style={{ color: brandColor }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Avantage clé</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }

      if (template.id.includes("cards")) {
        const numCards = is4Cols ? 4 : is2Cols ? 2 : 3;
        return (
          <div className="p-10 md:p-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Caractéristiques Premium
            </h2>
            <div
              className={`grid gap-12 ${is4Cols ? "md:grid-cols-4" : is2Cols ? "md:grid-cols-2" : "md:grid-cols-3"}`}
            >
              {Array.from({ length: numCards }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow min-w-0"
                >
                  <div
                    className="w-16 h-16 rounded-lg mx-auto mb-5 flex items-center justify-center"
                    style={{ backgroundColor: `${brandColor}20` }}
                  >
                    <svg
                      className="w-8 h-8"
                      style={{ color: brandColor }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-center mb-3 text-lg break-words">
                    Feature {i + 1}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed break-words">
                    Description courte
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      const numFeatures = is4Cols ? 4 : is2Cols ? 2 : 3;
      return (
        <div className="p-10 md:p-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Caractéristiques principales
          </h2>
          <div
            className={`grid gap-12 ${is4Cols ? "md:grid-cols-4" : is2Cols ? "md:grid-cols-2" : "md:grid-cols-3"}`}
          >
            {Array.from({ length: numFeatures }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-muted/50 text-center space-y-4 min-w-0"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl"
                  style={{ backgroundColor: brandColor }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg break-words">
                  Feature {i + 1}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed break-words">
                  Description courte
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // HOW IT WORKS - Différentes variantes
    if (template.category === "how-it-works") {
      if (template.id.includes("timeline")) {
        return (
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              Notre Processus
            </h2>
            <div className="relative max-w-3xl mx-auto">
              <div
                className="absolute left-8 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: `${brandColor}30` }}
              />
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative flex gap-6">
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl z-10"
                      style={{ backgroundColor: brandColor }}
                    >
                      {i}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-lg font-bold mb-2">Étape {i}</h3>
                      <p className="text-muted-foreground">
                        Explication détaillée de cette étape du processus
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto"
                  style={{ backgroundColor: brandColor }}
                >
                  {i}
                </div>
                <h3 className="font-semibold">Étape {i}</h3>
                <p className="text-xs text-muted-foreground">
                  Explication simple de cette étape
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // TESTIMONIALS - Différentes variantes
    if (template.category === "testimonials") {
      if (template.id.includes("grid")) {
        return (
          <div className="p-6 md:p-8 bg-muted/30">
            <h2 className="text-xl font-bold text-center mb-6">Avis Clients</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border bg-card space-y-2"
                >
                  <div className="flex gap-0.5" style={{ color: brandColor }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    "Excellent produit, je recommande vivement !"
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: brandColor }}
                    >
                      C{i}
                    </div>
                    <p className="text-xs font-semibold">Client {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className="p-6 md:p-8 bg-muted/30">
          <h2 className="text-xl font-bold text-center mb-6">
            Témoignages clients
          </h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-background space-y-2">
                <div className="flex gap-1" style={{ color: brandColor }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">
                  "Excellent produit, je recommande vivement !"
                </p>
                <p className="text-xs font-semibold">- Client {i}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // FAQ - Différentes variantes
    if (template.category === "faq") {
      if (template.id.includes("two-columns")) {
        return (
          <div className="p-6 md:p-8 bg-muted/30">
            <h2 className="text-xl font-bold text-center mb-6">
              Besoin d'Aide ?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-lg bg-background border">
                  <h3 className="font-semibold text-sm mb-2">Question {i} ?</h3>
                  <p className="text-xs text-muted-foreground">
                    Réponse détaillée à cette question.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-center mb-6">
            Questions fréquentes
          </h2>
          <div className="space-y-3 max-w-2xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-muted/50 border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">
                    Question fréquente {i} ?
                  </h3>
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${brandColor}40` }}
                  >
                    <span style={{ color: brandColor }}>▼</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Réponse détaillée à cette question importante.
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // CTA - Différentes variantes
    if (template.category === "cta") {
      if (template.id.includes("urgency")) {
        return (
          <div
            className="p-8 md:p-12 text-center rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)`,
            }}
          >
            <div className="text-white space-y-4">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                ⏰ Offre limitée
              </div>
              <h2 className="text-3xl font-bold">Offre Limitée !</h2>
              <p className="text-lg opacity-90">Plus que quelques heures</p>
              <button
                className="px-8 py-4 rounded-lg font-semibold bg-white shadow-xl mt-4"
                style={{ color: brandColor }}
              >
                J'en Profite
              </button>
              <p className="text-sm opacity-75 mt-2">
                Plus que 24h pour profiter de l'offre
              </p>
            </div>
          </div>
        );
      }
      if (template.id.includes("social-proof")) {
        return (
          <div className="p-8 md:p-12 bg-muted/30 rounded-xl">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">
                Rejoignez 10,000+ Clients Satisfaits
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div
                    className="text-4xl font-bold"
                    style={{ color: brandColor }}
                  >
                    10,000+
                  </div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold"
                    style={{ color: brandColor }}
                  >
                    4.9/5
                  </div>
                  <div className="text-sm text-muted-foreground">Note</div>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold"
                    style={{ color: brandColor }}
                  >
                    98%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Satisfaction
                  </div>
                </div>
              </div>
              <button
                className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg"
                style={{ backgroundColor: brandColor }}
              >
                Me Lancer
              </button>
            </div>
          </div>
        );
      }
      return (
        <div
          className="p-8 md:p-12 text-center rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${brandColor}20, ${brandColor}10)`,
          }}
        >
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Ne manquez pas cette opportunité unique !
          </p>
          <button
            className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg"
            style={{ backgroundColor: brandColor }}
          >
            Commander maintenant
          </button>
        </div>
      );
    }

    return (
      <div className="p-8 text-center text-muted-foreground">
        Prévisualisation non disponible
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] max-h-[95vh] overflow-y-auto w-[98vw] h-[95vh]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{template.thumbnail}</div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{template.name}</DialogTitle>
              <DialogDescription className="text-base mt-2">
                {template.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-8 border rounded-xl overflow-hidden bg-background shadow-md">
          {getPreviewContent()}
        </div>

        <div className="text-sm text-center text-muted-foreground mt-8 px-6">
          Cette prévisualisation montre un exemple. Le contenu réel sera
          personnalisé avec vos données.
        </div>
      </DialogContent>
    </Dialog>
  );
}
