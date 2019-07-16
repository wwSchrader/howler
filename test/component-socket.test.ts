import { io, sendAddedTweet } from '../src/component-socket';
import socketIo from 'socket.io';
import http from 'http';
import { default as ioClient } from 'socket.io-client';

describe('Socket.io Component', () => {
  let socket: SocketIOClient.Socket;
  let httpServer: http.Server;
  let httpServerAddr: any;
  let ioServer: socketIo.Server;

  beforeAll((done) => {
    httpServer = http.createServer().listen();
    httpServerAddr = httpServer.listen(8002, 'localhost').address();
    ioServer = io.attach(httpServer);
    done();
  });

  afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
  });

  beforeEach((done) => {
    socket = ioClient.connect(`http://localhost:${httpServerAddr.port}`, {
      reconnectionDelay : 0,
      forceNew : true,
    });
    socket.on('connect', () => {
      done();
    });
  });

  afterEach((done) => {
    if (socket.connect) {
      console.log('Disconnecting...');
      socket.disconnect();
    } else {
      console.log('No Connection to break.');
    }
    done();
  });

  describe('add a tweet', () => {
    const addedTweet = {
      date: 1556564516895,
      tweet: 'Happy Tweet',
      ownerId: '5cc543830b62c217c84cc46f',
      username: 'joe',
    };
    test('should emit the tweet to everyone', (done) => {
      ioServer.emit('addTweet', addedTweet);
      socket.once('addTweet', (message: any) => {
        expect(message.tweet).toBe('Happy Tweet');
        expect(message.date).toBe(1556564516895);
        expect(message.ownerId).toBe('5cc543830b62c217c84cc46f');
        expect(message.username).toBe('joe');
        done();
      });
    });
  });
});
