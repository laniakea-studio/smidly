import React, { useContext, useEffect, useState } from "react";
import { auth, fireStore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, optionalData) {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setDoc(doc(fireStore, "users", res.user.uid), optionalData);
      console.log("Document written with ID: ", res.user.uid);
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateProfileEmail(email) {
    return updateEmail(auth.currentUser, email);
  }
  function updateProfilePassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  const getUser = async (userId) => {
    const docRef = doc(fireStore, "users", userId);
    const docSnap = await getDoc(docRef);

    try {
      return docSnap.data();
    } catch {
      console.log("Failed to load user");
    }
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribed;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateProfileEmail,
    updateProfilePassword,
    getUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
