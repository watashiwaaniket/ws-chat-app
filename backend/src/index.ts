import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({
    port: 8080
});

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

// {
//     {socket: socket, room: 'room1'},
//     {socket: socket, room: 'room2'},
// }

wss.on('connection', (socket) => {

    socket.on('message', (event) => {
        const parsedMessage = JSON.parse(event as unknown as string);
        if(parsedMessage.type === 'join'){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
            })
        }

        if(parsedMessage.type === 'chat'){
            // const currentUserRoom = allSockets.find((x) => x.socket == socket)
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++){
                if (allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].room
                }
            }

            for (let i = 0; i < allSockets.length; i++){
                if (allSockets[i].room == currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }
        }

    })

    // socket.on('disconnect', () => {
    //     allSockets = allSockets.filter( x => x != socket);
    // })
}) 