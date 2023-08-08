import React from 'react';

import AdminHeader from '../components/Header/AdminHeader';
import Footer from '../components/Footer/Footer';

const HomeLayout = (props) => {

  return (
    <React.Fragment>
      <AdminHeader />
      {props.children}
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default HomeLayout;