import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import './NavLinks.css'

import Auth from '../../../modules/Auth';


const AdminNavLinks = () => {
  useEffect(() => {
    // console.log(Auth.getToken());
    if (Auth.getToken() == null) {
      window.location.href = '/';
    }
  }, [])
  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          <li className='nav-link'><Link to="/admin/users">ユーザ一覧</Link></li>
          <li className='nav-link' ><Link to="/admin/gacha/categories">ガチャカテゴリー一覧</Link></li>
          <li className='nav-link' ><Link to="/admin/all/gachas">ガチャ一覧</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavLinks;