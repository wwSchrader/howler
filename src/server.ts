import app from './app';
import http from 'http';
import { io } from './component-socket';

const server = http.createServer(app);
io.attach(server);

server.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  );
});

module.exports = server;
