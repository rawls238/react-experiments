import React from 'react';
import Parametrize from './parametrize';

export default (experiment, experimentName, Component) => React.createClass({
    render() {
      return (
        <Parametrize experiment={experiment} experimentName={experimentName} _passThrough={true}>
          <Component {...this.props} />
        </Parametrize>
      );
    }
});