import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactLoading from 'react-loading';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { getGacha, getGifts } from '../redux/actions/gachaAction';
import { getUser } from '../redux/actions/userAction';
import dollarCoin from '../asset/icons/dollar-coin.png';
import Auth from '../modules/Auth';
import './GachaView.css';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GachaView = () => {
  const dispatch = useDispatch();
  const { gachaId } = useParams();
  const [gacha, setGacha] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.getToken()!=undefined);
  const [point, setPoint] = useState(localStorage.getItem('point')?JSON.parse(localStorage.getItem('point')):0);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      await dispatch(getGacha(gachaId))
        .then(res => {
          setGacha(res);
          setLoading(false);
        });
      // await dispatch(getUser(Auth.getUserId()))
      //   .then(res => {
      //     setUser(res);
      //     // setLoading(false);
      //   });
    }
    getData();
    window.scrollTo(0, 0);
  }, [dispatch, gachaId])

  const handleClick=(num)=>{
    if(isLoggedIn){
      if(gacha.point <= point){
        // window.location.href=`/${gacha.id}/lottery/result/${num}`
        dispatch(getGifts(gacha.id, num))
        .then(res => {
          // setGifts(res);
          if(res){
            window.location.href=`/${gacha.id}/lottery/result`;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
      else {
        openModal();
      }
    }
    else{
      window.location.href='/account/login'
    }
  }

  return (
    <div className='container'>
      {!gacha && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
      {gacha&&
        <React.Fragment>
          <div className="product__card__card item" >      
            {/* <Link to={`/gachas/${gacha.id}`}> */}
              <div className="product__card" style={{ backgroundImage: `url(http://localhost:5050/${gacha.image})` }}>
                <div className="product__name">
                  {gacha.name}
                </div>
                <div className="product__card__detail">
                  <div className="product__card__price__wrapper">
                    <div className="product__card__price">
                      <svg viewBox="0 0 81 25" focusable="false" className="product__card__price__box" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 1H15.6243L15.3415 1.24742L3.3415 11.7474L2.48141 12.5L3.3415 13.2526L15.3415 23.7526L15.6243 24H16H65H65.3757L65.6585 23.7526L77.6585 13.2526L78.5186 12.5L77.6585 11.7474L65.6585 1.24742L65.3757 1H65H16Z" fill="white" stroke="#D8D8D8" strokeWidth="2"></path>
                      </svg>
                      <div className="dollar__coin">
                        <span >
                          <img src={dollarCoin} decoding="async" data-nimg="intrinsic" />
                        </span>
                      </div>
                      <p className="product__price">{gacha.point}</p>
                    </div>
                  </div>
                  <p className="product__card__top">
                    <span >のこり</span>5,459/30,000
                  </p>
                </div>
              </div>
            {/* </Link> */}
          </div>
          <div className='d-flex justify-content-around margin button__wrapper'>
            <button type="button" className="btn btn-dark fixed__button" onClick={()=>handleClick(1)}>ガチャる</button>
            <button type="button" className="btn btn-danger fixed__button" onClick={()=>handleClick(10)}>10連 ガチャる</button>
          </div>
        </React.Fragment>
      }
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
            ポイントが足りません
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
            ガチャを回すためにはポイントが必要です。 ポイントはポイント購入ページで
            チャージすることができます。
          </Typography>
          <Link to="/account/point" className='btn btn-dark full__width m__t__15' >ポイントを購入する</Link>
          <button className='btn btn-light m__t__15 full__width' onClick={closeModal} >キャンセル</button>
        </Box>
      </Modal>
    </div>
  );
}

export default GachaView;