import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div>
      {/* Banner Section */}
      <div
        className="banner bg-cover bg-center relative text-white"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/2231207485/photo/group-of-men-volunteers-picking-up-litter-in-city-park.jpg?s=612x612&w=0&k=20&c=nyPKcW8Y_ki6XMdIjwpJL_puXgfzLZNkUB7h0vhGtCc=')",
        }}
      >
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="content relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          {/* Animated Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empowering Communities Through <br /> Social Service Events
          </motion.h1>

          {/* Animated Description */}
          <motion.p
            className="text-lg sm:text-xl mb-6 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Join hands with like-minded individuals to create, participate, and track
            local social service events in your area. Together, we can make a difference!
          </motion.p>
          <motion.a
            href="/all-issues"
            className="bg-primary text-white py-3 px-8 rounded-full text-xl hover:bg-primary-dark transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
>
  Upcoming Events
</motion.a>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;

