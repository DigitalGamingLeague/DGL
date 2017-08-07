import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const getPaths = (pathname) => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr, index) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });

    paths.pop();
    
    return paths;
};

const getPathName = (path) => {
    const p = path.split( '/' );
    const locus = p.pop();
    return locus ? locus : 'Home';
}

const Breadcrumbs = ({ title, history }) => {
    const paths = getPaths(history.location.pathname);
    return (
        <ol className="breadcrumb">
            {
                paths.map((p, i) => (
                    <li key={`loc${i}`} className="breadcrumb-item">
                        <Link to={p}>{ getPathName(p) }</Link>
                    </li>
                ))
            }
            <li key="locus" className="breadcrumb-item active">{ title }</li>
        </ol>
    );
};

Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default Breadcrumbs;
