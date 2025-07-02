
import { useContext, useState } from 'react';
import { QuizQuestionType } from '../types';
import { QuizContext } from '../context/index';
import { Plus, Minus, Check, X } from "lucide-react";

const InputOptionCard = ({ index }: { index: number }) => {
    const [optionCount, setOptionCount] = useState<number>(2);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { setQuestionsList } = useContext(QuizContext);
    const [question, setQuestion] = useState<QuizQuestionType>({
        question: "",
        correctOption: "",
        option1: "",
        option2: "",
    });

    const removeQuestionHandler = () => {
        setQuestionsList((prev) => (
            // filter take 3 parameters 1) current value , 2) current index , 3) array and returns a new array by satisfying the condition
            // from return statement here return is written through short hand arrow function
            // _ --> ignore the current value and filter based on the index 
            prev.filter((_, idx) => idx !== index)
        ));
        setIsSubmit((prev) => !prev);
    };

    const submitQuestionHandler = () => {
        setQuestionsList((prev) => {
            const updated = [...prev];
            updated[index] = question; // ensures update happens at correct index
            return updated;
        });
        setIsSubmit(true);
    };

    const addOption = () => {
        if (optionCount < 4) {
          setOptionCount((prev) => prev + 1);
        }
    };
    
    const removeOption = () => {
        if (optionCount >= 2) {
          setOptionCount((prev) => prev - 1);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                </span>
                Question {index + 1}
            </h2>
            
            <div className="mb-6">
                <input 
                    type="text" 
                    placeholder="Enter question here..." 
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                    onChange={(e) => setQuestion((prev) => (
                        {...prev, question: e.target.value}
                    ))}
                />
            </div>

            <div className="space-y-4 mb-6">
                {Array.from({length: optionCount}, (_, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                        <div className="bg-purple-600/20 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                        </div>
                        <input 
                            type="text" 
                            placeholder={`Enter option ${idx + 1}...`}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                            onChange={(e) => setQuestion((prev) => (
                                {...prev, [`option${idx+1}` as keyof QuizQuestionType]: e.target.value}
                            ))}
                        />
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 text-green-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <Check size={16} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Enter correct option here" 
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setQuestion((prev) => (
                            {...prev, correctOption: e.target.value}
                        ))}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <button
                    onClick={addOption}
                    className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={optionCount > 3}
                >
                    <Plus size={18} className="mr-2" />
                    Add Option
                </button>
                
                <button
                    onClick={removeOption}
                    className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={optionCount <= 2}
                >
                    <Minus size={18} className="mr-2" />
                    Remove Option
                </button>

                <button
                    onClick={isSubmit ? removeQuestionHandler : submitQuestionHandler}
                    className={`flex items-center justify-center ${
                        isSubmit 
                            ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800" 
                            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    } text-white px-4 py-2 rounded-lg transition-all duration-200`}
                >
                    {isSubmit ? (
                        <>
                            <X size={18} className="mr-2" />
                            Remove Question
                        </>
                    ) : (
                        <>
                            <Check size={18} className="mr-2" />
                            Submit Question
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};


export default InputOptionCard; 