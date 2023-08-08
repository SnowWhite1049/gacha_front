import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import './NavLinks.css'

import Auth from '../../../modules/Auth';
import { getGachaCategories } from '../../../redux/actions/gachaAction';

const NavLinks = () => {
  const dispatch = useDispatch();
  // const [isAdmin, setIsAdmin] = useState(Auth.getUserRole());
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      await dispatch(getGachaCategories())
        .then(res => {
          setCategories(res);
        });
      window.scrollTo(0, 0);
    }
    getData();
  }, [dispatch]);
  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        {/* {isAdmin ?
          <ul className="nav">
            <li className='nav-link'><Link to="/admin/users">User List</Link></li>
            <li className='nav-link' ><Link to="/admin/gacha/categories">Gacha Category List</Link></li>
            <li className='nav-link' ><Link to="/admin/gacha/items">Gacha List</Link></li>
          </ul> : */}
        <ul className="nav">
          <li className='nav-link'><Link to="/">すべて</Link></li>
          {categories.length > 0 && categories.map((item, index) => (
            <li className='nav-link' key={item.id}><Link to={`/${item.id}`}>{item.name}</Link></li>
          ))}
        </ul>
        {/* } */}

      </div>
    </nav>
  );
}

export default NavLinks;