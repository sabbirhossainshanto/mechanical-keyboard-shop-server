import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:5174'] }));
app.use(cookieParser());

/* Applications routes */
app.use('/api/v1', router);

/* get route for home */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
