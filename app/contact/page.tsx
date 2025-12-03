'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiChevronDown } from 'react-icons/fi'

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
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false)
  const emailDropdownRef = useRef<HTMLDivElement>(null)

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

  const emailAddresses = [
    { label: 'Sameh K.', email: 'sameh.k@csc-ltd.net' },
    { label: 'Mohamed E.', email: 'mohamed.e@csc-ltd.net' },
  ]

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+966507563752',
      link: 'tel:+966507563752',
    },
    {
      icon: FiMapPin,
      title: 'Address',
      value: '123 Luxury Street, Design District, City',
      link: '#',
    },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target as Node)) {
        setIsEmailDropdownOpen(false)
      }
    }

    if (isEmailDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEmailDropdownOpen])

  const handleEmailSelect = (email: string) => {
    window.location.href = `mailto:${email}`
    setIsEmailDropdownOpen(false)
  }

  return (
    <div className="min-h-screen pt-20 bg-luxury-cream dark:bg-luxury-darkBg transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden rounded-b-[48px] mb-8">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-beige via-luxury-lightGray to-luxury-cream dark:from-luxury-darkBg dark:via-luxury-darkSecondary dark:to-luxury-darkCard">
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(184, 115, 51, 0.1) 35px, rgba(184, 115, 51, 0.1) 70px)`,
            }} />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top Right Accent */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-luxury-copper/5 dark:bg-luxury-copper/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Bottom Left Accent */}
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-luxury-copper/5 dark:bg-luxury-copper/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-cream/80 via-transparent to-transparent dark:from-luxury-darkBg/80" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-8 lg:px-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Line Above Title */}
          <motion.div
            className="w-20 h-0.5 bg-luxury-copper mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <motion.h1
            className="luxury-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-luxury-charcoal dark:text-luxury-darkText leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get In{' '}
            <span className="text-luxury-copper relative inline-block">
              Touch
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-luxury-copper/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-luxury-textLight dark:text-luxury-darkTextSecondary max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's discuss your project and bring your vision to life
          </motion.p>

          {/* Decorative Line Below Text */}
          <motion.div
            className="w-20 h-0.5 bg-luxury-copper mx-auto mt-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
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
                  {/* Phone */}
                  <motion.a
                    href={contactInfo[0].link}
                    className="flex items-start gap-4 p-6 bg-luxury-beige/60 dark:bg-luxury-darkSecondary border border-luxury-copper/20 hover:border-luxury-copper/60 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-luxury-copper text-2xl group-hover:scale-110 transition-transform">
                      <FiPhone />
                    </div>
                    <div>
                      <h3 className="text-luxury-charcoal dark:text-luxury-darkText font-medium mb-1">{contactInfo[0].title}</h3>
                      <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">{contactInfo[0].value}</p>
                    </div>
                  </motion.a>

                  {/* Email with Dropdown */}
                  <motion.div
                    ref={emailDropdownRef}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.button
                      onClick={() => setIsEmailDropdownOpen(!isEmailDropdownOpen)}
                      className={`w-full flex items-start gap-4 p-6 bg-luxury-beige/60 dark:bg-luxury-darkSecondary border transition-all duration-300 group text-left ${
                        isEmailDropdownOpen 
                          ? 'border-luxury-copper/60 shadow-md' 
                          : 'border-luxury-copper/20 hover:border-luxury-copper/60'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-luxury-copper text-2xl group-hover:scale-110 transition-transform">
                        <FiMail />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-luxury-charcoal dark:text-luxury-darkText font-medium mb-1">Email</h3>
                        <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-sm">
                          {isEmailDropdownOpen ? 'Select an email address' : 'Click to choose an email'}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isEmailDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <FiChevronDown className="text-luxury-copper text-xl" />
                      </motion.div>
                    </motion.button>

                    {isEmailDropdownOpen && (
                      <>
                        {/* Dropdown menu */}
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-0 right-0 mt-2 bg-luxury-beige dark:bg-luxury-darkSecondary border border-luxury-copper/30 rounded-sm shadow-xl z-10 overflow-hidden"
                        >
                          {emailAddresses.map((emailOption, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleEmailSelect(emailOption.email)}
                              className="w-full flex items-center gap-4 p-5 hover:bg-luxury-copper/10 dark:hover:bg-luxury-copper/20 transition-all duration-200 text-left group/item border-b border-luxury-copper/10 last:border-b-0"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ x: 4, backgroundColor: 'rgba(184, 115, 51, 0.1)' }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-luxury-copper group-hover/item:scale-110 transition-transform">
                                <FiMail size={18} />
                              </div>
                              <div className="flex-1">
                                <p className="text-luxury-charcoal dark:text-luxury-darkText font-medium mb-0.5">
                                  {emailOption.label}
                                </p>
                                <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-sm">
                                  {emailOption.email}
                                </p>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </motion.div>

                  {/* Address */}
                  <motion.a
                    href={contactInfo[1].link}
                    className="flex items-start gap-4 p-6 bg-luxury-beige/60 dark:bg-luxury-darkSecondary border border-luxury-copper/20 hover:border-luxury-copper/60 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-luxury-copper text-2xl group-hover:scale-110 transition-transform">
                      <FiMapPin />
                    </div>
                    <div>
                      <h3 className="text-luxury-charcoal dark:text-luxury-darkText font-medium mb-1">{contactInfo[1].title}</h3>
                      <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary">{contactInfo[1].value}</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/966507563752"
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

