import socketIo from 'socket.io';

const io = socketIo();

io.on('connection', (socket) => {
  console.log('someone connected!');
});

const sendAddedTweet = (tweet: any) => {
  if (tweet.replyId === null) {
    // only send tweets if they are not replies
    io.emit('addTweet', tweet);
  }
};

export {
  io,
  sendAddedTweet,
};
