"use client"

import { Footer } from "@/components/marketing/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  WhatsappLogoIcon
} from "@phosphor-icons/react"

export default function ContactPage() {
  return (
    <>
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          {/* Grid Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              {/* Header */}
              <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Contactez-nous
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Une question ? Notre équipe est là pour vous aider
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3 mb-12">
                {/* Email */}
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <EnvelopeIcon size={24} className="text-primary" weight="duotone" />
                    </div>
                    <CardTitle className="text-lg">Email</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a href="mailto:contact@afrishop.com" className="text-sm text-muted-foreground hover:text-primary">
                      contact@afrishop.com
                    </a>
                  </CardContent>
                </Card>

                {/* WhatsApp */}
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <WhatsappLogoIcon size={24} className="text-primary" weight="duotone" />
                    </div>
                    <CardTitle className="text-lg">WhatsApp</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a href="https://wa.me/22890000000" className="text-sm text-muted-foreground hover:text-primary">
                      +228 90 00 00 00
                    </a>
                  </CardContent>
                </Card>

                {/* Localisation */}
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <MapPinIcon size={24} className="text-primary" weight="duotone" />
                    </div>
                    <CardTitle className="text-lg">Adresse</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Lomé, Togo
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Formulaire de contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                  <CardDescription>
                    Nous vous répondrons dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" placeholder="Votre nom" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="votre@email.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" placeholder="Comment pouvons-nous vous aider ?" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
