import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { getAddresses, setAddress, deleteAddress } from '../../../redux/actions/userAction';
import Auth from '../../../modules/Auth';
import './Address.css';

const Address = () => {
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      await dispatch(getAddresses(Auth.getUserId()))
        .then(res => {
          setAddresses(res);
        });
      window.scrollTo(0, 0);
    }
    getData();
    window.scrollTo(0, 0);
  }, [])

  const editClick = (id) => {
    window.location.href = `/account/address/edit?id=${id}`
  }

  const deleteClick = (id) => {
    dispatch(deleteAddress(id))
      .then(res => {
        setAddresses(res);
      })
  }

  const handleChange = (id) => {
    const _addresses = addresses.map(item => {
      if (item.id == id) {
        item.checked = !item.checked;
      }
      else {
        item.checked = false;
      }
      return item;
    })
    setAddresses(_addresses);
  }

  const setChecked = () => {
    if ($("input[name=checked]:checked").val() !== undefined) {
      dispatch(setAddress($("input[name=checked]:checked").val()))
        .then(res => {
          const gachaId = JSON.parse(localStorage.getItem('gifts'))[0].gacha_id;
          window.location.href = `/${gachaId}/result?addressId=${$("input[name=checked]:checked").val()}`;
        });
    }
    else {
      setError(true);
    }
  }

  return (
    <div className='container p__y__50'>
      <h6 className='text-center'><b>商品配送先住所の設定</b></h6>
      <hr />
      {/* <form> */}
      <div className='address__wrapper'>
        {addresses.length > 0 && addresses.map(address => (
          <div className='address__card d-flex justify-content-between' key={address.id}>
            <div className='d-flex align-items-center'>
              <input type='radio' name="checked" checked={address.checked} value={address.id} onChange={() => handleChange(address.id)} />
              <label className='m__l__10 text-muted'>
                <p className='m__b__0'>{address.first_name} {address.last_name}</p>
                <small>{address.post_code}</small><br />
                <small>{address.state}{address.address}</small>
              </label>
            </div>
            <div className='d-flex align-items-center'>
              <button className='border-none btn btn-light ' onClick={() => editClick(address.id)} style={{ border: 'none' }}>変更</button>
              <button className='btn  text-danger border-none' style={{ border: 'none' }} onClick={() => deleteClick(address.id)}>削除</button>
            </div>
          </div>
        ))}
      </div>
      {/* </form> */}
      <div className='m__t__30 text-center'>
        <Link to={'/account/address/edit'}>
          <button className='btn btn-dark width__420'><b>+ 住所を追加</b></button>
        </Link>
      </div>
      <div className='m__t__30 text-center'>
        {/* <Link to={''}> */}
        <button className='btn btn-danger width__420' onClick={setChecked}><b>決定</b></button>
        <br />
        {error && <small className='text-danger text-center'>まずアドレスを選択する必要があります。</small>}
        {/* </Link> */}
      </div>
    </div>
  )
}

export default Address;