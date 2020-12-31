import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import './NavLinks.css';

import { AuthContext } from '../../context/auth-context';
const NavLinks = props => {
   
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>


             {/*My Places only show when user logedin*/}
            {auth.isLoggedIn &&(
               <li>
                <NavLink to="/u1/places" >MY PLACES</NavLink> 
               </li>
            )
            }

           {/*Add Places only show when user logedin*/}
            {auth.isLoggedIn &&(
                <li>
                 <NavLink to="/places/new">+ ADD PLACES </NavLink>
                </li>
            )}    
            
             {/*Authentication button only show when user notlogedin*/}
            {!auth.isLoggedIn && (
                <li>
                  <NavLink to="/auth" >AUTHENTICATES</NavLink>
               </li>
            )}
            
            {/*this is for when user logged in then show logout button*/}
            {auth.isLoggedIn && (
                <button onClick={auth.logout}>LOGOUT</button>
            )}
            
        </ul>
    )
}

export default NavLinks;