import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import FarmCard from "../components/FarmCard"
import LiquidEther from "../components/LiquidEther"
import { motion } from "framer-motion"

export default function Farms() {
    const [farms, setFarms] = useState([])

    useEffect(() => {
        const fetchFarms = async () => {
            const { data, error } = await supabase.from("farms").select("*")
            if (!error) setFarms(data)
        }
        fetchFarms()
    }, [])

    return (
        <div className="min-h-screen bg-[#f0f9f0] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={['#10b981', '#064e3b', '#065f46']}
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

            <div className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl font-extrabold text-green-900 mb-4 tracking-tight">
                        Explore <span className="text-green-600">Farms</span>
                    </h1>
                    <p className="text-green-800/70 text-lg font-medium max-w-2xl mx-auto">
                        Discover authentic agritourism experiences across India. From organic orchards to traditional dairy farms.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {farms.map((farm, index) => (
                        <motion.div
                            key={farm.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <FarmCard farm={farm} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}