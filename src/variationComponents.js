import React from 'react';

export const When = React.createClass({
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
      this.context.experimentProps.enrolledInVariation();
    }
  },

  componentDidMount() {
    this.shouldRenderVariation();
  },

  shouldRenderVariation() {
    const value = this.props.value;
    const paramName = this.context.experimentProps.on;
    if (this.context.experimentParameters && this.context.experimentParameters[paramName] === value) {
      this.setState({
        shouldRender: true
      });
    }
  },

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {});
      }
      return child;
    });
  },

  render() {
    if (!this.state.shouldRender) {
      return null;
    }

    return (
      <div className='experiment-variation-component'>
        {this.renderChildren()}
      </div>
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
      <div>
        {this.props.children}
      </div>
    );
  }
});
