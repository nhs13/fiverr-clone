import './App.css'
import ThemeButton from './components/ThemeButton'
import Card from './components/Card'
import useTheme, { ThemeProvider } from './context/theme'
import { useEffect, useState } from 'react'

function App() {
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = ()=>{
    setThemeMode("light");
  }

  const darkTheme = ()=>{
    setThemeMode("dark");
  }

  // actual change in theme
  useEffect(()=>{
    const docx = document.querySelector('html').classList;
    docx.remove("light", "dark")
    docx.add(themeMode)
  }, [themeMode])

  
  return (   
      // so basically, themeprovider is just receiving props which 
      // made in the context file -> theme.js
      <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
        <div className="flex flex-wrap min-h-screen items-center">
            <div className="w-full">
                <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                    <ThemeButton/>
                </div>

                <div className="w-full max-w-sm mx-auto">
                    <Card/>
                </div>
            </div>
        </div>
      </ThemeProvider>
  )
}

export default App
