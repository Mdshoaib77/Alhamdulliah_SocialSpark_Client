import { toast } from "react-toastify";
import { FaDollarSign } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const EditIssues = ({ open, onClose, data }) => {
  // We rely on AnimatePresence for conditional rendering, but keep data check for safety
  if (!data) return null;

  const categories = [
    "Garbage Management",
    "Roads & Transport",
    "Water & Drainage",
    "Electricity",
    "Environment",
    "Traffic & Signals",
    "Public Safety",
    "Education & Health",
    "Business & Commerce",
    "Parks & Recreation",
    "Infrastructure Development",
  ];

  const statusList = ["Ongoing", "Ended"];

  const handleUpdate = (e) => {
    e.preventDefault();

    const amountValue = Number(e.target.amount.value);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const updatedIssue = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      amount: amountValue,
      status: e.target.status.value,
    };

    fetch(`https://b12-assignment-10-server.vercel.app/issues/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedIssue),
    })
      .then((res) => res.json())
      .then(() => {
        // window.location.reload(); // Avoid full reload if possible, but keep original logic
        toast.success("Issue Updated Successfully!");
        onClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update issue.");
      });
  };

  // Framer Motion variants for animation
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
        damping: 25,
        stiffness: 250,
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
      initial={false} 
      mode='wait'
    >
      {open && (
        // 1. Backdrop (Full Screen & Clickable to close)
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} 
        >
          {/* 2. Modal Content (The Form itself) */}
          <motion.form
            variants={modal}
            onSubmit={handleUpdate}
            // max-h-[90vh] ensures the modal takes max 90% of viewport height
            // overflow-y-auto ensures internal scrolling if content is too long
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-lg md:max-w-xl relative max-h-[90vh]" 
            // Prevent closing when clicking inside the form
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Close Button (Inside the Modal Frame) */}
            <button
              type="button" // Important: use type="button"
              onClick={onClose}
              className="absolute top-2 right-2 p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mt-2">
              <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 pb-2 text-center">
                Update Your Community Issue
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center pb-4">
                Edit and update details of your reported community issue to keep information accurate and up-to-date.
              </p>
            </div>

            {/* Scrollable Form Fields Area */}
            {/* max-h-[60vh] makes the form fields scrollable, while header/footer stay visible */}
            <div className="space-y-4 pr-2 max-h-[60vh] overflow-y-auto"> 
              {/* Title */}
              <div>
                <label className="font-medium dark:text-gray-200 text-black/70">
                  Title
                </label>
                <input
                  name="title"
                  defaultValue={data.title}
                  required
                  className="w-full text-gray-700 dark:text-gray-200 placeholder-gray-500 rounded p-2 mt-1 border border-green-500/30 focus:border-green-500 outline-none dark:bg-gray-700"
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-medium dark:text-gray-200 text-black/70 ">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={data.category}
                  className="w-full border border-green-500/30 text-gray-700 rounded p-2 mt-1 focus:border-green-500 outline-none dark:text-gray-200 dark:bg-gray-700">
                  <option
                    value=""
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 ">
                    Select Category
                  </option>
                  {categories.map((cat, i) => (
                    <option
                      key={i}
                      value={cat}
                      className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="font-medium dark:text-gray-200 text-black/70">
                  Amount
                </label>
                <div className="flex items-center border border-green-500/30 rounded p-2 mt-1 focus-within:ring-2 focus-within:ring-green-500 dark:bg-gray-700">
                  <FaDollarSign className="text-gray-400" />
                  <input
                    type="number"
                    name="amount"
                    defaultValue={data.amount}
                    required
                    min="1"
                    className="text-gray-700 dark:text-gray-200 placeholder-gray-500 ml-2 w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="font-medium dark:text-gray-200 text-black/70">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={data.status}
                  className="w-full border text-gray-700 dark:text-gray-200 border-green-500/30 rounded p-2 mt-1 focus:border-green-500 outline-none dark:bg-gray-700">
                  <option value="" className="bg-white dark:bg-gray-700">
                    Select Status
                  </option>
                  {statusList.map((s, i) => (
                    <option key={i} value={s} className="bg-white dark:bg-gray-700">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="font-medium dark:text-gray-200 text-black/70">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={data.description}
                  rows="8"
                  className="w-full text-gray-700 dark:text-gray-200 placeholder-gray-500 rounded p-2 mt-1 border border-green-500/30 focus:border-green-500 outline-none resize-none dark:bg-gray-700"
                  required></textarea>
              </div>
            </div>

            {/* Save Button (Fixed at the bottom of the form) */}
            <button
              type="submit"
              className="w-full bg-purple-600 dark:bg-purple-800 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors mt-6 shadow-lg">
              Save Changes
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditIssues;