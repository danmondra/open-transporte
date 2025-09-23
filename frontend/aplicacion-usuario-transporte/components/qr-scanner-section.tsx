"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QrCode, ChevronDown, ChevronUp, X } from "lucide-react"
import { useQRProcessor, useQRTripCreator } from "@/hooks/use-transport-data"

interface QRScannerSectionProps {
  onScanResult?: (result: string) => void
  userId?: number
}

export function QRScannerSection({ onScanResult, userId = 1 }: QRScannerSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const { processQR, processing, result } = useQRProcessor()
  const { createTripFromQR, creating, result: tripResult, clearResult: clearTripResult } = useQRTripCreator()

  const [touchStart, setTouchStart] = useState<{ y: number; time: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ y: touch.clientY, time: Date.now() })
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touch = e.touches[0]
    const deltaY = touch.clientY - touchStart.y

    // Only allow downward swipe when collapsed, upward when expanded
    if ((!isExpanded && deltaY > 10) || (isExpanded && deltaY < -10)) {
      setIsDragging(true)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !isDragging) {
      setTouchStart(null)
      setIsDragging(false)
      return
    }

    const touch = e.changedTouches[0]
    const deltaY = touch.clientY - touchStart.y
    const deltaTime = Date.now() - touchStart.time
    const velocity = Math.abs(deltaY) / deltaTime

    // Trigger expansion/collapse based on swipe distance and velocity
    if ((deltaY > 50 || velocity > 0.5) && !isExpanded) {
      handleExpand()
    } else if ((deltaY < -50 || velocity > 0.5) && isExpanded) {
      handleExpand()
    }

    setTouchStart(null)
    setIsDragging(false)
  }

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      // Simulate QR scan for demo purposes
      setTimeout(async () => {
        const mockResult = "CDMX-METRO-L1-PANTITLAN"
        setScanResult(mockResult)
        onScanResult?.(mockResult)

        const qrInfo = await processQR(mockResult)
        if (qrInfo?.valid) {
          await createTripFromQR(mockResult, userId)
        }
        setIsScanning(false)
      }, 2000)
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      clearTripResult()
      startScanning()
    } else {
      stopScanning()
      setScanResult(null)
    }
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <div className="relative">
      {/* Main QR Section - Always visible */}
      <Card
        ref={cardRef}
        className={`bg-primary text-primary-foreground cursor-pointer transition-all duration-300 ease-in-out ${
          isDragging ? "scale-[0.98]" : "hover:scale-[1.02]"
        }`}
        onClick={handleExpand}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <QrCode size={32} />
            <h1 className="text-2xl font-bold">Escanear QR</h1>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            {isDragging
              ? isExpanded
                ? "Desliza hacia arriba para cerrar"
                : "Desliza hacia abajo para abrir"
              : "Escanea el código QR de tu transporte público"}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">{isExpanded ? "Cerrar escáner" : "Abrir escáner"}</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </Card>

      {/* Expanded Scanner */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Card className="mt-2 bg-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Escáner QR Activo</h3>
              <Button variant="ghost" size="sm" onClick={handleExpand}>
                <X size={20} />
              </Button>
            </div>

            {/* Camera/Scanner Area */}
            <div className="relative bg-muted rounded-lg overflow-hidden mb-4" style={{ aspectRatio: "16/9" }}>
              {isScanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  {/* Scanner overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-primary rounded-lg relative animate-pulse">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <QrCode size={48} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">{processing ? "Procesando..." : "Cámara iniciando..."}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Scan Result */}
            {(scanResult || result) && (
              <div className="bg-accent p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-accent-foreground mb-2">
                  {result?.valid ? "✅ Código válido" : "Código escaneado:"}
                </h4>
                {result && result.valid && (
                  <div className="space-y-1 mb-2">
                    <p className="text-sm text-accent-foreground">
                      <strong>Transporte:</strong> {result.transportType}
                    </p>
                    {result.route && (
                      <p className="text-sm text-accent-foreground">
                        <strong>Ruta:</strong> {result.route}
                      </p>
                    )}
                    {result.stop && (
                      <p className="text-sm text-accent-foreground">
                        <strong>Parada:</strong> {result.stop}
                      </p>
                    )}
                  </div>
                )}

                {creating && (
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
                    <p className="text-sm font-medium">🔄 Creando viaje...</p>
                  </div>
                )}

                {tripResult && (
                  <div
                    className={`p-3 rounded-lg ${
                      tripResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {tripResult.success ? "✅" : "❌"} {tripResult.message}
                    </p>
                    {tripResult.success && tripResult.tripId && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs">
                          <strong>ID del viaje:</strong> {tripResult.tripId}
                        </p>
                        <p className="text-xs">
                          <strong>Total:</strong> ${tripResult.total?.toFixed(2)} MXN
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm text-accent-foreground font-mono">{scanResult}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="text-sm text-muted-foreground text-center">
              Coloca el código QR dentro del marco para escanearlo
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
