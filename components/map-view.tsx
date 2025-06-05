"use client"

import { useEffect, useRef, useState } from "react"
import type { FireData } from "@/types/data-types"
import { Loader } from "lucide-react"

interface MapViewProps {
  data: FireData[]
  year: number
}

// Declare Leaflet types
declare global {
  interface Window {
    L?: any
  }
}

export default function MapView({ data, year }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

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

    // Initialize Leaflet map centered on Ñuble region
    const map = window.L.map(mapRef.current).setView([-36.6063, -72.1034], 10)

    // Add OpenStreetMap tiles (free)
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      className: "grayscale-map",
    }).addTo(map)

    leafletMapRef.current = map
    setLoading(false)
  }, [mapLoaded])

  // Add fire data to map
  useEffect(() => {
    if (!leafletMapRef.current || !window.L || !data.length) return

    // Clear existing markers and polygons
    leafletMapRef.current.eachLayer((layer: any) => {
      if (layer instanceof window.L.Marker || layer instanceof window.L.Circle) {
        leafletMapRef.current.removeLayer(layer)
      }
    })

    // Define colors for vegetation types
    const vegetationColors: Record<string, string> = {
      "Bosque Nativo": "#FF8C00",
      "Bosque Mixto": "#1E90FF",
      Matorral: "#32CD32",
      "Matorral Arborescente": "#DC143C",
      "Matorral-Pradera": "#9370DB",
      Praderas: "#8B4513",
    }

    // Add circles for each fire data point
    data.forEach((item) => {
      const color = vegetationColors[item.vegetationType] || "#CCCCCC"
      const radius = Math.sqrt(item.area) * 10 // Scale radius based on area

      const circle = window.L.circle([item.coordinates.lat, item.coordinates.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.7,
        radius: radius,
      }).addTo(leafletMapRef.current)

      // Add popup with information
      const popupContent = `
        <div style="font-family: 'Sora', sans-serif; padding: 8px;">
          <h3 style="margin: 0 0 8px; font-weight: bold;">${item.vegetationType}</h3>
          <p style="margin: 0 0 4px;"><strong>Año:</strong> ${item.year}</p>
          <p style="margin: 0 0 4px;"><strong>Comuna:</strong> ${item.commune}</p>
          <p style="margin: 0 0 4px;"><strong>Área afectada:</strong> ${item.area.toFixed(2)} hectáreas</p>
          <p style="margin: 0;"><strong>Nivel de impacto:</strong> ${item.impactLevel}</p>
        </div>
      `

      circle.bindPopup(popupContent)
    })
  }, [data])

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: "500px" }} />
    </div>
  )
}
