import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js'
import cors from "cors";
import {createServer} from 'http';
import  {initializeSocket} from './socket/socket.js'

dotenv.config({});

const app = express();
const server = createServer(app);
initializeSocket(server)


const PORT = process.env.PORT || 3000;

//middlewere
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const corsOption = {
  origin:process.env.CLIENT_URL,
  credentials:true
}
app.use(cors(corsOption))

//backend routes end points
app.get("/", (req, res) => {
  res.send("Chit Chat Backend Running");
});

app.use("/api/v1/users",userRoute);
app.use("/api/v1/message",messageRoute)

const start = async () => {
  try {
    await connectDb();

  server.listen(PORT,() => {
    console.log(`Server is running at ${PORT}`);
  });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  
};

start();
