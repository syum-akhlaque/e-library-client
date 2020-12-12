import React from 'react';
import {  useLocation } from 'react-router-dom';

import './Header.css';
import NavigationBar from './NavigationBar';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  let headerBg  ; 
  if(currentPath === "/" || currentPath === "/home"){
    headerBg = 'header-bg'; 
  }
  
    return (
        <section >
            <div className= 'white-header' id={headerBg}>  
                 <NavigationBar></NavigationBar>
             </div>
        </section>
    );
};

export default Header;