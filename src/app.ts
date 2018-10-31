import './env';
// tslint:disable-next-line:ordered-imports
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { setupMongoose } from './component-mongo';
import { index } from './routes/index';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);
app.use('/api', index);

setupMongoose(app);

export default app;
