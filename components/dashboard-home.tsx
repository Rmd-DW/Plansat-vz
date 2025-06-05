"use client"

import { useState } from "react"
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
import MapÑuble from "@/components/map-nuble"
import { mockData } from "@/data/mock-data"

export default function DashboardHome() {
  const [activeView, setActiveView] = useState<"frecuencia" | "intensidad">("frecuencia")
  const [selectedYear, setSelectedYear] = useState("Todos los registros")
  const [selectedCommune, setSelectedCommune] = useState("Todas las comunas")
  const [showHistoricalSection, setShowHistoricalSection] = useState(true)
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

  return (
    <div className="min-h-screen bg-[#E5E3EE] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar - Libre para futuros enlaces */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#6B46C1] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-[#6B46C1] text-xl font-bold">PLANSAT</span>
            </div>
            {/* Espacio libre para futuros enlaces de navegación */}
            <div className="flex items-center gap-4">{/* Aquí irán los enlaces de navegación */}</div>
          </div>
        </div>

        {/* Contenedor con título */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#6B46C1]">Mapa de frecuencia de incendios por comuna</h1>
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
              <h3 className="font-semibold text-gray-800">Resumen vista Frecuencia</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Incendios</span>
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

            {/* Leyenda sobrepuesta */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 z-20 max-w-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800 text-sm">Región del Ñuble</h4>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">N° Incendios por Comuna</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#7F1D1D] rounded border"></div>
                    <span className="text-gray-600">200+ incendios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#DC2626] rounded border"></div>
                    <span className="text-gray-600">150 incendios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#F97316] rounded border"></div>
                    <span className="text-gray-600">100 incendios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#FBBF24] rounded border"></div>
                    <span className="text-gray-600">50 incendios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#FEF3C7] rounded border"></div>
                    <span className="text-gray-600">0 incendios</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Escala de intensidad</div>
                <div
                  className="h-3 rounded border"
                  style={{
                    background: "linear-gradient(to right, #FEF3C7, #FBBF24, #F97316, #DC2626, #7F1D1D)",
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Baja</span>
                  <span>Alta</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Período: 1986-2017</p>
                <p className="text-xs text-gray-500">21 comunas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {showHistoricalSection && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#6B46C1]">
                  Evolución y magnitud de incendios <span className="text-orange-500">(todas-las-comunas)</span>
                </h2>
              </div>
              <button onClick={() => setShowHistoricalSection(false)} className="text-gray-400 hover:text-gray-600">
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frecuencia Anual */}
              <div className="bg-gray-50 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Frecuencia Anual</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="h-32 bg-white rounded-lg flex items-end justify-center p-4">
                  <div className="flex items-end gap-1 h-full">
                    <div className="w-3 bg-red-400 h-1/4 rounded-t"></div>
                    <div className="w-3 bg-red-400 h-1/3 rounded-t"></div>
                    <div className="w-3 bg-red-400 h-1/2 rounded-t"></div>
                    <div className="w-3 bg-red-400 h-3/4 rounded-t"></div>
                    <div className="w-3 bg-red-400 h-full rounded-t"></div>
                    <div className="w-3 bg-red-400 h-2/3 rounded-t"></div>
                    <div className="w-3 bg-red-400 h-1/2 rounded-t"></div>
                    <div className="w-3 bg-red-400 h-1/3 rounded-t"></div>
                  </div>
                </div>
              </div>

              {/* Distribución Magnitud */}
              <div className="bg-gray-50 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Distribución Magnitud</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="h-32 bg-white rounded-lg flex items-end justify-center p-4">
                  <div className="flex items-end gap-2">
                    <div className="w-8 bg-orange-400 h-20 rounded-t"></div>
                    <div className="w-8 bg-orange-400 h-16 rounded-t"></div>
                    <div className="w-8 bg-orange-400 h-12 rounded-t"></div>
                    <div className="w-8 bg-orange-400 h-8 rounded-t"></div>
                    <div className="w-8 bg-orange-400 h-6 rounded-t"></div>
                  </div>
                </div>
              </div>

              {/* Área quemada - Line Chart */}
              <div className="bg-gray-50 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Área quemada</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="h-32 bg-white rounded-lg flex items-center justify-center p-4">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <polyline
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      points="10,40 20,35 30,30 40,25 50,20 60,15 70,25 80,10 90,20"
                    />
                  </svg>
                </div>
              </div>

              {/* Área quemada - Map */}
              <div className="bg-gray-50 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Área quemada</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Maximize2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="h-32 bg-white rounded-lg relative overflow-hidden">
                  <div className="absolute inset-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-orange-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showHistoricalSection && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowHistoricalSection(true)}
              className="text-[#6B46C1] hover:text-[#553C9A] transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <ChevronDown className="h-4 w-4" />
              Mostrar evolución y magnitud de incendios
            </button>
          </div>
        )}

        {/* Detailed Analysis Section */}
        {showDetailSection && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#6B46C1]">
                  Análisis detallado Frecuencia <span className="text-orange-500">(todas-las-comunas)</span> por{" "}
                  <span className="text-orange-500">(todos-los-años)</span>
                </h2>
              </div>
              <button onClick={() => setShowDetailSection(false)} className="text-gray-400 hover:text-gray-600">
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Frecuencia de Incendios en Bulnes (1985)</h3>
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

                  {/* Main Map */}
                  <div className="lg:col-span-2">
                    <div className="h-64 bg-gray-200 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-4 bg-gray-300 rounded"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white rounded p-2 text-xs">
                          <div className="flex justify-between mb-1">
                            <span>Baja frecuencia</span>
                            <span>Alta frecuencia</span>
                          </div>
                          <div
                            className="h-2 rounded"
                            style={{
                              background: "linear-gradient(to right, #FEF3C7, #FBBF24, #F97316, #DC2626, #7F1D1D)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Map */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-20 bg-gray-200 rounded relative">
                      <div className="absolute inset-2 bg-gray-300 rounded"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-2 bg-red-500 rounded"></div>
                    </div>
                    <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200">
                      <ChevronRight className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showDetailSection && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowDetailSection(true)}
              className="text-[#6B46C1] hover:text-[#553C9A] transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <ChevronDown className="h-4 w-4" />
              Mostrar análisis detallado
            </button>
          </div>
        )}

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
