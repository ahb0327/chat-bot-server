import 'reflect-metadata';
import { Server } from 'socket.io';
import { Chat } from './types';
import { Chatlist } from './entity/Chatlist';
import { createConnection } from 'typeorm';

createConnection({
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'bjy102026',
  database: 'chatbot',
  synchronize: true,
  entities: [Chatlist],
}).then((connection) => {
  const io = new Server({
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    socket.on('init', async () => {
      const data = (await connection.manager.find(Chatlist)).map<Chat>(
        (value) => {
          return {
            nickname: value.name,
            message: value.message,
            time: value.updatedAt.getTime(),
          };
        }
      );

      socket.emit('init', data);
    });

    socket.on('chat', (data) => {
      const chat = new Chatlist();
      chat.name = data.chat.nickname;
      chat.message = data.chat.message;

      connection.manager.save(chat);

      socket.emit('chat', {
        nickname: chat.name,
        time: data.chat.time,
        message: chat.message,
      });
    });
  });

  io.listen(4000);
});
