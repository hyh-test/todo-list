// app.js

import express from 'express';
import goodsRouter from './routes/goods.js';
import newsRouter from './routes/news.js';
import connect from './schemas/index.js';


const app = express();
const PORT = 3000; // 서버를 열 때 사용할 포트 번호

connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Express에서 req.body에 접근하여, body 데이터를 사용할 수 있도록 설정하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// localhost:3000/api -> goodsRouter
// localhost:3000/api -> newsRouter
// 2. 라우터를 등록 합니다.
app.use('/api', [goodsRouter, newsRouter]);
// 1. Express.js의 서버를 엽니다.
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});





