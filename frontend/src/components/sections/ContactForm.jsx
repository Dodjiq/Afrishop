import React, { useState } from 'react'
import { Mail, Phone, User, MessageSquare } from 'lucide-react'

/**
 * Composant Contact Form
 * Formulaire de contact personnalisable
 */
export function ContactForm({
  title = 'Contactez-nous',
  text = '',
  buttonLabel = 'Envoyer',
  buttonFullWidth = true,
  fields = [
    { type: 'name', required: true },
    { type: 'email', required: true },
    { type: 'phone', required: false },
    { type: 'message', required: true }
  ],
  className = ''
}) {
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulation d'envoi
    setTimeout(() => {
      setStatus('success')
      setFormData({})
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const fieldIcons = {
    name: User,
    email: Mail,
    phone: Phone,
    message: MessageSquare
  }

  const fieldPlaceholders = {
    name: 'Votre nom',
    email: 'Votre email',
    phone: 'Votre téléphone',
    message: 'Votre message'
  }

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {text && (
            <p className="text-lg text-gray-600">
              {text}
            </p>
          )}
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-8 rounded-lg text-center">
            <div className="text-4xl mb-4">✓</div>
            <div className="text-xl font-semibold mb-2">Message envoyé !</div>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, index) => {
              const Icon = fieldIcons[field.type] || User
              
              if (field.type === 'message') {
                return (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2">
                      Message {field.required && <span className="text-red-600">*</span>}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        value={formData[field.type] || ''}
                        onChange={(e) => handleChange(field.type, e.target.value)}
                        required={field.required}
                        rows={5}
                        placeholder={fieldPlaceholders[field.type]}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                      />
                    </div>
                  </div>
                )
              }
              
              return (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2 capitalize">
                    {field.type} {field.required && <span className="text-red-600">*</span>}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
                      value={formData[field.type] || ''}
                      onChange={(e) => handleChange(field.type, e.target.value)}
                      required={field.required}
                      placeholder={fieldPlaceholders[field.type]}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
              )
            })}

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`${
                buttonFullWidth ? 'w-full' : 'inline-block'
              } px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50`}
            >
              {status === 'loading' ? 'Envoi...' : buttonLabel}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="mt-4 text-red-600 text-center">
            Une erreur est survenue. Veuillez réessayer.
          </div>
        )}
      </div>
    </section>
  )
}
