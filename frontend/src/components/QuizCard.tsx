
import type React from 'react';
import { useState, useContext } from 'react';
import type { QuizQuestionType } from '../types';
import { RoomCodeContext, SelectedOptionContext } from '../context';
import useSocket from '../hooks/index';
import { HelpCircle, CheckCircle } from 'lucide-react';

const QuizCard = (props: QuizQuestionType) => {
  const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext);
//   const [option, setOption] = useState<string | null>(null);
//   const { sendMessage } = useSocket('ws://localhost:5000');
//   const { roomCode } = useContext(RoomCodeContext);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

//   console.log('Selected option : ', selectedOption);
//   console.log('Room code : ', roomCode);

  const options = [
    { value: props.option1, label: props.option1 },
    { value: props.option2, label: props.option2 },
    ...(props.option3 ? [{ value: props.option3, label: props.option3 }] : []),
    ...(props.option4 ? [{ value: props.option4, label: props.option4 }] : []),
  ].filter((option) => option.value);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
      {/* Question Header */}
      <div className="flex items-start mb-8">
        <div className="bg-purple-600/20 text-purple-400 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
          <HelpCircle size={24} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white leading-relaxed">{props?.question}</h2>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option, index) => (
          <label
            key={`${props.question}-${option.value}`}
            className={`flex items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-gray-700/50 ${
              selectedOption === option.value
                ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name={`options-${props.question}`}
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-200 ${
                  selectedOption === option.value ? 'border-purple-500 bg-purple-500' : 'border-gray-500'
                }`}
              >
                {selectedOption === option.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div
                className={`bg-purple-600/20 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 ${
                  selectedOption === option.value ? 'bg-purple-500 text-white' : ''
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span
                className={`text-lg transition-colors duration-200 ${
                  selectedOption === option.value ? 'text-white font-medium' : 'text-gray-300'
                }`}
              >
                {option.label}
              </span>
            </div>
            {selectedOption === option.value && <CheckCircle size={20} className="text-purple-400 ml-auto" />}
          </label>
        ))}
      </div>

      {/* Selection Status */}
      {selectedOption && (
        <div className="mt-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center">
            <CheckCircle size={20} className="text-green-400 mr-2" />
            <span className="text-green-400 font-medium">Answer selected: {selectedOption}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
