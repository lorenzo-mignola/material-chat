import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import createFastify, { FastifyInstance, FastifyServerOptions } from 'fastify';

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

  return server;
};

export default createServer;
