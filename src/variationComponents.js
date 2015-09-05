import React from 'react';

export const Variation = React.createClass({
  getInitialState() {
    return {
      shouldRender: false
    }
  },

  contextTypes: {
    experimentParameters: React.PropTypes.object.isRequired,
    experimentProps: React.PropTypes.object.isRequired
  },

  componentWillUpdate(props, state) {
    if (state.shouldRender) {
      this.context.experimentProps.experimentEnrolled();
    }
  },

  componentDidMount() {
    if (!this.state.shouldRender) {
      this.shouldRenderVariation();
    }
  },

  shouldRenderVariation() {
    const name = this.props.name;
    const paramName = this.props.param || this.context.experimentProps.param;
    if (this.context.experimentParameters) {
      if(this.context.experimentParameters[paramName] === name) {
        this.setState({
          shouldRender: true
        });
      }
    }
  },

  render() {
    if (!this.state.shouldRender) {
      return null;
    }

    return (
      <span>
        {this.props.children}
      </span>
    );
  }
});

export const Default = React.createClass({
  contextTypes: {
    experimentProps: React.PropTypes.object.isRequired
  },

  render() {
    if (this.context.experimentProps.hasRendered) {
      return null;
    }

    return (
      <span>
        {this.props.children}
      </span>
    );
  }
});
