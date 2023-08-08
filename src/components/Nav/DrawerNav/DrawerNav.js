import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Control from '../Controls/Control';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Form from '../Search-Bar/Form';
import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import Auth from '../../../modules/Auth';

const DrawerNav = () => {
  const [state, setState] = useState({
    left: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.getUserId() != undefined);
  const [isAdmin, setIsAdmin] = useState(Auth.getToken() ? Auth.getUserRole() == 'admin' : false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    Auth.logout();
    localStorage.removeItem('point');
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/";
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className='p__y__50'
    >
      {isLoggedIn ?
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <HomeIcon />
              <ListItemText className='m__l__10'>
                <Link to="/">ホーム</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <CurrencyYenIcon />
              <ListItemText className='m__l__10'>
                <Link to="/account/manage">プロフィールの編集</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <PersonIcon />
              <ListItemText className='m__l__10'>
                <Link to="/account/point">ポイントをチャージする</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <HistoryIcon />
              <ListItemText className='m__l__10'>
                <Link to="/account/gacha/history">ガチャ履歴</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          {isAdmin &&
            <ListItem disablePadding>
              <ListItemButton>
                <AdminPanelSettingsIcon />
                <ListItemText className='m__l__10'>
                  <Link to="/account/gacha/history">管理者ページ</Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          }
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <LogoutIcon />
              <ListItemText className='m__l__10'>
                <Link to="/account/gacha/history">ログアウト</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List> :
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <HomeIcon />
              <ListItemText className='m__l__10'>
                <Link to="/">ホーム</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton >
              <LockOpenIcon />
              <ListItemText className='m__l__10'>
                <Link to="/account/login">ログイン</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      }
      {/* <List>
        <ListItem disablePadding>
          <Control />
        </ListItem>
      </List>
      <List>
        <ListItem>
          <div className="search__drawer">
            <Form />
          </div>
        </ListItem>
      </List> */}
      <Divider />
    </Box>
  );

  return (
    <Fragment>
      {['left'].map((anchor, index) => (
        <Fragment key={index}>
          {state.left ? <MenuOpenIcon fontSize='large' /> : <MenuIcon fontSize='large' onClick={toggleDrawer(anchor, true)} />}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default DrawerNav;