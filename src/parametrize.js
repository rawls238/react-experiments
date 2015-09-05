import React from 'react';

export const Parametrize = React.createClass({
  getInitialState() {
    return {
      parameters: null
    };
  },

  childContextTypes: {
    parameters: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return { 
      parameters: this.state.parameters 
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
      return React.addons.cloneWithProps(child, { parameters: this.state.parameters } );                
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
