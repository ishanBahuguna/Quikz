import { WebSocket , WebSocketServer } from "ws";
import { JoinRoomType, QuizPayloadType, userType } from "../types";

const wss = new WebSocketServer({port : 5000});

const questions : Map<string , [{}]> = new Map();
const rooms : Map<string , userType[]> = new Map();

wss.on('connection' , (ws : WebSocket) => {
    ws.send(JSON.stringify("Joined to the socket successfully"))
    ws.on('message' , async(data) => {
        try {
            let parsed

            try {
                // if the data from client is in invalid JSON format
                parsed = JSON.parse(data.toString());
            } catch(e) {
                ws.send(JSON.stringify({
                    success:false,
                    message:"Invalid JSON format"
                }))

                return;
            }


            const { type }  = parsed;

            try {
                if(type === 'create-room') {
                    const roomCode : string = (Math.floor(Math.random() * 10000)).toString();
                    console.log("Parsed body from create room : " , parsed)
                    const { payload , username } : QuizPayloadType = parsed;
                    
                    questions.set(roomCode , payload);
                    rooms.set(roomCode , [] as userType[]);

                    ws.send(JSON.stringify({
                        success:true,
                        message:"Room created successfully",
                        roomCode
                    }))
                }

                if(type === 'join-room') {
                    const { roomCode , username } : JoinRoomType = parsed;
                    
                    // console.log(questions)
                    if(!rooms.has(roomCode)) throw new Error("Incorrect room-code")
                        
                    rooms.get(roomCode)?.push({username , ws});
                    console.log("Rooms details from join-room" , rooms);

                    ws.send(JSON.stringify({
                        success:true,
                        message:'Room joined Successfully'
                    })) 
                    
                }

                if(type === 'start-quiz') {
                    if(rooms.size === 0) throw new Error("No members available");

                    if(questions.size === 0) throw new Error("No questions available")

                    const { roomCode } = JSON.parse(data.toString());

                    // giving an assurance that all questions and clients have specific types
                    let allQuestions  = questions.get(roomCode) as object[]
                    
                    let clients  = rooms.get(roomCode) as userType[];
                    console.log("Questions from start-quiz : " , allQuestions);
                    console.log("clients from start-quiz : " , clients)

                    if (!allQuestions || !clients) throw new Error("Invalid room code");

                    let idx = 0;
                    const sleep =  (ms : number = 15000) => new Promise(resolve => setTimeout(resolve , ms));

                    const startAt = Date.now() + 15000;

                    clients.forEach((client) => {
                        if(client.ws.readyState === WebSocket.OPEN && client.ws != ws) {
                            client.ws.send(JSON.stringify({type:"ready" , startAt}));
                        }
                    })

                    await sleep();

                    const sendQuiz = async () => {
                        while(idx < allQuestions.length) {
                            const question = allQuestions[idx++];
                            console.log("Taken Out question" , question)
                            for(const client of clients) {
                                if(client.ws.readyState === WebSocket.OPEN && client.ws != ws)  {
                                    client.ws.send(JSON.stringify(question));
                                }
                            }
                            
                            await sleep(15000);
                        }
                    }

                    await sendQuiz();

                    for(const client of clients) {
                        if(client.ws.readyState === WebSocket.OPEN && client.ws != ws) {
                            client.ws.send(JSON.stringify({type:"quiz-finished"}))
                        }
                    }
                }

                if(type == "option") {
                    
                }
            } catch(e:any) {
                console.error(e.message);
            }


        } catch(e) {
            console.log(e)
        }


    })
})