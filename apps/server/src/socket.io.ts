import { FastifyInstance } from 'fastify';
import logger from './logger';

const registerClientConnection = (server: FastifyInstance) => {
  server.io.on('connection', (socket) => {
    socket.on('new-user', (userId: string) => {
      server.io.emit('enter', `User ${userId} join`);
      logger.info(userId);
    });
  });
};

export default registerClientConnection;
