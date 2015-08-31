import React from 'react';

export const Parametrize = React.createClass({
  getInitialState() {
    return {
      variations: null
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
      variations: experiment.getParams()
    });
  },

  renderExperiment() {
    if (!this.state.variations) {
      return null;
    }

    for (let param in this.state.variations) {
      this.props.children.props[param] = this.state.variations[param];
    }
    return this.props.children;
  },

  render() {
    return this.renderExperiment();
  }
});
