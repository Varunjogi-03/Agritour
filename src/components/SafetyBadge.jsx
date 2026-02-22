export default function SafetyBadge({ level }) {
    const colors = {
        Safe: "bg-green-600",
        Moderate: "bg-yellow-500",
        Risk: "bg-red-600",
    }

    return (
        <span className={`text-white text-sm px-3 py-1 rounded ${colors[level]}`}>
            {level}
        </span>
    )
}