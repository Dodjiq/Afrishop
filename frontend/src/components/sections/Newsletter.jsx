import React, { useState } from 'react'
import { Mail } from 'lucide-react'

/**
 * Composant Newsletter
 * Formulaire d'inscription à la newsletter
 */
export function Newsletter({
  title = 'Restez Informé',
  text = '',
  buttonLabel = "S'inscrire",
  layout = 'centered',
  className = ''
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulation d'envoi
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className={`py-16 px-6 bg-gray-900 text-white ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${layout === 'centered' ? 'text-center' : 'md:flex md:items-center md:justify-between'}`}>
          <div className={`${layout === 'centered' ? 'mb-8' : 'md:w-1/2 mb-6 md:mb-0'}`}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            
            {text && (
              <p className="text-lg text-gray-300">
                {text}
              </p>
            )}
          </div>

          <div className={`${layout === 'centered' ? '' : 'md:w-1/2'}`}>
            {status === 'success' ? (
              <div className="bg-green-500/20 border border-green-500 text-green-100 px-6 py-4 rounded-lg text-center">
                ✓ Merci ! Vous êtes inscrit à notre newsletter.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 font-semibold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {status === 'loading' ? 'Envoi...' : buttonLabel}
                </button>
              </form>
            )}
            
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">Une erreur est survenue. Veuillez réessayer.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
