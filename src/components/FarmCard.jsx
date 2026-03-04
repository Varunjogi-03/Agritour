import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function FarmCard({ farm }) {
    return (
        <Link to={`/farms/${farm.id}`}>
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group h-full"
            >
                <div className="h-full bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-xl border border-white/50 group-hover:shadow-2xl group-hover:shadow-green-900/10 transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={farm.image}
                            alt={farm.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-6 right-6">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md ${farm.safety === "Safe" ? "bg-green-600/80" :
                                    farm.safety === "Moderate" ? "bg-yellow-500/80" : "bg-red-600/80"
                                }`}>
                                {farm.safety}
                            </span>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="font-extrabold text-2xl text-green-900 leading-tight group-hover:text-green-700 transition-colors">
                                {farm.name}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2 text-green-800/60 font-semibold mb-6">
                            <span className="text-xl">📍</span>
                            <span className="text-sm">
                                {farm.location}, {farm.state}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-green-100">
                            <span className="text-sm font-bold text-green-700 uppercase tracking-widest">
                                Discover More
                            </span>
                            <motion.span
                                className="text-2xl"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}