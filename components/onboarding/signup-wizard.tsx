"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Stepper } from "./stepper"
import { Step1ProductLink } from "./step1-product-link"
import { Step2BrandTone } from "./step2-brand-tone"
import { Step3ShopInfo } from "./step3-shop-info"
import { Step4AccountCreation } from "./step4-account-creation"
import { ArrowLeftIcon, ArrowRightIcon, RocketLaunchIcon } from "@phosphor-icons/react"
import { validatePasswordStrength } from "@/lib/password-validation"

const steps = [
  {
    id: 1,
    title: "Produit",
    description: "Lien du produit",
  },
  {
    id: 2,
    title: "Style",
    description: "Ton de la marque",
  },
  {
    id: 3,
    title: "Boutique",
    description: "Informations",
  },
  {
    id: 4,
    title: "Compte",
    description: "Inscription",
  },
]

export function SignupWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Step 1: Product Link
  const [productLink, setProductLink] = useState("")

  // Step 2: Brand Tone
  const [brandTone, setBrandTone] = useState("")
  const [brandColor, setBrandColor] = useState("#ea580c")

  // Step 3: Shop Info
  const [shopName, setShopName] = useState("")
  const [shopNiche, setShopNiche] = useState("")

  // Step 4: Account Creation
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [password, setPassword] = useState("")

  // Validation for each step
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        // Validate product link
        return (
          productLink.includes("aliexpress.com") ||
          productLink.includes("alibaba.com") ||
          productLink.includes("amazon.")
        )
      case 2:
        // Validate brand tone and color
        return brandTone !== "" && brandColor !== ""
      case 3:
        // Validate shop info
        return shopName.trim() !== "" && shopNiche !== ""
      case 4:
        // Validate account info
        const passwordStrength = validatePasswordStrength(password)
        return (
          fullName.trim() !== "" &&
          email.trim() !== "" &&
          country !== "" &&
          phone.trim() !== "" &&
          passwordStrength.isValid
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceedToNextStep()) return

    setIsLoading(true)

    try {
      // TODO: Implement Supabase auth with all the onboarding data
      const onboardingData = {
        productLink,
        brandTone,
        brandColor,
        shopName,
        shopNiche,
        fullName,
        email,
        phone,
        country,
        password,
      }

      console.log("Onboarding data:", onboardingData)

      // Send welcome email
      const emailResponse = await fetch("/api/auth/send-welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: fullName,
        }),
      })

      if (!emailResponse.ok) {
        console.error("Failed to send welcome email")
      }

      // Simulate signup
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
    <div className="w-full space-y-8">
      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <Step1ProductLink
            productLink={productLink}
            setProductLink={setProductLink}
          />
        )}

        {currentStep === 2 && (
          <Step2BrandTone
            brandTone={brandTone}
            setBrandTone={setBrandTone}
            brandColor={brandColor}
            setBrandColor={setBrandColor}
          />
        )}

        {currentStep === 3 && (
          <Step3ShopInfo
            shopName={shopName}
            setShopName={setShopName}
            shopNiche={shopNiche}
            setShopNiche={setShopNiche}
          />
        )}

        {currentStep === 4 && (
          <Step4AccountCreation
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            country={country}
            setCountry={setCountry}
            password={password}
            setPassword={setPassword}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeftIcon size={16} weight="bold" />
          Précédent
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceedToNextStep()}
            className="gap-2"
          >
            Suivant
            <ArrowRightIcon size={16} weight="bold" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceedToNextStep() || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              "Création en cours..."
            ) : (
              <>
                <RocketLaunchIcon size={18} weight="fill" />
                Créer ma boutique
              </>
            )}
          </Button>
        )}
      </div>

      {/* Terms */}
      {currentStep === 4 && (
        <div className="flex flex-col items-center justify-center space-y-1 text-center pt-4">
          <p className="text-xs text-muted-foreground">
            En créant un compte, vous acceptez nos{" "}
            <a href="/terms" className="underline hover:text-primary font-medium">
              Conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="/privacy" className="underline hover:text-primary font-medium">
              Politique de confidentialité
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
