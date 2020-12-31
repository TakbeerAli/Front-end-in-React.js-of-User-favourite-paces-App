import React from 'react';
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

const App = () => {
  return (
    <Router>
    <MainNavigation />
    <main>
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
        <Route path="/auth">
                 <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
};

export default App;
