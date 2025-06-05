"use client"

interface MapLegendProps {
  className?: string
}

export default function MapLegend({ className = "" }: MapLegendProps) {
  const legendItems = [
    { count: "200+", color: "#C9181D", label: "200+ incendios" },
    { count: "150", color: "#E4572E", label: "150 incendios" },
    { count: "100", color: "#FD914C", label: "100 incendios" },
    { count: "50", color: "#FDCB6E", label: "50 incendios" },
    { count: "0", color: "#FFF4BA", label: "0 incendios" },
  ]

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-4 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">N° Incendios</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded border border-gray-200" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Gradient bar */}
      <div className="mt-4">
        <div className="text-xs text-gray-500 mb-2">Escala continua</div>
        <div
          className="h-3 rounded border border-gray-200"
          style={{
            background: "linear-gradient(to top, #FFF4BA 0%, #FDCB6E 25%, #FD914C 50%, #E4572E 75%, #C9181D 100%)",
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>200+</span>
        </div>
      </div>
    </div>
  )
}
