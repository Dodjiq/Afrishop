import { Resend } from "resend"

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

interface SendWelcomeEmailParams {
  to: string
  name: string
}

export async function sendWelcomeEmail({ to, name }: SendWelcomeEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: "AfriShop <noreply@afrishop.com>",
      to: [to],
      subject: "Bienvenue sur AfriShop ! 🎉",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenue sur AfriShop</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 32px; text-align: center; border-bottom: 1px solid #e5e7eb;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #111827;">
                          <span style="color: #ea580c;">Afri</span>Shop
                        </h1>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: bold; color: #111827;">
                          Bienvenue sur AfriShop, ${name} ! 🎉
                        </h2>

                        <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px; color: #4b5563;">
                          Félicitations ! Votre compte a été créé avec succès. Vous faites maintenant partie de la communauté des entrepreneurs africains qui transforment leur vision en réalité.
                        </p>

                        <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #4b5563;">
                          Avec AfriShop, vous pouvez :
                        </p>

                        <ul style="margin: 0 0 24px; padding-left: 24px;">
                          <li style="margin-bottom: 12px; font-size: 16px; line-height: 24px; color: #4b5563;">
                            ✨ Créer votre boutique Shopify en quelques clics
                          </li>
                          <li style="margin-bottom: 12px; font-size: 16px; line-height: 24px; color: #4b5563;">
                            🛍️ Importer des produits depuis AliExpress, Amazon, et Alibaba
                          </li>
                          <li style="margin-bottom: 12px; font-size: 16px; line-height: 24px; color: #4b5563;">
                            📊 Gérer votre catalogue et vos commandes facilement
                          </li>
                          <li style="margin-bottom: 12px; font-size: 16px; line-height: 24px; color: #4b5563;">
                            💰 Développer votre business e-commerce
                          </li>
                        </ul>

                        <div style="text-align: center; margin: 32px 0;">
                          <a href="https://afrishop.com/dashboard" style="display: inline-block; padding: 14px 32px; background-color: #ea580c; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                            Accéder à mon tableau de bord
                          </a>
                        </div>

                        <div style="margin-top: 32px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                          <p style="margin: 0; font-size: 14px; line-height: 20px; color: #92400e;">
                            <strong>🎁 Profitez de vos 7 jours d'essai gratuit !</strong><br>
                            Aucune carte bancaire requise. Explorez toutes les fonctionnalités sans engagement.
                          </p>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 32px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                        <p style="margin: 0 0 12px; font-size: 14px; line-height: 20px; color: #6b7280;">
                          Besoin d'aide ? Nous sommes là pour vous !
                        </p>
                        <p style="margin: 0 0 8px; font-size: 14px; line-height: 20px; color: #6b7280;">
                          📧 Email : <a href="mailto:support@afrishop.com" style="color: #ea580c; text-decoration: none;">support@afrishop.com</a>
                        </p>
                        <p style="margin: 0; font-size: 14px; line-height: 20px; color: #6b7280;">
                          💬 WhatsApp : <a href="https://wa.me/22890000000" style="color: #ea580c; text-decoration: none;">+228 90 00 00 00</a>
                        </p>

                        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
                          <p style="margin: 0 0 8px; font-size: 12px; line-height: 16px; color: #9ca3af;">
                            © 2026 AfriShop. Tous droits réservés.
                          </p>
                          <p style="margin: 0; font-size: 12px; line-height: 16px;">
                            <a href="https://afrishop.com/terms" style="color: #9ca3af; text-decoration: none; margin: 0 8px;">Conditions d'utilisation</a>
                            <a href="https://afrishop.com/privacy" style="color: #9ca3af; text-decoration: none; margin: 0 8px;">Confidentialité</a>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Error sending welcome email:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { success: false, error }
  }
}
