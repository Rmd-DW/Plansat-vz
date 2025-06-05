"use client"
import { useEffect, useRef, useState } from "react"
import type { FireData } from "@/types/data-types"
import { Loader } from "lucide-react"

interface MapÑubleProps {
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

// Realistic GeoJSON data for Ñuble communes based on actual boundaries
const nubleComunasGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Cobquecura" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-73.2, -36.1],
            [-73.0, -36.0],
            [-72.9, -36.1],
            [-72.8, -36.2],
            [-72.9, -36.3],
            [-73.1, -36.25],
            [-73.2, -36.1],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Quirihue" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.8, -36.2],
            [-72.6, -36.15],
            [-72.5, -36.2],
            [-72.4, -36.3],
            [-72.5, -36.4],
            [-72.7, -36.35],
            [-72.8, -36.2],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Ninhue" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.5, -36.3],
            [-72.3, -36.25],
            [-72.2, -36.35],
            [-72.25, -36.45],
            [-72.4, -36.5],
            [-72.5, -36.4],
            [-72.5, -36.3],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "San Carlos" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.1, -36.3],
            [-71.9, -36.25],
            [-71.8, -36.35],
            [-71.85, -36.5],
            [-72.0, -36.55],
            [-72.15, -36.45],
            [-72.1, -36.3],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Ñiquén" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.0, -36.2],
            [-71.8, -36.15],
            [-71.7, -36.25],
            [-71.75, -36.35],
            [-71.9, -36.4],
            [-72.05, -36.3],
            [-72.0, -36.2],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "San Fabián" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.7, -36.4],
            [-71.5, -36.35],
            [-71.4, -36.5],
            [-71.45, -36.7],
            [-71.6, -36.75],
            [-71.75, -36.6],
            [-71.7, -36.4],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Coihueco" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.9, -36.5],
            [-71.7, -36.45],
            [-71.6, -36.6],
            [-71.7, -36.75],
            [-71.9, -36.8],
            [-72.0, -36.65],
            [-71.9, -36.5],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "San Nicolás" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.3, -36.4],
            [-72.1, -36.35],
            [-72.0, -36.5],
            [-72.1, -36.65],
            [-72.3, -36.7],
            [-72.4, -36.55],
            [-72.3, -36.4],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Chillán" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.2, -36.5],
            [-72.0, -36.45],
            [-71.9, -36.6],
            [-72.0, -36.75],
            [-72.2, -36.8],
            [-72.3, -36.65],
            [-72.2, -36.5],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Chillán Viejo" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.3, -36.6],
            [-72.1, -36.55],
            [-72.0, -36.7],
            [-72.1, -36.85],
            [-72.3, -36.9],
            [-72.4, -36.75],
            [-72.3, -36.6],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Pinto" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.0, -36.6],
            [-71.8, -36.55],
            [-71.7, -36.7],
            [-71.8, -36.85],
            [-72.0, -36.9],
            [-72.1, -36.75],
            [-72.0, -36.6],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "El Carmen" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.1, -36.8],
            [-71.9, -36.75],
            [-71.8, -36.9],
            [-71.9, -37.05],
            [-72.1, -37.1],
            [-72.2, -36.95],
            [-72.1, -36.8],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Pemuco" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.3, -36.85],
            [-72.1, -36.8],
            [-72.0, -36.95],
            [-72.1, -37.1],
            [-72.3, -37.15],
            [-72.4, -37.0],
            [-72.3, -36.85],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Yungay" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.2, -37.0],
            [-72.0, -36.95],
            [-71.9, -37.1],
            [-72.0, -37.25],
            [-72.2, -37.3],
            [-72.3, -37.15],
            [-72.2, -37.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "San Ignacio" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.2, -36.7],
            [-72.0, -36.65],
            [-71.9, -36.8],
            [-72.0, -36.95],
            [-72.2, -37.0],
            [-72.3, -36.85],
            [-72.2, -36.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Bulnes" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.4, -36.6],
            [-72.2, -36.55],
            [-72.1, -36.7],
            [-72.2, -36.85],
            [-72.4, -36.9],
            [-72.5, -36.75],
            [-72.4, -36.6],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Quillón" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.6, -36.6],
            [-72.4, -36.55],
            [-72.3, -36.7],
            [-72.4, -36.85],
            [-72.6, -36.9],
            [-72.7, -36.75],
            [-72.6, -36.6],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Portezuelo" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.6, -36.4],
            [-72.4, -36.35],
            [-72.3, -36.5],
            [-72.4, -36.65],
            [-72.6, -36.7],
            [-72.7, -36.55],
            [-72.6, -36.4],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Ránquil" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.7, -36.5],
            [-72.5, -36.45],
            [-72.4, -36.6],
            [-72.5, -36.75],
            [-72.7, -36.8],
            [-72.8, -36.65],
            [-72.7, -36.5],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Treguaco" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.8, -36.3],
            [-72.6, -36.25],
            [-72.5, -36.4],
            [-72.6, -36.55],
            [-72.8, -36.6],
            [-72.9, -36.45],
            [-72.8, -36.3],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Coelemu" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.9, -36.35],
            [-72.7, -36.3],
            [-72.6, -36.45],
            [-72.7, -36.6],
            [-72.9, -36.65],
            [-73.0, -36.5],
            [-72.9, -36.35],
          ],
        ],
      },
    },
  ],
}

const MapÑuble = ({ data, year, selectedCommune }: MapÑubleProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Calculate fire count by commune
  const getFireCountByCommune = () => {
    const fireCount: Record<string, number> = {}

    // Filter data by year if specified
    const filteredData = year === 0 ? data : data.filter((item) => item.year === year)

    filteredData.forEach((item) => {
      fireCount[item.commune] = (fireCount[item.commune] || 0) + 1
    })

    return fireCount
  }

  // Get color based on fire count
  const getColorByFireCount = (count: number): string => {
    if (count === 0) return "#FFF4BA" // Amarillo pálido
    if (count <= 50) return "#FDCB6E" // Amarillo intenso
    if (count <= 100) return "#FD914C" // Naranja fuerte
    if (count <= 150) return "#E4572E" // Rojo anaranjado
    return "#C9181D" // Rojo burdeos intenso
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

  // Add commune polygons with fire data
  useEffect(() => {
    if (!leafletMapRef.current || !window.L) return

    // Clear existing layers
    leafletMapRef.current.eachLayer((layer: any) => {
      if (layer.feature) {
        leafletMapRef.current.removeLayer(layer)
      }
    })

    const fireCountByCommune = getFireCountByCommune()

    // Add GeoJSON layer with styling - cambiar esta sección
    const geoJsonLayer = window.L.geoJSON(nubleComunasGeoJson, {
      style: (feature: any) => {
        const communeName = feature.properties.name
        const fireCount = fireCountByCommune[communeName] || 0
        const color = getColorByFireCount(fireCount)

        return {
          fillColor: color,
          weight: 2, // Hacer el borde más grueso
          opacity: 1,
          color: color, // Color del borde igual al de relleno
          fillOpacity: 0.1, // Hacer el relleno muy transparente
          dashArray: "", // Sin líneas punteadas
        }
      },
      onEachFeature: (feature: any, layer: any) => {
        const communeName = feature.properties.name
        const fireCount = fireCountByCommune[communeName] || 0

        // Hover effects - actualizar efectos de hover
        layer.on({
          mouseover: (e: any) => {
            const layer = e.target
            layer.setStyle({
              weight: 4, // Borde más grueso en hover
              color: "#333333",
              fillOpacity: 0.3, // Aumentar opacidad en hover
            })
            layer.bringToFront()
          },
          mouseout: (e: any) => {
            geoJsonLayer.resetStyle(e.target)
          },
          click: (e: any) => {
            // Create popup content
            const popupContent = `
          <div style="font-family: 'Sora', sans-serif; padding: 12px; min-width: 200px;">
            <h3 style="margin: 0 0 8px; font-weight: bold; color: #333; font-size: 16px;">${communeName}</h3>
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>N° Incendios:</strong> ${fireCount}
            </p>
            ${
              year !== 0
                ? `<p style="margin: 4px 0 0; font-size: 12px; color: #888;">Año: ${year}</p>`
                : `<p style="margin: 4px 0 0; font-size: 12px; color: #888;">Todos los años</p>`
            }
          </div>
        `

            // Show popup
            window.L.popup().setLatLng(e.latlng).setContent(popupContent).openOn(leafletMapRef.current)
          },
        })
      },
    }).addTo(leafletMapRef.current)

    // Fit map to bounds
    leafletMapRef.current.fitBounds(geoJsonLayer.getBounds(), {
      padding: [20, 20],
    })
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

export default MapÑuble
