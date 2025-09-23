import { type NextRequest, NextResponse } from "next/server"

// Mock transport types data
const transportTypes = [
  {
    id: "metro",
    name: "Metro",
    color: "bg-orange-500",
    routes: 12,
    status: "active",
    operatingHours: { start: "05:00", end: "00:00" },
  },
  {
    id: "metrobus",
    name: "Metrobús",
    color: "bg-red-500",
    routes: 7,
    status: "active",
    operatingHours: { start: "04:30", end: "00:00" },
  },
  {
    id: "rtp",
    name: "RTP",
    color: "bg-green-500",
    routes: 95,
    status: "active",
    operatingHours: { start: "05:00", end: "22:00" },
  },
  {
    id: "trolebus",
    name: "Trolebús",
    color: "bg-blue-500",
    routes: 8,
    status: "limited",
    operatingHours: { start: "05:30", end: "22:30" },
  },
  {
    id: "tren-ligero",
    name: "Tren Ligero",
    color: "bg-purple-500",
    routes: 1,
    status: "active",
    operatingHours: { start: "05:00", end: "00:00" },
  },
  {
    id: "cablebus",
    name: "Cablebús",
    color: "bg-teal-500",
    routes: 2,
    status: "active",
    operatingHours: { start: "05:00", end: "22:00" },
  },
  {
    id: "ecobici",
    name: "Ecobici",
    color: "bg-lime-500",
    routes: 480,
    status: "active",
    operatingHours: { start: "05:00", end: "00:00" },
  },
]

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(transportTypes)
  } catch (error) {
    console.error("Error fetching transport types:", error)
    return NextResponse.json({ error: "Failed to fetch transport types" }, { status: 500 })
  }
}
