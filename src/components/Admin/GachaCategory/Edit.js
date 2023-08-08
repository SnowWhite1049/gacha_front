import { useState } from "react";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TabTitle } from "../../../utils/General";
import { addGachaCategory, editGachaCategory } from '../../../redux/actions/gachaAction';

import './GachaCategory.css';

const GachaCategoryEdit = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id");
  const _name = queryParameters.get("name");
  const dispatch = useDispatch();
  const [name, setName] = useState(_name);
  TabTitle("Admin - GachaCategoryAdd");

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const edit = async (e) => {
    e.preventDefault();
    if (id == null) {
      const data = { name: name };
      console.log(data, id);
      await dispatch(addGachaCategory(data))
        .then(res => {
          if (res.status == 403) {
            toast.error(res.data.error.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
          else {
            window.location.href = "/admin/gacha/categories";
          }
        });
    }
    else {
      const data = { id: id, name: name };
      await dispatch(editGachaCategory(data))
        .then(res => {
          console.log(res);
          if (res.status == 403) {
            toast.error(res.data.error.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
          else {
            window.location.href = "/admin/gacha/categories";
          }
        });
    }
  }

  return (
    <div className="p__y__50">
      <div className="gacha__card__container">
        <div className="login__card">
          <div className="gacha__header m__y__30">
            <h1>ガチャカテゴリ追加 </h1>
          </div>
          <form onSubmit={edit}>
            <div className="login__inputs">
              <div className="email__input__container input__container">
                <label className="email__label input__label">名前</label>
                <input type="text" name="name" className="email__input login__input"
                  placeholder='' onChange={handleChange} required
                  value={name ? name : ''} />
              </div>
              <br />
              <div className="login__button__container">
                <button className="login__button" type="submit" >編集</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default GachaCategoryEdit;