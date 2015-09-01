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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _srcVariationExperiment = __webpack_require__(1);

	var VariationExperiment = _interopRequireWildcard(_srcVariationExperiment);

	var _srcNamespace = __webpack_require__(5);

	var Namespace = _interopRequireWildcard(_srcNamespace);

	var _srcVariationComponents = __webpack_require__(4);

	var Variations = _interopRequireWildcard(_srcVariationComponents);

	var _srcExperimentClass = __webpack_require__(8);

	var _srcExperimentClass2 = _interopRequireDefault(_srcExperimentClass);

	exports['default'] = {
	  VariationExperiment: VariationExperiment.VariationExperiment,
	  Namespace: Namespace.Namespace,
	  Variation: Variations.Variation,
	  Default: Variations.Default,
	  ExperimentClass: _srcExperimentClass2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(3);

	var _variationComponents = __webpack_require__(4);

	var VariationExperiment = _react2['default'].createClass({
	  displayName: 'VariationExperiment',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      isEnrolled: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      variation: null
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

	    if (!this.props.experiment || !this.props.experiment.inputs) {
	      console.error("You must pass in an experiment instance as a prop");
	      return;
	    }

	    if (_react2['default'].Children.count(this.props.children) < 2) {
	      throw 'You must have at more than one variation in an experiment';
	    }

	    if (!isEnrolled) {
	      this.setState({
	        variation: null
	      });
	      return;
	    }

	    experiment = this.props.experiment;
	    this.setState({
	      variationName: experiment.get(param)
	    });
	  },

	  renderVariation: function renderVariation() /* : ?React.Compoent */{
	    var child;
	    for (var i = 0; i < this.props.children.length; i++) {
	      child = this.props.children[i];
	      /* NOTE:
	      * presently does not work for the default components in the example
	      * app because it uses JSX and JSX does weird factory stuff.
	      * My guess is that without JSX, we could also just do things like:
	      *   child instanceof DefaultVariation instead of looking at the names
	      * https://gist.github.com/sebmarkbage/d7bce729f38730399d28
	      */
	      if (child.props.name && (child.props.name == this.state.variationName || child.props.name == _constants.DEFAULT_EXPERIMENT_COMPONENT || child.props.name == _constants.EMPTY_EXPERIMENT_COMPONENT)) {
	        // Do extra exposure log annotation. Seems to cause error in: planout.js
	        // TypeError: (0 , _libUtils.clone) is not a function
	        /*
	        this.props.experiment.logExposure({
	          'componentName': child.props.name
	        });
	        */
	        return child;
	      }
	    }
	    return null;
	  },

	  render: function render() /* : ?React.Compoent */{
	    return this.renderVariation();
	  }
	});
	exports.VariationExperiment = VariationExperiment;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var DEFAULT_EXPERIMENT_COMPONENT = '_DEFAULT_COMPONENT';
	exports.DEFAULT_EXPERIMENT_COMPONENT = DEFAULT_EXPERIMENT_COMPONENT;
	var EMPTY_EXPERIMENT_COMPONENT = '_EMPTY_COMPONENT';
	exports.EMPTY_EXPERIMENT_COMPONENT = EMPTY_EXPERIMENT_COMPONENT;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(3);

	var Variation = (function (_React$Component) {
	  _inherits(Variation, _React$Component);

	  function Variation() {
	    _classCallCheck(this, Variation);

	    _get(Object.getPrototypeOf(Variation.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Variation, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return Variation;
	})(_react2['default'].Component);

	exports.Variation = Variation;

	var DefaultVariation = (function (_React$Component2) {
	  _inherits(DefaultVariation, _React$Component2);

	  function DefaultVariation() {
	    _classCallCheck(this, DefaultVariation);

	    _get(Object.getPrototypeOf(DefaultVariation.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(DefaultVariation, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	  }]);

	  return DefaultVariation;
	})(_react2['default'].Component);

	exports.DefaultVariation = DefaultVariation;

	DefaultVariation.propTypes = { name: _react2['default'].PropTypes.string };
	DefaultVariation.defaultProps = { name: _constants.DEFAULT_EXPERIMENT_COMPONENT };

	var EmptyDefaultVariation = (function (_React$Component3) {
	  _inherits(EmptyDefaultVariation, _React$Component3);

	  function EmptyDefaultVariation() {
	    _classCallCheck(this, EmptyDefaultVariation);

	    _get(Object.getPrototypeOf(EmptyDefaultVariation.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(EmptyDefaultVariation, [{
	    key: 'render',
	    value: function render() {
	      return null;
	    }
	  }]);

	  return EmptyDefaultVariation;
	})(_react2['default'].Component);

	exports.EmptyDefaultVariation = EmptyDefaultVariation;

	EmptyDefaultVariation.defaultProps = { name: _constants.EMPTY_EXPERIMENT_COMPONENT };
	EmptyDefaultVariation.propTypes = { name: _react2['default'].PropTypes.string };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _constants = __webpack_require__(3);

	var _experimentEnrollment = __webpack_require__(6);

	var _experimentEnrollment2 = _interopRequireDefault(_experimentEnrollment);

	var _utils = __webpack_require__(7);

	var _utils2 = _interopRequireDefault(_utils);

	var Namespace = _react2['default'].createClass({
	  displayName: 'Namespace',

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
	    var experiment = this.props.experiment;
	    if (child.props.name === _constants.DEFAULT_EXPERIMENT_COMPONENT) {
	      component.defaultComponent = child;
	    } else if (child.props.isEnrolled) {
	      var experimentParam = experiment.get(child.props.param);
	      if (experimentParam && _experimentEnrollment2['default'].getVariation(child.props.children, experimentParam).exposedVariation) {
	        component.exposedExperiment = child;
	      }
	    }
	    return component;
	  },

	  renderEnrolledExperiment: function renderEnrolledExperiment() {
	    var experiment = this.getEnrolledExperiment();
	    if (experiment.exposedExperiment) {
	      return _react2['default'].createElement(
	        Experiment,
	        { experiment: this.props.experiment, param: experiment.exposedExperiment.props.param },
	        experiment.exposedExperiment.props.children
	      );
	    }
	    return experiment.defaultComponent;
	  },

	  render: function render() {
	    return _react2['default'].createElement(
	      'span',
	      null,
	      this.renderEnrolledExperiment()
	    );
	  }
	});
	exports.Namespace = Namespace;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _constants = __webpack_require__(3);

	exports['default'] = {

	  enrollInExperiment: function enrollInExperiment(component, child, variationName) {
	    if (variationName && child.props.name === variationName) {
	      component.selectedVariation = child;
	    } else if (child.props.displayName === _constants.DEFAULT_EXPERIMENT_COMPONENT) {
	      component.defaultComponent = child;
	    }
	    return component;
	  },

	  getVariation: function getVariation(childrenComponents, variationName) {
	    var _this = this;

	    // I don't understand what this line does.
	    if (!childrenComponents.reduce) {
	      return this.enrollInExperiment({}, childrenComponents, variationName);
	    }

	    return childrenComponents.reduce(function (component, child) {
	      if (component.selectedVariation) {
	        return component;
	      }

	      return _this.enrollInExperiment(component, child, variationName);
	    }, {});
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  suppressAutoExposureLogging: function suppressAutoExposureLogging(experimentClass) {
	    if (experimentClass.setAutoExposureLogging && typeof experimentClass.setAutoExposureLogging == "function") {
	      experimentClass.setAutoExposureLogging(false);
	    }
	    return experimentClass;
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ExperimentClass = (function () {
	  function ExperimentClass() {
	    _classCallCheck(this, ExperimentClass);
	  }

	  _createClass(ExperimentClass, [{
	    key: "get",
	    value: function get(name) {
	      throw "IMPLEMENT get";
	    }
	  }, {
	    key: "logExposure",
	    value: function logExposure(opts) {
	      throw "IMPLEMENT logExposure";
	    }
	  }, {
	    key: "getName",
	    value: function getName() {
	      throw "IMPLEMENT getName";
	    }
	  }]);

	  return ExperimentClass;
	})();

	;

	exports["default"] = ExperimentClass;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;