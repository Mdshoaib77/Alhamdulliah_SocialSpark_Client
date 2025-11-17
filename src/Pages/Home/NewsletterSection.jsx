import React from 'react';
import { motion } from 'framer-motion';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const NewsletterSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container with Gradient and Framer Motion */}
        <motion.div 
          className="relative isolate overflow-hidden rounded-3xl p-10 lg:p-16 shadow-2xl 
                     bg-gradient-to-br from-indigo-600 to-pink-500"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // স্ক্রলে ভিউপোর্টে এলে অ্যানিমেট হবে
          viewport={{ once: true, amount: 0.3 }}
        >
          
          {/* Decorative SVG Blob (for visual appeal) */}
          <svg 
            viewBox="0 0 1024 1024" 
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" 
            aria-hidden="true"
          >
            <circle cx="512" cy="512" r="512" fill="url(#radial-gradient-pink-indigo)" fillOpacity="0.4" />
            <defs>
              <radialGradient id="radial-gradient-pink-indigo">
                <stop stopColor="#EC4899" /> 
                <stop offset="1" stopColor="#4F46E5" /> 
              </radialGradient>
            </defs>
          </svg>
          
          <div className="mx-auto max-w-2xl text-center">
            
            {/* Header / Call to Action (CTA) */}
            <motion.h2 
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              variants={itemVariants}
            >
              Unleash Your Local Power
            </motion.h2>
            
            <motion.p 
              className="mt-4 text-xl leading-8 text-indigo-100"
              variants={itemVariants}
            >
              Join our mailing list for exclusive event invitations, volunteer spotlights, and impact reports delivered straight to your inbox.
            </motion.p>

            {/* Subscription Form */}
            <motion.form 
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-4"
              variants={itemVariants}
            >
              <label htmlFor="email-address-v2" className="sr-only">
                Email address
              </label>
              <input
                id="email-address-v2"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-lg border-0 bg-white/10 px-3.5 py-3 text-white 
                           shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-300 
                           focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 
                           w-full sm:w-auto"
                placeholder="Enter your email address"
                aria-label="Enter your email address to subscribe"
              />
              
              {/* Button with strong contrast */}
              <button
                type="submit"
                className="flex-none rounded-lg bg-pink-400 px-6 py-3 mt-4 sm:mt-0 
                           text-base font-semibold text-white shadow-md 
                           hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 
                           focus-visible:outline-offset-2 focus-visible:outline-pink-400 
                           transition duration-150 ease-in-out w-full sm:w-auto"
              >
                Sign Up Now
              </button>
            </motion.form>
            
            {/* Privacy Note */}
            <motion.p 
              className="mt-8 text-sm leading-6 text-indigo-200"
              variants={itemVariants}
            >
                By subscribing, you agree to our 
                <a href="#" className="font-semibold text-white hover:text-pink-100"> Privacy Policy</a>.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;