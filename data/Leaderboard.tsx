// Leaderboard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import LeaderboardList from './LeaderboardList';
import { getInitialData, generateRandomUpdate } from './data';
import { LeaderboardProps, User } from './types';

const Leaderboard: React.FC<LeaderboardProps> = ({ points = {} }) => {
  const [data, setData] = useState<User[]>(getInitialData());
  const [previousData, setPreviousData] = useState<User[] | null>(null);

  // Sort data by score and update when points change
  const sortedData = useMemo(() => {
    const updatedData = data.map(user => ({
      ...user,
      score: points[user.userID] !== undefined ? points[user.userID] : user.score
    }));
    
    return updatedData.sort((a, b) => b.score - a.score);
  }, [data, points]);

  // Track changes for animations
  useEffect(() => {
    const currentDataString = JSON.stringify(sortedData);
    const previousDataString = JSON.stringify(previousData);
    
    if (currentDataString !== previousDataString) {
      setPreviousData([...sortedData]);
    }
  }, [sortedData, previousData]);

  // Simulate real-time updates for demo (you can remove this in production)
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => generateRandomUpdate(prevData));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            🏆 Live Leaderboard
          </h1>
          <p className="text-white/80 text-lg">Real-time ranking updates</p>
          <div className="mt-4 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-white font-semibold">
                {sortedData.length} Competitors
              </span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
          <LeaderboardList data={sortedData} previousData={previousData} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p>Updates automatically • Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;