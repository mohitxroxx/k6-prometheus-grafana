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

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [50, 100, 300, 500, 750, 1000, 2000]
});

app.get('/', (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.status(201).json({ msg: 'Server Live' });
  end({ method: req.method, route: '/', status_code: 201 });
});

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});


const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is up and Running at http://localhost:${port}`);
});


