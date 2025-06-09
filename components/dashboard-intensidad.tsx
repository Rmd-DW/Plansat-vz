"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus,
  Minus,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Calendar,
  MapPin,
  BarChart3,
} from "lucide-react"
import MapIntensidad from "@/components/map-intensidad"
import { mockData } from "@/data/mock-data"

export default function DashboardIntensidad() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<"frecuencia" | "intensidad">("intensidad")
  const [selectedYear, setSelectedYear] = useState("Todos los registros")
  const [selectedCommune, setSelectedCommune] = useState("Todas las comunas")
  const [showDetailSection, setShowDetailSection] = useState(true)

  const years = ["Todos los registros", "2017", "2007", "1986"]
  const communes = [
    "Todas las comunas",
    "Chillán",
    "Chillán Viejo",
    "San Nicolás",
    "Coelemu",
    "Quirihue",
    "Bulnes",
    "San Carlos",
    "Ñiquén",
    "San Fabián",
    "Coihueco",
    "Pinto",
    "El Carmen",
    "Pemuco",
    "Yungay",
    "San Ignacio",
    "Portezuelo",
    "Ninhue",
    "Treguaco",
    "Quillón",
    "Ránquil",
  ]

  // Convert selected year for map component
  const mapYear = selectedYear === "Todos los registros" ? 0 : Number.parseInt(selectedYear)
  const mapCommune = selectedCommune === "Todas las comunas" ? "Todas" : selectedCommune

  // Navigation handlers
  const handleViewChange = (view: "frecuencia" | "intensidad") => {
    if (view === "frecuencia") {
      router.push("/dashboard-home")
    } else if (view === "intensidad") {
      router.push("/dashboard-intensidad")
    }
  }

  return (
    <div className="min-h-screen bg-[#E5E3EE] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#6B46C1] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-[#6B46C1] text-xl font-bold">PLANSAT</span>
            </div>
          </div>
        </div>

        {/* Title and View Toggle */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#6B46C1]">Mapa de intensidad de incendios por comuna</h1>
            <div className="flex gap-3">
              <button
                onClick={() => handleViewChange("frecuencia")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeView === "frecuencia"
                    ? "bg-[#6B46C1] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-[#6B46C1] text-[#6B46C1]"
                }`}
              >
                Vista Frecuencia
              </button>
              <button
                onClick={() => handleViewChange("intensidad")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeView === "intensidad"
                    ? "bg-[#6B46C1] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Vista Intensidad
              </button>
            </div>
          </div>
        </div>

        {/* Filter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Filter by Year */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#6B46C1]/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-gray-800">Filtrar por Año</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Selecciona uno o todos los registros</p>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all duration-200"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Comuna */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#6B46C1]/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-gray-800">Filtrar por Comuna</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Selecciona una o todas las comunas</p>
            <select
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all duration-200"
            >
              {communes.map((commune) => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#6B46C1]/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-gray-800">Resumen vista Intensidad</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total incendios</span>
                <span className="font-semibold text-gray-800">1,850</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Área total</span>
                <span className="font-semibold text-gray-800">234,458</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Período</span>
                <span className="font-semibold text-gray-800">1986-2017</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Map */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <MapIntensidad data={mockData} year={mapYear} selectedCommune={mapCommune} />

            {/* Map Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <button className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50 transition-all duration-200">
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
              <button className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50 transition-all duration-200">
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#6B46C1]">
                Análisis detallado Intensidad <span className="text-orange-500">(todas-las-comunas)</span> por{" "}
                <span className="text-orange-500">(todas-los-años)</span>
              </h2>
            </div>
            <button
              onClick={() => setShowDetailSection(!showDetailSection)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showDetailSection ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {showDetailSection && (
            <div className="relative">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Mapa detallado de intensidad</h3>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Navigation */}
                  <div className="flex items-center justify-center">
                    <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                      <ChevronLeft className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>

                  {/* Main Detailed Map */}
                  <div className="lg:col-span-2">
                    <div className="h-80 bg-white rounded-lg relative overflow-hidden border">
                      <MapIntensidad data={mockData} year={mapYear} selectedCommune={mapCommune} />

                      {/* Coordinate grid overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full opacity-30">
                          {/* Vertical lines */}
                          {Array.from({ length: 10 }, (_, i) => (
                            <line
                              key={`v-${i}`}
                              x1={`${(i + 1) * 10}%`}
                              y1="0%"
                              x2={`${(i + 1) * 10}%`}
                              y2="100%"
                              stroke="#666"
                              strokeWidth="0.5"
                            />
                          ))}
                          {/* Horizontal lines */}
                          {Array.from({ length: 8 }, (_, i) => (
                            <line
                              key={`h-${i}`}
                              x1="0%"
                              y1={`${(i + 1) * 12.5}%`}
                              x2="100%"
                              y2={`${(i + 1) * 12.5}%`}
                              stroke="#666"
                              strokeWidth="0.5"
                            />
                          ))}
                        </svg>
                      </div>

                      {/* Coordinate labels */}
                      <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                        -37.2°
                      </div>
                      <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                        -36.0°
                      </div>
                      <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                        -73.0°
                      </div>
                      <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                        -71.0°
                      </div>
                    </div>
                  </div>

                  {/* Legend and Navigation */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Legend */}
                    <div className="bg-white rounded-lg p-4 shadow-sm border w-full">
                      <h4 className="font-semibold text-sm mb-3">Leyenda</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-3 bg-[#7F1D1D] rounded"></div>
                          <span>Intensidad 5 (Extrema)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-3 bg-[#DC2626] rounded"></div>
                          <span>Intensidad 4 (Muy Alta)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-3 bg-[#F97316] rounded"></div>
                          <span>Intensidad 3 (Alta)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-3 bg-[#FBBF24] rounded"></div>
                          <span>Intensidad 2 (Media)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-3 bg-[#FEF3C7] rounded"></div>
                          <span>Intensidad 1 (Baja)</span>
                        </div>
                      </div>
                    </div>

                    <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                      <ChevronRight className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#6B46C1] font-bold">2025 Plansat</span>
            <div className="w-6 h-6 bg-[#6B46C1] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
