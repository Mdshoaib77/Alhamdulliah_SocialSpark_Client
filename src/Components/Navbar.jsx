import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/logo.png"; // LOGO IMAGE IMPORT REMOVED
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import Switch from "./Switch";
import { LogOut, Menu, Home, Calendar, PlusCircle, List, UserCheck, LogIn, CheckCircle } from "lucide-react"; // Added CheckCircle icon

const Navbar = () => {
  const { signOutFunc, setUser, user } = useContext(AuthContext);

  const handelSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success("Sign out successfully");
        setUser(null);
      })
      .catch((error) => {
        console.error("SignOut error:", error.message);
      });
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 text-base font-semibold transition-colors duration-200 ${
      isActive
        ? "text-purple-600 dark:text-purple-400"
        : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
    }`;

  // Public links for Desktop (Visible on LG screens)
  const publicLinksDesktop = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClasses({ isActive })} pr-4 border-r border-gray-300 dark:border-gray-600`
        }
      >
        <Home size={18} />
        Home
      </NavLink>
      <NavLink to="/all-issues" className={linkClasses}>
        <Calendar size={18} />
        Upcoming Events
      </NavLink>
      {/* Contact option removed from desktop links */}
    </>
  );

  // Private links for Profile Dropdown (Dashboard) - Common styles for dropdown links
  const privateLinks = (
    <>
      <NavLink
        to="/add-issues"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
            isActive ? "text-green-600 font-semibold" : "text-gray-700 dark:text-gray-200"
          }`
        }
      >
        <PlusCircle size={18} /> Create Events
      </NavLink>

      <NavLink
        to="/my-issues"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
            isActive ? "text-green-600 font-semibold" : "text-gray-700 dark:text-gray-200"
          }`
        }
      >
        <List size={18} /> Manage Events
      </NavLink>

      <NavLink
        to="/my-contribution"
        className={({ isActive }) =>
          `flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
            isActive ? "text-green-600 font-semibold" : "text-gray-700 dark:text-gray-200"
          }`
        }
      >
        <UserCheck size={18} /> My Contribution
      </NavLink>

      {/* Added Joined Events link with CheckCircle icon */}

    </>
  );

  // Reusable NavLink style for the inner dropdown menu items
  const dropdownLinkClasses = ({ isActive, customColor = "purple" }) =>
    `flex items-center gap-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
      isActive
        ? `text-${customColor}-600 font-semibold`
        : "text-gray-700 dark:text-gray-200"
    }`;

  // Public Links for use inside the Mobile (Logged Out) Dropdown
  const mobilePublicDropdownLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => dropdownLinkClasses({ isActive, customColor: 'purple' })}>
        <Home size={18} /> Home
      </NavLink>
      <NavLink to="/all-issues" className={({ isActive }) => dropdownLinkClasses({ isActive, customColor: 'purple' })}>
        <Calendar size={18} /> Upcoming Events
      </NavLink>
      {/* Login Button inside the dropdown */}
      <NavLink
        to="/login"
        className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-full text-white font-bold transition-colors duration-200 mt-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-sm"
      >
        <LogIn size={18} /> Login
      </NavLink>
    </>
  );

  // Private Links (Home, Events, Logout) for use inside the Mobile (Logged In) Dropdown
  const mobileLoggedInDropdownPublicLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => dropdownLinkClasses({ isActive, customColor: 'purple' })}>
        <Home size={18} /> Home
      </NavLink>
      <NavLink to="/all-issues" className={({ isActive }) => dropdownLinkClasses({ isActive, customColor: 'purple' })}>
        <Calendar size={18} /> Upcoming Events
      </NavLink>
    </>
  );

  return (
    <div className="w-full shadow-md sticky top-0 bg-white dark:bg-gray-900 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="navbar w-11/12 mx-auto py-3 justify-between items-center">
        {/* Navbar Start - Logo (Text Only) */}
        <div className="navbar-start w-auto">
          <Link to="/" className="flex items-center">
            {/* Logo Text Only */}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-purple-800 dark:text-purple-400 tracking-tight">
              Social<span className="text-gray-900 dark:text-white">Spark</span>
            </h1>
          </Link>
        </div>

        {/* Navbar End - Links and Auth (Right Aligned) */}
        <div className="navbar-end w-auto flex items-center gap-2 sm:gap-4">
          
          {/* 1. Desktop Public Links (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-4">
            {publicLinksDesktop} {/* Only Home and Upcoming Events remain */}
          </div>

          {user ? (
            /* 2A. LOGGED IN: Profile Dropdown (Visible on ALL devices) */
            <div className="dropdown dropdown-end ml-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-purple-500 transition-all duration-300 p-0"
                title={user?.displayName || "Profile"}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    alt="User Avatar"
                    src={user?.photoURL || "https://via.placeholder.com/150/4A148C/FFFFFF?text=P"} // Default avatar if URL is missing
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Profile Dropdown Menu: Contains ALL user links and settings */}
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content rounded-xl z-20 mt-3 w-64 p-4 shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              >
                {/* User Info */}
                <li className="p-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                  <p className="text-base font-bold text-gray-800 dark:text-gray-100 truncate mb-1">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "N/A"}
                  </p>
                </li>
                
                {/* Dashboard Links (Private) */}
                <div className="flex flex-col gap-1 my-2">
                  <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 px-2 pt-1">
                    My Dashboard
                  </p>
                  {privateLinks}
                </div>
                
                {/* Mobile Public Links (Visible inside dropdown on mobile when logged in) */}
                <hr className="w-full border-t border-gray-200 dark:border-gray-700 my-2 lg:hidden" />
                <div className="flex flex-col gap-1 my-2 lg:hidden">
                    <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 px-2 pt-1">Navigation (Public Routes)</p>
                    {mobileLoggedInDropdownPublicLinks}
                </div>

                {/* Dark Mode Switch */}
                <hr className="w-full border-t border-gray-200 dark:border-gray-700 my-2" />
                <div className="flex items-center justify-between p-2">
                  <span className="text-gray-700 dark:text-gray-200 text-sm">Dark Mode</span>
                  <Switch />
                </div>

                {/* Logout Button */}
                <button
                  className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-full text-white font-semibold transition-colors duration-200 mt-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-sm"
                  onClick={handelSignOut}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            /* 2B. LOGGED OUT: Desktop Login Button + Responsive Dropdown */
            <>
              {/* Desktop Login Button (Hidden on Mobile) */}
              <NavLink
                to="/login"
                className="hidden lg:block px-4 py-2 sm:px-6 sm:py-2 rounded-full text-base font-bold transition-all duration-300 ease-in-out bg-purple-600 text-white hover:bg-purple-700 shadow-xl shadow-purple-200/50 dark:shadow-purple-900/50"
              >
                Login
              </NavLink>

              {/* Responsive Dropdown (Visible on Mobile/Small screens) */}
              <div className="dropdown dropdown-end lg:hidden ml-2">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle p-2 text-gray-600 dark:text-gray-300"
                >
                  <Menu size={24} />
                </div>
                {/* Mobile Menu Content (Public Links + Login + Dark Mode) */}
                <div
                  tabIndex={-1}
                  className="menu menu-vertical gap-2 dropdown-content bg-white dark:bg-gray-800 rounded-xl z-20 mt-3 w-56 p-4 shadow-2xl border border-gray-100 dark:border-gray-700"
                >
                  {mobilePublicDropdownLinks} {/* Home, Upcoming Events, and Login Button */}

                  <hr className="w-full border-t border-gray-200 dark:border-gray-700 my-2" />

                  <div className="flex items-center justify-between p-2">
                    <span className="text-gray-700 dark:text-gray-200 text-sm">Dark Mode</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
