import React from 'react';

const Parametrize = React.createClass({
  getInitialState() {
    return {
      experimentParameters: null
    };
  },

  childContextTypes: {
    experimentParameters: React.PropTypes.object,
    experimentProps: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return { 
      experimentParameters: this.state.experimentParameters,
      experimentProps: this.props 
    };
  },

  componentWillMount() {
    this.fetchParameters();
  },

  fetchParameters() {
    const { experiment, experimentName } = this.props;

    if (!experiment || !experiment.getParams) {
      console.error("You must pass in an experiment instance as a prop");
      return;
    }

    const params = experiment.getParams(experimentName);
    if (params && experiment.previouslyLogged() === false) {
      experiment.logExposure({
        params: params,
        name: experiment.getName()
      });
    }

    this.setState({
      experimentParameters: params || {}
    });
  },

  renderExperiment() {
    if (!this.state.experimentParameters) {
      return null;
    }

    const renderedChildren = React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, {});
    });

    return (
      <span>
        { renderedChildren }  
      </span>
    );
  },

  render() {
    return this.renderExperiment();
  }
});

export default Parametrize;
