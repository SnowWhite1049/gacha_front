/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import { combineReducers } from "redux";
import user from "./userReducer";
// import register from "./RegisterReducer";
// import department from "./DepartmentReducer";
// import product from "./productReducer";
// import variant from "./variantsReducer";
import gacha from "./gachaReducer";
// import checkout from './checkoutReducer'
// import filter from './filterReducer'

export default combineReducers({
  // department,
  user,
  // register,
  // product,
  // variant,
  gacha
});
