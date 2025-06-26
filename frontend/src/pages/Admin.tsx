import { useContext, useEffect, useState } from 'react';
import useSocket from '../hooks';
import { useLocation } from 'react-router-dom';
import { RoomCodeContext } from '../context';

const Admin = () => {
  const [reqType, setReqType] = useState<{ type: string; roomCode: string }>({
    type: '',
    roomCode: '',
  });
  const { sendMessage, response, isConnected } = useSocket('ws://localhost:5000');

  const { roomCode } = useContext(RoomCodeContext);
  console.log('Roomcode from admin : ', roomCode);
  useEffect(() => {
    if (reqType.type && isConnected) {
      sendMessage(JSON.stringify(reqType));
    }
  }, [reqType]);

  const onStartHandler = () => {
    setReqType({ type: 'start-quiz', roomCode });
  };

  return <div>{<button onClick={onStartHandler}>Start Quiz</button>}</div>;
};

export default Admin;
