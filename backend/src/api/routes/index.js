import express from 'express';
import messages from './messages';

const routes = express();

routes.use('/messages', messages);

export default routes;
