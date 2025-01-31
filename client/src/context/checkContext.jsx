import React, { createContext, useContext, useState } from 'react';

// Create the CheckContext
export const CheckContext = createContext();

// Custom hook for easy access to context
export const useCheck = () => useContext(CheckContext);

// CheckProvider component to wrap your app
export const CheckProvider = ({ children }) => {
  const [checkState, setCheckState] = useState({
    hasImage: false,
    hasExperience: false,
    hasCertification: false,
    selectedTemplate: null, // Add this property for storing the selected template
  });

  const updateCheckState = (newState) => {
    setCheckState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <CheckContext.Provider value={{ checkState, updateCheckState }}>
      {children}
    </CheckContext.Provider>
  );
};
