
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSocket from '../hooks';
import { JoinPayloadType, QuizQuestionType } from '../types';
import Timer from '../components/Timer';
import QuizCard from '../components/QuizCard';

const Room = () => {
  const { sendMessage, isConnected, response } = useSocket("ws://localhost:5000");
  const location = useLocation();
  const { roomCode, username } = location.state as { roomCode: string; username: string };

  const [showClock1, setShowClock1] = useState<boolean>(false);
  const [showClock2, setShowClock2] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<number>(0);
  const [delay, setDelay] = useState(15); // default delay
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestionType>({
    question: "",
    correctOption: "",
    option1: "",
    option2: "",
    option3: "",
    option4: ""
  });

  useEffect(() => {
    if (isConnected) {
      sendMessage(JSON.stringify({
        type: "join-room",
        roomCode,
        username
      }));
    }
  }, [isConnected]);

  useEffect(() => {
    if (!response) return;

    try {
      const parsed = JSON.parse(response);

      // Handle ready state (game starting countdown)
      if (parsed.type === "ready") {
        const startAt = parseInt(parsed.startAt || "0");
        const clockDelay = Math.ceil(Math.max(startAt - Date.now(), 0) / 1000);
        setDelay(clockDelay);
        
        // Show countdown timer
        setShowClock1(true);
        setShowClock2(false);
        setTimerId(prev => prev + 1);
        
        return;
      }

      // Handle new question
      if (parsed.question) {
        setCurrentQuestion(parsed);
        
        // Switch to question view with timer
        setShowClock1(false);
        setShowClock2(true);
        setTimerId(prev => prev + 1); // Force timer restart
        
        console.log("New question received, timer ID:", timerId + 1);
        return;
      }

      // Handle quiz finished
      if (parsed.type === "quiz-finished") {
        setShowClock1(false);
        setShowClock2(false);
        return;
      }

    } catch (e: any) {
      console.error("Error parsing response:", e);
    }
  }, [response]);

  return (
    <div>
      {showClock1 && (
        <div>
          <h1>Game Starting Soon...</h1>
          <Timer key={`countdown-${timerId}`} id={timerId} />
        </div>
      )}
      
      {showClock2 && (
        <div>
          <h1>Question Time!</h1>
          <QuizCard {...currentQuestion} />
          <Timer key={`question-${timerId}`} id={timerId} />
        </div>
      )}
    </div>
  );
};

export default Room;


/* Major Problem faced in this component 
 1) Always try to use less multiple useEffects as it may lead to state closure 
 2) React uses the concept of reconciliation to render the components
    In order to render the same component across multiple renders u need to use key property in order to make difference in the current 
    virtual DOM and previous virtual DOM
    s*/












