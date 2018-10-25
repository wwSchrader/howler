import './env';
// tslint:disable-next-line:ordered-imports
import express from 'express';
import morgan from 'morgan';

const app: express.Application = express();

app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

export default app;
