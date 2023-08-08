import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Control.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cart from '../../Card/Cart/Cart';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import Auth from '../../../modules/Auth';
import { getUser } from '../../../redux/actions/userAction'

const Control = () => {
  const dispatch = useDispatch();
  const wishItems = useContext(WishItemsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.getUserId() != undefined);
  const [isAdmin, setIsAdmin] = useState(Auth.getToken() ? Auth.getUserRole() == 'admin' : false);
  const [point, setPoint] = useState(localStorage.getItem('point') ? JSON.parse(localStorage.getItem('point')) : null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function getData() {
      // await dispatch(getUser(Auth.getUserId()))
      //   .then(res => {
      //     setUser(res);
      //   });
      // window.scrollTo(0, 0);
    }
    getData();
    window.scrollTo(0, 0);
  }, [dispatch])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    Auth.logout();
    localStorage.removeItem('point');
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success('Successfully logged out!', {
      position: toast.POSITION.TOP_RIGHT
    });
    window.location.href = "/";
  }

  return (
    <div className="control__bar__container">
      <div className="controls__container">
        {isLoggedIn ?
          <>
            <Link className="m__r__30" to="/account/point">
              <Badge
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                color="error"
                badgeContent='+'
              >
                <button className="btn btn-secondary point__button">{point && point}pt</button>
              </Badge>
            </Link>
            <div className="control">
              <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <PersonIcon color="black" size="large" sx={{ width: '35px' }} />
              </IconButton>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link to="/account/manage">
                <MenuItem >プロフィールの編集</MenuItem>
              </Link>
              <Link to="/account/point">
                <MenuItem >ポイントをチャージする</MenuItem>
              </Link>
              <Link to="/account/gacha/history">
                <MenuItem >ガチャ履歴</MenuItem>
              </Link>
              {isAdmin &&
                <Link to="/admin/users">
                  <MenuItem>管理者ページ</MenuItem>
                </Link>
              }
              <MenuItem onClick={logout}>ログアウト</MenuItem>
            </Menu>

          </>
          :
          <div className="control">
            <Link to="/account/login">
              <LockOpenIcon color="black" size="large" sx={{ width: '35px' }} />
            </Link>
          </div>
        }
        {/* <div className="control">
          <Link to="/wishlist">
            <Badge badgeContent={wishItems.items.length} color="error">
              <FavoriteBorderIcon color="black" sx={{ width: '35px' }} />
            </Badge>
          </Link>
        </div>
        <div className="control">
          <Cart />
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Control;