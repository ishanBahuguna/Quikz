import { WebSocket } from "ws"

interface UserMessageType{
    type:string,
    message?:string
    success?:boolean
}

interface RoomType{
    [roomCode : string] : WebSocket[]
}

interface userType {
    username:string,
    ws:WebSocket
}
interface JoinRoomType {
    type:string
    roomCode : string,
    username : string
}

interface QuizQuestionType {
    question:string,
    correctOption:string,
    option1:string,
    option2:string,
    option3?:string,
    option4?:string,
}

interface QuizPayloadType {
    username?:string | null,
    type?:string | null,
    payload:QuizQuestionType[]
}

interface UserPointsType {
    username : string | null,
    ws: WebSocket,
    points : number | 0
}

export interface AdminType {
    roomCode : string, 
    username : string, 
    ws: WebSocket
}



export {userType , QuizPayloadType , JoinRoomType , QuizQuestionType, UserMessageType, RoomType , UserPointsType};