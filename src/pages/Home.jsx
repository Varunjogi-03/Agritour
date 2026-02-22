import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import LiquidEther from '../components/LiquidEther'

// Tree node data
const treeData = {
    label: "AgriTour Platform",
    icon: "🌳",
    color: "#166534",
    children: [
        {
            label: "Discover Farms",
            icon: "🏡",
            color: "#15803d",
            desc: "Browse verified agri-tourism farms across India with rich details, photos & reviews.",
            children: [
                { label: "Smart Filters", icon: "🔍", color: "#16a34a", desc: "Filter by crop, season, distance & amenities." },
                { label: "Farm Profiles", icon: "📋", color: "#16a34a", desc: "Detailed profiles with host info & activities." },
            ]
        },
        {
            label: "Safety Intelligence",
            icon: "🛡️",
            color: "#15803d",
            desc: "AI-powered safety scoring and real-time alerts for every farm listing.",
            children: [
                { label: "Safety Badges", icon: "✅", color: "#16a34a", desc: "Verified safety ratings & certifications." },
                { label: "Risk Alerts", icon: "⚠️", color: "#ca8a04", desc: "Weather, health & seasonal risk advisories." },
            ]
        },
        {
            label: "Travel Smart",
            icon: "🗺️",
            color: "#15803d",
            desc: "Plan your perfect farm stay with itinerary builder and local experience guides.",
            children: [
                { label: "Trip Planner", icon: "📅", color: "#16a34a", desc: "Build multi-day agri itineraries effortlessly." },
                { label: "Local Experiences", icon: "🌾", color: "#16a34a", desc: "Harvest tours, cooking classes, nature walks." },
            ]
        },
    ]
}

function TreeBranch({ node, depth = 0, index = 0, total = 1 }) {
    const isRoot = depth === 0
    const isSecond = depth === 1
    const delay = depth * 0.2 + index * 0.15

    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            {/* Node card */}
            <motion.div
                whileHover={{ scale: 1.06, boxShadow: "0 12px 40px rgba(21,128,61,0.25)" }}
                className={`relative flex flex-col items-center text-center cursor-default select-none
                    ${isRoot
                        ? "bg-green-900 text-white px-8 py-5 rounded-2xl shadow-2xl w-64"
                        : isSecond
                            ? "bg-white border-2 border-green-300 text-green-900 px-5 py-4 rounded-xl shadow-lg w-52"
                            : "bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow w-44"
                    }`}
                style={{ borderColor: isRoot ? node.color : undefined }}
            >
                <span className={`${isRoot ? "text-4xl" : isSecond ? "text-3xl" : "text-2xl"} mb-1`}>{node.icon}</span>
                <h3 className={`font-bold ${isRoot ? "text-xl" : isSecond ? "text-base" : "text-sm"} leading-tight`}>
                    {node.label}
                </h3>
                {node.desc && (
                    <p className={`mt-1 text-xs leading-snug ${isRoot ? "text-green-200" : "text-gray-500"}`}>
                        {node.desc}
                    </p>
                )}
                {/* Decorative leaf for root */}
                {isRoot && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow" />
                )}
            </motion.div>

            {/* Children */}
            {node.children && node.children.length > 0 && (
                <div className="flex flex-col items-center w-full">
                    {/* Vertical stem */}
                    <motion.div
                        className="w-0.5 bg-gradient-to-b from-green-500 to-green-300"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 0.4, delay: delay + 0.2 }}
                        viewport={{ once: true }}
                        style={{ height: 32, transformOrigin: "top" }}
                    />

                    {/* Horizontal bar connecting children */}
                    {node.children.length > 1 && (
                        <motion.div
                            className="flex items-start justify-center relative"
                            style={{ width: "100%" }}
                        >
                            {/* Horizontal connector line */}
                            <motion.div
                                className="absolute top-0 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                                style={{ height: 2, width: `${Math.min(node.children.length * 50, 90)}%`, left: "50%", transform: "translateX(-50%)" }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.4, delay: delay + 0.4 }}
                                viewport={{ once: true }}
                            />

                            {/* Children nodes */}
                            <div className={`flex gap-6 pt-8 flex-wrap justify-center`}>
                                {node.children.map((child, i) => (
                                    <div key={i} className="flex flex-col items-center relative">
                                        {/* Drop line from horizontal bar to child */}
                                        <motion.div
                                            className="w-0.5 bg-green-300"
                                            initial={{ scaleY: 0 }}
                                            whileInView={{ scaleY: 1 }}
                                            transition={{ duration: 0.3, delay: delay + 0.5 + i * 0.1 }}
                                            viewport={{ once: true }}
                                            style={{ height: 24, transformOrigin: "top" }}
                                        />
                                        <TreeBranch node={child} depth={depth + 1} index={i} total={node.children.length} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Single child — just one vertical line */}
                    {node.children.length === 1 && (
                        <TreeBranch node={node.children[0]} depth={depth + 1} index={0} total={1} />
                    )}
                </div>
            )}
        </motion.div>
    )
}

export default function Home() {
    return (
        <div>

            {/* ── Hero Section with LiquidEther background ── */}
            <section className="relative min-h-screen flex items-center overflow-hidden">

                {/* LiquidEther fills the full hero as a background */}
                <div className="absolute inset-0 z-0">
                    <LiquidEther
                        colors={['#0fc713ff', '#0d3f03', '#0d3f03']}
                        mouseForce={28}
                        cursorSize={100}
                        isViscous
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>

                {/* Hero content sits above the canvas */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center w-full py-20">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl font-bold text-green-900 leading-tight drop-shadow-lg">
                            Discover Authentic <br /> Agritourism in India
                        </h1>
                        <p className="mt-6 text-green-900 text-lg drop-shadow">
                            Connecting travelers with safe, sustainable, and immersive farm experiences —
                            powered by technology and research.
                        </p>

                        <Link
                            to="/farms"
                            className="inline-block mt-8 bg-green-900 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-50 hover:text-green-900 transition shadow-lg"
                        >
                            Explore Farms →
                        </Link>
                    </motion.div>

                    <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        src="https://plus.unsplash.com/premium_photo-1674019234994-eceabbdd091d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Farm"
                        className="rounded-2xl shadow-2xl"
                    />
                </div>
            </section>

            {/* ── What Are We Building — Tree Section ── */}
            <section
                className="relative py-28 overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 40%, #bbf7d0 100%)"
                }}
            >
                {/* Decorative background blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-300 rounded-full opacity-20 blur-3xl pointer-events-none" />

                {/* Subtle soil texture band at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
                    style={{
                        background: "linear-gradient(to top, rgba(92,63,19,0.08), transparent)"
                    }} />

                <div className="relative max-w-6xl mx-auto px-6">
                    {/* Section header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-sm font-semibold tracking-widest text-green-600 uppercase mb-3 px-4 py-1 bg-green-100 rounded-full border border-green-200">
                            🌱 Our Platform
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-4 leading-tight">
                            What Are We Building?
                        </h2>
                        <p className="mt-5 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            India's first agritourism discovery platform — blending technology,
                            safety intelligence & authentic rural experiences into one ecosystem.
                        </p>
                    </motion.div>

                    {/* Interactive Tree */}
                    <div className="flex flex-col items-center">
                        {/* Root node */}
                        <TreeBranch node={treeData} depth={0} index={0} total={1} />

                        {/* Ground / roots bar */}
                        <motion.div
                            className="mt-8 w-2 rounded-full"
                            style={{ height: 48, background: "linear-gradient(to bottom, #4ade80, #92400e)" }}
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            viewport={{ once: true }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 1.4 }}
                            viewport={{ once: true }}
                            className="w-40 h-3 rounded-full"
                            style={{ background: "linear-gradient(90deg, transparent, #92400e, transparent)" }}
                        />
                        <p className="mt-2 text-xs text-green-700 font-medium tracking-wide opacity-70">Rooted in Rural India 🌍</p>
                    </div>
                </div>
            </section>

        </div>
    )
}