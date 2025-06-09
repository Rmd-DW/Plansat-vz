"use client"
import Image from "next/image"
import Link from "next/link"
import { BarChart2, Map, ChevronRight, FileText, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E5E3EE]">
      {/* Navbar */}
      <header className="w-full bg-white rounded-b-2xl shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6B46C1] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-[#6B46C1] text-xl font-bold">PLANSAT</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/loading">
              <Button className="bg-[#6B46C1] hover:bg-[#553C9A] text-white px-6 py-2 rounded-xl">Acceder</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black mb-6">
          Monitoreo y Análisis de Impacto
          <br />
          de Incendios Forestales
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          PLANSAT proporciona herramientas avanzadas para el análisis de vegetación afectada por incendios forestales en
          la región de Ñuble Chile
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/loading">
            <Button className="bg-[#6B46C1] hover:bg-[#553C9A] text-white px-8 py-3 rounded-xl text-lg">
              Comenzar ahora →
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="border-[#6B46C1] text-[#6B46C1] hover:bg-[#6B46C1]/5 px-8 py-3 rounded-xl text-lg"
            >
              Ver características
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-black">
            Características principales
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            PLANSAT ofrece herramientas avanzadas para el análisis y monitoreo de incendios forestales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border-0 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6 px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-[#6B46C1]/10 rounded-2xl">
                  <Map className="h-8 w-8 text-[#6B46C1]" />
                </div>
                <h3 className="text-xl font-bold text-black">Visualización geoespacial</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mapa interactivo que muestra la distribución de incendios y áreas afectadas en la Región del Ñuble.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6 px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-[#6B46C1]/10 rounded-2xl">
                  <BarChart2 className="h-8 w-8 text-[#6B46C1]" />
                </div>
                <h3 className="text-xl font-bold text-black">Análisis estadísticos</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Estudios de la distribución de incendios y áreas afectadas en la región del Ñuble.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6 px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-[#6B46C1]/10 rounded-2xl">
                  <FileText className="h-8 w-8 text-[#6B46C1]" />
                </div>
                <h3 className="text-xl font-bold text-black">Generación de reportes</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Datos para la generación de reportes para la toma de decisiones.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6 px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-[#6B46C1]/10 rounded-2xl">
                  <BarChart2 className="h-8 w-8 text-[#6B46C1]" />
                </div>
                <h3 className="text-xl font-bold text-black">Monitoreo de frecuencia</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Seguimiento de frecuencia de incendios por comuna y período.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6 px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-[#6B46C1]/10 rounded-2xl">
                  <TrendingUp className="h-8 w-8 text-[#6B46C1]" />
                </div>
                <h3 className="text-xl font-bold text-black">Monitoreo de intensidad</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Seguimiento de intensidad de los incendios por comuna y período.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="pt-8 pb-6 px-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-[#6B46C1]/10 rounded-2xl">
                  <Clock className="h-8 w-8 text-[#6B46C1]" />
                </div>
                <h3 className="text-xl font-bold text-black">Análisis temporal</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comparación de datos históricos para la identificación de patrones y tendencias de incendios
                  forestales.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-black">Mapa Interactivo</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
            Visualice datos geoespaciales de incendios forestales en la región del Ñuble contamos con filtros avanzados,
            mapa interactivo, línea de tiempo que muestra la distribución de las áreas afectadas.
          </p>
          <Link href="/loading">
            <Button className="bg-[#6B46C1] hover:bg-[#553C9A] text-white px-8 py-3 rounded-xl text-lg">Acceder</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Features List */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <ChevronRight className="h-5 w-5 text-[#6B46C1] mt-0.5 flex-shrink-0" />
                <span className="text-[#6B46C1] font-medium">Mapa interactivo - Región del Ñuble</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="h-5 w-5 text-[#6B46C1] mt-0.5 flex-shrink-0" />
                <span className="text-[#6B46C1] font-medium">Panel de filtros</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="h-5 w-5 text-[#6B46C1] mt-0.5 flex-shrink-0" />
                <span className="text-[#6B46C1] font-medium">Estudio de datos línea de tiempo</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="h-5 w-5 text-[#6B46C1] mt-0.5 flex-shrink-0" />
                <span className="text-[#6B46C1] font-medium">Nivel de impacto en la vegetación</span>
              </li>
            </ul>
          </div>

          {/* Satellite Image */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PLANSAT__FIRE_DASHBOARD_DS.png-DuZnDM7KrFmPLgwUynqowwZVWCCY4P.jpeg"
                alt="Imagen satelital de la región del Ñuble mostrando análisis de incendios forestales"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] text-white py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#6B46C1] font-bold text-sm">P</span>
                </div>
                <span className="text-white text-xl font-bold">PLANSAT</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Plataforma de análisis de vegetación afectada por incendios forestales en la Región de Ñuble, Chile.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Plataforma</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard-home" className="text-white/80 hover:text-white transition text-sm">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Contacto</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>Email: info@plansat.cl</li>
                <li>Teléfono: info@plansat.cl</li>
                <li>Dirección: Valparaíso, V región, Chile</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center">
            <p className="text-white/70 text-sm">2025 PLANSAT. Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
