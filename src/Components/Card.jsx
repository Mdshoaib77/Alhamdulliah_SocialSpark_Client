import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { FaSackDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importing Framer Motion

const Card = ({ card }) => {
  return (
    <motion.div
      className="card bg-gray-100 dark:bg-gray-900 shadow-sm issues-card"
      initial={{ opacity: 0, y: 20 }} // Initial state: hidden and slightly below
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      transition={{ duration: 0.6 }} // Duration of the animation
    >
      <figure>
        <motion.img
          src={card.image}
          alt={card.title}
          className="h-80 w-full"
          initial={{ scale: 1.1 }} // Image starts slightly zoomed in
          whileHover={{ scale: 1.05 }} // Zooms in when hovering
          transition={{ duration: 0.3 }} // Smooth zooming effect
        />
      </figure>
      <div className="card-body p-4">
        <motion.h2
          className="card-title md:hidden lg:block block text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Delayed fade-in for the title
        >
          {card.title.length > 55
            ? card.title.slice(0, 55) + "..."
            : card.title}
        </motion.h2>
        <motion.h2
          className="card-title hidden md:block lg:hidden text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }} // Delayed fade-in for the title (on mobile)
        >
          {card.title.length > 45
            ? card.title.slice(0, 40) + "..."
            : card.title}
        </motion.h2>

        <motion.p
          className="text-green-600 bg-green-100 dark:bg-green-950 w-fit px-2 py-1 rounded-md text-sm font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }} // Delayed fade-in for the category
        >
          {card.category}
        </motion.p>

        <motion.div
          className="flex items-center gap-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }} // Delayed fade-in for location
        >
          <GrMapLocation />
          <p>{card.location}</p>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }} // Delayed fade-in for amount
        >
          <FaSackDollar />
          <p>${card.amount}</p>
        </motion.div>

        <motion.div
          className="card-actions justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }} // Delayed fade-in for button
        >
          <Link
            to={`/issues/${card._id}`}
            className="btn bg-purple-800 text-white rounded-2xl w-full border-green-600"
          >
            See Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
