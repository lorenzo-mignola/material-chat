import { FastifyInstance } from 'fastify';
import { Socket } from 'socket.io';
import Client, { Socket as ClientSocket } from 'socket.io-client';
import t from 'tap';
import createServer from './server';

t.test('requests the "/" route should return a html page', async (tt) => {
  const app = createServer();

  const response = await app.inject({
    method: 'GET',
    url: '/',
  });
  tt.equal(response.statusCode, 200, 'returns a status code of 200');
  tt.match(response.body, '</html>');
});

let client: ClientSocket;
let serverSocket: Socket;
let app: FastifyInstance;
t.beforeEach(() => {
  app = createServer();
  const port = 3333;
  app.listen({ port }, () => {
    // @ts-expect-error
    client = new Client('http://localhost:3030');
    app.io.on('connection', (socket) => {
      serverSocket = socket;
    });
  });
});

t.afterEach(async () => {
  app.io.close();
  client.close();
});

t.test('on client connection should emit "enter" event', async (tt) => {
  client.emit('new-user', '123');
  serverSocket.on('new-user', (userId: string) => {
    tt.equal(userId, '123');
  });
});
