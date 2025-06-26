import React, { useState } from "react";
import { QuizQuestionType } from "../types";

const QuizCard = (props: QuizQuestionType) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>{props?.question}</h2>

      <input
        type="radio"
        name={`options-${props.question}`}
        value={props.option1}
        checked={selectedOption === props.option1}
        onChange={handleOptionChange}
      />
      <label>{props.option1}</label>
      <br />

      <input
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
