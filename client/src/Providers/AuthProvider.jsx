import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic.js";

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {


  const auth = getAuth(app);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();
  // create a user
  const signup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // log out user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // get the current user

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);

      setUser(currentUser);
      if (currentUser) {
        //  get token and store client
        const userInfo = { email: currentUser.email };

        axiosPublic.post("/jwt", userInfo).then((res) => {
          // console.log(res.data)
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        //  remove token
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [auth, axiosPublic]);

  // update user

  const updateUser = (name, avatarImage) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: avatarImage,
    });
  };

  const authInfo = {
    signup,
    loading,
    login,
    logout,
    user,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
