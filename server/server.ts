import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import metricServerRouter from './routes/metricServerRouter.js';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(cors());

/**
 * handle data parsing requirements
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../client/src/assets')));

// endpoint fetches metric data
app.use('/metricserver', metricServerRouter);

/**
 * handle requests to the root
 */
app.get('/', (req, res) => {
  return res.sendStatus(200);
});

/**
 * catch requests to unknown routes
 */
app.use((req, res) => res.sendStatus(404));

/**
 * global error handler
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: `Express error handler caught unknown error: ${err}`,
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start the server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
