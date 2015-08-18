import Experiment from './src/experiment';
import Namespace from './src/namespace';
import * as Variations from './src/variationComponents';
import ExperimentClass from './src/experimentClass';

export default {
  Experiment: Experiment,
  Namespace: Namespace,
  Variation: Variations.Variation,
  Default: Variations.Default,
  ExperimentClass: ExperimentClass
};
