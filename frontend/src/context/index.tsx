import { createContext, useState } from "react";
import { QuizQuestionType } from "../types";


interface QuizContextType {
    questionList: QuizQuestionType[];
    setQuestionsList: React.Dispatch<React.SetStateAction<QuizQuestionType[]>>;
}
export const QuizContext = createContext<QuizContextType>({
    questionList: [],
    setQuestionsList: () => {}
})

export const QuizProvider = (props : any) => {

    const [questionList , setQuestionsList] = useState<QuizQuestionType[]>([]);
    console.log("questionList" , questionList)
    return (
        <QuizContext.Provider value={{questionList , setQuestionsList}}>  
            {props.children}
        </QuizContext.Provider>
    )
}


interface RoomCodeContextType {
    roomCode: string;
    setRoomCode: React.Dispatch<React.SetStateAction<string>>
}
export const RoomCodeContext = createContext<RoomCodeContextType>({roomCode: "" , setRoomCode: () => {}});

export const RoomCodeProvider = (props : any) => {
    const [roomCode , setRoomCode] = useState<string>("");

    return (
        <RoomCodeContext.Provider value={{roomCode , setRoomCode}}>
            {props.children}
        </RoomCodeContext.Provider>
    )
}