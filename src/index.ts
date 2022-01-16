import { Server } from 'socket.io';

const io = new Server(4000);

io.on('connection', (socket) => {
  socket.on('chat', (data) => {
    socket.emit('chat', data);
  });
});
