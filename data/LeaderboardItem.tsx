// LeaderboardItem.tsx
import React from 'react';
import { Trophy, Medal, Award, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { LeaderboardItemProps, User } from '../frontend/src/types';

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ 
  row, 
  rank, 
  previousRank, 
  isAnimating 
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600">
            #{rank}
          </span>
        );
    }
  };

  const getRankChange = () => {
    if (previousRank === undefined || previousRank === rank) return null;
    if (previousRank > rank) {
      return <TrendingUp className="w-4 h-4 text-green-500 ml-2" />;
    } else {
      return <TrendingDown className="w-4 h-4 text-red-500 ml-2" />;
    }
  };

  const getRankBgColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-100 to-amber-50 border-amber-300';
      default:
        return 'bg-gradient-to-r from-blue-50 to-white border-blue-200';
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.displayName)}&background=random&color=fff`;
  };

  return (
    <li 
      className={`
        flex items-center justify-between p-4 border-2 rounded-lg mb-3 
        transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg
        ${getRankBgColor(rank)}
        ${isAnimating ? 'animate-pulse' : ''}
      `}
      style={{
        transform: isAnimating ? 'translateX(10px)' : 'translateX(0)',
      }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {getRankIcon(rank)}
          {getRankChange()}
        </div>
        
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img
            className="w-full h-full object-cover"
            src={row.picture}
            alt={row.displayName}
            onError={handleImageError}
          />
        </div>
        
        <span className="font-semibold text-gray-800 text-lg">
          {row.displayName}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Star className="w-4 h-4 text-yellow-500" />
        <span className="font-mono text-xl font-bold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm">
          {row.score.toLocaleString()}
        </span>
      </div>
    </li>
  );
};

export default LeaderboardItem;