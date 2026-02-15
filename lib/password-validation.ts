export interface PasswordStrength {
  isValid: boolean
  strength: "weak" | "medium" | "strong"
  score: number
  feedback: string[]
}

export function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = []
  let score = 0

  // Check minimum length (8 characters)
  if (password.length < 8) {
    feedback.push("Le mot de passe doit contenir au moins 8 caractères")
  } else if (password.length >= 12) {
    score += 2
  } else {
    score += 1
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    feedback.push("Ajoutez au moins une lettre majuscule")
  } else {
    score += 1
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    feedback.push("Ajoutez au moins une lettre minuscule")
  } else {
    score += 1
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    feedback.push("Ajoutez au moins un chiffre")
  } else {
    score += 1
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push("Ajoutez au moins un caractère spécial (!@#$%^&*...)")
  } else {
    score += 1
  }

  // Check for common patterns
  const commonPasswords = [
    "password",
    "123456",
    "qwerty",
    "azerty",
    "admin",
    "letmein",
    "welcome",
  ]
  const lowerPassword = password.toLowerCase()
  if (commonPasswords.some((common) => lowerPassword.includes(common))) {
    feedback.push("Évitez les mots de passe courants")
    score -= 2
  }

  // Determine strength
  let strength: "weak" | "medium" | "strong"
  if (score >= 5) {
    strength = "strong"
  } else if (score >= 3) {
    strength = "medium"
  } else {
    strength = "weak"
  }

  // Password is valid if it has at least 8 chars and meets basic requirements
  const isValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

  return {
    isValid,
    strength,
    score,
    feedback,
  }
}
