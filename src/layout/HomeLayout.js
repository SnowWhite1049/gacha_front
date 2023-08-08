import React from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const HomeLayout = (props) => {

  return (
    <React.Fragment>
      <Header />
      {props.children}
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default HomeLayout;