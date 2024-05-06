# Prop drilling cure -> Context API

Context is a variable provider, whenever we wrap a div
or fragment with the context we made (ex. UserContext)
this would get access to the div/fragment to global states.
```import { createContext, useContext } from "react";```
the children prop typically refers to the elements or components that are wrapped by the Provider

Create context (w/ default vals and fns) and export it,
```
export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: ()=>{},
    lightTheme: ()=>{},
})
```

get the provider and put it in a const :-
```const ThemeProvider = ThemeContext.Provider```
this will be used to wrap children

We need to import useContext as well as ThemeContext, so 
we create a "macro" type custom hook, importing and using which will ease our working (2 birds one stone)
```
export default function useTheme(){
    return useContext(ThemeContext)
}
```
