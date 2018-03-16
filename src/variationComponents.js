import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export const When = createReactClass({
  getInitialState() {
    return {
      shouldRender: false
    }
  },

  contextTypes: {
    experimentParameters: PropTypes.object.isRequired,
    experimentProps: PropTypes.object.isRequired
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
      <span className='experiment-variation-component'>
        {this.renderChildren()}
      </span>
    );
  }
});

export const Default = createReactClass({
  contextTypes: {
    experimentProps: PropTypes.object.isRequired
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
