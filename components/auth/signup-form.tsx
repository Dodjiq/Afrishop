"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  XCircleIcon,
  AsteriskIcon,
} from "@phosphor-icons/react"
import { validatePasswordStrength } from "@/lib/password-validation"

const countries = [
  { value: "tg", label: "🇹🇬 Togo", phoneFormat: "+228 90 12 34 56", phoneCode: "+228" },
  { value: "ci", label: "🇨🇮 Côte d'Ivoire", phoneFormat: "+225 07 12 34 56 78", phoneCode: "+225" },
  { value: "sn", label: "🇸🇳 Sénégal", phoneFormat: "+221 77 123 45 67", phoneCode: "+221" },
  { value: "bj", label: "🇧🇯 Bénin", phoneFormat: "+229 97 12 34 56", phoneCode: "+229" },
  { value: "ml", label: "🇲🇱 Mali", phoneFormat: "+223 70 12 34 56", phoneCode: "+223" },
  { value: "bf", label: "🇧🇫 Burkina Faso", phoneFormat: "+226 70 12 34 56", phoneCode: "+226" },
  { value: "ne", label: "🇳🇪 Niger", phoneFormat: "+227 90 12 34 56", phoneCode: "+227" },
  { value: "other", label: "Autre", phoneFormat: "+000 00 00 00 00", phoneCode: "+000" },
]

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  })
  const [passwordTouched, setPasswordTouched] = useState(false)

  const passwordStrength = validatePasswordStrength(formData.password)

  // Get phone placeholder based on selected country
  const getPhonePlaceholder = () => {
    const selectedCountry = countries.find((c) => c.value === formData.country)
    return selectedCountry?.phoneFormat || "+228 90 12 34 56"
  }

  // Get phone code based on selected country
  const getPhoneCode = () => {
    const selectedCountry = countries.find((c) => c.value === formData.country)
    return selectedCountry?.phoneCode || "+228"
  }

  // Handle phone input focus - add country code if empty
  const handlePhoneFocus = () => {
    if (!formData.phone && formData.country) {
      const phoneCode = getPhoneCode()
      setFormData({ ...formData, phone: phoneCode + " " })
    }
  }

  // Handle phone input change - ensure country code stays
  const handlePhoneChange = (value: string) => {
    const phoneCode = getPhoneCode()

    // If user tries to delete the country code, prevent it
    if (formData.country && !value.startsWith(phoneCode)) {
      // If completely empty, do nothing (allow clearing)
      if (value === "") {
        setFormData({ ...formData, phone: "" })
      } else {
        // Otherwise, ensure code is always present
        setFormData({ ...formData, phone: phoneCode + " " + value.replace(phoneCode, "").trim() })
      }
    } else {
      setFormData({ ...formData, phone: value })
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate password strength
    if (!passwordStrength.isValid) {
      setPasswordTouched(true)
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement Supabase auth
      // const { data, error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      //   options: {
      //     data: {
      //       full_name: formData.fullName,
      //       phone: formData.phone,
      //       country: formData.country,
      //     },
      //   },
      // })

      // Send welcome email
      const emailResponse = await fetch("/api/auth/send-welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.fullName,
        }),
      })

      if (!emailResponse.ok) {
        console.error("Failed to send welcome email")
      }

      // For now, simulate signup
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardContent className="pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName" className="flex items-center gap-1">
                Nom complet
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="email" className="flex items-center gap-1">
                Email
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <div className="relative">
                <EnvelopeIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="country" className="flex items-center gap-1">
                Pays
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <Select
                value={formData.country}
                onValueChange={(value) =>
                  setFormData({ ...formData, country: value })
                }
                disabled={isLoading}
                required
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="phone" className="flex items-center gap-1">
                Téléphone (WhatsApp)
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <div className="relative">
                <PhoneIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={getPhonePlaceholder()}
                  value={formData.phone}
                  onFocus={handlePhoneFocus}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </Field>

            <Field className="pb-2.5">
              <FieldLabel htmlFor="password" className="flex items-center gap-1">
                Mot de passe
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <div className="space-y-2">
                <div className="relative">
                  <LockIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Créez un mot de passe fort"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      if (!passwordTouched) setPasswordTouched(true)
                    }}
                    onBlur={() => setPasswordTouched(true)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password strength indicator */}
                {formData.password && passwordTouched && (
                  <div className="space-y-2">
                    {/* Strength bar */}
                    <div className="flex gap-1">
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordStrength.score >= 1
                            ? passwordStrength.strength === "weak"
                              ? "bg-red-500"
                              : passwordStrength.strength === "medium"
                              ? "bg-orange-500"
                              : "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordStrength.score >= 3
                            ? passwordStrength.strength === "medium"
                              ? "bg-orange-500"
                              : passwordStrength.strength === "strong"
                              ? "bg-green-500"
                              : "bg-gray-200"
                            : "bg-gray-200"
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordStrength.score >= 5
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    </div>

                    {/* Strength text */}
                    <p
                      className={`text-xs font-medium ${
                        passwordStrength.strength === "weak"
                          ? "text-red-600"
                          : passwordStrength.strength === "medium"
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength.strength === "weak" && "Mot de passe faible"}
                      {passwordStrength.strength === "medium" && "Mot de passe moyen"}
                      {passwordStrength.strength === "strong" && "Mot de passe fort"}
                    </p>

                    {/* Requirements list */}
                    {!passwordStrength.isValid && (
                      <ul className="space-y-1.5">
                        {[
                          {
                            test: formData.password.length >= 8,
                            text: "Au moins 8 caractères",
                          },
                          {
                            test: /[A-Z]/.test(formData.password),
                            text: "Une lettre majuscule",
                          },
                          {
                            test: /[a-z]/.test(formData.password),
                            text: "Une lettre minuscule",
                          },
                          {
                            test: /\d/.test(formData.password),
                            text: "Un chiffre",
                          },
                          {
                            test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                              formData.password
                            ),
                            text: "Un caractère spécial (!@#$...)",
                          },
                        ].map((requirement, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-xs"
                          >
                            {requirement.test ? (
                              <CheckCircleIcon
                                size={14}
                                weight="fill"
                                className="text-green-600 flex-shrink-0"
                              />
                            ) : (
                              <XCircleIcon
                                size={14}
                                weight="fill"
                                className="text-red-500 flex-shrink-0"
                              />
                            )}
                            <span
                              className={
                                requirement.test
                                  ? "text-green-600"
                                  : "text-muted-foreground"
                              }
                            >
                              {requirement.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full gap-2"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              "Création du compte..."
            ) : (
              <>
                <RocketLaunchIcon size={20} weight="fill" />
                Créer mon compte gratuit
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
