import React from 'react/addons';
import {DefaultExperiment, expInitializeObject, clearLogs, getLogLength} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

let exp;
const TestUtils = React.addons.TestUtils;
describe('Test experiment component', () => {

  beforeEach(() => {
    clearLogs();
    exp = new DefaultExperiment(expInitializeObject);
  });

  it('fetches the right value', () => {
    expect(exp.get('foo')).toEqual('Variation B');
  });

  it('renders only one, correct variation', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment param='foo' experiment={exp}>
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
      </ReactExperiments.Experiment>
    );

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

  it('renders the default variation when needed', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experiment={exp} experimentName='SampleExperiment'>
        <ReactExperiments.When value='foo'>
          foo
        </ReactExperiments.When>
        <ReactExperiments.Default>
          <div className='default-div'>
            Test
          </div>
        </ReactExperiments.Default>
      </ReactExperiments.Experiment>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default-div'
    ).length).toBe(1);
  });

  it('renders correctly when parameters are specified via the Variation component', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experiment={exp} experimentName='SampleExperiment'>
        <ReactExperiments.When param ='foo' value = 'Variation B'>
          <div className='foo-variation'>
            foo
          </div>
        </ReactExperiments.When>
        <ReactExperiments.Default>
          <div className='default-div'>
            Test
          </div>
        </ReactExperiments.Default>
      </ReactExperiments.Experiment>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'foo-variation'
    ).length).toBe(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default-div'
    ).length).toBe(0);
  });

  it('works with nested variations', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experiment={exp} experimentName='SampleExperiment'>
        <ReactExperiments.When param ='foo' value = 'Variation B'>
          <ReactExperiments.When param = 'test2' value='Num1'>
            <div className='foo-variation'>
              foo
            </div>
          </ReactExperiments.When>
        </ReactExperiments.When>
        <ReactExperiments.Default>
          <div className='default-div'>
            Test
          </div>
        </ReactExperiments.Default>
      </ReactExperiments.Experiment>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'foo-variation'
    ).length).toBe(1);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default-div'
    ).length).toBe(0);
  });

  it('renders nothing with no defualt variation', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experiment={exp} experimentName='SampleExperiment'>
        <ReactExperiments.When param ='foobar' value = 'Variation B'>
          <div className='foobar'>
            test
          </div>
        </ReactExperiments.When>
      </ReactExperiments.Experiment>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'foobar'
    ).length).toBe(0);
  });

  it('handles enrollment properly', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experiment={exp} shouldEnroll={false} experimentName='SampleExperiment'>
        <div className='foo'>
          test
        </div>
      </ReactExperiments.Experiment>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'foo'
    ).length).toBe(0);

    const experimentComponent2 = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experiment={exp} experimentName='SampleExperiment' shouldEnroll={true}>
        <div className='foo'>
          test
        </div>
      </ReactExperiments.Experiment>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent2,
      'foo'
    ).length).toBe(1);
  });
});
