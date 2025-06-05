"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Move, Minimize2, Maximize2 } from "lucide-react"

interface DraggableMapLegendProps {
  className?: string
}

export default function DraggableMapLegend({ className = "" }: DraggableMapLegendProps) {
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const legendRef = useRef<HTMLDivElement>(null)

  const legendItems = [
    { count: "200+", color: "#C9181D", label: "200+ incendios" },
    { count: "150", color: "#E4572E", label: "150 incendios" },
    { count: "100", color: "#FD914C", label: "100 incendios" },
    { count: "50", color: "#FDCB6E", label: "50 incendios" },
    { count: "0", color: "#FFF4BA", label: "0 incendios" },
  ]

  // Handle mouse down on drag handle
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!legendRef.current) return

    const rect = legendRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(true)
  }

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Constrain to viewport
      const maxX = window.innerWidth - (legendRef.current?.offsetWidth || 0)
      const maxY = window.innerHeight - (legendRef.current?.offsetHeight || 0)

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 bg-white rounded-lg border shadow-lg p-2 hover:bg-gray-50 transition-colors"
        title="Mostrar leyenda"
      >
        <Maximize2 className="h-4 w-4 text-gray-600" />
      </button>
    )
  }

  return (
    <div
      ref={legendRef}
      className={`fixed z-50 bg-white rounded-lg border shadow-lg ${className} ${isDragging ? "cursor-grabbing" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        minWidth: "200px",
      }}
    >
      {/* Header with drag handle and controls */}
      <div
        className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-700">N° Incendios</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title={isMinimized ? "Expandir" : "Minimizar"}
          >
            <Minimize2 className="h-3 w-3 text-gray-500" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Cerrar leyenda"
          >
            <X className="h-3 w-3 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Legend content */}
      {!isMinimized && (
        <div className="p-4">
          <div className="space-y-2 mb-4">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-gray-200" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Gradient bar */}
          <div>
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
      )}
    </div>
  )
}
