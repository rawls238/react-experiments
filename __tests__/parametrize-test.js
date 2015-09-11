import React from 'react/addons';
import {exp} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

const TestUtils = React.addons.TestUtils;
describe('Test parametrize component', () => {

  it('should work with parametrize using props', () => {
    const ParametrizedComponent = React.createClass({
      render() {
        return (
          <span className={this.props.experimentParameters.foo}>
            this.props.experimentParameters.foo;
          </span>
        );
      }
    });
    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experimentClass={exp}>
        <ParametrizedComponent />
      </ReactExperiments.Parametrize>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      'Variation B'
    ).length).toBe(1);
  });

  it('should work with parametrize using context', () => {
      const DoublyNestedComponent = React.createClass({
      contextTypes: {
        experimentParameters: React.PropTypes.object.isRequired,
      },

      render() {
        return (
          <span className={this.context.experimentParameters.test2}>
            foo
          </span>
        );
      }
    });

    const NestedComponent = React.createClass({
      contextTypes: {
        experimentParameters: React.PropTypes.object.isRequired,
      },

      render() {
        return (
          <span className={this.context.experimentParameters.foo}>
            <DoublyNestedComponent />
          </span>
        );
      }
    });
    
    const ParametrizedComponent = React.createClass({
      render() {
        return (
          <span>
            <NestedComponent />
          </span>
        );
      }
    });

    const parametrized = TestUtils.renderIntoDocument(
    <ReactExperiments.Parametrize experimentClass={exp}>
      <ParametrizedComponent />
    </ReactExperiments.Parametrize>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      'Variation B'
    ).length).toBe(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      'Num 2'
    ).length).toBe(1);
  });
});
