import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Auth from '../../../modules/Auth';
import { chargePoint } from '../../../redux/actions/userAction';

const Purchase = () => {
  const stripe = require('stripe')('sk_test_51NcUQmHhRTfZKB1gcqblyYdQdFVQ0Bh8FVEcA6gRWiu3SfeVP0nowLDjiwki1AwCqpTi0T6WJa76mXCgU3JYptAp00DVscUqTO');
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get('amount');
  const session_id = urlParams.get('session_id');
  const payment_token = urlParams.get('payment_token');
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSession() {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if ((session && session.status == 'complete') && (payment_token == JSON.parse(localStorage.getItem('payment_token')))) {
        await dispatch(chargePoint(amount, Auth.getUserId()))
          .then(res => {
            console.log(res);
            localStorage.removeItem('payment_token');
          });
      }
      else {
        alert('セッションの取得中にエラーが発生しました。');
      }
    }
    if (session_id !== null) {
      getSession();
    }
    else {
      alert('支払いが見つかりませんでした。');
    }
  }, [dispatch]);

  return (
    <div className='container p__y__50'>
      <div className='text-center'>
        充電ポイント…
      </div>
    </div>
  );
}

export default Purchase;