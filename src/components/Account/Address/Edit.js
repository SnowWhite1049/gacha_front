import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Auth from '../../../modules/Auth';
import { addAddress, editAddress, getAddress } from '../../../redux/actions/userAction';
import './Address.css';

const states = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県',
  '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県',
  '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県',
  '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県',
  '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
]

const Edit = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id");
  const dispatch = useDispatch();
  const history = useHistory();
  const [disabled, setDisabled] = useState(id ? false : true);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    kana_first: '',
    kana_last: '',
    post_code: '',
    phone_number: '',
    state: '',
    address: '',
  });
  const userId = Auth.getUserId();

  useEffect(() => {
    if (id) {
      async function getData() {
        await dispatch(getAddress(id))
          .then(res => {
            setUser(res);
          });
      }
      getData();
      window.scrollTo(0, 0);
    }
  }, [dispatch, id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if ((user.first_name !== '' && user.first_name !== null) &&
      (user.last_name !== '' && user.last_name !== null) &&
      (user.kana_first !== '' && user.kana_first !== null) &&
      (user.kana_last !== '' && user.kana_last !== null) &&
      (user.post_code !== '' && user.post_code !== null) &&
      (user.phone_number !== '' && user.phone_number !== null) &&
      (user.state !== '' && user.state !== null) &&
      (user.address !== '' && user.address !== null)) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      const data = {
        // id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        kana_first: user.kana_first,
        kana_last: user.kana_last,
        post_code: user.post_code,
        state: user.state,
        address: user.address,
        phone_number: user.phone_number,
      }
      if (!id) {
        dispatch(addAddress(data, userId))
          .then(res => {
            history.goBack();
          });
      }
      else {
        dispatch(editAddress(data, id))
          .then(res => {
            history.goBack();
          });
      }
    }
  }

  return (
    <div className='container p__y__50'>
      <div className="manage__account__container">
        <div className="edit__account__container">
          <div className="edit__account " style={{ width: '100%' }}>
            <div className="edit__account__form__container">
              <form className="edit__account__form ">
                <div className='row'>
                  <div className="fname__input__container col-md-6">
                    <label className="fname__label input__label">姓</label>
                    <input type="text" name="first_name"
                      className="fname__input edit__account__input"
                      placeholder='山田'
                      value={user && user.first_name ? user.first_name : ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="lname__input__container col-md-6">
                    <label className="lname__label input__label">名</label>
                    <input type="text" name="last_name"
                      className="lname__input edit__account__input"
                      placeholder='太郎'
                      value={user && user.last_name ? user.last_name : ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br /><br />
                <div className='row'>
                  <div className="fname__input__container col-md-6">
                    <label className="fname__label input__label">姓（カナ）</label>
                    <input type="text" name="kana_first"
                      className="fname__input edit__account__input"
                      placeholder='ヤマダ'
                      value={user && user.kana_first ? user.kana_first : ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="lname__input__container col-md-6">
                    <label className="lname__label input__label">名（カナ）</label>
                    <input type="text" name="kana_last"
                      className="lname__input edit__account__input"
                      placeholder='タロウ'
                      value={user && user.kana_last ? user.kana_last : ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br /><br />
                <div className='row'>
                  <div className="fname__input__container col-md-6">
                    <label className="fname__label input__label">郵便番号</label>
                    <input type="text" name="post_code"
                      className="fname__input edit__account__input"
                      placeholder='必須項目です'
                      value={user && user.post_code ? user.post_code : ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br /><br />
                <div className='row'>
                  <div className="fname__input__container col-md-6">
                    <label className="fname__label input__label">都道府県</label>
                    <select name='state'
                      className="fname__input edit__account__input"
                      value={user && user.state ? user.state : ''}
                      onChange={handleChange}
                    >
                      <option>選択してください</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <br /><br />
                <div className='row'>
                  <div className="fname__input__container col-md-12">
                    <label className="fname__label input__label">住所 （本人確認書類に記載されているもの）</label>
                    <input type="text" name='address'
                      className="fname__input edit__account__input"
                      placeholder='千代田区1-1-1 トラストビル 101号室'
                      value={user && user.address ? user.address : ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br /><br />
                <div className='row'>
                  <div className="fname__input__container col-md-12">
                    <label className="fname__label input__label">電話番号</label>
                    <input type="text" name='phone_number'
                      className="fname__input edit__account__input"
                      placeholder='0312345678'
                      value={user && user.phone_number ? user.phone_number : ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <br /><br />
                <div className='row'>
                  <div className="fname__input__container col-md-6">
                    <button className='btn btn-light full__width' onClick={(e) => {
                      e.preventDefault();
                      history.goBack()
                    }}>キャンセル</button>
                  </div>
                  <div className="fname__input__container col-md-6">
                    <button
                      className='btn btn-light full__width'
                      disabled={disabled}
                      onClick={handleClick}
                    >保存</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;