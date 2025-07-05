


import LeaderboardList from "./LeaderboardList"
import type { UserPointsType } from "../types"
import { Users } from "lucide-react"

const Leaderboard = ({ data }: { data: UserPointsType[] }) => {
  // Sort data by points in descending order
  const sortedData = [...data].sort((a, b) => b.points - a.points)

  return (
    <div className="space-y-4">
      {sortedData.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-700/50 text-gray-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users size={32} />
          </div>
          <p className="text-gray-400 text-lg">No scores yet.</p>
          <p className="text-gray-500 text-sm mt-2">Scores will appear here once the quiz begins.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedData.map((item, index) => (
            <LeaderboardList
              key={`${item.username}-${index}`}
              username={item.username}
              points={item.points}
            //   rank={index + 1}
              rank={1}
              isTopThree={true}
                 //   isTopThree={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Leaderboard

