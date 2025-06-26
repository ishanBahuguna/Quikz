// import { useState } from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// const Timer = ({ delay = 15 }: { delay?: number }) => {
//   const [timeLeft, setTimeLeft] = useState(delay);
//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CountdownCircleTimer
//           isPlaying
//           duration={timeLeft}
//           colors={['#FF6FD8', '#38F9D7', '#A18CD1', '#43E97B', '#5EFCE8', '#736EFE', '#FF6FD8']}
//           colorsTime={[15, 12, 10, 7, 5, 3, 0]}
//           size={220}
//           strokeWidth={20}
//           trailColor="#eee"
//         >
//           {({ remainingTime }) => (
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 fontSize: '28px',
//                 fontWeight: '600',
//                 color: '#333',
//                 textShadow: '0 0 5px rgba(0,0,0,0.2)',
//               }}
//             >
//               <span style={{ fontSize: '40px', color: '#5f27cd' }}>{remainingTime}</span>
//               <span style={{ fontSize: '16px', marginTop: '4px' }}>seconds</span>
//             </div>
//           )}
//         </CountdownCircleTimer>
//       </div>
//     </div>
//   );
// };

// export default Timer;



import {useEffect, useState} from  'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = ({id} : {id : number}) => {
    const [keyValue , setKeyValue] = useState<number>(-1);
    useEffect(() => {
        setKeyValue(id);

    } , [id]);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CountdownCircleTimer
          isPlaying
          duration={15}
          colors={['#FF6FD8', '#38F9D7', '#A18CD1', '#43E97B', '#5EFCE8', '#736EFE', '#FF6FD8']}
          colorsTime={[15, 12, 10, 7, 5, 3, 0]}
          size={220}
          strokeWidth={20}
          trailColor="#eee"
        >
          {({ remainingTime }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: '28px',
                fontWeight: '600',
                color: '#333',
                textShadow: '0 0 5px rgba(0,0,0,0.2)',
              }}
            >
              <span style={{ fontSize: '40px', color: '#5f27cd' }}>{remainingTime}</span>
              <span style={{ fontSize: '16px', marginTop: '4px' }}>seconds</span>
            </div>
          )}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default Timer;








