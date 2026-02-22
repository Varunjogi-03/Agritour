import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Farms", to: "/farms" },
        { label: "Experiences", to: "#" },
        { label: "Community", to: "#" },
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "py-3 bg-white/80 backdrop-blur-lg shadow-lg border-b border-green-100"
                    : "py-6 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* Brand / Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        className="text-3xl"
                    >
                        🌳
                    </motion.div>
                    <div className="flex flex-col">
                        <span className={`font-bold text-2xl tracking-tight leading-none transition-colors duration-300 ${isScrolled ? "text-green-900" : "text-green-900"
                            }`}>
                            AgriTour
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-green-600 leading-none mt-1">
                            India
                        </span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to
                        return (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`relative group text-sm font-bold tracking-wide transition-colors duration-300 ${isActive ? "text-green-700" : "text-gray-600 hover:text-green-700"
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""
                                    }`} />
                            </Link>
                        )
                    })}
                </div>

                {/* CTA / Action Button */}
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all border border-green-600/50"
                    >
                        Sign In
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    )
}
