/* This is the sample experiment taken from https://github.com/HubSpot/PlanOut.js/blob/master/examples/sample_planout_es5.js */

Object.getOwnPropertyDescriptors = function getOwnPropertyDescriptors(obj) {
  var descriptors = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      descriptors[prop] = Object.getOwnPropertyDescriptor(obj, prop);
    }
  }
  return descriptors;
};
 
Function.prototype.extend = function extend(proto) {
    var superclass = this;
    var constructor;
 
    if (!proto.hasOwnProperty('constructor')) {
      Object.defineProperty(proto, 'constructor', {
        value: function () {
            // Default call to superclass as in maxmin classes
            superclass.apply(this, arguments);
        },
        writable: true,
        configurable: true,
        enumerable: false
      });
    }
    constructor = proto.constructor;
    
    constructor.prototype = Object.create(this.prototype, Object.getOwnPropertyDescriptors(proto));
    
    return constructor;
};

/* End extend helper */

var DemoExperiment = window.PlanOut.Experiment.extend({
  setup: function() {
    this.name = "SampleExperiment";
  },
  assign: function(params, args) {
    params.set(
      'foo',
      new window.PlanOut.Ops.Random.UniformChoice({
        'choices': ['Variation A', 'Variation B'],
        'unit': args.id
      })
    );

    params.set(
      'test2',
      new window.PlanOut.Ops.Random.UniformChoice({
        'choices': ['Num1', 'Num2'],
        'unit': args.id
      })
    );
  },
  configureLogger: function() {
    return;
  },
  log: function(stuff) {
    console.log(stuff);
  },
  getParamNames: function() {
    return this.getDefaultParamNames();
  },
  previouslyLogged: function() {
    return this._exposureLogged;
  }
});

window.userid = Math.floor(Math.random() * 1000);
window.demo = new DemoExperiment({'id': userid});