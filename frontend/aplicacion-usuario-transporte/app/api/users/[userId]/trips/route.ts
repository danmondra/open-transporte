import { type NextRequest, NextResponse } from "next/server"

// Mock user trips data
const mockTrips = [
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
  {
    id: "3",
    userId: "user-123",
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
    routeId: "ecobici-roma-condesa",
  },
  {
    id: "4",
    userId: "user-123",
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
    routeId: "rtp-observatorio-centro",
  },
  {
    id: "5",
    userId: "user-123",
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
    routeId: "cablebus-line-1",
  },
]

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Filter trips by user ID and apply pagination
    const userTrips = mockTrips.filter((trip) => trip.userId === userId).slice(offset, offset + limit)

    return NextResponse.json(userTrips)
  } catch (error) {
    console.error("Error fetching user trips:", error)
    return NextResponse.json({ error: "Failed to fetch user trips" }, { status: 500 })
  }
}
