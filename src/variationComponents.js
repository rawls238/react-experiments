import React from 'react';
import {DEFAULT_EXPERIMENT_COMPONENT} from './constants';

export const Variation = React.createClass({
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
});

export const Default = React.createClass({
  getDefaultProps() {
    return {
      displayName: DEFAULT_EXPERIMENT_COMPONENT
    }
  },

  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
});
