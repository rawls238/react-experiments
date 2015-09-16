import Experiment from '../src/experiment';
import * as Variations from '../src/variationComponents';
import experimentClass from '../src/experimentClass';
import Parametrize from '../src/parametrize';

export default {
  Experiment: Experiment,
  Variation: Variations.Variation,
  Default: Variations.Default,
  experimentClass: experimentClass,
  Parametrize: Parametrize
};
