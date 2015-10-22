import * as Variations from '../src/variationComponents';
import Experiment from '../src/Experiment';
import ABTest from '../src/abtest';
import Parametrize from '../src/parametrize';
import withExperimentParams from '../src/withExperimentParams';
import parametrize from '../src/parametrizeComponent';

export default {
  ABTest: ABTest,
  When: Variations.When,
  Default: Variations.Default,
  Experiment: Experiment,
  Parametrize: Parametrize,
  withExperimentParams: withExperimentParams,
  parametrize: parametrize
};
