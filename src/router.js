import React from 'react';
import {
  Redirect, Outlet
} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import HomeLayout from './layout/HomeLayout.js';
import AdminLayout from './layout/AdminLayout.js';

import Home from './routes/Home.jsx';
import GachaView from './routes/GachaView.jsx';

import Point from './components/Account/Point/Point.js';
import Purchase from './components/Account/Point/Purchase.js';
import Address from './components/Account/Address/Address.js';
import AddressEdit from './components/Account/Address/Edit.js';
import ManageAccount from './components/Account/ManageAccount/ManageAccount';
import History from './components/Account/History/History';
import LotteryResult from './components/Result/Lottery/Result';
import Result from './components/Result/Result';

import MyAccount from './components/Account/MyAccount/MyAccount';
import Shop from './components/Shop/Shop';
import CategoryView from './routes/CategoryView';
// import SearchView from './routes/Search';
import CartItemsProvider from './Context/CartItemsProvider';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import Wishlist from './components/Wishlist';
import WishItemsProvider from './Context/WishItemsProvider';
import DrawerNav from './components/Nav/DrawerNav/DrawerNav';
import Checkout from './components/Checkout/Checkout';
import SearchProvider from './Context/SearchProvider';

import AccountManaging from './components/Admin/Account/AccountManaging';
import GachaCategory from './components/Admin/GachaCategory/GachaCategory';
import GachaCategoryEdit from './components/Admin/GachaCategory/Edit';
import Gacha from './components/Admin/Gacha/Gacha';
import GachaEdit from './components/Admin/Gacha/Edit';
import GachaHistory from './components/Admin/Gacha/GachaHistory.js';

import Auth from '../src/modules/Auth';

const AdminRouter = ({ component, ...options }) => {
  const finalComponent =
    Auth.getUserDetails() !== undefined &&
      Auth.getUserDetails() !== null &&
      Auth.getUserRole() == 'admin' ? (
      <Route {...options} component={component} />
    ) : (
      <Redirect to="/" />
    );

  return finalComponent;
}

const PrivateRouter = ({ component, ...options }) => {
  const finalComponent =
    Auth.getUserDetails() !== undefined ? (
      <Route {...options} component={component} />
    ) : (
      <Redirect to="/" />
    );

  return finalComponent;
}

const HomeRoutes = [
  {
    path: '/',
    exact: true,
    layout: HomeLayout,
    component: Home
  },
  {
    path: '/:categoryId',
    exact: true,
    layout: HomeLayout,
    component: Home
  },
  {
    path: '/account/login',
    exact: true,
    layout: HomeLayout,
    component: Login
  },
  {
    path: '/account/register',
    exact: true,
    layout: HomeLayout,
    component: Register
  },
  {
    path: '/gachas/:gachaId',
    exact: true,
    layout: HomeLayout,
    component: GachaView
  }
];

const PrivateRoutes = [
  {
    path: '/account/manage',
    exact: true,
    layout: HomeLayout,
    component: ManageAccount
  },
  {
    path: '/account/point',
    exact: true,
    layout: HomeLayout,
    component: Point
  },
  {
    path: '/point/purchase/success',
    exact: true,
    layout: HomeLayout,
    component: Purchase
  },
  {
    path: '/account/gacha/history',
    exact: true,
    layout: HomeLayout,
    component: History
  },
  {
    path: '/account/address',
    exact: true,
    layout: HomeLayout,
    component: Address
  },
  {
    path: '/account/address/edit',
    exact: true,
    layout: HomeLayout,
    component: AddressEdit
  },
  {
    path: '/:id/lottery/result',
    exact: true,
    layout: HomeLayout,
    component: LotteryResult
  },
  {
    path: '/:id/result',
    exact: true,
    layout: HomeLayout,
    component: Result
  },
]

const AdminRoutes = [
  {
    path: '/admin/users',
    exact: true,
    layout: AdminLayout,
    component: AccountManaging
  },
  {
    path: '/admin/gacha/categories',
    exact: true,
    layout: AdminLayout,
    component: GachaCategory
  },
  {
    path: '/admin/gacha/categories/edit',
    exact: true,
    layout: AdminLayout,
    component: GachaCategoryEdit
  },
  {
    path: '/admin/:category/gachas',
    exact: true,
    layout: AdminLayout,
    component: Gacha
  },
  {
    path: '/admin/gachas/edit',
    exact: true,
    layout: AdminLayout,
    component: GachaEdit
  },
  {
    path: '/admin/gachas/:id/history',
    exact: true,
    layout: AdminLayout,
    component: GachaHistory
  },
];

const Routes = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        {HomeRoutes.map((homeRoute, index) => {
          return (
            <Route
              key={index}
              path={homeRoute.path}
              exact={homeRoute.exact}
              component={props => {
                return (
                  <homeRoute.layout {...props}>
                    <homeRoute.component {...props} />
                  </homeRoute.layout>
                );
              }}
            />
          );
        })}
        {PrivateRoutes.map((privateRoute, index) => {
          return (
            <Route
              key={index}
              path={privateRoute.path}
              exact={privateRoute.exact}
              component={props => {
                return (
                  <privateRoute.layout {...props}>
                    <privateRoute.component {...props} />
                  </privateRoute.layout>
                );
              }}
            />
          );
        })}
        {AdminRoutes.map((adminRoute, index) => {
          return (
            <AdminRouter
              key={index}
              path={adminRoute.path}
              exact={adminRoute.exact}
              component={props => {
                return (
                  <adminRoute.layout {...props}>
                    <adminRoute.component {...props} />
                  </adminRoute.layout>
                );
              }}
            />
          );
        })}
      </Switch>
      {/* <Footer /> */}
    </Router>
  )
}

export default Routes;
