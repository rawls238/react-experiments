import React from 'react';
import ExperimentEnrollment from './experimentEnrollment';
import Utils from './utils';

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

    if (!this.props.experimentClass || !this.props.experimentClass.inputs) {
      console.error("You must pass in an experimentClass instance as a prop");
      return;
    }

    if (React.Children.count(this.props.children) === 0) {
      throw 'You must have at least one variation in an experiment';
    }

    if (!isEnrolled) {
      this.setState({
        variation: null
      });
      return;
    }

    experiment = this.props.experimentClass;
    this.setState({
      variationName: experiment.get(param)
    });
  },

  renderVariation() {
    let variationComponent = ExperimentEnrollment.getVariation(
      this.props.children,
      this.state.variationName
    );

    if (variationComponent.selectedVariation) {
      return variationComponent.selectedVariation;
    } else if (variationComponent.defaultComponent) {
      return variationComponent.defaultComponent;
    }
    console.log('poop', this.state.variationName, variationComponent);
    return null;
  },

  render() {
    return this.renderVariation();
  }
});
