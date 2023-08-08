import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import noImage from '../../../asset/gachas/no-image.png';
import { TabTitle } from "../../../utils/General";
import Auth from '../../../modules/Auth';
import { getGachaCategories, getGacha, addGacha, editGacha } from '../../../redux/actions/gachaAction';

import './Gacha.css';

const GachaEdit = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id");
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [gacha, setGacha] = useState({ name: '', point: '', category_id: '' });
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function getData() {
      if (id != null) {
        await dispatch(getGacha(id))
          .then(res => {
            setImage(`http://localhost:5050/${res.image}`);
            setGacha(res);
          });
      }
      await dispatch(getGachaCategories())
        .then(res => {
          setCategories(res);
        });
      window.scrollTo(0, 0);
    }
    getData();
  }, [dispatch, id]);

  TabTitle("Admin - GachaAdd");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGacha({ ...gacha, [name]: value });
  }

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    const _formData = new FormData();
    _formData.append('image', file);
    setFormData(_formData);
  };

  const edit = async (e) => {
    e.preventDefault();
    if (!gacha.name || !gacha.point || !gacha.category_id) {
      toast.error('入力フィールドは必ず入力する必要があります。', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
    if (id == null) {
      const data = gacha;
      await dispatch(addGacha(data))
        .then(async (res) => {
          if (res.status == 403) {
            toast.error(res.data.error.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
          else {
            if (Auth.user_token && formData) {
              const token = Auth.getToken();
              await axios.post(`http://localhost:5050/gachas/${res.id}/image`, formData, {
                headers: {
                  authorization: token
                }
              })
                .then((response) => {
                  window.location.href = "/admin/all/gachas";
                })
                .catch((error) => {
                  if (error.response.status == 401) {
                    window.location.href = '/account/login';
                  }
                  console.error(error);
                });
            }
          }
        });
    }
    else {
      const data = gacha;
      await dispatch(editGacha(data))
        .then(async (res) => {
          if (res.status == 403) {
            toast.error(res.data.error.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
          else {
            if (formData) {
              const token = Auth.getToken();
              await axios.post(`http://localhost:5050/gachas/${res.id}/image`, formData, {
                headers: {
                  authorization: token
                }
              })
                .then((response) => {
                  window.location.href = "/admin/all/gachas";
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            else {
              window.location.href = "/admin/all/gachas";
            }
          }
        });
    }
  }

  return (
    <div className="p__y__50">
      <div className="gacha__card__container">
        <div className="login__card">
          <div className="gacha__header m__y__30">
            <h1>ガチャ追加 </h1>
          </div>
          <form onSubmit={edit}>
            <div className="login__inputs">
              <div className="email__input__container input__container">
                <label className="email__label input__label">名前</label>
                <input type="text" name="name" className="email__input login__input"
                  placeholder='' onChange={handleChange} required value={gacha ? gacha.name : ''}
                />
              </div>
              <br />
              <label className="email__label input__label">画像</label>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src={image ? image : noImage} alt="uploaded image" className="image-preview" />
                  </div>
                )}
              </Dropzone>
              <div className="email__input__container input__container">
                <label className="email__label input__label">ポイント</label>
                <input type="number" name="point" className="email__input login__input"
                  placeholder='' onChange={handleChange} required value={gacha ? gacha.point : ''}
                />
              </div>
              <br />
              <div className="email__input__container input__container">
                <label className="email__label input__label">カテゴリー</label>
                <select className="form-control" id="category" name="category_id" value={gacha && gacha.category_id} onChange={handleChange}>
                  <option></option>
                  {categories.length > 0 && categories.map(category => (
                    <option key={category.id} value={category.id} >{category.name}</option>
                  ))}
                </select>
              </div>
              <br />
              <div className="login__button__container m__b__30">
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

export default GachaEdit;
