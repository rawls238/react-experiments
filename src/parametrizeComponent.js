import React from 'react';
import createReactClass from 'create-react-class';
import Parametrize from './parametrize';

export default (experiment, experimentParams, Component) => createReactClass({
    render() {
      return (
        <Parametrize experiment={experiment} params={experimentParams} _passThrough={true}>
          <Component {...this.props} />
        </Parametrize>
      );
    }
});