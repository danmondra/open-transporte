"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, Bus, Zap, Cable, Bike, MapPin, ChevronRight, Clock, ChevronDown } from "lucide-react"

interface TransportType {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  routes: number
  status: "active" | "maintenance" | "limited"
}

const transportTypes: TransportType[] = [
  {
    id: "metro",
    name: "Metro",
    icon: <Train size={24} />,
    color: "bg-orange-500",
    routes: 12,
    status: "active",
  },
  {
    id: "metrobus",
    name: "Metrobús",
    icon: <Bus size={24} />,
    color: "bg-red-500",
    routes: 7,
    status: "active",
  },
  {
    id: "rtp",
    name: "RTP",
    icon: <Bus size={24} />,
    color: "bg-green-500",
    routes: 95,
    status: "active",
  },
  {
    id: "trolebus",
    name: "Trolebús",
    icon: <Zap size={24} />,
    color: "bg-blue-500",
    routes: 8,
    status: "limited",
  },
  {
    id: "tren-ligero",
    name: "Tren Ligero",
    icon: <Train size={24} />,
    color: "bg-purple-500",
    routes: 1,
    status: "active",
  },
  {
    id: "cablebus",
    name: "Cablebús",
    icon: <Cable size={24} />,
    color: "bg-teal-500",
    routes: 2,
    status: "active",
  },
  {
    id: "ecobici",
    name: "Ecobici",
    icon: <Bike size={24} />,
    color: "bg-lime-500",
    routes: 480,
    status: "active",
  },
]

interface TransportTypesSectionProps {
  onTransportSelect?: (transportType: TransportType) => void
}

export function TransportTypesSection({ onTransportSelect }: TransportTypesSectionProps) {
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null)
  const [showAllTransports, setShowAllTransports] = useState(false)

  const handleTransportClick = (transport: TransportType) => {
    setSelectedTransport(transport.id)
    onTransportSelect?.(transport)
  }

  const getStatusBadge = (status: TransportType["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Activo
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Mantenimiento
          </Badge>
        )
      case "limited":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Servicio Limitado
          </Badge>
        )
      default:
        return null
    }
  }

  const mainTransports = transportTypes.slice(0, 2) // Metro and Metrobús
  const otherTransports = transportTypes.slice(2) // Rest of the transports
  const displayedTransports = showAllTransports ? transportTypes : mainTransports

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={20} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Transporte Público CDMX</h2>
      </div>

      <div className="grid gap-3">
        {displayedTransports.map((transport) => (
          <Card
            key={transport.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTransport === transport.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/50"
            }`}
            onClick={() => handleTransportClick(transport)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Transport Icon */}
                  <div className={`p-3 rounded-lg text-white ${transport.color}`}>{transport.icon}</div>

                  {/* Transport Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{transport.name}</h3>
                      {getStatusBadge(transport.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {transport.routes} {transport.id === "ecobici" ? "estaciones" : "rutas"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        05:00 - 00:00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={20}
                  className={`text-muted-foreground transition-transform ${
                    selectedTransport === transport.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              {/* Expanded Content */}
              {selectedTransport === transport.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      <MapPin size={16} className="mr-2" />
                      Ver Rutas
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start bg-transparent">
                      <Clock size={16} className="mr-2" />
                      Horarios
                    </Button>
                  </div>
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Toca "Ver Rutas" para explorar las líneas disponibles de {transport.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}

        {!showAllTransports && (
          <Button
            variant="ghost"
            className="w-full justify-center text-muted-foreground hover:text-foreground"
            onClick={() => setShowAllTransports(true)}
          >
            <ChevronDown size={16} className="mr-2" />
            Ver más opciones de transporte
          </Button>
        )}

        {showAllTransports && (
          <Button
            variant="ghost"
            className="w-full justify-center text-muted-foreground hover:text-foreground"
            onClick={() => setShowAllTransports(false)}
          >
            <ChevronRight size={16} className="mr-2 rotate-[-90deg]" />
            Ver menos opciones
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <Card className="bg-accent/30">
        <div className="p-4">
          <h3 className="font-semibold text-accent-foreground mb-3">Estadísticas del Sistema</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">195</div>
              <div className="text-xs text-muted-foreground">Estaciones Metro</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">125</div>
              <div className="text-xs text-muted-foreground">Rutas Totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">5.2M</div>
              <div className="text-xs text-muted-foreground">Usuarios Diarios</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
