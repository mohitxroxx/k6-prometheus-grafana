import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import client from 'prom-client';

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


const register = new client.Registry();
client.collectDefaultMetrics({ register }); 



const rootRequestCounter = new client.Counter({
  name: 'root_requests_total',
  help: 'Total requests to root (/) route',
  labelNames: ['method', 'status'],
});
register.registerMetric(rootRequestCounter);


app.get('/', async (req: Request, res: Response) => {
  rootRequestCounter.inc({ method: req.method, status: 201 });
  
  const randomData = Date.now();
  return res.status(201).json({ msg: `Server is Live!!!🚀, Epoch: ${randomData}` });
});


app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is up and Running at http://localhost:${port}`);
});
