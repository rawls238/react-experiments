import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import {DefaultExperiment, expInitializeObject, getLogLength, clearLogs} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

let exp;
describe('Test parametrize component', () => {

  beforeEach(() => {
    clearLogs();
    exp = new DefaultExperiment(expInitializeObject);
  });

  it('should work with parametrize using props', () => {
    const ParametrizedComponent = createReactClass({
      render() {
        return (
          <span className={this.props.foo}>
            this.props.foo;
          </span>
        );
      }
    });
    const ParametrizedComponentWithParams = ReactExperiments.withExperimentParams(ParametrizedComponent);
    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experiment={exp} params={['foo']}>
        <ParametrizedComponentWithParams />
      </ReactExperiments.Parametrize>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      'Variation A'
    ).length).toBe(1);
  });

  it('should work with parametrize using context', () => {
    const DoublyNestedComponent = createReactClass({
      contextTypes: {
        experimentParameters: PropTypes.object.isRequired,
      },

      render() {
        return (
          <span className={this.context.experimentParameters.foo}>
            foo
          </span>
        );
      }
    });

    const NestedComponent = createReactClass({
      contextTypes: {
        experimentParameters: PropTypes.object.isRequired,
      },

      render() {
        return (
          <span className={this.context.experimentParameters.test2}>
            <DoublyNestedComponent />
          </span>
        );
      }
    });

    const ParametrizedComponent = createReactClass({
      render() {
        return (
          <span>
            <NestedComponent />
          </span>
        );
      }
    });

    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experiment={exp} params={['foo', 'test2']}>
        <ParametrizedComponent />
      </ReactExperiments.Parametrize>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      'Variation A'
    ).length).toBe(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      'Num1'
    ).length).toBe(1);
  });

  it('should work correctly after re-rendering', () => {
    const TestComponent = createReactClass({
      contextTypes: {
        experimentParameters: PropTypes.object.isRequired,
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

    const Parametrized = createReactClass({
      render() {
        return (
          <ReactExperiments.Parametrize experiment={exp} params={['foo']}>
            <TestComponent test={this.props.test}/>
          </ReactExperiments.Parametrize>
        );
      }
    });

    const RerenderingComponent = createReactClass({
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
    TestUtils.Simulate.click(button);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      exp.get('foo')
    ).length).toBe(1);

    //click it again and it should be gone
    TestUtils.Simulate.click(button);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      exp.get('foo')
    ).length).toBe(0);
  });

  it('should work with the withExperimentParams component', () => {
    const Buttons = createReactClass({
      render() {
        return (
          <div>
            <div className={this.props.foo}>
              test
            </div>
            <div className={this.props.test2}>
              testing2
            </div>
            <div className={this.props.other}>
              testing3
            </div>
          </div>
        );
      }
    });

    const ExpButton = ReactExperiments.withExperimentParams(Buttons);

    const otherVal = 'ha';
    const parametrized = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize experiment={exp} params={['foo', 'test2']}>
        <ExpButton other={otherVal} />
      </ReactExperiments.Parametrize>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      exp.get('foo')
    ).length).toBe(1);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      exp.get('test2')
    ).length).toBe(1);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      otherVal
    ).length).toBe(1);
  });

  it('should work with higher order component and list of params', () => {
    const Buttons = ReactExperiments.parametrize(exp, ['foo', 'test2'], createReactClass({
      render() {
        return (
          <div>
            <div className={this.props.foo}>
              test
            </div>
            <div className={this.props.test2}>
              testing2
            </div>
            <div className={this.props.other}>
              testing3
            </div>
          </div>
        );
      }
    }));

    const otherVal = 'ha';
    const parametrized = TestUtils.renderIntoDocument(
      <Buttons other={otherVal} />
    );

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      exp.get('foo')
    ).length).toBe(1);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      exp.get('test2')
    ).length).toBe(1);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      otherVal
    ).length).toBe(1);
  });

  it('should not log exposure if no valid params are passed', () => {
    const Test = ReactExperiments.parametrize(exp, ['foobar'], createReactClass({
      render() {
        return (
          <div>
            <div className={this.props.foo}>
              testing2
            </div>
          </div>
        );
      }
    }));
    const otherVal = 'ha';
    const parametrized = TestUtils.renderIntoDocument(
      <Test other={otherVal} />
    );
    expect(getLogLength()).toEqual(0);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      parametrized,
      exp.get('foo')
    ).length).toBe(0);
  });
});
