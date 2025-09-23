"use client"

import { QRScannerSection } from "@/components/qr-scanner-section"
import { TransportTypesSection } from "@/components/transport-types-section"
import { TripHistorySection } from "@/components/trip-history-section"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { useTransportTypes, useUserTrips } from "@/hooks/use-transport-data"
import { useState } from "react"

export default function HomePage() {
  const { transportTypes, loading: transportLoading, refetch: refetchTransport } = useTransportTypes()
  const { trips, loading: tripsLoading, refetch: refetchTrips } = useUserTrips("user-123")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await Promise.all([refetchTransport(), refetchTrips()])
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="container mx-auto px-4 py-6 max-w-md">
          {/* QR Scanner Section - Takes ~1/4 of screen */}
          <div className="mb-6">
            <QRScannerSection
              onScanResult={(result) => {
                console.log("QR Scanned:", result)
                if ("vibrate" in navigator) {
                  navigator.vibrate(100)
                }
              }}
            />
          </div>

          {/* Transport Types Section */}
          <div className="mb-6">
            <TransportTypesSection
              onTransportSelect={(transport) => {
                console.log("Transport selected:", transport)
                if ("vibrate" in navigator) {
                  navigator.vibrate(50)
                }
              }}
            />
          </div>

          {/* Trip History Section */}
          <div className="mb-6">
            <TripHistorySection
              onTripSelect={(trip) => {
                console.log("Trip selected:", trip)
                if ("vibrate" in navigator) {
                  navigator.vibrate(50)
                }
              }}
            />
          </div>
        </div>
      </PullToRefresh>
    </main>
  )
}
