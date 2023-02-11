import path from 'path';
import checkEnv from './checkEnv';
import logger from './logger';
import { createServer } from './server';

checkEnv();

const server = createServer();

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.register(require('@fastify/static'), {
  root: path.join(__dirname, './public'),
  prefix: '/'
});

// server.get('/', function (req, reply) {
//   reply.sendFile('') // serving path.join(__dirname, 'public', 'myHtml.html') directly
// })

const port = Number(process.env.PORT);

server.listen({ port }, err => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});
