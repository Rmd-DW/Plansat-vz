"use client"

import { useState } from "react"
import {
  Plus,
  Minus,
  X,
  ChevronUp,
  ChevronDown,
  Calendar,
  MapPin,
  BarChart3,
  TrendingUp,
  Activity,
  Flame,
} from "lucide-react"
import MapÑuble from "@/components/map-nuble"
import { mockData } from "@/data/mock-data"

export default function DashboardVistaFrecuencia() {
  const [selectedYear, setSelectedYear] = useState("Todos los registros")
  const [selectedCommune, setSelectedCommune] = useState("Todas las comunas")
  const [showAnalysisSection, setShowAnalysisSection] = useState(true)
  const [showTrendsSection, setShowTrendsSection] = useState(true)

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

  // Calculate frequency statistics
  const calculateFrequencyStats = () => {
    const filteredData = mockData.filter((item) => {
      if (mapYear !== 0 && item.year !== mapYear) return false
      if (mapCommune !== "Todas" && item.commune !== mapCommune) return false
      return true
    })

    const totalIncendios = filteredData.length
    const comunasAfectadas = new Set(filteredData.map((item) => item.commune)).size
    const añosRegistrados = new Set(filteredData.map((item) => item.year)).size
    const frecuenciaPromedio = totalIncendios / (añosRegistrados || 1)

    return {
      totalIncendios,
      comunasAfectadas,
      añosRegistrados,
      frecuenciaPromedio: frecuenciaPromedio.toFixed(1),
    }
  }

  const stats = calculateFrequencyStats()

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
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Vista Frecuencia</span>
              <div className="w-2 h-2 bg-[#6B46C1] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Title Container */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-[#6B46C1]" />
            <h1 className="text-2xl font-bold text-[#6B46C1]">Análisis de Frecuencia de Incendios</h1>
          </div>
          <p className="text-gray-600">
            Visualización y análisis de la frecuencia de incendios forestales por comuna en la Región del Ñuble
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Incendios</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalIncendios}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Comunas Afectadas</p>
                <p className="text-2xl font-bold text-gray-800">{stats.comunasAfectadas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Años Registrados</p>
                <p className="text-2xl font-bold text-gray-800">{stats.añosRegistrados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Frecuencia Promedio</p>
                <p className="text-2xl font-bold text-gray-800">{stats.frecuenciaPromedio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Filter by Year */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#6B46C1]/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h3 className="font-semibold text-gray-800">Período de Análisis</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Selecciona el período temporal para el análisis de frecuencia</p>
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
              <h3 className="font-semibold text-gray-800">Área Geográfica</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Selecciona la comuna específica o todas las comunas</p>
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
        </div>

        {/* Main Map */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-[#6B46C1]" />
            <h2 className="text-xl font-bold text-[#6B46C1]">Mapa de Frecuencia de Incendios</h2>
          </div>
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

            {/* Enhanced Legend */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 z-20 max-w-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800 text-sm">Frecuencia de Incendios</h4>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">Incendios por Comuna</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#7F1D1D] rounded border"></div>
                    <span className="text-gray-600">Muy Alta (200+)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#DC2626] rounded border"></div>
                    <span className="text-gray-600">Alta (150-199)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#F97316] rounded border"></div>
                    <span className="text-gray-600">Media (100-149)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#FBBF24] rounded border"></div>
                    <span className="text-gray-600">Baja (50-99)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-[#FEF3C7] rounded border"></div>
                    <span className="text-gray-600">Muy Baja (0-49)</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">Escala de frecuencia</div>
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
                <p className="text-xs text-gray-500">Período: {selectedYear}</p>
                <p className="text-xs text-gray-500">Área: {selectedCommune}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequency Analysis Section */}
        {showAnalysisSection && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#6B46C1]">Análisis de Frecuencia por Comuna</h2>
                <p className="text-gray-600">Distribución y patrones de frecuencia de incendios</p>
              </div>
              <button onClick={() => setShowAnalysisSection(false)} className="text-gray-400 hover:text-gray-600">
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frequency Distribution Chart */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Distribución de Frecuencia</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="h-32 bg-white rounded-lg flex items-end justify-center p-4">
                  <div className="flex items-end gap-1 h-full">
                    <div className="w-4 bg-[#7F1D1D] h-full rounded-t"></div>
                    <div className="w-4 bg-[#DC2626] h-3/4 rounded-t"></div>
                    <div className="w-4 bg-[#F97316] h-1/2 rounded-t"></div>
                    <div className="w-4 bg-[#FBBF24] h-1/3 rounded-t"></div>
                    <div className="w-4 bg-[#FEF3C7] h-1/4 rounded-t"></div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">Comunas por nivel de frecuencia</div>
              </div>

              {/* Temporal Frequency */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Frecuencia Temporal</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="h-32 bg-white rounded-lg flex items-center justify-center p-4">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <polyline fill="none" stroke="#6B46C1" strokeWidth="3" points="10,40 30,25 50,30 70,15 90,20" />
                    <circle cx="10" cy="40" r="2" fill="#6B46C1" />
                    <circle cx="30" cy="25" r="2" fill="#6B46C1" />
                    <circle cx="50" cy="30" r="2" fill="#6B46C1" />
                    <circle cx="70" cy="15" r="2" fill="#6B46C1" />
                    <circle cx="90" cy="20" r="2" fill="#6B46C1" />
                  </svg>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">Evolución temporal de frecuencia</div>
              </div>

              {/* Top Affected Communes */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Comunas Más Afectadas</h3>
                  <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">San Nicolás</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-full h-full bg-[#7F1D1D] rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600">245</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Coelemu</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-full bg-[#DC2626] rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600">189</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Quirihue</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/5 h-full bg-[#F97316] rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showAnalysisSection && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAnalysisSection(true)}
              className="text-[#6B46C1] hover:text-[#553C9A] transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <ChevronDown className="h-4 w-4" />
              Mostrar análisis de frecuencia por comuna
            </button>
          </div>
        )}

        {/* Trends Section */}
        {showTrendsSection && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#6B46C1]">Tendencias y Patrones de Frecuencia</h2>
                <p className="text-gray-600">Análisis de patrones temporales y estacionales</p>
              </div>
              <button onClick={() => setShowTrendsSection(false)} className="text-gray-400 hover:text-gray-600">
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seasonal Pattern */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Patrón Estacional</h3>
                <div className="h-40 bg-white rounded-lg flex items-end justify-center p-4">
                  <div className="flex items-end gap-2 h-full w-full">
                    <div className="flex-1 bg-blue-300 h-1/4 rounded-t"></div>
                    <div className="flex-1 bg-green-400 h-1/3 rounded-t"></div>
                    <div className="flex-1 bg-yellow-400 h-2/3 rounded-t"></div>
                    <div className="flex-1 bg-red-500 h-full rounded-t"></div>
                    <div className="flex-1 bg-orange-400 h-3/4 rounded-t"></div>
                    <div className="flex-1 bg-red-400 h-4/5 rounded-t"></div>
                    <div className="flex-1 bg-yellow-300 h-1/2 rounded-t"></div>
                    <div className="flex-1 bg-green-300 h-1/3 rounded-t"></div>
                    <div className="flex-1 bg-blue-300 h-1/4 rounded-t"></div>
                    <div className="flex-1 bg-blue-400 h-1/5 rounded-t"></div>
                    <div className="flex-1 bg-blue-300 h-1/4 rounded-t"></div>
                    <div className="flex-1 bg-blue-200 h-1/6 rounded-t"></div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">Frecuencia mensual de incendios</div>
              </div>

              {/* Annual Trend */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Tendencia Anual</h3>
                <div className="h-40 bg-white rounded-lg flex items-center justify-center p-4">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <polyline
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="3"
                      points="5,45 15,40 25,35 35,30 45,25 55,20 65,25 75,15 85,18 95,12"
                    />
                    <circle cx="5" cy="45" r="2" fill="#DC2626" />
                    <circle cx="15" cy="40" r="2" fill="#DC2626" />
                    <circle cx="25" cy="35" r="2" fill="#DC2626" />
                    <circle cx="35" cy="30" r="2" fill="#DC2626" />
                    <circle cx="45" cy="25" r="2" fill="#DC2626" />
                    <circle cx="55" cy="20" r="2" fill="#DC2626" />
                    <circle cx="65" cy="25" r="2" fill="#DC2626" />
                    <circle cx="75" cy="15" r="2" fill="#DC2626" />
                    <circle cx="85" cy="18" r="2" fill="#DC2626" />
                    <circle cx="95" cy="12" r="2" fill="#DC2626" />
                  </svg>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">Evolución de frecuencia 1986-2017</div>
              </div>
            </div>
          </div>
        )}

        {!showTrendsSection && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowTrendsSection(true)}
              className="text-[#6B46C1] hover:text-[#553C9A] transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <ChevronDown className="h-4 w-4" />
              Mostrar tendencias y patrones de frecuencia
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
