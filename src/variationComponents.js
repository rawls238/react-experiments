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
      this.context.experimentProps.childHasRendered();
    }
  },

  componentDidMount() {
    this.shouldRenderVariation();
  },

  shouldRenderVariation() {
    const experimentProps = this.context.experimentProps || {};
    const experimentParameters = this.context.experimentParameters || {};
    const experimentParameterMatchesValue = experimentParameters[experimentProps.on] === this.props.value;

    if (experimentProps.shouldEnroll && experimentParameters && experimentParameterMatchesValue) {
      this.setState({
        shouldRender: true
      });
    }
  },

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.addons.cloneWithProps(child, {});
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
