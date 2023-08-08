import { useEffect, useState } from "react";
import { useDispatch, } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { TabTitle } from "../../../utils/General";
import { getGachas, deleteGacha } from '../../../redux/actions/gachaAction';

import './Gacha.css';

const Gacha = () => {
  const dispatch = useDispatch();
  const [gachas, setGachas] = useState([]);
  const { category } = useParams();
  TabTitle("Admin - Gachas");

  useEffect(() => {
    async function getData() {
      await dispatch(getGachas(category))
        .then(res => {
          setGachas(res);
        });
      window.scrollTo(0, 0);
    }
    getData();
  }, [dispatch, category]);

  const _deleteGacha = async (id) => {
    await dispatch(deleteGacha(id))
      .then(res => {
        setGachas(res);
      });
  }

  const gachaClick = (id) => {
    window.location.href = `/admin/gachas/${id}/history`;
  }

  return (
    <div className="container">
      <div className="p__y__50 d-flex flex-row-reverse">
        <Link to="/admin/gachas/edit">
          <button type="button" className="btn btn-primary">Add New + </button>
        </Link>
      </div>
      <table className="table table-hover m__y__30 p__t__50">
        <thead>
          <tr>
            <th>ID</th>
            <th>画像</th>
            <th>名前</th>
            <th>ポイント</th>
            <th>カテゴリー</th>
            <th>ユーザー数</th>
            <th>所得</th>
            <th>結果</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {gachas.length > 0 && gachas.map((gacha) => (
            <tr key={gacha.id} style={{ cursor: 'pointer' }}>
              <td onClick={() => gachaClick(gacha.id)}>
                {gacha.id}
              </td>
              <td onClick={() => gachaClick(gacha.id)}>
                <img src={`http://localhost:5050/${gacha.image}`} alt={gacha.name} width={100} height={100} />
              </td>
              <td onClick={() => gachaClick(gacha.id)}>
                {gacha.name}
              </td>
              <td onClick={() => gachaClick(gacha.id)}>
                {gacha.point}
              </td>
              <td onClick={() => gachaClick(gacha.id)}>
                {gacha.GachaCategory.name}
              </td>
              <td onClick={() => gachaClick(gacha.id)}>
                {gacha.users}
              </td>
              <td onClick={() => gachaClick(gacha.id)}>
                {gacha.income}
              </td>
              <td onClick={() => gachaClick(gacha.id)}>
                {gacha.outcome}
              </td>
              <td>
                <Link to={`/admin/gachas/edit?id=${gacha.id}`}>
                  <EditIcon color="black" sx={{ width: '35px' }} />
                </Link>
                <IconButton onClick={(event) => _deleteGacha(gacha.id)}>
                  <DeleteOutlineIcon color="black" sx={{ width: '35px' }} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
}

export default Gacha;