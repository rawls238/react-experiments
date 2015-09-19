import * as Variations from '../src/variationComponents';
import experimentClass from '../src/experimentClass';
import ABTest from '../src/abtest';
import Parametrize from '../src/parametrize';
import withExperimentParams from '../src/withExperimentParams';

export default {
  ABTest: ABTest,
  When: Variations.When,
  Default: Variations.Default,
  experimentClass: experimentClass,
  Parametrize: Parametrize,
  withExperimentParams: withExperimentParams
};
