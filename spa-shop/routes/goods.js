import express from 'express';
import Goods from '../schemas/goods.js';

const router = express.Router();

//api 구현
router.post('/goods', async (req, res) => {
  //데이터 가져오기
  const { goodsId, name, thumbnailUrl, category, price } = req.body;
  //goodsId중복 확인 데이터를 조회해서 실제로 있는지 확인
  //exec promise 형태로 반환된다 데이터를 조회하라면 왠만하면 붙이자
  const goods = await Goods.find({ goodsId: goodsId }).exec(); // 데이터를 생성할떄는 안되고 조회할떄만 된다.
  //중복된다면 에러메세지
  if (goods.length) {
    return res.status(400).json({ errorMessage: '이미 존재하는 데이터입니다.' });
  }

  //상품을 생성한다
  const createdGoods = await Goods.create({
    goodsId: goodsId,
    name: name,
    thumbnailUrl: thumbnailUrl,
    category: category,
    price: price,
  })

  //클라이언트에 정보 전달 응답
  return res.status(201).json({ goods: createdGoods });
})

export default router;