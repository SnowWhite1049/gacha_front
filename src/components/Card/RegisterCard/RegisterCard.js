import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './RegisterCard.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { registerAction } from '../../../redux/actions/userAction';

const RegisterCard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  const register = (e) => {
    e.preventDefault();
    dispatch(registerAction(data))
      .then(res => {
        console.log(res);
        if (res.status == 403) {
          toast.error(res.data.error.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else {
          window.location.href = "/";
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header">
          <h1>会員登録</h1>
        </div>
        <form onSubmit={register} >
          <div className="register__inputs">
            <div className="fname__input__container reg__input__container">
              <label className="fname__label input__label">名</label>
              <input type="text" name="first_name" className="fname__input register__input" required onChange={handleChange} />
            </div>
            <br />
            <div className="lname__input__container reg__input__container">
              <label className="lname__label input__label">前</label>
              <input type="text" name="last_name" className="lname__input register__input" required onChange={handleChange} />
            </div>
            <br />
            <div className="email__input__container reg__input__container">
              <label className="email__label input__label">メール</label>
              <input type="email" name="email" className="email__input register__input" placeholder='example@gmail.com' required onChange={handleChange} />
            </div>
            <br />
            <div className="password__input__container reg__input__container">
              <label className="password__label input__label">パスワード</label>
              <input type="password" name="password" className="password__input register__input" required onChange={handleChange} />
            </div>
            <br />
            <div className="register__button__container">
              <button className="register__button" type="submit">会員登録</button>
            </div>
          </div>
        </form>
        <br />
        <div className="register__other__actions">
          <div className="register__login__account">アカウントをお持ちですか? <Link to="/account/login">ログイン</Link></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterCard;