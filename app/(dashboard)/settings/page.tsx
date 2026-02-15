"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  PaletteIcon,
  GlobeIcon,
  KeyIcon
} from "@phosphor-icons/react"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground/80 font-medium mt-2">
          Gérez vos préférences et paramètres de compte
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-6">
          <TabsTrigger value="profile" className="gap-2">
            <UserIcon size={16} />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <BellIcon size={16} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <ShieldCheckIcon size={16} />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <PaletteIcon size={16} />
            Apparence
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-2">
            <GlobeIcon size={16} />
            Langue
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <KeyIcon size={16} />
            API
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Mettez à jour vos informations de profil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Votre prénom" defaultValue="Dodji" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Votre nom" defaultValue="KOKOU" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" defaultValue="dodji@afrishop.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" placeholder="+228 90 12 34 56" defaultValue="+228 90 00 00 00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Parlez-nous de vous..."
                  rows={4}
                  defaultValue="Entrepreneur passionné par l'e-commerce en Afrique"
                />
              </div>

              <Button>Sauvegarder les modifications</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Informations professionnelles (optionnel)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Nom de l'entreprise</Label>
                <Input id="company" placeholder="Nom de votre entreprise" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Select defaultValue="tg">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tg">🇹🇬 Togo</SelectItem>
                      <SelectItem value="ci">🇨🇮 Côte d'Ivoire</SelectItem>
                      <SelectItem value="sn">🇸🇳 Sénégal</SelectItem>
                      <SelectItem value="bj">🇧🇯 Bénin</SelectItem>
                      <SelectItem value="ml">🇲🇱 Mali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" placeholder="Votre ville" defaultValue="Lomé" />
                </div>
              </div>

              <Button variant="outline">Sauvegarder</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications Email</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Choisissez quelles notifications vous souhaitez recevoir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "new-shop", label: "Nouvelle boutique créée", description: "Notification quand une boutique est créée" },
                { id: "new-product", label: "Nouveaux produits importés", description: "Notification d'import de produits" },
                { id: "shop-status", label: "Changement de statut", description: "Quand le statut d'une boutique change" },
                { id: "billing", label: "Facturation", description: "Factures et paiements" },
                { id: "marketing", label: "Marketing", description: "Conseils et actualités" },
              ].map((notification) => (
                <div key={notification.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.label}</p>
                    <p className="text-sm text-muted-foreground/80 font-medium">
                      {notification.description}
                    </p>
                  </div>
                  <Switch defaultChecked={notification.id !== "marketing"} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications WhatsApp</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Recevoir des notifications sur WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer WhatsApp</Label>
                  <p className="text-sm text-muted-foreground/80 font-medium">
                    Notifications importantes uniquement
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Mettez à jour votre mot de passe régulièrement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button>Modifier le mot de passe</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authentification à deux facteurs</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Ajoutez une couche de sécurité supplémentaire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer 2FA</Label>
                  <p className="text-sm text-muted-foreground/80 font-medium">
                    Protégez votre compte avec l'authentification à deux facteurs
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Zone de danger</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Actions irréversibles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Supprimer le compte</Label>
                  <p className="text-sm text-muted-foreground/80 font-medium">
                    Supprime définitivement votre compte et toutes vos données
                  </p>
                </div>
                <Button variant="destructive">Supprimer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thème</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mode d'affichage</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Tab */}
        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Langue de l'interface</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Choisissez votre langue préférée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fuseau horaire</Label>
                <Select defaultValue="africa-lome">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="africa-lome">Africa/Lomé (GMT+0)</SelectItem>
                    <SelectItem value="africa-abidjan">Africa/Abidjan (GMT+0)</SelectItem>
                    <SelectItem value="africa-dakar">Africa/Dakar (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline">Sauvegarder</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clés API</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Gérez vos clés d'accès API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label>Clé API de production</Label>
                  <Button variant="outline" size="sm">Régénérer</Button>
                </div>
                <Input
                  readOnly
                  value="afr_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="font-mono text-xs"
                />
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label>Clé API de test</Label>
                  <Button variant="outline" size="sm">Régénérer</Button>
                </div>
                <Input
                  readOnly
                  value="afr_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="font-mono text-xs"
                />
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground/80 font-medium">
                  ⚠️ Ne partagez jamais vos clés API. Elles donnent un accès complet à votre compte.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation API</CardTitle>
              <CardDescription className="text-muted-foreground/80 font-medium">
                Consultez la documentation complète de notre API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <a href="https://docs.afrishop.com/api" target="_blank" rel="noopener noreferrer">
                  Voir la documentation
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
