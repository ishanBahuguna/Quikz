
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import useSocket from "../hooks"
import type { QuizQuestionType } from "../types"
import Timer from "../components/Timer"
import QuizCard from "../components/QuizCard"
import { SelectedOptionContext } from "../context"
import { Clock, User } from "lucide-react"

const Room = () => {
  const { sendMessage, isConnected, response } = useSocket("ws://localhost:5000")
  const location = useLocation()
  const { roomCode, username } = location.state as { roomCode: string; username: string }
  const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext)
  const [showClock1, setShowClock1] = useState<boolean>(false)
  const [showClock2, setShowClock2] = useState<boolean>(false)
  const [timerId, setTimerId] = useState<number>(0)
  const [delay , setDelay] = useState(15) // default delay
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestionType>({
    question: "",
    correctOption: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  })

  useEffect(() => {
    if (isConnected) {
      sendMessage(
        JSON.stringify({
          type: "join-room",
          roomCode,
          username,
        }),
      )
    }
  }, [isConnected])

  useEffect(() => {
    if (!response) return
    try {
      const parsed = JSON.parse(response)
      // Handle ready state (game starting countdown)
      if (parsed.type === "ready") {
        const startAt = Number.parseInt(parsed.startAt || "0")
        const clockDelay = Math.ceil(Math.max(startAt - Date.now(), 0) / 1000)
        setDelay(clockDelay)
        // Show countdown timer
        console.log(delay)
        setShowClock1(true)
        setShowClock2(false)
        setTimerId((prev) => prev + 1)
        return
      }
      // Handle new question
      if (parsed.question) {
        setCurrentQuestion(parsed)
        // Switch to question view with timer
        setShowClock1(false)
        setShowClock2(true)
        setTimerId((prev) => prev + 1) // Force timer restart
        // Clear previous selection when new question arrives
        setSelectedOption("")
        console.log("New question received, timer ID:", timerId + 1)
        return
      }
      // Handle quiz finished
      if (parsed.type === "quiz-finished") {
        setShowClock1(false)
        setShowClock2(false)
        return
      }
    } catch (e: any) {
      console.error("Error parsing response:", e)
    }
  }, [response])

  useEffect(() => {
    if (!selectedOption || !currentQuestion.question) return
    sendMessage(
      JSON.stringify({
        type: "answer",
        question: currentQuestion.question,
        answer: selectedOption,
        roomCode,
      }),
    )
  }, [selectedOption])

  // Handle timer completion for countdown
  const handleCountdownComplete = () => {
    console.log("Countdown completed, transitioning to first question...")
    // The server should automatically send the first question
    // This is just for logging/debugging
  }

  // Handle timer completion for questions
  const handleQuestionTimerComplete = () => {
    console.log("Question timer completed, auto-submitting...")

    // Auto-submit current selection or empty answer
    if (currentQuestion.question) {
      sendMessage(
        JSON.stringify({
          type: "answer",
          question: currentQuestion.question,
          answer: selectedOption || "", // Submit empty if no selection
          roomCode,
        }),
      )
    }

    // Clear the current selection
    setSelectedOption("")

    // Hide current question view
    setShowClock2(false)

    // The server should send the next question or end the quiz
    // console.log("Waiting for next question or quiz end...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with user info */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-purple-600/20 text-purple-400 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{username}</h2>
                <p className="text-gray-400">
                  Room: <span className="text-purple-400 font-mono">{roomCode}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className={`text-sm ${isConnected ? "text-green-400" : "text-red-400"}`}>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        {/* Game Starting Countdown */}
        {showClock1 && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-700 text-center transition-all duration-500 ease-in-out">
            <div className="bg-blue-600/20 text-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Clock size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Game Starting Soon...</h1>
            <p className="text-gray-400 mb-6">Get ready! The quiz will begin shortly.</p>
            <Timer key={`countdown-${timerId}`} id={timerId} onComplete={handleCountdownComplete} />
          </div>
        )}

        {/* Question Time */}
        {showClock2 && (
          <div className="space-y-6 transition-all duration-500 ease-in-out">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 text-center">
              <div className="bg-green-600/20 text-green-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Clock size={24} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Question Time!</h1>
              <Timer key={`question-${timerId}`} id={timerId} onComplete={handleQuestionTimerComplete} />
            </div>
            <QuizCard {...currentQuestion} />
          </div>
        )}

        {/* Waiting state when no timer is active */}
        {!showClock1 && !showClock2 && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 border border-gray-700 text-center">
            <div className="bg-purple-600/20 text-purple-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <User size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Waiting for Quiz...</h2>
            <p className="text-gray-400">Please wait while the quiz is being prepared.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Room


// /* Major Problem faced in this component 
//  1) Always try to use less multiple useEffects as it may lead to state closure 
//  2) React uses the concept of reconciliation to render the components
//     In order to render the same component across multiple renders u need to use key property in order to make difference in the current 
//     virtual DOM and previous virtual DOM
//     s*/
