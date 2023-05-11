import { createContext, useState } from 'react';

export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if(darkMode === true){
        document.body.style.background = '#EDECE9';
    }else{
        document.body.style.background = '#1c1b1b';
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};