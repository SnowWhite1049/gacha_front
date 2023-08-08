import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Result.css';

const LotteryResult = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [gifts, setGifts] = useState(localStorage.getItem('gifts') ? JSON.parse(localStorage.getItem('gifts')) : []);
  // localStorage.removeItem('gifts');
  return (
    <div className='container'>
      <div className="d-flex justify-content-between p__y__50">
        <h4>抽選結果</h4>
        <Link to={`/${id}/result`}>
          <button className='btn' > {'発送商品を選ぶ >'} </button>
        </Link>
      </div>
      <div className="gift__wrapper row">
        {gifts.length > 0 ? gifts.map(gift => (
          <Link key={gift.id} to={`/${id}/result?gift_id=${gift.id}`}>
            <div className="gift__card col-md-6"  >
              <div className="d-flex justify-content-between align-items-center">
                <img src={`/asset/gifts/gift.png`} alt={gift.name} className="gift__card__img" />
                <div>
                  <p >{gift.gift_name}</p>
                  <p className="m__b__0">{gift.gift_point}pt</p>
                </div>
              </div>
            </div>
          </Link>
        )) :
          <p>プレゼント画像はありません。</p>}
      </div>
    </div>
  )
}

export default LotteryResult;