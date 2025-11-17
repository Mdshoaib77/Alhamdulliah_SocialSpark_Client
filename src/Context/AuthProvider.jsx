import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [Data, setData] = useState([]);
  const [contributionData, setContributionData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  const createUserWithEmailAndPasswordfunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogleFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutFunc = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateProfileFunc = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const sendPasswordResetEmailFunc = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);

    const fatchData = async () => {
      await new Promise((res) => setTimeout(res, 1000));
      axios("https://b12-assignment-10-server.vercel.app/issues")
        .then((data) => setData(data.data))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    };
    fatchData();
  }, [user]);

  useEffect(() => {
    setLoading(true);

    const fatchData = async () => {
      await new Promise((res) => setTimeout(res, 1000));
      axios(
        `https://b12-assignment-10-server.vercel.app/contribution?email=${
          user?.email || user?.reloadUserInfo?.email
        }`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((data) => setContributionData(data.data))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    };
    fatchData();
  }, [user]);

  const authInfo = {
    Data,
    contributionData,
    loading,
    setLoading,
    updateProfileFunc,
    user,
    setUser,
    createUserWithEmailAndPasswordfunc,
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    error,
    signOutFunc,
    sendPasswordResetEmailFunc,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
