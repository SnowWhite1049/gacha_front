/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import {
  GET_GIFTS_SUCCESS,
  GET_GACHAS_SUCCESS,
  GET_GACHA_CATEGORIES_SUCCESS,
  GET_GACHA_CATEGORIES_FAIL,
  GET_CART_BY_USERID_SUCCESS,
  GET_CART_BY_USERID_FAIL
} from "../actions/gachaAction";

const initialState = {
  cart: {},
  loading: false,
  error: {},
  gachaCategories: [
    {
      rowTitle: '人気のガチャ',
      id: 1,
      gachas: [
        { id: 1, title: 'ガチャ1', image: 'gacha1.png', price: 1000 },
        { id: 2, title: 'ガチャ2', image: 'gacha2.png', price: 3000 },
      ],
    },
    {
      rowTitle: '新着のガチャ',
      id: 2,
      gachas: [
        { id: 3, title: 'ガチャ3', image: 'gacha3.png', price: 500 },
        { id: 4, title: 'ガチャ4', image: 'gacha4.png', price: 2000 },
      ],
    },
  ],
  gachaItems: [
    { id: 1, title: 'ガチャ1', image: '../../../asset/gachas/gacha1.png', price: 1000 },
    { id: 2, title: 'ガチャ2', image: '../../../asset/gachas/gacha1.png', price: 3000 },
    { id: 3, title: 'ガチャ3', image: '../../../asset/gachas/gacha1.png', price: 500 },
    { id: 4, title: 'ガチャ4', image: '../../../asset/gachas/gacha1.png', price: 2000 },
  ],
  gifts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GACHAS_SUCCESS:
      if (action.payload == null) {
        return {
          ...state,
          loading: false,
          error: {}
        };
      }
    case GET_GACHA_CATEGORIES_SUCCESS:
      return {
        ...state,
        gachaCategories: action.payload.data,
        loading: false
      };
    case GET_GACHA_CATEGORIES_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload.error.response.data
      };
    case GET_CART_BY_USERID_SUCCESS:
      return {
        ...state,
        cart: action.payload.data.cart,
        loading: false
      };
    case GET_GIFTS_SUCCESS:
      return {
        ...state,
        gifts: action.payload
      };
    default:
      return state;
  }
};
