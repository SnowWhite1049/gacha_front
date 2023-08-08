import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { TabTitle } from "../../../utils/General";
import { getGachaCategories, deleteGachaCategory } from '../../../redux/actions/gachaAction';

import './GachaCategory.css';

const GachaCategory = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([])
  TabTitle("Admin - GachaCategories");

  useEffect(() => {
    async function getData() {
      await dispatch(getGachaCategories())
        .then(res => {
          setCategories(res);
        });
      window.scrollTo(0, 0);
    }
    getData();
  }, [dispatch]);

  const _deleteCategory = async (id) => {
    await dispatch(deleteGachaCategory(id))
      .then(res => {
        setCategories(res);
      });
  }

  const categoryClick = (id) => {
    window.location.href = `/admin/${id}/gachas`;
  }

  return (
    <div className="container">
      <div className="p__y__50 d-flex flex-row-reverse">
        <Link to="/admin/gacha/categories/edit">
          <button type="button" className="btn btn-primary">Add New + </button>
        </Link>
      </div>
      <table className="table table-hover m__y__30 p__t__50">
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 && categories.map((category) => (
            <tr key={category.id} >
              <td onClick={(event) => categoryClick(category.id)}>
                {category.id}
              </td>
              <td onClick={(event) => categoryClick(category.id)}>
                {category.name}
              </td>
              <td>
                <Link to={`/admin/gacha/categories/edit?id=${category.id}&&name=${category.name}`}>
                  <EditIcon color="black" sx={{ width: '35px' }} />
                </Link>
                <IconButton onClick={(event) => {
                  event.preventDefault();
                  _deleteCategory(category.id)
                }}>
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

export default GachaCategory;