const React = require('react');

const link = ({ href, children, ...rest }) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, { href, ...rest });
  }
  return React.createElement('a', { href, ...rest }, children);
};

module.exports = link;
