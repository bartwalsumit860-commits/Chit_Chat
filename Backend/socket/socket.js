import { Server } from "socket.io";

let io;

let userSocketMap = {};

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        socket.on("join", (userId) => {
            userSocketMap[userId] = socket.id;

            io.emit(
                "getOnlineUsers",
                Object.keys(userSocketMap)
            );

        });

        socket.on("disconnect", () => {

            for (let userId in userSocketMap) {
                if (userSocketMap[userId] === socket.id) {
                    delete userSocketMap[userId];
                    break;
                }
            }

            io.emit(
                "getOnlineUsers",
                Object.keys(userSocketMap)
            );

            console.log("Disconnected");
        });
    });
}

export { io, userSocketMap };