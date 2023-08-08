import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import gacha1 from '../../../asset/gachas/gacha2.png';
import dollarCoin from '../../../asset/icons/dollar-coin.png';

const ItemCard = (props) => {
  const { item } = props;
  const imageBaseUri = '../../../asset/gachas/';
  const cartItemsContext = useContext(CartItemsContext)
  const wishItemsContext = useContext(WishItemsContext)

  const handleAddToWishList = () => {
    wishItemsContext.addItem(props.item)
  }

  const handleAddToCart = () => {
    cartItemsContext.addItem(props.item, 1)
  }

  return (
    <div className="product__card__card col-md-6" >
      <Link to={`/gachas/${item.id}`}>
        <div className="product__card" style={{ backgroundImage: `url(http://localhost:5050/${item.image})` }}>
          {/* <div className="product__image" >
                    <img src={gacha1} alt="item" className="product__img" />
                </div> */}
          {/* <div className="product__card__gradient__background"> */}
          <div className="product__name">
            {item.name}
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
                <p className="product__price">{item.point}</p>
              </div>
            </div>
            <p className="product__card__top">
              <span >のこり</span>5,459/30,000
            </p>
            {/* <div className="product__card__action">
              <IconButton onClick={handleAddToWishList} sx={{ borderRadius: '20px', width: '40px', height: '40px'}}>
                <FavoriteBorderIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
              </IconButton>
              <IconButton onClick={handleAddToCart} sx={{ borderRadius: '20px', width: '40px', height: '40px' }}>
                <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
              </IconButton >
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemCard;