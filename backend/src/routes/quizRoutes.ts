import { WebSocket, WebSocketServer } from 'ws';
import { JoinRoomType, QuizPayloadType, userType, QuizQuestionType, UserPointsType } from '../types';

const wss = new WebSocketServer({ port: 5000 });

// question : key : roomcode , value : array of questions
const questions: Map<string, QuizQuestionType[]> = new Map();

// rooms --> key : roomCode , value : array of users
const rooms: Map<string, userType[]> = new Map();

const points: Map<string, UserPointsType[]> = new Map();

const admins: Map<string, WebSocket> = new Map();

wss.on('connection', (ws: WebSocket) => {
  ws.send(JSON.stringify('Joined to the socket successfully'));
  ws.on('message', async (data) => {
    try {
      let parsed;

      try {
        // if the data from client is in invalid JSON format
        parsed = JSON.parse(data.toString());
      } catch (e) {
        ws.send(
          JSON.stringify({
            success: false,
            message: 'Invalid JSON format',
          })
        );

        return;
      }

      const { type } = parsed;

      try {
        if (type === 'create-room') {
          const roomCode: string = Math.floor(Math.random() * 10000).toString();
          console.log('Parsed body from create room : ', parsed);
          const { payload, username }: QuizPayloadType = parsed;

          questions.set(roomCode, payload);
          rooms.set(roomCode, [] as userType[]);
          points.set(roomCode, [] as UserPointsType[]);

          ws.send(
            JSON.stringify({
              success: true,
              message: 'Room created successfully',
              roomCode,
            })
          );
        } else if (type === 'join-room') {
          const { roomCode, username }: JoinRoomType = parsed;

          // console.log(questions)
          if (!rooms.has(roomCode)) throw new Error('Incorrect room-code');

          rooms.get(roomCode)?.push({ username, ws });
          console.log('Rooms details from join-room', rooms);

          if (!points.has(roomCode)) {
            points.set(roomCode, []);
          }

          const pointsArray = points.get(roomCode)!;
          const existingUser = pointsArray.find((u) => u.username === username);

          if (!existingUser) {
            pointsArray.push({ username, ws, points: 0 });
          }

          ws.send(
            JSON.stringify({
              success: true,
              message: 'Room joined Successfully',
            })
          );
        } else if (type === 'start-quiz') {
          if (rooms.size === 0) throw new Error('No members available');

          if (questions.size === 0) throw new Error('No questions available');

          const { roomCode } = JSON.parse(data.toString());

        //   storing admin websocket connection in order to send quiz points later in answer route
          if (admins.has(roomCode)) {
            ws.send(
              JSON.stringify({
                success: false,
                message: 'Room already exists',
              })
            );
            return;
          }

          admins.set(roomCode, ws);

          // giving an assurance that all questions and clients have specific types
          let allQuestions = questions.get(roomCode) as object[];

          let clients = rooms.get(roomCode) as userType[];
          console.log('Questions from start-quiz : ', allQuestions);
          console.log('clients from start-quiz : ', clients);

          if (!allQuestions || !clients) throw new Error('Invalid room code');

          let idx = 0;
          const sleep = (ms: number = 15000) => new Promise((resolve) => setTimeout(resolve, ms));

          const startAt = Date.now() + 15000;

          clients.forEach((client) => {
            if (client.ws.readyState === WebSocket.OPEN && client.ws != ws) {
              client.ws.send(JSON.stringify({ type: 'ready', startAt }));
            }
          });

          await sleep();

          const sendQuiz = async () => {
            while (idx < allQuestions.length) {
              const question = allQuestions[idx++];
              console.log('Taken Out question', question);
              for (const client of clients) {
                if (client.ws.readyState === WebSocket.OPEN && client.ws != ws) {
                  client.ws.send(JSON.stringify(question));
                }
              }

              await sleep(15000);
            }
          };

          await sendQuiz();

          for (const client of clients) {
            if (client.ws.readyState === WebSocket.OPEN && client.ws != ws) {
               admins.delete(roomCode); // Remove admin after quiz is finished
               points.delete(roomCode); // Clear points for the room
               rooms.delete(roomCode); // Clear room data 
               questions.delete(roomCode); // Clear questions for the room
              client.ws.send(JSON.stringify({ type: 'quiz-finished' }));
            }
          }
        } else if (type === 'answer') {
          const { question, answer, roomCode } = parsed;
          console.log('Room code from answer: ', roomCode);

          if (!rooms.has(roomCode)) throw new Error('Invalid room code');

          const currQuestion = questions.get(roomCode);
          const correctAnswer = currQuestion?.find((q) => q.question === question)?.correctOption;

          const clients = points.get(roomCode) as UserPointsType[];
          console.log('Clients from answer: ', clients);

          if (!clients) throw new Error('Invalid room code');

          const user = clients.find((u) => u.ws === ws);
          //   console.log('Answer from user : ', answer);
          //   console.log('Correct answer from question : ', correctAnswer);
          if (answer === correctAnswer) {
            if (user) {
              user.points += 10; // Increment points by 10 for correct answer
            } else {
              clients.push({ username: parsed.username, ws, points: 10 }); // Add new user with 10 points
            }
          } else {
            if (user) {
              user.points = user.points === 0 ? 0 : user.points - 10;
            }
          }

          //   console.log('Clients after answer : ', clients);
          points.set(roomCode, clients);

          console.log('Points after answer: ', points.get(roomCode));

          const admin = admins.get(roomCode);
          console.log('Admin from answer : ', admin);
          if (admin && admin.readyState === WebSocket.OPEN) {
            admin.send(
              JSON.stringify({
                type: 'points',
                points: points.get(roomCode),
              })
            );
          }
        }
      } catch (e: any) {
        console.error(e.message);
      }
    } catch (e) {
      console.log(e);
    }
  });
});
