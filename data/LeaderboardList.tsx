// LeaderboardList.tsx
import React, { useState, useEffect } from 'react';
import LeaderboardItem from '../../../data/LeaderboardItem';
import { LeaderboardListProps, User } from '../types';

const LeaderboardList: React.FC<LeaderboardListProps> = ({ data, previousData }) => {
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (previousData) {
      const changedItems = new Set<string>();
      
      data.forEach((item, index) => {
        const prevItem = previousData.find(p => p.userID === item.userID);
        if (prevItem && (prevItem.score !== item.score)) {
          changedItems.add(item.userID);
        }
      });
      
      setAnimatingItems(changedItems);
      
      if (changedItems.size > 0) {
        const timer = setTimeout(() => {
          setAnimatingItems(new Set());
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [data, previousData]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ul className="space-y-2">
        {data.map((row: User, index: number) => {
          const previousItem = previousData?.find((p: User) => p.userID === row.userID);
          const previousRank = previousItem && previousData ? previousData.indexOf(previousItem) + 1 : undefined;
          
          return (
            <LeaderboardItem
              key={row.userID}
              row={row}
              rank={index + 1}
              previousRank={previousRank}
              isAnimating={animatingItems.has(row.userID)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LeaderboardList;