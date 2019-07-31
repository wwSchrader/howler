import openSocket from 'socket.io-client';

export const socket = openSocket();

export function subscribeToAddTweet(addTweetToArray: any) {
  socket.on('addTweet', (newTweet: any) => {
    addTweetToArray(newTweet);
  });
};

export default {
  socket,
  subscribeToAddTweet
};
