const React = require('react');

const link = ({ href, children }) => {
  return React.createElement('a', { href }, children);
};

module.exports = link;
