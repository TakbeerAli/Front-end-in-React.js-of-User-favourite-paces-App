import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";
import './MainNavigation.css';


const MainNavigation = props => {

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);  

  const openDrawer = () =>{  {/* this is for to open side bar   */} 
   setDrawerIsOpen(true);
  };

  const closeDrawer = () => {    {/* this is for to open side bar   */} 
    setDrawerIsOpen(false);
  };

return (
    <React.Fragment>
    {drawerIsOpen && <Backdrop onClick={closeDrawer} />} {/* send closeDrawer function to Backdrop  */} 
      <SideDrawer show={drawerIsOpen}  onClick={closeDrawer}>    {/*onclick fun close sidebar when it clicke on link it come from sidebar cpnnt */}
         <nav className="main-navigation__drawer-nav">
           <NavLinks />
         </nav>
    </SideDrawer>
    

  <MainHeader>
      <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span/>
          <span/>
          <span/>
      </button>
      <h1 className="main-navigation__title">
         <Link to="/">  YourPlaces </Link>
      </h1>
      <nav className="main-navigation__header-nav">
       <NavLinks />
      </nav>
  </MainHeader>  
  </React.Fragment>
);


};

export default MainNavigation;