import React, {useCallback, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import UserPlace from "./places/pages/UserPlaces";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserList from './user/components/UsersList';
import Auth from './user/pages/Auth';
import UpdatePlace from "../src/places/pages/UpdatePlace";
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  {/*usestate insure wheater user is loggedin or not*/}
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  {/*This is for Authentication procces*/}
  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[]);

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[]);

  {/*This logic is for when user isLoged in or notloggedin show specific links buttons*/}
  let routes;
  if (isLoggedIn){
    routes = (
      <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
       <UserPlace/>
       </Route>
       <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
            <UpdatePlace/>
        </Route>
        <Redirect to="/" />
      </Switch>

    );
  }else{
    routes = (
      <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
       <UserPlace/>
       </Route>
       <Route path="/auth">
           <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
      
    
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout }}>
    <Router>
    <MainNavigation />
    <main>{routes}</main>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;
