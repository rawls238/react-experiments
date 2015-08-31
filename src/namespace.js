import React from 'react';
import {DEFAULT_EXPERIMENT_COMPONENT} from './constants';
import ExperimentEnrollment from './experimentEnrollment';
import Utils from './utils';

export const Namespace = React.createClass({
  getEnrolledExperiment() {
    if(!this.props.children.reduce) {
      return this.enrollInNamespace({}, this.props.children);
    }

    return this.props.children.reduce((component, child) => {
      if (component.exposedExperiment) {
        return component;
      }

      return this.enrollInNamespace(component, child);
    }, {});
  },

  enrollInNamespace(component, child) {
    const experiment = this.props.experiment;
    if (child.props.name === DEFAULT_EXPERIMENT_COMPONENT) {
      component.defaultComponent = child;
    } else if (child.props.isEnrolled) {
      const experimentParam = experiment.get(child.props.param);
      if (experimentParam && ExperimentEnrollment.getVariation(child.props.children, experimentParam).exposedVariation) {
        component.exposedExperiment = child;
      }
    }
    return component;
  },


  renderEnrolledExperiment() {
    const experiment = this.getEnrolledExperiment();
    if (experiment.exposedExperiment) {
      return (
        <Experiment experiment={this.props.experiment} param={experiment.exposedExperiment.props.param}>
          {experiment.exposedExperiment.props.children}
        </Experiment>
      );
    }
    return experiment.defaultComponent;
  },

  render() {
    return (
      <span>
        {this.renderEnrolledExperiment()}
      </span>
    );
  }
});
