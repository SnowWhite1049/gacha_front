import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Badge from '@mui/material/Badge';
import CheckIcon from '@mui/icons-material/Check';

import { getAddress } from '../../redux/actions/userAction';
import { confirmReturn, confirmDeliver } from '../../redux/actions/gachaAction';
import Auth from '../../modules/Auth';
import './Result.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Result = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const params = new URLSearchParams(window.location.search)
  const giftId = params.get('gift_id');
  const addressId = params.get('addressId');
  const [gifts, setGifts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [address, setAddress] = useState(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openModal1 = () => setOpen1(true);
  const closeModal1 = () => setOpen1(false);

  useEffect(() => {
    const _gifts = localStorage.getItem('gifts') ? JSON.parse(localStorage.getItem('gifts')) : [];
    if (giftId) {
      const results = _gifts.filter((gift) => {
        return gift.id == giftId;
      })
      setGifts(results);
      // setSelected(results[0].id);
    }
    else {
      setGifts(_gifts);
      // setSelected(_gifts[0].id);
    }
    if (addressId) {
      dispatch(getAddress(addressId))
        .then(res => {
          setAddress(res);
        })
    }
    window.scrollTo(0, 0);
  }, [dispatch, giftId])

  const cardClick = (id) => {
    setDisabled(!disabled);
    setSelected(id);
  }

  const returnClick = () => {
    setDisabled(!disabled);
    openModal();
  }

  const sendGift = () => {
    if (selected) {
      dispatch(confirmDeliver(selected, Auth.getUserId()))
        .then(res => {
          console.log(res);
          if (res == true) {
            let l_gifts = [];
            if (gifts.length > 1) {
              l_gifts = gifts.filter((gift) => {
                return gift.id !== selected;
              })
              setGifts(l_gifts);
              localStorage.setItem('gifts', JSON.stringify(l_gifts));
            }
            else if (gifts.length == 1) {
              setGifts([]);
              localStorage.removeItem('gifts');
            }
            alert('発送中...');
          }
        })
    }
    else {
      alert('プレゼント画像を選択してください。');
      closeModal();
    }
  }

  const confirmBack = () => {
    console.log(selected);
    if (selected) {
      dispatch(confirmReturn(selected, Auth.getUserId()))
        .then(res => {
          console.log(res);
          if (res == true) {
            let l_gifts = [];
            if (gifts.length > 1) {
              l_gifts = gifts.filter((gift) => {
                return gift.id !== selected;
              });
              console.log(l_gifts);
              setGifts(l_gifts);
              localStorage.setItem('gifts', JSON.stringify(l_gifts));
            }
            else if (gifts.length == 1) {
              setGifts([]);
              localStorage.removeItem('gifts');
            }
            closeModal();
            // openModal1();
          }
        })
    }
    else {
      alert('プレゼント画像を選択してください。')
      closeModal();
    }
  }

  const confirmBack1 = () => {
    // window.location.href = '/';
  }

  return (
    <div className='container d-flex flex__column'>
      {open1}
      <div className=" p__y__50">
        <h4>発送する商品をクリック</h4>
        <p>発送されない商品はポイントに還元されます</p>
      </div>
      <div className="gift__wrapper ">
        {gifts.length > 0 ? gifts.map(gift => (
          <Badge color="success" badgeContent={<CheckIcon />} className="col-md-6" anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} invisible={selected !== gift.id} key={gift.id}>
            <div className="gift__card full__width" onClick={() => cardClick(gift.id)} >
              <div className="d-flex justify-content-between align-items-center">
                <img src={`/asset/gifts/gift.png`} alt={gift.name} className="gift__card__img" />
                <div>
                  <p >{gift.gift_name}</p>
                  <p className="m__b__0">{gift.gift_point}pt</p>
                </div>
              </div>
            </div>
          </Badge>
        )) :
          <p>プレゼント画像はありません。</p>}
      </div>
      <div className='gift__space'></div>
      <div className="gift__action">
        <div className='row'>
          <div className='col-md-6'>
            <p>還元ポイント</p>
            <p>{disabled && gifts.length > 0 ? gifts[0].gift_point : 0}pt</p>
            <p>{disabled ? 1 : 0}枚/{gifts.length}枚</p>
          </div>
          <div className=" col-md-6">
            <p>郵送先</p>
            <div className='d-flex justify-content-between border' onClick={(e) => window.location.href = '/account/address'}>
              <p className='m__b__0'>
                {addressId && address !== null ?
                  <>
                    {address.first_name}{address.last_name}
                    <br />
                    <span className='text-muted'>{address.post_code}{address.state}{address.address}</span>
                  </>
                  : '郵送先を登録してください'}
              </p>
              <p className='m__b__0'>{'>'}</p>
            </div>
          </div>
        </div>
        <button className='btn btn-dark full__width m__t__15' onClick={returnClick} >すべてポイント還元する</button>
        <button className='btn btn-danger full__width m__t__15' disabled={!(selected && addressId)} onClick={sendGift}>{!(selected && addressId) ? "発送する" : "1枚発送する"}</button>
      </div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
            残りはポイント還元
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
            選択されていない商品はクローブポイントに還元され、保有ポイントに加算されます。
          </Typography>
          <button onClick={confirmBack} className='btn btn-dark full__width m__t__15' >ポイント還元</button>
          <button className='btn btn-light m__t__15 full__width' onClick={closeModal} >キャンセル</button>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={closeModal1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
            ポイント還元しました
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
            ポイント還元しました
          </Typography>
          <button onClick={confirmBack1} className='btn btn-dark full__width m__t__15' >確認</button>
        </Box>
      </Modal>
    </div>
  )
}

export default Result;