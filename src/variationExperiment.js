import React from 'react';
import {EMPTY_EXPERIMENT_COMPONENT, DEFAULT_EXPERIMENT_COMPONENT} from './constants';
import {Variation, DefaultVariation} from './variationComponents';

export const VariationExperiment = React.createClass({
  getDefaultProps() {
    return {
      isEnrolled: true
    };
  },

  getInitialState() {
    return {
      variation: null
    };
  },

  componentDidMount() {
    this.selectVariation();
  },

  selectVariation() {
    let experiment;
    const {param, isEnrolled} = this.props;

    if (!this.props.experiment || !this.props.experiment.inputs) {
      console.error("You must pass in an experiment instance as a prop");
      return;
    }

    if (React.Children.count(this.props.children) < 2) {
      throw 'You must have at more than one variation in an experiment';
    }

    if (!isEnrolled) {
      this.setState({
        variation: null
      });
      return;
    }

    experiment = this.props.experiment;
    this.setState({
      variationName: experiment.get(param)
    });
  },

  renderVariation() /* : ?React.Compoent */ {
    var child;
    for (var i = 0; i < this.props.children.length; i++) {
      child = this.props.children[i];
      /* NOTE:
      * presently does not work for the default components in the example
      * app because it uses JSX and JSX does weird factory stuff.
      * My guess is that without JSX, we could also just do things like:
      *   child instanceof DefaultVariation instead of looking at the names
      * https://gist.github.com/sebmarkbage/d7bce729f38730399d28
      */
      if (child.props.name && (
        child.props.name == this.state.variationName ||
        child.props.name == DEFAULT_EXPERIMENT_COMPONENT ||
        child.props.name == EMPTY_EXPERIMENT_COMPONENT
      )) {
        /* NOTE: does not work - seems to cause error in: planout.js
         * TypeError: (0 , _libUtils.clone) is not a function:
         *   this.props.experiment.logExposure({
         *      'componentName': child.props.name
         *   });
         */
        return child;
      }
    }
    return null;
  },

  render() /* : ?React.Compoent */ {
    return this.renderVariation();
  }
});
