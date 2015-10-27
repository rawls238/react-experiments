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
    const { experiment, params } = this.props;

    if (!experiment || !experiment.get) {
      console.error("You must pass in an experiment instance as a prop");
      return;
    } else if (!params) {
      console.error("You mass pass a list of params in as a prop");
      return;
    }

    let paramsObj = {};
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      const paramVal = experiment.get(param);
      if (paramVal !== null && paramVal !== undefined) {
        paramsObj[param] = paramVal;
      }
    }

    if (Object.keys(paramsObj).length !== 0 && experiment.previouslyLogged() === false) {
      experiment.logExposure({
        params: params,
        name: experiment.getName()
      });
    }

    this.setState({
      experimentParameters: paramsObj
    });
  },

  renderExperiment() {
    if (!this.state.experimentParameters) {
      return null;
    }

    const passThroughParameters = this.props._passThrough ? this.state.experimentParameters : {};
    const renderedChildren = React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, passThroughParameters);
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
