"use client"

import { useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import { useMobile } from "@/hooks/use-mobile"
import { mockData } from "@/data/mock-data"
import MapÑuble from "@/components/map-nuble"
import { Plus, Minus, X, ChevronUp, ChevronDown } from "lucide-react"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState<"frecuencia" | "intensidad">("frecuencia")
  const [selectedYear, setSelectedYear] = useState<number>(2017)
  const [selectedCommune, setSelectedCommune] = useState<string>("Todas")
  const [showHistoricalSection, setShowHistoricalSection] = useState(true)
  const [showDetailSection, setShowDetailSection] = useState(true)
  const isMobile = useMobile()

  const years = [2017, 2007, 1986]
  const communes = [
    "Todas",
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

  const regionStats = {
    totalIncendios: "1,850",
    areaTotal: "234,458.8",
    magnitudPromedio: "126.7",
    rangoAnios: "1986-2017",
  }

  const selectedDetailCommune = "San Nicolás"

  // Filter data based on selections
  const filteredData = mockData.filter((item) => {
    return (
      (selectedYear === 0 || item.year === selectedYear) &&
      (selectedCommune === "Todas" || item.commune === selectedCommune)
    )
  })

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} minDisplayTime={3000} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* 1. ENCABEZADO (Header fijo, superior) */}
      <header className="bg-white/80 backdrop-blur-md border border-white/20 px-6 py-4 flex justify-between items-center sticky top-6 left-6 right-6 z-[9999] mx-6 mt-6 rounded-2xl shadow-lg shadow-purple-500/10">
        <div className="flex items-center gap-3">
          <img src="/plansat-logo.svg" alt="PLANSAT Logo" className="h-10 w-auto object-contain" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveView("frecuencia")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeView === "frecuencia"
                ? "bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] text-white shadow-lg shadow-purple-500/25"
                : "bg-white/60 text-gray-700 border border-gray-200/50 hover:bg-white/80"
            }`}
          >
            Vista Frecuencia
          </button>
          <button
            onClick={() => setActiveView("intensidad")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeView === "intensidad"
                ? "bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] text-white shadow-lg shadow-purple-500/25"
                : "bg-white/60 text-gray-700 border border-gray-200/50 hover:bg-white/80"
            }`}
          >
            Vista Intensidad
          </button>
        </div>
      </header>

      {/* Espaciador para el header fijo */}
      <div className="h-6 px-6"></div>

      {/* 2. TÍTULO + FILTROS + MAPA */}
      <main className="px-6 pb-6">
        {/* Título */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/30 shadow-sm">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] bg-clip-text text-transparent">
            Mapa de frecuencia de incendios por comuna
          </h1>
        </div>

        {/* Bento Grid Layout para Filtros y Estadísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Panel de Filtros */}
          <div className="lg:col-span-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Filtros de Búsqueda
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/50 rounded-xl p-4 border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full border-0 bg-white/80 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all duration-200 shadow-sm"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-white/50 rounded-xl p-4 border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comuna</label>
                <select
                  value={selectedCommune}
                  onChange={(e) => setSelectedCommune(e.target.value)}
                  className="w-full border-0 bg-white/80 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all duration-200 shadow-sm"
                >
                  {communes.map((commune) => (
                    <option key={commune} value={commune}>
                      {commune}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Panel de Estadísticas */}
          <div className="lg:col-span-4 bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              Región del Ñuble
            </h3>
            <div className="space-y-3">
              {[
                { label: "Total incendios", value: regionStats.totalIncendios, color: "from-red-400 to-orange-400" },
                { label: "Área total (ha)", value: regionStats.areaTotal, color: "from-green-400 to-emerald-400" },
                {
                  label: "Magnitud promedio (ha)",
                  value: regionStats.magnitudPromedio,
                  color: "from-blue-400 to-cyan-400",
                },
                { label: "Rango años", value: regionStats.rangoAnios, color: "from-purple-400 to-violet-400" },
              ].map((stat, index) => (
                <div key={index} className="bg-white/60 rounded-xl p-3 border border-white/40">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stat.label}:</span>
                    <span className={`font-bold text-sm bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel del Mapa */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm mb-8">
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200/50">
            <MapÑuble data={filteredData} year={selectedYear} selectedCommune={selectedCommune} />

            {/* Controles de zoom con estilo bento */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <button className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-3 shadow-lg hover:bg-white transition-all duration-200">
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-3 shadow-lg hover:bg-white transition-all duration-200">
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Leyenda con estilo bento */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-4 shadow-lg text-xs z-10">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                N° incendios
              </h4>
              <div className="space-y-2">
                {[
                  { color: "#7F1D1D", label: "200+" },
                  { color: "#DC2626", label: "150" },
                  { color: "#F97316", label: "100" },
                  { color: "#FBBF24", label: "50" },
                  { color: "#FEF3C7", label: "0" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-lg border border-gray-200/50 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div
                  className="h-3 rounded-lg shadow-sm"
                  style={{
                    background: "linear-gradient(to right, #FEF3C7, #FBBF24, #F97316, #DC2626, #7F1D1D)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. VISUALIZACIÓN DE DATOS HISTÓRICOS */}
        {showHistoricalSection && (
          <section className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] bg-clip-text text-transparent mb-2">
                Evolución y magnitud de incendios
              </h2>
              <p className="text-gray-600">Resumen gráfico por magnitud y año</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gráfico 1 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm relative group hover:shadow-lg transition-all duration-300">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
                <h3 className="text-sm font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  Frecuencia Anual (Región de Ñuble)
                </h3>
                <div className="h-32 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-xl flex items-end justify-center p-4 border border-blue-100/50">
                  <div className="flex items-end gap-2 h-full">
                    <div className="w-4 bg-gradient-to-t from-red-400 to-red-300 h-1/4 rounded-t-lg shadow-sm"></div>
                    <div className="w-4 bg-gradient-to-t from-red-400 to-red-300 h-1/2 rounded-t-lg shadow-sm"></div>
                    <div className="w-4 bg-gradient-to-t from-red-400 to-red-300 h-3/4 rounded-t-lg shadow-sm"></div>
                    <div className="w-4 bg-gradient-to-t from-red-400 to-red-300 h-full rounded-t-lg shadow-sm"></div>
                    <div className="w-4 bg-gradient-to-t from-red-400 to-red-300 h-2/3 rounded-t-lg shadow-sm"></div>
                    <div className="w-4 bg-gradient-to-t from-red-400 to-red-300 h-1/3 rounded-t-lg shadow-sm"></div>
                  </div>
                </div>
              </div>

              {/* Gráfico 2 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm relative group hover:shadow-lg transition-all duration-300">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
                <h3 className="text-sm font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                  Distribución Magnitud (ha)
                </h3>
                <div className="h-32 bg-gradient-to-br from-green-50/50 to-yellow-50/50 rounded-xl flex items-center justify-center border border-green-100/50">
                  <div className="flex gap-3">
                    <div className="w-8 bg-gradient-to-t from-orange-400 to-orange-300 h-16 rounded-lg shadow-sm"></div>
                    <div className="w-8 bg-gradient-to-t from-orange-400 to-orange-300 h-20 rounded-lg shadow-sm"></div>
                    <div className="w-8 bg-gradient-to-t from-orange-400 to-orange-300 h-12 rounded-lg shadow-sm"></div>
                    <div className="w-8 bg-gradient-to-t from-orange-400 to-orange-300 h-8 rounded-lg shadow-sm"></div>
                  </div>
                </div>
              </div>

              {/* Gráfico 3 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm relative group hover:shadow-lg transition-all duration-300">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
                <h3 className="text-sm font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  Área Quemada Anual
                </h3>
                <div className="h-32 bg-gradient-to-br from-red-50/50 to-orange-50/50 rounded-xl flex items-center justify-center p-4 border border-red-100/50">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <polyline
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="3"
                      points="10,40 20,30 30,35 40,20 50,25 60,15 70,30 80,10 90,20"
                      className="drop-shadow-sm"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Gráfico 4 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm relative group hover:shadow-lg transition-all duration-300">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
                <h3 className="text-sm font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  Tendencia Temporal
                </h3>
                <div className="h-32 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-xl flex items-center justify-center p-4 border border-purple-100/50">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <polyline
                      fill="none"
                      stroke="url(#gradient2)"
                      strokeWidth="3"
                      points="10,45 20,40 30,35 40,25 50,20 60,15 70,25 80,10 90,15"
                      className="drop-shadow-sm"
                    />
                    <defs>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#dc2626" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Gráfico 5 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm relative group hover:shadow-lg transition-all duration-300">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
                <h3 className="text-sm font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                  Tipos por Magnitud
                </h3>
                <div className="h-32 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 rounded-xl flex items-center justify-center border border-yellow-100/50">
                  <div className="w-20 h-20 rounded-full border-8 border-orange-300 border-t-yellow-300 border-r-red-300 shadow-lg"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowHistoricalSection(false)}
                className="bg-white/60 hover:bg-white/80 text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto border border-gray-200/50"
              >
                cerrar sección
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {!showHistoricalSection && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowHistoricalSection(true)}
              className="bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-purple-500/25"
            >
              <ChevronDown className="h-4 w-4" />
              Mostrar evolución y magnitud de incendios
            </button>
          </div>
        )}

        {/* 4. ANÁLISIS DETALLADO POR COMUNA */}
        {showDetailSection && (
          <section className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Análisis detallado: comuna{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">
                  {selectedDetailCommune}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mapa 1985 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm relative group hover:shadow-lg transition-all duration-300">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute top-4 right-12 w-16 h-12 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-xs flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full shadow-sm"></div>
                </div>
                <h3 className="text-sm font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                  Frecuencia de Incendios en {selectedDetailCommune} (1985)
                </h3>
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 relative overflow-hidden border border-gray-200/50">
                  <div className="absolute inset-4 bg-white/50 rounded-lg shadow-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-gray-200 rounded-lg shadow-sm"></div>
                </div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-500">Baja frecuencia</span>
                  <span className="text-gray-500">Alta frecuencia</span>
                </div>
                <div
                  className="h-3 rounded-lg shadow-sm"
                  style={{
                    background: "linear-gradient(to right, #FFF4BA, #FDCB6E, #FD914C, #E4572E)",
                  }}
                />
              </div>

              {/* Mapa 1998 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-sm relative group hover:shadow-lg transition-all duration-300">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute top-4 right-12 w-16 h-12 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl text-xs flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full shadow-sm"></div>
                </div>
                <h3 className="text-sm font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                  Frecuencia de Incendios en {selectedDetailCommune} (1998)
                </h3>
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-4 relative overflow-hidden border border-gray-200/50">
                  <div className="absolute inset-4 bg-white/50 rounded-lg shadow-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-gray-200 rounded-lg shadow-sm"></div>
                </div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-500">Baja frecuencia</span>
                  <span className="text-gray-500">Alta frecuencia</span>
                </div>
                <div
                  className="h-3 rounded-lg shadow-sm"
                  style={{
                    background: "linear-gradient(to right, #FFF4BA, #FDCB6E, #FD914C, #E4572E, #C9181D)",
                  }}
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowDetailSection(false)}
                className="bg-white/60 hover:bg-white/80 text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto border border-gray-200/50"
              >
                cerrar sección
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {!showDetailSection && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowDetailSection(true)}
              className="bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-purple-500/25"
            >
              <ChevronDown className="h-4 w-4" />
              Mostrar análisis detallado: comuna {selectedDetailCommune}
            </button>
          </div>
        )}
      </main>

      {/* 5. PIE DE PÁGINA */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-white/30 text-center text-gray-500 text-sm mt-12 py-6 mx-6 mb-6 rounded-2xl">
        © 2025 PLANSAT
      </footer>
    </div>
  )
}
