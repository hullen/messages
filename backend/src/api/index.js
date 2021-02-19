import express from 'express';
import cors from 'cors';
import config from '../config';
import routes from './routes';

const app = express();
const port = config.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

export default () => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Listening on http://localhost:${port}`);
  });
};
