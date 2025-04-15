// VisitCounter.js
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Typography } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyA4yYvO8LUMrHUIZUNYLncvPwmHhN3d6",
  authDomain: "visits-counter-1aec8.firebaseapp.com",
  projectId: "visits-counter-1aec8",
  storageBucket: "visits-counter-1aec8.firebasestorage.app",
  messagingSenderId: "115706537971",
  appId: "1:115706537971:web:9d9278d7d042171b7f9486",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const VisitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const visitToday = localStorage.getItem("visited_today");

    const updateCount = async () => {
      const counterRef = doc(db, "visits", "counter");
      const snapshot = await getDoc(counterRef);

      if (snapshot.exists()) {
        await updateDoc(counterRef, { count: snapshot.data().count + 1 });
        setCount(snapshot.data().count + 1);
      } else {
        await setDoc(counterRef, { count: 1 });
        setCount(1);
      }

      // احفظ في localStorage إن المستخدم زار النهارده
      localStorage.setItem("visited_today", new Date().toDateString());
    };

    const fetchCount = async () => {
      const counterRef = doc(db, "visits", "counter");
      const snapshot = await getDoc(counterRef);
      if (snapshot.exists()) {
        setCount(snapshot.data().count);
      }
    };

    // لو المستخدم ما زاروش النهارده، نزيد العداد
    if (visitToday !== new Date().toDateString()) {
      updateCount();
    } else {
      fetchCount();
    }
  }, []);

  return (
    <>
      {/* <p>👀 عدد الزيارات: {count}</p>
      <p>نسألكم الدعاء لأبي (الأستاذ: علم محمد) بالرحمة والمغفرة</p> */}
      <Typography variant="h6" style={{ marginTop: "10px" }}>
        👀 عدد الزيارات: {count}
      </Typography>

      <Typography variant="h6" style={{ marginTop: "10px" }}>
        نسألكم الدعاء لأبي (الأستاذ: علم محمد) بالرحمة والمغفرة
      </Typography>
    </>
  );
};

export default VisitCounter;

/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4yYvO8LUMrHUIZUNYLncvPwmHhN3d6-Y",
  authDomain: "visits-counter-1aec8.firebaseapp.com",
  projectId: "visits-counter-1aec8",
  storageBucket: "visits-counter-1aec8.firebasestorage.app",
  messagingSenderId: "115706537971",
  appId: "1:115706537971:web:9d9278d7d042171b7f9486",
  measurementId: "G-MC6B4XLSCF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */
