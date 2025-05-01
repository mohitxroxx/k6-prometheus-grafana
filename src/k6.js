import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // hit with 100 users
    { duration: '1m', target: 200 },
    { duration: '1m', target: 400 }, 
    { duration: '30s', target: 0 } 
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'], // 95% of requests under 800ms
    http_req_failed: ['rate<0.05'],   // <5% errors
  },
};

export default function () {
  const res = http.get('http://localhost:3000/');
  check(res, {
    'status is 201': (r) => r.status === 201,
  });
}




//k6 run k6.js for running it
//pr first install k6 