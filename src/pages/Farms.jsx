import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import FarmCard from "../components/FarmCard"

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
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Explore Farms</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {farms.map(farm => (
                    <FarmCard key={farm.id} farm={farm} />
                ))}
            </div>
        </div>
    )
}