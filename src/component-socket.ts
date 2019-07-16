import socketIo from 'socket.io';

const io = socketIo();

io.on('connection', (socket) => {
  console.log('someone connected!');
});

const sendAddedTweet = (tweet: any) => {
  io.emit('addTweet', tweet);
};

export {
  io,
  sendAddedTweet,
};
