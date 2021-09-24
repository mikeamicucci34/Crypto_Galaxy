import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page.jsx';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import ArtworkCreateContainer from './artwork/artwork_create_container';
import ArtworksContainer from './artwork/artwork_container';
import {Route} from 'react-router-dom'
import ArtworkUpdateContainer from './artwork/artwork_update_container'
import ArtworkShowContainer from './artwork/artwork_show_container'
import './app.css'
import ProfilePicContainer from './profile/profile_pic_container';

const App = () => (
  <div>
    <link rel="icon" type="image/png" href="/../assets/favicon.jpeg" />
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/create_artwork" component={ArtworkCreateContainer} />
      <ProtectedRoute exact path="/artworks/:artworkId" component={ArtworkShowContainer} />
      <ProtectedRoute exact path="/user/:userId" component={ProfileContainer} />
      <ProtectedRoute exact path="/update_artwork/:artworkId" component={ArtworkUpdateContainer} />
      <ProtectedRoute exact path="/artworks" component={ArtworksContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/user/:userId/profile_pic" component={ProfilePicContainer} />
    </Switch>
  </div>
);

export default App;