import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

// Framer Motion imports
import { motion } from "framer-motion";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#0d0d1e]">
      <motion.footer
        className="w-11/12 mx-auto px-2 pt-8 text-gray-300"
        initial={{ opacity: 0 }} // Initial state: fully transparent
        animate={{ opacity: 1 }} // Final state: fully visible
        transition={{ duration: 0.8 }} // Duration for the fade-in animation
      >
        <div className="flex flex-col md:flex-row justify-between w-full gap-1 border-b border-gray-700 pb-6">
          <div className="md:max-w-96">
            <motion.div
              className="hover:text-green-500"
              initial={{ x: -100, opacity: 0 }} // Starts off-screen (from left)
              animate={{ x: 0, opacity: 1 }} // Moves to the original position and fades in
              transition={{ duration: 1 }} // Smooth transition
            >
              <Link
                to="/"
                className="flex items-center gap-2 text-2xl font-bold text-white"
              >
                <h1 className="text-3xl lg:text-4xl font-extrabold text-purple-800 dark:text-purple-400 tracking-tight">
                  Social<span className="text-purple-800 dark:text-white">Spark</span>
                </h1>
              </Link>
            </motion.div>
            <p className="mt-6 text-sm">
              The Social Spark & Issue Reporting Portal empowers users to report, track, and resolve local environmental issues with real-time updates, secure Firebase authentication, and a modern, responsive design.
            </p>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20 flex-col md:flex-row">
            <div>
              <motion.h2
                className="font-semibold mb-5 text-white"
                initial={{ opacity: 0 }} // Starts hidden
                animate={{ opacity: 1 }} // Fades in
                transition={{ duration: 1, delay: 0.3 }} // Delay for a staggered effect
              >
                Social Links
              </motion.h2>
              <motion.ul
                className="text-sm space-y-2 w-30 text-left"
                initial={{ opacity: 0 }} // Starts hidden
                animate={{ opacity: 1 }} // Fades in
                transition={{ duration: 1, delay: 0.5 }} // Delay for a staggered effect
              >
                <motion.li
                  whileHover={{ scale: 1.1 }} // On hover, scale up the link
                  transition={{ duration: 0.3 }}
                >
                  <Link to="/" className="gap-2 hover:text-green-500 hover:underline flex items-center text-white">
                    <Facebook />
                    Facebook
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to="/" className="gap-2 hover:text-green-500 hover:underline flex items-center text-white">
                    <Instagram />
                    Instagram
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to="/" className="gap-2 hover:text-green-500 hover:underline flex items-center text-white">
                    <Linkedin />
                    Linkedin
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to="/" className="gap-2 hover:text-green-500 hover:underline flex items-center text-white">
                    <FaXTwitter />
                    Twitter
                  </Link>
                </motion.li>
              </motion.ul>
            </div>

            {/* Rest of the sections */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }} // Delay for a staggered effect
            >
              <h2 className="font-semibold mb-5 text-white">Community</h2>
              <ul className="text-sm space-y-2 w-30">
                <li>
                  <Link to="/" className="hover:text-green-500 hover:underline text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/all-issues" className="hover:text-green-500 hover:underline text-white">
                   Upcoming Events
                  </Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link to="/add-issues" className="hover:text-green-500 hover:underline text-white">
                        Create Events
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-issues" className="hover:text-green-500 hover:underline text-white">
                        Manage Events
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-contribution" className="hover:text-green-500 hover:underline text-white">
                        My Contribution
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="hover:text-green-500 hover:underline text-white">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/sign-up" className="hover:text-green-500 hover:underline text-white">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }} // Delay for a staggered effect
            >
              <h2 className="font-semibold mb-5 text-white">
                Subscribe to our newsletter
              </h2>
              <div className="text-sm space-y-2">
                <p>
                  The latest news, articles, and resources, sent to your inbox weekly.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    className="border border-green-500/30 placeholder-gray-500 focus:ring-2 ring-green-500 outline-none w-full max-w-64 h-9 rounded px-2"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-purple-500 w-30 h-9 text-white rounded">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.p
          className="pt-4 text-center text-xs md:text-sm pb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }} // Final fade-in with a delay
        >
          Copyright {new Date().getFullYear()} ©{" "}
          <a
            href="https://github.com/Mdshoaib77"
            className="hover:underline text-purple-500"
          >
            Md SHoaib
          </a>
          . All Rights Reserved.
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default Footer;
