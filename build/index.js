import Experiment from '../src/experiment';
import * as Variations from '../src/variationComponents';
import experimentClass from '../src/experimentClass';
import Parametrize from '../src/parametrize';
import withExperimentParams from '../src/withExperimentParams';

export default {
  Experiment: Experiment,
  When: Variations.When,
  Default: Variations.Default,
  experimentClass: experimentClass,
  Parametrize: Parametrize,
  withExperimentParams: withExperimentParams
};
