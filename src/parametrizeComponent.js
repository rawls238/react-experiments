import React from 'react';
import Parametrize from './parametrize';

export default (experiment, experimentParams, Component) => React.createClass({
    render() {
      return (
        <Parametrize experiment={experiment} params={experimentParams} _passThrough={true}>
          <Component {...this.props} />
        </Parametrize>
      );
    }
});