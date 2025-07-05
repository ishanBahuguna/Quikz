// data.ts
import { User } from '../types';

export const getInitialData = (): User[] => [
  {
    userID: '1',
    displayName: 'Alice Johnson',
    score: 8500,
    picture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    previousRank: 1
  },
  {
    userID: '2',
    displayName: 'Bob Smith',
    score: 7200,
    picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    previousRank: 2
  },
  {
    userID: '3',
    displayName: 'Carol Davis',
    score: 6800,
    picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    previousRank: 3
  },
  {
    userID: '4',
    displayName: 'David Wilson',
    score: 5900,
    picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    previousRank: 4
  },
  {
    userID: '5',
    displayName: 'Emma Brown',
    score: 5200,
    picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    previousRank: 5
  }
];

// Generate random data updates (for demo purposes)
export const generateRandomUpdate = (users: User[]): User[] => {
  const newData = [...users];
  const randomUser = newData[Math.floor(Math.random() * newData.length)];
  const pointChange = Math.floor(Math.random() * 500) - 250; // Random change between -250 and +250
  randomUser.score = Math.max(0, randomUser.score + pointChange);
  return newData;
};