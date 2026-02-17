"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react"

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<"testing" | "success" | "error">("testing")
  const [userStatus, setUserStatus] = useState<"checking" | "authenticated" | "anonymous">("checking")
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Test 1: Connexion à Supabase
      setConnectionStatus("testing")

      // Test 2: Vérifier l'utilisateur connecté
      setUserStatus("checking")
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError) {
        setError(userError.message)
        setConnectionStatus("error")
        setUserStatus("anonymous")
      } else {
        setConnectionStatus("success")
        setUser(user)
        setUserStatus(user ? "authenticated" : "anonymous")
      }
    } catch (err: any) {
      setError(err.message)
      setConnectionStatus("error")
      setUserStatus("anonymous")
    }
  }

  const testSignUp = async () => {
    try {
      const testEmail = `test-${Date.now()}@example.com`
      const testPassword = "TestPassword123!"

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })

      if (error) {
        alert(`Erreur d'inscription: ${error.message}`)
      } else {
        alert(`Inscription test réussie ! Email: ${testEmail}`)
        testConnection()
      }
    } catch (err: any) {
      alert(`Erreur: ${err.message}`)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Test Supabase</h1>
        <p className="text-muted-foreground">
          Vérification de la connexion et de l'authentification
        </p>
      </div>

      <div className="grid gap-6">
        {/* Statut de connexion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Connexion Supabase</span>
              {connectionStatus === "testing" && (
                <Badge variant="outline">Test en cours...</Badge>
              )}
              {connectionStatus === "success" && (
                <Badge className="bg-green-500">
                  <CheckCircleIcon className="mr-1" size={16} />
                  Connecté
                </Badge>
              )}
              {connectionStatus === "error" && (
                <Badge variant="destructive">
                  <XCircleIcon className="mr-1" size={16} />
                  Erreur
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">URL:</span>
                <span className="font-mono text-xs">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clé configurée:</span>
                <span className="font-mono text-xs">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statut utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Statut d'authentification</span>
              {userStatus === "checking" && (
                <Badge variant="outline">Vérification...</Badge>
              )}
              {userStatus === "authenticated" && (
                <Badge className="bg-green-500">
                  <CheckCircleIcon className="mr-1" size={16} />
                  Connecté
                </Badge>
              )}
              {userStatus === "anonymous" && (
                <Badge variant="secondary">Non connecté</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono text-xs">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Créé le:</span>
                  <span>{new Date(user.created_at).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aucun utilisateur connecté
              </p>
            )}
          </CardContent>
        </Card>

        {/* Erreur */}
        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <XCircleIcon size={20} />
                Erreur détectée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-sm bg-destructive/10 p-4 rounded block">
                {error}
              </code>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions de test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button onClick={testConnection} variant="outline" className="w-full">
                Retester la connexion
              </Button>
            </div>
            <div>
              <Button onClick={testSignUp} className="w-full">
                Tester l'inscription (créer un compte test)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Guide de débogage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-semibold">Si la connexion échoue :</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>Vérifiez que les variables d'environnement sont correctes dans .env.local</li>
              <li>Redémarrez le serveur de développement (npm run dev)</li>
              <li>Vérifiez que votre projet Supabase est actif</li>
            </ul>

            <p className="font-semibold mt-4">Si l'inscription échoue :</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>Vérifiez que l'authentification par email est activée dans Supabase</li>
              <li>Allez dans Authentication → Providers dans Supabase</li>
              <li>Assurez-vous que "Email" est activé</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
