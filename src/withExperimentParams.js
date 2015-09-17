import React from 'react';

export default (experimentParams) => {
  return (Component) => {
    return React.createClass({
      contextTypes: experimentParams,
      render() {
        return (
          <Component {...this.props} {...this.context} />
        );
      }
    });
  };
};