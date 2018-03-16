import React from 'react';
import createReactClass from 'create-react-class';
import TestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import ReactExperiments from '../dist/react-experiments';

let logs = [];
const paramKey = 'foo';
const paramVal = 'bar';
class Experiment extends ReactExperiments.Experiment {
  get(param) {
    if (param === paramKey) {
      return paramVal;
    }
  }

  logExposure(data) {
    logs.push(data);
  }

  getName() {
    return 'testExperiment';
  }

  previouslyLogged() {
    return false;
  }
}

const exp = new Experiment();
describe('Test experiment', () => {
  beforeEach(() => {
    logs = [];
  });

  it('should work with experiment Class', () => {
    const Comp = createReactClass({
      contextTypes: {
        experimentParameters: PropTypes.object.isRequired
      },

      render() {
        return (
          <div className={this.context.experimentParameters[paramKey]}>
            Test
          </div>
        );
      }
    });

    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experiment={exp} params={[paramKey]}>
        <Comp />
      </ReactExperiments.Parametrize>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      paramVal
    ).length).toBe(1);
    expect(logs.length).toEqual(1);
  });
});
