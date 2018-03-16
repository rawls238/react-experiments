import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {DefaultExperiment, expInitializeObject, clearLogs, getLogLength} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

let exp;
describe('Test experiment component', () => {

  beforeEach(() => {
    clearLogs();
    exp = new DefaultExperiment(expInitializeObject);
  });

  it('fetches the right value', () => {
    expect(exp.get('foo')).toEqual('Variation A');
  });

  it('renders only one, correct variation', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.ABTest on='foo' experiment={exp}>
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
      </ReactExperiments.ABTest>
    );

    //renders only one variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'experiment-variation-component'
    ).length).toBe(1);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'variation-a'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(1);
  });

  it('renders the default variation when needed', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.ABTest experiment={exp} on='foo'>
        <ReactExperiments.When value='foo'>
          foo
        </ReactExperiments.When>
        <ReactExperiments.Default>
          <div className='default-div'>
            Test
          </div>
        </ReactExperiments.Default>
      </ReactExperiments.ABTest>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default-div'
    ).length).toBe(1);
  });

  it('renders nothing with no default variation', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.ABTest experiment={exp} on='foob' >
        <ReactExperiments.When value = 'Variation B'>
          <div className='foobar'>
            test
          </div>
        </ReactExperiments.When>
      </ReactExperiments.ABTest>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'foobar'
    ).length).toBe(0);
  });
});
