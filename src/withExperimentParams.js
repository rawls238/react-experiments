import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default (Component) => {
  return createReactClass({
    contextTypes: {
      experimentParameters: PropTypes.object.isRequired
    },

    render() {
      return (
        <Component {...this.props} {...this.context.experimentParameters}/>
      );
    }
  });
};