import  { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [isJoin, setIsJoin] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [roomCode, setRoomCode] = useState<string>('');
  const navigate = useNavigate();
  
  const createRoomHandler = () => {
        setIsJoin(false);
        navigate('/create-quiz');
    }

    const joinRoomHandler = () => {
        navigate('/room' , {
            state: {
                roomCode,
                username
            }
        });
    }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400 animate-pulse">Welcome to Quikz</h1>

      <input onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter name"
        className="mb-4 w-full max-w-xs px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsJoin(true)}
          className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Join Room
        </button>

        <button
          onClick={createRoomHandler}
          className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Create Room
        </button>
      </div>

      {isJoin && (
        <div className="w-full max-w-xs animate-fade-in">
          <input onChange={(e) => setRoomCode(e.target.value)}  
            type="text"
            placeholder="Room code"
            className="mb-3 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <button onClick={joinRoomHandler}className="w-full bg-purple-500 hover:bg-purple-600 transition-all duration-300 text-white px-5 py-2 rounded-lg shadow">
            Join Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Signin;
