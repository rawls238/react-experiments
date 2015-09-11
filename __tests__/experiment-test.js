import React from 'react/addons';
import {exp} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

const TestUtils = React.addons.TestUtils;
describe('Test experiment component', () => {

  it('fetches the right value', () => {
    expect(exp.get('foo')).toEqual('Variation B');
  });

  it('renders only one variation', () => {
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment param='foo' experimentClass={exp}>
        <ReactExperiments.Variation name='Variation A'>
          <span className='variation-a'>
            foofuckingawesome
          </span>
        </ReactExperiments.Variation>
        <ReactExperiments.Variation name='Variation B'>
          <span className='variation-b'>
            foofuckingawesome
          </span>
        </ReactExperiments.Variation>
      </ReactExperiments.Experiment>
    );
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'variation-b'
    ).length).toBe(1);
  });
});