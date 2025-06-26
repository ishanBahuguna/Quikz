

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

interface JoinPayloadType extends QuizQuestionType{
    type?:string,
    startAt?:string
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
    username:string,
    type:string,
    payload:QuizQuestionType[]
}



export {userType , QuizPayloadType , JoinRoomType , QuizQuestionType, UserMessageType, RoomType , JoinPayloadType}