import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: ()=>{},
    lightTheme: ()=>{},
})

export const ThemeProvider = ThemeContext.Provider

// reducing double importing by creating a macro type custom hook
export default function useTheme(){
    return useContext(ThemeContext)
}