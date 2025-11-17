import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const initialMomentsData = [
  {
    id: 1,
    title: 'Beach Cleanup',
    category: 'Environment',
    bgColor: 'bg-white', 
    textColor: 'text-gray-800', 
    imageUrl: 'https://images.unsplash.com/photo-1565803974275-dccd2f933cbb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171',
  },
  {
    id: 2,
    title: 'Mentorship Session',
    category: 'Education',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    imageUrl: 'https://media.istockphoto.com/id/2206817620/photo/professional-speaker-conducting-corporate-training-session-for-engaged-employees-in-a-modern.webp?a=1&b=1&s=612x612&w=0&k=20&c=PZdJ3B93xrW4OUO5ByZwkhod_KwxuMXeQ6uncw3W9Rc=',
  },
  {
    id: 3,
    title: 'Food Donation Drive',
    category: 'Community Aid',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    imageUrl: 'https://media.istockphoto.com/id/2199034015/photo/outdoor-food-drive-and-group-of-volunteers-with-help-goals-and-donations-at-charity-event-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=jtdK7v_KdikGHrcTJa0qzBPyjtY0NDYeLfqR85JhP3c=',
  },
  {
    id: 4,
    title: 'Digital Literacy Workshop',
    category: 'Skill Development',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    imageUrl: 'https://images.unsplash.com/photo-1563394867331-e687a36112fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176',
  },
  {
    id: 5,
    title: 'Elderly Care Visit',
    category: 'Social Support',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1681995460558-738a8856313c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEVsZGVybHklMjBDYXJlJTIwVmlzaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
  },
{
    id: 6,
    title: 'Free Medical Checkup Camp', 
    category: 'Public Health',
    bgColor: 'bg-white', 
    textColor: 'text-gray-800',
    imageUrl: 'https://images.unsplash.com/photo-1680759291357-9e1b771323d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMzfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600',
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 10,
    },
  },
};


const MomentCard = ({ title, category, imageUrl }) => {
  return (
    <motion.div
      className="flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer group bg-white overflow-hidden"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="relative h-64 overflow-hidden rounded-t-xl"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-gray-900/70 to-transparent">
            <h3 className="relative z-10 text-2xl font-extrabold text-white drop-shadow-md">
              {title}
            </h3>
        </div>
      </div>
      <div className="bg-white p-4 text-center border-t-2 border-gray-100">
        <span className="text-md font-bold tracking-wider uppercase text-teal-600 hover:text-teal-800 transition-colors duration-200">
          {category}
        </span>
      </div>
    </motion.div>
  );
};

const MomentsSection = () => {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fakeApiCall = new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialMomentsData);
      }, 1000);
    });

    fakeApiCall
      .then(data => {
        setMoments(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 flex justify-center items-center h-96">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 border-4 border-t-4 border-t-teal-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700 font-medium">Loading Community Moments...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 font-sans">
      <motion.div
        className="container mx-auto px-4 max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-3">
            Moments of Collective Action
          </h2>
          <div className="w-16 h-1 mx-auto bg-teal-500 mb-4"></div>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A glimpse into the diverse, inspiring work our community members are accomplishing every day, advancing social development.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {moments.map((moment) => (
            <MomentCard key={moment.id} title={moment.title} category={moment.category} imageUrl={moment.imageUrl} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MomentsSection;