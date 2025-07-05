// import { useContext, useEffect, useState } from 'react';
// import useSocket from '../hooks';
// import { useLocation } from 'react-router-dom';
// import { RoomCodeContext } from '../context';
// import Leaderboard from '../components/Leaderboard';
// import { UserPointsType } from '../types';

// const Admin = () => {
//   const [reqType, setReqType] = useState<{ type: string; roomCode: string }>({
//     type: '',
//     roomCode: '',
//   });

//   const [points, setPoints] = useState<UserPointsType[]>([]);
//   const { sendMessage, response, isConnected } = useSocket('ws://localhost:5000');
//   const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

//   const { roomCode } = useContext(RoomCodeContext);
//   console.log('Roomcode from admin : ', roomCode);
//   useEffect(() => {
//     if (reqType.type === 'start-quiz' && isConnected) {
//       sendMessage(JSON.stringify(reqType));
//       setReqType({ type: '', roomCode: '' }); // Reset to prevent multiple sends
//     }

//     // if (response && JSON.parse(response).type === 'points') {
//     //   const parsed = JSON.parse(response);

//     //   setPoints(parsed.points);
//     //   console.log('Points received in Admin:', parsed.points);
//     // }
//   }, [reqType]);
//   useEffect(() => {
//     if (response && JSON.parse(response).type === 'points') {
//       const parsed = JSON.parse(response);
//       setPoints(parsed.points);
//       setShowLeaderboard(true); // Show leaderboard when points are received
//       console.log('Points received in Admin:', parsed.points);
//     }
//   }, [response]);

//   const onStartHandler = () => {
//     setReqType({ type: 'start-quiz', roomCode });
//   };

//   // In Admin.tsx, add this useEffect
//   useEffect(() => {
//     console.log('Admin - Points from context:', points);
//     console.log('Admin - Points length:', points.length);
//   }, [points]);

//   return (
//     <div>
//       <div>{<button onClick={onStartHandler}>Start Quiz</button>}</div>

//       <br />

//       {showLeaderboard && <Leaderboard data={points} />}
//     </div>
//   );
// };

// export default Admin;





















import { useContext, useEffect, useState } from "react"
import useSocket from "../hooks"
import { RoomCodeContext } from "../context"
import Leaderboard from "../components/Leaderboard"
import type { UserPointsType } from "../types"
import { Play, Trophy, Users } from "lucide-react"

const Admin = () => {
  const [reqType, setReqType] = useState<{ type: string; roomCode: string }>({
    type: "",
    roomCode: "",
  })
  const [points, setPoints] = useState<UserPointsType[]>([])
  const { sendMessage, response, isConnected } = useSocket("ws://localhost:5000")
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false)
  const { roomCode } = useContext(RoomCodeContext)

  console.log("Roomcode from admin : ", roomCode)

  useEffect(() => {
    if (reqType.type === "start-quiz" && isConnected) {
      sendMessage(JSON.stringify(reqType))
      setReqType({ type: "", roomCode: "" }) // Reset to prevent multiple sends
    }
  }, [reqType])

  useEffect(() => {
    if (response && JSON.parse(response).type === "points") {
      const parsed = JSON.parse(response)
      setPoints(parsed.points)
      setShowLeaderboard(true) // Show leaderboard when points are received
      console.log("Points received in Admin:", parsed.points)
    }
  }, [response])

  const onStartHandler = () => {
    setReqType({ type: "start-quiz", roomCode })
  }

  // In Admin.tsx, add this useEffect
  useEffect(() => {
    console.log("Admin - Points from context:", points)
    console.log("Admin - Points length:", points.length)
  }, [points])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-700">
          <div className="text-center">
            <div className="bg-purple-600/20 text-purple-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Admin Panel</h1>
            <p className="text-gray-400 mb-6">
              Room Code: <span className="text-purple-400 font-mono text-lg">{roomCode}</span>
            </p>

            {/* Connection Status */}
            <div className="flex items-center justify-center mb-6">
              <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className={`text-sm ${isConnected ? "text-green-400" : "text-red-400"}`}>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>

            {/* Start Quiz Button */}
            <button
              onClick={onStartHandler}
              disabled={!isConnected}
              className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold mx-auto"
            >
              <Play size={24} className="mr-3" />
              Start Quiz
            </button>
          </div>
        </div>

        {/* Leaderboard Section */}
        {showLeaderboard && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500/20 text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <Trophy size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Final Leaderboard</h2>
            </div>
            <Leaderboard data={points} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

