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
  FileText,
} from "lucide-react"
import MapÑuble from "@/components/map-nuble"
import { mockData } from "@/data/mock-data"
import Image from "next/image"

export default function DashboardIntensidad() {
  const router = useRouter()
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
        {/* Header with Logo */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#6B46C1] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-[#6B46C1] text-xl font-bold">PLANSAT</span>
            </div>
          </div>
        </div>

        {/* Título y botones de vista */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#6B46C1]">Mapa de Intensidad de incendios por comuna</h1>
            <div className="flex gap-3">
              <button
                onClick={() => handleViewChange("frecuencia")}
                className="px-6 py-2 rounded-xl font-medium transition-all duration-300 bg-white border border-[#6B46C1] text-[#6B46C1] hover:bg-[#6B46C1]/5"
              >
                Vista Frecuencia
              </button>
              <button
                onClick={() => handleViewChange("intensidad")}
                className="px-6 py-2 rounded-xl font-medium transition-all duration-300 bg-[#6B46C1] text-white shadow-md"
              >
                Vista Intensidad
              </button>
            </div>
          </div>
        </div>

        {/* Filter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Filter by Year */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#6B46C1]/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-gray-800">Filtrar por Año</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Selecciona uno o todos los registros</p>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 bg-white focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all duration-200"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Comuna */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#6B46C1]/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-gray-800">Filtrar por Comuna</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Selecciona una o todas las comunas</p>
            <select
              value={selectedCommune}
              onChange={(e) => setSelectedCommune(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 bg-white focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all duration-200"
            >
              {communes.map((commune) => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#6B46C1]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-gray-800">Resumen vista Intensidad</h3>
            </div>
            <div className="space-y-2">
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
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <MapÑuble data={mockData} year={mapYear} selectedCommune={mapCommune} />

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
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#6B46C1]">
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
            <div className="mt-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="relative h-[350px] rounded-lg overflow-hidden">
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <button className="bg-white rounded-md p-1 shadow-sm hover:bg-gray-50">
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="bg-white rounded-md p-1 shadow-sm hover:bg-gray-50">
                      <Maximize2 className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="bg-white rounded-md p-1 shadow-sm hover:bg-gray-50">
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
                    {/* Navigation */}
                    <div className="lg:col-span-1 flex items-center justify-center">
                      <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Main Map */}
                    <div className="lg:col-span-10 h-full">
                      <div className="h-full w-full bg-white rounded-lg relative overflow-hidden">
                        {/* Placeholder for the detailed map */}
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <div className="w-full h-full relative">
                            <Image
                              src="/placeholder.svg?height=350&width=800"
                              alt="Mapa detallado de intensidad de incendios"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-md p-2 shadow-sm border border-gray-100 z-10">
                          <h4 className="text-xs font-semibold text-gray-800 mb-1">Leyenda</h4>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-[#7F1D1D] rounded-sm"></div>
                              <span className="text-gray-600">Intensidad 4 (Alta)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-[#DC2626] rounded-sm"></div>
                              <span className="text-gray-600">Intensidad 3 (Media)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-[#F97316] rounded-sm"></div>
                              <span className="text-gray-600">Intensidad 2 (Baja)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-[#FBBF24] rounded-sm"></div>
                              <span className="text-gray-600">Intensidad 1 (Muy baja)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-1 flex items-center justify-center">
                      <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
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
