import { useState, useEffect } from "react"
import { supabase } from "../services/supabaseClient"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import LiquidEther from '../components/LiquidEther'

export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                navigate("/auth")
                return
            }
            setUser(session.user)
            setFullName(session.user.user_metadata?.full_name || "")
            setPhone(session.user.user_metadata?.phone || "")
            setLoading(false)
        }
        getProfile()
    }, [navigate])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdating(true)
        setError(null)
        setMessage(null)

        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName, phone: phone }
            })
            if (error) throw error
            setMessage("Profile updated successfully!")
        } catch (error) {
            setError(error.message)
        } finally {
            setUpdating(false)
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        navigate("/")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f0f9f0]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f0f9f0] flex items-center justify-center px-6 py-24 relative overflow-hidden">
            {/* Background elements */}
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-3xl font-extrabold text-green-900 mb-2">User Profile</h2>
                            <p className="text-green-700/70 font-medium">Manage your account details</p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full font-bold transition-all text-sm border border-red-100"
                        >
                            Sign Out
                        </button>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-green-800 mb-2 ml-1">Email (ReadOnly)</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-green-100 text-green-900 opacity-60 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-green-800 mb-2 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-green-900 placeholder:text-green-300 shadow-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-green-800 mb-2 ml-1">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-green-900 placeholder:text-green-300 shadow-sm"
                                placeholder="+91 00000 00000"
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-green-50 text-green-700 text-sm p-4 rounded-xl border border-green-100 font-medium"
                                >
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full py-4 bg-green-700 hover:bg-green-800 text-white rounded-2xl font-bold shadow-lg shadow-green-700/20 transition-all active:scale-[0.98] disabled:opacity-50 text-lg"
                        >
                            {updating ? "Updating..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
