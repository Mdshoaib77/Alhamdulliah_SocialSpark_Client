import React from 'react';
import { motion } from 'framer-motion';

// Icon components
const IconCreateHost = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const IconFindLocal = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const IconTrackGood = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l6 6 9-13.5" />
  </svg>
);

// Data Array
const features = [
  {
    step: 1,
    title: "Create & Host",
    description: "Organize local cleanup drives, mentorship sessions, or charity runs easily with powerful management tools.",
    icon: IconCreateHost,
  },
  {
    step: 2,
    title: "Find Local Impact",
    description: "Discover and join verified social service events happening right now in your neighborhood using advanced filters.",
    icon: IconFindLocal,
  },
  {
    step: 3,
    title: "Track Your Good",
    description: "Log your volunteer hours and see the collective difference you and your community are making with personalized statistics.",
    icon: IconTrackGood,
  },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 10,
    },
  },
};

const ImpactFeatures = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            How SocialSpark Works
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Making a difference is easy
          </p>
        </motion.div>

        {/* Feature Cards Container with Staggered Animation */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          
          {/* Desktop Connecting Line */}
          <div 
            className="hidden lg:block absolute inset-0 top-1/2 h-0.5 bg-indigo-300 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.step} 
                className="relative flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 z-10"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {/* Step Circle and Icon */}
                <div className="relative w-20 h-20 mb-6">
                  {/* Step Number Circle */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-indigo-600 flex items-center justify-center shadow-lg transform transition duration-300">
                    <span className="text-2xl font-extrabold text-white">{feature.step}</span>
                  </div>
                  {/* Circular Stroke/Border */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-indigo-300 animate-pulse-slow" />
                </div>

                {/* Step Heading and Description */}
                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>

                {/* Mobile Connecting Line */}
                {index < features.length - 1 && (
                  <div className="lg:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0.5 h-10 bg-indigo-300" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactFeatures;