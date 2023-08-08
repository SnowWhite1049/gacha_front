import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import Auth from '../../../modules/Auth';
import './Point.css';

const data = [
  {
    point: 500,
    image: '500pt.png'
  },
  {
    point: 1000,
    image: '1000pt.png'
  },
  {
    point: 5000,
    image: '5000pt.png'
  },
  {
    point: 10000,
    image: '10000pt.png'
  },
  {
    point: 50000,
    image: '50000pt.png'
  },
  {
    point: 100000,
    image: '100000pt.png'
  },
  {
    point: 500000,
    image: '500000pt.png'
  },
]
//6520047
const Point = () => {
  const [point, setPoint] = useState(localStorage.getItem('point'));
  const stripe = require('stripe')('sk_test_51NcUQmHhRTfZKB1gcqblyYdQdFVQ0Bh8FVEcA6gRWiu3SfeVP0nowLDjiwki1AwCqpTi0T6WJa76mXCgU3JYptAp00DVscUqTO');
  const stripePromise = loadStripe('pk_test_51NcUQmHhRTfZKB1gIxF3lOTgjYxNRPK8M7cGSq8yGoUQl4ZfYRiW1f5Stoq280kpmanI3lGCCMb1SjfuWx5HdW4T00LLBIldIm');

  async function getCustomer(amount) {
    const payment_token = (+new Date * Math.random()).toString(36).substring(0, 6);
    let data = {
      "payment_method_types[]": "card",
      line_items: [{
        price_data: {
          currency: "jpy",
          unit_amount: amount,
          product_data: {
            name: "test product",
          },
        },
        quantity: 1,
      },],

      mode: 'payment',
      allow_promotion_codes: false,
      billing_address_collection: "required",

      success_url: `http://localhost:3000/point/purchase/success?session_id={CHECKOUT_SESSION_ID}&amount=${amount}&payment_token=${payment_token}`,
      cancel_url: `http://localhost:3000/account/point`,
    }
    const session = await stripe.checkout.sessions.create(data);
    const stripe1 = await stripePromise;
    localStorage.setItem('payment_token', JSON.stringify(payment_token));
    return await stripe1?.redirectToCheckout({
      sessionId: session.id,
    });
  }
  const pay = (amount) => {
    getCustomer(amount);
  }
  return (
    <div className='container'>
      <h4 className='p__t__50'><b>ポイント購入</b></h4>
      <hr className='m__b__0' />
      <div className='point__card p__15'>
        <div className='d-flex justify-content-between'>
          <p>所持ポイント</p>
          <p><b>{point} points</b></p>
        </div>
        <p>銀行振込の場合はポイントの反映までお時間を頂戴いたします。お急ぎの場合はカード決済等をご利用くださいませ。</p>
        {data.length > 0 && data.map(datum => (
          <div className="point__wrapper p__15" key={datum.point.toLocaleString()}>
            <div className='d-flex justify-content-between align-items-center'>
              <div className="point__content d-flex align-items-center">
                <img src={`/asset/icons/${datum.image}`} alt={datum.image} />
                <div className='m__l__10'>
                  <h5>{datum.point} points</h5>
                  <p className="m__b__0">{datum.point.toLocaleString()}円で購入</p>
                </div>
              </div>
              <button className="btn btn-dark" onClick={() => pay(datum.point)}>購入する</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Point;

