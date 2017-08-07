import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFound = () => (
    <div id="NotFound">

        <h1>404</h1>

        <p>
            The requested page, <strong>'{ window.location.pathname }'</strong>, simply does not exist. 
        </p>
        <p>
            The folks at the DGL apologize for whatever it is that caused this error. 
        </p>
    </div>
);

export default NotFound;
