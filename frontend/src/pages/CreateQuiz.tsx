
import { useContext, useEffect, useState } from "react";
import { QuizPayloadType, QuizQuestionType } from "../types";
import InputOptionCard from "../components/InputOptionCard";
import { QuizContext } from "../context";
import { Plus, Minus, Check } from "lucide-react";
import useSocket from "../hooks";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const { response , sendMessage, isConnected } = useSocket("ws://localhost:5000");
  const [questionCount, setQuestionCount] = useState(2); // Start with 2 options
  const [quizPayload, setQuizPayload] = useState<QuizPayloadType>({
    type: "",
    username: "",
    payload: [
      {
        question: "",
        correctOption: "",
        option1: "",
        option2: "",
        option3:"",
        option4: "",
      },
    ],
  });

  const navigate = useNavigate();


  const { questionList } = useContext(QuizContext);
  

  useEffect(() => {
    // sendMessage(JSON.stringify(quizPayload));
    if (isConnected) {
      console.log("Quiz Payload from Create-Quiz : ", quizPayload);
      sendMessage(JSON.stringify(quizPayload));
   
    }
}, [quizPayload]);

    

const submitQuizHandler = () => {
    // react states updates are asynchronous types : state updates are batched means they are not immediately reflected , reflected in the next render
    setQuizPayload((prev) => ({
        ...prev,
        type: "create-room",
        payload: questionList,
    }));

    navigate("/admin");
  };

  const addQuestion = () => {
    setQuestionCount((prev) => prev + 1);
  };

  const removeQuestion = () => {
    if (questionCount > 1) {
      setQuestionCount((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Create Your Own Quiz with Quikz
          </h1>
          <p className="text-gray-400 mt-2">
            Design custom quizzes with multiple choice questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            {/* <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-6 mb-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">Quiz Details</h2>
              <input
                type="text"
                placeholder="Enter your username..."
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 mb-4"
                onChange={(e) => setQuizPayload((prev) => ({ ...prev, username: e.target.value }))}
              />
            </div> */}
          </div>

          {Array.from({ length: questionCount }, (_, idx) => (
            <InputOptionCard key={idx} index={idx} />
          ))}

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <button
              onClick={addQuestion}
              className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              <Plus size={18} className="mr-2" />
              Add Question
            </button>

            <button
              onClick={removeQuestion}
              className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={questionCount <= 1}
            >
              <Minus size={18} className="mr-2" />
              Remove Question
            </button>

            <button
              onClick={submitQuizHandler}
              className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-200"
            >
              <Check size={18} className="mr-2" />
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
