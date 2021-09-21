import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page.jsx';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import ArtworkCreateContainer from './artwork/artwork_create_container';
import ArtworksContainer from './artwork/artwork_container'
import { Route } from 'react-router-dom';

import './app.css'

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/create_artwork" component={ArtworkCreateContainer} />
      <ProtectedRoute exact path="/Artworks" component={ArtworksContainer} />
      <ProtectedRoute exact path="/user/:userId" component={ProfileContainer} />
    </Switch>
  </div>
);

export default App;