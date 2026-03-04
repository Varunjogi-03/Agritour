import { useState } from "react"
import { supabase } from "../services/supabaseClient"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import LiquidEther from '../components/LiquidEther'

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setMessage("Check your email for the confirmation link!")
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                navigate("/")
            }
        } catch (error) {
            setError(error.description || error.message)
        } finally {
            setLoading(false)
        }
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
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50">
                    <div className="text-center mb-10">
                        <motion.div
                            key={isSignUp ? "signup-title" : "signin-title"}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-4xl mb-2"
                        >
                            {isSignUp ? "🌾" : "🚜"}
                        </motion.div>
                        <h2 className="text-3xl font-extrabold text-green-900 mb-2">
                            {isSignUp ? "Create Account" : "Welcome Back"}
                        </h2>
                        <p className="text-green-700/70 font-medium">
                            {isSignUp ? "Start your agritourism journey" : "Sign in to continue your adventure"}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-green-800 mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-green-900 placeholder:text-green-300 shadow-sm"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-green-800 mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-green-900 placeholder:text-green-300 shadow-sm"
                                placeholder="••••••••"
                                required
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
                            disabled={loading}
                            className="w-full py-4 bg-green-700 hover:bg-green-800 text-white rounded-2xl font-bold shadow-lg shadow-green-700/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                isSignUp ? "Create Account" : "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium">
                        <span className="text-green-700/60">
                            {isSignUp ? "Already have an account?" : "New to AgriTour?"}
                        </span>{" "}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-green-700 hover:text-green-900 font-bold underline underline-offset-4 decoration-2 decoration-green-300 hover:decoration-green-500 transition-all"
                        >
                            {isSignUp ? "Sign In Instead" : "Create an Account"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
