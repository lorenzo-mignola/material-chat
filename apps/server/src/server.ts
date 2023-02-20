import fastifyStatic from '@fastify/static';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import createFastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import socketioServer from 'fastify-socket.io';
import path from 'path';

const createServer = (options: FastifyServerOptions = {}): FastifyInstance => {
  const server = createFastify({
    logger: {
      level: 'debug',
      transport: {
        target: '@mgcrea/pino-pretty-compact',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
          colorize: true,
        },
      },
    },
    disableRequestLogging: true,
    ...options,
  });

  server.register(fastifyRequestLogger);
  server.get('/ping', async () => {
    return 'pong\n';
  });

  server.register(fastifyStatic, {
    root: path.join(__dirname, './public'),
    prefix: '/',
  });

  server.register(socketioServer);

  return server;
};

export default createServer;
