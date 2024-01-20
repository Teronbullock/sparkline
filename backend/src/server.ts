
import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { workoutRouter } from './routes/workout-route.js';
import { userRouter } from './routes/user-route.js';
import { exercisesRouter } from './routes/exercises-route.js';

// The port the server will run on
const port = process.env.PORT || 5000;
const currentWorkingDirectory = process.cwd();
const envPath = path.resolve(currentWorkingDirectory, '.env');
const result = dotenv.config({ path: envPath });
const app = express(); 


app.use(helmet());
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;


if (uri) {
  mongoose.connect(uri);

  const connection = mongoose.connection;
  
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
} else {
  console.log('unable to connect to MongoDB database, check the connection string');
}

app.use('/api/workout', workoutRouter);
app.use('/api/user', userRouter);
app.use('/api/exercises', exercisesRouter);


// disable favicon requests
app.use('/favicon.ico', (req, res, next) => {
  res.status(204).end();
});

// cate 404 and forward to error handler
interface CustomError extends Error {
  status?: number;
  cause?: string | null | unknown;
  local?: string | null | unknown;
}

app.use((req, res, next) => {
  let err: CustomError = new Error('Not Found');
  err.status = 404;
  console.log('404 error');
  next(err);
});

// error handler
const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {

  // define the error status and add it to the response object
  const status = error.status || 500;

  if (typeof status === 'number') {
    res.status(status);
  }

  let cause = error.cause || 'No cause provided';
  
  // log the error message and status to the console
  console.log('Error: ',{
    'Error': error.message,
    'Status': error.status,
    'Cause': cause,
    'local': error.local
  });

  res.json({
    error: {
      message: error.message,
      cause: cause
    }
  });


}

app.use(errorHandler);

const keyPath = path.resolve(currentWorkingDirectory, 'certs', 'key.pem');
const certPath = path.resolve(currentWorkingDirectory, 'certs', 'cert.pem');

https.createServer({
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}, app).listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
