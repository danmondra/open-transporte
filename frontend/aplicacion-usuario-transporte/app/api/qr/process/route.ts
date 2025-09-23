import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { qrData } = await request.json()

    if (!qrData) {
      return NextResponse.json({ error: "QR data is required" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock QR code processing logic
    let result = {
      transportType: "Unknown",
      route: undefined as string | undefined,
      stop: undefined as string | undefined,
      valid: false,
    }

    // Parse different QR code formats
    if (qrData.includes("CDMX-METRO")) {
      const parts = qrData.split("-")
      result = {
        transportType: "Metro",
        route: parts[2] || "Línea 1",
        stop: parts[3] || "Pantitlán",
        valid: true,
      }
    } else if (qrData.includes("CDMX-METROBUS")) {
      const parts = qrData.split("-")
      result = {
        transportType: "Metrobús",
        route: parts[2] || "Línea 1",
        stop: parts[3] || "Indios Verdes",
        valid: true,
      }
    } else if (qrData.includes("CDMX-RTP")) {
      result = {
        transportType: "RTP",
        route: "Ruta 1",
        stop: "Terminal Observatorio",
        valid: true,
      }
    } else if (qrData.includes("CDMX-ECOBICI")) {
      result = {
        transportType: "Ecobici",
        route: "Red de Cicloestaciones",
        stop: "Estación Roma Norte",
        valid: true,
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing QR code:", error)
    return NextResponse.json({ error: "Failed to process QR code" }, { status: 500 })
  }
}
