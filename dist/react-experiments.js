(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactExperiments"] = factory(require("react"));
	else
		root["ReactExperiments"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

	var Experiment = _interopRequireWildcard(__webpack_require__(1));

	var Namespace = _interopRequireWildcard(__webpack_require__(6));

	var Variations = _interopRequireWildcard(__webpack_require__(7));

	var ExperimentClass = _interopRequire(__webpack_require__(8));

	module.exports = {
	  Experiment: Experiment.Experiment,
	  Namespace: Namespace.Namespace,
	  Variation: Variations.Variation,
	  Default: Variations.Default,
	  ExperimentClass: ExperimentClass
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var React = _interopRequire(__webpack_require__(2));

	var ExperimentEnrollment = _interopRequire(__webpack_require__(3));

	var suppressAutoExposureLogging = __webpack_require__(5).suppressAutoExposureLogging;

	var Experiment = React.createClass({
	  displayName: "Experiment",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      isEnrolled: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      exposedVariation: null
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.selectVariation();
	  },

	  selectVariation: function selectVariation() {
	    var experiment = undefined;
	    var _props = this.props;
	    var param = _props.param;
	    var isEnrolled = _props.isEnrolled;

	    if (!this.props.experimentClass || !this.props.experimentClass.inputs) {
	      console.error("You must pass in an experimentClass instance as a prop");
	      return;
	    }

	    if (React.Children.count(this.props.children) === 0) {
	      throw "You must have at least one variation in an experiment";
	    }

	    if (!isEnrolled) {
	      this.setState({
	        exposedVariation: null
	      });
	      return;
	    }

	    experiment = suppressAutoExposureLogging(this.props.experimentClass);
	    this.setState({
	      exposedVariation: experiment.get(param)
	    });
	  },

	  renderExposedVariation: function renderExposedVariation() {
	    var variationComponent = ExperimentEnrollment.getExposedExperimentVariation(this.props.children, this.state.exposedVariation);

	    if (variationComponent.exposedVariation) {
	      this.props.experimentClass.logExposure();
	      return variationComponent.exposedVariation;
	    } else if (variationComponent.defaultComponent) {
	      return variationComponent.defaultComponent;
	    }
	    return null;
	  },

	  render: function render() {
	    return this.renderExposedVariation();
	  }
	});
	exports.Experiment = Experiment;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var DEFAULT_EXPERIMENT_COMPONENT = __webpack_require__(4).DEFAULT_EXPERIMENT_COMPONENT;

	module.exports = {

	  enrollInExperiment: function enrollInExperiment(component, child, variationName) {
	    if (variationName && child.props.name === variationName) {
	      component.exposedVariation = child;
	    } else if (child.props.displayName === DEFAULT_EXPERIMENT_COMPONENT) {
	      component.defaultComponent = child;
	    }
	    return component;
	  },

	  getExposedExperimentVariation: function getExposedExperimentVariation(childrenComponents, variationName) {
	    var _this = this;

	    if (!childrenComponents.reduce) {
	      return this.enrollInExperiment({}, childrenComponents, variationName);
	    }

	    return childrenComponents.reduce(function (component, child) {
	      if (component.exposedVariation) {
	        return component;
	      }

	      return _this.enrollInExperiment(component, child, variationName);
	    }, {});
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DEFAULT_EXPERIMENT_COMPONENT = "DEFAULT";
	exports.DEFAULT_EXPERIMENT_COMPONENT = DEFAULT_EXPERIMENT_COMPONENT;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  suppressExposureLogging: function suppressExposureLogging(experimentClass) {
	    if (experimentClass.setAutoExposureLogging && typeof experimentClass.setAutoExposureLogging == "function") {
	      experimentClass.setAutoExposureLogging(false);
	    }
	    return experimentClass;
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var React = _interopRequire(__webpack_require__(2));

	var DEFAULT_EXPERIMENT_COMPONENT = __webpack_require__(4).DEFAULT_EXPERIMENT_COMPONENT;

	var ExperimentEnrollment = _interopRequire(__webpack_require__(3));

	var suppressAutoExposureLogging = __webpack_require__(5).suppressAutoExposureLogging;

	var Namespace = React.createClass({
	  displayName: "Namespace",

	  getEnrolledExperiment: function getEnrolledExperiment() {
	    var _this = this;

	    if (!this.props.children.reduce) {
	      return this.enrollInNamespace({}, this.props.children);
	    }

	    return this.props.children.reduce(function (component, child) {
	      if (component.exposedExperiment) {
	        return component;
	      }

	      return _this.enrollInNamespace(component, child);
	    }, {});
	  },

	  enrollInNamespace: function enrollInNamespace(component, child) {
	    var experiment = suppressAutoExposureLogging(this.props.experimentClass);
	    if (child.props.displayName === DEFAULT_EXPERIMENT_COMPONENT) {
	      component.defaultComponent = child;
	    } else if (child.props.isEnrolled) {
	      var experimentParam = experiment.get(child.props.param);
	      if (experimentParam && ExperimentEnrollment.getExposedExperimentVariation(child.props.children, experimentParam).exposedVariation) {
	        component.exposedExperiment = child;
	      }
	    }
	    return component;
	  },

	  renderEnrolledExperiment: function renderEnrolledExperiment() {
	    var experiment = this.getEnrolledExperiment();
	    if (experiment.exposedExperiment) {
	      return React.createElement(
	        Experiment,
	        { experimentClass: this.props.experimentClass, param: experiment.exposedExperiment.props.param },
	        experiment.exposedExperiment.props.children
	      );
	    }
	    return experiment.defaultComponent;
	  },

	  render: function render() {
	    return React.createElement(
	      "span",
	      null,
	      this.renderEnrolledExperiment()
	    );
	  }
	});
	exports.Namespace = Namespace;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var React = _interopRequire(__webpack_require__(2));

	var DEFAULT_EXPERIMENT_COMPONENT = __webpack_require__(4).DEFAULT_EXPERIMENT_COMPONENT;

	var Variation = React.createClass({
	  displayName: "Variation",

	  render: function render() {
	    return React.createElement(
	      "span",
	      null,
	      this.props.children
	    );
	  }
	});

	exports.Variation = Variation;
	var Default = React.createClass({
	  displayName: "Default",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      displayName: DEFAULT_EXPERIMENT_COMPONENT
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      "span",
	      null,
	      this.props.children
	    );
	  }
	});
	exports.Default = Default;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var ExperimentClass = (function () {
	  function ExperimentClass() {
	    _classCallCheck(this, ExperimentClass);
	  }

	  _createClass(ExperimentClass, {
	    get: {
	      value: function get(name) {
	        throw "IMPLEMENT get";
	      }
	    },
	    logExposure: {
	      value: function logExposure(opts) {
	        throw "IMPLEMENT logExposure";
	      }
	    },
	    getName: {
	      value: function getName() {
	        throw "IMPLEMENT getName";
	      }
	    }
	  });

	  return ExperimentClass;
	})();

	;

	module.exports = ExperimentClass;

/***/ }
/******/ ])
});
;