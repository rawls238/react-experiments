import React from 'react';
import {EMPTY_EXPERIMENT_COMPONENT, DEFAULT_EXPERIMENT_COMPONENT} from './constants';

export class Variation extends React.Component {
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

export class DefaultVariation extends React.Component {
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}
DefaultVariation.propTypes = { name: React.PropTypes.string };
DefaultVariation.defaultProps = {name: DEFAULT_EXPERIMENT_COMPONENT};

export class EmptyDefaultVariation extends React.Component {
  render() {
    return null;
  }
}
EmptyDefaultVariation.defaultProps = {name: EMPTY_EXPERIMENT_COMPONENT};
EmptyDefaultVariation.propTypes = { name: React.PropTypes.string };
