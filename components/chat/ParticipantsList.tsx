"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MicOff,
  VideoOff,
  Hand,
  Mic,
  Video,
  Crown,
  Shield,
  Zap,
  MoreHorizontal,
  Pin,
  Volume2,
  VolumeX,
  MessageSquare,
  Clock,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"

interface ParticipantsListProps {
  remoteUsers: any[]
  localUser: {
    id: string
    name: string
    isMuted: boolean
    isVideoOff: boolean
    isHandRaised?: boolean
    isSpeaking?: boolean
  }
  speakingUsers: Set<string>
  hostId:string
  raisedHands: Set<string>
  onMuteUser?: (userId: string) => void
  onPinUser?: (userId: string) => void
  onSendMessage?: (userId: string) => void
}

export function ParticipantsList({
  remoteUsers,
  hostId,
  localUser,
  speakingUsers,
  raisedHands,
  onMuteUser,
  onPinUser,
  onSendMessage,
}: ParticipantsListProps) {
  const [hoveredUser, setHoveredUser] = useState<string | null>(null)
  const [expandedUser, setExpandedUser] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "status">("name")
  const [showAnimation, setShowAnimation] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Simulate network quality for each user
  const [networkQuality, setNetworkQuality] = useState<Record<string, "excellent" | "good" | "poor">>({})

  useEffect(() => {
    // Initialize network quality for all users
    const quality: Record<string, "excellent" | "good" | "poor"> = {
      [localUser.id]: "excellent",
    }

    remoteUsers.forEach((user) => {
      const qualities: Array<"excellent" | "good" | "poor"> = ["excellent", "good", "poor"]
      quality[user.uid.toString()] = qualities[Math.floor(Math.random() * qualities.length)]
    })

    setNetworkQuality(quality)

    // Update network quality periodically
    const interval = setInterval(() => {
      const updatedQuality = { ...networkQuality }
      const randomUser =
        Math.random() > 0.5
          ? localUser.id
          : remoteUsers.length > 0
            ? remoteUsers[Math.floor(Math.random() * remoteUsers.length)].uid.toString()
            : localUser.id

      const qualities: Array<"excellent" | "good" | "poor"> = ["excellent", "good", "poor"]
      updatedQuality[randomUser] = qualities[Math.floor(Math.random() * qualities.length)]

      setNetworkQuality(updatedQuality)
    }, 10000)

    return () => clearInterval(interval)
  }, [remoteUsers.length])

  // Show animation when component mounts
  useEffect(() => {
    setShowAnimation(true)
    const timeout = setTimeout(() => setShowAnimation(false), 1500)
    return () => clearTimeout(timeout)
  }, [])

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const toggleExpandUser = (userId: string) => {
    if (expandedUser === userId) {
      setExpandedUser(null)
    } else {
      setExpandedUser(userId)
    }
  }

  const getFilteredUsers = () => {
    const allUsers = [
      {
        id: localUser.id,
        name: localUser.name,
        isLocal: true,
        isMuted: localUser.isMuted,
        isVideoOff: localUser.isVideoOff,
        isHandRaised: raisedHands.has(localUser.id),
        isSpeaking: speakingUsers.has(localUser.id),
      },
      ...remoteUsers.map((user) => ({
        id: user.uid.toString(),
        name: user.uid.toString().split("-")[4] || `User ${user.uid}`,
        isLocal: false,
        isMuted: !user.hasAudio,
        isVideoOff: !user.hasVideo,
        isHandRaised: raisedHands.has(user.uid),
        isSpeaking: speakingUsers.has(user.uid.toString()),
      })),
    ]

    let filtered = allUsers

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply status filters
    if (activeFilters.includes("muted")) {
      filtered = filtered.filter((user) => user.isMuted)
    }
    if (activeFilters.includes("video-off")) {
      filtered = filtered.filter((user) => user.isVideoOff)
    }
    if (activeFilters.includes("hand-raised")) {
      filtered = filtered.filter((user) => user.isHandRaised)
    }
    if (activeFilters.includes("speaking")) {
      filtered = filtered.filter((user) => user.isSpeaking)
    }

    // Apply sorting
    if (sortBy === "name") {
      filtered.sort((a, b) => {
        if (a.isLocal) return -1
        if (b.isLocal) return 1
        return a.name.localeCompare(b.name)
      })
    } else if (sortBy === "status") {
      filtered.sort((a, b) => {
        if (a.isLocal) return -1
        if (b.isLocal) return 1
        if (a.isSpeaking && !b.isSpeaking) return -1
        if (!a.isSpeaking && b.isSpeaking) return 1
        if (a.isHandRaised && !b.isHandRaised) return -1
        if (!a.isHandRaised && b.isHandRaised) return 1
        return 0
      })
    }

    return filtered
  }

  const filteredUsers = getFilteredUsers()

  const getNetworkQualityColor = (quality: "excellent" | "good" | "poor") => {
    switch (quality) {
      case "excellent":
        return "bg-emerald-500 dark:bg-emerald-400"
      case "good":
        return "bg-blue-500 dark:bg-blue-400"
      case "poor":
        return "bg-amber-500 dark:bg-amber-400"
    }
  }

  return (
    <div className="flex flex-col w-full items-center h-full  overflow-hidden transition-all duration-500 ease-in-out px-1 py-2">
      {/* Header with animated count */}
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center w-full space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative "
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30 blur-sm"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-full px-2.5 py-1 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {remoteUsers.length + 1}
              </span>
            </div>
          </motion.div>
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Participants</h3>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-1 w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded-full",
                    activeFilters.includes("muted")
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                  onClick={() => toggleFilter("muted")}
                >
                  <MicOff className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50"
              >
                Filter muted
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded-full",
                    activeFilters.includes("video-off")
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                  onClick={() => toggleFilter("video-off")}
                >
                  <VideoOff className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50"
              >
                Filter video off
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded-full",
                    activeFilters.includes("hand-raised")
                      ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                  onClick={() => toggleFilter("hand-raised")}
                >
                  <Hand className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50"
              >
                Filter raised hands
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Search input */}
      <div className="relative my-2 w-full">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 blur-sm"></div>
        <input
          type="text"
          placeholder="Search participants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-1.5 px-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-500/30 relative"
        />
      </div>

      {/* Participants list with dimensional cards */}
      <div className="space-y-3 mt-2 h-full w-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <AnimatePresence>
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: index * 0.05,
                  duration: 0.3,
                },
              }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.02 }}
              className={cn("relative group cursor-pointer", expandedUser === user.id ? "z-10" : "z-0")}
              onClick={() => toggleExpandUser(user.id)}
              onMouseEnter={() => setHoveredUser(user.id)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              {/* Background with gradient border */}
              <div
                className={cn(
                  "absolute -inset-px rounded-xl transition-all duration-300",
                  expandedUser === user.id || hoveredUser === user.id
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-100"
                    : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 opacity-50",
                )}
              ></div>

              {/* Card content */}
              <div
                className={cn(
                  "relative p-3 rounded-xl transition-all duration-300",
                  expandedUser === user.id
                    ? "bg-white dark:bg-gray-800"
                    : "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm",
                )}
              >
                <div className="flex items-center justify-between">
                  {/* User avatar and info */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* Avatar with status indicators */}
                      <div className={cn("relative", user.isSpeaking && "animate-pulse")}>
                        <div
                          className={cn(
                            "absolute -inset-0.5 rounded-full transition-opacity duration-300",
                            user.isSpeaking
                              ? "bg-gradient-to-r from-green-400 to-emerald-500 opacity-100"
                              : user.isHandRaised
                                ? "bg-gradient-to-r from-amber-400 to-yellow-500 opacity-100"
                                : "bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100",
                          )}
                        ></div>
                        <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
                          {user.isLocal ? (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Y</span>
                            </div>
                          ) : (
                            <>
                              <AvatarImage src={`https://avatar.vercel.sh/${user.id}`} />
                              <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300">
                                {user.name[0]}
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>

                        {/* Network quality indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center p-0.5">
                          <div
                            className={cn(
                              "w-full h-full rounded-full",
                              getNetworkQualityColor(networkQuality[user.id] || "good"),
                            )}
                          >
                            <span
                              className="absolute -inset-0.5 rounded-full animate-ping opacity-75"
                              style={{
                                backgroundColor: isDark
                                  ? networkQuality[user.id] === "excellent"
                                    ? "rgb(52, 211, 153)"
                                    : networkQuality[user.id] === "good"
                                      ? "rgb(59, 130, 246)"
                                      : "rgb(245, 158, 11)"
                                  : networkQuality[user.id] === "excellent"
                                    ? "rgb(16, 185, 129)"
                                    : networkQuality[user.id] === "good"
                                      ? "rgb(37, 99, 235)"
                                      : "rgb(217, 119, 6)",
                              }}
                            ></span>
                          </div>
                        </div>
                      </div>

                      {/* Role badge */}
                      {(user.id.toString()).split('-')[0] === hostId && (
                        <div className="absolute -top-1 -left-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full p-0.5 shadow-md">
                          <div className="bg-white dark:bg-gray-800 rounded-full p-0.5">
                            <Crown className="h-2.5 w-2.5 text-amber-500" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <p
                          className={cn(
                            "text-sm font-medium transition-colors",
                            user.isLocal ? "text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300",
                          )}
                        >
                          {user.name}
                        </p>

                        {/* Status badges */}
                        {user.isSpeaking && (
                          <Badge
                            variant="outline"
                            className="h-4 px-1 py-0 text-[10px] border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                          >
                            Speaking
                          </Badge>
                        )}

                        {user.isHandRaised && (
                          <Badge
                            variant="outline"
                            className="h-4 px-1 py-0 text-[10px] border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          >
                            Hand Raised
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(user.id.toString()).split('-')[0] === hostId ? "Host" : "Participant"}
                      </p>
                    </div>
                  </div>

                  {/* Status icons */}
                  <div className="flex items-center gap-1.5">
                    {user.isMuted ? (
                      <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <MicOff className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Mic className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                    )}

                    {user.isVideoOff ? (
                      <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <VideoOff className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Video className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}

                    {!user.isLocal && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                            <MoreHorizontal className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50"
                        >
                          <DropdownMenuItem onClick={() => onPinUser?.(user.id)} className="text-xs cursor-pointer">
                            <Pin className="mr-2 h-3.5 w-3.5 text-indigo-500" />
                            Pin to screen
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onMuteUser?.(user.id)} className="text-xs cursor-pointer">
                            {user.isMuted ? (
                              <>
                                <Volume2 className="mr-2 h-3.5 w-3.5 text-green-500" />
                                Unmute for me
                              </>
                            ) : (
                              <>
                                <VolumeX className="mr-2 h-3.5 w-3.5 text-red-500" />
                                Mute for me
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onSendMessage?.(user.id)} className="text-xs cursor-pointer">
                            <MessageSquare className="mr-2 h-3.5 w-3.5 text-purple-500" />
                            Send message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>

                {/* Expanded view with additional details */}
                <AnimatePresence>
                  {expandedUser === user.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              getNetworkQualityColor(networkQuality[user.id] || "good"),
                            )}
                          ></div>
                          <span className="text-gray-600 dark:text-gray-400">
                            {networkQuality[user.id] || "good"} connection
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Zap className="h-3 w-3 text-amber-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {user.isLocal ? "Host privileges" : "Participant"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Shield className="h-3 w-3 text-indigo-500" />
                          <span className="text-gray-600 dark:text-gray-400">Secure connection</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">Joined 5m ago</span>
                        </div>
                      </div>

                      {!user.isLocal && (
                        <div className="mt-3 flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            onClick={() => onPinUser?.(user.id)}
                          >
                            <Pin className="mr-1 h-3 w-3" />
                            Pin
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            onClick={() => onMuteUser?.(user.id)}
                          >
                            {user.isMuted ? (
                              <>
                                <Volume2 className="mr-1 h-3 w-3" />
                                Unmute
                              </>
                            ) : (
                              <>
                                <VolumeX className="mr-1 h-3 w-3" />
                                Mute
                              </>
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            onClick={() => onSendMessage?.(user.id)}
                          >
                            <MessageSquare className="mr-1 h-3 w-3" />
                            Message
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Animated connection lines between participants */}
              {showAnimation && index > 0 && (
                <motion.div
                  className="absolute left-5 -top-3 w-px h-3 bg-gradient-to-b from-transparent to-indigo-500/50 dark:to-indigo-400/50"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">No participants match your filters</p>
            <Button
              variant="link"
              size="sm"
              className="mt-2 h-auto p-0 text-xs text-indigo-600 dark:text-indigo-400"
              onClick={() => {
                setActiveFilters([])
                setSearchQuery("")
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

