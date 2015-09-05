import React from 'react';
import Parametrize from './parametrize';


const Experiment = React.createClass({
  getDefaultProps() {
    return {
      shouldEnroll: true,
      param: null
    };
  },

  getInitialState() {
    return {
      hasRendered: false
    };
  },

  enrolledInVariation() {
    if (!this.state.hasRendered) {
      this.setState({
        hasRendered: true
      });
    }
  },

  renderExposedVariation() {
    const { param, shouldEnroll, experimentClass } = this.props;
    if (!shouldEnroll) {
      return;
    } else if (!experimentClass) {
      console.error("You must pass in an experimentClass instance as a prop");
      return;
    }

    return (
      <Parametrize experimentClass={experimentClass} param={param} enrolledInVariation={this.enrolledInVariation} hasRendered={this.state.hasRendered}>
        {this.props.children}
      </Parametrize>
    );
  },

  render() {
    return this.renderExposedVariation();
  }
});

export default Experiment;
