'use client'

import { motion } from 'framer-motion'
import { FiHome, FiTool, FiBox, FiSliders } from 'react-icons/fi'

const services = [
  {
    icon: FiHome,
    title: 'Interior Design',
    description:
      'Transform your spaces with our comprehensive interior design services. We create cohesive, luxurious environments that reflect your style and enhance your lifestyle.',
    features: [
      'Space planning and layout design',
      'Color scheme and material selection',
      '3D visualization and renderings',
      'Furniture and decor curation',
      'Complete design consultation',
    ],
  },
  {
    icon: FiTool,
    title: 'Implementation',
    description:
      'From concept to reality, our expert team handles every aspect of implementation with precision and care, ensuring your vision comes to life flawlessly.',
    features: [
      'Project management and coordination',
      'Timeline planning and execution',
      'Quality control and supervision',
      'Installation and setup',
      'Final inspection and delivery',
    ],
  },
  {
    icon: FiBox,
    title: 'Custom Furniture',
    description:
      'Bespoke furniture pieces tailored to your exact specifications. Each piece is handcrafted by master artisans using the finest materials and techniques.',
    features: [
      'Custom design and consultation',
      'Premium material selection',
      'Handcrafted by expert artisans',
      'Multiple style options',
      'Lifetime quality guarantee',
    ],
  },
  {
    icon: FiSliders,
    title: 'Wood Manufacturing',
    description:
      'State-of-the-art wood manufacturing facility producing high-quality furniture and architectural elements. We work with exotic and premium wood varieties.',
    features: [
      'Exotic wood varieties',
      'Precision cutting and shaping',
      'Expert joinery techniques',
      'Custom finishing options',
      'Large-scale production capability',
    ],
  },
]

export default function Services() {
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
            Our{' '}
            <span className="text-luxury-copper relative inline-block">
              Services
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
            Comprehensive solutions for luxury interior design and furniture
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

      {/* Services Grid */}
      <section className="section-padding bg-luxury-cream dark:bg-luxury-darkBg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-full p-8 bg-white/85 dark:bg-luxury-darkSecondary border border-luxury-copper/20 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-luxury-copper/50 shadow-lg">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-copper/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <service.icon className="text-luxury-copper text-5xl mb-4" />
                  </div>

                  {/* Content */}
                  <h2 className="luxury-heading text-3xl md:text-4xl mb-4 text-luxury-charcoal dark:text-luxury-darkText">
                    {service.title}
                  </h2>
                  <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-luxury-textLight dark:text-luxury-darkTextSecondary"
                      >
                        <span className="text-luxury-copper mr-3 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-luxury-beige dark:bg-luxury-darkSecondary border-y border-luxury-copper/20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="luxury-heading text-4xl md:text-5xl mb-6 text-luxury-charcoal dark:text-luxury-darkText">
              Ready to Transform
              <br />
              <span className="text-luxury-copper">Your Space?</span>
            </h2>
            <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life. Contact us
              today for a consultation.
            </p>
            <motion.a
              href="/contact"
              className="luxury-button luxury-button-secondary inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

