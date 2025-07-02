import { createContext, useRef, useState , useEffect } from "react";
import { QuizQuestionType } from "../types";
import react from "react";   

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


interface SelectedOptionContextType {
    selectedOption: string | null;
    setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedOptionContext = createContext<SelectedOptionContextType>({
    selectedOption: null,
    setSelectedOption: () => {}
})

export const SelectedOptionProvider = (props: any) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
            {props.children}
        </SelectedOptionContext.Provider>
    );
};



interface PointsContextType {
    points: number | 0;
    setPoints: React.Dispatch<React.SetStateAction<number | 0>>;
    // pointsRef: React.RefObject<number>;
}

export const PointsContext = createContext<PointsContextType>({
    points : 0,
    setPoints: () => {},
    // pointsRef: useRef(0)
});

export const PointsProvider = (props:any) => {
    const [points , setPoints] = useState<number | 0>(0);

    return (
        <PointsContext.Provider value = {{points , setPoints}}>
            {props.children}
        </PointsContext.Provider>
    )
}