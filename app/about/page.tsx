'use client'

import { motion } from 'framer-motion'
import { FiAward, FiHeart, FiUsers, FiTarget } from 'react-icons/fi'

export default function About() {
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
            About{' '}
            <span className="text-luxury-copper relative inline-block">
              Us
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
            Crafting excellence in luxury furniture and interior design
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

      {/* Company Story */}
      <section className="section-padding bg-luxury-cream dark:bg-luxury-darkBg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              className="relative h-[400px] md:h-[500px]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-luxury-beige dark:bg-luxury-darkSecondary rounded-lg overflow-hidden border border-luxury-charcoal/10 dark:border-luxury-copper/20">
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-copper/15 to-transparent" />
                <img
                  src="/Luna1.png"
                  alt="CSC luxury furniture workshop and interior design studio showcasing expert craftsmanship"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="luxury-heading text-4xl md:text-5xl mb-6 text-luxury-charcoal dark:text-luxury-darkText">
                Our <span className="text-luxury-copper">Story</span>
              </h2>
              <div className="space-y-4 text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg leading-relaxed">
                <p>
                  Founded with a vision to redefine luxury living, CSC has been at the
                  forefront of interior design and furniture manufacturing for over two decades.
                  What started as a small workshop has grown into a trusted name in the industry.
                </p>
                <p>
                  Our journey began with a simple belief: that every space deserves to be
                  transformed into a reflection of its owner's unique taste and lifestyle.
                  We combine traditional craftsmanship with contemporary design, creating
                  pieces that are both timeless and modern.
                </p>
                <p>
                  Today, we are proud to have completed hundreds of projects, from luxury
                  villas and palaces to high-end restaurants and commercial spaces, each
                  one a testament to our commitment to excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-luxury-beige dark:bg-luxury-darkSecondary">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Mission */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-luxury-copper" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-luxury-copper" />
              <div className="p-8 bg-white/70 dark:bg-luxury-darkBg/70 backdrop-blur-sm rounded-lg border border-luxury-copper/20">
                <FiTarget className="text-luxury-copper text-4xl mb-4" />
                <h3 className="luxury-heading text-3xl mb-4 text-luxury-charcoal dark:text-luxury-darkText">
                  Our <span className="text-luxury-copper">Mission</span>
                </h3>
                <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg leading-relaxed">
                  To create exceptional interior spaces and luxury furniture that blend
                  artistic vision with functional excellence. We strive to exceed client
                  expectations by delivering unparalleled craftsmanship, innovative design,
                  and personalized service.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-luxury-copper" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-luxury-copper" />
              <div className="p-8 bg-white/70 dark:bg-luxury-darkBg/70 backdrop-blur-sm rounded-lg border border-luxury-copper/20">
                <FiAward className="text-luxury-copper text-4xl mb-4" />
                <h3 className="luxury-heading text-3xl mb-4 text-luxury-charcoal dark:text-luxury-darkText">
                  Our <span className="text-luxury-copper">Vision</span>
                </h3>
                <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg leading-relaxed">
                  To be recognized globally as the premier destination for luxury interior
                  design and bespoke furniture. We envision a future where every project
                  we undertake becomes a masterpiece, setting new standards in the industry
                  while honoring traditional craftsmanship.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-luxury-cream dark:bg-luxury-darkBg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="luxury-heading text-4xl md:text-5xl mb-4 text-luxury-charcoal dark:text-luxury-darkText">
              Why <span className="text-luxury-copper">Choose Us</span>
            </h2>
            <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary text-lg max-w-2xl mx-auto">
              What sets us apart in the world of luxury interior design and furniture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FiAward,
                title: 'Expert Craftsmanship',
                description:
                  'Our skilled artisans bring decades of experience to every piece, ensuring the highest quality and attention to detail.',
              },
              {
                icon: FiHeart,
                title: 'Personalized Design',
                description:
                  'We believe every project is unique. Our team works closely with clients to create custom solutions that reflect their vision.',
              },
              {
                icon: FiUsers,
                title: 'Dedicated Team',
                description:
                  'From concept to completion, our dedicated professionals guide you through every step of the design and implementation process.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white/80 dark:bg-luxury-darkSecondary rounded-lg border border-luxury-copper/20 hover:border-luxury-copper/60 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <item.icon className="text-luxury-copper text-4xl mb-4" />
                <h3 className="luxury-heading text-2xl mb-3 text-luxury-charcoal dark:text-luxury-darkText">
                  {item.title}
                </h3>
                <p className="text-luxury-textLight dark:text-luxury-darkTextSecondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

