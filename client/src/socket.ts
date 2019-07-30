import openSocket from 'socket.io-client';

const socket = openSocket();

export function subscribeToAddTweet(cb: any) {
  socket.on('addTweet', (newTweet: any) => cb(null, newTweet));
};

export default {
  socket,
  subscribeToAddTweet
};
