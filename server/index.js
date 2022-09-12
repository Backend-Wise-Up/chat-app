import http from "http";
import express from "express";
import logger from "morgan";
// import cors from "cors";
import socketio from "socket.io";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// mongo connection
import "./config/mongo.js";
// socket configuration
import WebSockets from "./utils/WebSockets.js";
// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";
// middlewares
import { decode } from './middlewares/jwt.js'

const app = express();
var allowedOrigins = "http://localhost:* http://127.0.0.1:*";

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, '/public', 'index.html'));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);


app.get('/chats',(req,res) => {
  res.sendFile(path.join(__dirname,'./public/chat.html'));
});

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);


/** Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
// global.io.set('origins', '*');


/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
