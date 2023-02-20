import checkEnv from './checkEnv';
import logger from './logger';
import createServer from './server';
import registerClientConnection from './socket.io';

checkEnv();

const server = createServer();

const port = Number(process.env.PORT);

server.listen({ port }, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  registerClientConnection(server);
});
