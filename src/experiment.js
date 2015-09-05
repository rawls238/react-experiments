import React from 'react';
import Parametrize from './parametrize';


const Experiment = React.createClass({
  getDefaultProps() {
    return {
      isEnrolled: true,
      param: null
    };
  },

  renderExposedVariation() {
    const { param, isEnrolled, experimentClass } = this.props;
    if (!isEnrolled) {
      return null;
    } else if (!experimentClass) {
      console.error("You must pass in an experimentClass instance as a prop");
      return;
    }

    return (
      <Parametrize experimentClass={experimentClass} param={param}>
        {this.props.children}
      </Parametrize>
    );
  },

  render() {
    return this.renderExposedVariation();
  }
});

/*
const Experiment = React.createClass({
  getDefaultProps() {
    return {
      isEnrolled: true
    };
  },

  getInitialState() {
    return {
      exposedVariation: null
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
        exposedVariation: null
      });
      return;
    }

    experiment = Utils.suppressAutoExposureLogging(this.props.experimentClass);
    this.setState({
      exposedVariation: experiment.get(param)
    });
  },

  renderExposedVariation() {
    let variationComponent = ExperimentEnrollment.getExposedExperimentVariation(this.props.children, this.state.exposedVariation);

    if (variationComponent.exposedVariation) {
      this.props.experimentClass.logExposure();
      return variationComponent.exposedVariation;
    } else if (variationComponent.defaultComponent) {
      return variationComponent.defaultComponent;
    }
    return null;
  },

  render() {
    return this.renderExposedVariation();
  }
});*/

export default Experiment;
