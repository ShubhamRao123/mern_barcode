import React, { createContext, useState, useContext } from "react";

// Create context
const ProgressContext = createContext();

// Provider component to wrap your application
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    sender: false,
    receiver: false,
    shipment: false,
    tracking: false,
  });

  const [formData, setFormData] = useState({
    sender: {},
    receiver: {},
    shipment: {},
  });

  const updateProgress = (step) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [step]: true,
    }));
  };

  const updateFormData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  return (
    <ProgressContext.Provider
      value={{ progress, updateProgress, formData, updateFormData }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook for accessing the context
export const useProgress = () => useContext(ProgressContext);
