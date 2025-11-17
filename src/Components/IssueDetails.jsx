import { CalendarDays, ChartColumnStacked, MapPinned } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Modal from "./Modal";
import Loader from "./Loader";
import { motion } from "framer-motion"; // Import Framer Motion

const IssueDetails = () => {
  const data = useLoaderData();
  const [openModal, setOpenModal] = useState(false);
  const [contributors, SetContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://b12-assignment-10-server.vercel.app/contribution/${data._id}`)
      .then((res) => res.json())
      .then((Data) => {
        SetContributors(Data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  const handleJoinEvent = () => {
    const userEmail = "user@example.com"; // Replace with the logged-in user's email
    const eventId = data._id; // The event ID that the user is joining

    // Sending the request to the backend to join the event
    fetch("https://your-api-endpoint.com/join-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        eventId: eventId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Redirect to the Joined Events page
        window.location.href = "/joined-events";
      })
      .catch((error) => {
        console.error("Error joining event:", error);
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900/10">
      <main className="flex container mx-auto px-4 py-8">
        <title>{data.title}</title>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6 text-sm">
            <Link to="/" className="text-purple-800 hover:underline">
              Home
            </Link>
            <span className="text-gray-500 dark:text-gray-400">/</span>
            <Link to="/all-issues" className="text-purple-800 hover:underline">
              All Issues
            </Link>
            <span className="text-gray-500 dark:text-gray-400">/</span>
            <span className="text-purple-800 font-medium">{data.title}</span>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }} // Fade-in effect for the entire content
          >
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} // Fade-in and slide-up animation for the title
              >
                <h2 className="text-4xl font-black leading-tight tracking-tight text-purple-800 dark:text-gray-200">
                  {data.title}
                </h2>
              </motion.div>

              <div className="flex gap-3 flex-wrap mt-4">
                <motion.div
                  className="flex h-14 items-center justify-center gap-x-2 rounded bg-purple-300/10 px-4 text-purple-700 hover:bg-purple-100"
                  title="Category"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }} // Staggered fade-in for category
                >
                  <span className="material-symbols-outlined text-base">
                    <ChartColumnStacked />
                  </span>
                  <div>
                    <p className="font-medium">Category</p>
                    <p className="text-sm font-medium text-purple-500">{data.category}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex h-14 items-center justify-center gap-x-2 rounded bg-purple-300/10 text-purple-700 px-4 hover:bg-purple-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }} // Staggered fade-in for location
                >
                  <span className="material-symbols-outlined text-base">
                    <MapPinned />
                  </span>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm font-medium text-purple-500">{data.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex h-14 items-center justify-center gap-x-2 rounded bg-purple-300/10 text-purple-700 px-4 hover:bg-purple-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }} // Staggered fade-in for date
                >
                  <span className="material-symbols-outlined text-base">
                    <CalendarDays />
                  </span>
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm font-medium text-purple-500">{data.date}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-100"
                style={{ backgroundImage: `url(${data.image})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }} // Fade-in for the background image
              ></motion.div>

              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm dark:shadow-gray-50/40">
                <motion.h3
                  className="text-xl font-bold mb-2 text-purple-800 dark:text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }} // Fade-in for description header
                >
                  Description
                </motion.h3>
                <motion.p
                  className="text-base leading-relaxed text-purple-700 dark:text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }} // Fade-in for description text
                >
                  {data.description}
                </motion.p>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <motion.div
                className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm sticky top-65 dark:shadow-gray-50/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }} // Fade-in for the contribution section
              >
                <h3 className="text-xl font-bold mb-4 text-purple-800 dark:text-gray-200">
                  Community Contribution
                </h3>

                <div className="space-y-4">
                  <motion.div
                    className="flex justify-between items-baseline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }} // Fade-in for suggested budget
                  >
                    <span className="text-purple-700 dark:text-gray-400">Suggested Budget</span>
                    <span className="text-2xl font-bold text-purple-800 dark:text-gray-200">${data.amount}</span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-baseline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }} // Fade-in for collected amount
                  >
                    <span className="text-purple-700 dark:text-gray-400">Collected</span>
                    <span className="text-xl font-bold text-purple-500">$350.00</span>
                  </motion.div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className="bg-purple-500 h-4 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="text-right text-sm text-purple-700 dark:text-gray-400">
                    70% funded
                  </div>

                  <motion.button
                    onClick={() => setOpenModal(true)}
                    className="w-full bg-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-500/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50 dark:focus:ring-offset-background-dark"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }} // Fade-in for pay contribution button
                  >
                    Pay Clean-Up Contribution
                  </motion.button>

                  <Modal data={data} open={openModal} SetContributors={SetContributors} onClose={() => setOpenModal(false)}></Modal>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default IssueDetails;
