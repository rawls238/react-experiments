import React from 'react';
import Parametrize from './parametrize';

export default (experiment, experimentParams, Component) => React.createClass({
    render() {

      /* if experimentParams is a string we assume that it refers to an experiment name */
      if (typeof(experimentParams) === 'string') {
      	return (
	        <Parametrize experiment={experiment} experimentName={experimentParams} _passThrough={true}>
	          <Component {...this.props} />
	        </Parametrize>
	      );
      }
      return (
        <Parametrize experiment={experiment} params={experimentParams} _passThrough={true}>
          <Component {...this.props} />
        </Parametrize>
      );
    }
});