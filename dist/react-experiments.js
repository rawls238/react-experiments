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

	var Variations = _interopRequireWildcard(__webpack_require__(1));

	var experimentClass = _interopRequire(__webpack_require__(3));

	var ABTest = _interopRequire(__webpack_require__(4));

	var Parametrize = _interopRequire(__webpack_require__(5));

	var withExperimentParams = _interopRequire(__webpack_require__(6));

	module.exports = {
	  ABTest: ABTest,
	  When: Variations.When,
	  Default: Variations.Default,
	  experimentClass: experimentClass,
	  Parametrize: Parametrize,
	  withExperimentParams: withExperimentParams
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

	var When = React.createClass({
	  displayName: "When",

	  getInitialState: function getInitialState() {
	    return {
	      shouldRender: false
	    };
	  },

	  contextTypes: {
	    experimentParameters: React.PropTypes.object.isRequired,
	    experimentProps: React.PropTypes.object.isRequired
	  },

	  componentWillUpdate: function componentWillUpdate(props, state) {
	    if (state.shouldRender) {
	      this.context.experimentProps.enrolledInVariation();
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this.shouldRenderVariation();
	  },

	  shouldRenderVariation: function shouldRenderVariation() {
	    var value = this.props.value;
	    var paramName = this.context.experimentProps.on;
	    if (this.context.experimentParameters && this.context.experimentParameters[paramName] === value) {
	      this.setState({
	        shouldRender: true
	      });
	    }
	  },

	  renderChildren: function renderChildren() {
	    return React.Children.map(this.props.children, function (child) {
	      if (React.isValidElement(child)) {
	        return React.addons.cloneWithProps(child, {});
	      }
	      return child;
	    });
	  },

	  render: function render() {
	    if (!this.state.shouldRender) {
	      return null;
	    }

	    return React.createElement(
	      "span",
	      { className: "experiment-variation-component" },
	      this.renderChildren()
	    );
	  }
	});

	exports.When = When;
	var Default = React.createClass({
	  displayName: "Default",

	  contextTypes: {
	    experimentProps: React.PropTypes.object.isRequired
	  },

	  render: function render() {
	    if (this.context.experimentProps.hasRendered) {
	      return null;
	    }

	    return React.createElement(
	      "span",
	      null,
	      this.props.children
	    );
	  }
	});
	exports.Default = Default;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var experimentClass = (function () {
	  function experimentClass() {
	    _classCallCheck(this, experimentClass);
	  }

	  _createClass(experimentClass, {
	    getParams: {
	      value: function getParams(experimentName) {
	        throw "IMPLEMENT getParams";
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
	    },
	    previouslyLogged: {
	      value: function previouslyLogged() {
	        throw "IMPLEMENT previouslyLogged";
	      }
	    },
	    shouldFetchExperimentParameter: {
	      value: function shouldFetchExperimentParameter(name) {
	        throw "IMPLEMENT shouldFetchExperimentParameter";
	      }
	    }
	  });

	  return experimentClass;
	})();

	;

	module.exports = experimentClass;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var React = _interopRequire(__webpack_require__(2));

	var Parametrize = _interopRequire(__webpack_require__(5));

	var ABTest = React.createClass({
	  displayName: "ABTest",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      shouldEnroll: true,
	      param: null,
	      experimentName: null
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      hasRendered: false
	    };
	  },

	  enrolledInVariation: function enrolledInVariation() {
	    if (!this.state.hasRendered) {
	      this.setState({
	        hasRendered: true
	      });
	    }
	  },

	  renderExposedVariation: function renderExposedVariation() {
	    var _props = this.props;
	    var on = _props.on;
	    var shouldEnroll = _props.shouldEnroll;
	    var experiment = _props.experiment;
	    var experimentName = _props.experimentName;

	    if (!shouldEnroll) {
	      return null;
	    } else if (!experiment) {
	      console.error("You must pass in an experiment instance as a prop");
	      return null;
	    } else if (!experimentName) {
	      console.error("You must pass an experiment name as prop");
	      return null;
	    } else if (!on) {
	      console.error("You must pass an 'on' prop indicating what parameter you want to branch off");
	      return null;
	    }

	    return React.createElement(
	      Parametrize,
	      {
	        experiment: experiment,
	        experimentName: experimentName,
	        on: on,
	        enrolledInVariation: this.enrolledInVariation,
	        hasRendered: this.state.hasRendered },
	      this.props.children
	    );
	  },

	  render: function render() {
	    return this.renderExposedVariation();
	  }
	});

	module.exports = ABTest;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var React = _interopRequire(__webpack_require__(2));

	var Parametrize = React.createClass({
	  displayName: "Parametrize",

	  getInitialState: function getInitialState() {
	    return {
	      experimentParameters: null
	    };
	  },

	  childContextTypes: {
	    experimentParameters: React.PropTypes.object,
	    experimentProps: React.PropTypes.object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    return {
	      experimentParameters: this.state.experimentParameters,
	      experimentProps: this.props
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this.fetchParameters();
	  },

	  fetchParameters: function fetchParameters() {
	    var _props = this.props;
	    var experiment = _props.experiment;
	    var experimentName = _props.experimentName;

	    var params = {};

	    if (!experiment || !experiment.getParams) {
	      console.error("You must pass in an experiment instance as a prop");
	      return;
	    }

	    params = experiment.getParams(experimentName) || {};
	    this.setState({
	      experimentParameters: params
	    });

	    if (experiment.previouslyLogged() === false) {
	      experiment.logExposure({
	        params: params,
	        name: experiment.getName()
	      });
	    }
	  },

	  renderExperiment: function renderExperiment() {
	    if (!this.state.experimentParameters) {
	      return null;
	    }

	    var renderedChildren = React.Children.map(this.props.children, function (child) {
	      return React.addons.cloneWithProps(child, {});
	    });

	    return React.createElement(
	      "span",
	      null,
	      renderedChildren
	    );
	  },

	  render: function render() {
	    return this.renderExperiment();
	  }
	});

	module.exports = Parametrize;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = _interopRequire(__webpack_require__(2));

	module.exports = function (Component) {
	  return React.createClass({
	    contextTypes: {
	      experimentParameters: React.PropTypes.object.isRequired
	    },

	    render: function render() {
	      return React.createElement(Component, _extends({}, this.props, this.context.experimentParameters));
	    }
	  });
	};

/***/ }
/******/ ])
});
;