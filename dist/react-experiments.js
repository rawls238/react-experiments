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

	var Experiment = _interopRequire(__webpack_require__(3));

	var ABTest = _interopRequire(__webpack_require__(4));

	var Parametrize = _interopRequire(__webpack_require__(5));

	var withExperimentParams = _interopRequire(__webpack_require__(6));

	var parametrize = _interopRequire(__webpack_require__(7));

	module.exports = {
	  ABTest: ABTest,
	  When: Variations.When,
	  Default: Variations.Default,
	  Experiment: Experiment,
	  Parametrize: Parametrize,
	  withExperimentParams: withExperimentParams,
	  parametrize: parametrize
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

	var Experiment = (function () {
	  function Experiment() {
	    _classCallCheck(this, Experiment);
	  }

	  _createClass(Experiment, {
	    get: {
	      value: function get(parameter) {
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

	  return Experiment;
	})();

	module.exports = Experiment;

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
	      shouldEnroll: true
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

	    if (!shouldEnroll) {
	      return null;
	    } else if (!experiment) {
	      console.error("You must pass in an experiment instance as a prop");
	      return null;
	    } else if (!on) {
	      console.error("You must pass an 'on' prop indicating what parameter you want to branch off");
	      return null;
	    }

	    return React.createElement(
	      Parametrize,
	      {
	        experiment: experiment,
	        params: [on],
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
	    var params = _props.params;

	    if (!experiment || !experiment.get) {
	      console.error("You must pass in an experiment instance as a prop");
	      return;
	    } else if (!params) {
	      console.error("You mass pass a list of params in as a prop");
	      return;
	    }

	    var paramsObj = {};
	    for (var i = 0; i < params.length; i++) {
	      var param = params[i];
	      var paramVal = experiment.get(param);
	      if (paramVal !== null && paramVal !== undefined) {
	        paramsObj[param] = paramVal;
	      }
	    }

	    if (Object.keys(paramsObj).length !== 0 && experiment.previouslyLogged() === false) {
	      experiment.logExposure({
	        params: params,
	        name: experiment.getName()
	      });
	    }

	    this.setState({
	      experimentParameters: paramsObj
	    });
	  },

	  renderExperiment: function renderExperiment() {
	    var _this = this;

	    if (!this.state.experimentParameters) {
	      return null;
	    }

	    var passThrough = this.props._passThrough;
	    var renderedChildren = React.Children.map(this.props.children, function (child) {
	      if (passThrough) {
	        return React.addons.cloneWithProps(child, _this.state.experimentParameters);
	      } else {
	        return React.addons.cloneWithProps(child, {});
	      }
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var React = _interopRequire(__webpack_require__(2));

	var Parametrize = _interopRequire(__webpack_require__(5));

	module.exports = function (experiment, experimentParams, Component) {
	  return React.createClass({
	    render: function render() {
	      return React.createElement(
	        Parametrize,
	        { experiment: experiment, params: experimentParams, _passThrough: true },
	        React.createElement(Component, this.props)
	      );
	    }
	  });
	};

/***/ }
/******/ ])
});
;