import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/mods/theme-provider"
import {Toaster} from "sonner"
import { Home } from "./pages/home"
import { Admin } from "./pages/admin"
import { Navbar } from "./components/mods/navbar"
const App = () => {

  
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <Toaster position="top-center" closeButton duration={3000} theme="system" />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/security" element={<Admin />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App