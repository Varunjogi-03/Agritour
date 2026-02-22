import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const footerLinks = [
    { title: "Explore", links: [{ label: "Browse Farms", to: "/farms" }, { label: "Safety Ratings", to: "/farms" }, { label: "Trip Planner", to: "/" }] },
    { title: "Company", links: [{ label: "About Us", to: "/" }, { label: "Our Mission", to: "/" }, { label: "Contact", to: "/" }] },
]

const socials = [
    { icon: "🌐", label: "Website", href: "#" },
    { icon: "🐦", label: "Twitter", href: "#" },
    { icon: "📸", label: "Instagram", href: "#" },
    { icon: "💼", label: "LinkedIn", href: "#" },
]

export default function Footer() {
    return (
        <footer className="relative mt-0 overflow-hidden">

            {/* Nature wave SVG top separator */}
            <div className="w-full leading-none" style={{ marginBottom: -2 }}>
                <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    className="w-full" style={{ display: "block", height: 80 }}>
                    {/* Hills layer 1 */}
                    <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
                        fill="#14532d" opacity="0.6" />
                    {/* Hills layer 2 */}
                    <path d="M0,60 C200,20 400,70 600,50 C800,30 1000,70 1200,50 C1300,40 1380,55 1440,60 L1440,80 L0,80 Z"
                        fill="#15803d" opacity="0.5" />
                    {/* Dark base */}
                    <path d="M0,70 Q360,50 720,70 Q1080,90 1440,70 L1440,80 L0,80 Z"
                        fill="#14532d" />
                </svg>
            </div>

            {/* Main footer body */}
            <div
                style={{ background: "linear-gradient(160deg, #14532d 0%, #166534 40%, #15803d 100%)" }}
                className="text-white"
            >
                {/* Decorative floating leaves */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    {["🍃", "🌿", "🌱", "🍀", "🌾"].map((leaf, i) => (
                        <motion.span
                            key={i}
                            className="absolute text-2xl opacity-10"
                            style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 20}%` }}
                            animate={{ y: [0, -12, 0], rotate: [0, 15, -10, 0] }}
                            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                        >
                            {leaf}
                        </motion.span>
                    ))}
                </div>

                <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-10">
                    <div className="grid md:grid-cols-4 gap-10">

                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl">🌳</span>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-wide">AgriTour</h2>
                                        <p className="text-green-300 text-xs tracking-widest uppercase">Rooted in Rural India</p>
                                    </div>
                                </div>
                                <p className="text-green-200 text-sm leading-relaxed max-w-xs">
                                    India's first intelligent agritourism discovery platform — connecting
                                    travelers with authentic, safe, and sustainable farm experiences.
                                </p>

                                {/* Socials */}
                                <div className="flex gap-3 mt-6">
                                    {socials.map((s, i) => (
                                        <motion.a
                                            key={i}
                                            href={s.href}
                                            aria-label={s.label}
                                            whileHover={{ scale: 1.2, y: -3 }}
                                            className="w-9 h-9 flex items-center justify-center rounded-full bg-green-700 hover:bg-green-500 transition text-base shadow"
                                        >
                                            {s.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Link Columns */}
                        {footerLinks.map((col, ci) => (
                            <motion.div
                                key={ci}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * (ci + 1) }}
                                viewport={{ once: true }}
                            >
                                <h3 className="font-semibold text-white mb-4 tracking-wider uppercase text-xs border-b border-green-600 pb-2">
                                    {col.title}
                                </h3>
                                <ul className="space-y-2">
                                    {col.links.map((link, li) => (
                                        <li key={li}>
                                            <Link
                                                to={link.to}
                                                className="text-green-200 hover:text-white text-sm transition flex items-center gap-2 group"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 group-hover:bg-white transition" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="mt-12 border-t border-green-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-green-300">
                        <p>© 2026 AgriTour India. All rights reserved.</p>
                        <p className="flex items-center gap-1">
                            Made with <span className="text-red-400">❤</span> for rural India&nbsp;🌾
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}