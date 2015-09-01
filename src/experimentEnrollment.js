import {DEFAULT_EXPERIMENT_COMPONENT} from './constants';

export default {

  enrollInExperiment(component, child, variationName) {
    if (variationName && child.props.name === variationName) {
      component.selectedVariation = child;
    } else if (child.props.displayName === DEFAULT_EXPERIMENT_COMPONENT) {
      component.defaultComponent = child;
    }
    return component;
  },

  getVariation(childrenComponents, variationName) {
    // I don't understand what this line does.
    if (!childrenComponents.reduce) {
      return this.enrollInExperiment({}, childrenComponents, variationName);
    }

    return childrenComponents.reduce((component, child) => {
      if (component.selectedVariation) {
        return component;
      }

      return this.enrollInExperiment(component, child, variationName);
    }, {});
  }
};
