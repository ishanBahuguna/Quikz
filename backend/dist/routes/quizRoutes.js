"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 5000 });
const questions = new Map();
const rooms = new Map();
wss.on('connection', (ws) => {
    ws.send(JSON.stringify("Joined to the socket successfully"));
    ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            let parsed;
            try {
                // if the data from client is in invalid JSON format
                parsed = JSON.parse(data.toString());
            }
            catch (e) {
                ws.send(JSON.stringify({
                    success: false,
                    message: "Invalid JSON format"
                }));
                return;
            }
            const { type } = parsed;
            try {
                if (type === 'create-room') {
                    const roomCode = (Math.floor(Math.random() * 10000)).toString();
                    console.log("Parsed body from create room : ", parsed);
                    const { payload, username } = parsed;
                    questions.set(roomCode, payload);
                    rooms.set(roomCode, []);
                    ws.send(JSON.stringify({
                        success: true,
                        message: "Room created successfully",
                        roomCode
                    }));
                }
                if (type === 'join-room') {
                    const { roomCode, username } = parsed;
                    // console.log(questions)
                    if (!rooms.has(roomCode))
                        throw new Error("Incorrect room-code");
                    (_a = rooms.get(roomCode)) === null || _a === void 0 ? void 0 : _a.push({ username, ws });
                    console.log("Rooms details from join-room", rooms);
                    ws.send(JSON.stringify({
                        success: true,
                        message: 'Room joined Successfully'
                    }));
                }
                if (type === 'start-quiz') {
                    if (rooms.size === 0)
                        throw new Error("No members available");
                    if (questions.size === 0)
                        throw new Error("No questions available");
                    const { roomCode } = JSON.parse(data.toString());
                    // giving an assurance that all questions and clients have specific types
                    let allQuestions = questions.get(roomCode);
                    let clients = rooms.get(roomCode);
                    console.log("Questions from start-quiz : ", allQuestions);
                    console.log("clients from start-quiz : ", clients);
                    if (!allQuestions || !clients)
                        throw new Error("Invalid room code");
                    let idx = 0;
                    const sleep = (ms = 15000) => new Promise(resolve => setTimeout(resolve, ms));
                    const startAt = Date.now() + 15000;
                    clients.forEach((client) => {
                        if (client.ws.readyState === ws_1.WebSocket.OPEN && client.ws != ws) {
                            client.ws.send(JSON.stringify({ type: "ready", startAt }));
                        }
                    });
                    yield sleep();
                    const sendQuiz = () => __awaiter(void 0, void 0, void 0, function* () {
                        while (idx < allQuestions.length) {
                            const question = allQuestions[idx++];
                            console.log("Taken Out question", question);
                            for (const client of clients) {
                                if (client.ws.readyState === ws_1.WebSocket.OPEN && client.ws != ws) {
                                    client.ws.send(JSON.stringify(question));
                                }
                            }
                            yield sleep(15000);
                        }
                    });
                    yield sendQuiz();
                    for (const client of clients) {
                        if (client.ws.readyState === ws_1.WebSocket.OPEN && client.ws != ws) {
                            client.ws.send(JSON.stringify({ type: "quiz-finished" }));
                        }
                    }
                }
                if (type == "option") {
                }
            }
            catch (e) {
                console.error(e.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }));
});
