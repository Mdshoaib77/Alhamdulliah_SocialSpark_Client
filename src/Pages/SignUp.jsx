import { AtSign, CheckCircle, Dot, Image, XCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const {
    createUserWithEmailAndPasswordfunc,
    signInWithGoogleFunc,
    setUser,
    updateProfileFunc,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const handelGoogleSignup = (e) => {
    e.preventDefault();
    signInWithGoogleFunc()
      .then((result) => {
        toast.success("Sign up Succesful");

        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        const cleanMessage = error.code
          .replace("auth/", "")
          .replaceAll("-", " ");
        toast.error(cleanMessage);
      });
  };

  const handelSignUp = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      if (!hasUppercase) {
        return toast.error("Must have an Uppercase letter");
      }
      if (!hasLowercase) {
        return toast.error("Must have an hasLowercase letter");
      }
      if (!hasLength) {
        return toast.error("At least 6 characters long");
      }
      return;
    }

    createUserWithEmailAndPasswordfunc(email, password)
      .then(() => {
        toast.success("Sign up Successful");
        updateProfileFunc(displayName, photoURL).then(() => {});
        navigate("/login");
      })
      .catch((error) => {
        const cleanMessage = error.code
          .replace("auth/", "")
          .replaceAll("-", " ");
        toast.error(cleanMessage);
      });
  };

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasLength = password.length >= 6;

  return (
    <div className="flex h-[800px] w-full signUp-bg-gradient">
      <title>Sign Up</title>
      <div className="w-full flex flex-col items-center justify-center">
        <form className="md:w-96 w-80 flex flex-col " onSubmit={handelSignUp}>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl  font-medium text-green-500">Sign up</h2>
            <p className="text-sm text-gray-500/90 mt-3">
              Welcome! Please Sign up to continue
            </p>
          </div>
          <button
            onClick={handelGoogleSignup}
            type="button"
            className="w-full mt-8 bg-green-500/10 flex items-center justify-center h-12 rounded-full">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or Sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="flex items-center w-full bg-transparent border border-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6">
            <AtSign color="#22c55e" size={18} />
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className="bg-transparent  placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>
          <div className="flex items-center w-full bg-transparent border border-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6">
            <Image color="#22c55e" size={18} />
            <input
              type="text"
              name="photo"
              placeholder="Enter your Image link"
              className="bg-transparent  placeholder-gray-500/80 outline-none text-sm w-full h-full "
              required
            />
          </div>
          <div className="flex items-center w-full bg-transparent border border-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#22c55e"
              />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              className="bg-transparent  placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#22c55e"
              />
            </svg>
            <input
              type={show ? "password" : "text"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent  placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-gray-500 mr-3">
              {show ? (
                <FaRegEyeSlash
                  color="#22c55e
"
                />
              ) : (
                <FaRegEye color="#22c55e" />
              )}
            </button>
          </div>
          {/* Password Requirements */}
          <div className="mt-2 space-y-1 ml-2">
            <p
              className={`text-sm flex items-center gap-1 ${
                hasUppercase ? "text-green-500" : "text-gray-500"
              }`}>
              {hasUppercase ? <CheckCircle size={16} /> : <XCircle size={16} />}
              Must have an Uppercase letter
            </p>
            <p
              className={`text-sm flex items-center gap-1 ${
                hasLowercase ? "text-green-500" : "text-gray-500"
              }`}>
              {hasLowercase ? <CheckCircle size={16} /> : <XCircle size={16} />}
              Must have a Lowercase letter
            </p>
            <p
              className={`text-sm flex items-center gap-1 ${
                hasLength ? "text-green-500" : "text-gray-500"
              }`}>
              {hasLength ? <CheckCircle size={16} /> : <XCircle size={16} />}
              At least 6 characters long
            </p>
          </div>

          <button
            type="submit"
            className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity">
            Sign up
          </button>
          <p className="text-gray-500/90 text-sm mt-4 flex items-center justify-center gap-1">
            Alrady Have an account?{" "}
            <Link
              to="/login"
              className="text-green-500 hover:underline"
              href="#">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
