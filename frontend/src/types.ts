

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
export interface UserPointsType {
    username : string,
    ws: WebSocket,
    points : number
}



export {userType , QuizPayloadType , JoinRoomType , QuizQuestionType, UserMessageType, RoomType , JoinPayloadType}



// types for leaderboard
// types.ts
export interface User {
  userID: string;
  displayName: string;
  score: number;
  picture?: string;
  previousRank?: number;
}

export interface LeaderboardItemProps {
  row: User;
  rank: number;
  previousRank?: number;
  isAnimating: boolean;
}

export interface LeaderboardListProps {
  data: User[];
  previousData: User[] | null;
}

export interface LeaderboardProps {
  points?: Record<string, number>;
}

export interface AppProps {}