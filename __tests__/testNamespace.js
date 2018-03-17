import React from 'react';
import createReactClass from 'create-react-class';
import TestUtils from 'react-dom/test-utils';
import {DefaultNamespace, DefaultEmptyNamespace, expInitializeObject, clearLogs, getLogLength} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

describe('Test that experiment component works with namespaces', () => {

  beforeEach(() => {
    clearLogs();
  });

  it('works when the user is enrolled in the namespace', () => {
    const namespace = new DefaultNamespace(expInitializeObject);
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.ABTest on='foo' experiment={namespace}>
        <ReactExperiments.When value='Variation A'>
          <span className='variation-a'>
            foo
          </span>
        </ReactExperiments.When>
        <ReactExperiments.When value='Variation B'>
          <span className='variation-b'>
            foo
          </span>
        </ReactExperiments.When>
      </ReactExperiments.ABTest>);

     //renders only one variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'experiment-variation-component'
    ).length).toBe(1);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'variation-b'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(1);
  });

  it('default component works when the user is not enrolled in a namespace', () => {
    const emptyNamespace = new DefaultEmptyNamespace(expInitializeObject);
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.ABTest on='foo' experiment={emptyNamespace}>
        <ReactExperiments.When value='Variation A'>
          <span className='variation-a'>
            foo
          </span>
        </ReactExperiments.When>
        <ReactExperiments.When value='Variation B'>
          <span className='variation-b'>
            foo
          </span>
        </ReactExperiments.When>
        <ReactExperiments.Default>
          <span className='default'>
            rawr
          </span>
        </ReactExperiments.Default>
      </ReactExperiments.ABTest>);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'experiment-variation-component'
    ).length).toBe(0);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(0);
  });

  it('works when enrolled in the namespace with parametrize', () => {
    const namespace = new DefaultNamespace(expInitializeObject);
    let SampleComponent = createReactClass({
      getClassName() {
        return this.props.foo || 'default'
      },

      render() {
        return (
          <div className={this.getClassName()}>
            Test
          </div>
        );
      }
    });
    SampleComponent = ReactExperiments.withExperimentParams(SampleComponent);
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize params={['foo']} experiment={namespace}>
        <SampleComponent />
      </ReactExperiments.Parametrize>
    );

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'Variation B'
    ).length).toBe(1);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default'
    ).length).toBe(0);

    expect(getLogLength()).toEqual(1);

    const experimentComponent2 = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize params={['fz']} experiment={namespace}>
        <SampleComponent />
      </ReactExperiments.Parametrize>
    );

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent2,
      'Variation B'
    ).length).toBe(0);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent2,
      'default'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(1);
  });


  it('default component works when the user is not enrolled in a namespace', () => {
    const emptyNamespace = new DefaultEmptyNamespace(expInitializeObject);
    let SampleComponent = createReactClass({
      getClassName() {
        return this.props.foo || 'default'
      },

      render() {
        return (
          <div className={this.getClassName()}>
            Test
          </div>
        );
      }
    });
    SampleComponent = ReactExperiments.withExperimentParams(SampleComponent);
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize params={['foo']} experiment={emptyNamespace}>
        <SampleComponent />
      </ReactExperiments.Parametrize>
    );

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'Variation B'
    ).length).toBe(0);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(0);
  });

  it('works when a user is enrolled in a different experiment in a namespace', () => {
    const namespace = new DefaultNamespace(expInitializeObject);
    let SampleComponent = createReactClass({
      getClassName() {
        return this.props.foobar || 'default'
      },

      render() {
        return (
          <div className={this.getClassName()}>
            Test
          </div>
        );
      }
    });
    SampleComponent = ReactExperiments.withExperimentParams(SampleComponent);
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Parametrize params={['foobar']} experiment={namespace}>
        <SampleComponent />
      </ReactExperiments.Parametrize>
    );

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'Variation B'
    ).length).toBe(0);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(0);
  });
});
