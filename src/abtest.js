import React from 'react';
import Parametrize from './parametrize';

const ABTest = React.createClass({
  getDefaultProps() {
    return {
      shouldEnroll: true,
      param: null,
      experimentName: null
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
    const { on, shouldEnroll, experiment, experimentName } = this.props;

    if (!shouldEnroll) {
      return null;
    } else if (!experiment) {
      console.error("You must pass in an experiment instance as a prop");
      return null;
    } else if (!experimentName) {
      console.error("You must pass an experiment name as prop");
      return null;
    } else if (!on) {
      console.error("You must pass an 'on' prop indicating what parameter you want to branch off");
      return null;
    }

    return (
      <Parametrize 
        experiment={experiment} 
        experimentName={experimentName}
        on={on} 
        enrolledInVariation={this.enrolledInVariation} 
        hasRendered={this.state.hasRendered}>

          {this.props.children}

      </Parametrize>
    );
  },

  render() {
    return this.renderExposedVariation();
  }
});

export default ABTest;
