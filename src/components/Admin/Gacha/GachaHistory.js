import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import Auth from '../../../modules/Auth';
import { getGachaHistories, getGacha } from '../../../redux/actions/gachaAction';
// import './ManageAccount.css';

const GachaHistory = () => {
  const dispatch = useDispatch();
  const [histories, setHistories] = useState([]);
  const [gacha, setGacha] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      await dispatch(getGacha(id))
        .then(res => {
          setGacha(res)
        })
      await dispatch(getGachaHistories(id))
        .then(res => {
          setHistories(res);
        });
    }
    getData();
    window.scrollTo(0, 0);
  }, [dispatch])

  const orderClick = (id, status, gachaId) => {
    if (status == 'ordered') {
      localStorage.setItem('gifts', JSON.stringify([histories.find(history => history.id == id)]))
      window.location.href = `/${gachaId}/result?gift_id=${id}`
    }
  }

  return (
    <div className="container p__y__50">
      <div className="d-flex align-items-center gacha__container ">
        {gacha &&
          <>
            <img src={`http://localhost:5050/${gacha.image}`} alt={gacha.name} width={100} height={100} />
            <div className='gacha__text m__l__10'>
              <h5>{gacha.name}</h5>
              <p>{gacha.point}</p>
            </div>
          </>
        }
      </div>
      <table className="table table-hover m__y__30 p__t__50">
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>ギフト名</th>
            <th>プレゼント画像</th>
            <th>ギフトポイント</th>
            <th>日にち</th>
            <th>スターテス</th>
          </tr>
        </thead>
        <tbody>
          {histories.length > 0 && histories.map(history => (
            <tr key={history.id} onClick={() => orderClick(history.id, history.status, history.gacha_id)}>
              <td>
                {history.id}
              </td>
              <td>
                {history.User.first_name} {history.User.last_name}
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
          {histories.length > 0 && gacha && <tr>
            <td colSpan='2'>所得</td>
            <td colSpan='2'>{gacha.income}</td>
            <td colSpan='2'>結果</td>
            <td colSpan='3'>{gacha.outcome}</td>
          </tr>}
          {histories.length == 0 && <tr><td colSpan='7'>歴史はありません。</td></tr>}
        </tbody>
      </table>
    </div >
  );
}

export default GachaHistory;