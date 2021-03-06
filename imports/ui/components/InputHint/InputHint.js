import React from 'react';
import PropTypes from 'prop-types';

const InputHint = ({ children }) => (
  <div className="InputHint">
    {children}
  </div>
);

InputHint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputHint;
