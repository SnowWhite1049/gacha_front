import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ManageAccount from './components/Account/ManageAccount/ManageAccount';
import MyAccount from './components/Account/MyAccount/MyAccount';
import Shop from './components/Shop/Shop';
import ItemView from './routes/GachaView';
import CategoryView from './routes/CategoryView';
import SearchView from './routes/Search';
import CartItemsProvider from './Context/CartItemsProvider';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import Wishlist from './components/Wishlist';
import WishItemsProvider from './Context/WishItemsProvider';
import DrawerNav from './components/Nav/DrawerNav/DrawerNav';
import Checkout from './components/Checkout/Checkout';
import SearchProvider from './Context/SearchProvider';
import AccountManaging from './components/Admin/Account/AccountManaging';

function App() {
  // class App extends Component {
  // render() {
  return (
    // <CartItemsProvider>
    // <WishItemsProvider>
    //   <SearchProvider>
    <Routes />
    // <Header />
    // {/* <Routes>
    //       <Route path="/" element={<AdminRouter />} >
    //         <Route path="/admin/users" element={<AccountManaging />} />
    //       </Route>
    //       <Route path="/account">
    //         <Route path="me" element={<MyAccount />} />
    //         <Route path="manage" element={<ManageAccount />} />
    //         <Route path="login" element={<Login />} />
    //         <Route path="register" element={<Register />} />
    //         <Route path="*" element={<Login />} />
    //       </Route>
    //       <Route path="/shop" element={<Shop />} />
    //       <Route path="/category">
    //         <Route path=":id" element={<CategoryView />} />
    //       </Route>
    //       <Route path="/item">
    //         <Route path="/item/men">
    //           <Route path=":id" element={<ItemView />} />
    //         </Route>
    //         <Route path="/item/women">
    //           <Route path=":id" element={<ItemView />} />
    //         </Route>
    //         <Route path="/item/kids">
    //           <Route path=":id" element={<ItemView />} />
    //         </Route>
    //         <Route path="/item/featured">
    //           <Route path=":id" element={<ItemView />} />
    //         </Route>
    //       </Route>
    //       <Route path="/wishlist" element={<Wishlist />} />
    //       <Route path="/search/*" element={<SearchView />} />
    //     </Routes> */}
    // <Footer />
    //   </SearchProvider>
    // </WishItemsProvider>
    // </CartItemsProvider>
  );
  // }
}

export default App;