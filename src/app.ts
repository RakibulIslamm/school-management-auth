import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/modules/user/middlewares/globalErrorHandler';
import userRouter from './app/modules/user/user.routes';
import { errorLogger } from './shared/logger';

const app: Application = express();

app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

app.use('/api/users', userRouter);

// app.get('/error', async (req: Request, res: Response) => {
//   Promise.reject(new Error('Testing error'))
//   // res.send('Hello From Server')
// })

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Server');
});
app.use(globalErrorHandler);

export default app;
