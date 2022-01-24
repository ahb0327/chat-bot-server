import 'reflect-metadata';
import { Server } from 'socket.io';
import { Chat } from './types';
import { Chatlist } from './entity/Chatlist';
import { createConnection } from 'typeorm';

createConnection({
  name: 'default',
  type: 'mysql',
  host: '14.56.115.119',
  port: 3306,
  username: 'newroot',
  password: 'cheomuk201720^^',
  database: '',
  synchronize: false,
  entities: ['entities/*.js'],
}).then((connection) => {
  const io = new Server({
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    socket.on('init', async (room) => {
      const data = (await connection.manager.find(Chatlist)).map<Chat>(
        (value) => {
          return {
            nickname: value.name,
            message: value.message,
            time: value.updatedAt.getTime(),
          };
        }
      );

      socket.join(room);
      socket.emit('init', data);
    });

    socket.on('chat', (data) => {
      console.log(data);
    });
  });

  io.listen(4000);
});
