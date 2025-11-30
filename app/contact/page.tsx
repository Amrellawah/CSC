'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to send message')
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error: any) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+1 (234) 567-8900',
      link: 'tel:+12345678900',
    },
    {
      icon: FiMail,
      title: 'Email',
      value: 'info@creativesparking.com',
      link: 'mailto:info@creativesparking.com',
    },
    {
      icon: FiMapPin,
      title: 'Address',
      value: '123 Luxury Street, Design District, City',
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen pt-20 bg-luxury-cream dark:bg-luxury-darkBg transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden rounded-b-[48px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EF] via-[#F2E0CC] to-[#E6B88E] dark:from-[#1B0E0A] dark:via-[#3E2723] dark:to-[#B87333]">
          <div className="absolute inset-0 opacity-20 bg-[url('/placeholder-contact.jpg')] bg-cover bg-center mix-blend-multiply dark:mix-blend-normal" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#E6B88E]/70 via-transparent to-transparent dark:from-[#1B0E0A]/80" />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="luxury-heading text-5xl md:text-7xl font-bold mb-4 text-luxury-charcoal dark:text-luxury-darkText">
            Get In <span className="text-luxury-copper">Touch</span>
          </h1>
          <p className="text-xl text-luxury-textLight dark:text-luxury-darkTextSecondary max-w-2xl mx-auto">
            Let's discuss your project and bring your vision to life
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-luxury-cream dark:bg-luxury-darkBg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="luxury-heading text-3xl md:text-4xl mb-6 text-luxury-charcoal dark:text-luxury-darkText">
                Send Us a <span className="text-luxury-copper">Message</span>
              </h2>
              <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible.
                We're here to help bring your vision to life.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-luxury-textLight dark:text-luxury-darkTextSecondary mb-2 text-sm uppercase tracking-wider"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-luxury-beige dark:bg-luxury-darkSecondary border border-luxury-copper/30 focus:border-luxury-copper text-luxury-charcoal dark:text-luxury-darkText placeholder:text-luxury-charcoal/40 dark:placeholder:text-luxury-darkText/40 outline-none transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-luxury-textLight dark:text-luxury-darkTextSecondary mb-2 text-sm uppercase tracking-wider"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-luxury-beige dark:bg-luxury-darkSecondary border border-luxury-copper/30 focus:border-luxury-copper text-luxury-charcoal dark:text-luxury-darkText placeholder:text-luxury-charcoal/40 dark:placeholder:text-luxury-darkText/40 outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-luxury-textLight dark:text-luxury-darkTextSecondary mb-2 text-sm uppercase tracking-wider"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-luxury-beige dark:bg-luxury-darkSecondary border border-luxury-copper/30 focus:border-luxury-copper text-luxury-charcoal dark:text-luxury-darkText placeholder:text-luxury-charcoal/40 dark:placeholder:text-luxury-darkText/40 outline-none transition-colors"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-luxury-textLight dark:text-luxury-darkTextSecondary mb-2 text-sm uppercase tracking-wider"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-luxury-beige dark:bg-luxury-darkSecondary border border-luxury-copper/30 focus:border-luxury-copper text-luxury-charcoal dark:text-luxury-darkText outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="interior-design">Interior Design</option>
                    <option value="custom-furniture">Custom Furniture</option>
                    <option value="implementation">Implementation</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-luxury-textLight dark:text-luxury-darkTextSecondary mb-2 text-sm uppercase tracking-wider"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-luxury-beige dark:bg-luxury-darkSecondary border border-luxury-copper/30 focus:border-luxury-copper text-luxury-charcoal dark:text-luxury-darkText placeholder:text-luxury-charcoal/40 dark:placeholder:text-luxury-darkText/40 outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-luxury-copper/15 border border-luxury-copper text-luxury-copper rounded"
                    role="alert"
                    aria-live="polite"
                  >
                    Thank you! We've received your message and will get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errorMessage || 'Failed to send message. Please try again later.'}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="luxury-button luxury-button-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div>
                <h2 className="luxury-heading text-3xl md:text-4xl mb-6 text-luxury-charcoal dark:text-luxury-darkText">
                  Contact <span className="text-luxury-copper">Information</span>
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="flex items-start gap-4 p-6 bg-luxury-beige/60 dark:bg-luxury-darkSecondary border border-luxury-copper/20 hover:border-luxury-copper/60 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="text-luxury-copper text-2xl group-hover:scale-110 transition-transform">
                        <info.icon />
                      </div>
                      <div>
                        <h3 className="text-luxury-charcoal dark:text-luxury-darkText font-medium mb-1">{info.title}</h3>
                        <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium uppercase tracking-wider transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMessageCircle size={24} />
                Chat on WhatsApp
              </motion.a>

              {/* Google Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative h-[400px] border border-luxury-copper/20 overflow-hidden rounded-2xl"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2664644424584!2d-74.00597938459418!3d40.71277697932672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a315df03933%3A0x5553b5a6f2d2cfa!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  title="Creative Sparking Contracting location map"
                  aria-label="Interactive map showing Creative Sparking Contracting office location"
                />
                <div className="absolute inset-0 pointer-events-none border border-luxury-copper/20" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

