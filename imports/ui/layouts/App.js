import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../components/AppNavigation';
import AppFooter from '../components/AppFooter';

const App = ({ children }) => (
  <div>
    <AppNavigation />
    <Grid>
      { children }
    </Grid>
    <AppFooter />
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
