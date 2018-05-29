define(["app/core/utils/kbn","app/plugins/sdk","lodash","moment"], function(__WEBPACK_EXTERNAL_MODULE_app_core_utils_kbn__, __WEBPACK_EXTERNAL_MODULE_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_moment__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/index.js??ref--5-1!./css/query_editor.css":
/*!*******************************************************************!*\
  !*** ../node_modules/css-loader??ref--5-1!./css/query_editor.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".min-width-10 {\n  min-width: 10rem;\n}\n\n.min-width-12 {\n  min-width: 12rem;\n}\n\n.min-width-20 {\n  min-width: 20rem;\n}\n\n.gf-form-select-wrapper select.gf-form-input {\n  height: 2.64rem;\n}\n\n.gf-form-select-wrapper--caret-indent.gf-form-select-wrapper::after {\n  right: 0.775rem\n}\n\n.service-dropdown {\n  width: 12rem;\n}\n\n.aggregation-dropdown-wrapper {\n  max-width: 29.1rem;\n}\n\n.timegrainunit-dropdown-wrapper {\n  width: 8rem;\n}\n", "", {"version":3,"sources":["/home/daniel/dev/go/src/github.com/grafana/grafana/data/plugins/grafana-azure-monitor-datasource/src/css/query_editor.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;CAClB;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,eAAe;CAChB;;AAED;EACE,aAAa;CACd;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,YAAY;CACb","file":"query_editor.css","sourcesContent":[".min-width-10 {\n  min-width: 10rem;\n}\n\n.min-width-12 {\n  min-width: 12rem;\n}\n\n.min-width-20 {\n  min-width: 20rem;\n}\n\n.gf-form-select-wrapper select.gf-form-input {\n  height: 2.64rem;\n}\n\n.gf-form-select-wrapper--caret-indent.gf-form-select-wrapper::after {\n  right: 0.775rem\n}\n\n.service-dropdown {\n  width: 12rem;\n}\n\n.aggregation-dropdown-wrapper {\n  max-width: 29.1rem;\n}\n\n.timegrainunit-dropdown-wrapper {\n  width: 8rem;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/*!**************************************************!*\
  !*** ../node_modules/css-loader/lib/css-base.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./app_insights/app_insights_datasource.ts":
/*!*************************************************!*\
  !*** ./app_insights/app_insights_datasource.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _app_insights_querystring_builder = __webpack_require__(/*! ./app_insights_querystring_builder */ "./app_insights/app_insights_querystring_builder.ts");

var _app_insights_querystring_builder2 = _interopRequireDefault(_app_insights_querystring_builder);

var _app_insights_rawquerystring_builder = __webpack_require__(/*! ./app_insights_rawquerystring_builder */ "./app_insights/app_insights_rawquerystring_builder.ts");

var _app_insights_rawquerystring_builder2 = _interopRequireDefault(_app_insights_rawquerystring_builder);

var _response_parser = __webpack_require__(/*! ./response_parser */ "./app_insights/response_parser.ts");

var _response_parser2 = _interopRequireDefault(_response_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
var AppInsightsDatasource = /** @class */function () {
    function AppInsightsDatasource(instanceSettings, backendSrv, templateSrv, $q) {
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.$q = $q;
        this.version = 'beta';
        this.id = instanceSettings.id;
        this.applicationId = instanceSettings.jsonData.appInsightsAppId;
        this.baseUrl = "/appinsights/" + this.version + "/apps/" + this.applicationId;
        this.url = instanceSettings.url;
    }
    AppInsightsDatasource.prototype.isConfigured = function () {
        return this.applicationId && this.applicationId.length > 0;
    };
    AppInsightsDatasource.prototype.query = function (options) {
        var _this = this;
        var queries = _lodash2.default.filter(options.targets, function (item) {
            return item.hide !== true;
        }).map(function (target) {
            var item = target.appInsights;
            if (item.rawQuery) {
                var querystringBuilder = new _app_insights_rawquerystring_builder2.default(item.rawQueryString, options);
                var url = _this.baseUrl + "/query?" + querystringBuilder.generate();
                return {
                    refId: target.refId,
                    intervalMs: options.intervalMs,
                    maxDataPoints: options.maxDataPoints,
                    datasourceId: _this.id,
                    url: url,
                    format: options.format,
                    alias: item.alias,
                    xaxis: item.xaxis,
                    yaxis: item.yaxis,
                    spliton: item.spliton,
                    raw: true
                };
            } else {
                var querystringBuilder = new _app_insights_querystring_builder2.default(options.range.from, options.range.to, options.interval);
                if (item.groupBy !== 'none') {
                    querystringBuilder.setGroupBy(_this.templateSrv.replace(item.groupBy, options.scopedVars));
                }
                querystringBuilder.setAggregation(item.aggregation);
                querystringBuilder.setInterval(item.timeGrainType, _this.templateSrv.replace(item.timeGrain, options.scopedVars), item.timeGrainUnit);
                querystringBuilder.setFilter(_this.templateSrv.replace(item.filter || ''));
                var url = _this.baseUrl + "/metrics/" + _this.templateSrv.replace(item.metricName, options.scopedVars) + "?" + querystringBuilder.generate();
                return {
                    refId: target.refId,
                    intervalMs: options.intervalMs,
                    maxDataPoints: options.maxDataPoints,
                    datasourceId: _this.id,
                    url: url,
                    format: options.format,
                    alias: item.alias,
                    xaxis: '',
                    yaxis: '',
                    spliton: '',
                    raw: false
                };
            }
        });
        if (queries.length === 0) {
            return this.$q.when({ data: [] });
        }
        var promises = this.doQueries(queries);
        return this.$q.all(promises).then(function (results) {
            return new _response_parser2.default(results).parseQueryResult();
        });
    };
    AppInsightsDatasource.prototype.doQueries = function (queries) {
        var _this = this;
        return _lodash2.default.map(queries, function (query) {
            return _this.doRequest(query.url).then(function (result) {
                return {
                    result: result,
                    query: query
                };
            }).catch(function (err) {
                throw {
                    error: err,
                    query: query
                };
            });
        });
    };
    AppInsightsDatasource.prototype.annotationQuery = function (options) {};
    AppInsightsDatasource.prototype.metricFindQuery = function (query) {
        var appInsightsMetricNameQuery = query.match(/^AppInsightsMetricNames\(\)/i);
        if (appInsightsMetricNameQuery) {
            return this.getMetricNames();
        }
        var appInsightsGroupByQuery = query.match(/^AppInsightsGroupBys\(([^\)]+?)(,\s?([^,]+?))?\)/i);
        if (appInsightsGroupByQuery) {
            var metricName = appInsightsGroupByQuery[1];
            return this.getGroupBys(this.templateSrv.replace(metricName));
        }
        return undefined;
    };
    AppInsightsDatasource.prototype.testDatasource = function () {
        var url = this.baseUrl + "/metrics/metadata";
        return this.doRequest(url).then(function (response) {
            if (response.status === 200) {
                return {
                    status: 'success',
                    message: 'Successfully queried the Application Insights service.',
                    title: 'Success'
                };
            }
            return {
                status: 'error',
                message: 'Returned http status code ' + response.status
            };
        }).catch(function (error) {
            var message = 'Application Insights: ';
            message += error.statusText ? error.statusText + ': ' : '';
            if (error.data && error.data.error && error.data.error.code === 'PathNotFoundError') {
                message += 'Invalid Application Id for Application Insights service.';
            } else if (error.data && error.data.error) {
                message += error.data.error.code + '. ' + error.data.error.message;
            } else {
                message += 'Cannot connect to Application Insights REST API.';
            }
            return {
                status: 'error',
                message: message
            };
        });
    };
    AppInsightsDatasource.prototype.doRequest = function (url, maxRetries) {
        var _this = this;
        if (maxRetries === void 0) {
            maxRetries = 1;
        }
        return this.backendSrv.datasourceRequest({
            url: this.url + url,
            method: 'GET'
        }).catch(function (error) {
            if (maxRetries > 0) {
                return _this.doRequest(url, maxRetries - 1);
            }
            throw error;
        });
    };
    AppInsightsDatasource.prototype.getMetricNames = function () {
        var url = this.baseUrl + "/metrics/metadata";
        return this.doRequest(url).then(_response_parser2.default.parseMetricNames);
    };
    AppInsightsDatasource.prototype.getMetricMetadata = function (metricName) {
        var url = this.baseUrl + "/metrics/metadata";
        return this.doRequest(url).then(function (result) {
            return new _response_parser2.default(result).parseMetadata(metricName);
        });
    };
    AppInsightsDatasource.prototype.getGroupBys = function (metricName) {
        return this.getMetricMetadata(metricName).then(function (result) {
            return new _response_parser2.default(result).parseGroupBys();
        });
    };
    return AppInsightsDatasource;
}();
exports.default = AppInsightsDatasource;

/***/ }),

/***/ "./app_insights/app_insights_querystring_builder.ts":
/*!**********************************************************!*\
  !*** ./app_insights/app_insights_querystring_builder.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _time_grain_converter = __webpack_require__(/*! ../time_grain_converter */ "./time_grain_converter.ts");

var _time_grain_converter2 = _interopRequireDefault(_time_grain_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppInsightsQuerystringBuilder = /** @class */function () {
    function AppInsightsQuerystringBuilder(from, to, grafanaInterval) {
        this.from = from;
        this.to = to;
        this.grafanaInterval = grafanaInterval;
        this.aggregation = '';
        this.groupBy = '';
        this.timeGrainType = '';
        this.timeGrain = '';
        this.timeGrainUnit = '';
        this.filter = '';
    }
    AppInsightsQuerystringBuilder.prototype.setAggregation = function (aggregation) {
        this.aggregation = aggregation;
    };
    AppInsightsQuerystringBuilder.prototype.setGroupBy = function (groupBy) {
        this.groupBy = groupBy;
    };
    AppInsightsQuerystringBuilder.prototype.setInterval = function (timeGrainType, timeGrain, timeGrainUnit) {
        this.timeGrainType = timeGrainType;
        this.timeGrain = timeGrain;
        this.timeGrainUnit = timeGrainUnit;
    };
    AppInsightsQuerystringBuilder.prototype.setFilter = function (filter) {
        this.filter = filter;
    };
    AppInsightsQuerystringBuilder.prototype.generate = function () {
        var querystring = "timespan=" + this.from.utc().format() + "/" + this.to.utc().format();
        if (this.aggregation && this.aggregation.length > 0) {
            querystring += "&aggregation=" + this.aggregation;
        }
        if (this.groupBy && this.groupBy.length > 0) {
            querystring += "&segment=" + this.groupBy;
        }
        if (this.timeGrainType === 'specific' && this.timeGrain && this.timeGrainUnit) {
            querystring += "&interval=" + _time_grain_converter2.default.createISO8601Duration(this.timeGrain, this.timeGrainUnit);
        }
        if (this.timeGrainType === 'auto') {
            querystring += "&interval=" + _time_grain_converter2.default.createISO8601DurationFromInterval(this.grafanaInterval);
        }
        if (this.filter) {
            querystring += "&filter=" + this.filter;
        }
        return querystring;
    };
    return AppInsightsQuerystringBuilder;
}();
exports.default = AppInsightsQuerystringBuilder;

/***/ }),

/***/ "./app_insights/app_insights_rawquerystring_builder.ts":
/*!*************************************************************!*\
  !*** ./app_insights/app_insights_rawquerystring_builder.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var AppInsightsRawQuerystringBuilder = /** @class */function () {
    function AppInsightsRawQuerystringBuilder(rawQueryString, options) {
        this.rawQueryString = rawQueryString;
        this.options = options;
    }
    AppInsightsRawQuerystringBuilder.prototype.generate = function () {
        var queryString = this.rawQueryString;
        queryString = queryString.replace(/\$__interval/gi, this.options.interval);
        queryString = queryString.replace(/\$timeFilter/gi, this.getTimeFilter(this.options));
        queryString = queryString.replace(/\$from/gi, this.getFrom(this.options));
        queryString = queryString.replace(/\$until/gi, this.getUntil(this.options));
        queryString = encodeURIComponent(queryString);
        var uriString = "query=" + queryString;
        return uriString;
    };
    AppInsightsRawQuerystringBuilder.prototype.getFrom = function (options) {
        var from = options.range.from;
        return "datetime(" + from.toISOString() + ")";
    };
    AppInsightsRawQuerystringBuilder.prototype.getUntil = function (options) {
        if (options.rangeRaw.to === 'now') {
            return "now()";
        } else {
            var until = options.range.to;
            return "datetime(" + until.toISOString() + ")";
        }
    };
    AppInsightsRawQuerystringBuilder.prototype.getTimeFilter = function (options) {
        if (options.rangeRaw.to === 'now') {
            return "timestamp >= " + this.getFrom(options);
        } else {
            return "timestamp >= " + this.getFrom(options) + " and timestamp <= " + this.getUntil(options);
        }
    };
    return AppInsightsRawQuerystringBuilder;
}();
exports.default = AppInsightsRawQuerystringBuilder;

/***/ }),

/***/ "./app_insights/response_parser.ts":
/*!*****************************************!*\
  !*** ./app_insights/response_parser.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponseParser = /** @class */function () {
    function ResponseParser(results) {
        this.results = results;
    }
    ResponseParser.prototype.parseQueryResult = function () {
        var data = [];
        var columns = [];
        for (var i = 0; i < this.results.length; i++) {
            if (this.results[i].query.raw) {
                var xaxis = this.results[i].query.xaxis;
                var yaxises = this.results[i].query.yaxis;
                var spliton = this.results[i].query.spliton;
                columns = this.results[i].result.data.Tables[0].Columns;
                var rows = this.results[i].result.data.Tables[0].Rows;
                var alias = this.results[i].query.alias;
                data = _lodash2.default.concat(data, this.parseRawQueryResultRow(columns, rows, alias, xaxis, yaxises, spliton));
            } else {
                var value = this.results[i].result.data.value;
                var alias = this.results[i].query.alias;
                data = _lodash2.default.concat(data, this.parseQueryResultRow(value, alias));
            }
        }
        var columns_for_dropdowns = _lodash2.default.map(columns, function (column) {
            return { text: column.ColumnName, value: column.ColumnName };
        });
        return { data: data, columns: columns_for_dropdowns };
        ;
    };
    ResponseParser.prototype.parseRawQueryResultRow = function (columns, rows, alias, xaxis, yaxises, spliton) {
        var data = [];
        var xaxis_column = columns.findIndex(function (column) {
            return column.ColumnName === xaxis;
        });
        var yaxises_split = yaxises.split(',');
        var yaxis_columns = {};
        _lodash2.default.forEach(yaxises_split, function (yaxis) {
            yaxis_columns[yaxis] = columns.findIndex(function (column) {
                return column.ColumnName === yaxis;
            });
        });
        var spliton_column = columns.findIndex(function (column) {
            return column.ColumnName === spliton;
        });
        var convert_timestamp = xaxis === "timestamp";
        _lodash2.default.forEach(rows, function (row) {
            _lodash2.default.forEach(yaxis_columns, function (yaxis_column, yaxis_name) {
                var bucket = spliton_column === -1 ? ResponseParser.findOrCreateBucket(data, yaxis_name) : ResponseParser.findOrCreateBucket(data, row[spliton_column]);
                var epoch = convert_timestamp ? ResponseParser.dateTimeToEpoch(row[xaxis_column]) : row[xaxis_column];
                bucket.datapoints.push([row[yaxis_column], epoch]);
            });
        });
        return data;
    };
    ResponseParser.prototype.parseQueryResultRow = function (value, alias) {
        var data = [];
        if (ResponseParser.isSingleValue(value)) {
            var metricName = ResponseParser.getMetricFieldKey(value);
            var aggField = ResponseParser.getKeyForAggregationField(value[metricName]);
            var epoch = ResponseParser.dateTimeToEpoch(value.end);
            data.push({ target: metricName, datapoints: [[value[metricName][aggField], epoch]] });
            return data;
        }
        var groupedBy = ResponseParser.hasSegmentsField(value.segments[0]);
        if (!groupedBy) {
            var metricName = ResponseParser.getMetricFieldKey(value.segments[0]);
            var dataTarget = ResponseParser.findOrCreateBucket(data, metricName);
            for (var i = 0; i < value.segments.length; i++) {
                var epoch = ResponseParser.dateTimeToEpoch(value.segments[i].end);
                var aggField = ResponseParser.getKeyForAggregationField(value.segments[i][metricName]);
                dataTarget.datapoints.push([value.segments[i][metricName][aggField], epoch]);
            }
        } else {
            for (var i = 0; i < value.segments.length; i++) {
                var epoch = ResponseParser.dateTimeToEpoch(value.segments[i].end);
                for (var j = 0; j < value.segments[i].segments.length; j++) {
                    var metricName = ResponseParser.getMetricFieldKey(value.segments[i].segments[j]);
                    var aggField = ResponseParser.getKeyForAggregationField(value.segments[i].segments[j][metricName]);
                    var target = this.getTargetName(value.segments[i].segments[j], alias);
                    var bucket = ResponseParser.findOrCreateBucket(data, target);
                    bucket.datapoints.push([value.segments[i].segments[j][metricName][aggField], epoch]);
                }
            }
        }
        return data;
    };
    ResponseParser.prototype.getTargetName = function (segment, alias) {
        var metric = '';
        var segmentName = '';
        var segmentValue = '';
        for (var prop in segment) {
            if (_lodash2.default.isObject(segment[prop])) {
                metric = prop;
            } else {
                segmentName = prop;
                segmentValue = segment[prop];
            }
        }
        if (alias) {
            var regex = /\{\{([\s\S]+?)\}\}/g;
            return alias.replace(regex, function (match, g1, g2) {
                var group = g1 || g2;
                if (group === 'metric') {
                    return metric;
                } else if (group === 'groupbyname') {
                    return segmentName;
                } else if (group === 'groupbyvalue') {
                    return segmentValue;
                }
                return match;
            });
        }
        return metric + ("{" + segmentName + "=\"" + segmentValue + "\"}");
    };
    ResponseParser.isSingleValue = function (value) {
        return !ResponseParser.hasSegmentsField(value);
    };
    ResponseParser.findOrCreateBucket = function (data, target) {
        var dataTarget = _lodash2.default.find(data, ['target', target]);
        if (!dataTarget) {
            dataTarget = { target: target, datapoints: [] };
            data.push(dataTarget);
        }
        return dataTarget;
    };
    ResponseParser.hasSegmentsField = function (obj) {
        var keys = _lodash2.default.keys(obj);
        return _lodash2.default.indexOf(keys, 'segments') > -1;
    };
    ResponseParser.getMetricFieldKey = function (segment) {
        var keys = _lodash2.default.keys(segment);
        return _lodash2.default.filter(_lodash2.default.without(keys, 'start', 'end'), function (key) {
            return _lodash2.default.isObject(segment[key]);
        })[0];
    };
    ResponseParser.getKeyForAggregationField = function (dataObj) {
        var keys = _lodash2.default.keys(dataObj);
        return _lodash2.default.intersection(keys, ['sum', 'avg', 'min', 'max', 'count', 'unique']);
    };
    ResponseParser.dateTimeToEpoch = function (dateTime) {
        return (0, _moment2.default)(dateTime).valueOf();
    };
    ResponseParser.parseMetricNames = function (result) {
        var keys = _lodash2.default.keys(result.data.metrics);
        return ResponseParser.toTextValueList(keys);
    };
    ResponseParser.prototype.parseMetadata = function (metricName) {
        var metric = this.results.data.metrics[metricName];
        if (!metric) {
            throw Error("No data found for metric: " + metricName);
        }
        return {
            primaryAggType: metric.defaultAggregation,
            supportedAggTypes: metric.supportedAggregations,
            supportedGroupBy: metric.supportedGroupBy.all
        };
    };
    ResponseParser.prototype.parseGroupBys = function () {
        return ResponseParser.toTextValueList(this.results.supportedGroupBy);
    };
    ResponseParser.toTextValueList = function (values) {
        var list = [];
        for (var i = 0; i < values.length; i++) {
            list.push({
                text: values[i],
                value: values[i]
            });
        }
        return list;
    };
    return ResponseParser;
}();
exports.default = ResponseParser;

/***/ }),

/***/ "./azure_monitor/azure_monitor_datasource.ts":
/*!***************************************************!*\
  !*** ./azure_monitor/azure_monitor_datasource.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _azure_monitor_filter_builder = __webpack_require__(/*! ./azure_monitor_filter_builder */ "./azure_monitor/azure_monitor_filter_builder.ts");

var _azure_monitor_filter_builder2 = _interopRequireDefault(_azure_monitor_filter_builder);

var _url_builder = __webpack_require__(/*! ./url_builder */ "./azure_monitor/url_builder.ts");

var _url_builder2 = _interopRequireDefault(_url_builder);

var _response_parser = __webpack_require__(/*! ./response_parser */ "./azure_monitor/response_parser.ts");

var _response_parser2 = _interopRequireDefault(_response_parser);

var _supported_namespaces = __webpack_require__(/*! ./supported_namespaces */ "./azure_monitor/supported_namespaces.ts");

var _supported_namespaces2 = _interopRequireDefault(_supported_namespaces);

var _time_grain_converter = __webpack_require__(/*! ../time_grain_converter */ "./time_grain_converter.ts");

var _time_grain_converter2 = _interopRequireDefault(_time_grain_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AzureMonitorDatasource = /** @class */function () {
    function AzureMonitorDatasource(instanceSettings, backendSrv, templateSrv, $q) {
        this.instanceSettings = instanceSettings;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.$q = $q;
        this.apiVersion = '2018-01-01';
        this.defaultDropdownValue = 'select';
        this.supportedMetricNamespaces = [];
        this.id = instanceSettings.id;
        this.subscriptionId = instanceSettings.jsonData.subscriptionId;
        this.cloudName = instanceSettings.jsonData.cloudName || 'azuremonitor';
        this.baseUrl = "/" + this.cloudName + "/subscriptions/" + this.subscriptionId + "/resourceGroups";
        this.url = instanceSettings.url;
        this.supportedMetricNamespaces = new _supported_namespaces2.default(this.cloudName).get();
    }
    AzureMonitorDatasource.prototype.isConfigured = function () {
        return this.subscriptionId && this.subscriptionId.length > 0;
    };
    AzureMonitorDatasource.prototype.query = function (options) {
        var _this = this;
        var queries = _lodash2.default.filter(options.targets, function (item) {
            return item.hide !== true && item.azureMonitor.resourceGroup && item.azureMonitor.resourceGroup !== _this.defaultDropdownValue && item.azureMonitor.resourceName && item.azureMonitor.resourceName !== _this.defaultDropdownValue && item.azureMonitor.metricDefinition && item.azureMonitor.metricDefinition !== _this.defaultDropdownValue && item.azureMonitor.metricName && item.azureMonitor.metricName !== _this.defaultDropdownValue;
        }).map(function (target) {
            var item = target.azureMonitor;
            if (item.timeGrainUnit && item.timeGrain !== 'auto') {
                item.timeGrain = _time_grain_converter2.default.createISO8601Duration(item.timeGrain, item.timeGrainUnit);
            }
            var resourceGroup = _this.templateSrv.replace(item.resourceGroup, options.scopedVars);
            var resourceName = _this.templateSrv.replace(item.resourceName, options.scopedVars);
            var metricDefinition = _this.templateSrv.replace(item.metricDefinition, options.scopedVars);
            var timeGrain = _this.templateSrv.replace((item.timeGrain || '').toString(), options.scopedVars);
            var filterBuilder = new _azure_monitor_filter_builder2.default(item.metricName, options.range.from, options.range.to, timeGrain, options.interval);
            if (item.timeGrains) {
                filterBuilder.setAllowedTimeGrains(item.timeGrains);
            }
            if (item.aggregation) {
                filterBuilder.setAggregation(item.aggregation);
            }
            if (item.dimension && item.dimension !== 'None') {
                filterBuilder.setDimensionFilter(item.dimension, item.dimensionFilter);
            }
            var filter = _this.templateSrv.replace(filterBuilder.generateFilter(), options.scopedVars);
            var url = _url_builder2.default.buildAzureMonitorQueryUrl(_this.baseUrl, resourceGroup, metricDefinition, resourceName, _this.apiVersion, filter);
            return {
                refId: target.refId,
                intervalMs: options.intervalMs,
                maxDataPoints: options.maxDataPoints,
                datasourceId: _this.id,
                url: url,
                format: options.format,
                alias: item.alias,
                raw: false
            };
        });
        if (queries.length === 0) {
            return this.$q.when({ data: [] });
        }
        var promises = this.doQueries(queries);
        return this.$q.all(promises).then(function (results) {
            return new _response_parser2.default(results).parseQueryResult();
        });
    };
    AzureMonitorDatasource.prototype.doQueries = function (queries) {
        var _this = this;
        return _lodash2.default.map(queries, function (query) {
            return _this.doRequest(query.url).then(function (result) {
                return {
                    result: result,
                    query: query
                };
            }).catch(function (err) {
                throw {
                    error: err,
                    query: query
                };
            });
        });
    };
    AzureMonitorDatasource.prototype.annotationQuery = function (options) {};
    AzureMonitorDatasource.prototype.metricFindQuery = function (query) {
        console.log(query);
        var resourceGroupsQuery = query.match(/^ResourceGroups\(\)/i);
        if (resourceGroupsQuery) {
            return this.getResourceGroups();
        }
        var metricDefinitionsQuery = query.match(/^Namespaces\(([^\)]+?)(,\s?([^,]+?))?\)/i);
        if (metricDefinitionsQuery) {
            return this.getMetricDefinitions(this.toVariable(metricDefinitionsQuery[1]));
        }
        var resourceNamesQuery = query.match(/^ResourceNames\(([^,]+?),\s?([^,]+?)\)/i);
        if (resourceNamesQuery) {
            var resourceGroup = this.toVariable(resourceNamesQuery[1]);
            var metricDefinition = this.toVariable(resourceNamesQuery[2]);
            return this.getResourceNames(resourceGroup, metricDefinition);
        }
        var metricNamesQuery = query.match(/^MetricNames\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/i);
        if (metricNamesQuery) {
            var resourceGroup = this.toVariable(metricNamesQuery[1]);
            var metricDefinition = this.toVariable(metricNamesQuery[2]);
            var resourceName = this.toVariable(metricNamesQuery[3]);
            return this.getMetricNames(resourceGroup, metricDefinition, resourceName);
        }
        return Promise.resolve([]);
    };
    AzureMonitorDatasource.prototype.toVariable = function (metric) {
        return this.templateSrv.replace((metric || '').trim());
    };
    AzureMonitorDatasource.prototype.getResourceGroups = function () {
        var url = this.baseUrl + "?api-version=2018-01-01";
        return this.doRequest(url).then(function (result) {
            return _response_parser2.default.parseResponseValues(result, 'name', 'name');
        });
    };
    AzureMonitorDatasource.prototype.getMetricDefinitions = function (resourceGroup) {
        var _this = this;
        var url = this.baseUrl + "/" + resourceGroup + "/resources?api-version=2018-01-01";
        return this.doRequest(url).then(function (result) {
            return _response_parser2.default.parseResponseValues(result, 'type', 'type');
        }).then(function (result) {
            return _lodash2.default.filter(result, function (t) {
                for (var i = 0; i < _this.supportedMetricNamespaces.length; i++) {
                    if (_lodash2.default.startsWith(t.value.toLowerCase(), _this.supportedMetricNamespaces[i].toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
        }).then(function (result) {
            var shouldHardcodeBlobStorage = false;
            for (var i = 0; i < result.length; i++) {
                if (result[i].value === 'Microsoft.Storage/storageAccounts') {
                    shouldHardcodeBlobStorage = true;
                    break;
                }
            }
            if (shouldHardcodeBlobStorage) {
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/blobServices',
                    value: 'Microsoft.Storage/storageAccounts/blobServices'
                });
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/fileServices',
                    value: 'Microsoft.Storage/storageAccounts/fileServices'
                });
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/tableServices',
                    value: 'Microsoft.Storage/storageAccounts/tableServices'
                });
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/queueServices',
                    value: 'Microsoft.Storage/storageAccounts/queueServices'
                });
            }
            return result;
        });
    };
    AzureMonitorDatasource.prototype.getResourceNames = function (resourceGroup, metricDefinition) {
        var url = this.baseUrl + "/" + resourceGroup + "/resources?api-version=2018-01-01";
        return this.doRequest(url).then(function (result) {
            if (!_lodash2.default.startsWith(metricDefinition, 'Microsoft.Storage/storageAccounts/')) {
                return _response_parser2.default.parseResourceNames(result, metricDefinition);
            }
            var list = _response_parser2.default.parseResourceNames(result, 'Microsoft.Storage/storageAccounts');
            for (var i = 0; i < list.length; i++) {
                list[i].text += '/default';
                list[i].value += '/default';
            }
            return list;
        });
    };
    AzureMonitorDatasource.prototype.getMetricNames = function (resourceGroup, metricDefinition, resourceName) {
        var url = _url_builder2.default.buildAzureMonitorGetMetricNamesUrl(this.baseUrl, resourceGroup, metricDefinition, resourceName, this.apiVersion);
        return this.doRequest(url).then(function (result) {
            return _response_parser2.default.parseResponseValues(result, 'name.localizedValue', 'name.value');
        });
    };
    AzureMonitorDatasource.prototype.getMetricMetadata = function (resourceGroup, metricDefinition, resourceName, metricName) {
        var url = _url_builder2.default.buildAzureMonitorGetMetricNamesUrl(this.baseUrl, resourceGroup, metricDefinition, resourceName, this.apiVersion);
        return this.doRequest(url).then(function (result) {
            return _response_parser2.default.parseMetadata(result, metricName);
        });
    };
    AzureMonitorDatasource.prototype.testDatasource = function () {
        if (!this.isValidConfigField(this.instanceSettings.jsonData.tenantId)) {
            return {
                status: 'error',
                message: 'The Tenant Id field is required.'
            };
        }
        if (!this.isValidConfigField(this.instanceSettings.jsonData.clientId)) {
            return {
                status: 'error',
                message: 'The Client Id field is required.'
            };
        }
        var url = this.baseUrl + "?api-version=2018-01-01";
        return this.doRequest(url).then(function (response) {
            if (response.status === 200) {
                return {
                    status: 'success',
                    message: 'Successfully queried the Azure Monitor service.',
                    title: 'Success'
                };
            }
            return {
                status: 'error',
                message: 'Returned http status code ' + response.status
            };
        }).catch(function (error) {
            var message = 'Azure Monitor: ';
            message += error.statusText ? error.statusText + ': ' : '';
            if (error.data && error.data.error && error.data.error.code) {
                message += error.data.error.code + '. ' + error.data.error.message;
            } else if (error.data && error.data.error) {
                message += error.data.error;
            } else if (error.data) {
                message += error.data;
            } else {
                message += 'Cannot connect to Azure Monitor REST API.';
            }
            return {
                status: 'error',
                message: message
            };
        });
    };
    AzureMonitorDatasource.prototype.isValidConfigField = function (field) {
        return field && field.length > 0;
    };
    AzureMonitorDatasource.prototype.doRequest = function (url, maxRetries) {
        var _this = this;
        if (maxRetries === void 0) {
            maxRetries = 1;
        }
        return this.backendSrv.datasourceRequest({
            url: this.url + url,
            method: 'GET'
        }).catch(function (error) {
            if (maxRetries > 0) {
                return _this.doRequest(url, maxRetries - 1);
            }
            throw error;
        });
    };
    return AzureMonitorDatasource;
}();
exports.default = AzureMonitorDatasource;

/***/ }),

/***/ "./azure_monitor/azure_monitor_filter_builder.ts":
/*!*******************************************************!*\
  !*** ./azure_monitor/azure_monitor_filter_builder.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _time_grain_converter = __webpack_require__(/*! ../time_grain_converter */ "./time_grain_converter.ts");

var _time_grain_converter2 = _interopRequireDefault(_time_grain_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AzureMonitorFilterBuilder = /** @class */function () {
    function AzureMonitorFilterBuilder(metricName, from, to, timeGrain, grafanaInterval) {
        this.metricName = metricName;
        this.from = from;
        this.to = to;
        this.timeGrain = timeGrain;
        this.grafanaInterval = grafanaInterval;
        this.timeGrainInterval = '';
        this.allowedTimeGrains = ['1m', '5m', '15m', '30m', '1h', '6h', '12h', '1d'];
    }
    AzureMonitorFilterBuilder.prototype.setAllowedTimeGrains = function (timeGrains) {
        var _this = this;
        this.allowedTimeGrains = [];
        timeGrains.forEach(function (tg) {
            if (tg.value === 'auto') {
                _this.allowedTimeGrains.push(tg.value);
            } else {
                _this.allowedTimeGrains.push(_time_grain_converter2.default.createKbnUnitFromISO8601Duration(tg.value));
            }
        });
    };
    AzureMonitorFilterBuilder.prototype.setAggregation = function (agg) {
        this.aggregation = agg;
    };
    AzureMonitorFilterBuilder.prototype.setDimensionFilter = function (dimension, dimensionFilter) {
        this.dimension = dimension;
        this.dimensionFilter = dimensionFilter;
    };
    AzureMonitorFilterBuilder.prototype.generateFilter = function () {
        var filter = this.createDatetimeAndTimeGrainConditions();
        if (this.aggregation) {
            filter += "&aggregation=" + this.aggregation;
        }
        if (this.metricName && this.metricName.trim().length > 0) {
            filter += "&metricnames=" + this.metricName;
        }
        if (this.dimension && this.dimensionFilter && this.dimensionFilter.trim().length > 0) {
            filter += "&$filter=" + this.dimension + " eq '" + this.dimensionFilter + "'";
        }
        return filter;
    };
    AzureMonitorFilterBuilder.prototype.createDatetimeAndTimeGrainConditions = function () {
        var dateTimeCondition = "timespan=" + this.from.utc().format() + "/" + this.to.utc().format();
        if (this.timeGrain === 'auto') {
            this.timeGrain = this.calculateAutoTimeGrain();
        }
        var timeGrainCondition = "&interval=" + this.timeGrain;
        return dateTimeCondition + timeGrainCondition;
    };
    AzureMonitorFilterBuilder.prototype.calculateAutoTimeGrain = function () {
        var roundedInterval = _time_grain_converter2.default.findClosestTimeGrain(this.grafanaInterval, this.allowedTimeGrains);
        return _time_grain_converter2.default.createISO8601DurationFromInterval(roundedInterval);
    };
    return AzureMonitorFilterBuilder;
}();
exports.default = AzureMonitorFilterBuilder;

/***/ }),

/***/ "./azure_monitor/response_parser.ts":
/*!******************************************!*\
  !*** ./azure_monitor/response_parser.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _time_grain_converter = __webpack_require__(/*! ../time_grain_converter */ "./time_grain_converter.ts");

var _time_grain_converter2 = _interopRequireDefault(_time_grain_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponseParser = /** @class */function () {
    function ResponseParser(results) {
        this.results = results;
    }
    ResponseParser.prototype.parseQueryResult = function () {
        var data = [];
        for (var i = 0; i < this.results.length; i++) {
            for (var j = 0; j < this.results[i].result.data.value.length; j++) {
                for (var k = 0; k < this.results[i].result.data.value[j].timeseries.length; k++) {
                    var alias = this.results[i].query.alias;
                    data.push({
                        target: ResponseParser.createTarget(this.results[i].result.data.value[j], this.results[i].result.data.value[j].timeseries[k].metadatavalues, alias),
                        datapoints: ResponseParser.convertDataToPoints(this.results[i].result.data.value[j].timeseries[k].data)
                    });
                }
            }
        }
        return data;
    };
    ResponseParser.createTarget = function (data, metadatavalues, alias) {
        var resourceGroup = ResponseParser.parseResourceGroupFromId(data.id);
        var resourceName = ResponseParser.parseResourceNameFromId(data.id);
        var namespace = ResponseParser.parseNamespaceFromId(data.id, resourceName);
        if (alias) {
            var regex = /\{\{([\s\S]+?)\}\}/g;
            return alias.replace(regex, function (match, g1, g2) {
                var group = g1 || g2;
                if (group === 'resourcegroup') {
                    return resourceGroup;
                } else if (group === 'namespace') {
                    return namespace;
                } else if (group === 'resourcename') {
                    return resourceName;
                } else if (group === 'metric') {
                    return data.name.value;
                } else if (group === 'dimensionname') {
                    return metadatavalues && metadatavalues.length > 0 ? metadatavalues[0].name.value : '';
                } else if (group === 'dimensionvalue') {
                    return metadatavalues && metadatavalues.length > 0 ? metadatavalues[0].value : '';
                }
                return match;
            });
        }
        if (metadatavalues && metadatavalues.length > 0) {
            return resourceName + "{" + metadatavalues[0].name.value + "=" + metadatavalues[0].value + "}." + data.name.value;
        }
        return resourceName + "." + data.name.value;
    };
    ResponseParser.parseResourceGroupFromId = function (id) {
        var startIndex = id.indexOf('/resourceGroups/') + 16;
        var endIndex = id.indexOf('/providers');
        return id.substring(startIndex, endIndex);
    };
    ResponseParser.parseNamespaceFromId = function (id, resourceName) {
        var startIndex = id.indexOf('/providers/') + 11;
        var endIndex = id.indexOf('/' + resourceName);
        return id.substring(startIndex, endIndex);
    };
    ResponseParser.parseResourceNameFromId = function (id) {
        var endIndex = id.lastIndexOf('/providers');
        var startIndex = id.slice(0, endIndex).lastIndexOf('/') + 1;
        return id.substring(startIndex, endIndex);
    };
    ResponseParser.convertDataToPoints = function (timeSeriesData) {
        var dataPoints = [];
        for (var k = 0; k < timeSeriesData.length; k++) {
            var epoch = ResponseParser.dateTimeToEpoch(timeSeriesData[k].timeStamp);
            var aggKey = ResponseParser.getKeyForAggregationField(timeSeriesData[k]);
            if (aggKey) {
                dataPoints.push([timeSeriesData[k][aggKey], epoch]);
            }
        }
        return dataPoints;
    };
    ResponseParser.dateTimeToEpoch = function (dateTime) {
        return (0, _moment2.default)(dateTime).valueOf();
    };
    ResponseParser.getKeyForAggregationField = function (dataObj) {
        var keys = _lodash2.default.keys(dataObj);
        if (keys.length < 2) {
            return;
        }
        return _lodash2.default.intersection(keys, ['total', 'average', 'maximum', 'minimum', 'count']);
    };
    ResponseParser.parseResponseValues = function (result, textFieldName, valueFieldName) {
        var list = [];
        for (var i = 0; i < result.data.value.length; i++) {
            if (!_lodash2.default.find(list, ['value', _lodash2.default.get(result.data.value[i], valueFieldName)])) {
                list.push({
                    text: _lodash2.default.get(result.data.value[i], textFieldName),
                    value: _lodash2.default.get(result.data.value[i], valueFieldName)
                });
            }
        }
        return list;
    };
    ResponseParser.parseResourceNames = function (result, metricDefinition) {
        var list = [];
        for (var i = 0; i < result.data.value.length; i++) {
            if (result.data.value[i].type === metricDefinition) {
                list.push({
                    text: result.data.value[i].name,
                    value: result.data.value[i].name
                });
            }
        }
        return list;
    };
    ResponseParser.parseMetadata = function (result, metricName) {
        var metricData = _lodash2.default.find(result.data.value, function (o) {
            return _lodash2.default.get(o, 'name.value') === metricName;
        });
        var defaultAggTypes = ['None', 'Average', 'Minimum', 'Maximum', 'Total', 'Count'];
        return {
            primaryAggType: metricData.primaryAggregationType,
            supportedAggTypes: metricData.supportedAggregationTypes || defaultAggTypes,
            supportedTimeGrains: ResponseParser.parseTimeGrains(metricData.metricAvailabilities || []),
            dimensions: ResponseParser.parseDimensions(metricData)
        };
    };
    ResponseParser.parseTimeGrains = function (metricAvailabilities) {
        var timeGrains = [];
        metricAvailabilities.forEach(function (avail) {
            if (avail.timeGrain) {
                timeGrains.push({
                    text: _time_grain_converter2.default.createTimeGrainFromISO8601Duration(avail.timeGrain),
                    value: avail.timeGrain
                });
            }
        });
        return timeGrains;
    };
    ResponseParser.parseDimensions = function (metricData) {
        var dimensions = [];
        if (!metricData.dimensions || metricData.dimensions.length === 0) {
            return dimensions;
        }
        if (!metricData.isDimensionRequired) {
            dimensions.push({ text: 'None', value: 'None' });
        }
        for (var i = 0; i < metricData.dimensions.length; i++) {
            dimensions.push({
                text: metricData.dimensions[i].localizedValue,
                value: metricData.dimensions[i].value
            });
        }
        return dimensions;
    };
    return ResponseParser;
}();
exports.default = ResponseParser;

/***/ }),

/***/ "./azure_monitor/supported_namespaces.ts":
/*!***********************************************!*\
  !*** ./azure_monitor/supported_namespaces.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var SupportedNamespaces = /** @class */function () {
    function SupportedNamespaces(cloudName) {
        this.cloudName = cloudName;
        this.supportedMetricNamespaces = {
            'azuremonitor': ['Microsoft.Compute', 'Microsoft.ClassicCompute', 'Microsoft.Storage', 'Microsoft.Sql', 'Microsoft.Web', 'Microsoft.EventHub', 'Microsoft.ServiceBus', 'Microsoft.Devices', 'Microsoft.DocumentDb', 'Microsoft.Network', 'Microsoft.Cache/Redis', 'Microsoft.AnalysisServices/servers', 'Microsoft.ApiManagement/service', 'Microsoft.Automation/automationAccounts', 'Microsoft.Batch/batchAccounts', 'Microsoft.CognitiveServices/accounts', 'Microsoft.CustomerInsights/hubs', 'Microsoft.DataLakeAnalytics/accounts', 'Microsoft.DataLakeStore/accounts', 'Microsoft.DBforMySQL/servers', 'Microsoft.DBforPostgreSQL/servers', 'Microsoft.Logic/workflows', 'Microsoft.NotificationHubs/Namespaces/NotificationHubs', 'Microsoft.Search/searchServices', 'Microsoft.StreamAnalytics/streamingjobs', 'Microsoft.DataFactory/datafactories', 'Microsoft.DataFactory/factories', 'Microsoft.KeyVaults/vaults', 'Microsoft.LocationBasedServices/accounts', 'Microsoft.PowerBIDedicated/capacities', 'Microsoft.Relay/namespaces'],
            'govazuremonitor': ['Microsoft.AnalysisServices/Servers', 'Microsoft.ApiManagement/service', 'Microsoft.Compute/virtualMachines', 'Microsoft.Compute/virtualMachineScaleSets', 'Microsoft.Compute/virtualMachineScaleSets/virtualMachines', 'Microsoft.Devices/IotHubs', 'Microsoft.Devices/provisioningServices', 'Microsoft.Devices/ElasticPools', 'Microsoft.Devices/ElasticPools/IotHubtTenants', 'Microsoft.EventHubs/namespaces', 'Microsoft.Insights/AutoscaleSettings', 'Microsoft.KeyVault/vaults', 'Microsoft.Network/loadBalancers', 'Microsoft.Network/publicIPAdresses', 'Microsoft.Network/applicationGateways', 'Microsoft.Network/virtualNetworkGateways', 'Microsoft.Network/expressRouteCircuits', 'Microsoft.Network/trafficManagerProfiles', 'Microsoft.NotificationHubs/Namespaces/NotificationHubs', 'Microsoft.PowerBiDedicated/capacities', 'Microsoft.ServiceBus/namespaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Sql/servers/elasticPools', 'Microsoft.Sql/servers', 'Microsoft.Web/serverfarms', 'Microsoft.Web/sites', 'Microsoft.Web/sites/slots', 'Microsoft.Web/hostingEnvironments/multiRolePools', 'Microsoft.Web/hostingEnvironments/workerPools'],
            'germanyazuremonitor': ['Microsoft.AnalysisServices/Servers', 'Microsoft.Compute/virtualMachines', 'Microsoft.Compute/virtualMachineScaleSets', 'Microsoft.Compute/virtualMachineScaleSets/virtualMachines', 'Microsoft.Devices/IotHubs', 'Microsoft.Devices/provisioningServices', 'Microsoft.Devices/ElasticPools', 'Microsoft.Devices/ElasticPools/IotHubtTenants', 'Microsoft.EventHubs/namespaces', 'Microsoft.Insights/AutoscaleSettings', 'Microsoft.KeyVault/vaults', 'Microsoft.Network/loadBalancers', 'Microsoft.Network/publicIPAdresses', 'Microsoft.Network/applicationGateways', 'Microsoft.Network/virtualNetworkGateways', 'Microsoft.Network/expressRouteCircuits', 'Microsoft.Network/trafficManagerProfiles', 'Microsoft.NotificationHubs/Namespaces/NotificationHubs', 'Microsoft.ServiceBus/namespaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Sql/servers/elasticPools', 'Microsoft.Sql/servers', 'Microsoft.Web/serverfarms', 'Microsoft.Web/sites', 'Microsoft.Web/sites/slots', 'Microsoft.Web/hostingEnvironments/multiRolePools', 'Microsoft.Web/hostingEnvironments/workerPools'],
            'chinaazuremonitor': ['Microsoft.AnalysisServices/Servers', 'Microsoft.ApiManagement/service', 'Microsoft.Compute/virtualMachines', 'Microsoft.Compute/virtualMachineScaleSets', 'Microsoft.Compute/virtualMachineScaleSets/virtualMachines', 'Microsoft.Devices/IotHubs', 'Microsoft.Devices/provisioningServices', 'Microsoft.Devices/ElasticPools', 'Microsoft.Devices/ElasticPools/IotHubtTenants', 'Microsoft.EventHubs/namespaces', 'Microsoft.Insights/AutoscaleSettings', 'Microsoft.KeyVault/vaults', 'Microsoft.Network/loadBalancers', 'Microsoft.Network/publicIPAdresses', 'Microsoft.Network/applicationGateways', 'Microsoft.Network/virtualNetworkGateways', 'Microsoft.Network/expressRouteCircuits', 'Microsoft.Network/trafficManagerProfiles', 'Microsoft.NotificationHubs/Namespaces/NotificationHubs', 'Microsoft.ServiceBus/namespaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Sql/servers/elasticPools', 'Microsoft.Sql/servers', 'Microsoft.Web/serverfarms', 'Microsoft.Web/sites', 'Microsoft.Web/sites/slots', 'Microsoft.Web/hostingEnvironments/multiRolePools', 'Microsoft.Web/hostingEnvironments/workerPools']
        };
    }
    SupportedNamespaces.prototype.get = function () {
        return this.supportedMetricNamespaces[this.cloudName];
    };
    return SupportedNamespaces;
}();
exports.default = SupportedNamespaces;

/***/ }),

/***/ "./azure_monitor/url_builder.ts":
/*!**************************************!*\
  !*** ./azure_monitor/url_builder.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UrlBuilder = /** @class */function () {
    function UrlBuilder() {}
    UrlBuilder.buildAzureMonitorQueryUrl = function (baseUrl, resourceGroup, metricDefinition, resourceName, apiVersion, filter) {
        if (_lodash2.default.startsWith(metricDefinition, 'Microsoft.Storage/storageAccounts/') || metricDefinition === 'Microsoft.Sql/servers/databases') {
            var rn = resourceName.split('/');
            var service = metricDefinition.substring(metricDefinition.lastIndexOf('/') + 1);
            var md = metricDefinition.substring(0, metricDefinition.lastIndexOf('/'));
            return baseUrl + "/" + resourceGroup + "/providers/" + md + "/" + rn[0] + "/" + service + "/" + rn[1] + ("/providers/microsoft.insights/metrics?api-version=" + apiVersion + "&" + filter);
        }
        return baseUrl + "/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName + ("/providers/microsoft.insights/metrics?api-version=" + apiVersion + "&" + filter);
    };
    UrlBuilder.buildAzureMonitorGetMetricNamesUrl = function (baseUrl, resourceGroup, metricDefinition, resourceName, apiVersion) {
        if (_lodash2.default.startsWith(metricDefinition, 'Microsoft.Storage/storageAccounts/') || metricDefinition === 'Microsoft.Sql/servers/databases') {
            var rn = resourceName.split('/');
            var service = metricDefinition.substring(metricDefinition.lastIndexOf('/') + 1);
            var md = metricDefinition.substring(0, metricDefinition.lastIndexOf('/'));
            return baseUrl + "/" + resourceGroup + "/providers/" + md + "/" + rn[0] + "/" + service + "/" + rn[1] + ("/providers/microsoft.insights/metricdefinitions?api-version=" + apiVersion);
        }
        return baseUrl + "/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName + ("/providers/microsoft.insights/metricdefinitions?api-version=" + apiVersion);
    };
    return UrlBuilder;
}();
exports.default = UrlBuilder;

/***/ }),

/***/ "./config_ctrl.ts":
/*!************************!*\
  !*** ./config_ctrl.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var AzureMonitorConfigCtrl = /** @class */function () {
    function AzureMonitorConfigCtrl($scope) {
        this.current.jsonData.cloudName = this.current.jsonData.cloudName || 'azuremonitor';
    }
    AzureMonitorConfigCtrl.templateUrl = 'partials/config.html';
    return AzureMonitorConfigCtrl;
}();
exports.AzureMonitorConfigCtrl = AzureMonitorConfigCtrl;

/***/ }),

/***/ "./css/query_editor.css":
/*!******************************!*\
  !*** ./css/query_editor.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--5-1!./query_editor.css */ "../node_modules/css-loader/index.js??ref--5-1!./css/query_editor.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _azure_monitor_datasource = __webpack_require__(/*! ./azure_monitor/azure_monitor_datasource */ "./azure_monitor/azure_monitor_datasource.ts");

var _azure_monitor_datasource2 = _interopRequireDefault(_azure_monitor_datasource);

var _app_insights_datasource = __webpack_require__(/*! ./app_insights/app_insights_datasource */ "./app_insights/app_insights_datasource.ts");

var _app_insights_datasource2 = _interopRequireDefault(_app_insights_datasource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Datasource = /** @class */function () {
    /** @ngInject */
    function Datasource(instanceSettings, backendSrv, templateSrv, $q) {
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.$q = $q;
        this.name = instanceSettings.name;
        this.id = instanceSettings.id;
        this.azureMonitorDatasource = new _azure_monitor_datasource2.default(instanceSettings, this.backendSrv, this.templateSrv, this.$q);
        this.appInsightsDatasource = new _app_insights_datasource2.default(instanceSettings, this.backendSrv, this.templateSrv, this.$q);
    }
    Datasource.prototype.query = function (options) {
        var promises = [];
        var azureMonitorOptions = _lodash2.default.cloneDeep(options);
        var appInsightsTargets = _lodash2.default.cloneDeep(options);
        var that = this;
        azureMonitorOptions.targets = _lodash2.default.filter(azureMonitorOptions.targets, ['queryType', 'Azure Monitor']);
        appInsightsTargets.targets = _lodash2.default.filter(appInsightsTargets.targets, ['queryType', 'Application Insights']);
        if (azureMonitorOptions.targets.length > 0) {
            promises.push(this.azureMonitorDatasource.query(azureMonitorOptions));
        }
        if (appInsightsTargets.targets.length > 0) {
            promises.push(this.appInsightsDatasource.query(appInsightsTargets));
        }
        return Promise.all(promises).then(function (results) {
            if (results[0].data) {
                that.columns = results[0].columns;
                return { data: _lodash2.default.flatten(results[0].data) };
            } else {
                return { data: _lodash2.default.flatten(results) };
            }
        });
    };
    Datasource.prototype.annotationQuery = function (options) {
        throw new Error('Annotation Support not implemented yet.');
    };
    Datasource.prototype.metricFindQuery = function (query) {
        if (!query) {
            return Promise.resolve([]);
        }
        var aiResult = this.appInsightsDatasource.metricFindQuery(query);
        if (aiResult) {
            return aiResult;
        }
        var amResult = this.azureMonitorDatasource.metricFindQuery(query);
        if (amResult) {
            return amResult;
        }
        return Promise.resolve([]);
    };
    Datasource.prototype.testDatasource = function () {
        var promises = [];
        if (this.azureMonitorDatasource.isConfigured()) {
            promises.push(this.azureMonitorDatasource.testDatasource());
        }
        if (this.appInsightsDatasource.isConfigured()) {
            promises.push(this.appInsightsDatasource.testDatasource());
        }
        if (promises.length === 0) {
            return {
                status: 'error',
                message: "Nothing configured. At least one of the API's must be configured.",
                title: 'Error'
            };
        }
        return this.$q.all(promises).then(function (results) {
            var status = 'success';
            var message = '';
            for (var i = 0; i < results.length; i++) {
                if (results[i].status !== 'success') {
                    status = results[i].status;
                }
                message += i + 1 + ". " + results[i].message + " ";
            }
            return {
                status: status,
                message: message,
                title: _lodash2.default.upperFirst(status)
            };
        });
    };
    /* Azure Monitor REST API methods */
    Datasource.prototype.getResourceGroups = function () {
        return this.azureMonitorDatasource.getResourceGroups();
    };
    Datasource.prototype.getMetricDefinitions = function (resourceGroup) {
        return this.azureMonitorDatasource.getMetricDefinitions(resourceGroup);
    };
    Datasource.prototype.getResourceNames = function (resourceGroup, metricDefinition) {
        return this.azureMonitorDatasource.getResourceNames(resourceGroup, metricDefinition);
    };
    Datasource.prototype.getMetricNames = function (resourceGroup, metricDefinition, resourceName) {
        return this.azureMonitorDatasource.getMetricNames(resourceGroup, metricDefinition, resourceName);
    };
    Datasource.prototype.getMetricMetadata = function (resourceGroup, metricDefinition, resourceName, metricName) {
        return this.azureMonitorDatasource.getMetricMetadata(resourceGroup, metricDefinition, resourceName, metricName);
    };
    /* Application Insights API method */
    Datasource.prototype.getAppInsightsMetricNames = function () {
        return this.appInsightsDatasource.getMetricNames();
    };
    Datasource.prototype.getAppInsightsMetricMetadata = function (metricName) {
        return this.appInsightsDatasource.getMetricMetadata(metricName);
    };
    Datasource.prototype.getAppInsightsColumns = function () {
        return this.columns;
    };
    return Datasource;
}();
exports.default = Datasource;

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnnotationsQueryCtrl = exports.QueryOptionsCtrl = exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _datasource = __webpack_require__(/*! ./datasource */ "./datasource.ts");

var _datasource2 = _interopRequireDefault(_datasource);

var _query_ctrl = __webpack_require__(/*! ./query_ctrl */ "./query_ctrl.ts");

var _config_ctrl = __webpack_require__(/*! ./config_ctrl */ "./config_ctrl.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AzureMonitorQueryOptionsCtrl = /** @class */function () {
    function AzureMonitorQueryOptionsCtrl() {}
    AzureMonitorQueryOptionsCtrl.templateUrl = 'partials/query.options.html';
    return AzureMonitorQueryOptionsCtrl;
}();
var AzureMonitorAnnotationsQueryCtrl = /** @class */function () {
    function AzureMonitorAnnotationsQueryCtrl() {}
    AzureMonitorAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return AzureMonitorAnnotationsQueryCtrl;
}();
exports.Datasource = _datasource2.default;
exports.QueryCtrl = _query_ctrl.AzureMonitorQueryCtrl;
exports.ConfigCtrl = _config_ctrl.AzureMonitorConfigCtrl;
exports.QueryOptionsCtrl = AzureMonitorQueryOptionsCtrl;
exports.AnnotationsQueryCtrl = AzureMonitorAnnotationsQueryCtrl;

/***/ }),

/***/ "./query_ctrl.ts":
/*!***********************!*\
  !*** ./query_ctrl.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AzureMonitorQueryCtrl = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _sdk = __webpack_require__(/*! app/plugins/sdk */ "app/plugins/sdk");

__webpack_require__(/*! ./css/query_editor.css */ "./css/query_editor.css");

var _time_grain_converter = __webpack_require__(/*! ./time_grain_converter */ "./time_grain_converter.ts");

var _time_grain_converter2 = _interopRequireDefault(_time_grain_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

// import * as monaco from 'monaco-editor';
var AzureMonitorQueryCtrl = /** @class */function (_super) {
    __extends(AzureMonitorQueryCtrl, _super);
    /** @ngInject **/
    function AzureMonitorQueryCtrl($scope, $injector, templateSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.templateSrv = templateSrv;
        _this.defaultDropdownValue = 'select';
        _this.defaults = {
            queryType: 'Azure Monitor',
            azureMonitor: {
                resourceGroup: _this.defaultDropdownValue,
                metricDefinition: _this.defaultDropdownValue,
                resourceName: _this.defaultDropdownValue,
                metricName: _this.defaultDropdownValue,
                dimensionFilter: '*',
                timeGrain: 'auto'
            },
            appInsights: {
                metricName: _this.defaultDropdownValue,
                rawQuery: false,
                rawQueryString: '',
                groupBy: 'none',
                timeGrainType: 'auto',
                xaxis: 'timestamp',
                yaxis: '',
                spliton: ''
            }
        };
        _lodash2.default.defaultsDeep(_this.target, _this.defaults);
        _this.migrateTimeGrains();
        _this.panelCtrl.events.on('data-received', _this.onDataReceived.bind(_this), $scope);
        _this.panelCtrl.events.on('data-error', _this.onDataError.bind(_this), $scope);
        return _this;
        // monaco.editor.create(document.getElementById('container'), {
        //   value: [
        //     'function x() {',
        //     '\tconsole.log("Hello world!");',
        //     '}'
        //   ].join('\n'),
        //   language: 'javascript'
        // });
    }
    AzureMonitorQueryCtrl.prototype.onDataReceived = function (dataList) {
        this.lastQueryError = undefined;
    };
    AzureMonitorQueryCtrl.prototype.onDataError = function (err) {
        this.handleQueryCtrlError(err);
    };
    AzureMonitorQueryCtrl.prototype.handleQueryCtrlError = function (err) {
        if (err.query && err.query.refId && err.query.refId !== this.target.refId) {
            return;
        }
        if (err.error && err.error.data && err.error.data.error) {
            this.lastQueryError = err.error.data.error.message;
        } else if (err.error && err.error.data) {
            this.lastQueryError = err.error.data.message;
        } else if (err.data && err.data.error) {
            this.lastQueryError = err.data.error.message;
        } else if (err.data && err.data.message) {
            this.lastQueryError = err.data.message;
        } else {
            this.lastQueryError = err;
        }
    };
    AzureMonitorQueryCtrl.prototype.migrateTimeGrains = function () {
        if (this.target.azureMonitor.timeGrainUnit) {
            if (this.target.azureMonitor.timeGrain !== 'auto') {
                this.target.azureMonitor.timeGrain = _time_grain_converter2.default.createISO8601Duration(this.target.azureMonitor.timeGrain, this.target.azureMonitor.timeGrainUnit);
            }
            delete this.target.azureMonitor.timeGrainUnit;
            this.onMetricNameChange();
        }
    };
    AzureMonitorQueryCtrl.prototype.replace = function (variable) {
        return this.templateSrv.replace(variable, this.panelCtrl.panel.scopedVars);
    };
    /* Azure Monitor Section */
    AzureMonitorQueryCtrl.prototype.getResourceGroups = function (query) {
        if (this.target.queryType !== 'Azure Monitor' || !this.datasource.azureMonitorDatasource.isConfigured()) {
            return;
        }
        return this.datasource.getResourceGroups().catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getMetricDefinitions = function (query) {
        if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue) {
            return;
        }
        return this.datasource.getMetricDefinitions(this.replace(this.target.azureMonitor.resourceGroup)).catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getResourceNames = function (query) {
        if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue) {
            return;
        }
        return this.datasource.getResourceNames(this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition)).catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getMetricNames = function (query) {
        if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue || !this.target.azureMonitor.resourceName || this.target.azureMonitor.resourceName === this.defaultDropdownValue) {
            return;
        }
        return this.datasource.getMetricNames(this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName)).catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.onResourceGroupChange = function () {
        this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
        this.target.azureMonitor.resourceName = this.defaultDropdownValue;
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.dimensions = [];
        this.target.azureMonitor.dimension = '';
    };
    AzureMonitorQueryCtrl.prototype.onMetricDefinitionChange = function () {
        this.target.azureMonitor.resourceName = this.defaultDropdownValue;
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.dimensions = [];
        this.target.azureMonitor.dimension = '';
    };
    AzureMonitorQueryCtrl.prototype.onResourceNameChange = function () {
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.dimensions = [];
        this.target.azureMonitor.dimension = '';
    };
    AzureMonitorQueryCtrl.prototype.onMetricNameChange = function () {
        var _this = this;
        if (!this.target.azureMonitor.metricName || this.target.azureMonitor.metricName === this.defaultDropdownValue) {
            return;
        }
        return this.datasource.getMetricMetadata(this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName), this.replace(this.target.azureMonitor.metricName)).then(function (metadata) {
            _this.target.azureMonitor.aggOptions = metadata.supportedAggTypes || [metadata.primaryAggType];
            _this.target.azureMonitor.aggregation = metadata.primaryAggType;
            _this.target.azureMonitor.timeGrains = [{ text: 'auto', value: 'auto' }].concat(metadata.supportedTimeGrains);
            _this.target.azureMonitor.dimensions = metadata.dimensions;
            if (metadata.dimensions.length > 0) {
                _this.target.azureMonitor.dimension = metadata.dimensions[0].value;
            }
            return _this.refresh();
        }).catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getAutoInterval = function () {
        if (this.target.azureMonitor.timeGrain === 'auto') {
            return _time_grain_converter2.default.findClosestTimeGrain(this.panelCtrl.interval, _lodash2.default.map(this.target.azureMonitor.timeGrains, function (o) {
                return _time_grain_converter2.default.createKbnUnitFromISO8601Duration(o.value);
            }) || ['1m', '5m', '15m', '30m', '1h', '6h', '12h', '1d']);
        }
        return '';
    };
    /* Application Insights Section */
    AzureMonitorQueryCtrl.prototype.getAppInsightsAutoInterval = function () {
        if (this.panelCtrl.interval[this.panelCtrl.interval.length - 1] === 's') {
            return '1m';
        }
        return this.panelCtrl.interval;
    };
    AzureMonitorQueryCtrl.prototype.getAppInsightsMetricNames = function () {
        if (!this.datasource.appInsightsDatasource.isConfigured()) {
            return;
        }
        return this.datasource.getAppInsightsMetricNames().catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getAppInsightsColumns = function () {
        return this.datasource.getAppInsightsColumns();
    };
    AzureMonitorQueryCtrl.prototype.onAppInsightsColumnChange = function () {
        return this.refresh();
    };
    AzureMonitorQueryCtrl.prototype.onAppInsightsMetricNameChange = function () {
        var _this = this;
        if (!this.target.appInsights.metricName || this.target.appInsights.metricName === this.defaultDropdownValue) {
            return;
        }
        return this.datasource.getAppInsightsMetricMetadata(this.replace(this.target.appInsights.metricName)).then(function (aggData) {
            _this.target.appInsights.aggOptions = aggData.supportedAggTypes;
            _this.target.appInsights.groupByOptions = aggData.supportedGroupBy;
            _this.target.appInsights.aggregation = aggData.primaryAggType;
            return _this.refresh();
        }).catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getAppInsightsGroupBySegments = function (query) {
        return _lodash2.default.map(this.target.appInsights.groupByOptions, function (option) {
            return { text: option, value: option };
        });
    };
    AzureMonitorQueryCtrl.prototype.resetAppInsightsGroupBy = function () {
        this.target.appInsights.groupBy = 'none';
        this.refresh();
    };
    AzureMonitorQueryCtrl.prototype.updateTimeGrainType = function () {
        if (this.target.appInsights.timeGrainType === 'specific') {
            this.target.appInsights.timeGrain = '1';
            this.target.appInsights.timeGrainUnit = 'minute';
        } else {
            this.target.appInsights.timeGrain = '';
        }
        this.refresh();
    };
    AzureMonitorQueryCtrl.prototype.toggleEditorMode = function () {
        this.target.appInsights.rawQuery = !this.target.appInsights.rawQuery;
    };
    AzureMonitorQueryCtrl.templateUrl = 'partials/query.editor.html';
    return AzureMonitorQueryCtrl;
}(_sdk.QueryCtrl);
exports.AzureMonitorQueryCtrl = AzureMonitorQueryCtrl;

/***/ }),

/***/ "./time_grain_converter.ts":
/*!*********************************!*\
  !*** ./time_grain_converter.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _kbn = __webpack_require__(/*! app/core/utils/kbn */ "app/core/utils/kbn");

var _kbn2 = _interopRequireDefault(_kbn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeGrainConverter = /** @class */function () {
    function TimeGrainConverter() {}
    TimeGrainConverter.createISO8601Duration = function (timeGrain, timeGrainUnit) {
        var timeIntervals = ['hour', 'minute', 'h', 'm'];
        if (_lodash2.default.includes(timeIntervals, timeGrainUnit)) {
            return "PT" + timeGrain + timeGrainUnit[0].toUpperCase();
        }
        return "P" + timeGrain + timeGrainUnit[0].toUpperCase();
    };
    TimeGrainConverter.createISO8601DurationFromInterval = function (interval) {
        var timeGrain = +interval.slice(0, interval.length - 1);
        var unit = interval[interval.length - 1];
        if (interval.indexOf('ms') > -1) {
            return TimeGrainConverter.createISO8601Duration(1, 'm');
        }
        if (interval[interval.length - 1] === 's') {
            var toMinutes = timeGrain * 60 % 60;
            if (toMinutes < 1) {
                toMinutes = 1;
            }
            return TimeGrainConverter.createISO8601Duration(toMinutes, 'm');
        }
        return TimeGrainConverter.createISO8601Duration(timeGrain, unit);
    };
    TimeGrainConverter.findClosestTimeGrain = function (interval, allowedTimeGrains) {
        var timeGrains = _lodash2.default.filter(allowedTimeGrains, function (o) {
            return o !== 'auto';
        });
        var closest = timeGrains[0];
        var intervalMs = _kbn2.default.interval_to_ms(interval);
        for (var i = 0; i < timeGrains.length; i++) {
            // abs (num - val) < abs (num - curr):
            if (intervalMs > _kbn2.default.interval_to_ms(timeGrains[i])) {
                if (i + 1 < timeGrains.length) {
                    closest = timeGrains[i + 1];
                } else {
                    closest = timeGrains[i];
                }
            }
        }
        return closest;
    };
    TimeGrainConverter.createTimeGrainFromISO8601Duration = function (duration) {
        var offset = 1;
        if (duration.substring(0, 2) === 'PT') {
            offset = 2;
        }
        var value = duration.substring(offset, duration.length - 1);
        var unit = duration.substring(duration.length - 1);
        return value + ' ' + TimeGrainConverter.timeUnitToText(+value, unit);
    };
    TimeGrainConverter.timeUnitToText = function (value, unit) {
        var text = '';
        if (unit === 'S') {
            text = 'second';
        }
        if (unit === 'M') {
            text = 'minute';
        }
        if (unit === 'H') {
            text = 'hour';
        }
        if (unit === 'D') {
            text = 'day';
        }
        if (value > 1) {
            return text + 's';
        }
        return text;
    };
    TimeGrainConverter.createKbnUnitFromISO8601Duration = function (duration) {
        if (duration === 'auto') {
            return 'auto';
        }
        var offset = 1;
        if (duration.substring(0, 2) === 'PT') {
            offset = 2;
        }
        var value = duration.substring(offset, duration.length - 1);
        var unit = duration.substring(duration.length - 1);
        return value + TimeGrainConverter.timeUnitToKbn(+value, unit);
    };
    TimeGrainConverter.timeUnitToKbn = function (value, unit) {
        if (unit === 'S') {
            return 's';
        }
        if (unit === 'M') {
            return 'm';
        }
        if (unit === 'H') {
            return 'h';
        }
        if (unit === 'D') {
            return 'd';
        }
        return '';
    };
    return TimeGrainConverter;
}();
exports.default = TimeGrainConverter;

/***/ }),

/***/ "app/core/utils/kbn":
/*!*************************************!*\
  !*** external "app/core/utils/kbn" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_app_core_utils_kbn__;

/***/ }),

/***/ "app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_moment__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map