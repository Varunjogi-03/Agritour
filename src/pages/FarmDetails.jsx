import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

export default function FarmDetails() {
    const { id } = useParams()
    const [farm, setFarm] = useState(null)

    useEffect(() => {
        const fetchFarm = async () => {
            const { data } = await supabase
                .from("farms")
                .select("*")
                .eq("id", id)
                .single()
            setFarm(data)
        }
        fetchFarm()
    }, [id])

    if (!farm) return <p className="p-8">Loading...</p>

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <img src={farm.image} className="w-full h-80 object-cover rounded" />
            <h1 className="text-4xl font-bold mt-6">{farm.name}</h1>
            <p className="text-gray-500">{farm.location}, {farm.state}</p>
            <p className="mt-6">{farm.description}</p>
        </div>
    )
}