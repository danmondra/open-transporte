"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
}

export function PullToRefresh({ onRefresh, children, threshold = 80 }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      setIsPulling(true)
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isPulling || window.scrollY > 0) return

      const currentY = e.touches[0].clientY
      const distance = Math.max(0, currentY - startY.current)

      if (distance > 0) {
        e.preventDefault()
        setPullDistance(Math.min(distance, threshold * 1.5))
      }
    },
    [isPulling, threshold],
  )

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return

    setIsPulling(false)

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }

    setPullDistance(0)
  }, [isPulling, pullDistance, threshold, isRefreshing, onRefresh])

  const pullProgress = Math.min(pullDistance / threshold, 1)
  const shouldTrigger = pullDistance >= threshold

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className={`absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 ${
          isPulling || isRefreshing ? "opacity-100" : "opacity-0"
        }`}
        style={{
          height: Math.max(pullDistance, isRefreshing ? 60 : 0),
          transform: `translateY(${isPulling ? 0 : -60}px)`,
        }}
      >
        <div className="flex items-center gap-2 text-primary">
          <RefreshCw
            size={20}
            className={`transition-transform duration-200 ${
              isRefreshing ? "animate-spin" : shouldTrigger ? "rotate-180" : ""
            }`}
            style={{
              transform: `rotate(${pullProgress * 180}deg)`,
            }}
          />
          <span className="text-sm font-medium">
            {isRefreshing ? "Actualizando..." : shouldTrigger ? "Suelta para actualizar" : "Desliza para actualizar"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${isPulling ? pullDistance : isRefreshing ? 60 : 0}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
