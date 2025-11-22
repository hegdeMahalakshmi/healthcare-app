import React, { createContext, useState, useEffect } from "react";
import { mockGoals, mockProfile } from "../utils/mockData";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || mockGoals
  );

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || mockProfile
  );

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  return (
    <PatientContext.Provider
      value={{ goals, setGoals, profile, setProfile }}
    >
      {children}
    </PatientContext.Provider>
  );
};
