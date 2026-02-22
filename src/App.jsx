import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Farms from "./pages/Farms"
import FarmDetails from "./pages/FarmDetails"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/farms/:id" element={<FarmDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App