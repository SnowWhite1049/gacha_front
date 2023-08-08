/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

// import API from "../../axios/API";
// import Auth from "../../modules/Auth";

import API from '../../axios/API';
import Auth from '../../modules/Auth';

const baseUrl = 'https://localhost:5005/';


export const getGachas = (category) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/category/${category}`,
  })
    .then(({ data }) => {
      dispatch({
        type: GET_GACHAS_SUCCESS,
        payload: data
      });
      return data;
    })
    .catch(error => {
      console.log(error)
      dispatch({
        type: GET_GACHAS_FAIL,
        payload: { error }
      });
    });
}

export const getGacha = (id) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/${id}/item`,
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log(error)
    });
}

export const addGacha = (data) => async (dispatch) => {
  return await API({
    method: 'post',
    url: '/gachas/add',
    data: data
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log(error);
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      return error.response;
    });
}

export const editGacha = (data) => async (dispatch) => {
  return await API({
    method: 'post',
    url: '/gachas/edit',
    data: data
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log(error);
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      return error.response;
    });
}

export const deleteGacha = (id) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/${id}/delete`,
  })
    .then(({ data }) => {
      dispatch({
        type: GET_GACHAS_SUCCESS,
        payload: data
      });
      return data;
    })
    .catch(error => {
      console.log(error)
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      dispatch({
        type: GET_GACHAS_FAIL,
        payload: { error }
      });
    });
}

export const getGachaCategories = () => async (dispatch) => {
  return await API({
    method: 'get',
    url: '/gachas/categories',
  })
    .then(({ data }) => {
      dispatch({
        type: GET_GACHA_CATEGORIES_SUCCESS,
        payload: data
      });
      return data;
    })
    .catch(error => {
      console.log(error)
      dispatch({
        type: GET_GACHA_CATEGORIES_FAIL,
        payload: { error }
      });
    });
}

export const addGachaCategory = (data) => async (dispatch) => {
  return await API({
    method: 'post',
    url: '/gachas/categories/add',
    data: data
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log(error);
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      return error.response;
    });
}

export const editGachaCategory = (data) => async (dispatch) => {
  console.log(data);
  return await API({
    method: 'post',
    url: '/gachas/categories/edit',
    data: data
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log(error);
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      return error.response;
    });
}

export const deleteGachaCategory = (id) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/categories/${id}/delete`,
  })
    .then(({ data }) => {
      dispatch({
        type: GET_GACHA_CATEGORIES_SUCCESS,
        payload: data
      });
      return data;
    })
    .catch(error => {
      console.log(error)
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      dispatch({
        type: GET_GACHA_CATEGORIES_FAIL,
        payload: { error }
      });
    });
}

export const getGifts = (gachaId, num) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/${gachaId}/gifts/${num}`,
  })
    .then(({ data }) => {
      localStorage.setItem("gifts", JSON.stringify(data.gifts));
      localStorage.setItem("point", JSON.stringify(data.point));
      return true;
    })
    .catch(error => {
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      else return false;
    });
}

export const confirmReturn = (id, userId) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/gifts/${userId}/return/${id}`,
  })
    .then(({ data }) => {
      localStorage.setItem("point", JSON.stringify(data));
      return true;
    })
    .catch(error => {
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      else return false;
    });
}

export const confirmDeliver = (id, userId) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/gifts/${userId}/deliver/${id}`,
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      else return false;
    });
}

export const getUserHistories = (userId) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/${userId}/histories`,
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      else return false;
    });
}

export const getGachaHistories = (gachaId) => async (dispatch) => {
  return await API({
    method: 'get',
    url: `/gachas/histories/${gachaId}`,
  })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      if (error.response.status == 401) {
        window.location.href = '/account/login';
      }
      else return false;
    });
}

// export const getCartByUserId = () => dispatch => {
//   let userId = Auth.getUserId();
//   dispatch({
//     type: GET_CART_BY_USERID_BEGIN
//   });
//   return API({
//     method: "GET",
//     url: `users/${userId}/cart`
//   })
//     .then(res => {
//       dispatch({
//         type: GET_CART_BY_USERID_SUCCESS,
//         payload: res
//       });
//       return res;
//     })
//     .catch(error => {
//       dispatch({
//         type: GET_CART_BY_USERID_FAIL,
//         payload: { error }
//       });
//       return error;
//     });
// };

// export const postCart = (productId, increase, decrease) => dispatch => {
//   let userId = Auth.getUserId();
//   dispatch({
//     type: POST_CART_BEGIN
//   });
//   return API({
//     method: "POST",
//     url: `users/${userId}/cart`,
//     data: {
//       userId,
//       productId,
//       increase,
//       decrease
//     }
//   })
//     .then(res => {
//       dispatch({
//         type: POST_CART_SUCCESS,
//         payload: res
//       });
//       return res;
//     })
//     .catch(error => {
//       dispatch({
//         type: POST_CART_FAIL,
//         payload: { error }
//       });
//       return error;
//     });
// };

export const POST_CART_BEGIN = "POST_CART_BEGIN";
export const GET_GIFTS_SUCCESS = "GET_GIFTS_SUCCESS";
export const POST_CART_FAIL = "POST_CART_FAIL";

export const GET_GACHAS_SUCCESS = "GET_GACHAS_SUCCESS";
export const GET_GACHAS_FAIL = "GET_GACHAS_FAIL";
export const GET_GACHA_CATEGORIES_SUCCESS = "GET_GACHA_CATEGORIES_SUCCESS";
export const GET_GACHA_CATEGORIES_FAIL = "GET_GACHA_CATEGORIES_FAIL";
export const GET_CART_BY_USERID_SUCCESS = "GET_CART_BY_USERID_SUCCESS";
export const GET_CART_BY_USERID_FAIL = "GET_CART_BY_USERID_FAIL";
