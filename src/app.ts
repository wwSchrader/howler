import './env';
// tslint:disable-next-line:ordered-imports
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { setupMongoose } from './component-mongo';
import { index } from './routes/index';
import { setupPassport } from './component-passport';

const app: express.Application = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.set('port', process.env.PORT || 3000);

setupMongoose(app);
setupPassport(app);

app.use('/api', index);

export default app;
