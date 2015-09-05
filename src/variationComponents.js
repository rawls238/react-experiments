import React from 'react';
import {DEFAULT_EXPERIMENT_COMPONENT} from './constants';

export const Variation = React.createClass({
  contextTypes: {
    experimentParameters: React.PropTypes.object.isRequired,
    experimentProps: React.PropTypes.object.isRequired
  },

  shouldRenderVariation() {
    const name = this.props.name;
    const paramName = this.props.param || this.context.experimentProps.param;
    if (this.context.experimentParameters) {
      if(this.context.experimentParameters[paramName] === name) {
        return true;
      }
    }
  },

  render() {
    if (!this.shouldRenderVariation()) {
      return null;
    }
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
});

export const Default = React.createClass({
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
});
