






import { Trophy, Medal, Award, User } from "lucide-react"

const LeaderboardList = ({
  username,
  points,
  rank,
  isTopThree,
}: {
  username: string
  points: number
  rank: number
  isTopThree: boolean
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} className="text-yellow-400" />
      case 2:
        return <Medal size={24} className="text-gray-300" />
      case 3:
        return <Award size={24} className="text-amber-600" />
      default:
        return <User size={20} className="text-gray-400" />
    }
  }

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
          text: "text-yellow-400",
          rankBg: "bg-yellow-500/20",
        }
      case 2:
        return {
          bg: "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30",
          text: "text-gray-300",
          rankBg: "bg-gray-400/20",
        }
      case 3:
        return {
          bg: "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30",
          text: "text-amber-500",
          rankBg: "bg-amber-600/20",
        }
      default:
        return {
          bg: "bg-gray-800 border-gray-700",
          text: "text-gray-300",
          rankBg: "bg-gray-700",
        }
    }
  }

  const colors = getRankColors(rank)

  return (
    <div
      className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${colors.bg} ${
        isTopThree ? "shadow-lg" : ""
      }`}
    >
      {/* Rank */}
      <div className={`${colors.rankBg} rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0`}>
        {isTopThree ? getRankIcon(rank) : <span className="text-gray-400 font-bold text-lg">#{rank}</span>}
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h3 className={`text-xl font-bold ${colors.text}`}>{username}</h3>
        <p className="text-gray-400 text-sm">Participant</p>
      </div>

      {/* Points */}
      <div className="text-right">
        <div className={`text-2xl font-bold ${colors.text}`}>{points}</div>
        <p className="text-gray-400 text-sm">{points === 1 ? "point" : "points"}</p>
      </div>
    </div>
  )
}

export default LeaderboardList
