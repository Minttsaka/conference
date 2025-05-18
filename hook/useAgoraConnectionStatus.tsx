"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Define connection quality types
type ConnectionQuality = 'excellent' | 'good' | 'poor' | 'unknown'
type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected'

// Hook to get Agora connection status
export function useAgoraConnectionStatus(client: any) {
  const [connectionQuality, setConnectionQuality] = useState<ConnectionQuality>('unknown')
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting')
  
  useEffect(() => {
    if (!client) return
    
    // Set up Agora client event listeners for connection status
    const handleConnectionStateChange = (curState: string, prevState: string, reason?: string) => {
      console.log(`Connection state changed from ${prevState} to ${curState}. Reason: ${reason}`)
      
      // Map Agora connection states to our app's connection states
      switch (curState) {
        case 'CONNECTING':
          setConnectionStatus('connecting')
          break
        case 'CONNECTED':
          setConnectionStatus('connected')
          break
        case 'RECONNECTING':
          setConnectionStatus('reconnecting')
          break
        case 'DISCONNECTED':
          setConnectionStatus('disconnected')
          break
        default:
          break
      }
    }
    
    // Handle network quality changes directly from Agora
    const handleNetworkQuality = (stats: any) => {
      const { downlinkNetworkQuality, uplinkNetworkQuality } = stats
      
      // Agora uses 0-6 scale where:
      // 0: Unknown
      // 1: Excellent
      // 2: Good
      // 3: Fair
      // 4: Poor
      // 5: Bad
      // 6: Very Bad
      
      // Take the worse of uplink and downlink quality
      const worstQuality = Math.max(downlinkNetworkQuality, uplinkNetworkQuality)
      
      let quality: ConnectionQuality = 'unknown'
      
      switch (worstQuality) {
        case 0:
          quality = 'unknown'
          break
        case 1:
        case 2:
          quality = 'excellent'
          break
        case 3:
        case 4:
          quality = 'good'
          break
        case 5:
        case 6:
          quality = 'poor'
          break
        default:
          quality = 'unknown'
      }
      
      setConnectionQuality(quality)
    }
    
    // Register event handlers
    client.on('connection-state-change', handleConnectionStateChange)
    client.on('network-quality', handleNetworkQuality)
    
    // Clean up
    return () => {
      client.off('connection-state-change', handleConnectionStateChange)
      client.off('network-quality', handleNetworkQuality)
    }
  }, [client])
  
  return {
    connectionQuality,
    connectionStatus
  }
}

interface ConnectionStatusIndicatorProps {
  client: any
  className?: string
}

export function ConnectionStatusIndicator({ client, className }: ConnectionStatusIndicatorProps) {
  const { connectionQuality, connectionStatus } = useAgoraConnectionStatus(client)
  
  // Don't show anything while connecting initially
  if (connectionStatus === 'connecting') {
    return (
        <div className="hidden absolute inset-0 xl:flex flex-col items-center justify-center bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm z-50">
        <div className="relative max-w-md w-full mx-4">
          {/* Animated background glow */}
          <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 blur-2xl animate-pulse"></div>
          
          {/* Main container */}
          <div className="relative bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center">
            {/* Logo */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center rounded-xl shadow-lg mb-5">
              <span className="text-white text-xl font-bold">A</span>
            </div>
            
            {/* Connection animation */}
            <div className="relative w-full h-10 mb-5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-indigo-400 rounded-full animate-pulse opacity-50"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border border-indigo-400/50 rounded-full animate-pulse opacity-30"></div>
              </div>
            </div>
            
            {/* Status text */}
            <h2 className="text-lg sm:text-xl font-medium text-white mb-2">Connecting to Meeting</h2>
            <p className="text-xs sm:text-sm text-gray-300 text-center max-w-md mb-4">
              Establishing secure connection to the video conference...
            </p>
            
            {/* Connection steps */}
            <div className="w-full max-w-xs space-y-2 mb-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mr-2"></div>
                <div className="flex-grow">
                  <div className="h-1 bg-emerald-500 rounded-full"></div>
                </div>
                <span className="text-xs text-emerald-400 ml-2">Initializing</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mr-2"></div>
                <div className="flex-grow">
                  <div className="h-1 bg-emerald-500 rounded-full"></div>
                </div>
                <span className="text-xs text-emerald-400 ml-2">Authenticating</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-indigo-500 flex-shrink-0 mr-2 animate-pulse"></div>
                <div className="flex-grow">
                  <div className="h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-full">
                    <div className="h-full w-1/2 bg-indigo-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <span className="text-xs text-indigo-400 ml-2">Connecting</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gray-600 flex-shrink-0 mr-2"></div>
                <div className="flex-grow">
                  <div className="h-1 bg-gray-600 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">Joining Room</span>
              </div>
            </div>
            
            {/* Network status */}
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
              <span>Establishing network connection</span>
            </div>
          </div>
        </div>
      </div>
    )
  }


  
  // Show reconnecting status
  if (connectionStatus === 'reconnecting') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`relative hidden md:flex text-white ${className}`}
      >
        <div className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/50 dark:border-gray-700/50 shadow-md bg-gradient-to-r from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/10 text-amber-700 dark:text-amber-300">
          <div className="relative w-2.5 h-2.5 rounded-full bg-amber-500">
            <span className="absolute inset-0 rounded-full animate-ping bg-amber-500/50"></span>
          </div>
          <span className="text-xs font-medium">Reconnecting...</span>
        </div>
      </motion.div>
    )
  }
  
  // Show disconnected status
  if (connectionStatus === 'disconnected') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`relative hidden text-white md:flex ${className}`}
      >
        <div className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/50 dark:border-gray-700/50 shadow-md bg-gradient-to-r from-red-500/10 to-red-500/5 dark:from-red-500/20 dark:to-red-500/10 text-red-700 dark:text-red-300">
          <div className="relative w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <span className="text-xs font-medium">Disconnected</span>
        </div>
      </motion.div>
    )
  }
  
  // Show connection quality for connected state
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`relative hidden md:flex group text-white ${className}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>
      <div
        className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/50 dark:border-gray-700/50 shadow-md
        ${
          connectionQuality === "excellent"
            ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : connectionQuality === "good"
              ? "bg-gradient-to-r from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10 text-blue-700 dark:text-blue-300"
              : "bg-gradient-to-r from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/10 text-amber-700 dark:text-amber-300"
        }`}
      >
        <div
          className={`relative w-2.5 h-2.5 rounded-full 
          ${
            connectionQuality === "excellent"
              ? "bg-emerald-500"
              : connectionQuality === "good"
                ? "bg-blue-500"
                : "bg-amber-500"
          }`}
        >
          <span
            className={`absolute inset-0 rounded-full animate-ping 
            ${
              connectionQuality === "excellent"
                ? "bg-emerald-500/50"
                : connectionQuality === "good"
                  ? "bg-blue-500/50"
                  : "bg-amber-500/50"
            }`}
          ></span>
        </div>
        <span className="text-xs text-white font-medium">
          {connectionQuality.charAt(0).toUpperCase() + connectionQuality.slice(1)}
        </span>
      </div>
    </motion.div>
  )
}

// Mobile version for dropdown menu
export function ConnectionStatusIndicatorMobile({ client }: { client: any }) {
  const { connectionQuality, connectionStatus } = useAgoraConnectionStatus(client)
  
  // For disconnected or reconnecting states
  if (connectionStatus === 'disconnected' || connectionStatus === 'reconnecting') {
    return (
      <div className="flex items-center w-full">
        <div
          className={`relative w-2.5 h-2.5 rounded-full mr-2
          ${connectionStatus === 'reconnecting' ? 'bg-amber-500' : 'bg-red-500'}`}
        >
          {connectionStatus === 'reconnecting' && (
            <span className="absolute inset-0 rounded-full animate-ping bg-amber-500/50"></span>
          )}
        </div>
        <span className="text-sm font-medium">
          {connectionStatus === 'reconnecting' ? 'Reconnecting...' : 'Disconnected'}
        </span>
      </div>
    )
  }
  
  // For connecting state
  if (connectionStatus === 'connecting') {
    return (
      <div className="flex items-center w-full">
        <div className="relative w-2.5 h-2.5 rounded-full mr-2 bg-gray-500">
          <span className="absolute inset-0 rounded-full animate-pulse bg-gray-500/50"></span>
        </div>
        <span className="text-sm font-medium">Connecting...</span>
      </div>
    )
  }
  
  // For connected state with quality indicator
  return (
    <div className="flex  text-white items-center w-full">
      <div
        className={`relative w-2.5 h-2.5 rounded-full mr-2
        ${
          connectionQuality === "excellent"
            ? "bg-emerald-500"
            : connectionQuality === "good"
              ? "bg-blue-500"
              : "bg-amber-500"
        }`}
      >
        <span
          className={`absolute inset-0 rounded-full animate-ping 
          ${
            connectionQuality === "excellent"
              ? "bg-emerald-500/50"
              : connectionQuality === "good"
                ? "bg-blue-500/50"
                : "bg-amber-500/50"
          }`}
        ></span>
      </div>
      <span className="text-sm font-medium">
        {connectionQuality.charAt(0).toUpperCase() + connectionQuality.slice(1)} Connection
      </span>
    </div>
  )
}

