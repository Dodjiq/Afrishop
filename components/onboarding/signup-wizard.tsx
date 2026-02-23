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
import { createClient } from "@/lib/supabase/client"
import { SuccessDialog } from "./success-dialog"
import { TemplateSelectorModal } from "@/components/shop-builder/template-selector-modal"
import { ShopTemplate } from "@/lib/shop-templates"

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
  const supabase = createClient()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ShopTemplate | null>(null)

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
    setError(null)

    try {
      // Inscription avec Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            country,
            // Stocker les données d'onboarding
            onboarding_data: {
              product_link: productLink,
              brand_tone: brandTone,
              brand_color: brandColor,
              shop_name: shopName,
              shop_niche: shopNiche,
            },
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("Cet email est déjà utilisé. Essayez de vous connecter.")
        } else {
          setError(signUpError.message)
        }
        return
      }

      // Si l'inscription nécessite une confirmation email
      if (data.user && !data.session) {
        setShowSuccessDialog(true)
        return
      }

      // Si l'inscription réussit avec auto-connexion
      if (data.session) {
        // Afficher le sélecteur de template
        setShowTemplateSelector(true)
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      setError("Une erreur est survenue lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false)
    router.push("/login")
  }

  const handleTemplateSelect = (template: ShopTemplate | null) => {
    setSelectedTemplate(template)
    setShowTemplateSelector(false)

    // Encoder les données du template pour les passer au dashboard
    const shopData = {
      productLink,
      brandTone,
      brandColor,
      shopName,
      shopNiche,
      template: template || undefined,
    }

    const encodedData = btoa(encodeURIComponent(JSON.stringify(shopData)))
    router.push(`/dashboard?shopData=${encodedData}`)
    router.refresh()
  }

  return (
    <div className="w-full space-y-8">
      {/* Success Dialog */}
      <SuccessDialog open={showSuccessDialog} onClose={handleSuccessDialogClose} />

      {/* Template Selector Modal */}
      <TemplateSelectorModal
        open={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelectTemplate={handleTemplateSelect}
        productData={{
          name: shopName,
          category: shopNiche,
          link: productLink,
        }}
      />

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

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

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
