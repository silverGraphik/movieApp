import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// Css Classes
import './App.css';

// Import Custom Component
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';
import Movies from './components/pages/Movies';
import Tv from './components/pages/Tv';
import Profile from './components/pages/Profile';
import Favorites from './components/pages/Favorites';
import PrivateRoute from './components/PrivateRoute';

// Import material-ui Component
import Box from '@material-ui/core/Box';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Box>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auth' component={Auth} />
            <Route exact path='/movies' component={Movies} />
            <Route exact path='/tv' component={Tv} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute
              exact
              path='/profile/favorites'
              component={Favorites}
            />
          </Switch>
        </Box>
      </Router>
    </RecoilRoot>
  );
};

export default App;
