interface UsersListProps {
  users: string[]
  currentUser: string
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function UsersList({ users, currentUser }: UsersListProps) {
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase()
  }

  const getRandomColor = (name: string) => {
    const colors = ["bg-indigo-600", "bg-purple-600", "bg-blue-600", "bg-pink-600", "bg-violet-600"]

    // Simple hash function to get consistent color for the same name
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div className="overflow-y-auto h-full bg-gradient-to-b from-indigo-800 to-purple-900 text-white">
      <ul className="divide-y divide-indigo-700/30">
        {users.map((user) => (
          <li key={user} className="p-4 hover:bg-indigo-700/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-indigo-400">
                  <AvatarFallback className={`${getRandomColor(user)} text-sm`}>{getInitials(user)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-indigo-800" />
              </div>
              <div>
                <span className={`${user === currentUser ? "font-semibold" : ""} text-indigo-100`}>
                  {user} {user === currentUser && "(You)"}
                </span>
                <div className="text-xs text-indigo-300">Online</div>
              </div>
            </div>
          </li>
        ))}
        {users.length === 0 && <li className="p-4 text-indigo-300 text-center">No users online</li>}
      </ul>
    </div>
  )
}
