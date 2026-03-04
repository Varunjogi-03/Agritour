import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Farms from "./pages/Farms"
import FarmDetails from "./pages/FarmDetails"

import Auth from "./pages/Auth"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/farms/:id" element={<FarmDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App