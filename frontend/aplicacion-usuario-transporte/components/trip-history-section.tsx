"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, MapPin, Clock, CreditCard, ChevronRight, Filter, ChevronDown } from "lucide-react"

interface Trip {
  id: string
  date: string
  time: string
  transportType: string
  transportIcon: string
  transportColor: string
  origin: string
  destination: string
  cost: number
  duration: string
  status: "completed" | "cancelled" | "in-progress"
}

const mockTrips: Trip[] = [
  {
    id: "1",
    date: "2024-01-15",
    time: "08:30",
    transportType: "Metro",
    transportIcon: "🚇",
    transportColor: "bg-orange-500",
    origin: "Pantitlán",
    destination: "Zócalo",
    cost: 5.0,
    duration: "45 min",
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-15",
    time: "18:15",
    transportType: "Metrobús",
    transportIcon: "🚌",
    transportColor: "bg-red-500",
    origin: "Indios Verdes",
    destination: "El Caminero",
    cost: 6.0,
    duration: "32 min",
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-14",
    time: "14:20",
    transportType: "Ecobici",
    transportIcon: "🚲",
    transportColor: "bg-lime-500",
    origin: "Estación 123 - Roma Norte",
    destination: "Estación 089 - Condesa",
    cost: 0.0,
    duration: "12 min",
    status: "completed",
  },
  {
    id: "4",
    date: "2024-01-14",
    time: "09:45",
    transportType: "RTP",
    transportIcon: "🚐",
    transportColor: "bg-green-500",
    origin: "Terminal Observatorio",
    destination: "Centro Histórico",
    cost: 4.0,
    duration: "28 min",
    status: "completed",
  },
  {
    id: "5",
    date: "2024-01-13",
    time: "16:30",
    transportType: "Cablebús",
    transportIcon: "🚠",
    transportColor: "bg-teal-500",
    origin: "Cuautepec",
    destination: "Indios Verdes",
    cost: 7.0,
    duration: "18 min",
    status: "completed",
  },
]

interface TripHistorySectionProps {
  onTripSelect?: (trip: Trip) => void
}

export function TripHistorySection({ onTripSelect }: TripHistorySectionProps) {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "today" | "week">("all")
  const [showAllTrips, setShowAllTrips] = useState(false)

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(selectedTrip === trip.id ? null : trip.id)
    onTripSelect?.(trip)
  }

  const getStatusBadge = (status: Trip["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completado
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Cancelado
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            En Progreso
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hoy"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer"
    } else {
      return date.toLocaleDateString("es-MX", { month: "short", day: "numeric" })
    }
  }

  const getTotalCost = () => {
    return mockTrips.reduce((total, trip) => total + trip.cost, 0)
  }

  const getTotalTrips = () => {
    return mockTrips.length
  }

  const displayedTrips = showAllTrips ? mockTrips : mockTrips.slice(0, 2)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-foreground">Viajes Anteriores</h2>
        </div>
        <Button variant="ghost" size="sm">
          <Filter size={16} />
        </Button>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{getTotalTrips()}</div>
              <div className="text-xs text-muted-foreground">Viajes Totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">${getTotalCost().toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">Gasto Total</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {displayedTrips.map((trip) => (
          <Card
            key={trip.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTrip === trip.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/50"
            }`}
            onClick={() => handleTripClick(trip)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <div className={`p-2 rounded-lg text-white text-sm ${trip.transportColor}`}>{trip.transportIcon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{trip.transportType}</h3>
                      {getStatusBadge(trip.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={12} />
                        <span className="truncate">{trip.origin}</span>
                        <ChevronRight size={12} />
                        <span className="truncate">{trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {formatDate(trip.date)} • {trip.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard size={10} />${trip.cost.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{trip.duration}</div>
                  <ChevronRight
                    size={16}
                    className={`text-muted-foreground transition-transform ml-auto ${
                      selectedTrip === trip.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>
              {selectedTrip === trip.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Origen</div>
                        <div className="text-sm font-medium">{trip.origin}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Costo</div>
                        <div className="text-sm font-medium">${trip.cost.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Destino</div>
                        <div className="text-sm font-medium">{trip.destination}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Duración</div>
                        <div className="text-sm font-medium">{trip.duration}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Repetir Viaje
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Ver Ruta
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        {!showAllTrips && mockTrips.length > 2 && (
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setShowAllTrips(true)}
          >
            <ChevronDown size={16} className="mr-2" />
            Ver más viajes ({mockTrips.length - 2} más)
          </Button>
        )}

        {showAllTrips && (
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setShowAllTrips(false)}
          >
            <ChevronRight size={16} className="mr-2 rotate-[-90deg]" />
            Ver menos viajes
          </Button>
        )}
      </div>
    </div>
  )
}
