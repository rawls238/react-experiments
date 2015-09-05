import React from 'react';

const Parametrize = React.createClass({
  getInitialState() {
    return {
      experimentParameters: null
    };
  },

  childContextTypes: {
    experimentParameters: React.PropTypes.object.isRequired,
    experimentProps: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return { 
      experimentParameters: this.state.parameters,
      experimentProps: this.props 
    };
  },

  componentDidMount() {
    this.selectVariation();
  },

  selectVariation() {
    let experiment = this.props.experimentClass;

    if (!experiment || !experiment.inputs) {
      console.error("You must pass in an experimentClass instance as a prop");
      return;
    }

    this.setState({
      parameters: experiment.getParams()
    });
  },

  renderExperiment() {
    if (!this.state.parameters) {
      return null;
    }

    const renderedChildren = React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, { experimentParameters: this.state.parameters, experimentProps: this.props } );                
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
