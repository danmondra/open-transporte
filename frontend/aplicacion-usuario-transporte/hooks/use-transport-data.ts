"use client"

import { useState, useEffect } from "react"
import { transportAPI, type TransportType, type UserTrip } from "@/lib/api"

export function useTransportTypes() {
  const [transportTypes, setTransportTypes] = useState<TransportType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransportTypes = async () => {
    try {
      setLoading(true)
      const data = await transportAPI.getTransportTypes()
      setTransportTypes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch transport types")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransportTypes()
  }, [])

  return { transportTypes, loading, error, refetch: fetchTransportTypes }
}

export function useUserTrips(userId: string, limit = 10) {
  const [trips, setTrips] = useState<UserTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const data = await transportAPI.getUserTrips(userId, limit)
      setTrips(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch trips")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchTrips()
    }
  }, [userId, limit])

  return { trips, loading, error, refetch: fetchTrips }
}

export function useQRTripCreator() {
  const [creating, setCreating] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    tripId?: number
    total?: number
    message?: string
  } | null>(null)

  const createTripFromQR = async (qrData: string, userId: number) => {
    try {
      setCreating(true)
      const response = await transportAPI.createTripFromQR(qrData, userId)

      if (response._resultado === "exito" && response.datos) {
        setResult({
          success: true,
          tripId: response.datos.viaje_id,
          total: response.datos.total,
          message: "Viaje creado exitosamente",
        })
        return response.datos
      } else {
        setResult({
          success: false,
          message: response.mensaje || "Error al crear el viaje",
        })
        return null
      }
    } catch (error) {
      console.error("Error creating trip:", error)
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido",
      })
      return null
    } finally {
      setCreating(false)
    }
  }

  return {
    createTripFromQR,
    creating,
    result,
    clearResult: () => setResult(null),
  }
}

export function useQRProcessor() {
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<{
    transportType: string
    route?: string
    stop?: string
    valid: boolean
  } | null>(null)

  const processQR = async (qrData: string) => {
    try {
      setProcessing(true)
      const data = await transportAPI.processQRCode(qrData)
      setResult(data)
      return data
    } catch (error) {
      console.error("Error processing QR:", error)
      return null
    } finally {
      setProcessing(false)
    }
  }

  return { processQR, processing, result, clearResult: () => setResult(null) }
}
