import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFound = () => (
    <div id="NotFound">

        <h1>404</h1>

        <p>
            The requested page, <strong>'{ window.location.pathname }'</strong>, simply does not exist. Maybe it should, but it doesn't. 
        </p>
        <p>
            The folks at BCL apologize for whatever it is that caused this error. We place the blame squarely on someone else.
        </p>
    </div>
);

export default NotFound;
