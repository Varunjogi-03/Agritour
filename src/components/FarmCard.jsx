import { Link } from "react-router-dom"
import SafetyBadge from "./SafetyBadge"
import { motion } from "framer-motion"

export default function FarmCard({ farm }) {
    const badgeColor =
        farm.safety === "Safe"
            ? "bg-green-600"
            : farm.safety === "Moderate"
                ? "bg-yellow-500"
                : "bg-red-600"

    return (
        <Link to={`/farms/${farm.id}`}>
            <motion.div whileHover={{ scale: 1.03 }}>
                <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                    <img src={farm.image} alt={farm.name} className="h-48 w-full object-cover" />
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg">{farm.name}</h2>
                            <SafetyBadge level={farm.safety} />
                        </div>
                        <p className="text-gray-500 text-sm mt-2">
                            {farm.location}, {farm.state}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}