import express from 'express';
import cors from 'cors';
import path from 'path';
import metricServerRouter from './routes/metricServerRouter.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
var __dirname = dirname(fileURLToPath(import.meta.url));
var app = express();
var PORT = 3000;
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
app.get('/', function (req, res) {
    return res.sendStatus(200);
});
/**
 * catch requests to unknown routes
 */
app.use(function (req, res) { return res.sendStatus(404); });
/**
 * global error handler
 */
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: "Express error handler caught unknown error: ".concat(err),
        status: 500,
        message: { err: 'An error occured' },
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
/**
 * start the server
 */
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
export default app;
