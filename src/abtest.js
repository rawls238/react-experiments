import React from 'react';
import Parametrize from './parametrize';

const ABTest = React.createClass({
  getDefaultProps() {
    return {
      shouldEnroll: true
    };
  },

  getInitialState() {
    return {
      hasRendered: false
    };
  },

  childHasRendered() {
    if (!this.state.hasRendered) {
      this.setState({
        hasRendered: true
      });
    }
  },

  renderExposedVariation() {
    const { on, shouldEnroll, experiment } = this.props;

    if (!experiment) {
      console.error("You must pass in an experiment instance as a prop");
      return null;
    } else if (!on) {
      console.error("You must pass an 'on' prop indicating what parameter you want to branch off");
      return null;
    }

    return (
      <Parametrize 
        experiment={experiment} 
        params={[on]}
        on={on} 
        shouldEnroll={shouldEnroll} 
        childHasRendered={this.childHasRendered} 
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
