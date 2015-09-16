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
    this.selectVariation();
  },

  selectVariation() {
    const { experiment, param, experimentName } = this.props;
    let params = {};

    if (!experiment || !experiment.getParams) {
      console.error("You must pass in an experiment instance as a prop");
      return;
    }

    if (param) {
      params[param] = experiment.get(param);

      this.setState({
        experimentParameters: params
      });
    } else {
      params = experiment.getParams(experimentName) || {};

      this.setState({
        experimentParameters: params
      });
    }

    if (!experiment.previouslyLogged()) {
      experiment.logExposure({
        params: params,
        name: experiment.getName()
      });
    }
  },

  renderExperiment() {
    if (!this.state.experimentParameters) {
      return null;
    }

    const renderedChildren = React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, { experimentParameters: this.state.experimentParameters, experimentProps: this.props } );                
    });

    return (
      <div>
        { renderedChildren }  
      </div>
    );
  },

  render() {
    return this.renderExperiment();
  }
});

export default Parametrize;
