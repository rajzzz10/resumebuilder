import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the CheckContext
export const CheckContext = createContext();

// Custom hook for easy access to context
export const useCheck = () => useContext(CheckContext);

// CheckProvider component to wrap your app
export const CheckProvider = ({ children }) => {
  // Load initial state from local storage or use defaults
  const [checkState, setCheckState] = useState(() => {
    const savedState = localStorage.getItem('checkState');
    return savedState ? JSON.parse(savedState) : {
      hasImage: false,
      hasExperience: false,
      hasCertification: false,
      selectedTemplate: null,
    };
  });

  // Update state function
  const updateCheckState = (newState) => {
    setCheckState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      localStorage.setItem('checkState', JSON.stringify(updatedState)); // Save to local storage
      console.log("Updated CheckState:", updatedState); // Debugging log
      return updatedState;
    });
  };

  // Function to reset the state (when user starts over)
  const resetCheckState = () => {
    const initialState = {
      hasImage: false,
      hasExperience: false,
      hasCertification: false,
      selectedTemplate: null,
    };
    setCheckState(initialState);
    localStorage.removeItem('checkState');
    console.log("CheckState Reset!");
  };

  return (
    <CheckContext.Provider value={{ checkState, updateCheckState, resetCheckState }}>
      {children}
    </CheckContext.Provider>
  );
};
