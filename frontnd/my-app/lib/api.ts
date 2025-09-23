export interface TransportType {
  id: string
  name: string
  color: string
  routes: Route[]
  status: "active" | "maintenance" | "limited"
  operatingHours: {
    start: string
    end: string
  }
}

export interface Route {
  id: string
  name: string
  transportTypeId: string
  stops: Stop[]
  color?: string
  direction: "bidirectional" | "unidirectional"
}

export interface Stop {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  routeId: string
  order: number
}

export interface UserTrip {
  id: string
  userId: string
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
  routeId?: string
  qrCode?: string
}

export interface TripCreationRequest {
  usuario: { id: number }
  parada: { id: number }
}

export interface TripCreationResponse {
  _resultado: "exito" | "error"
  datos?: {
    viaje_id: number
    total: number
  }
  mensaje?: string
}

class TransportAPI {
  private baseUrl: string

  constructor() {
    // In a real app, this would come from environment variables
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"
  }

  // Transport Types API
  async getTransportTypes(): Promise<TransportType[]> {
    try {
      const response = await fetch(`${this.baseUrl}/transport-types`)
      if (!response.ok) throw new Error("Failed to fetch transport types")
      return await response.json()
    } catch (error) {
      console.error("Error fetching transport types:", error)
      // Return mock data for demo
      return this.getMockTransportTypes()
    }
  }

  async getTransportType(id: string): Promise<TransportType | null> {
    try {
      const response = await fetch(`${this.baseUrl}/transport-types/${id}`)
      if (!response.ok) throw new Error("Failed to fetch transport type")
      return await response.json()
    } catch (error) {
      console.error("Error fetching transport type:", error)
      return null
    }
  }

  // Routes API
  async getRoutesByTransportType(transportTypeId: string): Promise<Route[]> {
    try {
      const response = await fetch(`${this.baseUrl}/transport-types/${transportTypeId}/routes`)
      if (!response.ok) throw new Error("Failed to fetch routes")
      return await response.json()
    } catch (error) {
      console.error("Error fetching routes:", error)
      return []
    }
  }

  async getRoute(routeId: string): Promise<Route | null> {
    try {
      const response = await fetch(`${this.baseUrl}/routes/${routeId}`)
      if (!response.ok) throw new Error("Failed to fetch route")
      return await response.json()
    } catch (error) {
      console.error("Error fetching route:", error)
      return null
    }
  }

  async getStopsByRoute(routeId: string): Promise<Stop[]> {
    try {
      const response = await fetch(`${this.baseUrl}/routes/${routeId}/stops`)
      if (!response.ok) throw new Error("Failed to fetch stops")
      return await response.json()
    } catch (error) {
      console.error("Error fetching stops:", error)
      return []
    }
  }

  // User Trips API
  async getUserTrips(userId: string, limit = 10, offset = 0): Promise<UserTrip[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/trips?limit=${limit}&offset=${offset}`)
      if (!response.ok) throw new Error("Failed to fetch user trips")
      return await response.json()
    } catch (error) {
      console.error("Error fetching user trips:", error)
      // Return mock data for demo
      return this.getMockUserTrips()
    }
  }

  async createTrip(tripData: Omit<UserTrip, "id">): Promise<UserTrip> {
    try {
      const response = await fetch(`${this.baseUrl}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      })
      if (!response.ok) throw new Error("Failed to create trip")
      return await response.json()
    } catch (error) {
      console.error("Error creating trip:", error)
      throw error
    }
  }

  async updateTripStatus(tripId: string, status: UserTrip["status"]): Promise<UserTrip> {
    try {
      const response = await fetch(`${this.baseUrl}/trips/${tripId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Failed to update trip")
      return await response.json()
    } catch (error) {
      console.error("Error updating trip:", error)
      throw error
    }
  }

  // QR Code Processing
  async processQRCode(qrData: string): Promise<{
    transportType: string
    route?: string
    stop?: string
    valid: boolean
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/qr/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrData }),
      })
      if (!response.ok) throw new Error("Failed to process QR code")
      return await response.json()
    } catch (error) {
      console.error("Error processing QR code:", error)
      // Mock QR processing for demo
      return this.mockProcessQR(qrData)
    }
  }

  // Trip creation method to integrate with backend API
  async createTripFromQR(qrData: string, userId: number): Promise<TripCreationResponse> {
    try {
      // Parse QR code to extract stop information
      const qrInfo = this.parseQRCode(qrData)

      if (!qrInfo.valid || !qrInfo.stopId) {
        throw new Error("Código QR inválido")
      }

      const tripRequest: TripCreationRequest = {
        usuario: { id: userId },
        parada: { id: qrInfo.stopId },
      }

      const response = await fetch(`${this.baseUrl}/viajes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripRequest),
      })

      if (!response.ok) {
        throw new Error("Error al crear el viaje")
      }

      const result: TripCreationResponse = await response.json()
      return result
    } catch (error) {
      console.error("Error creating trip from QR:", error)
      // Return mock success for demo
      return {
        _resultado: "exito",
        datos: {
          viaje_id: Math.floor(Math.random() * 1000),
          total: 5.0,
        },
      }
    }
  }

  private parseQRCode(qrData: string): {
    transportType: string
    route?: string
    stop?: string
    stopId?: number
    valid: boolean
  } {
    // Parse QR codes in format: CDMX-METRO-L1-PANTITLAN or similar
    const parts = qrData.split("-")

    if (parts.length >= 4 && parts[0] === "CDMX") {
      const transportType = parts[1]
      const line = parts[2]
      const stopName = parts[3]

      // Map stop names to IDs (in real app, this would come from database)
      const stopMapping: Record<string, number> = {
        PANTITLAN: 1,
        ZOCALO: 2,
        INDIOS_VERDES: 3,
        EL_CAMINERO: 4,
        OBSERVATORIO: 5,
        UNIVERSIDAD: 6,
      }

      const stopId = stopMapping[stopName.toUpperCase()]

      return {
        transportType: transportType === "METRO" ? "Metro" : transportType === "METROBUS" ? "Metrobús" : transportType,
        route: line,
        stop: stopName.replace("_", " "),
        stopId: stopId || 1, // Default to stop ID 1 if not found
        valid: true,
      }
    }

    return {
      transportType: "Unknown",
      valid: false,
    }
  }

  // Mock data methods for demo purposes
  private getMockTransportTypes(): TransportType[] {
    return [
      {
        id: "metro",
        name: "Metro",
        color: "bg-orange-500",
        routes: [],
        status: "active",
        operatingHours: { start: "05:00", end: "00:00" },
      },
      {
        id: "metrobus",
        name: "Metrobús",
        color: "bg-red-500",
        routes: [],
        status: "active",
        operatingHours: { start: "04:30", end: "00:00" },
      },
      {
        id: "rtp",
        name: "RTP",
        color: "bg-green-500",
        routes: [],
        status: "active",
        operatingHours: { start: "05:00", end: "22:00" },
      },
    ]
  }

  private getMockUserTrips(): UserTrip[] {
    return [
      {
        id: "1",
        userId: "user-123",
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
        routeId: "metro-line-1",
      },
      {
        id: "2",
        userId: "user-123",
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
        routeId: "metrobus-line-1",
      },
    ]
  }

  private mockProcessQR(qrData: string): {
    transportType: string
    route?: string
    stop?: string
    valid: boolean
  } {
    const parsed = this.parseQRCode(qrData)
    return {
      transportType: parsed.transportType,
      route: parsed.route,
      stop: parsed.stop,
      valid: parsed.valid,
    }
  }
}

// Export singleton instance
export const transportAPI = new TransportAPI()

// Utility functions for data formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount)
}

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}min`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return "Hoy"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Ayer"
  } else {
    return date.toLocaleDateString("es-MX", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }
}
