import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { TabTitle } from "../../../utils/General";
import { getUsers, deleteUser } from '../../../redux/actions/userAction';

import './AccountManaging.css';

const AccountManaging = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([])
  TabTitle("Admin - Users");

  useEffect(() => {
    async function getData() {
      await dispatch(getUsers())
        .then(res => {
          setUsers(res);
        });
      window.scrollTo(0, 0);
    }
    getData();
  }, [dispatch]);

  const _deleteUser = async (id) => {
    await dispatch(deleteUser(id))
      .then(res => {
        setUsers(res);
      });
  }

  const userClick = (userId) => {
    window.location.href = `/account/gacha/history?user_id=${userId}`
  }

  return (
    <div className="container">
      <div className="p__t__50 d-flex flex-row-reverse">
        {/* <Link to="/account/add">
          <button type="button" class="btn btn-primary">Add New + </button>
        </Link> */}
      </div>
      <table className="table table-hover m__t__30 p__t__50">
        <thead>
          <tr>
            <th>ID</th>
            <th>メール</th>
            <th>名前</th>
            <th>ポイント</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td onClick={() => userClick(user.id)}>
                {user.id}
              </td>
              <td onClick={() => userClick(user.id)}>
                {user.email}
              </td>
              <td onClick={() => userClick(user.id)}>
                {user.first_name} {user.last_name}
              </td>
              <td onClick={() => userClick(user.id)}>
                {user.point}
              </td>
              <td>
                {/* <Link to="/account/edit">
                  <EditIcon color="black" sx={{ width: '35px' }} />
                </Link> */}
                <IconButton onClick={(event) => _deleteUser(user.id)}>
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

export default AccountManaging;