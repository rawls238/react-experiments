import React from 'react/addons';
import ReactExperiments from '../dist/react-experiments';

let logs = [];
const paramKey = 'foo';
const paramVal = 'bar';
class ExperimentClass extends ReactExperiments.ExperimentClass {
  getParams() {
    let ret = {};
    ret[paramKey] = paramVal;
    return ret;
  }

  logExposure(data) {
    logs.push(data);
  }

  getName() {
    return 'testExperiment';
  }
}

const expClass = new ExperimentClass();
const TestUtils = React.addons.TestUtils;
describe('Test experimentClass', () => {
  beforeEach(() => {
    logs = [];
  });

  it('should work with experiment Class', () => {
    const Comp = React.createClass({
      render() {
        return (
          <div className={this.props.experimentParameters[paramKey]}>
            Test
          </div>
        );
      }
    });

    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experimentClass={expClass}>
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