"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  AsteriskIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react"
import { validatePasswordStrength } from "@/lib/password-validation"

interface Step4Props {
  fullName: string
  setFullName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  phone: string
  setPhone: (phone: string) => void
  country: string
  setCountry: (country: string) => void
  password: string
  setPassword: (password: string) => void
}

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

export function Step4AccountCreation({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  country,
  setCountry,
  password,
  setPassword,
}: Step4Props) {
  const [passwordTouched, setPasswordTouched] = useState(false)
  const passwordStrength = validatePasswordStrength(password)

  // Get phone placeholder based on selected country
  const getPhonePlaceholder = () => {
    const selectedCountry = countries.find((c) => c.value === country)
    return selectedCountry?.phoneFormat || "+228 90 12 34 56"
  }

  // Get phone code based on selected country
  const getPhoneCode = () => {
    const selectedCountry = countries.find((c) => c.value === country)
    return selectedCountry?.phoneCode || "+228"
  }

  // Handle phone input focus - add country code if empty
  const handlePhoneFocus = () => {
    if (!phone && country) {
      const phoneCode = getPhoneCode()
      setPhone(phoneCode + " ")
    }
  }

  // Handle phone input change - ensure country code stays
  const handlePhoneChange = (value: string) => {
    const phoneCode = getPhoneCode()

    if (country && !value.startsWith(phoneCode)) {
      if (value === "") {
        setPhone("")
      } else {
        setPhone(phoneCode + " " + value.replace(phoneCode, "").trim())
      }
    } else {
      setPhone(value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Créez votre compte</h2>
        <p className="text-muted-foreground">
          Dernière étape pour lancer votre boutique !
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            {/* Full Name */}
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </Field>

            {/* Email */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </Field>

            {/* Country */}
            <Field>
              <FieldLabel htmlFor="country" className="flex items-center gap-1">
                Pays
                <AsteriskIcon size={8} weight="fill" className="text-red-500" />
              </FieldLabel>
              <Select
                value={country}
                onValueChange={(value) => setCountry(value)}
                required
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {/* Phone */}
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
                  value={phone}
                  onFocus={handlePhoneFocus}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </Field>

            {/* Password */}
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (!passwordTouched) setPasswordTouched(true)
                    }}
                    onBlur={() => setPasswordTouched(true)}
                    className="pl-10"
                    required
                  />
                </div>

                {/* Password strength indicator */}
                {password && passwordTouched && (
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
                            test: password.length >= 8,
                            text: "Au moins 8 caractères",
                          },
                          {
                            test: /[A-Z]/.test(password),
                            text: "Une lettre majuscule",
                          },
                          {
                            test: /[a-z]/.test(password),
                            text: "Une lettre minuscule",
                          },
                          {
                            test: /\d/.test(password),
                            text: "Un chiffre",
                          },
                          {
                            test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                              password
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
      </Card>
    </div>
  )
}
