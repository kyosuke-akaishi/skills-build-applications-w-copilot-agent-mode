import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import './config/database.js';
import { apiBaseUrl } from './config/api.js';
import { apiRouter } from './routes/api.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());
app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
app.get('/api-url', (_request, response) => {
  response.json({ apiBaseUrl });
});
app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Unable to complete the request' });
};

app.use(errorHandler);
app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});