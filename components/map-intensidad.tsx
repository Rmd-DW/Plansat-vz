"use client"
import { useEffect, useRef, useState } from "react"
import type { FireData } from "@/types/data-types"
import { Loader } from "lucide-react"

interface MapIntensidadProps {
  data: FireData[]
  year: number
  selectedCommune: string
}

// Declare Leaflet types
declare global {
  interface Window {
    L?: any
  }
}

const MapIntensidad = ({ data, year, selectedCommune }: MapIntensidadProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Get color based on fire intensity (area)
  const getColorByIntensity = (area: number): string => {
    if (area < 100) return "#FEF3C7" // Amarillo muy pálido
    if (area < 1000) return "#FBBF24" // Amarillo
    if (area < 5000) return "#F97316" // Naranja
    if (area < 10000) return "#DC2626" // Rojo
    return "#7F1D1D" // Rojo oscuro
  }

  // Load Leaflet CSS and JS
  useEffect(() => {
    const loadLeaflet = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Load JS
      if (!window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.onload = () => {
          setMapLoaded(true)
        }
        document.head.appendChild(script)
      } else {
        setMapLoaded(true)
      }
    }

    loadLeaflet()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || leafletMapRef.current) return

    setLoading(true)

    // Initialize Leaflet map
    const map = window.L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true,
    }).setView([-36.6, -72.1], 10)

    // Add light gray base map
    window.L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap contributors, © CARTO",
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map)

    leafletMapRef.current = map
    setLoading(false)
  }, [mapLoaded])

  // Add fire intensity data to map
  useEffect(() => {
    if (!leafletMapRef.current || !window.L || !data.length) return

    // Clear existing markers and circles
    leafletMapRef.current.eachLayer((layer: any) => {
      if (layer instanceof window.L.Circle || layer instanceof window.L.Marker) {
        leafletMapRef.current.removeLayer(layer)
      }
    })

    // Filter data by year and commune
    let filteredData = data
    if (year !== 0) {
      filteredData = filteredData.filter((item) => item.year === year)
    }
    if (selectedCommune !== "Todas") {
      filteredData = filteredData.filter((item) => item.commune === selectedCommune)
    }

    // Add circles for each fire data point representing intensity
    filteredData.forEach((item) => {
      const color = getColorByIntensity(item.area)
      const radius = Math.sqrt(item.area) * 15 // Scale radius based on area for intensity

      const circle = window.L.circle([item.coordinates.lat, item.coordinates.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.7,
        weight: 1,
        radius: radius,
      }).addTo(leafletMapRef.current)

      // Add popup with intensity information
      const popupContent = `
        <div style="font-family: 'Sora', sans-serif; padding: 12px; min-width: 200px;">
          <h3 style="margin: 0 0 8px; font-weight: bold; color: #333; font-size: 16px;">Incendio - ${item.commune}</h3>
          <p style="margin: 0 0 4px; font-size: 14px; color: #666;">
            <strong>Área afectada:</strong> ${item.area.toFixed(1)} hectáreas
          </p>
          <p style="margin: 0 0 4px; font-size: 14px; color: #666;">
            <strong>Tipo de vegetación:</strong> ${item.vegetationType}
          </p>
          <p style="margin: 0 0 4px; font-size: 14px; color: #666;">
            <strong>Año:</strong> ${item.year}
          </p>
          <p style="margin: 0; font-size: 14px; color: #666;">
            <strong>Nivel de impacto:</strong> ${item.impactLevel}
          </p>
        </div>
      `

      circle.bindPopup(popupContent)
    })

    // Fit map to bounds of filtered data
    if (filteredData.length > 0) {
      const group = new window.L.featureGroup(
        filteredData.map((item) =>
          window.L.circle([item.coordinates.lat, item.coordinates.lng], {
            radius: Math.sqrt(item.area) * 15,
          }),
        ),
      )
      leafletMapRef.current.fitBounds(group.getBounds(), {
        padding: [20, 20],
      })
    }
  }, [data, year, selectedCommune, mapLoaded])

  return (
    <div className="relative w-full h-full bg-[#FAF7FF] rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full relative" style={{ minHeight: "400px" }}>
        {/* Purple filter overlay */}
        <div className="map-filter-overlay"></div>
      </div>
    </div>
  )
}

export default MapIntensidad
