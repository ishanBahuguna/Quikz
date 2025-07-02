import React, { useState , useEffect, useContext } from "react";
import { QuizQuestionType } from "../types";
import { RoomCodeContext  , SelectedOptionContext} from "../context"
import useSocket from "../hooks/index"

const QuizCard = (props: QuizQuestionType) => {
  const {selectedOption , setSelectedOption} = useContext(SelectedOptionContext);
  const [option , setOption] = useState<string | null>(null);
  const {sendMessage} = useSocket("ws://localhost:5000");
  const {roomCode} = useContext(RoomCodeContext)

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  console.log("Selected option : " , selectedOption )
  console.log("Room code : " , roomCode);


  return (
    <div>
      <h2>{props?.question}</h2>

      <input
        key={props.question + props.option1}
        type="radio"
        name={`options-${props.question}`}
        value={props.option1}
        checked={selectedOption === props.option1}
        onChange={handleOptionChange}
      />
      <label>{props.option1}</label>
      <br />

      <input
        key={props.question + props.option2}
        type="radio"
        name={`options-${props.question}`}
        value={props.option2}
        checked={selectedOption === props.option2}
        onChange={handleOptionChange}
      />
      <label>{props.option2}</label>
      <br />

      {props.option3 && (
        <>
          <input
            key={props.question + props.option3}
            type="radio"
            name={`options-${props.question}`}
            value={props.option3}
            checked={selectedOption === props.option3}
            onChange={handleOptionChange}
          />
          <label>{props.option3}</label>
          <br />
        </>
      )}

      {props.option4 && (
        <>
          <input
            key={props.question + props.option4}
            type="radio"
            name={`options-${props.question}`}
            value={props.option4}
            checked={selectedOption === props.option4}
            onChange={handleOptionChange}
          />
          <label>{props.option4}</label>
          <br />
        </>
      )}
    </div>
  );
};

export default QuizCard;
