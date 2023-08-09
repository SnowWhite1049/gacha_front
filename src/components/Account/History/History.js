import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Account from '../Account';
import Auth from '../../../modules/Auth';
import { getUserHistories } from '../../../redux/actions/gachaAction';
// import './ManageAccount.css';

const History = () => {
  const dispatch = useDispatch();
  const [histories, setHistories] = useState([]);
  const params = new URLSearchParams(window.location.search)
  const userId = params.get('user_id');

  useEffect(() => {
    async function getData() {
      if (userId) {
        await dispatch(getUserHistories(userId))
          .then(res => {
            setHistories(res);
          });
      }
      else {
        await dispatch(getUserHistories(Auth.getUserId()))
          .then(res => {
            setHistories(res);
          });
      }
    }
    getData();
    window.scrollTo(0, 0);
  }, [dispatch])

  const orderClick = (id, status, gachaId, userId) => {
    if (status == 'ordered' && userId == Auth.getUserId()) {
      localStorage.setItem('gifts', JSON.stringify([histories.find(history => history.id == id)]))
      window.location.href = `/${gachaId}/result?gift_id=${id}`
    }
  }

  return (
    <div className="container">
      <table className="table table-hover m__y__30 p__t__50">
        <thead>
          <tr>
            <th>ID</th>
            <th>ガチャ</th>
            <th>ギフト名</th>
            <th>プレゼント画像</th>
            <th>ギフトポイント</th>
            <th>日にち</th>
            <th>スターテス</th>
          </tr>
        </thead>
        <tbody>
          {histories.length > 0 && histories.map(history => (
            <tr key={history.id} onClick={() => orderClick(history.id, history.status, history.gacha_id, history.user_id)}>
              <td>
                {history.id}
              </td>
              <td>
                {history.Gacha.name}
              </td>
              <td>
                {history.gift_name}
              </td>
              <td>
                <img src={`/asset/gifts/gift.png`} alt={history.gift_name} width={100} height={100} />
              </td>
              <td>
                {history.gift_point}pt
              </td>
              <td>
                {new Date(history.updatedAt).toISOString().slice(0, 10)}
              </td>
              <td>
                {history.status}
              </td>
            </tr>
          ))}
          {histories.length == 0 && <tr><td colSpan='7'>歴史はありません。</td></tr>}
        </tbody>
      </table>
    </div >
  );
}

export default History;