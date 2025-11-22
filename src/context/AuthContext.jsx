// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Signup: email + password + role (patient/provider)
  const signup = async (email, password, role) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    // Store role in Firestore
    await setDoc(doc(db, "users", uid), {
      email,
      role,
      createdAt: new Date(),
    });

    return userCredential;
  };

  // 🔥 Login with Email/Password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔥 Google Login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    const uid = result.user.uid;

    // Check if Firestore doc exists
    const snap = await getDoc(doc(db, "users", uid));

    // If new Google user → add default role: patient
    if (!snap.exists()) {
      await setDoc(doc(db, "users", uid), {
        email: result.user.email,
        role: "patient", // or ask user later
        createdAt: new Date(),
      });
    }

    return result;
  };

  // 🔥 Logout
  const logout = () => signOut(auth);

  // 🔥 Load user + role from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const uid = user.uid;
      const snap = await getDoc(doc(db, "users", uid));

      if (snap.exists()) {
        setCurrentUser({
          uid,
          email: user.email,
          role: snap.data().role, // ⬅️ patient/provider
        });
      } else {
        setCurrentUser({
          uid,
          email: user.email,
          role: null,
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}