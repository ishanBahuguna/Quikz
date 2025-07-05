

import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = ({ id, onComplete }: { id: number; onComplete?: () => void }) => {
  const [keyValue, setKeyValue] = useState<number>(-1);

  useEffect(() => {
    setKeyValue(id);
  }, [id]);

  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl scale-110"></div>

        {/* Timer container */}
        <div className="relative bg-gray-800/50 rounded-full p-4 border border-gray-700/50 backdrop-blur-sm">
          <CountdownCircleTimer
            key={keyValue}
            isPlaying
            duration={15}
            colors={[
              '#8B5CF6', // Purple
              '#06B6D4', // Cyan
              '#10B981', // Emerald
              '#F59E0B', // Amber
              '#EF4444', // Red
            ]}
            colorsTime={[15, 12, 8, 4, 0]}
            size={180}
            strokeWidth={8}
            trailColor="#374151" // Gray-700
            strokeLinecap="round"
            onComplete={() => {
              onComplete?.();
              return { shouldRepeat: false };
            }}
          >
            {({ remainingTime }) => (
              <div className="flex flex-col items-center justify-center">
                {/* Main time display */}
                <div className="text-5xl font-bold text-white mb-1 tabular-nums">{remainingTime}</div>

                {/* Seconds label */}
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {remainingTime === 1 ? 'second' : 'seconds'}
                </div>

                {/* Progress indicator */}
                <div className="mt-2 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        remainingTime > (4 - i) * 3 ? 'bg-purple-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>

        {/* Pulse animation for urgency */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            keyValue <= 5 ? 'animate-pulse bg-red-500/10 border border-red-500/30' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default Timer;
