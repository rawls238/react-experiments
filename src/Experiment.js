export default class Experiment {
  get(parameter) {
    throw "IMPLEMENT get";
  }

  logExposure(opts) {
    throw "IMPLEMENT logExposure";
  }

  getName() {
    throw "IMPLEMENT getName";
  }

  previouslyLogged() {
    throw "IMPLEMENT previouslyLogged";
  }

  shouldFetchExperimentParameter(name) {
    throw "IMPLEMENT shouldFetchExperimentParameter";
  }
};
