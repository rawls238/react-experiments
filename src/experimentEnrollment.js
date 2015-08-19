import {DEFAULT_EXPERIMENT_COMPONENT} from './constants';

export default {
  getExposedExperimentVariation(childrenComponents, variationName) {
    if (!childrenComponents.reduce) {
        return this.enrollInExperiment({}, childrenComponents, variationName);
      }

    return childrenComponents.reduce((component, child) => {
      if (component.exposedVariation) {
        return component;
      }

      return this.enrollInExperiment(component, child, variationName);
    }, {})
  },

  enrollInExperiment(component, child, variationName) {
    if (variationName && child.props.name === variationName) {
      component.exposedVariation = child;
    } else if (child.props.displayName === DEFAULT_EXPERIMENT_COMPONENT) {
      component.defaultComponent = child;
    }
    return component;
  }
};
