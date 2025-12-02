import { createContext, useContext, useState } from "react";

const DarkModeContext=createContext()
export  function DarkModeContextProvider({children}){
    const [isDarkMode,setIsDarkMode]=useState(false);
    function setDarkMode(){
        setIsDarkMode((mode)=>!mode)
    }
return <DarkModeContext.Provider value={{isDarkMode,setDarkMode}}>
    {children}
</DarkModeContext.Provider>
}
export function useDarkMode(){
    return useContext(DarkModeContext)
}