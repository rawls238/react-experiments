import React from 'react';

export default (Component) => {
  return React.createClass({
    contextTypes: {
      experimentParameters: React.PropTypes.object.isRequired
    },
    
    render() {
      return (
        <Component {...this.props} {...this.context.experimentParameters} />
      );
    }
  });
};