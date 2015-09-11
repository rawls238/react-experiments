import React from 'react/addons';
import {exp} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

const TestUtils = React.addons.TestUtils;
describe('Test parametrize component', () => {

  it('should work with parametrize', () => {
    const ParametrizedComponent = React.createClass({
      render() {
        return (
          <span>
            this.props.foo;
          </span>
        );
      }
    });
    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experimentClass={exp}>
        <ParametrizedComponent />
      </ReactExperiments.Parametrize>
    );
  });
});