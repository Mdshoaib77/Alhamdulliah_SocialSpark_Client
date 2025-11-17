import { FaDollarSign } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion import

const Modal = ({ open, onClose, data, SetContributors }) => {
  const { user } = useContext(AuthContext);
  if (!open) return null; // open prop is checked by AnimatePresence now, but keep for safety
  const today = new Date().toISOString().split("T")[0];

  const handelAddContribution = (e) => {
    e.preventDefault();

    const amountValue = Number(e.target.amount.value);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid contribution amount.");
      return;
    }

    const addContributionData = {
      title: e.target.title.value,
      image: data.image,
      category: data.category,
      amount: amountValue,
      name: e.target.name.value,
      email: e.target.email.value,
      number: e.target.number.value,
      address: e.target.address.value,
      date: e.target.date.value,
      issueId: data._id,
      contributorImg: user?.photoURL || user?.reloadUserInfo?.photoUrl,
    };

    fetch("https://b12-assignment-10-server.vercel.app/contribution", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addContributionData),
    })
      .then((res) => res.json())
      .then((savedData) => {
        console.log("Saved contribution:", savedData);
        toast.success("Thanks for your contribution");
        if (savedData.insertedId) {
          SetContributors((prev) => [
            ...prev,
            { ...addContributionData, _id: savedData.insertedId },
          ]);
        }
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to make contribution.");
      });
  };

  // Define two motion variants: one for the backdrop and one for the actual modal content
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: { 
      y: "-100vh", // Start from above the screen
      opacity: 0,
    },
    visible: {
      y: "0", // Move to center of the screen
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 25, // Less bouncy
        stiffness: 250, // Faster
      },
    },
    exit: { 
      y: "100vh", // Exit to below the screen
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };


  return (
    <AnimatePresence 
      // Important: Only render the child component when `open` is true
      initial={false} 
      mode='wait'
    >
      {open && (
        // 1. Backdrop (Full Screen)
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal on backdrop click
        >
          {/* 2. Modal Content (The Form itself) */}
          <motion.form
            variants={modal}
            className="bg-white mt-20 dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg md:max-w-xl p-6 relative max-h-[90vh]" 
            // Stop propagation prevents the backdrop click from closing the modal when clicking inside the form
            onClick={(e) => e.stopPropagation()} 
            onSubmit={handelAddContribution}
          >
            {/* Close Button remains inside the form/modal frame */}
            <button
              type="button" 
              className="absolute top-3 right-4 p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              onClick={onClose}
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-bold text-purple-800 mb-2 text-center">
              Pay Clean-Up Contribution
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">
              Contribute to keeping our community clean and green by paying your clean-up fee easily and securely.
            </p>

            {/* Content area: We wrap the input fields in a div to manage scrolling if needed */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"> 
              {/* Issues Title */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1">
                  Issues Title
                </label>
                <input
                  type="text"
                  value={data.title}
                  readOnly
                  name="title"
                  className="placeholder-gray-500 dark:text-gray-200 text-gray-700 w-full border border-green-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 dark:bg-gray-700"
                />
              </div>
              
              {/* Amount */}
              <div>
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-200">Amount</label>
                <div className="w-full border border-green-300 rounded-md px-3 flex items-center gap-1 focus-within:ring-2 focus-within:ring-green-500">
                  <FaDollarSign color="gray" />
                  <input
                    type="number"
                    name="amount"
                    className="placeholder-gray-500 dark:text-gray-200 text-gray-700 outline-none w-full py-2 bg-transparent"
                    placeholder="Enter your Contribution Amount"
                    min="1" 
                    required
                  />
                </div>
              </div>
              
              {/* Name */}
              <div>
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-200">Name</label>
                <input
                  type="text"
                  name="name"
                  readOnly
                  value={user?.displayName || "N/A"}
                  className="placeholder-gray-500 dark:text-gray-200 text-gray-700 w-full border border-green-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 dark:bg-gray-700"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  value={user?.email || "N/A"}
                  className="placeholder-gray-500 dark:text-gray-200 text-gray-700 w-full border border-green-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 dark:bg-gray-700"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-200">
                  Phone Number
                </label>
                <input
                  type="text" 
                  name="number"
                  className=" placeholder-gray-500 dark:text-gray-200 text-gray-700 w-full border border-green-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter your Phone Number"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="dark:text-gray-200 text-gray-700 block text-sm mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  className="placeholder-gray-500 dark:text-gray-200 text-gray-700 w-full border border-green-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Enter your Address"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-200">Date</label>
                <input
                  type="text"
                  name="date"
                  readOnly
                  value={today}
                  className="placeholder-gray-500 dark:text-gray-200 text-gray-700 w-full border border-green-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>
            
            {/* Pay Button */}
            <button
              type="submit"
              className="w-full bg-purple-800 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors mt-6 shadow-md"
            >
              Confirm and Pay Contribution
            </button>

          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;