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

  componentDidMount() {
    this.selectVariation();
  },

  selectVariation() {
    const experiment = this.props.experimentClass;

    if (!experiment || !experiment.getParams) {
      console.error("You must pass in an experimentClass instance as a prop");
      return;
    }

    this.setState({
      experimentParameters: experiment.getParams()
    });

    //should be a no-op if using a PlanOut class, but need this for custom experiment classes
    experiment.logExposure({
      params: this.state.experimentParameters,
      name: experiment.getName()
    });
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
