import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './LoginCard.css';

import { loginAction } from '../../../redux/actions/userAction';

const LoginCard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const login = (e) => {
    e.preventDefault();
    if (data.email && data.password) {
      dispatch(loginAction(data))
        .then(res => {
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
        })
    }
    else {
      toast.error('Invalid field', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  return (
    <React.Fragment>
      {loading ?
        <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />
        :
        <div className="login__card__container">
          <div className="login__card">
            <div className="login__header">
              <h1>ログイン</h1>
            </div>
            <form >
              <div className="login__inputs">
                <div className="email__input__container input__container">
                  <label className="email__label input__label">メール</label>
                  <input type="email" name="email" className="email__input login__input" placeholder='example@gmail.com' onChange={handleChange} required />
                </div>
                <br />
                <div className="password__input__container input__container">
                  <label className="password__label input__label" >パスワード</label>
                  <input type="password" name="password" className="password__input login__input" placeholder='**********' onChange={handleChange} required />
                </div>
                <div className="login__button__container">
                  <button className="login__button" type="submit" onClick={login}>ログイン</button>
                </div>
              </div>
            </form>
            <div className="login__other__actions">
              <div className="login__forgot__password">パスワードを忘れましたか？</div>
              <div className="login__new__account">アカウントをお持ちではありませんか? <Link to="/account/register">会員登録</Link> </div>
            </div>
          </div>
          <ToastContainer />
        </div>}
    </React.Fragment>
  );
}

export default LoginCard;