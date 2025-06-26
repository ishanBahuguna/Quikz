import { useContext , useEffect, useState, useCallback } from 'react';
import { RoomCodeContext } from '../context';

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [response, setResponse] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false); // <- NEW
  const { setRoomCode } = useContext(RoomCodeContext)

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('Connection established');
      setIsConnected(true);
    };

    newSocket.onmessage = (message) => {
      setResponse(message.data);
      const parsedMessage = JSON.parse(message.data)
      if(parsedMessage.roomCode) {
        setRoomCode(parsedMessage.roomCode)
      }
      console.log('Message received:', message.data);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false); // <- Reset on close
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }, [socket]);

  return { socket, sendMessage, response , isConnected};
};

export default useSocket;
