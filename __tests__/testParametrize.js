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
          <span className={this.context.experimentParameters.foo}>
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
          <span className={this.context.experimentParameters.test2}>
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
      'Num1'
    ).length).toBe(1);
  });

  it('should work correctly after re-rendering', () => {
    const TestComponent = React.createClass({
      contextTypes: {
        experimentParameters: React.PropTypes.object.isRequired,
      },

      render() {
        if (!this.props.test) {
          return null;
        }
        return (
          <div className={this.context.experimentParameters.foo}>
            test2
          </div>
        );
      }
    });

    const Parametrized = React.createClass({
      render() {
        return (
          <ReactExperiments.Parametrize experimentClass={exp}>
            <TestComponent test={this.props.test}/>
          </ReactExperiments.Parametrize>
        );
      }
    });

    const RerenderingComponent = React.createClass({
      getInitialState() {
        return {
          'test': false
        }
      },

      toggleTest() {
        this.setState({
          test: !this.state.test
        })
      },

      render() {
        return (
          <div>
            <input type='button' className='input-button' onClick={this.toggleTest} />
            <Parametrized test={this.state.test} />
          </div>
        );
      }
    });

    const experimentComponent = TestUtils.renderIntoDocument(
      <RerenderingComponent />
    );

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      exp.get('foo')
    ).length).toBe(0);

    //click the button and the rendering component should have rendered
    const button = TestUtils.scryRenderedDOMComponentsWithClass(experimentComponent, 'input-button')[0];
    React.addons.TestUtils.Simulate.click(button.getDOMNode());
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      exp.get('foo')
    ).length).toBe(1);

    //click it again and it should be gone
    React.addons.TestUtils.Simulate.click(button.getDOMNode());
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      exp.get('foo')
    ).length).toBe(0);
  });
});