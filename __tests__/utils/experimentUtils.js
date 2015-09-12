import PlanOut from 'PlanOut';

let globalLog = [];
class DefaultExperiment extends PlanOut.Experiment {
  setup() {
    this.name = "SampleExperiment";
  }

  assign(params, args) {
    params.set(
      'foo',
      new PlanOut.Ops.Random.UniformChoice({
        'choices': ['Variation A', 'Variation B'],
        'unit': args.id
      })
    );

    params.set(
      'test2',
      new PlanOut.Ops.Random.UniformChoice({
        'choices': ['Num1', 'Num2'],
        'unit': args.id
      })
    );
  }

  configureLogger() {
    return;
  }

  log(stuff) {
    globalLog.push(stuff);
  }

  getParamNames() {
    return this.getDefaultParamNames();
  }

  previouslyLogged() {
    return;
  }
};

const exp = new DefaultExperiment({ id: '233' });

const clearLogs = () => {
  globalLog = [];
}

const getLogLength = () => {
  return globalLog.length;
}

export default { exp, clearLogs, getLogLength };