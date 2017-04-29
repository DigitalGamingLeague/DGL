import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../components/AppNavigation';
import AppFooter from '../components/AppFooter';
import Breadcrumbs from '../components/Breadcrumbs';

const App = ({ children }) => (
    <div>
        <AppNavigation />
            <Grid className="document-body">
                <Breadcrumbs />
                { children }
            </Grid>
        <AppFooter />
    </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
