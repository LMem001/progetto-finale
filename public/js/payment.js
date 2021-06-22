/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/braintree-web-drop-in/dist/browser/dropin.js":
/*!*******************************************************************!*\
  !*** ./node_modules/braintree-web-drop-in/dist/browser/dropin.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=undefined;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=undefined,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStylesheet = exports.loadScript = void 0;
var loadScript = require("./load-script");
exports.loadScript = loadScript;
var loadStylesheet = require("./load-stylesheet");
exports.loadStylesheet = loadStylesheet;

},{"./load-script":3,"./load-stylesheet":4}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseGlobal = void 0;
var promise_polyfill_1 = __importDefault(require("promise-polyfill"));
var PromiseGlobal = 
// eslint-disable-next-line no-undef
typeof Promise !== "undefined" ? Promise : promise_polyfill_1.default;
exports.PromiseGlobal = PromiseGlobal;

},{"promise-polyfill":186}],3:[function(require,module,exports){
"use strict";
var promise_1 = require("./lib/promise");
var scriptPromiseCache = {};
function loadScript(options) {
    var scriptLoadPromise;
    var stringifiedOptions = JSON.stringify(options);
    if (!options.forceScriptReload) {
        scriptLoadPromise = scriptPromiseCache[stringifiedOptions];
        if (scriptLoadPromise) {
            return scriptLoadPromise;
        }
    }
    var script = document.createElement("script");
    var attrs = options.dataAttributes || {};
    var container = options.container || document.head;
    script.src = options.src;
    script.id = options.id || "";
    script.async = true;
    if (options.crossorigin) {
        script.setAttribute("crossorigin", "" + options.crossorigin);
    }
    Object.keys(attrs).forEach(function (key) {
        script.setAttribute("data-" + key, "" + attrs[key]);
    });
    scriptLoadPromise = new promise_1.PromiseGlobal(function (resolve, reject) {
        script.addEventListener("load", function () {
            resolve(script);
        });
        script.addEventListener("error", function () {
            reject(new Error(options.src + " failed to load."));
        });
        script.addEventListener("abort", function () {
            reject(new Error(options.src + " has aborted."));
        });
        container.appendChild(script);
    });
    scriptPromiseCache[stringifiedOptions] = scriptLoadPromise;
    return scriptLoadPromise;
}
loadScript.clearCache = function () {
    scriptPromiseCache = {};
};
module.exports = loadScript;

},{"./lib/promise":2}],4:[function(require,module,exports){
"use strict";
var promise_1 = require("./lib/promise");
module.exports = function loadStylesheet(options) {
    var stylesheet = document.querySelector("link[href=\"" + options.href + "\"]");
    if (stylesheet) {
        return promise_1.PromiseGlobal.resolve(stylesheet);
    }
    stylesheet = document.createElement("link");
    var container = options.container || document.head;
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.setAttribute("href", options.href);
    stylesheet.setAttribute("id", options.id);
    if (container.firstChild) {
        container.insertBefore(stylesheet, container.firstChild);
    }
    else {
        container.appendChild(stylesheet);
    }
    return promise_1.PromiseGlobal.resolve(stylesheet);
};

},{"./lib/promise":2}],5:[function(require,module,exports){
module.exports = require("./dist/load-script");

},{"./dist/load-script":3}],6:[function(require,module,exports){
"use strict";
module.exports = function isAndroid(ua) {
    ua = ua || window.navigator.userAgent;
    return /Android/.test(ua);
};

},{}],7:[function(require,module,exports){
"use strict";
module.exports = function isChromeOS(ua) {
    ua = ua || window.navigator.userAgent;
    return /CrOS/i.test(ua);
};

},{}],8:[function(require,module,exports){
"use strict";
var isEdge = require("./is-edge");
var isSamsung = require("./is-samsung");
var isDuckDuckGo = require("./is-duckduckgo");
var isOpera = require("./is-opera");
var isSilk = require("./is-silk");
module.exports = function isChrome(ua) {
    ua = ua || window.navigator.userAgent;
    return ((ua.indexOf("Chrome") !== -1 || ua.indexOf("CriOS") !== -1) &&
        !isEdge(ua) &&
        !isSamsung(ua) &&
        !isDuckDuckGo(ua) &&
        !isOpera(ua) &&
        !isSilk(ua));
};

},{"./is-duckduckgo":9,"./is-edge":10,"./is-opera":22,"./is-samsung":23,"./is-silk":24}],9:[function(require,module,exports){
"use strict";
module.exports = function isDuckDuckGo(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("DuckDuckGo/") !== -1;
};

},{}],10:[function(require,module,exports){
"use strict";
module.exports = function isEdge(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Edge/") !== -1;
};

},{}],11:[function(require,module,exports){
"use strict";
module.exports = function isFirefox(ua) {
    ua = ua || window.navigator.userAgent;
    return /Firefox/i.test(ua);
};

},{}],12:[function(require,module,exports){
"use strict";
var isIE11 = require("./is-ie11");
module.exports = function isIE(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("MSIE") !== -1 || isIE11(ua);
};

},{"./is-ie11":14}],13:[function(require,module,exports){
"use strict";
module.exports = function isIe10(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("MSIE 10") !== -1;
};

},{}],14:[function(require,module,exports){
"use strict";
module.exports = function isIe11(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Trident/7") !== -1;
};

},{}],15:[function(require,module,exports){
"use strict";
module.exports = function isIe9(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("MSIE 9") !== -1;
};

},{}],16:[function(require,module,exports){
"use strict";
module.exports = function isIosFirefox(ua) {
    ua = ua || window.navigator.userAgent;
    return /FxiOS/i.test(ua);
};

},{}],17:[function(require,module,exports){
"use strict";
var isIos = require("./is-ios");
function isGoogleSearchApp(ua) {
    return /\bGSA\b/.test(ua);
}
module.exports = function isIosGoogleSearchApp(ua) {
    ua = ua || window.navigator.userAgent;
    return isIos(ua) && isGoogleSearchApp(ua);
};

},{"./is-ios":21}],18:[function(require,module,exports){
"use strict";
var isIos = require("./is-ios");
var isIosFirefox = require("./is-ios-firefox");
var webkitRegexp = /webkit/i;
function isWebkit(ua) {
    return webkitRegexp.test(ua);
}
module.exports = function isIosSafari(ua) {
    ua = ua || window.navigator.userAgent;
    return (isIos(ua) && isWebkit(ua) && ua.indexOf("CriOS") === -1 && !isIosFirefox(ua));
};

},{"./is-ios":21,"./is-ios-firefox":16}],19:[function(require,module,exports){
"use strict";
var isIos = require("./is-ios");
var isIosGoogleSearchApp = require("./is-ios-google-search-app");
module.exports = function isIosWebview(ua) {
    ua = ua || window.navigator.userAgent;
    if (isIos(ua)) {
        // The Google Search iOS app is technically a webview and doesn't support popups.
        if (isIosGoogleSearchApp(ua)) {
            return true;
        }
        return /.+AppleWebKit(?!.*Safari)/.test(ua);
    }
    return false;
};

},{"./is-ios":21,"./is-ios-google-search-app":17}],20:[function(require,module,exports){
"use strict";
var isIosWebview = require("./is-ios-webview");
module.exports = function isIosWKWebview(ua, statusBarVisible) {
    statusBarVisible =
        typeof statusBarVisible !== "undefined"
            ? statusBarVisible
            : window.statusbar.visible;
    return isIosWebview(ua) && statusBarVisible;
};

},{"./is-ios-webview":19}],21:[function(require,module,exports){
"use strict";
module.exports = function isIos(ua) {
    ua = ua || window.navigator.userAgent;
    return /iPhone|iPod|iPad/i.test(ua);
};

},{}],22:[function(require,module,exports){
"use strict";
module.exports = function isOpera(ua) {
    ua = ua || window.navigator.userAgent;
    return (ua.indexOf("OPR/") !== -1 ||
        ua.indexOf("Opera/") !== -1 ||
        ua.indexOf("OPT/") !== -1);
};

},{}],23:[function(require,module,exports){
"use strict";
module.exports = function isSamsungBrowser(ua) {
    ua = ua || window.navigator.userAgent;
    return /SamsungBrowser/i.test(ua);
};

},{}],24:[function(require,module,exports){
"use strict";
module.exports = function isSilk(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Silk/") !== -1;
};

},{}],25:[function(require,module,exports){
"use strict";
var MINIMUM_SUPPORTED_CHROME_IOS_VERSION = 48;
var isAndroid = require("./is-android");
var isIosFirefox = require("./is-ios-firefox");
var isIosWebview = require("./is-ios-webview");
var isChrome = require("./is-chrome");
var isSamsungBrowser = require("./is-samsung");
var isDuckDuckGo = require("./is-duckduckgo");
function isUnsupportedIosChrome(ua) {
    ua = ua || window.navigator.userAgent;
    var match = ua.match(/CriOS\/(\d+)\./);
    if (!match) {
        return false;
    }
    var version = parseInt(match[1], 10);
    return version < MINIMUM_SUPPORTED_CHROME_IOS_VERSION;
}
function isOperaMini(ua) {
    ua = ua || window.navigator.userAgent;
    return ua.indexOf("Opera Mini") > -1;
}
function isAndroidWebview(ua) {
    var androidWebviewRegExp = /Version\/[\d.]+/;
    ua = ua || window.navigator.userAgent;
    if (isAndroid(ua)) {
        return (androidWebviewRegExp.test(ua) && !isOperaMini(ua) && !isDuckDuckGo(ua));
    }
    return false;
}
function isOldSamsungBrowserOrSamsungWebview(ua) {
    return !isChrome(ua) && !isSamsungBrowser(ua) && /samsung/i.test(ua);
}
module.exports = function supportsPopups(ua) {
    ua = ua || window.navigator.userAgent;
    return !(isIosWebview(ua) ||
        isIosFirefox(ua) ||
        isAndroidWebview(ua) ||
        isOperaMini(ua) ||
        isUnsupportedIosChrome(ua) ||
        isOldSamsungBrowserOrSamsungWebview(ua));
};

},{"./is-android":6,"./is-chrome":8,"./is-duckduckgo":9,"./is-ios-firefox":16,"./is-ios-webview":19,"./is-samsung":23}],26:[function(require,module,exports){
module.exports = require("./dist/is-android");

},{"./dist/is-android":6}],27:[function(require,module,exports){
module.exports = require("./dist/is-chrome-os");

},{"./dist/is-chrome-os":7}],28:[function(require,module,exports){
module.exports = require("./dist/is-chrome");

},{"./dist/is-chrome":8}],29:[function(require,module,exports){
module.exports = require("./dist/is-edge");

},{"./dist/is-edge":10}],30:[function(require,module,exports){
module.exports = require("./dist/is-firefox");

},{"./dist/is-firefox":11}],31:[function(require,module,exports){
module.exports = require("./dist/is-ie");

},{"./dist/is-ie":12}],32:[function(require,module,exports){
module.exports = require("./dist/is-ie10");

},{"./dist/is-ie10":13}],33:[function(require,module,exports){
module.exports = require("./dist/is-ie9");

},{"./dist/is-ie9":15}],34:[function(require,module,exports){
module.exports = require("./dist/is-ios-safari");

},{"./dist/is-ios-safari":18}],35:[function(require,module,exports){
module.exports = require("./dist/is-ios-webview");

},{"./dist/is-ios-webview":19}],36:[function(require,module,exports){
module.exports = require("./dist/is-ios-wkwebview");

},{"./dist/is-ios-wkwebview":20}],37:[function(require,module,exports){
module.exports = require("./dist/is-ios");

},{"./dist/is-ios":21}],38:[function(require,module,exports){
module.exports = require("./dist/supports-popups");

},{"./dist/supports-popups":25}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggle = exports.remove = exports.add = void 0;
function _classesOf(element) {
    return element.className.trim().split(/\s+/);
}
function add(element) {
    var toAdd = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        toAdd[_i - 1] = arguments[_i];
    }
    element.className = _classesOf(element)
        .filter(function (classname) { return toAdd.indexOf(classname) === -1; })
        .concat(toAdd)
        .join(" ");
}
exports.add = add;
function remove(element) {
    var toRemove = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        toRemove[_i - 1] = arguments[_i];
    }
    element.className = _classesOf(element)
        .filter(function (classname) { return toRemove.indexOf(classname) === -1; })
        .join(" ");
}
exports.remove = remove;
function toggle(element, classname, adding) {
    if (adding) {
        add(element, classname);
    }
    else {
        remove(element, classname);
    }
}
exports.toggle = toggle;

},{}],40:[function(require,module,exports){
"use strict";
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = {};
    }
    EventEmitter.prototype.on = function (event, callback) {
        if (this._events[event]) {
            this._events[event].push(callback);
        }
        else {
            this._events[event] = [callback];
        }
    };
    EventEmitter.prototype.off = function (event, callback) {
        var eventCallbacks = this._events[event];
        if (!eventCallbacks) {
            return;
        }
        var indexOfCallback = eventCallbacks.indexOf(callback);
        eventCallbacks.splice(indexOfCallback, 1);
    };
    EventEmitter.prototype._emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var eventCallbacks = this._events[event];
        if (!eventCallbacks) {
            return;
        }
        eventCallbacks.forEach(function (callback) {
            callback.apply(void 0, args);
        });
    };
    EventEmitter.prototype.hasListener = function (event) {
        var eventCallbacks = this._events[event];
        if (!eventCallbacks) {
            return false;
        }
        return eventCallbacks.length > 0;
    };
    EventEmitter.createChild = function (ChildObject) {
        ChildObject.prototype = Object.create(EventEmitter.prototype, {
            constructor: ChildObject,
        });
    };
    return EventEmitter;
}());
module.exports = EventEmitter;

},{}],41:[function(require,module,exports){
"use strict";
var GlobalPromise = (typeof Promise !== "undefined"
    ? Promise // eslint-disable-line no-undef
    : null);
var ExtendedPromise = /** @class */ (function () {
    function ExtendedPromise(options) {
        var _this = this;
        if (typeof options === "function") {
            this._promise = new ExtendedPromise.Promise(options);
            return;
        }
        this._promise = new ExtendedPromise.Promise(function (resolve, reject) {
            _this._resolveFunction = resolve;
            _this._rejectFunction = reject;
        });
        options = options || {};
        this._onResolve = options.onResolve || ExtendedPromise.defaultOnResolve;
        this._onReject = options.onReject || ExtendedPromise.defaultOnReject;
        if (ExtendedPromise.shouldCatchExceptions(options)) {
            this._promise.catch(function () {
                // prevents unhandled promise rejection warning
                // in the console for extended promises that
                // that catch the error in an asynchronous manner
            });
        }
        this._resetState();
    }
    ExtendedPromise.defaultOnResolve = function (result) {
        return ExtendedPromise.Promise.resolve(result);
    };
    ExtendedPromise.defaultOnReject = function (err) {
        return ExtendedPromise.Promise.reject(err);
    };
    ExtendedPromise.setPromise = function (PromiseClass) {
        ExtendedPromise.Promise = PromiseClass;
    };
    ExtendedPromise.shouldCatchExceptions = function (options) {
        if (options.hasOwnProperty("suppressUnhandledPromiseMessage")) {
            return Boolean(options.suppressUnhandledPromiseMessage);
        }
        return Boolean(ExtendedPromise.suppressUnhandledPromiseMessage);
    };
    // start Promise methods documented in:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Methods
    ExtendedPromise.all = function (args) {
        return ExtendedPromise.Promise.all(args);
    };
    ExtendedPromise.allSettled = function (args) {
        return ExtendedPromise.Promise.allSettled(args);
    };
    ExtendedPromise.race = function (args) {
        return ExtendedPromise.Promise.race(args);
    };
    ExtendedPromise.reject = function (arg) {
        return ExtendedPromise.Promise.reject(arg);
    };
    ExtendedPromise.resolve = function (arg) {
        return ExtendedPromise.Promise.resolve(arg);
    };
    ExtendedPromise.prototype.then = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).then.apply(_a, args);
    };
    ExtendedPromise.prototype.catch = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = this._promise).catch.apply(_a, args);
    };
    ExtendedPromise.prototype.resolve = function (arg) {
        var _this = this;
        if (this.isFulfilled) {
            return this;
        }
        this._setResolved();
        ExtendedPromise.Promise.resolve()
            .then(function () {
            return _this._onResolve(arg);
        })
            .then(function (argForResolveFunction) {
            _this._resolveFunction(argForResolveFunction);
        })
            .catch(function (err) {
            _this._resetState();
            _this.reject(err);
        });
        return this;
    };
    ExtendedPromise.prototype.reject = function (arg) {
        var _this = this;
        if (this.isFulfilled) {
            return this;
        }
        this._setRejected();
        ExtendedPromise.Promise.resolve()
            .then(function () {
            return _this._onReject(arg);
        })
            .then(function (result) {
            _this._setResolved();
            _this._resolveFunction(result);
        })
            .catch(function (err) {
            return _this._rejectFunction(err);
        });
        return this;
    };
    ExtendedPromise.prototype._resetState = function () {
        this.isFulfilled = false;
        this.isResolved = false;
        this.isRejected = false;
    };
    ExtendedPromise.prototype._setResolved = function () {
        this.isFulfilled = true;
        this.isResolved = true;
        this.isRejected = false;
    };
    ExtendedPromise.prototype._setRejected = function () {
        this.isFulfilled = true;
        this.isResolved = false;
        this.isRejected = true;
    };
    ExtendedPromise.Promise = GlobalPromise;
    return ExtendedPromise;
}());
module.exports = ExtendedPromise;

},{}],42:[function(require,module,exports){
"use strict";
var set_attributes_1 = require("./lib/set-attributes");
var default_attributes_1 = require("./lib/default-attributes");
var assign_1 = require("./lib/assign");
module.exports = function createFrame(options) {
    if (options === void 0) { options = {}; }
    var iframe = document.createElement("iframe");
    var config = assign_1.assign({}, default_attributes_1.defaultAttributes, options);
    if (config.style && typeof config.style !== "string") {
        assign_1.assign(iframe.style, config.style);
        delete config.style;
    }
    set_attributes_1.setAttributes(iframe, config);
    if (!iframe.getAttribute("id")) {
        iframe.id = iframe.name;
    }
    return iframe;
};

},{"./lib/assign":43,"./lib/default-attributes":44,"./lib/set-attributes":45}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = void 0;
function assign(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
target) {
    var objs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objs[_i - 1] = arguments[_i];
    }
    objs.forEach(function (obj) {
        if (typeof obj !== "object") {
            return;
        }
        Object.keys(obj).forEach(function (key) {
            target[key] = obj[key];
        });
    });
    return target;
}
exports.assign = assign;

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAttributes = void 0;
exports.defaultAttributes = {
    src: "about:blank",
    frameBorder: 0,
    allowtransparency: true,
    scrolling: "no",
};

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAttributes = void 0;
function setAttributes(element, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
attributes) {
    for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            var value = attributes[key];
            if (value == null) {
                element.removeAttribute(key);
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
}
exports.setAttributes = setAttributes;

},{}],46:[function(require,module,exports){
'use strict';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deferred(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        setTimeout(function () {
            try {
                fn.apply(void 0, args);
            }
            catch (err) {
                /* eslint-disable no-console */
                console.log("Error in callback function");
                console.log(err);
                /* eslint-enable no-console */
            }
        }, 1);
    };
}
exports.deferred = deferred;

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function once(fn) {
    var called = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!called) {
            called = true;
            fn.apply(void 0, args);
        }
    };
}
exports.once = once;

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable consistent-return */
function promiseOrCallback(promise, callback) {
    if (!callback) {
        return promise;
    }
    promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
}
exports.promiseOrCallback = promiseOrCallback;

},{}],50:[function(require,module,exports){
"use strict";
var deferred_1 = require("./lib/deferred");
var once_1 = require("./lib/once");
var promise_or_callback_1 = require("./lib/promise-or-callback");
function wrapPromise(fn) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var callback;
        var lastArg = args[args.length - 1];
        if (typeof lastArg === "function") {
            callback = args.pop();
            callback = once_1.once(deferred_1.deferred(callback));
        }
        // I know, I know, this looks bad. But it's a quirk of the library that
        // we need to allow passing the this context to the original function
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: this has an implicit any
        return promise_or_callback_1.promiseOrCallback(fn.apply(this, args), callback); // eslint-disable-line no-invalid-this
    };
}
wrapPromise.wrapPrototype = function (target, options) {
    if (options === void 0) { options = {}; }
    var ignoreMethods = options.ignoreMethods || [];
    var includePrivateMethods = options.transformPrivateMethods === true;
    var methods = Object.getOwnPropertyNames(target.prototype).filter(function (method) {
        var isNotPrivateMethod;
        var isNonConstructorFunction = method !== "constructor" &&
            typeof target.prototype[method] === "function";
        var isNotAnIgnoredMethod = ignoreMethods.indexOf(method) === -1;
        if (includePrivateMethods) {
            isNotPrivateMethod = true;
        }
        else {
            isNotPrivateMethod = method.charAt(0) !== "_";
        }
        return (isNonConstructorFunction && isNotPrivateMethod && isNotAnIgnoredMethod);
    });
    methods.forEach(function (method) {
        var original = target.prototype[method];
        target.prototype[method] = wrapPromise(original);
    });
    return target;
};
module.exports = wrapPromise;

},{"./lib/deferred":47,"./lib/once":48,"./lib/promise-or-callback":49}],51:[function(require,module,exports){
'use strict';

var BraintreeError = require('../lib/braintree-error');
var analytics = require('../lib/analytics');
var errors = require('./errors');
var Promise = require('../lib/promise');
var methods = require('../lib/methods');
var convertMethodsToError = require('../lib/convert-methods-to-error');
var wrapPromise = require('@braintree/wrap-promise');

/**
 * @typedef {object} ApplePay~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.cardHolderName The name of the card holder.
 * @property {string} details.dpanLastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `ApplePayCard`.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 */

/**
 * An Apple Pay Payment Authorization Event object.
 * @typedef {object} ApplePayPaymentAuthorizedEvent
 * @external ApplePayPaymentAuthorizedEvent
 * @see {@link https://developer.apple.com/reference/applepayjs/applepaypaymentauthorizedevent ApplePayPaymentAuthorizedEvent}
 */

/**
 * An Apple Pay Payment Request object.
 * @typedef {object} ApplePayPaymentRequest
 * @external ApplePayPaymentRequest
 * @see {@link https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest PaymentRequest}
 */

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/apple-pay.create|braintree.applePay.create} instead.</strong>
 * @classdesc This class represents an Apple Pay component. Instances of this class have methods for validating the merchant server and tokenizing payments.
 */
function ApplePay(options) {
  this._instantiatedWithClient = Boolean(!options.useDeferredClient);
  this._client = options.client;
  this._createPromise = options.createPromise;

  if (this._client) {
    this._setMerchantIdentifier();
  }
}

ApplePay.prototype._waitForClient = function () {
  if (this._client) {
    return Promise.resolve();
  }

  return this._createPromise.then(function (client) {
    this._client = client;

    this._setMerchantIdentifier();
  }.bind(this));
};

ApplePay.prototype._setMerchantIdentifier = function () {
  var applePayConfig = this._client.getConfiguration().gatewayConfiguration.applePayWeb;

  if (!applePayConfig) {
    return;
  }
  /**
   * @name ApplePay#merchantIdentifier
   * @description A special merchant ID which represents the merchant association with Braintree. Required when using `ApplePaySession.canMakePaymentsWithActiveCard`.
   * @example
   * var promise = ApplePaySession.canMakePaymentsWithActiveCard(applePayInstance.merchantIdentifier);
   * promise.then(function (canMakePaymentsWithActiveCard) {
   *   if (canMakePaymentsWithActiveCard) {
   *     // Set up Apple Pay buttons
   *   }
   * });
   */
  Object.defineProperty(this, 'merchantIdentifier', {
    value: applePayConfig.merchantIdentifier,
    configurable: false,
    writable: false
  });
};

/**
 * Merges a payment request with Braintree defaults to return an {external:ApplePayPaymentRequest}.
 *
 * The following properties are assigned to `paymentRequest` if not already defined. Their default values come from the Braintree gateway.
 * - `countryCode`
 * - `currencyCode`
 * - `merchantCapabilities`
 * - `supportedNetworks`
 * @public
 * @param {external:ApplePayPaymentRequest} paymentRequest The payment request details to apply on top of those from Braintree.
 * @returns {external:ApplePayPaymentRequest|Promise} The decorated `paymentRequest` object. If `useDeferredClient` is used along with an `authorization`, this method will return a promise that resolves with the `paymentRequest` object.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *
 *   var session = new ApplePaySession(3, paymentRequest);
 *
 *   // ...
 * @example <caption>With deferred client</caption>
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({
 *   authorization: 'client-token-or-tokenization-key',
 *   useDeferredClient: true
 * }, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   }).then(function (paymentRequest) {
 *     var session = new ApplePaySession(3, paymentRequest);
 *
 *     // ...
 *   });
 */
ApplePay.prototype.createPaymentRequest = function (paymentRequest) {
  if (this._instantiatedWithClient) {
    return this._createPaymentRequestSynchronously(paymentRequest);
  }

  return this._waitForClient().then(function () {
    return this._createPaymentRequestSynchronously(paymentRequest);
  }.bind(this));
};

ApplePay.prototype._createPaymentRequestSynchronously = function (paymentRequest) {
  var applePay = this._client.getConfiguration().gatewayConfiguration.applePayWeb;
  var defaults = {
    countryCode: applePay.countryCode,
    currencyCode: applePay.currencyCode,
    merchantCapabilities: applePay.merchantCapabilities || ['supports3DS'],
    supportedNetworks: applePay.supportedNetworks.map(function (network) {
      return network === 'mastercard' ? 'masterCard' : network;
    })
  };

  return Object.assign({}, defaults, paymentRequest);
};

/**
 * Validates your merchant website, as required by `ApplePaySession` before payment can be authorized.
 * @public
 * @param {object} options Options
 * @param {string} options.validationURL The validationURL from an `ApplePayValidateMerchantEvent`.
 * @param {string} options.displayName The canonical name for your store. Use a non-localized name. This parameter should be a UTF-8 string that is a maximum of 128 characters. The system may display this name to the user.
 * @param {callback} [callback] The second argument, <code>data</code>, is the Apple Pay merchant session object. If no callback is provided, `performValidation` returns a promise.
 * Pass the merchant session to your Apple Pay session's `completeMerchantValidation` method.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(3, paymentRequest);
 *
 *   session.onvalidatemerchant = function (event) {
 *     applePayInstance.performValidation({
 *       validationURL: event.validationURL,
 *       displayName: 'My Great Store'
 *     }, function (validationErr, validationData) {
 *       if (validationErr) {
 *         console.error(validationErr);
 *         session.abort();
 *         return;
 *       }
 *
 *       session.completeMerchantValidation(validationData);
 *     });
 *   };
 * });
 */
ApplePay.prototype.performValidation = function (options) {
  var self = this;

  if (!options || !options.validationURL) {
    return Promise.reject(new BraintreeError(errors.APPLE_PAY_VALIDATION_URL_REQUIRED));
  }

  return this._waitForClient().then(function () {
    var applePayWebSession = {
      validationUrl: options.validationURL,
      domainName: options.domainName || window.location.hostname,
      merchantIdentifier: options.merchantIdentifier || self.merchantIdentifier
    };

    if (options.displayName != null) {
      applePayWebSession.displayName = options.displayName;
    }

    return self._client.request({
      method: 'post',
      endpoint: 'apple_pay_web/sessions',
      data: {
        _meta: {source: 'apple-pay'},
        applePayWebSession: applePayWebSession
      }
    });
  }).then(function (response) {
    analytics.sendEvent(self._client, 'applepay.performValidation.succeeded');

    return Promise.resolve(response);
  }).catch(function (err) {
    analytics.sendEvent(self._client, 'applepay.performValidation.failed');

    if (err.code === 'CLIENT_REQUEST_ERROR') {
      return Promise.reject(new BraintreeError({
        type: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,
        code: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,
        message: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,
        details: {
          originalError: err.details.originalError
        }
      }));
    }

    return Promise.reject(new BraintreeError({
      type: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,
      code: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,
      message: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Tokenizes an Apple Pay payment. This will likely be called in your `ApplePaySession`'s `onpaymentauthorized` callback.
 * @public
 * @param {object} options Options
 * @param {object} options.token The `payment.token` property of an {@link external:ApplePayPaymentAuthorizedEvent}.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ApplePay~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a promise that resolves with a {@link ApplePay~tokenizePayload|tokenizePayload}.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(3, paymentRequest);
 *
 *   session.onpaymentauthorized = function (event) {
 *     applePayInstance.tokenize({
 *       token: event.payment.token
 *     }, function (tokenizeErr, tokenizedPayload) {
 *       if (tokenizeErr) {
 *         session.completePayment(ApplePaySession.STATUS_FAILURE);
 *         return;
 *       }
 *       // Send the tokenizedPayload to your server here!
 *
 *       // Once the transaction is complete, call completePayment
 *       // to close the Apple Pay sheet
 *       session.completePayment(ApplePaySession.STATUS_SUCCESS);
 *     });
 *   };
 *
 *   // ...
 * });
 */
ApplePay.prototype.tokenize = function (options) {
  var self = this;

  if (!options.token) {
    return Promise.reject(new BraintreeError(errors.APPLE_PAY_PAYMENT_TOKEN_REQUIRED));
  }

  return this._waitForClient().then(function () {
    return self._client.request({
      method: 'post',
      endpoint: 'payment_methods/apple_payment_tokens',
      data: {
        _meta: {
          source: 'apple-pay'
        },
        applePaymentToken: Object.assign({}, options.token, {
          // The gateway requires this key to be base64-encoded.
          paymentData: btoa(JSON.stringify(options.token.paymentData))
        })
      }
    });
  }).then(function (response) {
    analytics.sendEvent(self._client, 'applepay.tokenize.succeeded');

    return Promise.resolve(response.applePayCards[0]);
  }).catch(function (err) {
    analytics.sendEvent(self._client, 'applepay.tokenize.failed');

    return Promise.reject(new BraintreeError({
      type: errors.APPLE_PAY_TOKENIZATION.type,
      code: errors.APPLE_PAY_TOKENIZATION.code,
      message: errors.APPLE_PAY_TOKENIZATION.message,
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/apple-pay.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * applePayInstance.teardown();
 * @example <caption>With callback</caption>
 * applePayInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
ApplePay.prototype.teardown = function () {
  convertMethodsToError(this, methods(ApplePay.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(ApplePay);

},{"../lib/analytics":93,"../lib/braintree-error":98,"../lib/convert-methods-to-error":100,"../lib/methods":128,"../lib/promise":130,"./errors":52,"@braintree/wrap-promise":50}],52:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Apple Pay - Creation Error Codes
 * @description Errors that occur when [creating the Apple Pay component](./module-braintree-web_apple-pay.html#.create).
 * @property {MERCHANT} APPLE_PAY_NOT_ENABLED Occurs when the authorization used is not authorized to process Apple Pay.
 */

/**
 * @name BraintreeError.Apple Pay - performValidation Error Codes
 * @description Errors that occur when [validating](./ApplePay.html#performValidation).
 * @property {MERCHANT} APPLE_PAY_VALIDATION_URL_REQUIRED Occurs when the `validationURL` option is not passed in.
 * @property {MERCHANT} APPLE_PAY_MERCHANT_VALIDATION_FAILED Occurs when the website domain has not been registered in the Braintree control panel.
 * @property {NETWORK} APPLE_PAY_MERCHANT_VALIDATION_NETWORK Occurs when an unknown network error occurs.
 */

/**
 * @name BraintreeError.Apple Pay - tokenize Error Codes
 * @description Errors that occur when [tokenizing](./ApplePay.html#tokenize).
 * @property {MERCHANT} APPLE_PAY_PAYMENT_TOKEN_REQUIRED Occurs when the `token` option is not passed in.
 * @property {NETWORK} APPLE_PAY_TOKENIZATION Occurs when an unknown network error occurs.
 */

var BraintreeError = require('../lib/braintree-error');

module.exports = {
  APPLE_PAY_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_NOT_ENABLED',
    message: 'Apple Pay is not enabled for this merchant.'
  },
  APPLE_PAY_VALIDATION_URL_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_VALIDATION_URL_REQUIRED',
    message: 'performValidation must be called with a validationURL.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_NETWORK',
    message: 'A network error occurred when validating the Apple Pay merchant.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_FAILED',
    message: 'Make sure you have registered your domain name in the Braintree Control Panel.'
  },
  APPLE_PAY_PAYMENT_TOKEN_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_PAYMENT_TOKEN_REQUIRED',
    message: 'tokenize must be called with a payment token.'
  },
  APPLE_PAY_TOKENIZATION: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_TOKENIZATION',
    message: 'A network error occurred when processing the Apple Pay payment.'
  }
};

},{"../lib/braintree-error":98}],53:[function(require,module,exports){
'use strict';

/**
 * @module braintree-web/apple-pay
 * @description Accept Apple Pay on the Web. *This component is currently in beta and is subject to change.*
 */

var ApplePay = require('./apple-pay');
var analytics = require('../lib/analytics');
var BraintreeError = require('../lib/braintree-error');
var basicComponentVerification = require('../lib/basic-component-verification');
var createAssetsUrl = require('../lib/create-assets-url');
var createDeferredClient = require('../lib/create-deferred-client');
var Promise = require('../lib/promise');
var errors = require('./errors');
var VERSION = "3.78.2";
var wrapPromise = require('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {boolean} [options.useDeferredClient] Used in conjunction with `authorization`, allows the Apple Pay instance to be available right away by fetching the client configuration in the background. When this option is used, {@link ApplePay#createPaymentRequest} will return a promise that resolves with the configuration instead of returning synchronously.
 * @param {callback} [callback] The second argument, `data`, is the {@link ApplePay} instance. If no callback is provided, `create` returns a promise that resolves with the {@link ApplePay} instance.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'Apple Pay';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    var applePayInstance;
    var createPromise = createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    }).then(function (client) {
      if (!client.getConfiguration().gatewayConfiguration.applePayWeb) {
        return Promise.reject(new BraintreeError(errors.APPLE_PAY_NOT_ENABLED));
      }

      analytics.sendEvent(client, 'applepay.initialized');

      return client;
    });

    options.createPromise = createPromise;
    applePayInstance = new ApplePay(options);

    if (!options.useDeferredClient) {
      return createPromise.then(function (client) {
        applePayInstance._client = client;

        return applePayInstance;
      });
    }

    return applePayInstance;
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":93,"../lib/basic-component-verification":96,"../lib/braintree-error":98,"../lib/create-assets-url":102,"../lib/create-deferred-client":104,"../lib/promise":130,"./apple-pay":51,"./errors":52,"@braintree/wrap-promise":50}],54:[function(require,module,exports){
'use strict';

var isIe = require('@braintree/browser-detection/is-ie');
var isIe9 = require('@braintree/browser-detection/is-ie9');

module.exports = {
  isIe: isIe,
  isIe9: isIe9
};

},{"@braintree/browser-detection/is-ie":31,"@braintree/browser-detection/is-ie9":33}],55:[function(require,module,exports){
'use strict';

var BRAINTREE_VERSION = require('./constants').BRAINTREE_VERSION;

var GraphQL = require('./request/graphql');
var request = require('./request');
var isVerifiedDomain = require('../lib/is-verified-domain');
var BraintreeError = require('../lib/braintree-error');
var convertToBraintreeError = require('../lib/convert-to-braintree-error');
var getGatewayConfiguration = require('./get-configuration').getConfiguration;
var createAuthorizationData = require('../lib/create-authorization-data');
var addMetadata = require('../lib/add-metadata');
var Promise = require('../lib/promise');
var wrapPromise = require('@braintree/wrap-promise');
var once = require('../lib/once');
var deferred = require('../lib/deferred');
var assign = require('../lib/assign').assign;
var analytics = require('../lib/analytics');
var errors = require('./errors');
var VERSION = require('../lib/constants').VERSION;
var GRAPHQL_URLS = require('../lib/constants').GRAPHQL_URLS;
var methods = require('../lib/methods');
var convertMethodsToError = require('../lib/convert-methods-to-error');
var assets = require('../lib/assets');
var FRAUDNET_FNCLS = require('../lib/constants').FRAUDNET_FNCLS;
var FRAUDNET_SOURCE = require('../lib/constants').FRAUDNET_SOURCE;
var FRAUDNET_URL = require('../lib/constants').FRAUDNET_URL;

var cachedClients = {};

/**
 * This object is returned by {@link Client#getConfiguration|getConfiguration}. This information is used extensively by other Braintree modules to properly configure themselves.
 * @typedef {object} Client~configuration
 * @property {object} client The braintree-web/client parameters.
 * @property {string} client.authorization A tokenizationKey or clientToken.
 * @property {object} gatewayConfiguration Gateway-supplied configuration.
 * @property {object} analyticsMetadata Analytics-specific data.
 * @property {string} analyticsMetadata.sessionId Uniquely identifies a browsing session.
 * @property {string} analyticsMetadata.sdkVersion The braintree.js version.
 * @property {string} analyticsMetadata.merchantAppId Identifies the merchant's web app.
 */

/**
 * @class
 * @param {Client~configuration} configuration Options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/client.create|braintree.client.create} instead.</strong>
 * @classdesc This class is required by many other Braintree components. It serves as the base API layer that communicates with our servers. It is also capable of being used to formulate direct calls to our servers, such as direct credit card tokenization. See {@link Client#request}.
 */
function Client(configuration) {
  var configurationJSON, gatewayConfiguration;

  configuration = configuration || {};

  configurationJSON = JSON.stringify(configuration);
  gatewayConfiguration = configuration.gatewayConfiguration;

  if (!gatewayConfiguration) {
    throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
  }

  [
    'assetsUrl',
    'clientApiUrl',
    'configUrl'
  ].forEach(function (property) {
    if (property in gatewayConfiguration && !isVerifiedDomain(gatewayConfiguration[property])) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: property + ' property is on an invalid domain.'
      });
    }
  });

  /**
   * Returns a copy of the configuration values.
   * @public
   * @returns {Client~configuration} configuration
   */
  this.getConfiguration = function () {
    return JSON.parse(configurationJSON);
  };

  this._request = request;
  this._configuration = this.getConfiguration();

  this._clientApiBaseUrl = gatewayConfiguration.clientApiUrl + '/v1/';

  if (gatewayConfiguration.graphQL) {
    this._graphQL = new GraphQL({
      graphQL: gatewayConfiguration.graphQL
    });
  }
}

Client.initialize = function (options) {
  var clientInstance, authData;
  var promise = cachedClients[options.authorization];

  if (promise) {
    analytics.sendEvent(promise, 'custom.client.load.cached');

    return promise;
  }

  try {
    authData = createAuthorizationData(options.authorization);
  } catch (err) {
    return Promise.reject(new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION));
  }

  promise = getGatewayConfiguration(authData).then(function (configuration) {
    if (options.debug) {
      configuration.isDebug = true;
    }

    configuration.authorization = options.authorization;

    clientInstance = new Client(configuration);

    return clientInstance;
  });

  cachedClients[options.authorization] = promise;

  analytics.sendEvent(promise, 'custom.client.load.initialized');

  return promise.then(function (client) {
    analytics.sendEvent(clientInstance, 'custom.client.load.succeeded');

    return client;
  }).catch(function (err) {
    delete cachedClients[options.authorization];

    return Promise.reject(err);
  });
};

// Primarily used for testing the client initalization call
Client.clearCache = function () {
  cachedClients = {};
};

Client.prototype._findOrCreateFraudnetJSON = function (clientMetadataId) {
  var el = document.querySelector('script[fncls="' + FRAUDNET_FNCLS + '"]');
  var config, additionalData, authorizationFingerprint, parameters;

  if (!el) {
    el = document.body.appendChild(document.createElement('script'));
    el.type = 'application/json';
    el.setAttribute('fncls', FRAUDNET_FNCLS);
  }

  config = this.getConfiguration();
  additionalData = {
    rda_tenant: 'bt_card', // eslint-disable-line camelcase
    mid: config.gatewayConfiguration.merchantId
  };
  authorizationFingerprint = config.authorizationFingerprint;

  if (authorizationFingerprint) {
    authorizationFingerprint.split('&').forEach(function (pieces) {
      var component = pieces.split('=');

      if (component[0] === 'customer_id' && component.length > 1) {
        additionalData.cid = component[1];
      }
    });
  }

  parameters = {
    f: clientMetadataId.substr(0, 32),
    fp: additionalData,
    bu: false,
    s: FRAUDNET_SOURCE
  };
  el.text = JSON.stringify(parameters);
};

/**
 * Used by other modules to formulate all network requests to the Braintree gateway. It is also capable of being used directly from your own form to tokenize credit card information. However, be sure to satisfy PCI compliance if you use direct card tokenization.
 * @public
 * @param {object} options Request options:
 * @param {string} options.method HTTP method, e.g. "get" or "post".
 * @param {string} options.endpoint Endpoint path, e.g. "payment_methods".
 * @param {object} options.data Data to send with the request.
 * @param {number} [options.timeout=60000] Set a timeout (in milliseconds) for the request.
 * @param {callback} [callback] The second argument, <code>data</code>, is the returned server data.
 * @example
 * <caption>Direct Credit Card Tokenization</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-expiration-date'].value,
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @example
 * <caption>Tokenizing Fields for AVS Checks</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-date'].value,
 *       // The billing address can be checked with AVS rules.
 *       // See: https://articles.braintreepayments.com/support/guides/fraud-tools/basic/avs-cvv-rules
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value,
 *         streetAddress: form['cc-street-address'].value,
 *         countryName: form['cc-country-name'].value,
 *         countryCodeAlpha2: form['cc-country-alpha2'].value,
 *         countryCodeAlpha3: form['cc-country-alpha3'].value,
 *         countryCodeNumeric: form['cc-country-numeric'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
Client.prototype.request = function (options, callback) {
  var self = this; // eslint-disable-line no-invalid-this
  var requestPromise = new Promise(function (resolve, reject) {
    var optionName, api, baseUrl, requestOptions;
    var shouldCollectData = Boolean(options.endpoint === 'payment_methods/credit_cards' && self.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData);

    if (options.api !== 'graphQLApi') {
      if (!options.method) {
        optionName = 'options.method';
      } else if (!options.endpoint) {
        optionName = 'options.endpoint';
      }
    }

    if (optionName) {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_REQUIRED.type,
        code: errors.CLIENT_OPTION_REQUIRED.code,
        message: optionName + ' is required when making a request.'
      });
    }

    if ('api' in options) {
      api = options.api;
    } else {
      api = 'clientApi';
    }

    requestOptions = {
      method: options.method,
      graphQL: self._graphQL,
      timeout: options.timeout,
      metadata: self._configuration.analyticsMetadata
    };

    if (api === 'clientApi') {
      baseUrl = self._clientApiBaseUrl;

      requestOptions.data = addMetadata(self._configuration, options.data);
    } else if (api === 'graphQLApi') {
      baseUrl = GRAPHQL_URLS[self._configuration.gatewayConfiguration.environment];
      options.endpoint = '';
      requestOptions.method = 'post';
      requestOptions.data = assign({
        clientSdkMetadata: {
          platform: self._configuration.analyticsMetadata.platform,
          source: self._configuration.analyticsMetadata.source,
          integration: self._configuration.analyticsMetadata.integration,
          sessionId: self._configuration.analyticsMetadata.sessionId,
          version: VERSION
        }
      }, options.data);

      requestOptions.headers = getAuthorizationHeadersForGraphQL(self._configuration);
    } else {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_INVALID.type,
        code: errors.CLIENT_OPTION_INVALID.code,
        message: 'options.api is invalid.'
      });
    }

    requestOptions.url = baseUrl + options.endpoint;
    requestOptions.sendAnalyticsEvent = function (kind) {
      analytics.sendEvent(self, kind);
    };

    self._request(requestOptions, function (err, data, status) {
      var resolvedData, requestError;

      requestError = formatRequestError(status, err);

      if (requestError) {
        reject(requestError);

        return;
      }

      if (api === 'graphQLApi' && data.errors) {
        reject(convertToBraintreeError(data.errors, {
          type: errors.CLIENT_GRAPHQL_REQUEST_ERROR.type,
          code: errors.CLIENT_GRAPHQL_REQUEST_ERROR.code,
          message: errors.CLIENT_GRAPHQL_REQUEST_ERROR.message
        }));

        return;
      }

      resolvedData = assign({_httpStatus: status}, data);

      if (shouldCollectData && resolvedData.creditCards && resolvedData.creditCards.length > 0) {
        self._findOrCreateFraudnetJSON(resolvedData.creditCards[0].nonce);

        assets.loadScript({
          src: FRAUDNET_URL,
          forceScriptReload: true
        });
      }
      resolve(resolvedData);
    });
  });

  if (typeof callback === 'function') {
    callback = once(deferred(callback));

    requestPromise.then(function (response) {
      callback(null, response, response._httpStatus);
    }).catch(function (err) {
      var status = err && err.details && err.details.httpStatus;

      callback(err, null, status);
    });

    return;
  }

  return requestPromise; // eslint-disable-line consistent-return
};

function formatRequestError(status, err) { // eslint-disable-line consistent-return
  var requestError;

  if (status === -1) {
    requestError = new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
  } else if (status === 401) {
    requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INVALID);
  } else if (status === 403) {
    requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
  } else if (status === 429) {
    requestError = new BraintreeError(errors.CLIENT_RATE_LIMITED);
  } else if (status >= 500) {
    requestError = new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
  } else if (status < 200 || status >= 400) {
    requestError = convertToBraintreeError(err, {
      type: errors.CLIENT_REQUEST_ERROR.type,
      code: errors.CLIENT_REQUEST_ERROR.code,
      message: errors.CLIENT_REQUEST_ERROR.message
    });
  }

  if (requestError) {
    requestError.details = requestError.details || {};
    requestError.details.httpStatus = status;

    return requestError;
  }
}

Client.prototype.toJSON = function () {
  return this.getConfiguration();
};

/**
 * Returns the Client version.
 * @public
 * @returns {String} The created client's version.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   console.log(clientInstance.getVersion()); // Ex: 1.0.0
 * });
 * @returns {void}
 */
Client.prototype.getVersion = function () {
  return VERSION;
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/client.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * clientInstance.teardown();
 * @example <caption>With callback</caption>
 * clientInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
Client.prototype.teardown = wrapPromise(function () {
  var self = this; // eslint-disable-line no-invalid-this

  delete cachedClients[self.getConfiguration().authorization];
  convertMethodsToError(self, methods(Client.prototype));

  return Promise.resolve();
});

function getAuthorizationHeadersForGraphQL(configuration) {
  var token = configuration.authorizationFingerprint || configuration.authorization;

  return {
    Authorization: 'Bearer ' + token,
    'Braintree-Version': BRAINTREE_VERSION
  };
}

module.exports = Client;

},{"../lib/add-metadata":92,"../lib/analytics":93,"../lib/assets":94,"../lib/assign":95,"../lib/braintree-error":98,"../lib/constants":99,"../lib/convert-methods-to-error":100,"../lib/convert-to-braintree-error":101,"../lib/create-authorization-data":103,"../lib/deferred":105,"../lib/is-verified-domain":126,"../lib/methods":128,"../lib/once":129,"../lib/promise":130,"./constants":56,"./errors":57,"./get-configuration":58,"./request":70,"./request/graphql":68,"@braintree/wrap-promise":50}],56:[function(require,module,exports){
'use strict';

module.exports = {
  BRAINTREE_VERSION: '2018-05-10'
};

},{}],57:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Client - Internal Error Codes
 * @ignore
 * @description These codes should never be experienced by the merchant directly.
 * @property {MERCHANT} CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN An error to prevent client creation for domains that are not allowed in the JS.
 * @property {INTERNAL} CLIENT_MISSING_GATEWAY_CONFIGURATION Occurs when the client is created without a gateway configuration. Should never happen.
 */

/**
 * @name BraintreeError.Client - Create Error Codes
 * @description Errors that may occur when [creating the client](./module-braintree-web_client.html#.create)
 * @property {MERCHANT} CLIENT_INVALID_AUTHORIZATION Occurs when client token cannot be parsed.
 */

/**
 * @name BraintreeError.Client - Request Error Codes
 * @description Errors that may occur when [using the request method](./Client.html#request)
 * @property {MERCHANT} CLIENT_OPTION_REQUIRED An option required in the request method was not provided. Usually `options.method` or `options.endpoint`
 * @property {MERCHANT} CLIENT_OPTION_INVALID The request option provided is invalid.
 * @property {MERCHANT} CLIENT_GATEWAY_NETWORK The Braintree gateway could not be contacted.
 * @property {NETWORK} CLIENT_REQUEST_TIMEOUT The request took too long to complete and timed out.
 * @property {NETWORK} CLIENT_REQUEST_ERROR The response from a request had status 400 or greater.
 * @property {NETWORK} CLIENT_GRAPHQL_REQUEST_ERROR The response from a request to GraphQL contained an error.
 * @property {MERCHANT} CLIENT_RATE_LIMITED The response from a request had a status of 429, indicating rate limiting.
 * @property {MERCHANT} CLIENT_AUTHORIZATION_INSUFFICIENT The user associated with the client token or tokenization key does not have permissions to make the request.
 * @property {MERCHANT} CLIENT_AUTHORIZATION_INVALID The provided authorization could not be found. Either the client token has expired and a new client token must be generated or the tokenization key used is set to be inactive or has been deleted.
 */

var BraintreeError = require('../lib/braintree-error');

module.exports = {
  CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN'
  },
  CLIENT_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_REQUIRED'
  },
  CLIENT_OPTION_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_INVALID'
  },
  CLIENT_MISSING_GATEWAY_CONFIGURATION: {
    type: BraintreeError.types.INTERNAL,
    code: 'CLIENT_MISSING_GATEWAY_CONFIGURATION',
    message: 'Missing gatewayConfiguration.'
  },
  CLIENT_INVALID_AUTHORIZATION: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_INVALID_AUTHORIZATION',
    message: 'Authorization is invalid. Make sure your client token or tokenization key is valid.'
  },
  CLIENT_GATEWAY_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_GATEWAY_NETWORK',
    message: 'Cannot contact the gateway at this time.'
  },
  CLIENT_REQUEST_TIMEOUT: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_TIMEOUT',
    message: 'Request timed out waiting for a reply.'
  },
  CLIENT_REQUEST_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_ERROR',
    message: 'There was a problem with your request.'
  },
  CLIENT_GRAPHQL_REQUEST_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_GRAPHQL_REQUEST_ERROR',
    message: 'There was a problem with your request.'
  },
  CLIENT_RATE_LIMITED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_RATE_LIMITED',
    message: 'You are being rate-limited; please try again in a few minutes.'
  },
  CLIENT_AUTHORIZATION_INSUFFICIENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_AUTHORIZATION_INSUFFICIENT',
    message: 'The authorization used has insufficient privileges.'
  },
  CLIENT_AUTHORIZATION_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_AUTHORIZATION_INVALID',
    message: 'Either the client token has expired and a new one should be generated or the tokenization key has been deactivated or deleted.'
  }
};

},{"../lib/braintree-error":98}],58:[function(require,module,exports){
'use strict';

var BraintreeError = require('../lib/braintree-error');
var Promise = require('../lib/promise');
var wrapPromise = require('@braintree/wrap-promise');
var request = require('./request');
var uuid = require('@braintree/uuid');
var constants = require('../lib/constants');
var errors = require('./errors');
var GraphQL = require('./request/graphql');
var GRAPHQL_URLS = require('../lib/constants').GRAPHQL_URLS;
var isDateStringBeforeOrOn = require('../lib/is-date-string-before-or-on');

var BRAINTREE_VERSION = require('./constants').BRAINTREE_VERSION;

function getConfiguration(authData) {
  return new Promise(function (resolve, reject) {
    var configuration, attrs, configUrl, reqOptions;
    var sessionId = uuid();
    var analyticsMetadata = {
      merchantAppId: window.location.host,
      platform: constants.PLATFORM,
      sdkVersion: constants.VERSION,
      source: constants.SOURCE,
      integration: constants.INTEGRATION,
      integrationType: constants.INTEGRATION,
      sessionId: sessionId
    };

    attrs = authData.attrs;
    configUrl = authData.configUrl;

    attrs._meta = analyticsMetadata;
    attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
    attrs.configVersion = '3';

    reqOptions = {
      url: configUrl,
      method: 'GET',
      data: attrs
    };

    if (attrs.authorizationFingerprint && authData.graphQL) {
      if (isDateStringBeforeOrOn(authData.graphQL.date, BRAINTREE_VERSION)) {
        reqOptions.graphQL = new GraphQL({
          graphQL: {
            url: authData.graphQL.url,
            features: ['configuration']
          }
        });
      }

      reqOptions.metadata = analyticsMetadata;
    } else if (attrs.tokenizationKey) {
      reqOptions.graphQL = new GraphQL({
        graphQL: {
          url: GRAPHQL_URLS[authData.environment],
          features: ['configuration']
        }
      });

      reqOptions.metadata = analyticsMetadata;
    }

    // NEXT_MAJOR_VERSION
    // there are various issues with the config endpoint where the values returned
    // do not match the values from the merchant account id passed into a client token
    // we need to update the configuration request endpoint to be able to pass the
    // correct values. The following ones are incorrect
    // * applePayWeb - definitely supportedNetworks, which compiles all the card
    //    networks from all the merchant accounts instead of providing just the
    //    ones from the specified one. The same is probably true for ios apple pay
    //    Also the merchantidentifier
    // NEXT_MAJOR_VERSION Allow passing in merchant account id when creating the component
    // to fetch the config for that merchant account id (particularly helpful when using
    // a tokenization key for authorization)
    request(reqOptions, function (err, response, status) {
      var errorTemplate;

      if (err) {
        if (status === 403) {
          errorTemplate = errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
        } else if (status === 401) {
          errorTemplate = errors.CLIENT_AUTHORIZATION_INVALID;
        } else {
          errorTemplate = errors.CLIENT_GATEWAY_NETWORK;
        }

        reject(new BraintreeError({
          type: errorTemplate.type,
          code: errorTemplate.code,
          message: errorTemplate.message,
          details: {
            originalError: err
          }
        }));

        return;
      }

      configuration = {
        authorizationType: attrs.tokenizationKey ? 'TOKENIZATION_KEY' : 'CLIENT_TOKEN',
        authorizationFingerprint: attrs.authorizationFingerprint,
        analyticsMetadata: analyticsMetadata,
        gatewayConfiguration: response
      };

      resolve(configuration);
    });
  });
}

module.exports = {
  getConfiguration: wrapPromise(getConfiguration)
};

},{"../lib/braintree-error":98,"../lib/constants":99,"../lib/is-date-string-before-or-on":124,"../lib/promise":130,"./constants":56,"./errors":57,"./request":70,"./request/graphql":68,"@braintree/uuid":46,"@braintree/wrap-promise":50}],59:[function(require,module,exports){
'use strict';

var BraintreeError = require('../lib/braintree-error');
var Client = require('./client');
var VERSION = "3.78.2";
var Promise = require('../lib/promise');
var wrapPromise = require('@braintree/wrap-promise');
var sharedErrors = require('../lib/errors');

/** @module braintree-web/client */

/**
 * @function create
 * @description This function is the entry point for the <code>braintree.client</code> module. It is used for creating {@link Client} instances that service communication to Braintree servers.
 * @param {object} options Object containing all {@link Client} options:
 * @param {string} options.authorization A tokenizationKey or clientToken.
 * @param {callback} [callback] The second argument, <code>data</code>, is the {@link Client} instance.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   if (createErr) {
 *     if (createErr.code === 'CLIENT_AUTHORIZATION_INVALID') {
 *       // either the client token has expired, and a new one should be generated
 *       // or the tokenization key was deactivated or deleted
 *     } else {
 *       console.log('something went wrong creating the client instance', createErr);
 *     }
 *     return;
 *   }
 *
 *  // set up other components
 * });
 * @static
 */
function create(options) {
  if (!options.authorization) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.authorization is required when instantiating a client.'
    }));
  }

  return Client.initialize(options);
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/braintree-error":98,"../lib/errors":108,"../lib/promise":130,"./client":55,"@braintree/wrap-promise":50}],60:[function(require,module,exports){
'use strict';

var querystring = require('../../lib/querystring');
var assign = require('../../lib/assign').assign;
var prepBody = require('./prep-body');
var parseBody = require('./parse-body');
var xhr = require('./xhr');
var isXHRAvailable = xhr.isAvailable;
var GraphQLRequest = require('./graphql/request');
var DefaultRequest = require('./default-request');

var MAX_TCP_RETRYCOUNT = 1;
var TCP_PRECONNECT_BUG_STATUS_CODE = 408;

function requestShouldRetry(status) {
  return !status || status === TCP_PRECONNECT_BUG_STATUS_CODE;
}

function graphQLRequestShouldRetryWithClientApi(body) {
  var errorClass = !body.data && body.errors &&
      body.errors[0] &&
      body.errors[0].extensions &&
      body.errors[0].extensions.errorClass;

  return errorClass === 'UNKNOWN' || errorClass === 'INTERNAL';
}

function _requestWithRetry(options, tcpRetryCount, cb) {
  var status, resBody, ajaxRequest, body, method, headers, parsedBody;
  var url = options.url;
  var graphQL = options.graphQL;
  var timeout = options.timeout;
  var req = xhr.getRequestObject();
  var callback = cb;
  var isGraphQLRequest = Boolean(graphQL && graphQL.isGraphQLRequest(url, options.data));

  options.headers = assign({'Content-Type': 'application/json'}, options.headers);

  if (isGraphQLRequest) {
    ajaxRequest = new GraphQLRequest(options);
  } else {
    ajaxRequest = new DefaultRequest(options);
  }

  url = ajaxRequest.getUrl();
  body = ajaxRequest.getBody();
  method = ajaxRequest.getMethod();
  headers = ajaxRequest.getHeaders();

  if (method === 'GET') {
    url = querystring.queryify(url, body);
    body = null;
  }

  if (isXHRAvailable) {
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return; }

      if (req.status === 0 && isGraphQLRequest) {
        // If a merchant experiences a connection
        // issue to the GraphQL endpoint (possibly
        // due to a Content Security Policy), retry
        // the request against the old client API.
        delete options.graphQL;
        _requestWithRetry(options, tcpRetryCount, cb);

        return;
      }

      parsedBody = parseBody(req.responseText);
      resBody = ajaxRequest.adaptResponseBody(parsedBody);
      status = ajaxRequest.determineStatus(req.status, parsedBody);

      if (status >= 400 || status < 200) {
        if (isGraphQLRequest && graphQLRequestShouldRetryWithClientApi(parsedBody)) {
          delete options.graphQL;
          _requestWithRetry(options, tcpRetryCount, cb);

          return;
        }

        if (tcpRetryCount < MAX_TCP_RETRYCOUNT && requestShouldRetry(status)) {
          tcpRetryCount++;
          _requestWithRetry(options, tcpRetryCount, cb);

          return;
        }
        callback(resBody || 'error', null, status || 500);
      } else {
        callback(null, resBody, status);
      }
    };
  } else {
    if (options.headers) {
      url = querystring.queryify(url, headers);
    }

    req.onload = function () {
      callback(null, parseBody(req.responseText), req.status);
    };

    req.onerror = function () {
      // XDomainRequest does not report a body or status for errors, so
      // hardcode to 'error' and 500, respectively
      callback('error', null, 500);
    };

    // This must remain for IE9 to work
    req.onprogress = function () {};

    req.ontimeout = function () {
      callback('timeout', null, -1);
    };
  }

  try {
    req.open(method, url, true);
  } catch (requestOpenError) {
    // If a merchant has a Content Security Policy and they have
    // not allowed our endpoints, some browsers may
    // synchronously throw an error. If it is not a GraphQL
    // request, we throw the error. If it is a GraphQL request
    // we remove the GraphQL option and try the request against
    // the old client API.
    if (!isGraphQLRequest) {
      throw requestOpenError;
    }

    delete options.graphQL;

    _requestWithRetry(options, tcpRetryCount, cb);

    return;
  }

  req.timeout = timeout;

  if (isXHRAvailable) {
    Object.keys(headers).forEach(function (headerKey) {
      req.setRequestHeader(headerKey, headers[headerKey]);
    });
  }

  try {
    req.send(prepBody(method, body));
  } catch (e) { /* ignored */ }
}

function request(options, cb) {
  _requestWithRetry(options, 0, cb);
}

module.exports = {
  request: request
};

},{"../../lib/assign":95,"../../lib/querystring":131,"./default-request":61,"./graphql/request":69,"./parse-body":73,"./prep-body":74,"./xhr":75}],61:[function(require,module,exports){
'use strict';

function DefaultRequest(options) {
  this._url = options.url;
  this._data = options.data;
  this._method = options.method;
  this._headers = options.headers;
}

DefaultRequest.prototype.getUrl = function () {
  return this._url;
};

DefaultRequest.prototype.getBody = function () {
  return this._data;
};

DefaultRequest.prototype.getMethod = function () {
  return this._method;
};

DefaultRequest.prototype.getHeaders = function () {
  return this._headers;
};

DefaultRequest.prototype.adaptResponseBody = function (parsedBody) {
  return parsedBody;
};

DefaultRequest.prototype.determineStatus = function (status) {
  return status;
};

module.exports = DefaultRequest;

},{}],62:[function(require,module,exports){
'use strict';

module.exports = function getUserAgent() {
  return window.navigator.userAgent;
};

},{}],63:[function(require,module,exports){
'use strict';

var errorResponseAdapter = require('./error');
var assign = require('../../../../lib/assign').assign;

/* eslint-disable camelcase */
var cardTypeTransforms = {
  creditCard: {
    AMERICAN_EXPRESS: 'American Express',
    DISCOVER: 'Discover',
    INTERNATIONAL_MAESTRO: 'Maestro',
    JCB: 'JCB',
    MASTERCARD: 'MasterCard',
    SOLO: 'Solo',
    UK_MAESTRO: 'UK Maestro',
    UNION_PAY: 'UnionPay',
    VISA: 'Visa'
  },
  applePayWeb: {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    DISCOVER: 'discover',
    AMERICAN_EXPRESS: 'amex',
    INTERNATIONAL_MAESTRO: 'maestro',
    ELO: 'elo'
  },
  visaCheckout: {
    VISA: 'Visa',
    MASTERCARD: 'MasterCard',
    DISCOVER: 'Discover',
    AMERICAN_EXPRESS: 'American Express'
  },
  googlePay: {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    DISCOVER: 'discover',
    AMERICAN_EXPRESS: 'amex',
    ELO: 'elo'
  },
  masterpass: {
    VISA: 'visa',
    MASTERCARD: 'master',
    DISCOVER: 'discover',
    AMERICAN_EXPRESS: 'amex',
    DINERS: 'diners',
    INTERNATIONAL_MAESTRO: 'maestro',
    JCB: 'jcb'
  }
};
/* eslint-enable camelcase */

function configurationResponseAdapter(responseBody, ctx) {
  var adaptedResponse;

  if (responseBody.data && !responseBody.errors) {
    adaptedResponse = adaptConfigurationResponseBody(responseBody, ctx);
  } else {
    adaptedResponse = errorResponseAdapter(responseBody);
  }

  return adaptedResponse;
}

function adaptConfigurationResponseBody(body, ctx) {
  var configuration = body.data.clientConfiguration;
  var response;

  response = {
    environment: configuration.environment.toLowerCase(),
    clientApiUrl: configuration.clientApiUrl,
    assetsUrl: configuration.assetsUrl,
    analytics: {
      url: configuration.analyticsUrl
    },
    merchantId: configuration.merchantId,
    venmo: 'off'
  };

  if (configuration.supportedFeatures) {
    response.graphQL = {
      url: ctx._graphQL._config.url,
      features: configuration.supportedFeatures.map(function (feature) {
        return feature.toLowerCase();
      })
    };
  }

  if (configuration.braintreeApi) {
    response.braintreeApi = configuration.braintreeApi;
  }

  if (configuration.applePayWeb) {
    response.applePayWeb = configuration.applePayWeb;
    response.applePayWeb.supportedNetworks = mapCardTypes(configuration.applePayWeb.supportedCardBrands, cardTypeTransforms.applePayWeb);

    delete response.applePayWeb.supportedCardBrands;
  }

  if (configuration.ideal) {
    response.ideal = configuration.ideal;
  }

  if (configuration.kount) {
    response.kount = {
      kountMerchantId: configuration.kount.merchantId
    };
  }

  if (configuration.creditCard) {
    response.challenges = configuration.creditCard.challenges.map(function (challenge) {
      return challenge.toLowerCase();
    });

    response.creditCards = {
      supportedCardTypes: mapCardTypes(configuration.creditCard.supportedCardBrands, cardTypeTransforms.creditCard)
    };
    response.threeDSecureEnabled = configuration.creditCard.threeDSecureEnabled;
    response.threeDSecure = configuration.creditCard.threeDSecure;
  } else {
    response.challenges = [];
    response.creditCards = {
      supportedCardTypes: []
    };
    response.threeDSecureEnabled = false;
  }

  if (configuration.googlePay) {
    response.androidPay = {
      displayName: configuration.googlePay.displayName,
      enabled: true,
      environment: configuration.googlePay.environment.toLowerCase(),
      googleAuthorizationFingerprint: configuration.googlePay.googleAuthorization,
      paypalClientId: configuration.googlePay.paypalClientId,
      supportedNetworks: mapCardTypes(configuration.googlePay.supportedCardBrands, cardTypeTransforms.googlePay)
    };
  }

  if (configuration.venmo) {
    response.payWithVenmo = {
      merchantId: configuration.venmo.merchantId,
      accessToken: configuration.venmo.accessToken,
      environment: configuration.venmo.environment.toLowerCase()
    };
  }

  if (configuration.paypal) {
    response.paypalEnabled = true;
    response.paypal = assign({}, configuration.paypal);
    response.paypal.currencyIsoCode = response.paypal.currencyCode;
    response.paypal.environment = response.paypal.environment.toLowerCase();

    delete response.paypal.currencyCode;
  } else {
    response.paypalEnabled = false;
  }

  if (configuration.unionPay) {
    response.unionPay = {
      enabled: true,
      merchantAccountId: configuration.unionPay.merchantAccountId
    };
  }

  if (configuration.visaCheckout) {
    response.visaCheckout = {
      apikey: configuration.visaCheckout.apiKey,
      externalClientId: configuration.visaCheckout.externalClientId,
      supportedCardTypes: mapCardTypes(configuration.visaCheckout.supportedCardBrands, cardTypeTransforms.visaCheckout)
    };
  }

  if (configuration.masterpass) {
    response.masterpass = {
      merchantCheckoutId: configuration.masterpass.merchantCheckoutId,
      supportedNetworks: mapCardTypes(configuration.masterpass.supportedCardBrands, cardTypeTransforms.masterpass)
    };
  }

  if (configuration.usBankAccount) {
    response.usBankAccount = {
      routeId: configuration.usBankAccount.routeId,
      plaid: {
        publicKey: configuration.usBankAccount.plaidPublicKey
      }
    };
  }

  return response;
}

function mapCardTypes(cardTypes, cardTypeTransformMap) {
  return cardTypes.reduce(function (acc, type) {
    if (cardTypeTransformMap.hasOwnProperty(type)) {
      return acc.concat(cardTypeTransformMap[type]);
    }

    return acc;
  }, []);
}

module.exports = configurationResponseAdapter;

},{"../../../../lib/assign":95,"./error":65}],64:[function(require,module,exports){
'use strict';

var errorResponseAdapter = require('./error');

var CARD_BRAND_MAP = {
  /* eslint-disable camelcase */
  AMERICAN_EXPRESS: 'American Express',
  DINERS: 'Discover',
  DISCOVER: 'Discover',
  INTERNATIONAL_MAESTRO: 'Maestro',
  JCB: 'JCB',
  MASTERCARD: 'MasterCard',
  UK_MAESTRO: 'Maestro',
  UNION_PAY: 'Union Pay',
  VISA: 'Visa'
  /* eslint-enable camelcase */
};

var BIN_DATA_MAP = {
  YES: 'Yes',
  NO: 'No',
  UNKNOWN: 'Unknown'
};

var AUTHENTICATION_INSIGHT_MAP = {
  PSDTWO: 'psd2'
};

function creditCardTokenizationResponseAdapter(responseBody) {
  var adaptedResponse;

  if (responseBody.data && !responseBody.errors) {
    adaptedResponse = adaptTokenizeCreditCardResponseBody(responseBody);
  } else {
    adaptedResponse = errorResponseAdapter(responseBody);
  }

  return adaptedResponse;
}

function adaptTokenizeCreditCardResponseBody(body) {
  var data = body.data.tokenizeCreditCard;
  var creditCard = data.creditCard;
  var lastTwo = creditCard.last4 ? creditCard.last4.substr(2, 4) : '';
  var binData = creditCard.binData;
  var response, regulationEnvironment;

  if (binData) {
    ['commercial', 'debit', 'durbinRegulated', 'healthcare', 'payroll', 'prepaid'].forEach(function (key) {
      if (binData[key]) {
        binData[key] = BIN_DATA_MAP[binData[key]];
      } else {
        binData[key] = 'Unknown';
      }
    });

    ['issuingBank', 'countryOfIssuance', 'productId'].forEach(function (key) {
      if (!binData[key]) { binData[key] = 'Unknown'; }
    });
  }

  response = {
    creditCards: [
      {
        binData: binData,
        consumed: false,
        description: lastTwo ? 'ending in ' + lastTwo : '',
        nonce: data.token,
        details: {
          cardholderName: creditCard.cardholderName,
          expirationMonth: creditCard.expirationMonth,
          expirationYear: creditCard.expirationYear,
          bin: creditCard.bin || '',
          cardType: CARD_BRAND_MAP[creditCard.brandCode] || 'Unknown',
          lastFour: creditCard.last4 || '',
          lastTwo: lastTwo
        },
        type: 'CreditCard',
        threeDSecureInfo: null
      }
    ]
  };

  if (data.authenticationInsight) {
    regulationEnvironment = data.authenticationInsight.customerAuthenticationRegulationEnvironment;
    response.creditCards[0].authenticationInsight = {
      regulationEnvironment: AUTHENTICATION_INSIGHT_MAP[regulationEnvironment] || regulationEnvironment.toLowerCase()
    };
  }

  return response;
}

module.exports = creditCardTokenizationResponseAdapter;

},{"./error":65}],65:[function(require,module,exports){
'use strict';

function errorResponseAdapter(responseBody) {
  var response;
  var errorClass = responseBody.errors &&
    responseBody.errors[0] &&
    responseBody.errors[0].extensions &&
    responseBody.errors[0].extensions.errorClass;

  if (errorClass === 'VALIDATION') {
    response = userErrorResponseAdapter(responseBody);
  } else if (errorClass) {
    response = errorWithClassResponseAdapter(responseBody);
  } else {
    response = {error: {message: 'There was a problem serving your request'}, fieldErrors: []};
  }

  return response;
}

function errorWithClassResponseAdapter(responseBody) {
  return {error: {message: responseBody.errors[0].message}, fieldErrors: []};
}

function userErrorResponseAdapter(responseBody) {
  var fieldErrors = buildFieldErrors(responseBody.errors);

  if (fieldErrors.length === 0) {
    return {error: {message: responseBody.errors[0].message}};
  }

  return {error: {message: getLegacyMessage(fieldErrors)}, fieldErrors: fieldErrors};
}

function buildFieldErrors(errors) {
  var fieldErrors = [];

  errors.forEach(function (error) {
    if (!(error.extensions && error.extensions.inputPath)) {
      return;
    }
    addFieldError(error.extensions.inputPath.slice(1), error, fieldErrors);
  });

  return fieldErrors;
}

function addFieldError(inputPath, errorDetail, fieldErrors) {
  var fieldError;
  var legacyCode = errorDetail.extensions.legacyCode;
  var inputField = inputPath[0];

  if (inputPath.length === 1) {
    fieldErrors.push({
      code: legacyCode,
      field: inputField,
      message: errorDetail.message
    });

    return;
  }

  fieldErrors.forEach(function (candidate) {
    if (candidate.field === inputField) {
      fieldError = candidate;
    }
  });

  if (!fieldError) {
    fieldError = {field: inputField, fieldErrors: []};
    fieldErrors.push(fieldError);
  }

  addFieldError(inputPath.slice(1), errorDetail, fieldError.fieldErrors);
}

function getLegacyMessage(errors) {
  var legacyMessages = {
    creditCard: 'Credit card is invalid'
  };

  var field = errors[0].field;

  return legacyMessages[field];
}

module.exports = errorResponseAdapter;

},{}],66:[function(require,module,exports){
'use strict';

var CONFIGURATION_QUERY = 'query ClientConfiguration { ' +
'  clientConfiguration { ' +
'    analyticsUrl ' +
'    environment ' +
'    merchantId ' +
'    assetsUrl ' +
'    clientApiUrl ' +
'    creditCard { ' +
'      supportedCardBrands ' +
'      challenges ' +
'      threeDSecureEnabled ' +
'      threeDSecure { ' +
'        cardinalAuthenticationJWT ' +
'      } ' +
'    } ' +
'    applePayWeb { ' +
'      countryCode ' +
'      currencyCode ' +
'      merchantIdentifier ' +
'      supportedCardBrands ' +
'    } ' +
'    googlePay { ' +
'      displayName ' +
'      supportedCardBrands ' +
'      environment ' +
'      googleAuthorization ' +
'      paypalClientId ' +
'    } ' +
'    ideal { ' +
'      routeId ' +
'      assetsUrl ' +
'    } ' +
'    kount { ' +
'      merchantId ' +
'    } ' +
'    masterpass { ' +
'      merchantCheckoutId ' +
'      supportedCardBrands ' +
'    } ' +
'    paypal { ' +
'      displayName ' +
'      clientId ' +
'      privacyUrl ' +
'      userAgreementUrl ' +
'      assetsUrl ' +
'      environment ' +
'      environmentNoNetwork ' +
'      unvettedMerchant ' +
'      braintreeClientId ' +
'      billingAgreementsEnabled ' +
'      merchantAccountId ' +
'      currencyCode ' +
'      payeeEmail ' +
'    } ' +
'    unionPay { ' +
'      merchantAccountId ' +
'    } ' +
'    usBankAccount { ' +
'      routeId ' +
'      plaidPublicKey ' +
'    } ' +
'    venmo { ' +
'      merchantId ' +
'      accessToken ' +
'      environment ' +
'    } ' +
'    visaCheckout { ' +
'      apiKey ' +
'      externalClientId ' +
'      supportedCardBrands ' +
'    } ' +
'    braintreeApi { ' +
'      accessToken ' +
'      url ' +
'    } ' +
'    supportedFeatures ' +
'  } ' +
'}';

function configuration() {
  return {
    query: CONFIGURATION_QUERY,
    operationName: 'ClientConfiguration'
  };
}

module.exports = configuration;

},{}],67:[function(require,module,exports){
'use strict';

var assign = require('../../../../lib/assign').assign;

function createMutation(config) {
  var hasAuthenticationInsight = config.hasAuthenticationInsight;
  var mutation = 'mutation TokenizeCreditCard($input: TokenizeCreditCardInput!';

  if (hasAuthenticationInsight) {
    mutation += ', $authenticationInsightInput: AuthenticationInsightInput!';
  }

  mutation += ') { ' +
    '  tokenizeCreditCard(input: $input) { ' +
    '    token ' +
    '    creditCard { ' +
    '      bin ' +
    '      brandCode ' +
    '      last4 ' +
    '      cardholderName ' +
    '      expirationMonth' +
    '      expirationYear' +
    '      binData { ' +
    '        prepaid ' +
    '        healthcare ' +
    '        debit ' +
    '        durbinRegulated ' +
    '        commercial ' +
    '        payroll ' +
    '        issuingBank ' +
    '        countryOfIssuance ' +
    '        productId ' +
    '      } ' +
    '    } ';

  if (hasAuthenticationInsight) {
    mutation += '    authenticationInsight(input: $authenticationInsightInput) {' +
      '      customerAuthenticationRegulationEnvironment' +
      '    }';
  }

  mutation += '  } ' +
    '}';

  return mutation;
}

function createCreditCardTokenizationBody(body, options) {
  var cc = body.creditCard;
  var billingAddress = cc && cc.billingAddress;
  var expDate = cc && cc.expirationDate;
  var expirationMonth = cc && (cc.expirationMonth || (expDate && expDate.split('/')[0].trim()));
  var expirationYear = cc && (cc.expirationYear || (expDate && expDate.split('/')[1].trim()));
  var variables = {
    input: {
      creditCard: {
        number: cc && cc.number,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        cvv: cc && cc.cvv,
        cardholderName: cc && cc.cardholderName
      },
      options: {}
    }
  };

  if (options.hasAuthenticationInsight) {
    variables.authenticationInsightInput = {
      merchantAccountId: body.merchantAccountId
    };
  }

  if (billingAddress) {
    variables.input.creditCard.billingAddress = billingAddress;
  }

  variables.input = addValidationRule(body, variables.input);

  return variables;
}

function addValidationRule(body, input) {
  var validate;

  if (body.creditCard && body.creditCard.options && typeof body.creditCard.options.validate === 'boolean') {
    validate = body.creditCard.options.validate;
  } else if ((body.authorizationFingerprint && body.tokenizationKey) || body.authorizationFingerprint) {
    validate = true;
  } else if (body.tokenizationKey) {
    validate = false;
  }

  if (typeof validate === 'boolean') {
    input.options = assign({
      validate: validate
    }, input.options);
  }

  return input;
}

function creditCardTokenization(body) {
  var options = {
    hasAuthenticationInsight: Boolean(body.authenticationInsight && body.merchantAccountId)
  };

  return {
    query: createMutation(options),
    variables: createCreditCardTokenizationBody(body, options),
    operationName: 'TokenizeCreditCard'
  };
}

module.exports = creditCardTokenization;

},{"../../../../lib/assign":95}],68:[function(require,module,exports){
'use strict';

var browserDetection = require('../../browser-detection');

var features = {
  tokenize_credit_cards: 'payment_methods/credit_cards', // eslint-disable-line camelcase
  configuration: 'configuration'
};

var disallowedInputPaths = [
  'creditCard.options.unionPayEnrollment'
];

function GraphQL(config) {
  this._config = config.graphQL;
}

GraphQL.prototype.getGraphQLEndpoint = function () {
  return this._config.url;
};

GraphQL.prototype.isGraphQLRequest = function (url, body) {
  var featureEnabled;
  var path = this.getClientApiPath(url);

  if (!this._isGraphQLEnabled() || !path || browserDetection.isIe9()) {
    return false;
  }

  featureEnabled = this._config.features.some(function (feature) {
    return features[feature] === path;
  });

  if (containsDisallowedlistedKeys(body)) {
    return false;
  }

  return featureEnabled;
};

GraphQL.prototype.getClientApiPath = function (url) {
  var path;
  var clientApiPrefix = '/client_api/v1/';
  var pathParts = url.split(clientApiPrefix);

  if (pathParts.length > 1) {
    path = pathParts[1].split('?')[0];
  }

  return path;
};

GraphQL.prototype._isGraphQLEnabled = function () {
  return Boolean(this._config);
};

function containsDisallowedlistedKeys(body) {
  return disallowedInputPaths.some(function (keys) {
    var value = keys.split('.').reduce(function (accumulator, key) {
      return accumulator && accumulator[key];
    }, body);

    return value !== undefined; // eslint-disable-line no-undefined
  });
}

module.exports = GraphQL;

},{"../../browser-detection":54}],69:[function(require,module,exports){
'use strict';

var BRAINTREE_VERSION = require('../../constants').BRAINTREE_VERSION;

var assign = require('../../../lib/assign').assign;

var creditCardTokenizationBodyGenerator = require('./generators/credit-card-tokenization');
var creditCardTokenizationResponseAdapter = require('./adapters/credit-card-tokenization');

var configurationBodyGenerator = require('./generators/configuration');
var configurationResponseAdapter = require('./adapters/configuration');

var generators = {
  'payment_methods/credit_cards': creditCardTokenizationBodyGenerator,
  configuration: configurationBodyGenerator
};
var adapters = {
  'payment_methods/credit_cards': creditCardTokenizationResponseAdapter,
  configuration: configurationResponseAdapter
};

function GraphQLRequest(options) {
  var clientApiPath = options.graphQL.getClientApiPath(options.url);

  this._graphQL = options.graphQL;
  this._data = options.data;
  this._method = options.method;
  this._headers = options.headers;
  this._clientSdkMetadata = {
    source: options.metadata.source,
    integration: options.metadata.integration,
    sessionId: options.metadata.sessionId
  };
  this._sendAnalyticsEvent = options.sendAnalyticsEvent || Function.prototype;

  this._generator = generators[clientApiPath];
  this._adapter = adapters[clientApiPath];

  this._sendAnalyticsEvent('graphql.init');
}

GraphQLRequest.prototype.getUrl = function () {
  return this._graphQL.getGraphQLEndpoint();
};

GraphQLRequest.prototype.getBody = function () {
  var formattedBody = formatBodyKeys(this._data);
  var generatedBody = this._generator(formattedBody);
  var body = assign({clientSdkMetadata: this._clientSdkMetadata}, generatedBody);

  return JSON.stringify(body);
};

GraphQLRequest.prototype.getMethod = function () {
  return 'POST';
};

GraphQLRequest.prototype.getHeaders = function () {
  var authorization, headers;

  if (this._data.authorizationFingerprint) {
    this._sendAnalyticsEvent('graphql.authorization-fingerprint');
    authorization = this._data.authorizationFingerprint;
  } else {
    this._sendAnalyticsEvent('graphql.tokenization-key');
    authorization = this._data.tokenizationKey;
  }

  headers = {
    Authorization: 'Bearer ' + authorization,
    'Braintree-Version': BRAINTREE_VERSION
  };

  return assign({}, this._headers, headers);
};

GraphQLRequest.prototype.adaptResponseBody = function (parsedBody) {
  return this._adapter(parsedBody, this);
};

GraphQLRequest.prototype.determineStatus = function (httpStatus, parsedResponse) {
  var status, errorClass;

  if (httpStatus === 200) {
    errorClass = parsedResponse.errors &&
      parsedResponse.errors[0] &&
      parsedResponse.errors[0].extensions &&
      parsedResponse.errors[0].extensions.errorClass;

    if (parsedResponse.data && !parsedResponse.errors) {
      status = 200;
    } else if (errorClass === 'VALIDATION') {
      status = 422;
    } else if (errorClass === 'AUTHORIZATION') {
      status = 403;
    } else if (errorClass === 'AUTHENTICATION') {
      status = 401;
    } else if (isGraphQLError(errorClass, parsedResponse)) {
      status = 403;
    } else {
      status = 500;
    }
  } else if (!httpStatus) {
    status = 500;
  } else {
    status = httpStatus;
  }

  this._sendAnalyticsEvent('graphql.status.' + httpStatus);
  this._sendAnalyticsEvent('graphql.determinedStatus.' + status);

  return status;
};

function isGraphQLError(errorClass, parsedResponse) {
  return !errorClass && parsedResponse.errors[0].message;
}

function snakeCaseToCamelCase(snakeString) {
  if (snakeString.indexOf('_') === -1) {
    return snakeString;
  }

  return snakeString.toLowerCase().replace(/(\_\w)/g, function (match) {
    return match[1].toUpperCase();
  });
}

function formatBodyKeys(originalBody) {
  var body = {};

  Object.keys(originalBody).forEach(function (key) {
    var camelCaseKey = snakeCaseToCamelCase(key);

    if (typeof originalBody[key] === 'object') {
      body[camelCaseKey] = formatBodyKeys(originalBody[key]);
    } else if (typeof originalBody[key] === 'number') {
      body[camelCaseKey] = String(originalBody[key]);
    } else {
      body[camelCaseKey] = originalBody[key];
    }
  });

  return body;
}

module.exports = GraphQLRequest;

},{"../../../lib/assign":95,"../../constants":56,"./adapters/configuration":63,"./adapters/credit-card-tokenization":64,"./generators/configuration":66,"./generators/credit-card-tokenization":67}],70:[function(require,module,exports){
'use strict';

var ajaxIsAvaliable;
var once = require('../../lib/once');
var JSONPDriver = require('./jsonp-driver');
var AJAXDriver = require('./ajax-driver');
var getUserAgent = require('./get-user-agent');
var isHTTP = require('./is-http');

function isAjaxAvailable() {
  if (ajaxIsAvaliable == null) {
    ajaxIsAvaliable = !(isHTTP() && /MSIE\s(8|9)/.test(getUserAgent()));
  }

  return ajaxIsAvaliable;
}

module.exports = function (options, cb) {
  cb = once(cb || Function.prototype);
  options.method = (options.method || 'GET').toUpperCase();
  options.timeout = options.timeout == null ? 60000 : options.timeout;
  options.data = options.data || {};

  if (isAjaxAvailable()) {
    AJAXDriver.request(options, cb);
  } else {
    JSONPDriver.request(options, cb);
  }
};

},{"../../lib/once":129,"./ajax-driver":60,"./get-user-agent":62,"./is-http":71,"./jsonp-driver":72}],71:[function(require,module,exports){
'use strict';

module.exports = function () {
  return window.location.protocol === 'http:';
};

},{}],72:[function(require,module,exports){
'use strict';

var head;
var uuid = require('@braintree/uuid');
var querystring = require('../../lib/querystring');
var timeouts = {};

function _removeScript(script) {
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

function _createScriptTag(url, callbackName) {
  var script = document.createElement('script');
  var done = false;

  script.src = url;
  script.async = true;
  script.onerror = function () {
    window[callbackName]({message: 'error', status: 500});
  };

  script.onload = script.onreadystatechange = function () {
    if (done) { return; }

    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      done = true;
      script.onload = script.onreadystatechange = null;
    }
  };

  return script;
}

function _cleanupGlobal(callbackName) {
  try {
    delete window[callbackName];
  } catch (_) {
    window[callbackName] = null;
  }
}

function _setupTimeout(timeout, callbackName) {
  timeouts[callbackName] = setTimeout(function () {
    timeouts[callbackName] = null;

    window[callbackName]({
      error: 'timeout',
      status: -1
    });

    window[callbackName] = function () {
      _cleanupGlobal(callbackName);
    };
  }, timeout);
}

function _setupGlobalCallback(script, callback, callbackName) {
  window[callbackName] = function (response) {
    var status = response.status || 500;
    var err = null;
    var data = null;

    delete response.status;

    if (status >= 400 || status < 200) {
      err = response;
    } else {
      data = response;
    }

    _cleanupGlobal(callbackName);
    _removeScript(script);

    clearTimeout(timeouts[callbackName]);
    callback(err, data, status);
  };
}

function request(options, callback) {
  var script;
  var callbackName = 'callback_json_' + uuid().replace(/-/g, '');
  var url = options.url;
  var attrs = options.data;
  var method = options.method;
  var timeout = options.timeout;

  url = querystring.queryify(url, attrs);
  url = querystring.queryify(url, {
    _method: method,
    callback: callbackName
  });

  script = _createScriptTag(url, callbackName);
  _setupGlobalCallback(script, callback, callbackName);
  _setupTimeout(timeout, callbackName);

  if (!head) {
    head = document.getElementsByTagName('head')[0];
  }

  head.appendChild(script);
}

module.exports = {
  request: request
};

},{"../../lib/querystring":131,"@braintree/uuid":46}],73:[function(require,module,exports){
'use strict';

module.exports = function (body) {
  try {
    body = JSON.parse(body);
  } catch (e) { /* ignored */ }

  return body;
};

},{}],74:[function(require,module,exports){
'use strict';

module.exports = function (method, body) {
  if (typeof method !== 'string') {
    throw new Error('Method must be a string');
  }

  if (method.toLowerCase() !== 'get' && body != null) {
    body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return body;
};

},{}],75:[function(require,module,exports){
'use strict';

var isXHRAvailable = typeof window !== 'undefined' && window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();

function getRequestObject() {
  return isXHRAvailable ? new window.XMLHttpRequest() : new window.XDomainRequest();
}

module.exports = {
  isAvailable: isXHRAvailable,
  getRequestObject: getRequestObject
};

},{}],76:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Google Payment - Creation Error Codes
 * @description Errors that occur when [creating the Google Payment component](./module-braintree-web_google-payment.html#.create).
 * @property {MERCHANT} GOOGLE_PAYMENT_NOT_ENABLED Occurs when Google Pay is not enabled on the Braintree control panel.
 * @property {MERCHANT} GOOGLE_PAYMENT_UNSUPPORTED_VERSION Occurs when a Google Pay version is used that is not supported by the Braintree SDK.
 */

/**
 * @name BraintreeError.Google Payment - parseResponse Error Codes
 * @description Errors that occur when [parsing the response from Google](./GooglePayment.html#parseResponse).
 * @property {UNKNOWN} GOOGLE_PAYMENT_GATEWAY_ERROR Occurs when Google Pay could not be tokenized.
 */

var BraintreeError = require('../lib/braintree-error');

module.exports = {
  GOOGLE_PAYMENT_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'GOOGLE_PAYMENT_NOT_ENABLED',
    message: 'Google Pay is not enabled for this merchant.'
  },
  GOOGLE_PAYMENT_GATEWAY_ERROR: {
    code: 'GOOGLE_PAYMENT_GATEWAY_ERROR',
    message: 'There was an error when tokenizing the Google Pay payment method.',
    type: BraintreeError.types.UNKNOWN
  },
  GOOGLE_PAYMENT_UNSUPPORTED_VERSION: {
    code: 'GOOGLE_PAYMENT_UNSUPPORTED_VERSION',
    type: BraintreeError.types.MERCHANT
  }
};

},{"../lib/braintree-error":98}],77:[function(require,module,exports){
'use strict';

var analytics = require('../lib/analytics');
var assign = require('../lib/assign').assign;
var convertMethodsToError = require('../lib/convert-methods-to-error');
var find = require('../lib/find');
var generateGooglePayConfiguration = require('../lib/generate-google-pay-configuration');
var BraintreeError = require('../lib/braintree-error');
var errors = require('./errors');
var methods = require('../lib/methods');
var Promise = require('../lib/promise');
var wrapPromise = require('@braintree/wrap-promise');

var CREATE_PAYMENT_DATA_REQUEST_METHODS = {
  1: '_createV1PaymentDataRequest',
  2: '_createV2PaymentDataRequest'
};

/**
 * @typedef {object} GooglePayment~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {boolean} details.isNetworkTokenized True if the card is network tokenized.
 * @property {string} details.bin First six digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, `CreditCard` or `AndroidPayCard`.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 */

/**
 * @class GooglePayment
 * @param {object} options Google Payment {@link module:braintree-web/google-payment.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/google-payment.create|braintree-web.google-payment.create} instead.</strong>
 * @classdesc This class represents a Google Payment component produced by {@link module:braintree-web/google-payment.create|braintree-web/google-payment.create}. Instances of this class have methods for initializing the Google Pay flow.
 */
function GooglePayment(options) {
  this._createPromise = options.createPromise;
  this._client = options.client;
  this._useDeferredClient = options.useDeferredClient;
  // NEXT_MAJOR_VERSION this should be updated to 2 (or whatever the current latest version is)
  this._googlePayVersion = options.googlePayVersion || 1;
  this._googleMerchantId = options.googleMerchantId;

  if (this._isUnsupportedGooglePayAPIVersion()) {
    throw new BraintreeError({
      code: errors.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.code,
      message: 'The Braintree SDK does not support Google Pay version ' + this._googlePayVersion + '. Please upgrade the version of your Braintree SDK and contact support if this error persists.',
      type: errors.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.type
    });
  }
}

GooglePayment.prototype._waitForClient = function () {
  if (this._client) {
    return Promise.resolve();
  }

  return this._createPromise.then(function (client) {
    this._client = client;
  }.bind(this));
};

GooglePayment.prototype._isUnsupportedGooglePayAPIVersion = function () {
  // if we don't have createPaymentDatqRequest method for the specific
  // API version, then the version is not supported
  return !(this._googlePayVersion in CREATE_PAYMENT_DATA_REQUEST_METHODS);
};

GooglePayment.prototype._getDefaultConfig = function () {
  if (!this._defaultConfig) {
    this._defaultConfig = generateGooglePayConfiguration(this._client.getConfiguration(), this._googlePayVersion, this._googleMerchantId);
  }

  return this._defaultConfig;
};

GooglePayment.prototype._createV1PaymentDataRequest = function (paymentDataRequest) {
  var defaultConfig = this._getDefaultConfig();
  var overrideCardNetworks = paymentDataRequest.cardRequirements && paymentDataRequest.cardRequirements.allowedCardNetworks;
  var defaultConfigCardNetworks = defaultConfig.cardRequirements.allowedCardNetworks;
  var allowedCardNetworks = overrideCardNetworks || defaultConfigCardNetworks;

  paymentDataRequest = assign({}, defaultConfig, paymentDataRequest);

  // this way we can preserve allowedCardNetworks from default integration
  // if merchant did not pass any in `cardRequirements`
  paymentDataRequest.cardRequirements.allowedCardNetworks = allowedCardNetworks;

  return paymentDataRequest;
};

GooglePayment.prototype._createV2PaymentDataRequest = function (paymentDataRequest) {
  var defaultConfig = this._getDefaultConfig();

  if (paymentDataRequest.allowedPaymentMethods) {
    paymentDataRequest.allowedPaymentMethods.forEach(function (paymentMethod) {
      var defaultPaymentMethod = find(defaultConfig.allowedPaymentMethods, 'type', paymentMethod.type);

      if (defaultPaymentMethod) {
        applyDefaultsToPaymentMethodConfiguration(paymentMethod, defaultPaymentMethod);
      }
    });
  }

  paymentDataRequest = assign({}, defaultConfig, paymentDataRequest);

  return paymentDataRequest;
};

/**
 * Create a configuration object for use in the `loadPaymentData` method.
 *
 * **Note**: Version 1 of the Google Pay Api is deprecated and will become unsupported in a future version. Until then, version 1 will continue to be used by default, and version 1 schema parameters and overrides will remain functional on existing integrations. However, new integrations and all following examples will be presented in the GooglePay version 2 schema. See [Google Pay's upgrade guide](https://developers.google.com/pay/api/web/guides/resources/update-to-latest-version) to see how to update your integration.
 *
 * If `options.googlePayVersion === 2` was set during the initial {@link module:braintree-web/google-payment.create|create} call, overrides must match the Google Pay v2 schema to be valid.
 *
 * @public
 * @param {object} overrides The supplied parameters for creating the PaymentDataRequest object. Required parameters are:
 *  @param {object} overrides.transactionInfo Object according to the [Google Pay Transaction Info](https://developers.google.com/pay/api/web/reference/object#TransactionInfo) spec.
 *  Optionally, any of the parameters in the [PaymentDataRequest](https://developers.google.com/pay/api/web/reference/object#PaymentDataRequest) parameters can be overridden, but note that it is recommended only to override top level parameters to avoid squashing deeply nested configuration objects. An example can be found below showing how to safely edit these deeply nested objects.
 * @example
 * var paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *   merchantInfo: {
 *     merchantId: 'my-merchant-id-from-google'
 *   },
 *   transactionInfo: {
 *     currencyCode: 'USD',
 *     totalPriceStatus: 'FINAL',
 *     totalPrice: '100.00'
 *   }
 * });
 *
 * // Update card payment methods to require billing address
 * var cardPaymentMethod = paymentDataRequest.allowedPaymentMethods;
 * cardPaymentMethod.parameters.billingAddressRequired = true;
 * cardPaymentMethod.parameters.billingAddressParameters = {
 *   format: 'FULL',
 *   phoneNumberRequired: true
 * };
 *
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequest).then(function (response) {
 *   // handle response with googlePaymentInstance.parseResponse
 *   // (see below)
 * });
 * @example <caption>With deferred client</caption>
 * googlePaymentInstance.createPaymentDataRequest({
 *   merchantInfo: {
 *     merchantId: 'my-merchant-id-from-google'
 *   },
 *   transactionInfo: {
 *     currencyCode: 'USD',
 *     totalPriceStatus: 'FINAL',
 *     totalPrice: '100.00'
 *   }
 * }).then(function (paymentDataRequest) {
 *   // Update card payment methods to require billing address
 *   var cardPaymentMethod = paymentDataRequest.allowedPaymentMethods;
 *   cardPaymentMethod.parameters.billingAddressRequired = true;
 *   cardPaymentMethod.parameters.billingAddressParameters = {
 *     format: 'FULL',
 *     phoneNumberRequired: true
 *   };
 *
 *   var paymentsClient = new google.payments.api.PaymentsClient({
 *     environment: 'TEST' // or 'PRODUCTION'
 *   })
 *
 *   return paymentsClient.loadPaymentData(paymentDataRequest);
 * }).then(function (response) {
 *   // handle response with googlePaymentInstance.parseResponse
 *   // (see below)
 * });
 * @returns {object|Promise} Returns a configuration object for Google PaymentDataRequest. If instantiated with `useDeferredClient` and an `authorization` it will return a promise that resolves with the configuration.
 */
GooglePayment.prototype.createPaymentDataRequest = function (overrides) {
  if (!this._useDeferredClient) {
    return this._createPaymentDataRequestSyncronously(overrides);
  }

  return this._waitForClient().then(function () {
    return this._createPaymentDataRequestSyncronously(overrides);
  }.bind(this));
};

GooglePayment.prototype._createPaymentDataRequestSyncronously = function (overrides) {
  var paymentDataRequest = assign({}, overrides);
  var version = this._googlePayVersion;
  var createPaymentDataRequestMethod = CREATE_PAYMENT_DATA_REQUEST_METHODS[version];

  analytics.sendEvent(this._createPromise, 'google-payment.v' + version + '.createPaymentDataRequest');

  return this[createPaymentDataRequestMethod](paymentDataRequest);
};

/**
 * Parse the response from the tokenization.
 * @public
 * @param {object} response The response back from the Google Pay tokenization.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link GooglePay~tokenizePayload|tokenizePayload}. If no callback is provided, `parseResponse` returns a promise that resolves with a {@link GooglePayment~tokenizePayload|tokenizePayload}.
 * @example with callback
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequestFromCreatePaymentDataRequest).then(function (response) {
 *   googlePaymentInstance.parseResponse(response, function (err, data) {
 *     if (err) {
 *       // handle errors
 *     }
 *     // send parsedResponse.nonce to your server
 *   });
 * });
 * @example with promise
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequestFromCreatePaymentDataRequest).then(function (response) {
 *   return googlePaymentInstance.parseResponse(response);
 * }).then(function (parsedResponse) {
 *   // send parsedResponse.nonce to your server
 * }).catch(function (err) {
 *   // handle errors
 * });
 * @returns {(Promise|void)} Returns a promise that resolves the parsed response if no callback is provided.
 */
GooglePayment.prototype.parseResponse = function (response) {
  var self = this;

  return Promise.resolve().then(function () {
    var payload;
    var rawResponse = response.apiVersion === 2 ?
      response.paymentMethodData.tokenizationData.token :
      response.paymentMethodToken.token;
    var parsedResponse = JSON.parse(rawResponse);
    var error = parsedResponse.error;

    if (error) {
      return Promise.reject(error);
    }

    analytics.sendEvent(self._createPromise, 'google-payment.parseResponse.succeeded');

    if (parsedResponse.paypalAccounts) {
      payload = parsedResponse.paypalAccounts[0];
      analytics.sendEvent(self._createPromise, 'google-payment.parseResponse.succeeded.paypal');

      return Promise.resolve({
        nonce: payload.nonce,
        type: payload.type,
        description: payload.description
      });
    }
    payload = parsedResponse.androidPayCards[0];
    analytics.sendEvent(self._createPromise, 'google-payment.parseResponse.succeeded.google-payment');

    return Promise.resolve({
      nonce: payload.nonce,
      type: payload.type,
      description: payload.description,
      details: {
        cardType: payload.details.cardType,
        lastFour: payload.details.lastFour,
        lastTwo: payload.details.lastTwo,
        isNetworkTokenized: payload.details.isNetworkTokenized,
        bin: payload.details.bin
      },
      binData: payload.binData
    });
  }).catch(function (error) {
    analytics.sendEvent(self._createPromise, 'google-payment.parseResponse.failed');

    return Promise.reject(new BraintreeError({
      code: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.code,
      message: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.message,
      type: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.type,
      details: {
        originalError: error
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/google-payment.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * googlePaymentInstance.teardown();
 * @example <caption>With callback</caption>
 * googlePaymentInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
GooglePayment.prototype.teardown = function () {
  convertMethodsToError(this, methods(GooglePayment.prototype));

  return Promise.resolve();
};

function applyDefaultsToPaymentMethodConfiguration(merchantSubmittedPaymentMethod, defaultPaymentMethod) {
  Object.keys(defaultPaymentMethod).forEach(function (parameter) {
    if (typeof defaultPaymentMethod[parameter] === 'object') {
      merchantSubmittedPaymentMethod[parameter] = assign(
        {},
        defaultPaymentMethod[parameter],
        merchantSubmittedPaymentMethod[parameter]
      );
    } else {
      merchantSubmittedPaymentMethod[parameter] = merchantSubmittedPaymentMethod[parameter] || defaultPaymentMethod[parameter];
    }
  });
}

module.exports = wrapPromise.wrapPrototype(GooglePayment);

},{"../lib/analytics":93,"../lib/assign":95,"../lib/braintree-error":98,"../lib/convert-methods-to-error":100,"../lib/find":110,"../lib/generate-google-pay-configuration":122,"../lib/methods":128,"../lib/promise":130,"./errors":76,"@braintree/wrap-promise":50}],78:[function(require,module,exports){
'use strict';
/**
 * @module braintree-web/google-payment
 * @description A component to integrate with Google Pay. The majority of the integration uses [Google's pay.js JavaScript file](https://pay.google.com/gp/p/js/pay.js). The Braintree component generates the configuration object necessary for Google Pay to initiate the Payment Request and parse the returned data to retrieve the payment method nonce which is used to process the transaction on the server.
 */

var GooglePayment = require('./google-payment');
var BraintreeError = require('../lib/braintree-error');
var Promise = require('../lib/promise');
var createAssetsUrl = require('../lib/create-assets-url');
var createDeferredClient = require('../lib/create-deferred-client');
var basicComponentVerification = require('../lib/basic-component-verification');
var wrapPromise = require('@braintree/wrap-promise');
var VERSION = "3.78.2";
var errors = require('./errors');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {boolean} [options.useDeferredClient] Used in conjunction with `authorization`, allows the Google Payment instance to be available right away by fetching the client configuration in the background. When this option is used, {@link GooglePayment#createPaymentDataRequest} will return a promise that resolves with the configuration instead of returning synchronously.
 * @param {number} [options.googlePayVersion] The version of the Google Pay API to use. Value of 2 is required to accept parameters documented [by Google](https://developers.google.com/pay/api/web/reference/object). Omit this parameter to use the deprecated Google Pay Version 1.
 * @param {string} [options.googleMerchantId] A Google merchant identifier issued after your website is approved by Google. Required when PaymentsClient is initialized with an environment property of PRODUCTION, but may be omitted in TEST environment.
 * @param {callback} [callback] The second argument, `data`, is the {@link GooglePayment} instance. If no callback is provided, `create` returns a promise that resolves with the {@link GooglePayment} instance.
 * @example <caption>Simple Example</caption>
 * // include https://pay.google.com/gp/p/js/pay.js in a script tag
 * // on your page to load the `google.payments.api.PaymentsClient` global object.
 *
 * var paymentButton = document.querySelector('#google-pay-button');
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * });
 *
 * braintree.client.create({
 *   authorization: 'tokenization-key-or-client-token'
 * }).then(function (clientInstance) {
 *   return braintree.googlePayment.create({
 *     client: clientInstance,
*      googlePayVersion: 2,
*      googleMerchantId: 'your-merchant-id-from-google'
 *   });
 * }).then(function (googlePaymentInstance) {
 *   paymentButton.addEventListener('click', function (event) {
 *     var paymentDataRequest;
 *
 *     event.preventDefault();
 *
 *     paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *       transactionInfo: {
 *         currencyCode: 'USD',
 *         totalPriceStatus: 'FINAL',
 *         totalPrice: '100.00'
 *       }
 *     });
 *
 *     paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
 *       return googlePaymentInstance.parseResponse(paymentData);
 *     }).then(function (result) {
 *       // send result.nonce to your server
 *     }).catch(function (err) {
 *       // handle err
 *     });
 *   });
 * });
 * @example <caption>Check Browser and Customer Compatibility</caption>
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * });
 *
 * function setupGooglePayButton(googlePaymentInstance) {
 *   var button = document.createElement('button');
 *
 *   button.id = 'google-pay';
 *   button.appendChild(document.createTextNode('Google Pay'));
 *   button.addEventListener('click', function (event) {
 *     var paymentRequestData;
 *
 *     event.preventDefault();
 *
 *     paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *       transactionInfo: {
 *         currencyCode: 'USD',
 *         totalPriceStatus: 'FINAL',
 *         totalPrice: '100.00' // your amount
 *       }
 *     });
 *
 *     paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
 *       return googlePaymentInstance.parseResponse(paymentData);
*       }).then(function (result) {
 *       // send result.nonce to your server
 *     }).catch(function (err) {
 *       // handle errors
 *     });
 *   });
 *
 *   document.getElementById('container').appendChild(button);
 * }
 *
 * braintree.client.create({
 *   authorization: 'tokenization-key-or-client-token'
 * }).then(function (clientInstance) {
 *   return braintree.googlePayment.create({
 *     client: clientInstance,
 *     googlePayVersion: 2,
 *     googleMerchantId: 'your-merchant-id-from-google'
 *   });
 * }).then(function (googlePaymentInstance) {
 *
 *   return paymentsClient.isReadyToPay({
 *     // see https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest for all options
 *     apiVersion: 2,
 *     apiVersionMinor: 0,
 *     allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
 *     existingPaymentMethodRequired: true
 *   });
 * }).then(function (response) {
 *   if (response.result) {
 *     setupGooglePayButton(googlePaymentInstance);
 *   }
 * }).catch(function (err) {
 *   // handle setup errors
 * });
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'Google Pay';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    var createPromise, instance;

    createPromise = createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    }).then(function (client) {
      var configuration = client.getConfiguration();

      options.client = client;
      if (!configuration.gatewayConfiguration.androidPay) {
        return Promise.reject(new BraintreeError(errors.GOOGLE_PAYMENT_NOT_ENABLED));
      }

      return client;
    });

    options.createPromise = createPromise;
    instance = new GooglePayment(options);

    if (!options.useDeferredClient) {
      return createPromise.then(function (client) {
        instance._client = client;

        return instance;
      });
    }

    return instance;
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":96,"../lib/braintree-error":98,"../lib/create-assets-url":102,"../lib/create-deferred-client":104,"../lib/promise":130,"./errors":76,"./google-payment":77,"@braintree/wrap-promise":50}],79:[function(require,module,exports){
'use strict';

var BraintreeError = require('../../lib/braintree-error');
var errors = require('../shared/errors');
var allowedAttributes = require('../shared/constants').allowedAttributes;

function attributeValidationError(attribute, value) {
  var err;

  if (!allowedAttributes.hasOwnProperty(attribute)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
      message: 'The "' + attribute + '" attribute is not supported in Hosted Fields.'
    });
  } else if (value != null && !_isValid(attribute, value)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
      message: 'Value "' + value + '" is not allowed for "' + attribute + '" attribute.'
    });
  }

  return err;
}

function _isValid(attribute, value) {
  if (allowedAttributes[attribute] === 'string') {
    return typeof value === 'string' || typeof value === 'number';
  } else if (allowedAttributes[attribute] === 'boolean') {
    return String(value) === 'true' || String(value) === 'false';
  }

  return false;
}

module.exports = attributeValidationError;

},{"../../lib/braintree-error":98,"../shared/constants":87,"../shared/errors":88}],80:[function(require,module,exports){
'use strict';

var constants = require('../shared/constants');
var useMin = require('../../lib/use-min');

module.exports = function composeUrl(assetsUrl, componentId, isDebug) {
  return assetsUrl +
    '/web/' +
    constants.VERSION +
    '/html/hosted-fields-frame' + useMin(isDebug) + '.html#' +
    componentId;
};

},{"../../lib/use-min":133,"../shared/constants":87}],81:[function(require,module,exports){
'use strict';

var directions = require('../shared/constants').navigationDirections;
var browserDetection = require('../shared/browser-detection');
var focusIntercept = require('../shared/focus-intercept');
var findParentTags = require('../shared/find-parent-tags');
var userFocusableTagNames = [
  'INPUT', 'SELECT', 'TEXTAREA'
];
// Devices with software keyboards do not or cannot focus on input types
// that do not require keyboard-based interaction.
var unfocusedInputTypes = [
  'hidden', 'button', 'reset', 'submit', 'checkbox', 'radio', 'file'
];

function _isUserFocusableElement(element) {
  if (!browserDetection.hasSoftwareKeyboard()) {
    // on desktop browsers, the only input type that isn't focusable
    // is the hidden input
    return element.type !== 'hidden';
  }

  return userFocusableTagNames.indexOf(element.tagName) > -1 &&
    unfocusedInputTypes.indexOf(element.type) < 0;
}

function _createNavigationHelper(direction, numberOfElementsInForm) {
  switch (direction) {
    case directions.BACK:
      return {
        checkIndexBounds: function (index) {
          return index < 0;
        },
        indexChange: -1
      };
    case directions.FORWARD:
      return {
        checkIndexBounds: function (index) {
          return index > numberOfElementsInForm - 1;
        },
        indexChange: 1
      };
    default:
  }

  return {};
}

function _findFirstFocusableElement(elementsInForm) {
  var elementsIndex, element;

  for (elementsIndex = 0; elementsIndex < elementsInForm.length; elementsIndex++) {
    element = elementsInForm[elementsIndex];

    if (_isUserFocusableElement(element)) {
      return element;
    }
  }

  return null;
}

module.exports = {
  removeExtraFocusElements: function (checkoutForm, onRemoveFocusIntercepts) {
    var elements = Array.prototype.slice.call(checkoutForm.elements);
    var firstFocusableInput = _findFirstFocusableElement(elements);
    var lastFocusableInput = _findFirstFocusableElement(elements.reverse());

    // these should never be identical, because there will at least be the
    // before and the after input
    [
      firstFocusableInput,
      lastFocusableInput
    ].forEach(function (input) {
      if (!input) {
        return;
      }

      if (focusIntercept.matchFocusElement(input.getAttribute('id'))) {
        onRemoveFocusIntercepts(input.getAttribute('id'));
      }
    });
  },

  createFocusChangeHandler: function (hostedFieldsId, callbacks) {
    return function (data) {
      var currentIndex, targetElement, checkoutForm, navHelper;
      var sourceElement = document.getElementById('bt-' + data.field + '-' + data.direction + '-' + hostedFieldsId);

      if (!sourceElement) {
        return;
      }

      checkoutForm = findParentTags(sourceElement, 'form')[0];

      if (document.forms.length < 1 || !checkoutForm) {
        callbacks.onRemoveFocusIntercepts();

        return;
      }

      checkoutForm = [].slice.call(checkoutForm.elements);
      currentIndex = checkoutForm.indexOf(sourceElement);
      navHelper = _createNavigationHelper(data.direction, checkoutForm.length);

      do {
        currentIndex += navHelper.indexChange;
        if (navHelper.checkIndexBounds(currentIndex)) {
          return;
        }
        targetElement = checkoutForm[currentIndex];
      } while (!_isUserFocusableElement(targetElement));

      if (focusIntercept.matchFocusElement(targetElement.getAttribute('id'))) {
        callbacks.onTriggerInputFocus(targetElement.getAttribute('data-braintree-type'));
      } else {
        targetElement.focus();
      }
    };
  }
};

},{"../shared/browser-detection":86,"../shared/constants":87,"../shared/find-parent-tags":89,"../shared/focus-intercept":90}],82:[function(require,module,exports){
'use strict';

var allowedStyles = require('../shared/constants').allowedStyles;

module.exports = function getStylesFromClass(cssClass) {
  var element = document.createElement('input');
  var styles = {};
  var computedStyles;

  if (cssClass[0] === '.') {
    cssClass = cssClass.substring(1);
  }

  element.className = cssClass;
  element.style.display = 'none !important';
  element.style.position = 'fixed !important';
  element.style.left = '-99999px !important';
  element.style.top = '-99999px !important';
  document.body.appendChild(element);

  computedStyles = window.getComputedStyle(element);

  allowedStyles.forEach(function (style) {
    var value = computedStyles[style];

    if (value) {
      styles[style] = value;
    }
  });

  document.body.removeChild(element);

  return styles;
};

},{"../shared/constants":87}],83:[function(require,module,exports){
'use strict';

var assign = require('../../lib/assign').assign;
var createAssetsUrl = require('../../lib/create-assets-url');
var isVerifiedDomain = require('../../lib/is-verified-domain');
var Destructor = require('../../lib/destructor');
var classList = require('@braintree/class-list');
var iFramer = require('@braintree/iframer');
var Bus = require('framebus');
var createDeferredClient = require('../../lib/create-deferred-client');
var BraintreeError = require('../../lib/braintree-error');
var composeUrl = require('./compose-url');
var getStylesFromClass = require('./get-styles-from-class');
var constants = require('../shared/constants');
var errors = require('../shared/errors');
var INTEGRATION_TIMEOUT_MS = require('../../lib/constants').INTEGRATION_TIMEOUT_MS;
var uuid = require('@braintree/uuid');
var findParentTags = require('../shared/find-parent-tags');
var browserDetection = require('../shared/browser-detection');
var events = constants.events;
var EventEmitter = require('@braintree/event-emitter');
var injectFrame = require('./inject-frame');
var analytics = require('../../lib/analytics');
var allowedFields = constants.allowedFields;
var methods = require('../../lib/methods');
var shadow = require('../../lib/shadow');
var findRootNode = require('../../lib/find-root-node');
var convertMethodsToError = require('../../lib/convert-methods-to-error');
var sharedErrors = require('../../lib/errors');
var getCardTypes = require('../shared/get-card-types');
var attributeValidationError = require('./attribute-validation-error');
var Promise = require('../../lib/promise');
var wrapPromise = require('@braintree/wrap-promise');
var focusChange = require('./focus-change');
var destroyFocusIntercept = require('../shared/focus-intercept').destroy;

var SAFARI_FOCUS_TIMEOUT = 5;

/**
 * @typedef {object} HostedFields~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} authenticationInsight Info about the [regulatory environment](https://developers.braintreepayments.com/guides/3d-secure/advanced-options/javascript/v3#authentication-insight) of the tokenized card. Only available if `authenticationInsight.merchantAccountId` is passed in the `tokenize` method options.
 * @property {string} authenticationInsight.regulationEnvironment The [regulation environment](https://developers.braintreepayments.com/guides/3d-secure/advanced-options/javascript/v3#authentication-insight) for the tokenized card.
 * @property {object} details Additional account details.
 * @property {string} details.bin The BIN number of the card.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.expirationMonth The expiration month of the card.
 * @property {string} details.expirationYear The expiration year of the card.
 * @property {string} details.cardholderName The cardholder name tokenized with the card.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard`.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 */

/**
 * @typedef {object} HostedFields~stateObject
 * @description The event payload sent from {@link HostedFields#on|on} or {@link HostedFields#getState|getState}.
 * @property {HostedFields~hostedFieldsCard[]} cards
 * This will return an array of potential {@link HostedFields~hostedFieldsCard|cards}. If the card type has been determined, the array will contain only one card.
 * Internally, Hosted Fields uses <a href="https://github.com/braintree/credit-card-type">credit-card-type</a>,
 * an open-source card detection library.
 * @property {string} emittedBy
 * The name of the field associated with an event. This will not be included if returned by {@link HostedFields#getState|getState}. It will be one of the following strings:<br>
 * - `"number"`
 * - `"cvv"`
 * - `"expirationDate"`
 * - `"expirationMonth"`
 * - `"expirationYear"`
 * - `"postalCode"`
 * - `"cardholderName"`
 * @property {object} fields
 * @property {?HostedFields~hostedFieldsFieldData} fields.number {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the number field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.cvv {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the CVV field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationDate {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration date field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationMonth {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration month field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationYear {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration year field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.postalCode {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the postal code field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.cardholderName {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the cardholder name field, if it is present.
 */

/**
 * @typedef {object} HostedFields~binPayload
 * @description The event payload sent from {@link HostedFields#on|on} when the {@link HostedFields#event:binAvailable|binAvailable} event is emitted.
 * @property {string} bin The first 6 digits of the card number.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsFieldData
 * @description Data about Hosted Fields fields, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {HTMLElement} container Reference to the container DOM element on your page associated with the current event.
 * @property {boolean} isFocused Whether or not the input is currently focused.
 * @property {boolean} isEmpty Whether or not the user has entered a value in the input.
 * @property {boolean} isPotentiallyValid
 * A determination based on the future validity of the input value.
 * This is helpful when a user is entering a card number and types <code>"41"</code>.
 * While that value is not valid for submission, it is still possible for
 * it to become a fully qualified entry. However, if the user enters <code>"4x"</code>
 * it is clear that the card number can never become valid and isPotentiallyValid will
 * return false.
 * @property {boolean} isValid Whether or not the value of the associated input is <i>fully</i> qualified for submission.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsCard
 * @description Information about the card type, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {string} type The code-friendly representation of the card type. It will be one of the following strings:
 * - `american-express`
 * - `diners-club`
 * - `discover`
 * - `jcb`
 * - `maestro`
 * - `master-card`
 * - `unionpay`
 * - `visa`
 * @property {string} niceType The pretty-printed card type. It will be one of the following strings:
 * - `American Express`
 * - `Diners Club`
 * - `Discover`
 * - `JCB`
 * - `Maestro`
 * - `MasterCard`
 * - `UnionPay`
 * - `Visa`
 * @property {object} code
 * This object contains data relevant to the security code requirements of the card brand.
 * For example, on a Visa card there will be a <code>CVV</code> of 3 digits, whereas an
 * American Express card requires a 4-digit <code>CID</code>.
 * @property {string} code.name <code>"CVV"</code> <code>"CID"</code> <code>"CVC"</code>
 * @property {number} code.size The expected length of the security code. Typically, this is 3 or 4.
 */

/**
 * @name HostedFields#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event.
 *
 * **Events that emit a {@link HostedFields~stateObject|stateObject}.**
 * * {@link HostedFields#event:blur|blur}
 * * {@link HostedFields#event:focus|focus}
 * * {@link HostedFields#event:empty|empty}
 * * {@link HostedFields#event:notEmpty|notEmpty}
 * * {@link HostedFields#event:cardTypeChange|cardTypeChange}
 * * {@link HostedFields#event:validityChange|validityChange}
 * * {@link HostedFields#event:inputSubmitRequest|inputSubmitRequest}
 *
 * **Other Events**
 * * {@link HostedFields#event:binAvailable|binAvailable} - emits a {@link HostedFields~binPayload|bin payload}
 * @example
 * <caption>Listening to a Hosted Field event, in this case 'focus'</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'has been focused');
 *   });
 * });
 * @returns {void}
 */

/**
 * @name HostedFields#off
 * @function
 * @param {string} event The name of the event to which you are unsubscribing.
 * @param {function} handler The callback for the event you are unsubscribing from.
 * @description Unsubscribes the handler function to a named event.
 * @example
 * <caption>Subscribing and then unsubscribing from a Hosted Field event, in this case 'focus'</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   var callback = function (event) {
 *     console.log(event.emittedBy, 'has been focused');
 *   };
 *   hostedFieldsInstance.on('focus', callback);
 *
 *   // later on
 *   hostedFieldsInstance.off('focus', callback);
 * });
 * @returns {void}
 */

/**
 * This event is emitted when the user requests submission of an input field, such as by pressing the Enter or Return key on their keyboard, or mobile equivalent.
 * @event HostedFields#inputSubmitRequest
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Clicking a submit button upon hitting Enter (or equivalent) within a Hosted Field</caption>
 * var hostedFields = require('braintree-web/hosted-fields');
 * var submitButton = document.querySelector('input[type="submit"]');
 *
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('inputSubmitRequest', function () {
 *     // User requested submission, e.g. by pressing Enter or equivalent
 *     submitButton.click();
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from having data to being empty.
 * @event HostedFields#empty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an empty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('empty', function (event) {
 *     console.log(event.emittedBy, 'is now empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from being empty to having data.
 * @event HostedFields#notEmpty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an notEmpty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('notEmpty', function (event) {
 *     console.log(event.emittedBy, 'is now not empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field loses focus.
 * @event HostedFields#blur
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a blur event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('blur', function (event) {
 *     console.log(event.emittedBy, 'lost focus');
 *   });
 * });
 */

/**
 * This event is emitted when a field gains focus.
 * @event HostedFields#focus
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a focus event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'gained focus');
 *   });
 * });
 */

/**
 * This event is emitted when activity within the number field has changed such that the possible card type has changed.
 * @event HostedFields#cardTypeChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a cardTypeChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('cardTypeChange', function (event) {
 *     if (event.cards.length === 1) {
 *       console.log(event.cards[0].type);
 *     } else {
 *       console.log('Type of card not yet known');
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the validity of a field has changed. Validity is represented in the {@link HostedFields~stateObject|stateObject} as two booleans: `isValid` and `isPotentiallyValid`.
 * @event HostedFields#validityChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a validityChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('validityChange', function (event) {
 *     var field = event.fields[event.emittedBy];
 *
 *     if (field.isValid) {
 *       console.log(event.emittedBy, 'is fully valid');
 *     } else if (field.isPotentiallyValid) {
 *       console.log(event.emittedBy, 'is potentially valid');
 *     } else {
 *       console.log(event.emittedBy, 'is not valid');
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the first 6 digits of the card number have been entered by the customer.
 * @event HostedFields#binAvailable
 * @type {string}
 * @example
 * <caption>Listening to a `binAvailable` event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('binAvailable', function (event) {
 *     event.bin // send bin to 3rd party bin service
 *   });
 * });
 */

function createInputEventHandler(fields) {
  return function (eventData) {
    var field;
    var merchantPayload = eventData.merchantPayload;
    var emittedBy = merchantPayload.emittedBy;
    var container = fields[emittedBy].containerElement;

    Object.keys(merchantPayload.fields).forEach(function (key) {
      merchantPayload.fields[key].container = fields[key].containerElement;
    });

    field = merchantPayload.fields[emittedBy];

    if (eventData.type === 'blur') {
      performBlurFixForIos(container);
    }

    classList.toggle(container, constants.externalClasses.FOCUSED, field.isFocused);
    classList.toggle(container, constants.externalClasses.VALID, field.isValid);
    classList.toggle(container, constants.externalClasses.INVALID, !field.isPotentiallyValid);

    this._state = {// eslint-disable-line no-invalid-this
      cards: merchantPayload.cards,
      fields: merchantPayload.fields
    };

    this._emit(eventData.type, merchantPayload); // eslint-disable-line no-invalid-this
  };
}

// iOS Safari has a bug where inputs in iframes
// will not dismiss the keyboard when they lose
// focus. We create a hidden button input that we
// can focus on and blur to force the keyboard to
// dismiss. See #229
function performBlurFixForIos(container) {
  var hiddenInput;

  if (!browserDetection.isIos()) {
    return;
  }

  if (document.activeElement === document.body) {
    hiddenInput = container.querySelector('input');

    if (!hiddenInput) {
      hiddenInput = document.createElement('input');

      hiddenInput.type = 'button';
      hiddenInput.style.height = '0px';
      hiddenInput.style.width = '0px';
      hiddenInput.style.opacity = '0';
      hiddenInput.style.padding = '0';
      hiddenInput.style.position = 'absolute';
      hiddenInput.style.left = '-200%';
      hiddenInput.style.top = '0px';

      container.insertBefore(hiddenInput, container.firstChild);
    }

    hiddenInput.focus();
    hiddenInput.blur();
  }
}

function isVisibleEnough(node) {
  var boundingBox = node.getBoundingClientRect();
  var verticalMidpoint = Math.floor(boundingBox.height / 2);
  var horizontalMidpoint = Math.floor(boundingBox.width / 2);

  return (
    boundingBox.top < (window.innerHeight - verticalMidpoint || document.documentElement.clientHeight - verticalMidpoint) &&
    boundingBox.right > horizontalMidpoint &&
    boundingBox.bottom > verticalMidpoint &&
    boundingBox.left < (window.innerWidth - horizontalMidpoint || document.documentElement.clientWidth - horizontalMidpoint)
  );
}

/**
 * @class HostedFields
 * @param {object} options The Hosted Fields {@link module:braintree-web/hosted-fields.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/hosted-fields.create|braintree-web.hosted-fields.create} instead.</strong>
 * @classdesc This class represents a Hosted Fields component produced by {@link module:braintree-web/hosted-fields.create|braintree-web/hosted-fields.create}. Instances of this class have methods for interacting with the input fields within Hosted Fields' iframes.
 */
function HostedFields(options) {
  var failureTimeout, clientConfig, assetsUrl, isDebug, hostedFieldsUrl;
  var self = this;
  var fields = {};
  var frameReadyPromiseResolveFunctions = {};
  var frameReadyPromises = [];
  var componentId = uuid();

  this._merchantConfigurationOptions = assign({}, options);

  if (options.client) {
    clientConfig = options.client.getConfiguration();
    assetsUrl = clientConfig.gatewayConfiguration.assetsUrl;
    isDebug = clientConfig.isDebug;
  } else {
    assetsUrl = createAssetsUrl.create(options.authorization);
    isDebug = Boolean(options.isDebug);
  }

  this._clientPromise = createDeferredClient.create({
    client: options.client,
    authorization: options.authorization,
    debug: isDebug,
    assetsUrl: assetsUrl,
    name: 'Hosted Fields'
  });

  hostedFieldsUrl = composeUrl(assetsUrl, componentId, isDebug);

  if (!options.fields || Object.keys(options.fields).length === 0) {
    throw new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.fields is required when instantiating Hosted Fields.'
    });
  }

  EventEmitter.call(this);

  this._injectedNodes = [];
  this._destructor = new Destructor();
  this._fields = fields;
  this._state = {
    fields: {},
    cards: getCardTypes('')
  };

  this._bus = new Bus({
    channel: componentId,
    verifyDomain: isVerifiedDomain
  });

  this._destructor.registerFunctionForTeardown(function () {
    self._bus.teardown();
  });

  // NEXT_MAJOR_VERSION analytics events should have present tense verbs
  if (!options.client) {
    analytics.sendEvent(this._clientPromise, 'custom.hosted-fields.initialized.deferred-client');
  } else {
    analytics.sendEvent(this._clientPromise, 'custom.hosted-fields.initialized');
  }

  Object.keys(options.fields).forEach(function (key) {
    var field, externalContainer, internalContainer, frame, frameReadyPromise;

    if (!constants.allowedFields.hasOwnProperty(key)) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
        message: '"' + key + '" is not a valid field.'
      });
    }

    field = options.fields[key];
    // NEXT_MAJOR_VERSION remove selector as an option
    // and simply make the API take a container
    externalContainer = field.container || field.selector;

    if (typeof externalContainer === 'string') {
      externalContainer = document.querySelector(externalContainer);
    }

    if (!externalContainer || externalContainer.nodeType !== 1) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
        message: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
        details: {
          fieldSelector: field.selector,
          fieldContainer: field.container,
          fieldKey: key
        }
      });
    } else if (externalContainer.querySelector('iframe[name^="braintree-"]')) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
        code: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
        message: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
        details: {
          fieldSelector: field.selector,
          fieldContainer: field.container,
          fieldKey: key
        }
      });
    }

    internalContainer = externalContainer;

    if (shadow.isShadowElement(internalContainer)) {
      internalContainer = shadow.transformToSlot(internalContainer, 'height: 100%');
    }

    if (field.maxlength && typeof field.maxlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for maxlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    if (field.minlength && typeof field.minlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for minlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    frame = iFramer({
      type: key,
      name: 'braintree-hosted-field-' + key,
      style: constants.defaultIFrameStyle,
      title: 'Secure Credit Card Frame - ' + constants.allowedFields[key].label
    });

    this._injectedNodes.push.apply(this._injectedNodes, injectFrame(componentId, frame, internalContainer, function () {
      self.focus(key);
    }));

    this._setupLabelFocus(key, externalContainer);
    fields[key] = {
      frameElement: frame,
      containerElement: externalContainer
    };
    frameReadyPromise = new Promise(function (resolve) {
      frameReadyPromiseResolveFunctions[key] = resolve;
    });
    frameReadyPromises.push(frameReadyPromise);

    this._state.fields[key] = {
      isEmpty: true,
      isValid: false,
      isPotentiallyValid: true,
      isFocused: false,
      container: externalContainer
    };

    setTimeout(function () {
      // Edge has an intermittent issue where
      // the iframes load, but the JavaScript
      // can't message out to the parent page.
      // We can fix this by setting the src
      // to about:blank first followed by
      // the actual source. Both instances
      // of setting the src need to be in a
      // setTimeout to work.
      if (browserDetection.isIE() || browserDetection.isEdge()) {
        frame.src = 'about:blank';
        setTimeout(function () {
          frame.src = hostedFieldsUrl;
        }, 0);
      } else {
        frame.src = hostedFieldsUrl;
      }
    }, 0);
  }.bind(this));

  if (this._merchantConfigurationOptions.styles) {
    Object.keys(this._merchantConfigurationOptions.styles).forEach(function (selector) {
      var className = self._merchantConfigurationOptions.styles[selector];

      if (typeof className === 'string') {
        self._merchantConfigurationOptions.styles[selector] = getStylesFromClass(className);
      }
    });
  }

  this._bus.on(events.REMOVE_FOCUS_INTERCEPTS, function (data) {
    destroyFocusIntercept(data && data.id);
  });

  this._bus.on(events.TRIGGER_FOCUS_CHANGE, focusChange.createFocusChangeHandler(componentId, {
    onRemoveFocusIntercepts: function (element) {
      self._bus.emit(events.REMOVE_FOCUS_INTERCEPTS, {
        id: element
      });
    },
    onTriggerInputFocus: function (targetType) {
      self.focus(targetType);
    }
  }));

  this._bus.on(events.READY_FOR_CLIENT, function (reply) {
    self._clientPromise.then(function (client) {
      reply(client);
    });
  });

  this._bus.on(events.CARD_FORM_ENTRY_HAS_BEGUN, function () {
    analytics.sendEvent(self._clientPromise, 'hosted-fields.input.started');
  });

  this._bus.on(events.BIN_AVAILABLE, function (bin) {
    self._emit('binAvailable', {
      bin: bin
    });
  });

  failureTimeout = setTimeout(function () {
    analytics.sendEvent(self._clientPromise, 'custom.hosted-fields.load.timed-out');
    self._emit('timeout');
  }, INTEGRATION_TIMEOUT_MS);

  Promise.all(frameReadyPromises).then(function (results) {
    var reply = results[0];

    clearTimeout(failureTimeout);
    reply(formatMerchantConfigurationForIframes(self._merchantConfigurationOptions));

    self._cleanUpFocusIntercepts();

    self._emit('ready');
  });

  this._bus.on(events.FRAME_READY, function (data, reply) {
    frameReadyPromiseResolveFunctions[data.field](reply);
  });

  this._bus.on(
    events.INPUT_EVENT,
    createInputEventHandler(fields).bind(this)
  );

  this._destructor.registerFunctionForTeardown(function () {
    var j, node, parent;

    for (j = 0; j < self._injectedNodes.length; j++) {
      node = self._injectedNodes[j];
      parent = node.parentNode;

      parent.removeChild(node);

      classList.remove(
        parent,
        constants.externalClasses.FOCUSED,
        constants.externalClasses.INVALID,
        constants.externalClasses.VALID
      );
    }
  });

  this._destructor.registerFunctionForTeardown(function () {
    destroyFocusIntercept();
  });

  this._destructor.registerFunctionForTeardown(function () {
    var methodNames = methods(HostedFields.prototype).concat(methods(EventEmitter.prototype));

    convertMethodsToError(self, methodNames);
  });
}

EventEmitter.createChild(HostedFields);

HostedFields.prototype._setupLabelFocus = function (type, container) {
  var labels, i;
  var self = this;
  var rootNode = findRootNode(container);

  if (container.id == null) { return; }

  function triggerFocus() {
    self.focus(type);
  }

  // find any labels in the normal DOM
  labels = Array.prototype.slice.call(document.querySelectorAll('label[for="' + container.id + '"]'));
  if (rootNode !== document) {
    // find any labels within the shadow dom
    labels = labels.concat(Array.prototype.slice.call(rootNode.querySelectorAll('label[for="' + container.id + '"]')));
  }
  // find any labels surrounding the container that don't also have the `for` attribute
  labels = labels.concat(findParentTags(container, 'label'));
  // filter out any accidental duplicates
  labels = labels.filter(function (label, index, arr) {
    return arr.indexOf(label) === index;
  });

  for (i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', triggerFocus, false);
  }

  this._destructor.registerFunctionForTeardown(function () {
    for (i = 0; i < labels.length; i++) {
      labels[i].removeEventListener('click', triggerFocus, false);
    }
  });
};

HostedFields.prototype._getAnyFieldContainer = function () {
  var self = this;

  return Object.keys(this._fields).reduce(function (found, field) {
    return found || self._fields[field].containerElement;
  }, null);
};

HostedFields.prototype._cleanUpFocusIntercepts = function () {
  var iframeContainer, checkoutForm;

  if (document.forms.length < 1) {
    this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS);
  } else {
    iframeContainer = this._getAnyFieldContainer();
    checkoutForm = findParentTags(iframeContainer, 'form')[0];

    if (checkoutForm) {
      focusChange.removeExtraFocusElements(checkoutForm, function (id) {
        this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS, {
          id: id
        });
      }.bind(this));
    } else {
      this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS);
    }
  }
};

HostedFields.prototype._attachInvalidFieldContainersToError = function (err) {
  if (!(err.details && err.details.invalidFieldKeys && err.details.invalidFieldKeys.length > 0)) {
    return;
  }
  err.details.invalidFields = {};
  err.details.invalidFieldKeys.forEach(function (field) {
    err.details.invalidFields[field] = this._fields[field].containerElement;
  }.bind(this));
};

/**
 * Get card verification challenges, such as requirements for cvv and postal code.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. If no callback is provided, `getChallenges` returns a promise.
 * @example
 * hostedFieldsInstance.getChallenges().then(function (challenges) {
 *   challenges // ['cvv', 'postal_code']
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.getChallenges = function () {
  return this._clientPromise.then(function (client) {
    return client.getConfiguration().gatewayConfiguration.challenges;
  });
};

/**
 * Get supported card types configured in the Braintree Control Panel
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. If no callback is provided, `getSupportedCardTypes` returns a promise.
 * @example
 * hostedFieldsInstance.getSupportedCardTypes().then(function (cardTypes) {
 *   cardTypes // ['Visa', 'American Express', 'Mastercard']
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.getSupportedCardTypes = function () {
  return this._clientPromise.then(function (client) {
    var cards = client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes.map(function (cardType) {
      if (cardType === 'MasterCard') {
        // Mastercard changed their branding. We can't update our
        // config without creating a breaking change, so we just
        // hard code the change here
        return 'Mastercard';
      }

      return cardType;
    });

    return cards;
  });
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/hosted-fields.create|create}.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. No data is returned if teardown completes successfully. If no callback is provided, `teardown` returns a promise.
 * @example
 * hostedFieldsInstance.teardown(function (teardownErr) {
 *   if (teardownErr) {
 *     console.error('Could not tear down Hosted Fields!');
 *   } else {
 *     console.info('Hosted Fields has been torn down!');
 *   }
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.teardown = function () {
  var self = this;

  return new Promise(function (resolve, reject) {
    self._destructor.teardown(function (err) {
      analytics.sendEvent(self._clientPromise, 'custom.hosted-fields.teardown-completed');

      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Tokenizes fields and returns a nonce payload.
 * @public
 * @param {object} [options] All tokenization options for the Hosted Fields component.
 * @param {boolean} [options.vault=false] When true, will vault the tokenized card. Cards will only be vaulted when using a client created with a client token that includes a customer ID. Note: merchants using Advanced Fraud Tools should not use this option, as device data will not be included.
 * @param {object} [options.authenticationInsight] Options for checking authentication insight - the [regulatory environment](https://developers.braintreepayments.com/guides/3d-secure/advanced-options/javascript/v3#authentication-insight) of the tokenized card.
 * @param {string} options.authenticationInsight.merchantAccountId The Braintree merchant account id to use to look up the authentication insight information.
 * @param {array} [options.fieldsToTokenize] By default, all fields will be tokenized. You may specify which fields specifically you wish to tokenize with this property. Valid options are `'number'`, `'cvv'`, `'expirationDate'`, `'expirationMonth'`, `'expirationYear'`, `'postalCode'`, `'cardholderName'`.
 * @param {string} [options.cardholderName] When supplied, the cardholder name to be tokenized with the contents of the fields.
 * @param {string} [options.billingAddress.postalCode] When supplied, this postal code will be tokenized along with the contents of the fields. If a postal code is provided as part of the Hosted Fields configuration, the value of the field will be tokenized and this value will be ignored.
 * @param {string} [options.billingAddress.firstName] When supplied, this customer first name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.lastName] When supplied, this customer last name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.company] When supplied, this company name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.streetAddress] When supplied, this street address will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.extendedAddress] When supplied, this extended address will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.locality] When supplied, this locality (the city) will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.region] When supplied, this region (the state) will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeNumeric] When supplied, this numeric country code will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha2] When supplied, this alpha 2 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha3] When supplied, this alpha 3 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryName] When supplied, this country name will be tokenized along with the contents of the fields.
 *
 * @param {callback} [callback] May be used as the only parameter of the function if no options are passed in. The second argument, <code>data</code>, is a {@link HostedFields~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a function that resolves with a {@link HostedFields~tokenizePayload|tokenizePayload}.
 * @example <caption>Tokenize a card</caption>
 * hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     switch (tokenizeErr.code) {
 *       case 'HOSTED_FIELDS_FIELDS_EMPTY':
 *         // occurs when none of the fields are filled in
 *         console.error('All fields are empty! Please fill out the form.');
 *         break;
 *       case 'HOSTED_FIELDS_FIELDS_INVALID':
 *         // occurs when certain fields do not pass client side validation
 *         console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
 *
 *         // you can also programmatically access the field containers for the invalid fields
 *         tokenizeErr.details.invalidFields.forEach(function (fieldContainer) {
 *           fieldContainer.className = 'invalid';
 *         });
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the fail on duplicate payment method
 *         //     option is set to true
 *         //   * the card being tokenized has previously been vaulted (with any customer)
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.fail_on_duplicate_payment_method
 *         console.error('This payment method already exists in your vault.');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the verify card option is set to true
 *         //     and you have credit card verification turned on in the Braintree
 *         //     control panel
 *         //   * the cvv does not pass verification (https://developers.braintreepayments.com/reference/general/testing/#avs-and-cvv/cid-responses)
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.verify_card
 *         console.error('CVV did not pass verification');
 *         break;
 *       case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
 *         // occurs for any other tokenization error on the server
 *         console.error('Tokenization failed server side. Is the card valid?');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
 *         // occurs when the Braintree gateway cannot be contacted
 *         console.error('Network error occurred when tokenizing.');
 *         break;
 *       default:
 *         console.error('Something bad happened!', tokenizeErr);
 *     }
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize and vault a card</caption>
 * hostedFieldsInstance.tokenize({
 *   vault: true
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with non-Hosted Fields cardholder name</caption>
 * hostedFieldsInstance.tokenize({
 *   cardholderName: 'First Last'
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with non-Hosted Fields postal code option</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     postalCode: '11111'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with additional billing address options</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     firstName: 'First',
 *     lastName: 'Last',
 *     company: 'Company',
 *     streetAddress: '123 Street',
 *     extendedAddress: 'Unit 1',
 *     // passing just one of the country options is sufficient to
 *     // associate the card details with a particular country
 *     // valid country names and codes can be found here:
 *     // https://developers.braintreepayments.com/reference/general/countries/ruby#list-of-countries
 *     countryName: 'United States',
 *     countryCodeAlpha2: 'US',
 *     countryCodeAlpha3: 'USA',
 *     countryCodeNumeric: '840'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Allow tokenization with empty cardholder name field</caption>
 * var state = hostedFieldsInstance.getState();
 * var fields = Object.keys(state.fields);
 *
 * // normally, if you tried to tokenize an empty cardholder name field
 * // you would get an error, to allow making this field optional,
 * // tokenize all the fields except for the cardholder name field
 * // when the cardholder name field is empty. Otherwise, tokenize
 * // all the fields
 * if (state.fields.cardholderName.isEmpty) {
 *  fields = fields.filter(function (field) {
 *    return field !== 'cardholderName';
 *  });
 * }
 *
 * hostedFieldsInstance.tokenize({
 *  fieldsToTokenize: fields
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.tokenize = function (options) {
  var self = this;

  if (!options) {
    options = {};
  }

  return new Promise(function (resolve, reject) {
    self._bus.emit(events.TOKENIZATION_REQUEST, options, function (response) {
      var err = response[0];
      var payload = response[1];

      if (err) {
        self._attachInvalidFieldContainersToError(err);
        reject(new BraintreeError(err));
      } else {
        resolve(payload);
      }
    });
  });
};

/**
 * Add a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to add a class to. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be added.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is added successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *   }
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.addClass = function (field, classname) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when adding a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot add class to "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.ADD_CLASS, {
      field: field,
      classname: classname
    });
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Removes a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to remove a class from. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be removed.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is removed successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *     return;
 *   }
 *
 *   // some time later...
 *   hostedFieldsInstance.removeClass('number', 'custom-class');
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeClass = function (field, classname) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when removing a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove class from "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.REMOVE_CLASS, {
      field: field,
      classname: classname
    });
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets an attribute of a {@link module:braintree-web/hosted-fields~field field}.
 * Supported attributes are `aria-invalid`, `aria-required`, `disabled`, and `placeholder`.
 *
 * @public
 * @param {object} options The options for the attribute you wish to set.
 * @param {string} options.field The field to which you wish to add an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to add to the field.
 * @param {string} options.value The value for the attribute.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is set successfully.
 *
 * @example <caption>Set the placeholder attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'placeholder',
 *   value: '1111 1111 1111 1111'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @example <caption>Set the aria-required attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'aria-required',
 *   value: true
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setAttribute = function (options) {
  var attributeErr, err;

  if (!allowedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when setting an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot set attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute, options.value);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.SET_ATTRIBUTE, {
        field: options.field,
        attribute: options.attribute,
        value: options.value
      });
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets the month options for the expiration month field when presented as a select element.
 *
 * @public
 * @param {array} options An array of 12 entries corresponding to the 12 months.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the options are updated successfully. Errors if expirationMonth is not configured on the Hosted Fields instance or if the expirationMonth field is not configured to be a select input.
 *
 * @example <caption>Update the month options to spanish</caption>
 * hostedFieldsInstance.setMonthOptions([
 *   '01 - enero',
 *   '02 - febrero',
 *   '03 - marzo',
 *   '04 - abril',
 *   '05 - mayo',
 *   '06 - junio',
 *   '07 - julio',
 *   '08 - agosto',
 *   '09 - septiembre',
 *   '10 - octubre',
 *   '11 - noviembre',
 *   '12 - diciembre'
 * ]);
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setMonthOptions = function (options) {
  var self = this;
  var merchantOptions = this._merchantConfigurationOptions.fields;
  var errorMessage;

  if (!merchantOptions.expirationMonth) {
    errorMessage = 'Expiration month field must exist to use setMonthOptions.';
  } else if (!merchantOptions.expirationMonth.select) {
    errorMessage = 'Expiration month field must be a select element.';
  }

  if (errorMessage) {
    return Promise.reject(new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
      message: errorMessage
    }));
  }

  return new Promise(function (resolve) {
    self._bus.emit(events.SET_MONTH_OPTIONS, options, resolve);
  });
};

/**
 * Sets a visually hidden message (for screen readers) on a {@link module:braintree-web/hosted-fields~field field}.
 *
 * @public
 * @param {object} options The options for the attribute you wish to set.
 * @param {string} options.field The field to which you wish to add an attribute. Must be a valid {@link module:braintree-web/hosted-fields~field field}.
 * @param {string} options.message The message to set.
 *
 * @example <caption>Set an error message on a field</caption>
 * hostedFieldsInstance.setMessage({
 *   field: 'number',
 *   message: 'Invalid card number'
 * });
 *
 * @example <caption>Remove the message on a field</caption>
 * hostedFieldsInstance.setMessage({
 *   field: 'number',
 *   message: ''
 * });
 *
 * @returns {void}
 */
HostedFields.prototype.setMessage = function (options) {
  this._bus.emit(events.SET_MESSAGE, {
    field: options.field,
    message: options.message
  });
};

/**
 * Removes a supported attribute from a {@link module:braintree-web/hosted-fields~field field}.
 *
 * @public
 * @param {object} options The options for the attribute you wish to remove.
 * @param {string} options.field The field from which you wish to remove an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to remove from the field.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is removed successfully.
 *
 * @example <caption>Remove the placeholder attribute of a field</caption>
 * hostedFieldsInstance.removeAttribute({
 *   field: 'number',
 *   attribute: 'placeholder'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeAttribute = function (options) {
  var attributeErr, err;

  if (!allowedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when removing an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.REMOVE_ATTRIBUTE, {
        field: options.field,
        attribute: options.attribute
      });
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * @deprecated since version 3.8.0. Use {@link HostedFields#setAttribute|setAttribute} instead.
 *
 * @public
 * @param {string} field The field whose placeholder you wish to change. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} placeholder Will be used as the `placeholder` attribute of the input.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the placeholder updated successfully.
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setPlaceholder = function (field, placeholder) {
  return this.setAttribute({
    field: field,
    attribute: 'placeholder',
    value: placeholder
  });
};

/**
 * Clear the value of a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you wish to clear. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field cleared successfully.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * hostedFieldsInstance.clear('number', function (clearErr) {
 *   if (clearErr) {
 *     console.error(clearErr);
 *   }
 * });
 *
 * @example <caption>Clear several fields</caption>
 * hostedFieldsInstance.clear('number');
 * hostedFieldsInstance.clear('cvv');
 * hostedFieldsInstance.clear('expirationDate');
 */
HostedFields.prototype.clear = function (field) {
  var err;

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when clearing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot clear "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.CLEAR_FIELD, {
      field: field
    });
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Programmatically focus a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you want to focus. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field focused successfully.
 * @returns {void}
 * @example
 * hostedFieldsInstance.focus('number', function (focusErr) {
 *   if (focusErr) {
 *     console.error(focusErr);
 *   }
 * });
 * @example <caption>Using an event listener</caption>
 * myElement.addEventListener('click', function (e) {
 *   // In Firefox, the focus method can be suppressed
 *   //   if the element has a tabindex property or the element
 *   //   is an anchor link with an href property.
 *   e.preventDefault();
 *   hostedFieldsInstance.focus('number');
 * });
 */
HostedFields.prototype.focus = function (field) {
  var err;
  var fieldConfig = this._fields[field];

  if (!allowedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when focusing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot focus "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    fieldConfig.frameElement.focus();

    this._bus.emit(events.TRIGGER_INPUT_FOCUS, {
      field: field
    });

    if (browserDetection.isIos()) {
      // Inputs outside of the viewport don't always scroll into view on
      // focus in iOS Safari. 5ms timeout gives the browser a chance to
      // do the right thing and prevents stuttering.
      setTimeout(function () {
        if (!isVisibleEnough(fieldConfig.containerElement)) {
          fieldConfig.containerElement.scrollIntoView();
        }
      }, SAFARI_FOCUS_TIMEOUT);
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Returns an {@link HostedFields~stateObject|object} that includes the state of all fields and possible card types.
 * @public
 * @returns {object} {@link HostedFields~stateObject|stateObject}
 * @example <caption>Check if all fields are valid</caption>
 * var state = hostedFieldsInstance.getState();
 *
 * var formValid = Object.keys(state.fields).every(function (key) {
 *   return state.fields[key].isValid;
 * });
 */
HostedFields.prototype.getState = function () {
  return this._state;
};

// React adds decorations to DOM nodes that cause
// circular dependencies, so we remove them from the
// config before sending it to the iframes. However,
// we don't want to mutate the original object that
// was passed in, so we create fresh objects via assign
function formatMerchantConfigurationForIframes(config) {
  var formattedConfig = assign({}, config);

  formattedConfig.fields = assign({}, formattedConfig.fields);
  Object.keys(formattedConfig.fields).forEach(function (field) {
    formattedConfig.fields[field] = assign({}, formattedConfig.fields[field]);
    delete formattedConfig.fields[field].container;
  });

  return formattedConfig;
}

module.exports = wrapPromise.wrapPrototype(HostedFields);

},{"../../lib/analytics":93,"../../lib/assign":95,"../../lib/braintree-error":98,"../../lib/constants":99,"../../lib/convert-methods-to-error":100,"../../lib/create-assets-url":102,"../../lib/create-deferred-client":104,"../../lib/destructor":106,"../../lib/errors":108,"../../lib/find-root-node":109,"../../lib/is-verified-domain":126,"../../lib/methods":128,"../../lib/promise":130,"../../lib/shadow":132,"../shared/browser-detection":86,"../shared/constants":87,"../shared/errors":88,"../shared/find-parent-tags":89,"../shared/focus-intercept":90,"../shared/get-card-types":91,"./attribute-validation-error":79,"./compose-url":80,"./focus-change":81,"./get-styles-from-class":82,"./inject-frame":84,"@braintree/class-list":39,"@braintree/event-emitter":40,"@braintree/iframer":42,"@braintree/uuid":46,"@braintree/wrap-promise":50,"framebus":172}],84:[function(require,module,exports){
'use strict';

var focusIntercept = require('../shared/focus-intercept');
var directions = require('../shared/constants').navigationDirections;

module.exports = function injectFrame(id, frame, container, focusHandler) {
  var frameType = frame.getAttribute('type');
  var clearboth = document.createElement('div');
  var fragment = document.createDocumentFragment();
  var focusInterceptBefore = focusIntercept.generate(id, frameType, directions.BACK, focusHandler);
  var focusInterceptAfter = focusIntercept.generate(id, frameType, directions.FORWARD, focusHandler);

  clearboth.style.clear = 'both';

  fragment.appendChild(focusInterceptBefore);
  fragment.appendChild(frame);
  fragment.appendChild(focusInterceptAfter);
  fragment.appendChild(clearboth);

  container.appendChild(fragment);

  return [frame, clearboth];
};

},{"../shared/constants":87,"../shared/focus-intercept":90}],85:[function(require,module,exports){
'use strict';
/** @module braintree-web/hosted-fields */

var HostedFields = require('./external/hosted-fields');
var basicComponentVerification = require('../lib/basic-component-verification');
var errors = require('./shared/errors');
var supportsInputFormatting = require('restricted-input/supports-input-formatting');
var wrapPromise = require('@braintree/wrap-promise');
var BraintreeError = require('../lib/braintree-error');
var Promise = require('../lib/promise');
var VERSION = "3.78.2";

/**
 * Fields used in {@link module:braintree-web/hosted-fields~fieldOptions fields options}
 * @typedef {object} field
 * @property {string} selector Deprecated: Now an alias for `options.container`.
 * @property {(string|HTMLElement)} container A DOM node or CSS selector to find the container where the hosted field will be inserted.
 * @property {string} [placeholder] Will be used as the `placeholder` attribute of the input. If `placeholder` is not natively supported by the browser, it will be polyfilled.
 * @property {string} [type] Will be used as the `type` attribute of the input. To mask `cvv` input, for instance, `type: "password"` can be used.
 * @property {string} [internalLabel] Each Hosted Field iframe has a hidden label that is used by screen readers to identify the input. The `internalLabel` property can be used to customize the field for localization purposes. The default values are:
 * * number: Credit Card Number
 * * cvv: CVV
 * * expirationDate: Expiration Date
 * * expirationMonth: Expiration Month
 * * expirationYear: Expiration Year
 * * postalCode: Postal Code
 * * cardholderName: Cardholder Name
 * @property {boolean} [formatInput=true] Enable or disable automatic formatting on this field.
 * @property {(object|boolean)} [maskInput=false] Enable or disable input masking when input is not focused. If set to `true` instead of an object, the defaults for the `maskInput` parameters will be used.
 * @property {string} [maskInput.character=•] The character to use when masking the input. The default character ('•') uses a unicode symbol, so the webpage must support UTF-8 characters when using the default.
 * @property {Boolean} [maskInput.showLastFour=false] Only applicable for the credit card field. Whether or not to show the last 4 digits of the card when masking.
 * @property {(object|boolean)} [select] If truthy, this field becomes a `<select>` dropdown list. This can only be used for `expirationMonth` and `expirationYear` fields. If you do not use a `placeholder` property for the field, the current month/year will be the default selected value.
 * @property {string[]} [select.options] An array of 12 strings, one per month. This can only be used for the `expirationMonth` field. For example, the array can look like `['01 - January', '02 - February', ...]`.
 * @property {number} [maxCardLength] This option applies only to the number field. Allows a limit to the length of the card number, even if the card brand may support numbers of a greater length. If the value passed is greater than the max length for a card brand, the smaller number of the 2 values will be used. For example, is `maxCardLength` is set to 16, but an American Express card is entered (which has a max card length of 15), a max card length of 15 will be used.
 * @property {number} [maxlength] This option applies only to the CVV and postal code fields. Will be used as the `maxlength` attribute of the input. The primary use cases for the `maxlength` option are: limiting the length of the CVV input for CVV-only verifications when the card type is known and setting the length of the postal code input when cards are coming from a known region. The default `maxlength` for the postal code input is `10`.
 * @property {number} [minlength=3] This option applies only to the cvv and postal code fields. Will be used as the `minlength` attribute of the input.
 * For postal code fields, the default value is 3, representing the Icelandic postal code length. This option's primary use case is to increase the `minlength`, e.g. for US customers, the postal code `minlength` can be set to 5.
 * For cvv fields, the default value is 3. The `minlength` attribute only applies to integrations capturing a cvv without a number field.
 * @property {string} [prefill] A value to prefill the field with. For example, when creating an update card form, you can prefill the expiration date fields with the old expiration date data.
 * @property {boolean} [rejectUnsupportedCards=false] Deprecated since version 3.46.0, use `supportedCardBrands` instead. Only allow card types that your merchant account is able to process. Unsupported card types will invalidate the card form. e.g. if you only process Visa cards, a customer entering a American Express card would get an invalid card field. This can only be used for the `number` field.
 * @property {object} [supportedCardBrands] Override card brands that are supported by the card form. Pass `'card-brand-id': true` to override the default in the merchant configuration and enable a card brand. Pass `'card-brand-id': false` to disable a card brand. Unsupported card types will invalidate the card form. e.g. if you only process Visa cards, a customer entering an American Express card would get an invalid card field. This can only be used for the  `number` field. (Note: only allow card types that your merchant account is actually able to process.)
 *
 * Valid card brand ids are:
 * * visa
 * * mastercard
 * * american-express
 * * diners-club
 * * discover
 * * jcb
 * * union-pay
 * * maestro
 * * elo
 * * mir
 * * hiper
 * * hipercard
 */

/**
 * An object that has {@link module:braintree-web/hosted-fields~field field objects} for each field. Used in {@link module:braintree-web/hosted-fields~create create}.
 * @typedef {object} fieldOptions
 * @property {field} [number] A field for card number.
 * @property {field} [expirationDate] A field for expiration date in `MM/YYYY` or `MM/YY` format. This should not be used with the `expirationMonth` and `expirationYear` properties.
 * @property {field} [expirationMonth] A field for expiration month in `MM` format. This should be used with the `expirationYear` property.
 * @property {field} [expirationYear] A field for expiration year in `YYYY` or `YY` format. This should be used with the `expirationMonth` property.
 * @property {field} [cvv] A field for 3 or 4 digit card verification code (like CVV or CID). If you wish to create a CVV-only payment method nonce to verify a card already stored in your Vault, omit all other fields to only collect CVV.
 * @property {field} [postalCode] A field for postal or region code.
 * @property {field} [cardholderName] A field for the cardholder name on the customer's credit card.
 */

/**
 * An object that represents CSS that will be applied in each hosted field. This object looks similar to CSS. Typically, these styles involve fonts (such as `font-family` or `color`).
 *
 * You may also pass the name of a class on your site that contains the styles you would like to apply. The style properties will be automatically pulled off the class and applied to the Hosted Fields inputs. Note: this is recommended for `input` elements only. If using a `select` for the expiration date, unexpected styling may occur.
 *
 * These are the CSS properties that Hosted Fields supports. Any other CSS should be specified on your page and outside of any Braintree configuration. Trying to set unsupported properties will fail and put a warning in the console.
 *
 * Supported CSS properties are:
 * `appearance`
 * `box-shadow`
 * `color`
 * `direction`
 * `font-family`
 * `font-size-adjust`
 * `font-size`
 * `font-stretch`
 * `font-style`
 * `font-variant-alternates`
 * `font-variant-caps`
 * `font-variant-east-asian`
 * `font-variant-ligatures`
 * `font-variant-numeric`
 * `font-variant`
 * `font-weight`
 * `font`
 * `letter-spacing`
 * `line-height`
 * `opacity`
 * `outline`
 * `margin`
 * `margin-top`
 * `margin-right`
 * `margin-bottom`
 * `margin-left`
 * `padding`
 * `padding-top`
 * `padding-right`
 * `padding-bottom`
 * `padding-left`
 * `text-align`
 * `text-shadow`
 * `transition`
 * `-moz-appearance`
 * `-moz-box-shadow`
 * `-moz-osx-font-smoothing`
 * `-moz-tap-highlight-color`
 * `-moz-transition`
 * `-webkit-appearance`
 * `-webkit-box-shadow`
 * `-webkit-font-smoothing`
 * `-webkit-tap-highlight-color`
 * `-webkit-transition`
 * @typedef {object} styleOptions
 */

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {fieldOptions} options.fields A {@link module:braintree-web/hosted-fields~fieldOptions set of options for each field}.
 * @param {styleOptions} [options.styles] {@link module:braintree-web/hosted-fields~styleOptions Styles} applied to each field.
 * @param {boolean} [options.preventAutofill=false] When true, browsers will not try to prompt the customer to autofill their credit card information.
 * @param {callback} [callback] The second argument, `data`, is the {@link HostedFields} instance. If no callback is provided, `create` returns a promise that resolves with the {@link HostedFields} instance.
 * @returns {void}
 * @example
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       'font-size': '16pt',
 *       'color': '#3A3A3A'
 *     },
 *     '.number': {
 *       'font-family': 'monospace'
 *     },
 *     '.valid': {
 *       'color': 'green'
 *     }
 *   },
 *   fields: {
 *     number: {
 *       container: '#card-number'
 *     },
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       container: '#expiration-date'
 *     }
 *   }
 * }, callback);
 * @example <caption>With cardholder name</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     number: {
 *       container: '#card-number'
 *     },
 *     cardholderName: {
 *       container: '#cardholder-name'
 *     },
 *     cvv: {
 *       container: '#cvv',
 *     },
 *     expirationDate: {
 *       container: '#expiration-date'
 *     }
 *   }
 * }, callback);
 * @example <caption>Applying styles with a class name</caption>
 * // in document head
 * <style>
 *   .braintree-input-class {
 *     color: black;
 *   }
 *   .braintree-valid-class {
 *     color: green;
 *   }
 *   .braintree-invalid-class {
 *     color: red;
 *   }
 * </style>
 * // in a script tag
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': 'braintree-input-class',
 *     '.invalid': 'braintree-invalid-class',
 *     '.valid': {
 *       // you can also use the object syntax alongside
 *       // the class name syntax
 *       color: green;
 *     }
 *   },
 *   fields: {
 *     number: {
 *       container: '#card-number'
 *     },
 *     // etc...
 *   }
 * }, callback);
 * @example <caption>Right to Left Language Support</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       // other styles
 *       direction: 'rtl'
 *     },
 *   },
 *   fields: {
 *     number: {
 *       container: '#card-number',
 *       // Credit card formatting is not currently supported
 *       // with RTL languages, so we need to turn it off for the number input
 *       formatInput: false
 *     },
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       container: '#expiration-date',
 *       type: 'month'
 *     }
 *   }
 * }, callback);
 * @example <caption>Setting up Hosted Fields to tokenize CVV only</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     // Only add the `cvv` option.
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     }
 *   }
 * }, callback);
 * @example <caption>Creating an expiration date update form with prefilled data</caption>
 * var storedCreditCardInformation = {
 *   // get this info from your server
 *   // with a payment method lookup
 *   month: '09',
 *   year: '2017'
 * };
 *
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     expirationMonth: {
 *       container: '#expiration-month',
 *       prefill: storedCreditCardInformation.month
 *     },
 *     expirationYear: {
 *       container: '#expiration-year',
 *       prefill: storedCreditCardInformation.year
 *     }
 *   }
 * }, callback);
 * @example <caption>Validate the card form for supported card types</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     number: {
 *       container: '#card-number',
 *       supportedCardBrands: {
 *         visa: false, // prevents Visas from showing up as valid even when the Braintree control panel is configured to allow them
 *         'diners-club': true // allow Diners Club cards to be valid (processed as Discover cards on the Braintree backend)
 *       }
 *     },
 *     cvv: {
 *       container: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       container: '#expiration-date',
 *       type: 'month'
 *     }
 *   },
 * }, callback);
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'Hosted Fields',
    authorization: options.authorization,
    client: options.client
  }).then(function () {
    var integration = new HostedFields(options);

    return new Promise(function (resolve, reject) {
      integration.on('ready', function () {
        resolve(integration);
      });
      integration.on('timeout', function () {
        reject(new BraintreeError(errors.HOSTED_FIELDS_TIMEOUT));
      });
    });
  });
}

module.exports = {
  /**
   * @static
   * @function supportsInputFormatting
   * @description Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true. For a list of unsupported browsers, [go here](https://github.com/braintree/restricted-input/blob/main/README.md#browsers-where-formatting-is-turned-off-automatically).
   * @returns {Boolean} Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true.
   * @example
   * <caption>Conditionally choosing split expiration date inputs if formatting is unavailable</caption>
   * var canFormat = braintree.hostedFields.supportsInputFormatting();
   * var fields = {
   *   number: {
   *     container: '#card-number'
   *   },
   *   cvv: {
   *     container: '#cvv'
   *   }
   * };
   *
   * if (canFormat) {
   *   fields.expirationDate = {
   *     selection: '#expiration-date'
   *   };
   *   functionToCreateAndInsertExpirationDateDivToForm();
   * } else {
   *   fields.expirationMonth = {
   *     selection: '#expiration-month'
   *   };
   *   fields.expirationYear = {
   *     selection: '#expiration-year'
   *   };
   *   functionToCreateAndInsertExpirationMonthAndYearDivsToForm();
   * }
   *
   * braintree.hostedFields.create({
   *   client: clientInstance,
   *   styles: {
   *     // Styles
   *   },
   *   fields: fields
   * }, callback);
   */
  supportsInputFormatting: supportsInputFormatting,
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":96,"../lib/braintree-error":98,"../lib/promise":130,"./external/hosted-fields":83,"./shared/errors":88,"@braintree/wrap-promise":50,"restricted-input/supports-input-formatting":189}],86:[function(require,module,exports){
'use strict';

var isAndroid = require('@braintree/browser-detection/is-android');
var isChromeOS = require('@braintree/browser-detection/is-chrome-os');
var isIos = require('@braintree/browser-detection/is-ios');
var isChrome = require('@braintree/browser-detection/is-chrome');

function hasSoftwareKeyboard() {
  return isAndroid() || isChromeOS() || isIos();
}

function isChromeIos() {
  return isChrome() && isIos();
}

module.exports = {
  isIE: require('@braintree/browser-detection/is-ie'),
  isEdge: require('@braintree/browser-detection/is-edge'),
  isIe9: require('@braintree/browser-detection/is-ie9'),
  isIe10: require('@braintree/browser-detection/is-ie10'),
  isAndroid: isAndroid,
  isChromeOS: isChromeOS,
  isChromeIos: isChromeIos,
  isFirefox: require('@braintree/browser-detection/is-firefox'),
  isIos: isIos,
  isIosWebview: require('@braintree/browser-detection/is-ios-webview'),
  hasSoftwareKeyboard: hasSoftwareKeyboard
};

},{"@braintree/browser-detection/is-android":26,"@braintree/browser-detection/is-chrome":28,"@braintree/browser-detection/is-chrome-os":27,"@braintree/browser-detection/is-edge":29,"@braintree/browser-detection/is-firefox":30,"@braintree/browser-detection/is-ie":31,"@braintree/browser-detection/is-ie10":32,"@braintree/browser-detection/is-ie9":33,"@braintree/browser-detection/is-ios":37,"@braintree/browser-detection/is-ios-webview":35}],87:[function(require,module,exports){
'use strict';

var enumerate = require('../../lib/enumerate');
var errors = require('./errors');
var VERSION = "3.78.2";

var constants = {
  VERSION: VERSION,
  maxExpirationYearAge: 19,
  externalEvents: {
    FOCUS: 'focus',
    BLUR: 'blur',
    EMPTY: 'empty',
    NOT_EMPTY: 'notEmpty',
    VALIDITY_CHANGE: 'validityChange',
    CARD_TYPE_CHANGE: 'cardTypeChange'
  },
  defaultMaxLengths: {
    number: 19,
    postalCode: 8,
    expirationDate: 7,
    expirationMonth: 2,
    expirationYear: 4,
    cvv: 3
  },
  externalClasses: {
    FOCUSED: 'braintree-hosted-fields-focused',
    INVALID: 'braintree-hosted-fields-invalid',
    VALID: 'braintree-hosted-fields-valid'
  },
  navigationDirections: {
    BACK: 'before',
    FORWARD: 'after'
  },
  defaultIFrameStyle: {
    border: 'none',
    width: '100%',
    height: '100%',
    'float': 'left'
  },
  tokenizationErrorCodes: {
    81724: errors.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
    // NEXT_MAJOR_VERSION this error triggers for both AVS and CVV errors
    // but the code name implies that it would only trigger for CVV verification
    // failures
    81736: errors.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED
  },
  allowedStyles: [
    '-moz-appearance',
    '-moz-box-shadow',
    '-moz-osx-font-smoothing',
    '-moz-tap-highlight-color',
    '-moz-transition',
    '-webkit-appearance',
    '-webkit-box-shadow',
    '-webkit-font-smoothing',
    '-webkit-tap-highlight-color',
    '-webkit-transition',
    'appearance',
    'box-shadow',
    'color',
    'direction',
    'font',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-variant-alternates',
    'font-variant-caps',
    'font-variant-east-asian',
    'font-variant-ligatures',
    'font-variant-numeric',
    'font-weight',
    'letter-spacing',
    'line-height',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'opacity',
    'outline',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'text-align',
    'text-shadow',
    'transition'
  ],
  allowedFields: {
    cardholderName: {
      name: 'cardholder-name',
      label: 'Cardholder Name'
    },
    number: {
      name: 'credit-card-number',
      label: 'Credit Card Number'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV'
    },
    expirationDate: {
      name: 'expiration',
      label: 'Expiration Date'
    },
    expirationMonth: {
      name: 'expiration-month',
      label: 'Expiration Month'
    },
    expirationYear: {
      name: 'expiration-year',
      label: 'Expiration Year'
    },
    postalCode: {
      name: 'postal-code',
      label: 'Postal Code'
    }
  },
  allowedAttributes: {
    'aria-invalid': 'boolean',
    'aria-required': 'boolean',
    disabled: 'boolean',
    placeholder: 'string'
  },
  autocompleteMappings: {
    'cardholder-name': 'cc-name',
    'credit-card-number': 'cc-number',
    expiration: 'cc-exp',
    'expiration-month': 'cc-exp-month',
    'expiration-year': 'cc-exp-year',
    cvv: 'cc-csc',
    'postal-code': 'billing postal-code'
  }
};

constants.events = enumerate([
  'ADD_CLASS',
  'AUTOFILL_DATA_AVAILABLE',
  'BIN_AVAILABLE',
  'CARD_FORM_ENTRY_HAS_BEGUN',
  'CLEAR_FIELD',
  'CONFIGURATION',
  'FRAME_READY',
  'INPUT_EVENT',
  'READY_FOR_CLIENT',
  'REMOVE_ATTRIBUTE',
  'REMOVE_CLASS',
  'REMOVE_FOCUS_INTERCEPTS',
  'SET_ATTRIBUTE',
  'SET_MESSAGE',
  'SET_MONTH_OPTIONS',
  'TOKENIZATION_REQUEST',
  'TRIGGER_FOCUS_CHANGE',
  'TRIGGER_INPUT_FOCUS',
  'VALIDATE_STRICT'
], 'hosted-fields:');

module.exports = constants;

},{"../../lib/enumerate":107,"./errors":88}],88:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Hosted Fields - Creation Error Codes
 * @description Errors that occur when [creating the Hosted Fields component](./module-braintree-web_hosted-fields.html#.create).
 * @property {UNKNOWN} HOSTED_FIELDS_TIMEOUT Occurs when Hosted Fields does not finish setting up within 60 seconds.
 * @property {MERCHANT} HOSTED_FIELDS_INVALID_FIELD_KEY Occurs when Hosted Fields is instantiated with an invalid Field option.
 * @property {MERCHANT} HOSTED_FIELDS_INVALID_FIELD_SELECTOR Occurs when Hosted Fields given a field selector that is not valid.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME Occurs when Hosted Fields given a field selector that already contains an iframe.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_PROPERTY_INVALID Occurs when a field configuration option is not valid.
 */

/**
 * @name BraintreeError.Hosted Fields - Field Manipulation Error Codes
 * @description Errors that occur when modifying fields through [`addClass`](./HostedFields.html#addClass), [`removeClass`](./HostedFields.html#removeClass), [`setAttribute`](./HostedFields.html#setAttribute), [`removeAttribute`](./HostedFields.html#removeAttribute), [`clear`](./HostedFields.html#clear), [`focus`](./HostedFields.html#focus), and [`setMonthOptions`](./HostedFields.html#setMonthOptions).
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_INVALID Occurs when attempting to modify a field that is not a valid Hosted Fields option.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_NOT_PRESENT Occurs when attempting to modify a field that is not configured with Hosted Fields.
 * @property {MERCHANT} HOSTED_FIELDS_FIELD_PROPERTY_INVALID Occurs when a field configuration option is not valid.
 */

/**
 * @name BraintreeError.Hosted Fields - Set Attribute Error Codes
 * @description Errors that occur when using the [`setAttribute` method](./HostedFields.html#setAttribute)
 * @property {MERCHANT} HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED Occurs when trying to set an attribute that is not supported to be set.
 * @property {MERCHANT} HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED Occurs when the type of value for an attribute is not allowed to be set.
 */

/**
 * @name BraintreeError.Hosted Fields - Tokenize Error Codes
 * @description Errors that occur when [tokenizing the card details with Hosted Fields](./HostedFields.html#tokenize).
 * @property {NETWORK} HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR Occurs when the Braintree gateway cannot be contacted.
 * @property {CUSTOMER} HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE Occurs when attempting to vault a card, but the client token being used is configured to fail if the card already exists in the vault.
 * @property {CUSTOMER} HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED Occurs when cvv verification is turned on in the Braintree control panel.
 * @property {CUSTOMER} HOSTED_FIELDS_FAILED_TOKENIZATION Occurs when the credit card details were sent to Braintree, but failed to tokenize.
 * @property {CUSTOMER} HOSTED_FIELDS_FIELDS_EMPTY Occurs when all the Hosted Fields inputs are empty.
 * @property {CUSTOMER} HOSTED_FIELDS_FIELDS_INVALID Occurs when one ore more fields are invalid.
 */

var BraintreeError = require('../../lib/braintree-error');

module.exports = {
  HOSTED_FIELDS_TIMEOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'HOSTED_FIELDS_TIMEOUT',
    message: 'Hosted Fields timed out when attempting to set up.'
  },
  HOSTED_FIELDS_INVALID_FIELD_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_KEY'
  },
  HOSTED_FIELDS_INVALID_FIELD_SELECTOR: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_SELECTOR',
    message: 'Selector does not reference a valid DOM node.'
  },
  HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME',
    message: 'Element already contains a Braintree iframe.'
  },
  HOSTED_FIELDS_FIELD_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_INVALID'
  },
  HOSTED_FIELDS_FIELD_NOT_PRESENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_NOT_PRESENT'
  },
  HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR',
    message: 'A tokenization network error occurred.'
  },
  HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE',
    message: 'This credit card already exists in the merchant\'s vault.'
  },
  HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED',
    message: 'CVV verification failed during tokenization.'
  },
  HOSTED_FIELDS_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FAILED_TOKENIZATION',
    message: 'The supplied card data failed tokenization.'
  },
  HOSTED_FIELDS_FIELDS_EMPTY: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_EMPTY',
    message: 'All fields are empty. Cannot tokenize empty card fields.'
  },
  HOSTED_FIELDS_FIELDS_INVALID: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_INVALID',
    message: 'Some payment input fields are invalid. Cannot tokenize invalid card fields.'
  },
  HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED'
  },
  HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED'
  },
  HOSTED_FIELDS_FIELD_PROPERTY_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_PROPERTY_INVALID'
  }
};

},{"../../lib/braintree-error":98}],89:[function(require,module,exports){
'use strict';

function findParentTags(element, tag) {
  var parent = element.parentNode;
  var parents = [];

  while (parent != null) {
    if (parent.tagName != null && parent.tagName.toLowerCase() === tag) {
      parents.push(parent);
    }

    parent = parent.parentNode;
  }

  return parents;
}

module.exports = findParentTags;

},{}],90:[function(require,module,exports){
'use strict';

var browserDetection = require('./browser-detection');
var classList = require('@braintree/class-list');
var constants = require('./constants');
var allowedFields = Object.keys(constants.allowedFields);
var directions = constants.navigationDirections;

var focusIntercept = {
  generate: function (hostedFieldsId, type, direction, handler) {
    var input = document.createElement('input');
    var focusInterceptStyles = {
      border: 'none !important',
      display: 'block !important',
      height: '1px !important',
      left: '-1px !important',
      opacity: '0 !important',
      position: 'absolute !important',
      top: '-1px !important',
      width: '1px !important'
    };
    var shouldCreateFocusIntercept = browserDetection.hasSoftwareKeyboard() ||
      browserDetection.isFirefox() || browserDetection.isIE();

    if (!shouldCreateFocusIntercept) { return document.createDocumentFragment(); }

    input.setAttribute('aria-hidden', 'true');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('data-braintree-direction', direction);
    input.setAttribute('data-braintree-type', type);
    input.setAttribute('id', 'bt-' + type + '-' + direction + '-' + hostedFieldsId);
    input.setAttribute('style',
      JSON.stringify(focusInterceptStyles)
        .replace(/[{}"]/g, '')
        .replace(/,/g, ';'));

    classList.add(input, 'focus-intercept');

    input.addEventListener('focus', function (event) {
      handler(event);

      /*
        Certain browsers without software keyboards (Firefox, Internet
        Explorer) need the focus intercept inputs that get inserted
        around the actual input to blur themselves, otherwise the
        browser gets confused about what should have focus. Can't
        apply this to browsers with software keyboards however,
        because it blurs everything, and focus on the actual input is
        also lost.
      */
      if (!browserDetection.hasSoftwareKeyboard()) {
        input.blur();
      }
    });

    return input;
  },
  destroy: function (idString) {
    var focusInputs;

    if (!idString) {
      focusInputs = document.querySelectorAll('[data-braintree-direction]');
      focusInputs = [].slice.call(focusInputs);
    } else {
      focusInputs = [document.getElementById(idString)];
    }

    focusInputs.forEach(function (node) {
      if (node && node.nodeType === 1 && focusIntercept.matchFocusElement(node.getAttribute('id'))) {
        node.parentNode.removeChild(node);
      }
    });
  },
  matchFocusElement: function (idString) {
    var idComponents, hasBTPrefix, isAllowedType, isValidDirection;

    if (!idString) { return false; }

    idComponents = idString.split('-');

    if (idComponents.length < 4) { return false; }

    hasBTPrefix = idComponents[0] === 'bt';
    isAllowedType = allowedFields.indexOf(idComponents[1]) > -1;
    isValidDirection = idComponents[2] === directions.BACK || idComponents[2] === directions.FORWARD;

    return Boolean(
      hasBTPrefix &&
      isAllowedType &&
      isValidDirection
    );
  }
};

module.exports = focusIntercept;

},{"./browser-detection":86,"./constants":87,"@braintree/class-list":39}],91:[function(require,module,exports){
'use strict';

var creditCardType = require('credit-card-type');

module.exports = function (number) {
  var results = creditCardType(number);

  results.forEach(function (card) {
    // NEXT_MAJOR_VERSION credit-card-type fixed the mastercard enum
    // but we still pass master-card in the braintree API
    // in a major version bump, we can remove this and
    // this will be mastercard instead of master-card
    if (card.type === 'mastercard') {
      card.type = 'master-card';
    }
  });

  return results;
};

},{"credit-card-type":164}],92:[function(require,module,exports){
'use strict';

var createAuthorizationData = require('./create-authorization-data');
var jsonClone = require('./json-clone');
var constants = require('./constants');

function addMetadata(configuration, data) {
  var key;
  var attrs = data ? jsonClone(data) : {};
  var authAttrs = createAuthorizationData(configuration.authorization).attrs;
  var _meta = jsonClone(configuration.analyticsMetadata);

  attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;

  for (key in attrs._meta) {
    if (attrs._meta.hasOwnProperty(key)) {
      _meta[key] = attrs._meta[key];
    }
  }

  attrs._meta = _meta;

  if (authAttrs.tokenizationKey) {
    attrs.tokenizationKey = authAttrs.tokenizationKey;
  } else {
    attrs.authorizationFingerprint = authAttrs.authorizationFingerprint;
  }

  return attrs;
}

module.exports = addMetadata;

},{"./constants":99,"./create-authorization-data":103,"./json-clone":127}],93:[function(require,module,exports){
'use strict';

var Promise = require('./promise');
var constants = require('./constants');
var addMetadata = require('./add-metadata');

function sendAnalyticsEvent(clientInstanceOrPromise, kind, callback) {
  var timestamp = Date.now(); // milliseconds

  return Promise.resolve(clientInstanceOrPromise).then(function (client) {
    var timestampInPromise = Date.now();
    var configuration = client.getConfiguration();
    var request = client._request;
    var url = configuration.gatewayConfiguration.analytics.url;
    var data = {
      analytics: [{
        kind: constants.ANALYTICS_PREFIX + kind,
        isAsync: Math.floor(timestampInPromise / 1000) !== Math.floor(timestamp / 1000),
        timestamp: timestamp
      }]
    };

    request({
      url: url,
      method: 'post',
      data: addMetadata(configuration, data),
      timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
    }, callback);
  });
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};

},{"./add-metadata":92,"./constants":99,"./promise":130}],94:[function(require,module,exports){
'use strict';

var loadScript = require('@braintree/asset-loader/load-script');

module.exports = {
  loadScript: loadScript
};

},{"@braintree/asset-loader/load-script":5}],95:[function(require,module,exports){
'use strict';

var assignNormalized = typeof Object.assign === 'function' ? Object.assign : assignPolyfill;

function assignPolyfill(destination) {
  var i, source, key;

  for (i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }
  }

  return destination;
}

module.exports = {
  assign: assignNormalized,
  _assign: assignPolyfill
};

},{}],96:[function(require,module,exports){
'use strict';

var BraintreeError = require('./braintree-error');
var Promise = require('./promise');
var sharedErrors = require('./errors');
var VERSION = "3.78.2";

function basicComponentVerification(options) {
  var client, authorization, name;

  if (!options) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.type,
      code: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.code,
      message: 'Options must be passed to basicComponentVerification function.'
    }));
  }

  name = options.name;
  client = options.client;
  authorization = options.authorization;

  if (!client && !authorization) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      // NEXT_MAJOR_VERSION in major version, we expose passing in authorization for all components
      // instead of passing in a client instance. Leave this a silent feature for now.
      message: 'options.client is required when instantiating ' + name + '.'
    }));
  }

  if (!authorization && client.getVersion() !== VERSION) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + client.getVersion() + ') and ' + name + ' (version ' + VERSION + ') components must be from the same SDK version.'
    }));
  }

  return Promise.resolve();
}

module.exports = {
  verify: basicComponentVerification
};

},{"./braintree-error":98,"./errors":108,"./promise":130}],97:[function(require,module,exports){
'use strict';

var once = require('./once');

function call(fn, callback) {
  var isSync = fn.length === 0;

  if (isSync) {
    fn();
    callback(null);
  } else {
    fn(callback);
  }
}

module.exports = function (functions, cb) {
  var i;
  var length = functions.length;
  var remaining = length;
  var callback = once(cb);

  if (length === 0) {
    callback(null);

    return;
  }

  function finish(err) {
    if (err) {
      callback(err);

      return;
    }

    remaining -= 1;
    if (remaining === 0) {
      callback(null);
    }
  }

  for (i = 0; i < length; i++) {
    call(functions[i], finish);
  }
};

},{"./once":129}],98:[function(require,module,exports){
'use strict';

var enumerate = require('./enumerate');

/**
 * @class
 * @global
 * @param {object} options Construction options
 * @classdesc This class is used to report error conditions, frequently as the first parameter to callbacks throughout the Braintree SDK.
 * @description <strong>You cannot use this constructor directly. Interact with instances of this class through {@link callback callbacks}.</strong>
 */
function BraintreeError(options) {
  if (!BraintreeError.types.hasOwnProperty(options.type)) {
    throw new Error(options.type + ' is not a valid type.');
  }

  if (!options.code) {
    throw new Error('Error code required.');
  }

  if (!options.message) {
    throw new Error('Error message required.');
  }

  this.name = 'BraintreeError';

  /**
   * @type {string}
   * @description A code that corresponds to specific errors.
   */
  this.code = options.code;

  /**
   * @type {string}
   * @description A short description of the error.
   */
  this.message = options.message;

  /**
   * @type {BraintreeError.types}
   * @description The type of error.
   */
  this.type = options.type;

  /**
   * @type {object=}
   * @description Additional information about the error, such as an underlying network error response.
   */
  this.details = options.details;
}

BraintreeError.prototype = Object.create(Error.prototype);
BraintreeError.prototype.constructor = BraintreeError;

/**
 * Enum for {@link BraintreeError} types.
 * @name BraintreeError.types
 * @enum
 * @readonly
 * @memberof BraintreeError
 * @property {string} CUSTOMER An error caused by the customer.
 * @property {string} MERCHANT An error that is actionable by the merchant.
 * @property {string} NETWORK An error due to a network problem.
 * @property {string} INTERNAL An error caused by Braintree code.
 * @property {string} UNKNOWN An error where the origin is unknown.
 */
BraintreeError.types = enumerate([
  'CUSTOMER',
  'MERCHANT',
  'NETWORK',
  'INTERNAL',
  'UNKNOWN'
]);

BraintreeError.findRootError = function (err) {
  if (err instanceof BraintreeError && err.details && err.details.originalError) {
    return BraintreeError.findRootError(err.details.originalError);
  }

  return err;
};

module.exports = BraintreeError;

},{"./enumerate":107}],99:[function(require,module,exports){
'use strict';

var VERSION = "3.78.2";
var PLATFORM = 'web';

var CLIENT_API_URLS = {
  production: 'https://api.braintreegateway.com:443',
  sandbox: 'https://api.sandbox.braintreegateway.com:443'
};

var ASSETS_URLS = {
  production: 'https://assets.braintreegateway.com',
  sandbox: 'https://assets.braintreegateway.com'
};

var GRAPHQL_URLS = {
  production: 'https://payments.braintree-api.com/graphql',
  sandbox: 'https://payments.sandbox.braintree-api.com/graphql'
};

module.exports = {
  ANALYTICS_PREFIX: PLATFORM + '.',
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  ASSETS_URLS: ASSETS_URLS,
  CLIENT_API_URLS: CLIENT_API_URLS,
  FRAUDNET_SOURCE: 'BRAINTREE_SIGNIN',
  FRAUDNET_FNCLS: 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99',
  FRAUDNET_URL: 'https://c.paypal.com/da/r/fb.js',
  BUS_CONFIGURATION_REQUEST_EVENT: 'BUS_CONFIGURATION_REQUEST',
  GRAPHQL_URLS: GRAPHQL_URLS,
  INTEGRATION_TIMEOUT_MS: 60000,
  VERSION: VERSION,
  INTEGRATION: 'custom',
  SOURCE: 'client',
  PLATFORM: PLATFORM,
  BRAINTREE_LIBRARY_VERSION: 'braintree/' + PLATFORM + '/' + VERSION
};

},{}],100:[function(require,module,exports){
'use strict';

var BraintreeError = require('./braintree-error');
var sharedErrors = require('./errors');

module.exports = function (instance, methodNames) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = function () {
      throw new BraintreeError({
        type: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
        code: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
        message: methodName + ' cannot be called after teardown.'
      });
    };
  });
};

},{"./braintree-error":98,"./errors":108}],101:[function(require,module,exports){
'use strict';

var BraintreeError = require('./braintree-error');

function convertToBraintreeError(originalErr, btErrorObject) {
  if (originalErr instanceof BraintreeError) {
    return originalErr;
  }

  return new BraintreeError({
    type: btErrorObject.type,
    code: btErrorObject.code,
    message: btErrorObject.message,
    details: {
      originalError: originalErr
    }
  });
}

module.exports = convertToBraintreeError;

},{"./braintree-error":98}],102:[function(require,module,exports){
'use strict';

var ASSETS_URLS = require('./constants').ASSETS_URLS;

function createAssetsUrl(authorization) {

  return ASSETS_URLS.production;
}
/* eslint-enable */

module.exports = {
  create: createAssetsUrl
};

},{"./constants":99}],103:[function(require,module,exports){
'use strict';

var atob = require('../lib/vendor/polyfill').atob;
var CLIENT_API_URLS = require('../lib/constants').CLIENT_API_URLS;

function _isTokenizationKey(str) {
  return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
}

function _parseTokenizationKey(tokenizationKey) {
  var tokens = tokenizationKey.split('_');
  var environment = tokens[0];
  var merchantId = tokens.slice(2).join('_');

  return {
    merchantId: merchantId,
    environment: environment
  };
}

function createAuthorizationData(authorization) {
  var parsedClientToken, parsedTokenizationKey;
  var data = {
    attrs: {},
    configUrl: ''
  };

  if (_isTokenizationKey(authorization)) {
    parsedTokenizationKey = _parseTokenizationKey(authorization);
    data.environment = parsedTokenizationKey.environment;
    data.attrs.tokenizationKey = authorization;
    data.configUrl = CLIENT_API_URLS[parsedTokenizationKey.environment] + '/merchants/' + parsedTokenizationKey.merchantId + '/client_api/v1/configuration';
  } else {
    parsedClientToken = JSON.parse(atob(authorization));
    data.environment = parsedClientToken.environment;
    data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
    data.configUrl = parsedClientToken.configUrl;
    data.graphQL = parsedClientToken.graphQL;
  }

  return data;
}

module.exports = createAuthorizationData;

},{"../lib/constants":99,"../lib/vendor/polyfill":134}],104:[function(require,module,exports){
'use strict';

var BraintreeError = require('./braintree-error');
var Promise = require('./promise');
var assets = require('./assets');
var sharedErrors = require('./errors');

var VERSION = "3.78.2";

function createDeferredClient(options) {
  var promise = Promise.resolve();

  if (options.client) {
    return Promise.resolve(options.client);
  }

  if (!(window.braintree && window.braintree.client)) {
    promise = assets.loadScript({
      src: options.assetsUrl + '/web/' + VERSION + '/js/client.min.js'
    }).catch(function (err) {
      return Promise.reject(new BraintreeError({
        type: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.type,
        code: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.code,
        message: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.message,
        details: {
          originalError: err
        }
      }));
    });
  }

  return promise.then(function () {
    if (window.braintree.client.VERSION !== VERSION) {
      return Promise.reject(new BraintreeError({
        type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
        code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
        message: 'Client (version ' + window.braintree.client.VERSION + ') and ' + options.name + ' (version ' + VERSION + ') components must be from the same SDK version.'
      }));
    }

    return window.braintree.client.create({
      authorization: options.authorization,
      debug: options.debug
    });
  });
}

module.exports = {
  create: createDeferredClient
};

},{"./assets":94,"./braintree-error":98,"./errors":108,"./promise":130}],105:[function(require,module,exports){
'use strict';

module.exports = function (fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
};

},{}],106:[function(require,module,exports){
'use strict';

var batchExecuteFunctions = require('./batch-execute-functions');

function Destructor() {
  this._teardownRegistry = [];

  this._isTearingDown = false;
}

Destructor.prototype.registerFunctionForTeardown = function (fn) {
  if (typeof fn === 'function') {
    this._teardownRegistry.push(fn);
  }
};

Destructor.prototype.teardown = function (callback) {
  if (this._isTearingDown) {
    callback(new Error('Destructor is already tearing down'));

    return;
  }

  this._isTearingDown = true;

  batchExecuteFunctions(this._teardownRegistry, function (err) {
    this._teardownRegistry = [];
    this._isTearingDown = false;

    if (typeof callback === 'function') {
      callback(err);
    }
  }.bind(this));
};

module.exports = Destructor;

},{"./batch-execute-functions":97}],107:[function(require,module,exports){
'use strict';

function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;

},{}],108:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Shared Internal Error Codes
 * @ignore
 * @description These codes should never be experienced by the merchant directly.
 * @property {INTERNAL} INVALID_USE_OF_INTERNAL_FUNCTION Occurs when the client is created without a gateway configuration. Should never happen.
 */

/**
 * @name BraintreeError.Shared Errors - Component Creation Error Codes
 * @description Errors that occur when creating components.
 * @property {MERCHANT} INSTANTIATION_OPTION_REQUIRED Occurs when a component is created that is missing a required option.
 * @property {MERCHANT} INCOMPATIBLE_VERSIONS Occurs when a component is created with a client with a different version than the component.
 * @property {NETWORK} CLIENT_SCRIPT_FAILED_TO_LOAD Occurs when a component attempts to load the Braintree client script, but the request fails.
 */

/**
 * @name BraintreeError.Shared Errors - Component Instance Error Codes
 * @description Errors that occur when using instances of components.
 * @property {MERCHANT} METHOD_CALLED_AFTER_TEARDOWN Occurs when a method is called on a component instance after it has been torn down.
 */

var BraintreeError = require('./braintree-error');

module.exports = {
  INVALID_USE_OF_INTERNAL_FUNCTION: {
    type: BraintreeError.types.INTERNAL,
    code: 'INVALID_USE_OF_INTERNAL_FUNCTION'
  },
  INSTANTIATION_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'INSTANTIATION_OPTION_REQUIRED'
  },
  INCOMPATIBLE_VERSIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'INCOMPATIBLE_VERSIONS'
  },
  CLIENT_SCRIPT_FAILED_TO_LOAD: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_SCRIPT_FAILED_TO_LOAD',
    message: 'Braintree client script could not be loaded.'
  },
  METHOD_CALLED_AFTER_TEARDOWN: {
    type: BraintreeError.types.MERCHANT,
    code: 'METHOD_CALLED_AFTER_TEARDOWN'
  }
};

},{"./braintree-error":98}],109:[function(require,module,exports){
'use strict';

module.exports = function findRootNode(element) {
  while (element.parentNode) {
    element = element.parentNode;
  }

  return element;
};

},{}],110:[function(require,module,exports){
'use strict';

module.exports = function (array, key, value) {
  var i;

  for (i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty(key) && array[i][key] === value) {
      return array[i];
    }
  }

  return null;
};

},{}],111:[function(require,module,exports){
'use strict';

var Popup = require('./strategies/popup');
var PopupBridge = require('./strategies/popup-bridge');
var Modal = require('./strategies/modal');
var Bus = require('framebus');
var events = require('../shared/events');
var errors = require('../shared/errors');
var constants = require('../shared/constants');
var uuid = require('@braintree/uuid');
var iFramer = require('@braintree/iframer');
var BraintreeError = require('../../braintree-error');
var browserDetection = require('../shared/browser-detection');
var isHTTPS = require('../../is-https');
var assign = require('./../../assign').assign;
var BUS_CONFIGURATION_REQUEST_EVENT = require('../../constants').BUS_CONFIGURATION_REQUEST_EVENT;

var REQUIRED_CONFIG_KEYS = [
  'name',
  'dispatchFrameUrl',
  'openFrameUrl'
];

function noop() {}

function _validateFrameConfiguration(options) {
  if (!options) {
    throw new Error('Valid configuration is required');
  }

  REQUIRED_CONFIG_KEYS.forEach(function (key) {
    if (!options.hasOwnProperty(key)) {
      throw new Error('A valid frame ' + key + ' must be provided');
    }
  });

  if (!/^[\w_]+$/.test(options.name)) {
    throw new Error('A valid frame name must be provided');
  }
}

function FrameService(options) {
  _validateFrameConfiguration(options);

  this._serviceId = uuid().replace(/-/g, '');

  this._options = {
    name: options.name + '_' + this._serviceId,
    dispatchFrameUrl: options.dispatchFrameUrl,
    openFrameUrl: options.openFrameUrl,
    height: options.height,
    width: options.width,
    top: options.top,
    left: options.left
  };
  this.state = options.state || {};

  this._bus = new Bus({channel: this._serviceId});
  this._setBusEvents();
}

FrameService.prototype.initialize = function (callback) {
  var dispatchFrameReadyHandler = function () {
    callback();
    this._bus.off(events.DISPATCH_FRAME_READY, dispatchFrameReadyHandler);
  }.bind(this);

  this._bus.on(events.DISPATCH_FRAME_READY, dispatchFrameReadyHandler);
  this._writeDispatchFrame();
};

FrameService.prototype._writeDispatchFrame = function () {
  var frameName = constants.DISPATCH_FRAME_NAME + '_' + this._serviceId;
  var frameSrc = this._options.dispatchFrameUrl;

  this._dispatchFrame = iFramer({
    'aria-hidden': true,
    name: frameName,
    title: frameName,
    src: frameSrc,
    'class': constants.DISPATCH_FRAME_CLASS,
    height: 0,
    width: 0,
    style: {
      position: 'absolute',
      left: '-9999px'
    }
  });

  document.body.appendChild(this._dispatchFrame);
};

FrameService.prototype._setBusEvents = function () {
  this._bus.on(events.DISPATCH_FRAME_REPORT, function (res, reply) {
    if (this._onCompleteCallback) {
      this._onCompleteCallback.call(null, res.err, res.payload);
    }
    this._frame.close();

    this._onCompleteCallback = null;

    if (reply) {
      reply();
    }
  }.bind(this));

  this._bus.on(BUS_CONFIGURATION_REQUEST_EVENT, function (reply) {
    reply(this.state);
  }.bind(this));
};

FrameService.prototype.open = function (options, callback) {
  var error;

  options = options || {};
  this._frame = this._getFrameForEnvironment(options);

  this._frame.initialize(callback);

  if (this._frame instanceof PopupBridge) {
    return;
  }

  assign(this.state, options.state);

  this._onCompleteCallback = callback;
  this._frame.open();

  if (this.isFrameClosed()) {
    this._cleanupFrame();
    if (callback) {
      if (browserDetection.isIE() && !isHTTPS.isHTTPS()) {
        error = new BraintreeError(errors.FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG);
      } else {
        error = new BraintreeError(errors.FRAME_SERVICE_FRAME_OPEN_FAILED);
      }
      callback(error);
    }

    return;
  }
  this._pollForPopupClose();
};

FrameService.prototype.redirect = function (url) {
  if (this._frame && !this.isFrameClosed()) {
    this._frame.redirect(url);
  }
};

FrameService.prototype.close = function () {
  if (!this.isFrameClosed()) {
    this._frame.close();
  }
};

FrameService.prototype.focus = function () {
  if (!this.isFrameClosed()) {
    this._frame.focus();
  }
};

FrameService.prototype.createHandler = function (options) {
  options = options || {};

  return {
    close: function () {
      if (options.beforeClose) {
        options.beforeClose();
      }

      this.close();
    }.bind(this),
    focus: function () {
      if (options.beforeFocus) {
        options.beforeFocus();
      }

      this.focus();
    }.bind(this)
  };
};

FrameService.prototype.createNoopHandler = function () {
  return {
    close: noop,
    focus: noop
  };
};

FrameService.prototype.teardown = function () {
  this.close();
  this._dispatchFrame.parentNode.removeChild(this._dispatchFrame);
  this._dispatchFrame = null;
  this._cleanupFrame();
};

FrameService.prototype.isFrameClosed = function () {
  return this._frame == null || this._frame.isClosed();
};

FrameService.prototype._cleanupFrame = function () {
  this._frame = null;
  clearInterval(this._popupInterval);
  this._popupInterval = null;
};

FrameService.prototype._pollForPopupClose = function () {
  this._popupInterval = setInterval(function () {
    if (this.isFrameClosed()) {
      this._cleanupFrame();
      if (this._onCompleteCallback) {
        this._onCompleteCallback(new BraintreeError(errors.FRAME_SERVICE_FRAME_CLOSED));
      }
    }
  }.bind(this), constants.POPUP_POLL_INTERVAL);

  return this._popupInterval;
};

FrameService.prototype._getFrameForEnvironment = function (options) {
  var usePopup = browserDetection.supportsPopups();
  var popupBridgeExists = Boolean(window.popupBridge);

  var initOptions = assign({}, this._options, options);

  if (popupBridgeExists) {
    return new PopupBridge(initOptions);
  } else if (usePopup) {
    return new Popup(initOptions);
  }

  return new Modal(initOptions);
};

module.exports = FrameService;

},{"../../braintree-error":98,"../../constants":99,"../../is-https":125,"../shared/browser-detection":118,"../shared/constants":119,"../shared/errors":120,"../shared/events":121,"./../../assign":95,"./strategies/modal":113,"./strategies/popup":116,"./strategies/popup-bridge":114,"@braintree/iframer":42,"@braintree/uuid":46,"framebus":172}],112:[function(require,module,exports){
'use strict';

var FrameService = require('./frame-service');

module.exports = {
  create: function createFrameService(options, callback) {
    var frameService = new FrameService(options);

    frameService.initialize(function () {
      callback(frameService);
    });
  }
};

},{"./frame-service":111}],113:[function(require,module,exports){
'use strict';

var iFramer = require('@braintree/iframer');
var assign = require('../../../assign').assign;
var browserDetection = require('../../shared/browser-detection');

var ELEMENT_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  padding: 0,
  margin: 0,
  border: 0,
  outline: 'none',
  zIndex: 20001,
  background: '#FFFFFF'
};

function noop() {}

function Modal(options) {
  this._closed = null;
  this._frame = null;
  this._options = options || {};
  this._container = this._options.container || document.body;
}

Modal.prototype.initialize = noop;

Modal.prototype.open = function () {
  var iframerConfig = {
    src: this._options.openFrameUrl,
    name: this._options.name,
    scrolling: 'yes',
    height: '100%',
    width: '100%',
    style: assign({}, ELEMENT_STYLES),
    title: 'Lightbox Frame'
  };

  if (browserDetection.isIos()) {
    // WKWebView has buggy behavior when scrolling a fixed position modal. The workaround is to lock scrolling in
    // the background. When modal is closed, we restore scrolling and return to the previous scroll position.
    if (browserDetection.isIosWKWebview()) {
      this._lockScrolling();
      // Allows WKWebView to scroll all the way down to bottom
      iframerConfig.style = {};
    }

    this._el = document.createElement('div');

    assign(this._el.style, ELEMENT_STYLES, {
      height: '100%',
      width: '100%',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    });

    this._frame = iFramer(iframerConfig);
    this._el.appendChild(this._frame);
  } else {
    this._el = this._frame = iFramer(iframerConfig);
  }
  this._closed = false;

  this._container.appendChild(this._el);
};

Modal.prototype.focus = noop;

Modal.prototype.close = function () {
  this._container.removeChild(this._el);
  this._frame = null;
  this._closed = true;
  if (browserDetection.isIosWKWebview()) {
    this._unlockScrolling();
  }
};

Modal.prototype.isClosed = function () {
  return Boolean(this._closed);
};

Modal.prototype.redirect = function (redirectUrl) {
  this._frame.src = redirectUrl;
};

Modal.prototype._unlockScrolling = function () {
  document.body.style.overflow = this._savedBodyProperties.overflowStyle;
  document.body.style.position = this._savedBodyProperties.positionStyle;
  window.scrollTo(this._savedBodyProperties.left, this._savedBodyProperties.top);
  delete this._savedBodyProperties;
};

Modal.prototype._lockScrolling = function () {
  var doc = document.documentElement;

  // From https://stackoverflow.com/questions/9538868/prevent-body-from-scrolling-when-a-modal-is-opened#comment65626743_24727206
  this._savedBodyProperties = {
    left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
    top: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
    overflowStyle: document.body.style.overflow,
    positionStyle: document.body.style.position
  };
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  window.scrollTo(0, 0);
};

module.exports = Modal;

},{"../../../assign":95,"../../shared/browser-detection":118,"@braintree/iframer":42}],114:[function(require,module,exports){
'use strict';

var BraintreeError = require('../../../braintree-error');
var errors = require('../../shared/errors');

function noop() {}

function PopupBridge(options) {
  this._closed = null;
  this._options = options;
}

PopupBridge.prototype.initialize = function (callback) {
  var self = this;

  window.popupBridge.onComplete = function (err, payload) {
    var popupDismissed = !payload && !err;

    self._closed = true;

    if (err || popupDismissed) {
      // User clicked "Done" button of browser view
      callback(new BraintreeError(errors.FRAME_SERVICE_FRAME_CLOSED));

      return;
    }
    // User completed popup flow (includes success and cancel cases)
    callback(null, payload);
  };
};

PopupBridge.prototype.open = function (options) {
  var url;

  options = options || {};
  url = options.openFrameUrl || this._options.openFrameUrl;

  this._closed = false;
  window.popupBridge.open(url);
};

PopupBridge.prototype.focus = noop;

PopupBridge.prototype.close = noop;

PopupBridge.prototype.isClosed = function () {
  return Boolean(this._closed);
};

PopupBridge.prototype.redirect = function (redirectUrl) {
  this.open({openFrameUrl: redirectUrl});
};

module.exports = PopupBridge;

},{"../../../braintree-error":98,"../../shared/errors":120}],115:[function(require,module,exports){
'use strict';

var constants = require('../../../shared/constants');
var position = require('./position');

function calculatePosition(type, userDefinedPosition, size) {
  if (typeof userDefinedPosition !== 'undefined') {
    return userDefinedPosition;
  }

  return position[type](size);
}

module.exports = function composePopupOptions(options) {
  var height = options.height || constants.DEFAULT_POPUP_HEIGHT;
  var width = options.width || constants.DEFAULT_POPUP_WIDTH;
  var top = calculatePosition('top', options.top, height);
  var left = calculatePosition('left', options.left, width);

  return [
    constants.POPUP_BASE_OPTIONS,
    'height=' + height,
    'width=' + width,
    'top=' + top,
    'left=' + left
  ].join(',');
};

},{"../../../shared/constants":119,"./position":117}],116:[function(require,module,exports){
'use strict';

var composeOptions = require('./compose-options');

function noop() {}

function Popup(options) {
  this._frame = null;
  this._options = options || {};

  this.open();
}

Popup.prototype.initialize = noop;

Popup.prototype.open = function () {
  this._frame = window.open(
    this._options.openFrameUrl,
    this._options.name,
    composeOptions(this._options)
  );
};

Popup.prototype.focus = function () {
  this._frame.focus();
};

Popup.prototype.close = function () {
  if (this._frame.closed) {
    return;
  }
  this._frame.close();
};

Popup.prototype.isClosed = function () {
  return !this._frame || Boolean(this._frame.closed);
};

Popup.prototype.redirect = function (redirectUrl) {
  this._frame.location.href = redirectUrl;
};

module.exports = Popup;

},{"./compose-options":115}],117:[function(require,module,exports){
'use strict';

function top(height) {
  var windowHeight = window.outerHeight || document.documentElement.clientHeight;
  var windowTop = window.screenY == null ? window.screenTop : window.screenY;

  return center(windowHeight, height, windowTop);
}

function left(width) {
  var windowWidth = window.outerWidth || document.documentElement.clientWidth;
  var windowLeft = window.screenX == null ? window.screenLeft : window.screenX;

  return center(windowWidth, width, windowLeft);
}

function center(windowMetric, popupMetric, offset) {
  return ((windowMetric - popupMetric) / 2) + offset;
}

module.exports = {
  top: top,
  left: left,
  center: center
};

},{}],118:[function(require,module,exports){
'use strict';

module.exports = {
  isIos: require('@braintree/browser-detection/is-ios'),
  isIosWKWebview: require('@braintree/browser-detection/is-ios-wkwebview'),
  isIE: require('@braintree/browser-detection/is-ie'),
  supportsPopups: require('@braintree/browser-detection/supports-popups')
};


},{"@braintree/browser-detection/is-ie":31,"@braintree/browser-detection/is-ios":37,"@braintree/browser-detection/is-ios-wkwebview":36,"@braintree/browser-detection/supports-popups":38}],119:[function(require,module,exports){
'use strict';

module.exports = {
  DISPATCH_FRAME_NAME: 'dispatch',
  DISPATCH_FRAME_CLASS: 'braintree-dispatch-frame',
  POPUP_BASE_OPTIONS: 'resizable,scrollbars',
  DEFAULT_POPUP_WIDTH: 450,
  DEFAULT_POPUP_HEIGHT: 535,
  POPUP_POLL_INTERVAL: 100,
  POPUP_CLOSE_TIMEOUT: 100
};

},{}],120:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Popup Related Error Codes
 * @ignore
 * @description Errors that occur when using a component that opens a popup window.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_CLOSED - Occurs when the frame is closed before tokenization can occur.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_OPEN_FAILED - Occurs when the popup could not be opened.
 * @property {INTERNAL} FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG - Occurs when the frame could not be opened because of a specific bug in Internet Explorer - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11324352/.
 */

var BraintreeError = require('../../braintree-error');

module.exports = {
  FRAME_SERVICE_FRAME_CLOSED: {
    type: BraintreeError.types.INTERNAL,
    code: 'FRAME_SERVICE_FRAME_CLOSED',
    message: 'Frame closed before tokenization could occur.'
  },
  FRAME_SERVICE_FRAME_OPEN_FAILED: {
    type: BraintreeError.types.INTERNAL,
    code: 'FRAME_SERVICE_FRAME_OPEN_FAILED',
    message: 'Frame failed to open.'
  },
  FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG: {
    type: BraintreeError.types.INTERNAL,
    code: 'FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG',
    message: 'Could not open frame. This may be due to a bug in IE browsers when attempting to open an HTTPS page from a HTTP page. https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11324352/'
  }
};

},{"../../braintree-error":98}],121:[function(require,module,exports){
'use strict';

var enumerate = require('../../enumerate');

module.exports = enumerate([
  'DISPATCH_FRAME_READY',
  'DISPATCH_FRAME_REPORT'
], 'frameService:');

},{"../../enumerate":107}],122:[function(require,module,exports){
'use strict';

var VERSION = "3.78.2";
var assign = require('./assign').assign;

function generateTokenizationParameters(configuration, overrides) {
  var metadata = configuration.analyticsMetadata;
  var basicTokenizationParameters = {
    gateway: 'braintree',
    'braintree:merchantId': configuration.gatewayConfiguration.merchantId,
    'braintree:apiVersion': 'v1',
    'braintree:sdkVersion': VERSION,
    'braintree:metadata': JSON.stringify({
      source: metadata.source,
      integration: metadata.integration,
      sessionId: metadata.sessionId,
      version: VERSION,
      platform: metadata.platform
    })
  };

  return assign({}, basicTokenizationParameters, overrides);
}

module.exports = function (configuration, googlePayVersion, googleMerchantId) {
  var data, paypalPaymentMethod;
  var androidPayConfiguration = configuration.gatewayConfiguration.androidPay;
  var environment = configuration.gatewayConfiguration.environment === 'production' ? 'PRODUCTION' : 'TEST';

  if (googlePayVersion === 2) {
    data = {
      apiVersion: 2,
      apiVersionMinor: 0,
      environment: environment,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: [
            'PAN_ONLY',
            'CRYPTOGRAM_3DS'
          ],
          allowedCardNetworks:
            androidPayConfiguration.supportedNetworks.map(function (card) { return card.toUpperCase(); })
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: generateTokenizationParameters(configuration, {
            'braintree:authorizationFingerprint': androidPayConfiguration.googleAuthorizationFingerprint
          })
        }
      }]
    };

    if (googleMerchantId) {
      data.merchantInfo = {
        merchantId: googleMerchantId
      };
    }

    if (androidPayConfiguration.paypalClientId) {
      paypalPaymentMethod = {
        type: 'PAYPAL',
        parameters: {
          /* eslint-disable camelcase */
          purchase_context: {
            purchase_units: [
              {
                payee: {
                  client_id: androidPayConfiguration.paypalClientId
                },
                recurring_payment: true
              }
            ]
          }
          /* eslint-enable camelcase */
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: generateTokenizationParameters(configuration, {
            'braintree:paypalClientId': androidPayConfiguration.paypalClientId
          })
        }
      };

      data.allowedPaymentMethods.push(paypalPaymentMethod);
    }
  } else {
    data = {
      environment: environment,
      allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
      paymentMethodTokenizationParameters: {
        tokenizationType: 'PAYMENT_GATEWAY',
        parameters: generateTokenizationParameters(configuration, {
          'braintree:authorizationFingerprint': androidPayConfiguration.googleAuthorizationFingerprint
        })
      },
      cardRequirements: {
        allowedCardNetworks: androidPayConfiguration.supportedNetworks.map(function (card) { return card.toUpperCase(); })
      }
    };

    if (configuration.authorizationType === 'TOKENIZATION_KEY') {
      data.paymentMethodTokenizationParameters.parameters['braintree:clientKey'] = configuration.authorization;
    }

    if (googleMerchantId) {
      data.merchantId = googleMerchantId;
    }

    if (googlePayVersion) {
      data.apiVersion = googlePayVersion;
    }
  }

  return data;
};

},{"./assign":95}],123:[function(require,module,exports){
'use strict';

module.exports = function inIframe(win) {
  win = win || window;

  try {
    return win.self !== win.top;
  } catch (e) {
    return true;
  }
};

},{}],124:[function(require,module,exports){
'use strict';

function convertDateStringToDate(dateString) {
  var splitDate = dateString.split('-');

  return new Date(splitDate[0], splitDate[1], splitDate[2]);
}

function isDateStringBeforeOrOn(firstDate, secondDate) {
  return convertDateStringToDate(firstDate) <= convertDateStringToDate(secondDate);
}

module.exports = isDateStringBeforeOrOn;

},{}],125:[function(require,module,exports){
'use strict';

function isHTTPS(protocol) {
  protocol = protocol || window.location.protocol;

  return protocol === 'https:';
}

module.exports = {
  isHTTPS: isHTTPS
};

},{}],126:[function(require,module,exports){
'use strict';

var parser;
var legalHosts = {
  'paypal.com': 1,
  'braintreepayments.com': 1,
  'braintreegateway.com': 1,
  'braintree-api.com': 1
};

function stripSubdomains(domain) {
  return domain.split('.').slice(-2).join('.');
}

function isVerifiedDomain(url) {
  var mainDomain;

  url = url.toLowerCase();

  if (!/^https:/.test(url)) {
    return false;
  }

  parser = parser || document.createElement('a');
  parser.href = url;
  mainDomain = stripSubdomains(parser.hostname);

  return legalHosts.hasOwnProperty(mainDomain);
}

module.exports = isVerifiedDomain;

},{}],127:[function(require,module,exports){
'use strict';

module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};

},{}],128:[function(require,module,exports){
'use strict';

module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};

},{}],129:[function(require,module,exports){
'use strict';

function once(fn) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      fn.apply(null, arguments);
    }
  };
}

module.exports = once;

},{}],130:[function(require,module,exports){
'use strict';

var PromisePolyfill = require('promise-polyfill');
var ExtendedPromise = require('@braintree/extended-promise');

// eslint-disable-next-line no-undef
var PromiseGlobal = typeof Promise !== 'undefined' ? Promise : PromisePolyfill;

ExtendedPromise.suppressUnhandledPromiseMessage = true;
ExtendedPromise.setPromise(PromiseGlobal);

module.exports = PromiseGlobal;

},{"@braintree/extended-promise":41,"promise-polyfill":186}],131:[function(require,module,exports){
'use strict';

function _notEmpty(obj) {
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) { return true; }
  }

  return false;
}

/* eslint-disable no-mixed-operators */
function _isArray(value) {
  return value && typeof value === 'object' && typeof value.length === 'number' &&
    Object.prototype.toString.call(value) === '[object Array]' || false;
}
/* eslint-enable no-mixed-operators */

function hasQueryParams(url) {
  url = url || window.location.href;

  return /\?/.test(url);
}

function parse(url) {
  var query, params;

  url = url || window.location.href;

  if (!hasQueryParams(url)) {
    return {};
  }

  query = url.replace(/#.*$/, '').replace(/^.*\?/, '').split('&');

  params = query.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;

    return toReturn;
  }, {});

  return params;
}

function stringify(params, namespace) {
  var k, v, p;
  var query = [];

  for (p in params) {
    if (!params.hasOwnProperty(p)) {
      continue;
    }

    v = params[p];

    if (namespace) {
      if (_isArray(params)) {
        k = namespace + '[]';
      } else {
        k = namespace + '[' + p + ']';
      }
    } else {
      k = p;
    }
    if (typeof v === 'object') {
      query.push(stringify(v, k));
    } else {
      query.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }

  return query.join('&');
}

function queryify(url, params) {
  url = url || '';

  if (params != null && typeof params === 'object' && _notEmpty(params)) {
    url += url.indexOf('?') === -1 ? '?' : '';
    url += url.indexOf('=') !== -1 ? '&' : '';
    url += stringify(params);
  }

  return url;
}

module.exports = {
  parse: parse,
  stringify: stringify,
  queryify: queryify,
  hasQueryParams: hasQueryParams
};

},{}],132:[function(require,module,exports){
'use strict';

var uuid = require('@braintree/uuid');
var findRootNode = require('./find-root-node');

// based on https://github.com/krakenjs/belter/blob/cdddc4f8ddb172d29db9e7e1ad1eeeacfb93e215/src/dom.js#L981-L1031
// thanks @bluepnume

function isShadowElement(element) {
  element = findRootNode(element);

  return element.toString() === '[object ShadowRoot]';
}

function getShadowHost(element) {
  element = findRootNode(element);

  if (!isShadowElement(element)) {
    return null;
  }

  return element.host;
}

function transformToSlot(element, styles) {
  var styleNode = findRootNode(element).querySelector('style');
  var shadowHost = getShadowHost(element);
  var slotName = 'shadow-slot-' + uuid();
  var slot = document.createElement('slot');
  var slotProvider = document.createElement('div');

  slot.setAttribute('name', slotName);
  element.appendChild(slot);

  slotProvider.setAttribute('slot', slotName);
  shadowHost.appendChild(slotProvider);

  if (styles) {
    if (!styleNode) {
      styleNode = document.createElement('style');
      element.appendChild(styleNode);
    }

    styleNode.sheet.insertRule('::slotted([slot="' + slotName + '"]) { ' + styles + ' }');
  }

  if (isShadowElement(shadowHost)) {
    return transformToSlot(slotProvider, styles);
  }

  return slotProvider;
}

module.exports = {
  isShadowElement: isShadowElement,
  getShadowHost: getShadowHost,
  transformToSlot: transformToSlot
};

},{"./find-root-node":109,"@braintree/uuid":46}],133:[function(require,module,exports){
'use strict';

function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;

},{}],134:[function(require,module,exports){
'use strict';

var atobNormalized = typeof atob === 'function' ? window.atob : atobPolyfill;

function atobPolyfill(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var result = '';

  if (!base64Matcher.test(base64String)) {
    throw new Error('Non base64 encoded input passed to window.atob polyfill');
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
    b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
    c = (b3 & 0x3) << 6 | b4 & 0x3F;

    result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: function (base64String) {
    return atobNormalized.call(window, base64String);
  },
  _atob: atobPolyfill
};

},{}],135:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.PayPal Checkout - Creation Error Codes
 * @description Errors that occur when [creating the PayPal Checkout component](./module-braintree-web_paypal-checkout.html#.create).
 * @property {MERCHANT} PAYPAL_NOT_ENABLED Occurs when PayPal is not enabled on the Braintree control panel.
 * @property {MERCHANT} PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED Occurs only when testing in Sandbox, when a PayPal sandbox account is not linked to the merchant account in the Braintree control panel.
 */

/**
 * @name BraintreeError.PayPal Checkout - createPayment Error Codes
 * @description Errors that occur when using the [`createPayment` method](./PayPalCheckout.html#createPayment).
 * @property {MERCHANT} PAYPAL_FLOW_OPTION_REQUIRED Occurs when a required option is missing.
 * @property {MERCHANT} PAYPAL_INVALID_PAYMENT_OPTION Occurs when an option contains an invalid value.
 * @property {NETWORK} PAYPAL_FLOW_FAILED Occurs when something goes wrong when initializing the flow.
 */

/**
 * @name BraintreeError.PayPal Checkout - startVaultInitiatedCheckout Error Codes
 * @description Errors that occur when using the [`startVaultInitiatedCheckout` method](./PayPalCheckout.html#startVaultInitiatedCheckout).
 * @property {MERCHANT} PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED Occurs when a required param is missing when calling the method.
 * @property {MERCHANT} PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED Occurs when PayPal window could not be opened. This often occurs because the call to start the vault initiated flow was not triggered from a click event.
 * @property {CUSTOMER} PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED Occurs when a customer closes the PayPal flow before completion.
 * @property {MERCHANT} PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS Occurs when the flow is initialized while an authorization is already in progress.
 * @property {NETWORK} PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED Occurs when something went wrong setting up the flow.
 */

/**
 * @name BraintreeError.PayPal Checkout - tokenizePayment Error Codes
 * @description Errors that occur when using the [`tokenizePayment` method](./PayPalCheckout.html#tokenizePayment).
 * @property {NETWORK} PAYPAL_ACCOUNT_TOKENIZATION_FAILED Occurs when PayPal account could not be tokenized.
 */

var BraintreeError = require('../lib/braintree-error');

module.exports = {
  PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_NOT_ENABLED',
    message: 'PayPal is not enabled for this merchant.'
  },
  PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED',
    message: 'A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing for details on linking your PayPal sandbox with Braintree.'
  },
  PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s PayPal account.'
  },
  PAYPAL_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_FLOW_FAILED',
    message: 'Could not initialize PayPal flow.'
  },
  PAYPAL_FLOW_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_FLOW_OPTION_REQUIRED',
    message: 'PayPal flow property is invalid or missing.'
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED'
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED',
    message: 'Something went wrong when setting up the checkout workflow.'
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED',
    message: 'PayPal popup failed to open, make sure to initiate the vault checkout in response to a user action.'
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED',
    message: 'Customer closed PayPal popup before authorizing.'
  },
  PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS',
    message: 'Vault initiated checkout already in progress.'
  },
  PAYPAL_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_INVALID_PAYMENT_OPTION',
    message: 'PayPal payment options are invalid.'
  }
};

},{"../lib/braintree-error":98}],136:[function(require,module,exports){
'use strict';
/**
 * @module braintree-web/paypal-checkout
 * @description A component to integrate with the [PayPal JS SDK](https://github.com/paypal/paypal-checkout-components).
 */

var basicComponentVerification = require('../lib/basic-component-verification');
var wrapPromise = require('@braintree/wrap-promise');
var PayPalCheckout = require('./paypal-checkout');
var VERSION = "3.78.2";

/**
 * @static
 * @function create
 * @description There are two ways to integrate the PayPal Checkout component. See the [PayPal Checkout constructor documentation](PayPalCheckout.html#PayPalCheckout) for more information and examples.
 *
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {string} [options.merchantAccountId] A non-default merchant account ID to use for tokenization.
 * @param {boolean} [options.autoSetDataUserIdToken=false] Whether or not to render the PayPal SDK button with a customer's vaulted PayPal account. Must be used in conjunction with a Client Token generated with a customer id.
 * @param {callback} [callback] The second argument, `data`, is the {@link PayPalCheckout} instance.
 * @example
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   // set up the PayPal JS SDK
 * }).catch(function (err) {
 *   console.error('Error!', err);
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
function create(options) {
  var name = 'PayPal Checkout';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    var instance = new PayPalCheckout(options);

    return instance._initialize(options);
  });
}

/**
 * @static
 * @function isSupported
 * @description Returns true if PayPal Checkout [supports this browser](index.html#browser-support-webviews).
 * @deprecated Previously, this method checked for Popup support in the browser. The PayPal JS SDK now falls back to a modal if popups are not supported.
 * @returns {Boolean} Returns true if PayPal Checkout supports this browser.
 */
function isSupported() {
  return true;
}

module.exports = {
  create: wrapPromise(create),
  isSupported: isSupported,
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":96,"./paypal-checkout":137,"@braintree/wrap-promise":50}],137:[function(require,module,exports){
'use strict';

var analytics = require('../lib/analytics');
var assign = require('../lib/assign').assign;
var createDeferredClient = require('../lib/create-deferred-client');
var createAssetsUrl = require('../lib/create-assets-url');
var Promise = require('../lib/promise');
var ExtendedPromise = require('@braintree/extended-promise');
var wrapPromise = require('@braintree/wrap-promise');
var BraintreeError = require('../lib/braintree-error');
var convertToBraintreeError = require('../lib/convert-to-braintree-error');
var errors = require('./errors');
var constants = require('../paypal/shared/constants');
var frameService = require('../lib/frame-service/external');
var createAuthorizationData = require('../lib/create-authorization-data');
var methods = require('../lib/methods');
var useMin = require('../lib/use-min');
var convertMethodsToError = require('../lib/convert-methods-to-error');
var querystring = require('../lib/querystring');
var VERSION = "3.78.2";
var INTEGRATION_TIMEOUT_MS = require('../lib/constants').INTEGRATION_TIMEOUT_MS;

var REQUIRED_PARAMS_FOR_START_VAULT_INITIATED_CHECKOUT = [
  'amount',
  'currency',
  'vaultInitiatedCheckoutPaymentMethodToken'
];

var PAYPAL_SDK_PRELOAD_URL = 'https://www.{ENV}paypal.com/smart/buttons/preload';

/**
 * PayPal Checkout tokenized payload. Returned in {@link PayPalCheckout#tokenizePayment}'s callback as the second argument, `data`.
 * @typedef {object} PayPalCheckout~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `PayPalAccount`.
 * @property {object} details Additional PayPal account details.
 * @property {string} details.email User's email address.
 * @property {string} details.payerId User's payer ID, the unique identifier for each PayPal account.
 * @property {string} details.firstName User's given name.
 * @property {string} details.lastName User's surname.
 * @property {?string} details.countryCode User's 2 character country code.
 * @property {?string} details.phone User's phone number (e.g. 555-867-5309).
 * @property {?object} details.shippingAddress User's shipping address details, only available if shipping address is enabled.
 * @property {string} details.shippingAddress.recipientName Recipient of postage.
 * @property {string} details.shippingAddress.line1 Street number and name.
 * @property {string} details.shippingAddress.line2 Extended address.
 * @property {string} details.shippingAddress.city City or locality.
 * @property {string} details.shippingAddress.state State or region.
 * @property {string} details.shippingAddress.postalCode Postal code.
 * @property {string} details.shippingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} details.billingAddress User's billing address details.
 * Not available to all merchants; [contact PayPal](https://developers.braintreepayments.com/support/guides/paypal/setup-guide#contacting-paypal-support) for details on eligibility and enabling this feature.
 * Alternatively, see `shippingAddress` above as an available client option.
 * @property {string} details.billingAddress.line1 Street number and name.
 * @property {string} details.billingAddress.line2 Extended address.
 * @property {string} details.billingAddress.city City or locality.
 * @property {string} details.billingAddress.state State or region.
 * @property {string} details.billingAddress.postalCode Postal code.
 * @property {string} details.billingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} creditFinancingOffered This property will only be present when the customer pays with PayPal Credit.
 * @property {object} creditFinancingOffered.totalCost This is the estimated total payment amount including interest and fees the user will pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalCost.value An amount defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalCost.currency 3 letter currency code as defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {number} creditFinancingOffered.term Length of financing terms in months.
 * @property {object} creditFinancingOffered.monthlyPayment This is the estimated amount per month that the customer will need to pay including fees and interest.
 * @property {string} creditFinancingOffered.monthlyPayment.value An amount defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.monthlyPayment.currency 3 letter currency code as defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {object} creditFinancingOffered.totalInterest Estimated interest or fees amount the payer will have to pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalInterest.value An amount defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalInterest.currency 3 letter currency code as defined by [ISO 4217](https://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {boolean} creditFinancingOffered.payerAcceptance Status of whether the customer ultimately was approved for and chose to make the payment using the approved installment credit.
 * @property {boolean} creditFinancingOffered.cartAmountImmutable Indicates whether the cart amount is editable after payer's acceptance on PayPal side.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/paypal-checkout.create|paypal-checkout.create}
 * @classdesc This class represents a PayPal Checkout component that coordinates with the {@link https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page|PayPal SDK}. Instances of this class can generate payment data and tokenize authorized payments.
 *
 * All UI (such as preventing actions on the parent page while authentication is in progress) is managed by the {@link https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page|PayPal SDK}. You must provide your PayPal `client-id` as a query parameter. You can [retrieve this value from the PayPal Dashboard](https://developer.paypal.com/docs/checkout/integrate/#1-get-paypal-rest-api-credentials).
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/paypal-checkout.create|braintree-web.paypal-checkout.create} instead.</strong>
 *
 * #### Integrate Checkout Flow with PayPal SDK
 *
 * You must have [PayPal's script, configured with various query parameters](https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page), loaded on your page:
 *
 * ```html
 * <script src="https://www.paypal.com/sdk/js?client-id=your-sandbox-or-prod-client-id"></script>
 * <div id="paypal-button"></div>
 * ```
 *
 * When passing values in the `createPayment` method, make sure they match the [corresponding parameters in the query parameters for the PayPal SDK script](https://developer.paypal.com/docs/checkout/reference/customize-sdk/).
 *
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Buttons({
 *     createOrder: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         flow: 'checkout',
 *         currency: 'USD',
 *         amount: '10.00',
 *         intent: 'capture' // this value must either be `capture` or match the intent passed into the PayPal SDK intent query parameter
 *         // your other createPayment options here
 *       });
 *     },
 *
 *     onApprove: function (data, actions) {
 *       // some logic here before tokenization happens below
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     },
 *
 *     onCancel: function () {
 *       // handle case where user cancels
 *     },
 *
 *     onError: function (err) {
 *       // handle case where error occurs
 *     }
 *   }).render('#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 *
 * #### Integrate Vault Flow with PayPal SDK
 *
 * You must have [PayPal's script, configured with various query parameters](https://developer.paypal.com/docs/checkout/integrate/#2-add-the-paypal-script-to-your-web-page), loaded on your page:
 *
 * ```html
 * <script src="https://www.paypal.com/sdk/js?client-id=your-sandbox-or-prod-client-id&vault=true"></script>
 * <div id="paypal-button"></div>
 * ```
 *
 * When passing values in the `createPayment` method, make sure they match the [corresponding parameters in the query parameters for the PayPal SDK script](https://developer.paypal.com/docs/checkout/reference/customize-sdk/).
 *
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Buttons({
 *     createBillingAgreement: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         flow: 'vault'
 *         // your other createPayment options here
 *       });
 *     },
 *
 *     onApprove: function (data, actions) {
 *       // some logic here before tokenization happens below
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     },
 *
 *     onCancel: function () {
 *       // handle case where user cancels
 *     },
 *
 *     onError: function (err) {
 *       // handle case where error occurs
 *     }
 *   }).render('#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 *
 * #### Integrate with Checkout.js (deprecated PayPal SDK)
 *
 * If you are creating a new PayPal integration, please follow the previous integration guide to use the current version of the PayPal SDK. Use this integration guide only as a reference if you are already integrated with Checkout.js.
 *
 * You must have PayPal's Checkout.js script loaded on your page.
 *
 * ```html
 * <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4 log-level="warn"></script>
 * ```
 *
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Button.render({
 *     env: 'production', // or 'sandbox'
 *
 *     payment: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         // your createPayment options here
 *       });
 *     },
 *
 *     onAuthorize: function (data, actions) {
 *       // some logic here before tokenization happens below
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     }
 *   }, '#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 */
function PayPalCheckout(options) {
  this._merchantAccountId = options.merchantAccountId;
  // TODO remove this requirement for it to be opt in.
  // This feature is not yet GA, so we're intentionally making
  // it opt in and not publicly documenting it yet. Once it's
  // GA, we can remove the requirement to opt in to it
  this._autoSetDataUserIdToken = Boolean(options.autoSetDataUserIdToken);
}

PayPalCheckout.prototype._initialize = function (options) {
  var config;

  if (options.client) {
    config = options.client.getConfiguration();
    this._authorizationInformation = {
      fingerprint: config.authorizationFingerprint,
      environment: config.gatewayConfiguration.environment
    };
  } else {
    config = createAuthorizationData(options.authorization);
    this._authorizationInformation = {
      fingerprint: config.attrs.authorizationFingerprint,
      environment: config.environment
    };
  }

  this._clientPromise = createDeferredClient.create({
    authorization: options.authorization,
    client: options.client,
    debug: options.debug,
    assetsUrl: createAssetsUrl.create(options.authorization),
    name: 'PayPal Checkout'
  }).then(function (client) {
    this._configuration = client.getConfiguration();

    // we skip these checks if a merchant account id is
    // passed in, because the default merchant account
    // may not have paypal enabled
    if (!this._merchantAccountId) {
      if (!this._configuration.gatewayConfiguration.paypalEnabled) {
        this._setupError = new BraintreeError(errors.PAYPAL_NOT_ENABLED);
      } else if (this._configuration.gatewayConfiguration.paypal.environmentNoNetwork === true) {
        this._setupError = new BraintreeError(errors.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED);
      }
    }

    if (this._setupError) {
      return Promise.reject(this._setupError);
    }

    analytics.sendEvent(client, 'paypal-checkout.initialized');
    this._frameServicePromise = this._setupFrameService(client);

    return client;
  }.bind(this));

  // if client was passed in, let config checks happen before
  // resolving the instance. Otherwise, just resolve the instance
  if (options.client) {
    return this._clientPromise.then(function () {
      return this;
    }.bind(this));
  }

  return Promise.resolve(this);
};

PayPalCheckout.prototype._setupFrameService = function (client) {
  var frameServicePromise = new ExtendedPromise();
  var config = client.getConfiguration();
  var timeoutRef = setTimeout(function () {
    analytics.sendEvent(client, 'paypal-checkout.frame-service.timed-out');
    frameServicePromise.reject(new BraintreeError(errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED));
  }, INTEGRATION_TIMEOUT_MS);

  this._assetsUrl = config.gatewayConfiguration.paypal.assetsUrl + '/web/' + VERSION;
  this._isDebug = config.isDebug;
  // Note: this is using the static landing frame that the deprecated PayPal component builds and uses
  this._loadingFrameUrl = this._assetsUrl + '/html/paypal-landing-frame' + useMin(this._isDebug) + '.html';

  frameService.create({
    name: 'braintreepaypallanding',
    dispatchFrameUrl: this._assetsUrl + '/html/dispatch-frame' + useMin(this._isDebug) + '.html',
    openFrameUrl: this._loadingFrameUrl
  }, function (service) {
    this._frameService = service;
    clearTimeout(timeoutRef);

    frameServicePromise.resolve();
  }.bind(this));

  return frameServicePromise;
};

/**
 * @typedef {object} PayPalCheckout~lineItem
 * @property {string} quantity Number of units of the item purchased. This value must be a whole number and can't be negative or zero.
 * @property {string} unitAmount Per-unit price of the item. Can include up to 2 decimal places. This value can't be negative or zero.
 * @property {string} name Item name. Maximum 127 characters.
 * @property {string} kind Indicates whether the line item is a debit (sale) or credit (refund) to the customer. Accepted values: `debit` and `credit`.
 * @property {?string} unitTaxAmount Per-unit tax price of the item. Can include up to 2 decimal places. This value can't be negative or zero.
 * @property {?string} description Item description. Maximum 127 characters.
 * @property {?string} productCode Product or UPC code for the item. Maximum 127 characters.
 * @property {?string} url The URL to product information.
 */

/**
 * @typedef {object} PayPalCheckout~shippingOption
 * @property {string} id A unique ID that identifies a payer-selected shipping option.
 * @property {string} label A description that the payer sees, which helps them choose an appropriate shipping option. For example, `Free Shipping`, `USPS Priority Shipping`, `Expédition prioritaire USPS`, or `USPS yōuxiān fā huò`. Localize this description to the payer's locale.
 * @property {boolean} selected If `selected = true` is specified as part of the API request it represents the shipping option that the payee/merchant expects to be pre-selected for the payer when they first view the shipping options within the PayPal checkout experience. As part of the response if a shipping option has `selected = true` it represents the shipping option that the payer selected during the course of checkout with PayPal. Only 1 `shippingOption` can be set to `selected = true`.
 * @property {string} type The method by which the payer wants to get their items. The possible values are:
 * * `SHIPPING` - The payer intends to receive the items at a specified address.
 * * `PICKUP` - The payer intends to pick up the items at a specified address. For example, a store address.
 * @property {object} amount The shipping cost for the selected option.
 * @property {string} amount.currency The three-character ISO-4217 currency code. PayPal does not support all currencies.
 * @property {string} amount.value The amount the shipping option will cost. Includes the specified number of digits after decimal separator for the ISO-4217 currency code.
 */

/**
 * Creates a PayPal payment ID or billing token using the given options. This is meant to be passed to the PayPal JS SDK.
 * When a {@link callback} is defined, the function returns undefined and invokes the callback with the id to be used with the PayPal JS SDK. Otherwise, it returns a Promise that resolves with the id.
 * @public
 * @param {object} options All options for the PayPalCheckout component.
 * @param {string} options.flow Set to 'checkout' for one-time payment flow, or 'vault' for Vault flow. If 'vault' is used with a client token generated with a customer ID, the PayPal account will be added to that customer as a saved payment method.
 * @param {string} [options.intent=authorize]
 * * `authorize` - Submits the transaction for authorization but not settlement.
 * * `order` - Validates the transaction without an authorization (i.e. without holding funds). Useful for authorizing and capturing funds up to 90 days after the order has been placed. Only available for Checkout flow.
 * * `capture` - Payment will be immediately submitted for settlement upon creating a transaction. `sale` can be used as an alias for this value.
 * @param {boolean} [options.offerCredit=false] Offers PayPal Credit as the default funding instrument for the transaction. If the customer isn't pre-approved for PayPal Credit, they will be prompted to apply for it.
 * @param {(string|number)} [options.amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [options.currency] The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {string} [options.displayName] The merchant name displayed inside of the PayPal lightbox; defaults to the company name on your Braintree account
 * @param {string} [options.locale=en_US] Use this option to change the language, links, and terminology used in the PayPal flow. This locale will be used unless the buyer has set a preferred locale for their account. If an unsupported locale is supplied, a fallback locale (determined by buyer preference or browser data) will be used and no error will be thrown.
 * @param {boolean} [options.requestBillingAgreement] If `true` and `flow = checkout`, the customer will be prompted to consent to a billing agreement during the checkout flow. This value is ignored when `flow = vault`.
 * @param {object} [options.billingAgreementDetails] When `requestBillingAgreement = true`, allows for details to be set for the billing agreement portion of the flow.
 * @param {string} [options.billingAgreementDetails.description] Description of the billing agreement to display to the customer.
 * @param {string} [options.vaultInitiatedCheckoutPaymentMethodToken] Use the payment method nonce representing a PayPal account with a Billing Agreement ID to create the payment and redirect the customer to select a new financial instrument. This option is only applicable to the `checkout` flow.
 *
 * Supported locales are:
 * `da_DK`,
 * `de_DE`,
 * `en_AU`,
 * `en_GB`,
 * `en_US`,
 * `es_ES`,
 * `fr_CA`,
 * `fr_FR`,
 * `id_ID`,
 * `it_IT`,
 * `ja_JP`,
 * `ko_KR`,
 * `nl_NL`,
 * `no_NO`,
 * `pl_PL`,
 * `pt_BR`,
 * `pt_PT`,
 * `ru_RU`,
 * `sv_SE`,
 * `th_TH`,
 * `zh_CN`,
 * `zh_HK`,
 * and `zh_TW`.
 *
 * @param {shippingOption[]} [options.shippingOptions] List of shipping options offered by the payee or merchant to the payer to ship or pick up their items. **Note:** `shippingOptions` may not be passed with `intent="order"`.
 * @param {boolean} [options.enableShippingAddress=false] Returns a shipping address object in {@link PayPal#tokenize}.
 * @param {object} [options.shippingAddressOverride] Allows you to pass a shipping address you have already collected into the PayPal payment flow.
 * @param {string} options.shippingAddressOverride.line1 Street address.
 * @param {string} [options.shippingAddressOverride.line2] Street address (extended).
 * @param {string} options.shippingAddressOverride.city City.
 * @param {string} options.shippingAddressOverride.state State.
 * @param {string} options.shippingAddressOverride.postalCode Postal code.
 * @param {string} options.shippingAddressOverride.countryCode Country.
 * @param {string} [options.shippingAddressOverride.phone] Phone number.
 * @param {string} [options.shippingAddressOverride.recipientName] Recipient's name.
 * @param {boolean} [options.shippingAddressEditable=true] Set to false to disable user editing of the shipping address.
 * @param {string} [options.billingAgreementDescription] Use this option to set the description of the preapproved payment agreement visible to customers in their PayPal profile during Vault flows. Max 255 characters.
 * @param {string} [options.landingPageType] Use this option to specify the PayPal page to display when a user lands on the PayPal site to complete the payment.
 * * `login` - A PayPal account login page is used.
 * * `billing` - A non-PayPal account landing page is used.
 * @param {lineItem[]} [options.lineItems] The {@link PayPalCheckout~lineItem|line items} for this transaction. It can include up to 249 line items.
 * @param {callback} [callback] The second argument is a PayPal `paymentId` or `billingToken` string, depending on whether `options.flow` is `checkout` or `vault`. This is also what is resolved by the promise if no callback is provided.
 * @example
 * // this paypal object is created by the PayPal JS SDK
 * // see https://github.com/paypal/paypal-checkout-components
 * paypal.Buttons({
 *   createOrder: function () {
 *     // when createPayment resolves, it is automatically passed to the PayPal JS SDK
 *     return paypalCheckoutInstance.createPayment({
 *       flow: 'checkout',
 *       amount: '10.00',
 *       currency: 'USD',
 *       intent: 'capture' // this value must either be `capture` or match the intent passed into the PayPal SDK intent query parameter
 *     });
 *   },
 *   // Add other options, e.g. onApproved, onCancel, onError
 * }).render('#paypal-button');
 *
 * @example
 * // shippingOptions are passed to createPayment. You can review the result from onAuthorize to determine which shipping option id was selected.
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Button.render({
 *     env: 'production'
 *
 *     payment: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         flow: 'checkout',
 *         amount: '10.00',
 *         currency: 'USD',
 *         shippingOptions: [
 *           {
 *             id: 'UUID-9',
 *             type: 'PICKUP',
 *             label: 'Store Location Five',
 *             selected: true,
 *             amount: {
 *               value: '1.00',
 *               currency: 'USD'
 *             }
 *           },
 *           {
 *             id: 'shipping-speed-fast',
 *             type: 'SHIPPING',
 *             label: 'Fast Shipping',
 *             selected: false,
 *             amount: {
 *               value: '1.00',
 *               currency: 'USD'
 *             }
 *           },
 *           {
 *             id: 'shipping-speed-slow',
 *             type: 'SHIPPING',
 *             label: 'Slow Shipping',
 *             selected: false,
 *             amount: {
 *               value: '1.00',
 *               currency: 'USD'
 *             }
 *           }
 *         ]
 *       });
 *     },
 *
 *     onAuthorize: function (data, actions) {
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     }
 *   }, '#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.createPayment = function (options) {
  if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
    return Promise.reject(new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED));
  }

  analytics.sendEvent(this._clientPromise, 'paypal-checkout.createPayment');

  return this._createPaymentResource(options).then(function (response) {
    var flowToken;

    if (options.flow === 'checkout') {
      flowToken = response.paymentResource.redirectUrl.match(/EC-\w+/)[0];
    } else {
      flowToken = response.agreementSetup.tokenId;
    }

    return flowToken;
  });
};

PayPalCheckout.prototype._createPaymentResource = function (options, config) {
  var self = this;
  var endpoint = 'paypal_hermes/' + constants.FLOW_ENDPOINTS[options.flow];

  delete this.intentFromCreatePayment;

  config = config || {};

  if (options.offerCredit === true) {
    analytics.sendEvent(this._clientPromise, 'paypal-checkout.credit.offered');
  }

  return this._clientPromise.then(function (client) {
    return client.request({
      endpoint: endpoint,
      method: 'post',
      data: self._formatPaymentResourceData(options, config)
    }).then(function (data) {
      self.intentFromCreatePayment = options.intent;

      return data;
    });
  }).catch(function (err) {
    var status;

    if (self._setupError) {
      return Promise.reject(self._setupError);
    }

    status = err.details && err.details.httpStatus;

    if (status === 422) {
      return Promise.reject(new BraintreeError({
        type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
        code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
        message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
        details: {
          originalError: err
        }
      }));
    }

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_FLOW_FAILED.type,
      code: errors.PAYPAL_FLOW_FAILED.code,
      message: errors.PAYPAL_FLOW_FAILED.message
    }));
  });
};

/**
 * Initializes the PayPal checkout flow with a payment method nonce that represents a vaulted PayPal account.
 * When a {@link callback} is defined, the function returns undefined and invokes the callback with the id to be used with the PayPal JS SDK. Otherwise, it returns a Promise that resolves with the id.
 * @public
 * @ignore
 * @param {object} options These options are identical to the {@link PayPalCheckout#createPayment|options for creating a payment resource}, except for the following:
 * * `flow` cannot be set (will always be `'checkout'`)
 * * `amount`, `currency`, and `vaultInitiatedCheckoutPaymentMethodToken` are required instead of optional
 * * Additional configuration is available (listed below)
 * @param {boolean} [options.optOutOfModalBackdrop=false] By default, the webpage will darken and become unusable while the PayPal window is open. For full control of the UI, pass `true` for this option.
 * @param {callback} [callback] The second argument, <code>payload</code>, is a {@link PayPalCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, the promise resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @example
 * paypalCheckoutInstance.startVaultInitiatedCheckout({
 *   vaultInitiatedCheckoutPaymentMethodToken: 'nonce-that-represents-a-vaulted-paypal-account',
 *   amount: '10.00',
 *   currency: 'USD'
 * }).then(function (payload) {
 *   // send payload.nonce to your server
 * }).catch(function (err) {
 *   if (err.code === 'PAYPAL_POPUP_CLOSED') {
 *     // indicates that customer canceled by
 *     // manually closing the PayPal popup
 *   }
 *
 *   // handle other errors
 * });
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.startVaultInitiatedCheckout = function (options) {
  var missingRequiredParam;
  var self = this;

  if (this._vaultInitiatedCheckoutInProgress) {
    analytics.sendEvent(this._clientPromise, 'paypal-checkout.startVaultInitiatedCheckout.error.already-in-progress');

    return Promise.reject(new BraintreeError(errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS));
  }

  REQUIRED_PARAMS_FOR_START_VAULT_INITIATED_CHECKOUT.forEach(function (param) {
    if (!options.hasOwnProperty(param)) {
      missingRequiredParam = param;
    }
  });

  if (missingRequiredParam) {
    return Promise.reject(new BraintreeError({
      type: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.type,
      code: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.code,
      message: 'Required param ' + missingRequiredParam + ' is missing.'
    }));
  }

  this._vaultInitiatedCheckoutInProgress = true;
  this._addModalBackdrop(options);

  options = assign({}, options, {
    flow: 'checkout'
  });

  analytics.sendEvent(this._clientPromise, 'paypal-checkout.startVaultInitiatedCheckout.started');

  return this._waitForVaultInitiatedCheckoutDependencies().then(function () {
    var frameCommunicationPromise = new ExtendedPromise();
    var startVaultInitiatedCheckoutPromise = self._createPaymentResource(options, {
      returnUrl: self._constructVaultCheckutUrl('redirect-frame'),
      cancelUrl: self._constructVaultCheckutUrl('cancel-frame')
    }).then(function (response) {
      var redirectUrl = response.paymentResource.redirectUrl;

      self._frameService.redirect(redirectUrl);

      return frameCommunicationPromise;
    });

    self._frameService.open({}, self._createFrameServiceCallback(frameCommunicationPromise));

    return startVaultInitiatedCheckoutPromise;
  }).catch(function (err) {
    self._vaultInitiatedCheckoutInProgress = false;
    self._removeModalBackdrop();

    if (err.code === 'FRAME_SERVICE_FRAME_CLOSED') {
      analytics.sendEvent(self._clientPromise, 'paypal-checkout.startVaultInitiatedCheckout.canceled.by-customer');

      return Promise.reject(new BraintreeError(errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED));
    }

    if (self._frameService) {
      self._frameService.close();
    }

    if (err.code && err.code.indexOf('FRAME_SERVICE_FRAME_OPEN_FAILED') > -1) {
      analytics.sendEvent(self._clientPromise, 'paypal-checkout.startVaultInitiatedCheckout.failed.popup-not-opened');

      return Promise.reject(new BraintreeError({
        code: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.code,
        type: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.type,
        message: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.message,
        details: {
          originalError: err
        }
      }));
    }

    return Promise.reject(err);
  }).then(function (response) {
    self._frameService.close();
    self._vaultInitiatedCheckoutInProgress = false;
    self._removeModalBackdrop();
    analytics.sendEvent(self._clientPromise, 'paypal-checkout.startVaultInitiatedCheckout.succeeded');

    return Promise.resolve(response);
  });
};

PayPalCheckout.prototype._addModalBackdrop = function (options) {
  if (options.optOutOfModalBackdrop) {
    return;
  }

  if (!this._modalBackdrop) {
    this._modalBackdrop = document.createElement('div');
    this._modalBackdrop.setAttribute('data-braintree-paypal-vault-initiated-checkout-modal', true);
    this._modalBackdrop.style.position = 'fixed';
    this._modalBackdrop.style.top = 0;
    this._modalBackdrop.style.bottom = 0;
    this._modalBackdrop.style.left = 0;
    this._modalBackdrop.style.right = 0;
    this._modalBackdrop.style.zIndex = 9999;
    this._modalBackdrop.style.background = 'black';
    this._modalBackdrop.style.opacity = '0.7';
    this._modalBackdrop.addEventListener('click', function () {
      this.focusVaultInitiatedCheckoutWindow();
    }.bind(this));
  }

  document.body.appendChild(this._modalBackdrop);
};

PayPalCheckout.prototype._removeModalBackdrop = function () {
  if (!(this._modalBackdrop && this._modalBackdrop.parentNode)) {
    return;
  }

  this._modalBackdrop.parentNode.removeChild(this._modalBackdrop);
};

/**
 * Closes the PayPal window if it is opened via `startVaultInitiatedCheckout`.
 * @public
 * @ignore
 * @param {callback} [callback] Gets called when window is closed.
 * @example
 * paypalCheckoutInstance.closeVaultInitiatedCheckoutWindow();
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.closeVaultInitiatedCheckoutWindow = function () {
  if (this._vaultInitiatedCheckoutInProgress) {
    analytics.sendEvent(this._clientPromise, 'paypal-checkout.startVaultInitiatedCheckout.canceled.by-merchant');
  }

  return this._waitForVaultInitiatedCheckoutDependencies().then(function () {
    this._frameService.close();
  }.bind(this));
};

/**
 * Focuses the PayPal window if it is opened via `startVaultInitiatedCheckout`.
 * @public
 * @ignore
 * @param {callback} [callback] Gets called when window is focused.
 * @example
 * paypalCheckoutInstance.focusVaultInitiatedCheckoutWindow();
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.focusVaultInitiatedCheckoutWindow = function () {
  return this._waitForVaultInitiatedCheckoutDependencies().then(function () {
    this._frameService.focus();
  }.bind(this));
};

PayPalCheckout.prototype._createFrameServiceCallback = function (frameCommunicationPromise) {
  var self = this;

  // TODO when a merchant integrates an iOS or Android integration
  // with a webview using the web SDK, we will have to add popupbridge
  // support
  return function (err, payload) {
    if (err) {
      frameCommunicationPromise.reject(err);
    } else if (payload) {
      self._frameService.redirect(self._loadingFrameUrl);
      self.tokenizePayment({
        paymentToken: payload.token,
        payerID: payload.PayerID,
        paymentID: payload.paymentId
      }).then(function (res) {
        frameCommunicationPromise.resolve(res);
      }).catch(function (tokenizationError) {
        frameCommunicationPromise.reject(tokenizationError);
      });
    }
  };
};

PayPalCheckout.prototype._waitForVaultInitiatedCheckoutDependencies = function () {
  var self = this;

  return this._clientPromise.then(function () {
    return self._frameServicePromise;
  });
};

PayPalCheckout.prototype._constructVaultCheckutUrl = function (frameName) {
  var serviceId = this._frameService._serviceId;

  return this._assetsUrl + '/html/' + frameName + useMin(this._isDebug) + '.html?channel=' + serviceId;
};

/**
 * Tokenizes the authorize data from the PayPal JS SDK when completing a buyer approval flow.
 * When a {@link callback} is defined, invokes the callback with {@link PayPalCheckout~tokenizePayload|tokenizePayload} and returns undefined. Otherwise, returns a Promise that resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @public
 * @param {object} tokenizeOptions Tokens and IDs required to tokenize the payment.
 * @param {string} tokenizeOptions.payerId Payer ID returned by PayPal `onApproved` callback.
 * @param {string} [tokenizeOptions.paymentId] Payment ID returned by PayPal `onApproved` callback.
 * @param {string} [tokenizeOptions.billingToken] Billing Token returned by PayPal `onApproved` callback.
 * @param {boolean} [tokenizeOptions.vault=true] Whether or not to vault the resulting PayPal account (if using a client token generated with a customer id and the vault flow).
 * @param {callback} [callback] The second argument, <code>payload</code>, is a {@link PayPalCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, the promise resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @example <caption>Opt out of auto-vaulting behavior</caption>
 * // create the paypalCheckoutInstance with a client token generated with a customer id
 * paypal.Buttons({
 *   createBillingAgreement: function () {
 *     return paypalCheckoutInstance.createPayment({
 *       flow: 'vault'
 *       // your other createPayment options here
 *     });
 *   },
 *   onApproved: function (data) {
 *     data.vault = false;
 *
 *     return paypalCheckoutInstance.tokenizePayment(data);
 *   },
 *   // Add other options, e.g. onCancel, onError
 * }).render('#paypal-button');
 *
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.tokenizePayment = function (tokenizeOptions) {
  var self = this;
  var shouldVault = true;
  var payload;
  var options = {
    flow: tokenizeOptions.billingToken && !tokenizeOptions.paymentID ? 'vault' : 'checkout',
    intent: tokenizeOptions.intent || this.intentFromCreatePayment
  };
  var params = {
    // The paymentToken provided by the PayPal JS SDK is the EC Token
    ecToken: tokenizeOptions.paymentToken,
    billingToken: tokenizeOptions.billingToken,
    payerId: tokenizeOptions.payerID,
    paymentId: tokenizeOptions.paymentID,
    shippingOptionsId: tokenizeOptions.shippingOptionsId
  };

  if (tokenizeOptions.hasOwnProperty('vault')) {
    shouldVault = tokenizeOptions.vault;
  }

  options.vault = shouldVault;

  analytics.sendEvent(this._clientPromise, 'paypal-checkout.tokenization.started');

  return this._clientPromise.then(function (client) {
    return client.request({
      endpoint: 'payment_methods/paypal_accounts',
      method: 'post',
      data: self._formatTokenizeData(options, params)
    });
  }).then(function (response) {
    payload = self._formatTokenizePayload(response);

    analytics.sendEvent(self._clientPromise, 'paypal-checkout.tokenization.success');
    if (payload.creditFinancingOffered) {
      analytics.sendEvent(self._clientPromise, 'paypal-checkout.credit.accepted');
    }

    return payload;
  }).catch(function (err) {
    if (self._setupError) {
      return Promise.reject(self._setupError);
    }

    analytics.sendEvent(self._clientPromise, 'paypal-checkout.tokenization.failed');

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
      code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
      message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
    }));
  });
};

/**
 * Resolves with the PayPal client id to be used when loading the PayPal SDK.
 * @public
 * @param {callback} [callback] The second argument, <code>id</code>, is a the PayPal client id. If no callback is provided, the promise resolves with the PayPal client id.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * paypalCheckoutInstance.getClientId().then(function (id) {
 *  var script = document.createElement('script');
 *
 *  script.src = 'https://www.paypal.com/sdk/js?client-id=' + id;
 *  script.onload = function () {
 *    // setup the PayPal SDK
 *  };
 *
 *  document.body.appendChild(script);
 * });
 */
PayPalCheckout.prototype.getClientId = function () {
  return this._clientPromise.then(function (client) {
    return client.getConfiguration().gatewayConfiguration.paypal.clientId;
  });
};

/**
 * Resolves when the PayPal SDK has been successfully loaded onto the page.
 * @public
 * @param {object} [options] A configuration object to modify the query params and data-attributes on the PayPal SDK. A subset of the parameters are listed below. For a full list of query params, see the [PayPal docs](https://developer.paypal.com/docs/checkout/reference/customize-sdk/?mark=query#query-parameters).
 * @param {string} [options.client-id] By default, this will be the client id associated with the authorization used to create the Braintree component. When used in conjunction with passing `authorization` when creating the PayPal Checkout component, you can speed up the loading of the PayPal SDK.
 * @param {string} [options.intent="authorize"] By default, the PayPal SDK defaults to an intent of `capture`. Since the default intent when calling {@link PayPalCheckout#createPayment|`createPayment`} is `authorize`, the PayPal SDK will be loaded with `intent=authorize`. If you wish to use a different intent when calling {@link PayPalCheckout#createPayment|`createPayment`}, make sure it matches here. If `sale` is used, it will be converted to `capture` for the PayPal SDK. If the `vault: true` param is used, `tokenize` will be passed as the default intent.
 * @param {string} [options.currency="USD"] If a currency is passed in {@link PayPalCheckout#createPayment|`createPayment`}, it must match the currency passed here.
 * @param {boolean} [options.vault] Must be `true` when using `flow: vault` in {@link PayPalCheckout#createPayment|`createPayment`}.
 * @param {string} [options.components=buttons] By default, the Braintree SDK will only load the PayPal smart buttons component. If you would like to load just the [messages component](https://developer.paypal.com/docs/business/checkout/add-capabilities/credit-messaging/), pass `messages`. If you would like to load both, pass `buttons,messages`
 * @param {object} [options.dataAttributes] The data attributes to apply to the script. Any data attribute can be passed. A subset of the parameters are listed below. For a full list of data attributes, see the [PayPal docs](https://developer.paypal.com/docs/checkout/reference/customize-sdk/#script-parameters).
 * @param {string} [options.dataAttributes.data-client-token] The client token to use in the script. (usually not needed)
 * @param {string} [options.dataAttributes.csp-nonce] See the [PayPal docs about content security nonces](https://developer.paypal.com/docs/checkout/reference/customize-sdk/#csp-nonce).
 * @param {callback} [callback] Called when the PayPal SDK has been loaded onto the page. The second argument is the PayPal Checkout instance. If no callback is provided, the promise resolves with the PayPal Checkout instance when the PayPal SDK has been loaded onto the page.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example <caption>Without options</caption>
 * paypalCheckoutInstance.loadPayPalSDK().then(function () {
 *   // window.paypal.Buttons is now available to use
 * });
 * @example <caption>With options</caption>
 * paypalCheckoutInstance.loadPayPalSDK({
 *   'client-id': 'PayPal Client Id', // Can speed up rendering time to hardcode this value
 *
 *   intent: 'capture', // Make sure this value matches the value in createPayment
 *   currency: 'USD', // Make sure this value matches the value in createPayment
 * }).then(function () {
 *   // window.paypal.Buttons is now available to use
 * });
 * @example <caption>With Vaulting</caption>
 * paypalCheckoutInstance.loadPayPalSDK({
 *   vault: true
 * }).then(function () {
 *   // window.paypal.Buttons is now available to use
 * });
 */
PayPalCheckout.prototype.loadPayPalSDK = function (options) {
  var idPromise, src, userIdToken;
  var loadPromise = new ExtendedPromise();
  var dataAttributes = options && options.dataAttributes;

  if (dataAttributes && dataAttributes['user-id-token']) {
    userIdToken = dataAttributes['user-id-token'];
  } else {
    userIdToken = this._authorizationInformation.fingerprint && this._authorizationInformation.fingerprint.split('?')[0];
  }

  this._paypalScript = document.createElement('script');

  // NEXT_MAJOR_VERSION
  // this options object should have 2 properties:
  // * queryParams
  // * dataAttributes
  // should make organizing this better than squashing
  // all the query params at the top level and extracting
  // the data attributes
  options = assign({}, {
    components: 'buttons'
  }, options);
  delete options.dataAttributes;

  // NEXT_MAJOR_VERSION if merchant passes an explicit intent,
  // currency, amount, etc, save those for use in createPayment
  // if no explicit param of that type is passed in when calling
  // createPayment to reduce the number of items that need to be
  // duplicated here and in createPayment
  if (options.vault) {
    options.intent = options.intent || 'tokenize';
  } else {
    options.intent = options.intent || 'authorize';
    options.currency = options.currency || 'USD';
  }

  src = 'https://www.paypal.com/sdk/js?';
  this._paypalScript.onload = function () {
    loadPromise.resolve();
  };

  if (dataAttributes) {
    Object.keys(dataAttributes).forEach(function (attribute) {
      this._paypalScript.setAttribute('data-' + attribute, dataAttributes[attribute]);
    }.bind(this));
  }

  if (options['client-id']) {
    idPromise = Promise.resolve(options['client-id']);
  } else {
    idPromise = this.getClientId();
  }

  idPromise.then(function (id) {
    options['client-id'] = id;

    if (this._autoSetDataUserIdToken && userIdToken) {
      this._paypalScript.setAttribute('data-user-id-token', userIdToken);

      // preloading improves the rendering time of the PayPal button
      this._attachPreloadPixel({
        id: id,
        userIdToken: userIdToken,
        amount: dataAttributes && dataAttributes.amount,
        currency: options.currency,
        merchantId: options['merchant-id']
      });
    }

    this._paypalScript.src = querystring.queryify(src, options);
    document.head.insertBefore(this._paypalScript, document.head.firstElementChild);
  }.bind(this));

  return loadPromise.then(function () {
    return this;
  }.bind(this));
};

PayPalCheckout.prototype._attachPreloadPixel = function (options) {
  var request;
  var id = options.id;
  var userIdToken = options.userIdToken;
  var env = this._authorizationInformation.environment;
  var subdomain = env === 'production' ? '' : 'sandbox.';
  var url = PAYPAL_SDK_PRELOAD_URL.replace('{ENV}', subdomain);
  var preloadOptions = {
    'client-id': id,
    'user-id-token': userIdToken
  };

  if (options.amount) {
    preloadOptions.amount = options.amount;
  }
  if (options.currency) {
    preloadOptions.currency = options.currency;
  }
  if (options.merchantId) {
    preloadOptions['merchant-id'] = options.merchantId;
  }

  request = new XMLHttpRequest();
  request.open('GET', querystring.queryify(url, preloadOptions));
  request.send();
};

PayPalCheckout.prototype._formatPaymentResourceData = function (options, config) {
  var key;
  var gatewayConfiguration = this._configuration.gatewayConfiguration;
  // NEXT_MAJOR_VERSION default value for intent in PayPal SDK is capture
  // but our integrations default value is authorize. Default this to capture
  // in the next major version.
  var intent = options.intent;
  var paymentResource = {
    // returnUrl and cancelUrl are required in hermes create_payment_resource route
    // but are not used by the PayPal sdk, except to redirect to an error page
    returnUrl: config.returnUrl || 'https://www.paypal.com/checkoutnow/error',
    cancelUrl: config.cancelUrl || 'https://www.paypal.com/checkoutnow/error',
    offerPaypalCredit: options.offerCredit === true,
    merchantAccountId: this._merchantAccountId,
    experienceProfile: {
      brandName: options.displayName || gatewayConfiguration.paypal.displayName,
      localeCode: options.locale,
      noShipping: (!options.enableShippingAddress).toString(),
      addressOverride: options.shippingAddressEditable === false,
      landingPageType: options.landingPageType
    },
    shippingOptions: options.shippingOptions
  };

  if (options.flow === 'checkout') {
    paymentResource.amount = options.amount;
    paymentResource.currencyIsoCode = options.currency;
    paymentResource.requestBillingAgreement = options.requestBillingAgreement;

    if (intent) {
      // 'sale' has been changed to 'capture' in PayPal's backend, but
      // we use an old version with 'sale'. We provide capture as an alias
      // to match the PayPal SDK
      if (intent === 'capture') {
        intent = 'sale';
      }
      paymentResource.intent = intent;
    }

    if (options.hasOwnProperty('lineItems')) {
      paymentResource.lineItems = options.lineItems;
    }

    if (options.hasOwnProperty('vaultInitiatedCheckoutPaymentMethodToken')) {
      paymentResource.vaultInitiatedCheckoutPaymentMethodToken = options.vaultInitiatedCheckoutPaymentMethodToken;
    }

    if (options.hasOwnProperty('shippingOptions')) {
      paymentResource.shippingOptions = options.shippingOptions;
    }

    for (key in options.shippingAddressOverride) {
      if (options.shippingAddressOverride.hasOwnProperty(key)) {
        paymentResource[key] = options.shippingAddressOverride[key];
      }
    }

    if (options.hasOwnProperty('billingAgreementDetails')) {
      paymentResource.billingAgreementDetails = options.billingAgreementDetails;
    }
  } else {
    paymentResource.shippingAddress = options.shippingAddressOverride;

    if (options.billingAgreementDescription) {
      paymentResource.description = options.billingAgreementDescription;
    }
  }

  return paymentResource;
};

PayPalCheckout.prototype._formatTokenizeData = function (options, params) {
  var clientConfiguration = this._configuration;
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var isTokenizationKey = clientConfiguration.authorizationType === 'TOKENIZATION_KEY';
  var isVaultFlow = options.flow === 'vault';
  var data = {
    paypalAccount: {
      correlationId: params.billingToken || params.ecToken,
      options: {
        validate: isVaultFlow && !isTokenizationKey && options.vault
      }
    }
  };

  if (isVaultFlow) {
    data.paypalAccount.billingAgreementToken = params.billingToken;
  } else {
    data.paypalAccount.paymentToken = params.paymentId;
    data.paypalAccount.payerId = params.payerId;
    data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;

    if (options.intent) {
      data.paypalAccount.intent = options.intent;
    }
  }

  if (this._merchantAccountId) {
    data.merchantAccountId = this._merchantAccountId;
  }

  return data;
};

PayPalCheckout.prototype._formatTokenizePayload = function (response) {
  var payload;
  var account = {};

  if (response.paypalAccounts) {
    account = response.paypalAccounts[0];
  }

  payload = {
    nonce: account.nonce,
    details: {},
    type: account.type
  };

  if (account.details && account.details.payerInfo) {
    payload.details = account.details.payerInfo;
  }

  if (account.details && account.details.creditFinancingOffered) {
    payload.creditFinancingOffered = account.details.creditFinancingOffered;
  }

  if (account.details && account.details.shippingOptionId) {
    payload.shippingOptionId = account.details.shippingOptionId;
  }

  if (account.details && account.details.cobrandedCardLabel) {
    payload.cobrandedCardLabel = account.details.cobrandedCardLabel;
  }

  return payload;
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/paypal-checkout.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * paypalCheckoutInstance.teardown();
 * @example <caption>With callback</caption>
 * paypalCheckoutInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.teardown = function () {
  var self = this;

  convertMethodsToError(this, methods(PayPalCheckout.prototype));

  if (this._paypalScript && this._paypalScript.parentNode) {
    this._paypalScript.parentNode.removeChild(this._paypalScript);
  }

  return this._frameServicePromise.catch(function () {
    // no need to error in teardown for an error setting up the frame service
  }).then(function () {
    if (!self._frameService) {
      return Promise.resolve();
    }

    return self._frameService.teardown();
  });
};

module.exports = wrapPromise.wrapPrototype(PayPalCheckout);

},{"../lib/analytics":93,"../lib/assign":95,"../lib/braintree-error":98,"../lib/constants":99,"../lib/convert-methods-to-error":100,"../lib/convert-to-braintree-error":101,"../lib/create-assets-url":102,"../lib/create-authorization-data":103,"../lib/create-deferred-client":104,"../lib/frame-service/external":112,"../lib/methods":128,"../lib/promise":130,"../lib/querystring":131,"../lib/use-min":133,"../paypal/shared/constants":138,"./errors":135,"@braintree/extended-promise":41,"@braintree/wrap-promise":50}],138:[function(require,module,exports){
'use strict';

module.exports = {
  LANDING_FRAME_NAME: 'braintreepaypallanding',
  FLOW_ENDPOINTS: {
    checkout: 'create_payment_resource',
    vault: 'setup_billing_agreement'
  }
};

},{}],139:[function(require,module,exports){
'use strict';

var assign = require('../../../lib/assign').assign;
var analytics = require('../../../lib/analytics');
var BraintreeError = require('../../../lib/braintree-error');
var Promise = require('../../../lib/promise');
var isVerifiedDomain = require('../../../lib/is-verified-domain');
var ExtendedPromise = require('@braintree/extended-promise');
var EventEmitter = require('@braintree/event-emitter');
var errors = require('../../shared/errors');
var iFramer = require('@braintree/iframer');
var Bus = require('framebus');
var constants = require('../../shared/constants');
var uuid = require('@braintree/uuid');
var events = require('../../shared/events');
var useMin = require('../../../lib/use-min');
var BUS_CONFIGURATION_REQUEST_EVENT = require('../../../lib/constants').BUS_CONFIGURATION_REQUEST_EVENT;

var VERSION = "3.78.2";
var IFRAME_HEIGHT = 400;
var IFRAME_WIDTH = 400;

function BaseFramework(options) {
  EventEmitter.call(this);

  this._client = options.client;
  this._createPromise = options.createPromise;
  this._createOptions = options;

  if (this._client) {
    this._isDebug = this._client.getConfiguration().isDebug;
    this._assetsUrl = this._client.getConfiguration().gatewayConfiguration.assetsUrl;
  } else {
    this._isDebug = Boolean(options.isDebug);
    this._assetsUrl = options.assetsUrl;
  }
  this._assetsUrl = this._assetsUrl + '/web/' + VERSION;
}

EventEmitter.createChild(BaseFramework);

BaseFramework.prototype._waitForClient = function () {
  if (this._client) {
    return Promise.resolve();
  }

  return this._createPromise.then(function (client) {
    this._client = client;
  }.bind(this));
};

BaseFramework.prototype.setUpEventListeners = function () {
  throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
};

BaseFramework.prototype.verifyCard = function (options, privateOptions) {
  var formattedOptions, error;
  var self = this;

  privateOptions = privateOptions || {};

  error = this._checkForVerifyCardError(options, privateOptions);

  if (error) {
    return Promise.reject(error);
  }

  this._verifyCardInProgress = true;

  formattedOptions = this._formatVerifyCardOptions(options);

  return this._formatLookupData(formattedOptions).then(function (data) {
    analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.started');

    return self._performLookup(formattedOptions.nonce, data);
  }).then(function (response) {
    analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.3ds-version.' + response.lookup.threeDSecureVersion);

    return self._onLookupComplete(response, formattedOptions);
  }).then(function (response) {
    return self.initializeChallengeWithLookupResponse(response, formattedOptions);
  }).then(function (payload) {
    self._resetVerificationState();

    analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.completed');

    return payload;
  }).catch(function (err) {
    self._resetVerificationState();

    analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.failed');

    return Promise.reject(err);
  });
};

BaseFramework.prototype._checkForFrameworkSpecificVerifyCardErrors = function () {
  throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
};

BaseFramework.prototype._presentChallenge = function () {
  throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
};

BaseFramework.prototype.prepareLookup = function () {
  throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
};

BaseFramework.prototype._resetVerificationState = function () {
  this._verifyCardInProgress = false;
  this._verifyCardPromisePlus = null;
};

BaseFramework.prototype._performLookup = function (nonce, data) {
  var self = this;
  var url = 'payment_methods/' + nonce + '/three_d_secure/lookup';

  return this._waitForClient().then(function () {
    return self._client.request({
      endpoint: url,
      method: 'post',
      data: data
    }).catch(function (err) {
      var status = err && err.details && err.details.httpStatus;
      var analyticsMessage = 'three-d-secure.verification-flow.lookup-failed';
      var lookupError;

      if (status === 404) {
        lookupError = errors.THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR;
        analyticsMessage += '.404';
      } else if (status === 422) {
        lookupError = errors.THREEDS_LOOKUP_VALIDATION_ERROR;
        analyticsMessage += '.422';
      } else {
        lookupError = errors.THREEDS_LOOKUP_ERROR;
      }

      analytics.sendEvent(self._createPromise, analyticsMessage);

      return Promise.reject(new BraintreeError({
        type: lookupError.type,
        code: lookupError.code,
        message: lookupError.message,
        details: {
          originalError: err
        }
      }));
    });
  });
};

BaseFramework.prototype._checkForVerifyCardError = function (options, privateOptions) {
  var errorOption;

  if (this._verifyCardInProgress === true) {
    return new BraintreeError(errors.THREEDS_AUTHENTICATION_IN_PROGRESS);
  } else if (!options.nonce) {
    errorOption = 'a nonce';
  } else if (!options.amount) {
    errorOption = 'an amount';
  }

  if (!errorOption) {
    errorOption = this._checkForFrameworkSpecificVerifyCardErrors(options, privateOptions);
  }

  if (errorOption) {
    return new BraintreeError({
      type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
      code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
      message: 'verifyCard options must include ' + errorOption + '.'
    });
  }

  return null;
};

BaseFramework.prototype.initializeChallengeWithLookupResponse = function (lookupResponse, options) {
  var self = this;

  options = options || {};

  this._lookupPaymentMethod = lookupResponse.paymentMethod;

  // sets this in the case that initializeChallengeWithLookupResponse is
  // called as a standalone method from a server side lookup. In a normal
  // verifyCard flow, this promise will already exist
  self._verifyCardPromisePlus = self._verifyCardPromisePlus || new ExtendedPromise();
  self._handleLookupResponse(lookupResponse, options);

  return self._verifyCardPromisePlus.then(function (payload) {
    analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.liability-shifted.' + String(payload.liabilityShifted));
    analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.liability-shift-possible.' + String(payload.liabilityShiftPossible));

    return payload;
  });
};

BaseFramework.prototype._handleLookupResponse = function (lookupResponse, options) {
  var challengeShouldBePresented = Boolean(lookupResponse.lookup && lookupResponse.lookup.acsUrl);
  var details;

  analytics.sendEvent(this._createPromise, 'three-d-secure.verification-flow.challenge-presented.' + String(challengeShouldBePresented));

  if (challengeShouldBePresented) {
    this._presentChallenge(lookupResponse, options);
  } else {
    details = this._formatAuthResponse(lookupResponse.paymentMethod, lookupResponse.threeDSecureInfo);
    details.verificationDetails = lookupResponse.threeDSecureInfo;

    this._verifyCardPromisePlus.resolve(details);
  }
};

BaseFramework.prototype._onLookupComplete = function (response) {
  this._lookupPaymentMethod = response.paymentMethod;
  this._verifyCardPromisePlus = new ExtendedPromise();

  return Promise.resolve(response);
};

BaseFramework.prototype._formatAuthResponse = function (paymentMethod, threeDSecureInfo) {
  return {
    nonce: paymentMethod.nonce,
    binData: paymentMethod.binData,
    details: paymentMethod.details,
    description: paymentMethod.description && paymentMethod.description.replace(/\+/g, ' '),
    liabilityShifted: threeDSecureInfo && threeDSecureInfo.liabilityShifted,
    liabilityShiftPossible: threeDSecureInfo && threeDSecureInfo.liabilityShiftPossible,
    threeDSecureInfo: paymentMethod.threeDSecureInfo
  };
};

BaseFramework.prototype._formatVerifyCardOptions = function (options) {
  return assign({}, options);
};

BaseFramework.prototype._formatLookupData = function (options) {
  var data = {
    amount: options.amount
  };

  return Promise.resolve(data);
};

BaseFramework.prototype._handleV1AuthResponse = function (data) {
  var authResponse = JSON.parse(data.auth_response);

  if (authResponse.success) {
    this._verifyCardPromisePlus.resolve(this._formatAuthResponse(authResponse.paymentMethod, authResponse.threeDSecureInfo));
  } else if (authResponse.threeDSecureInfo && authResponse.threeDSecureInfo.liabilityShiftPossible) {
    this._verifyCardPromisePlus.resolve(this._formatAuthResponse(this._lookupPaymentMethod, authResponse.threeDSecureInfo));
  } else {
    this._verifyCardPromisePlus.reject(new BraintreeError({
      type: BraintreeError.types.UNKNOWN,
      code: 'UNKNOWN_AUTH_RESPONSE',
      message: authResponse.error.message
    }));
  }
};

BaseFramework.prototype.cancelVerifyCard = function () {
  var response, threeDSecureInfo;

  this._verifyCardInProgress = false;

  if (!this._lookupPaymentMethod) {
    return Promise.reject(new BraintreeError(errors.THREEDS_NO_VERIFICATION_PAYLOAD));
  }

  threeDSecureInfo = this._lookupPaymentMethod.threeDSecureInfo;

  response = assign({}, this._lookupPaymentMethod, {
    liabilityShiftPossible: threeDSecureInfo && threeDSecureInfo.liabilityShiftPossible,
    liabilityShifted: threeDSecureInfo && threeDSecureInfo.liabilityShifted,
    verificationDetails: threeDSecureInfo && threeDSecureInfo.verificationDetails
  });

  return Promise.resolve(response);
};

BaseFramework.prototype._setupV1Bus = function (options) {
  var parentURL = window.location.href.split('#')[0];
  var lookupResponse = options.lookupResponse;
  var channel = uuid();
  var bus = new Bus({
    channel: channel,
    verifyDomain: isVerifiedDomain
  });
  var authenticationCompleteBaseUrl = this._assetsUrl + '/html/three-d-secure-authentication-complete-frame.html?channel=' + encodeURIComponent(channel) + '&';

  bus.on(BUS_CONFIGURATION_REQUEST_EVENT, function (reply) {
    reply({
      acsUrl: lookupResponse.acsUrl,
      pareq: lookupResponse.pareq,
      termUrl: lookupResponse.termUrl + '&three_d_secure_version=' + VERSION + '&authentication_complete_base_url=' + encodeURIComponent(authenticationCompleteBaseUrl),
      md: lookupResponse.md,
      parentUrl: parentURL
    });
  });

  bus.on(events.AUTHENTICATION_COMPLETE, options.handleAuthResponse);

  return bus;
};

BaseFramework.prototype._setupV1Iframe = function (options) {
  var url = this._assetsUrl + '/html/three-d-secure-bank-frame' + useMin(this._isDebug) + '.html?showLoader=' + options.showLoader;
  var bankIframe = iFramer({
    src: url,
    height: IFRAME_HEIGHT,
    width: IFRAME_WIDTH,
    name: constants.LANDING_FRAME_NAME + '_' + this._v1Bus.channel,
    title: '3D Secure Authorization Frame'
  });

  return bankIframe;
};

BaseFramework.prototype._setupV1Elements = function (options) {
  this._v1Bus = this._setupV1Bus(options);
  this._v1Iframe = this._setupV1Iframe(options);
};

BaseFramework.prototype._teardownV1Elements = function () {
  if (this._v1Bus) {
    this._v1Bus.teardown();
    this._v1Bus = null;
  }

  if (this._v1Iframe && this._v1Iframe.parentNode) {
    this._v1Iframe.parentNode.removeChild(this._v1Iframe);
    this._v1Iframe = null;
  }

  if (this._onV1Keyup) {
    document.removeEventListener('keyup', this._onV1Keyup);
    this._onV1Keyup = null;
  }
};

BaseFramework.prototype.teardown = function () {
  analytics.sendEvent(this._createPromise, 'three-d-secure.teardown-completed');

  this._teardownV1Elements();

  return Promise.resolve();
};

module.exports = BaseFramework;

},{"../../../lib/analytics":93,"../../../lib/assign":95,"../../../lib/braintree-error":98,"../../../lib/constants":99,"../../../lib/is-verified-domain":126,"../../../lib/promise":130,"../../../lib/use-min":133,"../../shared/constants":148,"../../shared/errors":149,"../../shared/events":150,"@braintree/event-emitter":40,"@braintree/extended-promise":41,"@braintree/iframer":42,"@braintree/uuid":46,"framebus":172}],140:[function(require,module,exports){
'use strict';
// NEXT_MAJOR_VERSION drop support for Bootstrap framework,
// recomend using inline frame version and putting it in
// the merchant's own bootstrap modal

var SongbirdFramework = require('./songbird');

function Bootstrap3ModalFramework(options) {
  SongbirdFramework.call(this, options);
}

Bootstrap3ModalFramework.prototype = Object.create(SongbirdFramework.prototype, {
  constructor: SongbirdFramework
});

Bootstrap3ModalFramework.prototype._createV1IframeModalElement = function (iframe) {
  var modal = document.createElement('div');

  modal.innerHTML = '<div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="CCAFrameModal-label" aria-hidden="true" style="display: block;">' +
    '<div class="modal-dialog" style="width:440px;z-index:999999;">' +
      '<div class="modal-content">' +
        '<div class="modal-body" data-braintree-v1-fallback-iframe-container>' +
          '<button type="button" data-braintree-v1-fallback-close-button class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div data-braintree-v1-fallback-backdrop style="' +
      'position: fixed;' +
      'cursor: pointer;' +
      'z-index: 999998;' +
      'top: 0;' +
      'left: 0;' +
      'width: 100%;' +
      'height: 100%;' +
    '"></div>' +
  '</div>';

  modal.querySelector('[data-braintree-v1-fallback-iframe-container]').appendChild(iframe);

  return modal;
};

Bootstrap3ModalFramework.prototype._createCardinalConfigurationOptions = function (setupOptions) {
  var options = SongbirdFramework.prototype._createCardinalConfigurationOptions.call(this, setupOptions);

  options.payment.framework = 'bootstrap3';

  return options;
};

module.exports = Bootstrap3ModalFramework;

},{"./songbird":145}],141:[function(require,module,exports){
'use strict';

var SongbirdFramework = require('./songbird');

function CardinalModalFramework(options) {
  SongbirdFramework.call(this, options);
}

CardinalModalFramework.prototype = Object.create(SongbirdFramework.prototype, {
  constructor: SongbirdFramework
});

CardinalModalFramework.prototype._createV1IframeModalElement = function (iframe) {
  var modal = document.createElement('div');
  var addCloseButton = Boolean(this._createOptions &&
    this._createOptions.cardinalSDKConfig &&
    this._createOptions.cardinalSDKConfig.payment &&
    this._createOptions.cardinalSDKConfig.payment.displayExitButton);

  modal.innerHTML = '<div style="' +
    'position: fixed;' +
    'z-index: 999999;' +
    'top: 50%;' +
    'left: 50%;' +
    'padding: 24px 20px;' +
    'transform: translate(-50%,-50%);' +
    'border-radius: 2px;' +
    'background: #fff;' +
    'max-width: 100%;' +
    'overflow: auto;' +
  '">' +
    '<div>' +
      '<button data-braintree-v1-fallback-close-button ' +
        'style="' +
          'font-family: Helvetica,Arial,sans-serif;' +
          'font-size: 25px;' +
          'line-height: 12px;' +
          'position: absolute;' +
          'top: 2px;' +
          'right: 0px;' +
          'cursor: pointer;' +
          'color: #999;' +
          'border: 0;' +
          'outline: none;' +
          'background: none;' +
        '" ' +
        'onMouseOver="this.style.color=\'#000\'" ' +
        'onMouseOut="this.style.color=\'#999\'"' +
      '>×</button>' +
    '</div>' +
    // iframe container
    '<div data-braintree-v1-fallback-iframe-container style="' +
      'height: 400px;' +
    '"></div>' +
  '</div>' +
  // modal backdrop
  '<div data-braintree-v1-fallback-backdrop style="' +
    'position: fixed;' +
    'z-index: 999998;' +
    'cursor: pointer;' +
    'top: 0;' +
    'left: 0;' +
    'width: 100%;' +
    'height: 100%;' +
    'transition: opacity 1ms ease;' +
    'background: rgba(0,0,0,.6);' +
  '"></div>';

  if (!addCloseButton) {
    modal.querySelector('[data-braintree-v1-fallback-close-button]').style.display = 'none';
  }
  modal.querySelector('[data-braintree-v1-fallback-iframe-container]').appendChild(iframe);

  return modal;
};

module.exports = CardinalModalFramework;

},{"./songbird":145}],142:[function(require,module,exports){
'use strict';

var LegacyFramework = require('./legacy');
var CardinalModalFramework = require('./cardinal-modal');
var Bootstrap3ModalFramework = require('./bootstrap3-modal');
var InlineIframeFramework = require('./inline-iframe');

module.exports = {
  legacy: LegacyFramework,
  'cardinal-modal': CardinalModalFramework,
  'bootstrap3-modal': Bootstrap3ModalFramework,
  'inline-iframe': InlineIframeFramework
};

},{"./bootstrap3-modal":140,"./cardinal-modal":141,"./inline-iframe":143,"./legacy":144}],143:[function(require,module,exports){
'use strict';

var SongbirdFramework = require('./songbird');
var BraintreeError = require('../../../lib/braintree-error');
var errors = require('../../shared/errors');
var enumerate = require('../../../lib/enumerate');

function InlineIframeFramework(options) {
  SongbirdFramework.call(this, options);
}

InlineIframeFramework.prototype = Object.create(SongbirdFramework.prototype, {
  constructor: SongbirdFramework
});

InlineIframeFramework.events = enumerate([
  'AUTHENTICATION_IFRAME_AVAILABLE'
], 'inline-iframe-framework:');

InlineIframeFramework.prototype.setUpEventListeners = function (reply) {
  SongbirdFramework.prototype.setUpEventListeners.call(this, reply);

  this.on(InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE, function (payload, next) {
    reply('authentication-iframe-available', payload, next);
  });
};

InlineIframeFramework.prototype._createCardinalConfigurationOptions = function (setupOptions) {
  var options = SongbirdFramework.prototype._createCardinalConfigurationOptions.call(this, setupOptions);

  options.payment.framework = 'inline';

  return options;
};

InlineIframeFramework.prototype._addV1IframeToPage = function () {
  this._emit(InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE, {
    element: this._v1Modal
  }, function () {
    // NOOP
  });
};

InlineIframeFramework.prototype._setupFrameworkSpecificListeners = function () {
  this.setCardinalListener('ui.inline.setup', this._onInlineSetup.bind(this));
};

InlineIframeFramework.prototype._onInlineSetup = function (htmlTemplate, details, resolve, reject) {
  var container, hasError;

  if (!htmlTemplate || !details) {
    hasError = true;
  } else if (details.paymentType !== 'CCA') {
    hasError = true;
  } else if (!(details.data.mode === 'suppress' || details.data.mode === 'static')) {
    hasError = true;
  }

  if (hasError) {
    reject(new BraintreeError(errors.THREEDS_INLINE_IFRAME_DETAILS_INCORRECT));

    return;
  }

  container = document.createElement('div');
  container.innerHTML = htmlTemplate;

  if (details.data.mode === 'suppress') {
    container.style.display = 'none';
    document.body.appendChild(container);
    resolve();
  } else if (details.data.mode === 'static') {
    this._emit(InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE, {
      element: container
    }, function () {
      resolve();
    });
  }
};

module.exports = InlineIframeFramework;

},{"../../../lib/braintree-error":98,"../../../lib/enumerate":107,"../../shared/errors":149,"./songbird":145}],144:[function(require,module,exports){
'use strict';

var BaseFramework = require('./base');
var deferred = require('../../../lib/deferred');

function LegacyFramework(options) {
  BaseFramework.call(this, options);
}

LegacyFramework.prototype = Object.create(BaseFramework.prototype, {
  constructor: LegacyFramework
});

LegacyFramework.prototype.setUpEventListeners = function () {
  // noop
};

LegacyFramework.prototype.transformV1CustomerBillingAddress = function (customer) {
  customer.billingAddress.line1 = customer.billingAddress.streetAddress;
  customer.billingAddress.line2 = customer.billingAddress.extendedAddress;
  customer.billingAddress.city = customer.billingAddress.locality;
  customer.billingAddress.state = customer.billingAddress.region;
  customer.billingAddress.countryCode = customer.billingAddress.countryCodeAlpha2;
  delete customer.billingAddress.streetAddress;
  delete customer.billingAddress.extendedAddress;
  delete customer.billingAddress.locality;
  delete customer.billingAddress.region;
  delete customer.billingAddress.countryCodeAlpha2;

  return customer;
};

LegacyFramework.prototype._createIframe = function (options) {
  var self = this;

  this._setupV1Elements({
    lookupResponse: options.lookupResponse,
    showLoader: options.showLoader,
    handleAuthResponse: function (data) {
      self._handleAuthResponse(data, options);
    }
  });

  return this._v1Iframe;
};

LegacyFramework.prototype._handleAuthResponse = function (data, options) {
  this._v1Bus.teardown();

  options.removeFrame();

  // This also has to be in a setTimeout so it executes after the `removeFrame`.
  deferred(function () {
    this._handleV1AuthResponse(data);
  }.bind(this))();
};

LegacyFramework.prototype._checkForFrameworkSpecificVerifyCardErrors = function (options) {
  var errorOption;

  if (typeof options.addFrame !== 'function') {
    errorOption = 'an addFrame function';
  } else if (typeof options.removeFrame !== 'function') {
    errorOption = 'a removeFrame function';
  }

  return errorOption;
};

LegacyFramework.prototype._formatVerifyCardOptions = function (options) {
  var modifiedOptions = BaseFramework.prototype._formatVerifyCardOptions.call(this, options);

  modifiedOptions.addFrame = deferred(options.addFrame);
  modifiedOptions.removeFrame = deferred(options.removeFrame);
  modifiedOptions.showLoader = options.showLoader !== false;

  return modifiedOptions;
};

LegacyFramework.prototype._formatLookupData = function (options) {
  var self = this;

  return BaseFramework.prototype._formatLookupData.call(this, options).then(function (data) {
    if (options.customer && options.customer.billingAddress) {
      data.customer = self.transformV1CustomerBillingAddress(options.customer);
    }

    return data;
  });
};

LegacyFramework.prototype._presentChallenge = function (lookupResponse, options) {
  options.addFrame(null, this._createIframe({
    showLoader: options.showLoader,
    lookupResponse: lookupResponse.lookup,
    removeFrame: options.removeFrame
  }));
};

module.exports = LegacyFramework;

},{"../../../lib/deferred":105,"./base":139}],145:[function(require,module,exports){
'use strict';

var BaseFramework = require('./base');
var assign = require('../../../lib/assign').assign;
var deferred = require('../../../lib/deferred');
var BraintreeError = require('../../../lib/braintree-error');
var convertToBraintreeError = require('../../../lib/convert-to-braintree-error');
var analytics = require('../../../lib/analytics');
var assets = require('../../../lib/assets');
var errors = require('../../shared/errors');
var enumerate = require('../../../lib/enumerate');
var constants = require('../../shared/constants');
var Promise = require('../../../lib/promise');
var ExtendedPromise = require('@braintree/extended-promise');

var INTEGRATION_TIMEOUT_MS = require('../../../lib/constants').INTEGRATION_TIMEOUT_MS;
var PLATFORM = require('../../../lib/constants').PLATFORM;
var VERSION = "3.78.2";
var CUSTOMER_CANCELED_SONGBIRD_MODAL = '01';
var SONGBIRD_UI_EVENTS = [
  'ui.close',
  'ui.render',

  // TODO these events are not documented in the
  // client reference because so far we have
  // not been able to trigger them in our testing
  'ui.renderHidden',
  'ui.loading.close',
  'ui.loading.render'
];

function SongbirdFramework(options) {
  BaseFramework.call(this, options);

  this._useV1Fallback = false;
  this._clientMetadata = {
    requestedThreeDSecureVersion: '2',
    sdkVersion: PLATFORM + '/' + VERSION
  };
  this._getDfReferenceIdPromisePlus = new ExtendedPromise();
  this.setupSongbird(options);
  this._cardinalEvents = [];
}

SongbirdFramework.prototype = Object.create(BaseFramework.prototype, {
  constructor: SongbirdFramework
});

SongbirdFramework.events = enumerate([
  'LOOKUP_COMPLETE',
  'CUSTOMER_CANCELED',
  'UI.CLOSE',
  'UI.RENDER',
  'UI.RENDERHIDDEN',
  'UI.LOADING.CLOSE',
  'UI.LOADING.RENDER'
], 'songbird-framework:');

SongbirdFramework.prototype.setUpEventListeners = function (reply) {
  this.on(SongbirdFramework.events.LOOKUP_COMPLETE, function (data, next) {
    reply('lookup-complete', data, next);
  });
  this.on(SongbirdFramework.events.CUSTOMER_CANCELED, function () {
    reply('customer-canceled');
  });
  this.on(SongbirdFramework.events['UI.CLOSE'], function () {
    reply('authentication-modal-close');
  });
  this.on(SongbirdFramework.events['UI.RENDER'], function () {
    reply('authentication-modal-render');
  });
  this.on(SongbirdFramework.events['UI.RENDERHIDDEN'], function () {
    reply('authentication-modal-render-hidden');
  });
  this.on(SongbirdFramework.events['UI.LOADING.CLOSE'], function () {
    reply('authentication-modal-loader-close');
  });
  this.on(SongbirdFramework.events['UI.LOADING.RENDER'], function () {
    reply('authentication-modal-loader-render');
  });
};

SongbirdFramework.prototype.prepareLookup = function (options) {
  var data = assign({}, options);
  var self = this;

  return this.getDfReferenceId().then(function (id) {
    data.dfReferenceId = id;
  }).then(function () {
    return self._triggerCardinalBinProcess(options.bin);
  }).catch(function () {
    // catch and ignore errors from looking up
    // df reference and Cardinal bin process
  }).then(function () {
    return self._waitForClient();
  }).then(function () {
    data.clientMetadata = self._clientMetadata;
    data.authorizationFingerprint = self._client.getConfiguration().authorizationFingerprint;
    data.braintreeLibraryVersion = 'braintree/web/' + VERSION;

    return data;
  });
};

SongbirdFramework.prototype.initializeChallengeWithLookupResponse = function (lookupResponse, options) {
  return this.setupSongbird().then(function () {
    return BaseFramework.prototype.initializeChallengeWithLookupResponse.call(this, lookupResponse, options);
  }.bind(this));
};

SongbirdFramework.prototype._initiateV1Fallback = function (errorType) {
  this._useV1Fallback = true;
  analytics.sendEvent(this._createPromise, 'three-d-secure.v1-fallback.' + errorType);
  this._songbirdPromise.resolve();
};

SongbirdFramework.prototype._triggerCardinalBinProcess = function (bin) {
  var self = this;
  var issuerStartTime = Date.now();

  if (!bin) {
    // skip bin lookup because bin wasn't passed in
    return Promise.resolve();
  }

  return window.Cardinal.trigger('bin.process', bin).then(function (binResults) {
    self._clientMetadata.issuerDeviceDataCollectionTimeElapsed = Date.now() - issuerStartTime;
    self._clientMetadata.issuerDeviceDataCollectionResult = binResults && binResults.Status;
  });
};

SongbirdFramework.prototype.transformBillingAddress = function (additionalInformation, billingAddress) {
  if (billingAddress) {
    // map from public API to the API that the Gateway expects
    extractAddressData(billingAddress, additionalInformation, 'billing');
    additionalInformation.billingPhoneNumber = billingAddress.phoneNumber;
    additionalInformation.billingGivenName = billingAddress.givenName;
    additionalInformation.billingSurname = billingAddress.surname;
  }

  return additionalInformation;
};

SongbirdFramework.prototype.transformShippingAddress = function (additionalInformation) {
  var shippingAddress = additionalInformation.shippingAddress;

  if (shippingAddress) {
    // map from public API to the API that the Gateway expects
    extractAddressData(shippingAddress, additionalInformation, 'shipping');

    delete additionalInformation.shippingAddress;
  }

  return additionalInformation;
};

SongbirdFramework.prototype._createV1IframeModalElement = function (iframe) {
  var modal = document.createElement('div');

  modal.innerHTML = '<div data-braintree-v1-fallback-iframe-container="true" style="' +
    'height: 400px;' +
  '"></div>';
  modal.querySelector('[data-braintree-v1-fallback-iframe-container="true"]').appendChild(iframe);

  return modal;
};

SongbirdFramework.prototype._createV1IframeModal = function (iframe) {
  var modal = this._createV1IframeModalElement(iframe);
  var btn = modal.querySelector('[data-braintree-v1-fallback-close-button]');
  var backdrop = modal.querySelector('[data-braintree-v1-fallback-backdrop]');
  var self = this;

  function closeHandler() {
    modal.parentNode.removeChild(modal);
    self.cancelVerifyCard(errors.THREEDS_CARDINAL_SDK_CANCELED);
    document.removeEventListener('keyup', self._onV1Keyup);
    self._onV1Keyup = null;
  }

  this._onV1Keyup = function (e) {
    if (e.key !== 'Escape') {
      return;
    }

    if (!modal.parentNode) {
      // modal not on page
      return;
    }

    closeHandler();
  };

  if (btn) {
    btn.addEventListener('click', closeHandler);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeHandler);
  }

  document.addEventListener('keyup', this._onV1Keyup);

  return modal;
};

SongbirdFramework.prototype._addV1IframeToPage = function () {
  document.body.appendChild(this._v1Modal);
};

SongbirdFramework.prototype._handleAuthResponseFromV1Fallback = function (data) {
  this._teardownV1Elements();
  this._v1Modal.parentNode.removeChild(this._v1Modal);
  this._handleV1AuthResponse(data);
};

SongbirdFramework.prototype._presentChallengeWithV1Fallback = function (lookupResponse) {
  var self = this;

  this._setupV1Elements({
    lookupResponse: lookupResponse,
    showLoader: true,
    handleAuthResponse: function (data) {
      self._handleAuthResponseFromV1Fallback(data);
    }
  });
  this._v1Modal = this._createV1IframeModal(this._v1Iframe);
  this._addV1IframeToPage();
};

SongbirdFramework.prototype.setupSongbird = function (setupOptions) {
  var self = this;
  var startTime = Date.now();

  if (this._songbirdPromise) {
    return this._songbirdPromise;
  }

  setupOptions = setupOptions || {};

  this._songbirdPromise = new ExtendedPromise();
  this._v2SetupFailureReason = 'reason-unknown';

  self._loadCardinalScript(setupOptions).then(function () {
    if (!window.Cardinal) {
      self._v2SetupFailureReason = 'cardinal-global-unavailable';

      return Promise.reject(new BraintreeError(errors.THREEDS_CARDINAL_SDK_SETUP_FAILED));
    }

    return self._configureCardinalSdk({
      setupOptions: setupOptions,
      setupStartTime: startTime
    });
  }).catch(function (err) {
    var error = convertToBraintreeError(err, {
      type: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.type,
      code: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.code,
      message: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.message
    });

    self._getDfReferenceIdPromisePlus.reject(error);

    window.clearTimeout(self._songbirdSetupTimeoutReference);
    analytics.sendEvent(self._client, 'three-d-secure.cardinal-sdk.init.setup-failed');
    self._initiateV1Fallback('cardinal-sdk-setup-failed.' + self._v2SetupFailureReason);
  });

  return this._songbirdPromise;
};

SongbirdFramework.prototype._configureCardinalSdk = function (config) {
  var self = this;

  return this._waitForClient().then(function () {
    var threeDSConfig = self._client.getConfiguration().gatewayConfiguration.threeDSecure;

    if (threeDSConfig.hasOwnProperty('versionTwo') && threeDSConfig.versionTwo !== 'cardinal') {
      return Promise.reject(new Error('cardinal-api-not-available-or-configured'));
    }

    return threeDSConfig;
  }).then(function (threeDSConfig) {
    var jwt = threeDSConfig.cardinalAuthenticationJWT;
    var setupOptions = config.setupOptions;
    var setupStartTime = config.setupStartTime;
    var cardinalConfiguration = self._createCardinalConfigurationOptions(setupOptions);

    SONGBIRD_UI_EVENTS.forEach(function (eventName) {
      self.setCardinalListener(eventName, function () {
        self._emit(SongbirdFramework.events[eventName.toUpperCase()]);
      });
    });
    self.setCardinalListener('payments.setupComplete', self._createPaymentsSetupCompleteCallback());

    self._setupFrameworkSpecificListeners();

    window.Cardinal.configure(cardinalConfiguration);

    window.Cardinal.setup('init', {
      jwt: jwt
    });

    self._clientMetadata.cardinalDeviceDataCollectionTimeElapsed = Date.now() - setupStartTime;

    self.setCardinalListener('payments.validated', self._createPaymentsValidatedCallback());
  }).catch(function (err) {
    if (err.message === 'cardinal-api-not-available-or-configured') {
      self._v2SetupFailureReason = 'cardinal-api-not-available-or-configured';
    } else {
      self._v2SetupFailureReason = 'cardinal-configuration-threw-error';
    }

    return Promise.reject(err);
  });
};

SongbirdFramework.prototype.setCardinalListener = function (eventName, cb) {
  this._cardinalEvents.push(eventName);
  window.Cardinal.on(eventName, cb);
};

SongbirdFramework.prototype._setupFrameworkSpecificListeners = function () {
  // noop
};

SongbirdFramework.prototype._createCardinalConfigurationOptions = function (setupOptions) {
  var cardinalConfiguration = setupOptions.cardinalSDKConfig || {};
  var paymentSettings = cardinalConfiguration.payment || {};

  if (!cardinalConfiguration.logging && setupOptions.loggingEnabled) {
    cardinalConfiguration.logging = {
      level: 'verbose'
    };
  }

  cardinalConfiguration.payment = {};

  if (paymentSettings.hasOwnProperty('displayLoading')) {
    cardinalConfiguration.payment.displayLoading = paymentSettings.displayLoading;
  }
  if (paymentSettings.hasOwnProperty('displayExitButton')) {
    cardinalConfiguration.payment.displayExitButton = paymentSettings.displayExitButton;
  }

  return cardinalConfiguration;
};

SongbirdFramework.prototype._loadCardinalScript = function (setupOptions) {
  var self = this;
  var scriptSource = constants.CARDINAL_SCRIPT_SOURCE.sandbox;

  return this._waitForClient().then(function () {
    var isProduction = self._client.getConfiguration().gatewayConfiguration.environment === 'production';

    self._songbirdSetupTimeoutReference = window.setTimeout(function () {
      analytics.sendEvent(self._client, 'three-d-secure.cardinal-sdk.init.setup-timeout');
      self._initiateV1Fallback('cardinal-sdk-setup-timeout');
    }, setupOptions.timeout || INTEGRATION_TIMEOUT_MS);

    if (isProduction) {
      scriptSource = constants.CARDINAL_SCRIPT_SOURCE.production;
    }

    return assets.loadScript({src: scriptSource});
  }).catch(function (err) {
    self._v2SetupFailureReason = 'songbird-js-failed-to-load';

    return Promise.reject(convertToBraintreeError(err, errors.THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED));
  });
};

SongbirdFramework.prototype._createPaymentsSetupCompleteCallback = function () {
  var self = this;

  return function (data) {
    self._getDfReferenceIdPromisePlus.resolve(data.sessionId);

    window.clearTimeout(self._songbirdSetupTimeoutReference);
    analytics.sendEvent(self._createPromise, 'three-d-secure.cardinal-sdk.init.setup-completed');

    self._songbirdPromise.resolve();
  };
};

SongbirdFramework.prototype.getDfReferenceId = function () {
  return this._getDfReferenceIdPromisePlus;
};

SongbirdFramework.prototype._performJWTValidation = function (rawCardinalSDKVerificationData, jwt) {
  var self = this;
  var nonce = this._lookupPaymentMethod.nonce;
  var url = 'payment_methods/' + nonce + '/three_d_secure/authenticate_from_jwt';
  var cancelCode = rawCardinalSDKVerificationData &&
    rawCardinalSDKVerificationData.Payment &&
    rawCardinalSDKVerificationData.Payment.ExtendedData &&
    rawCardinalSDKVerificationData.Payment.ExtendedData.ChallengeCancel;

  if (cancelCode) {
    // see ChallengeCancel docs here for different values:
    // https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/98315/Response+Objects
    analytics.sendEvent(this._createPromise, 'three-d-secure.verification-flow.cardinal-sdk.cancel-code.' + cancelCode);

    if (cancelCode === CUSTOMER_CANCELED_SONGBIRD_MODAL) {
      this._emit(SongbirdFramework.events.CUSTOMER_CANCELED);
    }
  }

  analytics.sendEvent(this._createPromise, 'three-d-secure.verification-flow.upgrade-payment-method.started');

  return this._waitForClient().then(function () {
    return self._client.request({
      method: 'post',
      endpoint: url,
      data: {
        jwt: jwt,
        paymentMethodNonce: nonce
      }
    });
  }).then(function (response) {
    var paymentMethod = response.paymentMethod || self._lookupPaymentMethod;
    var formattedResponse = self._formatAuthResponse(paymentMethod, response.threeDSecureInfo);

    formattedResponse.rawCardinalSDKVerificationData = rawCardinalSDKVerificationData;
    analytics.sendEvent(self._client, 'three-d-secure.verification-flow.upgrade-payment-method.succeeded');

    return Promise.resolve(formattedResponse);
  }).catch(function (err) {
    var error = new BraintreeError({
      type: errors.THREEDS_JWT_AUTHENTICATION_FAILED.type,
      code: errors.THREEDS_JWT_AUTHENTICATION_FAILED.code,
      message: errors.THREEDS_JWT_AUTHENTICATION_FAILED.message,
      details: {
        originalError: err
      }
    });

    analytics.sendEvent(self._client, 'three-d-secure.verification-flow.upgrade-payment-method.errored');

    return Promise.reject(error);
  });
};

SongbirdFramework.prototype._createPaymentsValidatedCallback = function () {
  var self = this;

  /**
   * @param {object} data Response Data
   * @see {@link https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/98315/Response+Objects#ResponseObjects-ObjectDefinition}
   * @param {string} data.ActionCode The resulting state of the transaction.
   * @param {boolean} data.Validated Represents whether transaction was successfully or not.
   * @param {object} data.Payment Represents additional information about the verification.
   * @param {number} data.ErrorNumber A non-zero value represents the error encountered while attempting the process the message request.
   * @param {string} data.ErrorDescription Application error description for the associated error number.
   * @param {string} validatedJwt Response JWT
   * @returns {void}
   * */
  return function (data, validatedJwt) {
    var formattedError;

    analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.cardinal-sdk.action-code.' + data.ActionCode.toLowerCase());

    if (!self._verifyCardPromisePlus) {
      self._initiateV1Fallback('cardinal-sdk-setup-error.number-' + data.ErrorNumber);

      return;
    }

    switch (data.ActionCode) {
      // Handle these scenarios based on liability shift information in the response.
      case 'SUCCESS':
      case 'NOACTION':
      case 'FAILURE':
        self._performJWTValidation(data, validatedJwt)
          .then(function (result) {
            self._verifyCardPromisePlus.resolve(result);
          })
          .catch(function (err) {
            self._verifyCardPromisePlus.reject(err);
          });
        break;

      case 'ERROR':
        analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.cardinal-sdk-error.' + data.ErrorNumber);

        switch (data.ErrorNumber) {
          case 10001: // Cardinal Docs: Timeout when sending an /Init message
          case 10002: // Cardinal Docs: Timeout when sending an /Start message
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT);
            break;
          case 10003: // Cardinal Docs: Timeout when sending an /Validate message. Although this code exists we do not yet have a flow where a validate message is sent to Midas. This error should not yet be triggered
          case 10007: // Cardinal Docs: Timeout when sending an /Confirm message
          case 10009: // Cardinal Docs: Timeout when sending an /Continue message
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT);
            break;
          case 10005: // Cardinal Docs: Songbird was started without a request jwt.
          case 10006: // Cardinal Docs: This is a general configuration error. The description is populated by the specific configuration error that caused the error.
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_BAD_CONFIG);
            break;
          case 10008: // Cardinal Docs: Songbird was initialized without a merchant JWT.
          case 10010: // Cardinal Docs: The response JWT was
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_BAD_JWT);
            break;
          case 10011:
            // This may never get called, according to the Cardinal docs:
            // The user has canceled the transaction. This is generally found in alternative
            // payments that supply a cancel button on the payment brand side.
            analytics.sendEvent(self._createPromise, 'three-d-secure.verification-flow.canceled');
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_CANCELED);
            break;
          default:
            formattedError = new BraintreeError(errors.THREEDS_CARDINAL_SDK_ERROR);
        }

        formattedError.details = {
          originalError: {
            code: data.ErrorNumber,
            description: data.ErrorDescription
          }
        };

        self._verifyCardPromisePlus.reject(formattedError);
        break;

      default:
    }
  };
};

SongbirdFramework.prototype._checkForVerifyCardError = function (options, privateOptions) {
  return BaseFramework.prototype._checkForVerifyCardError.call(this, options, privateOptions);
};

SongbirdFramework.prototype._checkForFrameworkSpecificVerifyCardErrors = function (options, privateOptions) {
  var errorOption;

  if (typeof options.onLookupComplete !== 'function' && !privateOptions.ignoreOnLookupCompleteRequirement) {
    errorOption = 'an onLookupComplete function';
  }

  return errorOption;
};

SongbirdFramework.prototype._formatVerifyCardOptions = function (options) {
  var modifiedOptions = BaseFramework.prototype._formatVerifyCardOptions.call(this, options);
  var additionalInformation = modifiedOptions.additionalInformation || {};

  additionalInformation = this.transformBillingAddress(additionalInformation, options.billingAddress);
  additionalInformation = this.transformShippingAddress(additionalInformation);

  if (options.onLookupComplete) {
    modifiedOptions.onLookupComplete = deferred(options.onLookupComplete);
  }
  if (options.email) {
    additionalInformation.email = options.email;
  }
  if (options.mobilePhoneNumber) {
    additionalInformation.mobilePhoneNumber = options.mobilePhoneNumber;
  }

  modifiedOptions.additionalInformation = additionalInformation;

  return modifiedOptions;
};

SongbirdFramework.prototype._onLookupComplete = function (lookupResponse, options) {
  var self = this;

  return BaseFramework.prototype._onLookupComplete.call(this, lookupResponse).then(function (response) {
    return new Promise(function (resolve, reject) {
      // NEXT_MAJOR_VERSION format this response object to look like the mobile sdk response
      // which is basically the lookup param at the top level with some additional accessors
      response.requiresUserAuthentication = Boolean(response.lookup && response.lookup.acsUrl);

      function next() {
        resolve(response);
      }

      self._verifyCardPromisePlus.catch(reject);

      // If both event and callback are mistakenly used together,
      // prefer the callback when it is passed into the verifyCard options
      if (options.onLookupComplete) {
        options.onLookupComplete(response, next);
      } else {
        self._emit(SongbirdFramework.events.LOOKUP_COMPLETE, response, next);
      }
    });
  });
};

SongbirdFramework.prototype._presentChallenge = function (lookupResponse) {
  // transactionId is required for the Songbird flow, so if it
  // does not exist, we fallback to the 3ds v1 flow
  if (this._useV1Fallback || !lookupResponse.lookup.transactionId) {
    this._presentChallengeWithV1Fallback(lookupResponse.lookup);

    return;
  }

  // set up listener for ref id to call out to bt before calling verify callback
  window.Cardinal.continue('cca',
    {
      AcsUrl: lookupResponse.lookup.acsUrl,
      Payload: lookupResponse.lookup.pareq
    },
    {
      OrderDetails: {TransactionId: lookupResponse.lookup.transactionId}
    }
  );
};

SongbirdFramework.prototype._formatLookupData = function (options) {
  var self = this;

  return BaseFramework.prototype._formatLookupData.call(this, options).then(function (data) {
    data.additionalInfo = options.additionalInformation;

    if (options.accountType) {
      data.accountType = options.accountType;
    }
    if (options.challengeRequested) {
      data.challengeRequested = options.challengeRequested;
    }
    if (options.dataOnlyRequested) {
      data.dataOnlyRequested = options.dataOnlyRequested;
    }
    if (options.exemptionRequested) {
      data.exemptionRequested = options.exemptionRequested;
    }
    if (options.bin) {
      data.bin = options.bin;
    }

    return self.prepareLookup(data);
  });
};

SongbirdFramework.prototype.cancelVerifyCard = function (verifyCardError) {
  var self = this;

  return BaseFramework.prototype.cancelVerifyCard.call(this).then(function (response) {
    if (self._verifyCardPromisePlus) {
      verifyCardError = verifyCardError || new BraintreeError(errors.THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT);

      self._verifyCardPromisePlus.reject(verifyCardError);
    }

    return response;
  });
};

SongbirdFramework.prototype.teardown = function () {
  if (window.Cardinal) {
    this._cardinalEvents.forEach(function (eventName) {
      window.Cardinal.off(eventName);
    });
  }

  // we intentionally do not remove the Cardinal SDK
  // from the page when tearing down. Subsequent
  // component creations will be faster because
  // the asset is already on the page

  return BaseFramework.prototype.teardown.call(this);
};

function extractAddressData(source, target, prefix) {
  target[prefix + 'Line1'] = source.streetAddress;
  target[prefix + 'Line2'] = source.extendedAddress;
  target[prefix + 'Line3'] = source.line3;
  target[prefix + 'City'] = source.locality;
  target[prefix + 'State'] = source.region;
  target[prefix + 'PostalCode'] = source.postalCode;
  target[prefix + 'CountryCode'] = source.countryCodeAlpha2;
}

module.exports = SongbirdFramework;

},{"../../../lib/analytics":93,"../../../lib/assets":94,"../../../lib/assign":95,"../../../lib/braintree-error":98,"../../../lib/constants":99,"../../../lib/convert-to-braintree-error":101,"../../../lib/deferred":105,"../../../lib/enumerate":107,"../../../lib/promise":130,"../../shared/constants":148,"../../shared/errors":149,"./base":139,"@braintree/extended-promise":41}],146:[function(require,module,exports){
'use strict';

var wrapPromise = require('@braintree/wrap-promise');
var methods = require('../../lib/methods');
var convertMethodsToError = require('../../lib/convert-methods-to-error');
var EventEmitter = require('@braintree/event-emitter');
var FRAMEWORKS = require('./frameworks');

/**
 * @deprecated
 * @callback ThreeDSecure~addFrameCallback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {HTMLIFrameElement} iframe An iframe element containing the bank's authentication page that you must put on your page.
 * @description **Deprecated** The callback used for options.addFrame in 3DS 1.0's {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @deprecated
 * @callback ThreeDSecure~removeFrameCallback
 * @description **Deprecated** The callback used for options.removeFrame in 3DS 1.0's {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @deprecated
 * @typedef {object} ThreeDSecure~verifyCardCustomerObject
 * @property {string} [customer.mobilePhoneNumber] The mobile phone number used for verification. Only numbers; remove dashes, parenthesis and other characters.
 * @property {string} [customer.email] The email used for verification.
 * @property {string} [customer.shippingMethod] The 2-digit string indicating the shipping method chosen for the transaction.
 * @property {string} [customer.billingAddress.firstName] The first name associated with the address.
 * @property {string} [customer.billingAddress.lastName] The last name associated with the address.
 * @property {string} [customer.billingAddress.streetAddress] Line 1 of the Address (eg. number, street, etc).
 * @property {string} [customer.billingAddress.extendedAddress] Line 2 of the Address (eg. suite, apt #, etc.).
 * @property {string} [customer.billingAddress.locality] The locality (city) name associated with the address.
 * @property {string} [customer.billingAddress.region] The 2 letter code for US states or an ISO-3166-2 country subdivision code of up to three letters.
 * @property {string} [customer.billingAddress.postalCode] The zip code or equivalent for countries that have them.
 * @property {string} [customer.billingAddress.countryCodeAlpha2] The 2 character country code.
 * @property {string} [customer.billingAddress.phoneNumber] The phone number associated with the address. Only numbers; remove dashes, parenthesis and other characters.
 * @description **Deprecated** Optional customer information to be passed to 3DS 1.0 for verification.
 */

/**
 * @typedef {object} ThreeDSecure~verifyPayload
 * @property {string} nonce The new payment method nonce produced by the 3D Secure lookup. The original nonce passed into {@link ThreeDSecure#verifyCard|verifyCard} was consumed. This new nonce should be used to transact on your server.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 * @property {boolean} liabilityShiftPossible *Deprecated:* Use `threeDSecureInfo.liabilityShiftPossible` instead.
 * @property {boolean} liabilityShifted *Deprecated:* Use `threeDSecureInfo.liabilityShifted` instead.
 * @property {object} threeDSecureInfo 3DS information about the card. Note: This information should be verified on the server by using the [payment method nonce find method](https://developers.braintreepayments.com/reference/request/payment-method-nonce/find). The values provided here are merely for convenience. Only values looked up on the server should determine the logic about how to process a transaction.
 * @property {boolean} threeDSecureInfo.liabilityShiftPossible Indicates whether the card was eligible for 3D Secure.
 * @property {boolean} threeDSecureInfo.liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 * @property {string} threeDSecureInfo.cavv Cardholder authentication verification value or CAVV. The main encrypted message issuers and card networks use to verify authentication has occurred. Mastercard uses an AVV message and American Express uses an AEVV message, each of which should also be passed in the cavv parameter.
 * @property {string} threeDSecureInfo.xid Transaction identifier resulting from 3D Secure authentication. Uniquely identifies the transaction and sometimes required in the authorization message. This is a base64-encoded value. This field will no longer be used in 3D Secure 2 authentications for Visa and Mastercard, however it will be supported by American Express.
 * @property {string} threeDSecureInfo.dsTransactionId Transaction identifier resulting from 3D Secure 2 authentication.
 * @property {string} threeDSecureInfo.threeDSecureVersion The version of 3D Secure authentication used for the transaction.
 * @property {string} threeDSecureInfo.eciFlag The value of the electronic commerce indicator (ECI) flag, which indicates the outcome of the 3DS authentication. This will be a two-digit value.
 * @property {string} threeDSecureInfo.threeDSecureAuthenticationId ID of the 3D Secure authentication performed for this transaction. Do not provide this field as a transaction sale parameter if you are using the returned payment method nonce from the payload.
 * @property {object} rawCardinalSDKVerificationData The response back from the Cardinal SDK after verification has completed. See [Cardinal's Documentation](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/98315/Response+Objects) for more information. If the customer was not required to do a 3D Secure challenge, this object will not be available.
 */

/**
 * @typedef {string} ThreeDSecure~prepareLookupPayload The client data to pass on when doing a server side lookup call.
 */

/**
 * @typedef {object} ThreeDSecure~verificationData
 * @property {boolean} requiresUserAuthentication When `true`, the user will be presented with a 3D Secure challenge when calling `next` in the {@link ThreeDSecure#event:lookup-complete|`lookup-complete` event}.
 * @property {object} threeDSecureInfo Contains liability shift details.
 * @property {boolean} threeDSecureInfo.liabilityShiftPossible Indicates whether the card was eligible for 3D Secure.
 * @property {boolean} threeDSecureInfo.liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 * @property {object} paymentMethod A {@link ThreeDSecure~verifyPayload|verifyPayload} object.
 * @property {object} lookup Details about the 3D Secure lookup.
 * @property {string} lookup.threeDSecureVersion The version of 3D Secure that will be used for the 3D Secure challenge.
*/

/**
 * @typedef {object} ThreeDSecure~billingAddress
 * @property {string} [givenName] The first name associated with the billing address. (maximum length 50)
 * @property {string} [surname] The last name associated with the billing address. (maximum length 50)
 * @property {string} [phoneNumber] The phone number associated with the billing address. Only numbers; remove dashes, parenthesis and other characters.
 * @property {string} [streetAddress] Line 1 of the billing address (eg. number, street, etc). (maximum length 50)
 * @property {string} [extendedAddress] Line 2 of the billing address (eg. suite, apt #, etc.). (maximum length 50)
 * @property {string} [line3] Line 3 of the billing address if needed (eg. suite, apt #, etc). (maximum length 50)
 * @property {string} [locality] The locality (city) name associated with the billing address.
 * @property {string} [region] The 2 letter code for US states or an ISO-3166-2 country subdivision code of up to three letters.
 * @property {string} [postalCode] The zip code or equivalent for countries that have them.
 * @property {string} [countryCodeAlpha2] The 2 character country code.
*/

/**
 * @typedef {object} ThreeDSecure~additionalInformation
 * @property {string} [workPhoneNumber] The work phone number used for verification. Only numbers; remove dashes, parenthesis and other characters. (maximum length 25)
 * @property {string} [shippingGivenName] The first name associated with the shipping address. (maximum length 50)
 * @property {string} [shippingSurname] The last name associated with the shipping address. (maximum length 50)
 * @property {object} [shippingAddress]
 * @property {string} [shippingAddress.streetAddress] Line 1 of the shipping address (eg. number, street, etc). (maximum length 50)
 * @property {string} [shippingAddress.extendedAddress] Line 2 of the shipping address (eg. suite, apt #, etc.). (maximum length 50)
 * @property {string} [shippingAddress.line3] Line 3 of the shipping address if needed (eg. suite, apt #, etc). (maximum length 50)
 * @property {string} [shippingAddress.locality] The locality (city) name associated with the shipping address. (maximum length 50)
 * @property {string} [shippingAddress.region] The 2 letter code for US states or an ISO-3166-2 country subdivision code of up to three letters. (maximum length 50)
 * @property {string} [shippingAddress.postalCode] The zip code or equivalent for countries that have them. (maximum length 10)
 * @property {string} [shippingAddress.countryCodeAlpha2] The 2 character country code. (maximum length 2)
 * @property {string} [shippingPhone] The phone number associated with the shipping address. Only numbers; remove dashes, parenthesis and other characters. (maximum length 20)
 * @property {string} [shippingMethod] The 2-digit string indicating the name of the shipping method chosen for the transaction. (maximum length 50) Possible values:
 * - `01` Same Day
 * - `02` Overnight / Expedited
 * - `03` Priority (2-3 Days)
 * - `04` Ground
 * - `05` Electronic Delivery
 * - `06` Ship to Store
 * @property {string} [shippingMethodIndicator] The 2-digit string indicating the shipping method chosen for the transaction Possible values.
 * - `01` Ship to cardholder billing address
 * - `02` Ship to another verified address on file with merchant
 * - `03` Ship to address that is different from billing address
 * - `04` Ship to store (store address should be populated on request)
 * - `05` Digital goods
 * - `06` Travel and event tickets, not shipped
 * - `07` Other
 * @property {string} [productCode] The 3-letter string representing the merchant product code. Possible values:
 * - `AIR` Airline
 * - `GEN` General Retail
 * - `DIG` Digital Goods
 * - `SVC` Services
 * - `RES` Restaurant
 * - `TRA` Travel
 * - `DSP` Cash Dispensing
 * - `REN` Car Rental
 * - `GAS` Fuel
 * - `LUX` Luxury Retail
 * - `ACC` Accommodation Retail
 * - `TBD` Other
 * @property {string} [deliveryTimeframe] The 2-digit number indicating the delivery time frame. Possible values:
 * - `01` Electronic delivery
 * - `02` Same day shipping
 * - `03` Overnight shipping
 * - `04` Two or more day shipping
 * @property {string} [deliveryEmail] For electronic delivery, email address to which the merchandise was delivered. (maximum length 254)
 * @property {string} [reorderindicator] The 2-digit number indicating whether the cardholder is reordering previously purchased merchandise. possible values:
 * - `01` First time ordered
 * - `02` Reordered
 * @property {string} [preorderIndicator] The 2-digit number indicating whether cardholder is placing an order with a future availability or release date. possible values:
 * - `01` Merchandise available
 * - `02` Future availability
 * @property {string} [preorderDate] The 8-digit number (format: YYYYMMDD) indicating expected date that a pre-ordered purchase will be available.
 * @property {string} [giftCardAmount] The purchase amount total for prepaid gift cards in major units. (maximum length 15)
 * @property {string} [giftCardCurrencyCode] ISO 4217 currency code for the gift card purchased. (maximum length 3)
 * @property {string} [giftCardCount] Total count of individual prepaid gift cards purchased. (maximum length 2)
 * @property {string} [accountAgeIndicator] The 2-digit value representing the length of time cardholder has had account. Possible values:
 * - `01` No Account
 * - `02` Created during transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {string} [accountCreateDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder opened the account.
 * @property {string} [accountChangeIndicator] The 2-digit value representing the length of time since the last change to the cardholder account. This includes shipping address, new payment account or new user added. Possible values:
 * - `01` Changed during transaction
 * - `02` Less than 30 days
 * - `03` 30-60 days
 * - `04` More than 60 days
 * @property {string} [accountChangeDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder's account was last changed. This includes changes to the billing or shipping address, new payment accounts or new users added.
 * @property {string} [accountPwdChangeIndicator] The 2-digit value representing the length of time since the cardholder changed or reset the password on the account. Possible values:
 * - `01` No change
 * - `02` Changed during transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {string} [accountPwdChangeDate] The 8-digit number (format: YYYYMMDD) indicating the date the cardholder last changed or reset password on account.
 * @property {string} [shippingAddressUsageIndicator] The 2-digit value indicating when the shipping address used for transaction was first used. Possible values:
 * - `01` This transaction
 * - `02` Less than 30 days
 * - `03` 30-60 days
 * - `04` More than 60 days
 * @property {string} [shippingAddressUsageDate] The 8-digit number (format: YYYYMMDD) indicating the date when the shipping address used for this transaction was first used.
 * @property {string} [transactionCountDay] Number of transactions (successful or abandoned) for this cardholder account within the last 24 hours. (maximum length 3)
 * @property {string} [transactionCountYear] Number of transactions (successful or abandoned) for this cardholder account within the last year. (maximum length 3)
 * @property {string} [addCardAttempts] Number of add card attempts in the last 24 hours. (maximum length 3)
 * @property {string} [accountPurchases] Number of purchases with this cardholder account during the previous six months.
 * @property {string} [fraudActivity] The 2-digit value indicating whether the merchant experienced suspicious activity (including previous fraud) on the account. Possible values:
 * - `01` No suspicious activity
 * - `02` Suspicious activity observed
 * @property {string} [shippingNameIndicator] The 2-digit value indicating if the cardholder name on the account is identical to the shipping name used for the transaction. Possible values:
 * - `01` Account and shipping name identical
 * - `02` Account and shipping name differ
 * @property {string} [paymentAccountIndicator] The 2-digit value indicating the length of time that the payment account was enrolled in the merchant account. Possible values:
 * - `01` No account (guest checkout)
 * - `02` During the transaction
 * - `03` Less than 30 days
 * - `04` 30-60 days
 * - `05` More than 60 days
 * @property {string} [paymentAccountAge] The 8-digit number (format: YYYYMMDD) indicating the date the payment account was added to the cardholder account.
 * @property {string} [acsWindowSize] The 2-digit number to set the challenge window size to display to the end cardholder.  The ACS will reply with content that is formatted appropriately to this window size to allow for the best user experience.  The sizes are width x height in pixels of the window displayed in the cardholder browser window. Possible values:
 * - `01` 250x400
 * - `02` 390x400
 * - `03` 500x600
 * - `04` 600x400
 * - `05` Full page
 * @property {string} [sdkMaxTimeout] The 2-digit number of minutes (minimum 05) to set the maximum amount of time for all 3DS 2.0 messages to be communicated between all components.
 * @property {string} [addressMatch] The 1-character value (Y/N) indicating whether cardholder billing and shipping addresses match.
 * @property {string} [accountId] Additional cardholder account information. (maximum length 64)
 * @property {string} [ipAddress] The IP address of the consumer. IPv4 and IPv6 are supported.
 * @property {string} [orderDescription] Brief description of items purchased. (maximum length 256)
 * @property {string} [taxAmount] Unformatted tax amount without any decimalization (ie. $123.67 = 12367). (maximum length 20)
 * @property {string} [userAgent] The exact content of the HTTP user agent header. (maximum length 500)
 * @property {string} [authenticationIndicator] The 2-digit number indicating the type of authentication request. Possible values:
 *  - `02` Recurring
 *  - `03` Installment
 * @property {string} [installment] An integer value greater than 1 indicating the maximum number of permitted authorizations for installment payments. (maximum length 3)
 * @property {string} [purchaseDate] The 14-digit number (format: YYYYMMDDHHMMSS) indicating the date in UTC of original purchase.
 * @property {string} [recurringEnd] The 8-digit number (format: YYYYMMDD) indicating the date after which no further recurring authorizations should be performed.
 * @property {string} [recurringFrequency] Integer value indicating the minimum number of days between recurring authorizations. A frequency of monthly is indicated by the value 28. Multiple of 28 days will be used to indicate months (ex. 6 months = 168). (maximum length 3)
 */

/**
 * @name ThreeDSecure#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. The following events are available:
 *   * {@link ThreeDSecure#event:lookup-complete|lookup-complete}
 *   * {@link ThreeDSecure#event:customer-canceled|customer-canceled}
 *   * {@link ThreeDSecure#event:authentication-iframe-available|authentication-iframe-available}
 *   * {@link ThreeDSecure#event:authentication-modal-render|authentication-modal-render}
 *   * {@link ThreeDSecure#event:authentication-modal-close|authentication-modal-close}
 * @example
 * <caption>Listening to a 3D Secure event</caption>
 * braintree.threeDSecure.create({ ... }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('lookup-complete', function (data, next) {
 *     console.log('data from the lookup', data);
 *     next();
 *   });
 *   threeDSecureInstance.on('customer-canceled', function () {
 *     console.log('log that the customer canceled');
 *   });
 * });
 * @returns {void}
 */

/**
 * @name ThreeDSecure#off
 * @function
 * @param {string} event The name of the event to which you are unsubscribing.
 * @param {function} handler The callback for the event you are unsubscribing from.
 * @description Unsubscribes the handler function to a named event.
 * @example
 * <caption>Subscribing and then unsubscribing from a 3D Secure eld event</caption>
 * braintree.threeDSecure.create({ ... }, function (createErr, threeDSecureInstance) {
 *   var lookupCallback = function (data, next) {
 *     console.log(data);
 *     next();
 *   };
 *   var cancelCallback = function () {
 *     // log the cancelation
 *     // or update UI
 *   };
 *
 *   threeDSecureInstance.on('lookup-complete', lookupCallback);
 *   threeDSecureInstance.on('customer-canceled', cancelCallback);
 *
 *   // later on
 *   threeDSecureInstance.off('lookup-complete', lookupCallback);
 *   threeDSecureInstance.off('customer-canceled', cancelCallback);
 * });
 * @returns {void}
 */

/**
 * This event is emitted when the `2-inline-iframe` version is specified when creating the 3D Secure instance and the authentication iframe becomes available.
 * @event ThreeDSecure#authentication-iframe-available
 * @example
 * <caption>Listening for the authentication iframe to be available</caption>
 *   threeDSecureInstance.on('authentication-iframe-available', function (event, next) {
 *     document.body.appendChild(event.element); // add iframe element to page
 *
 *     next(); // let the SDK know the iframe is ready
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the initial lookup request completes. If this is not used, a `onLookupComplete` callback must be passed into the `verifyCard` method.
 * @event ThreeDSecure#lookup-complete
 * @example
 * <caption>Listening for when the lookup request is complete</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('lookup-complete', function (data, next) {
 *     // inspect the data
 *
 *     // call next when ready to proceed with the challenge
 *     next();
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the customer cancels the 3D Secure challenge.
 * @event ThreeDSecure#customer-canceled
 * @example
 * <caption>Listening for when the customer cancels the 3D Secure challenge</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('customer-canceled', function () {
 *     // the customer canceled the 3D Secure challenge
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the authentication modal closes, either because the authentication was completed or because the customer canceled the process.
 * @event ThreeDSecure#authentication-modal-close
 * @example
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('authentication-modal-close', function () {
 *     // the modal was closed
 *   });
 * });
 */

/**
 * This event is emitted when using the 3D Secure 2.0 flow and the authentication modal is rendered.
 * @event ThreeDSecure#authentication-modal-render
 * @example
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createErr, threeDSecureInstance) {
 *   threeDSecureInstance.on('authentication-modal-render', function () {
 *     // the modal was rendered, presenting the authentication form to the customer
 *   });
 * });
 */

/**
 * @class
 * @param {object} options 3D Secure {@link module:braintree-web/three-d-secure.create create} options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create} instead.</strong>
 * @classdesc This class represents a ThreeDSecure component produced by {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create}. Instances of this class have a method for launching a 3D Secure authentication flow.
 *
 * If you use the Braintree SDK from within an iframe, you must not use the `sandbox` attribute on your iframe or the 3D Secure modal will not function correctly.
 *
 * **Note**: 3D Secure 2.0 is documented below and will become the default integration method in a future version of Braintree-web. Until then, version 1.0 will continue to be supported. To view 3D Secure 1.0 documentation, look at Braintree-web documentation from version [3.40.0](https://braintree.github.io/braintree-web/3.40.0/ThreeDSecure.html) and earlier, or upgrade your integration by referring to the [3D Secure 2.0 adoption guide](https://developers.braintreepayments.com/guides/3d-secure/migration/javascript/v3).
 */
function ThreeDSecure(options) {
  var self = this;
  var Framework = FRAMEWORKS[options.framework];

  EventEmitter.call(this);

  this._framework = new Framework(options);
  this._framework.setUpEventListeners(function () {
    self._emit.apply(self, arguments);
  });
}

EventEmitter.createChild(ThreeDSecure);

/**
 * Launch the 3D Secure login flow, returning a nonce payload.
 *
 * @public
 * @param {object} options Options for card verification.
 * @param {string} options.nonce The nonce representing the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.nonce`.
 * @param {string} options.bin The numeric Bank Identification Number (bin) of the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.details.bin`.
 * @param {string} options.amount The amount of the transaction in the current merchant account's currency. This must be expressed in numbers with an optional decimal (using `.`) and precision up to the hundredths place. For example, if you're processing a transaction for 1.234,56 € then `amount` should be `1234.56`.
 * @param {string} [options.accountType] The account type for the card (if known). Accepted values: `credit` or `debit`.
 * @param {boolean} [options.challengeRequested] If set to true, an authentication challenge will be forced if possible.
 * @param {boolean} [options.exemptionRequested] If set to true, an exemption to the authentication challenge will be requested.
 * @param {function} [options.onLookupComplete] *Deprecated:* Use {@link ThreeDSecure#event:lookup-complete|`threeDSecureInstance.on('lookup-complete')`} instead. Function to execute when lookup completes. The first argument, `data`, is a {@link ThreeDSecure~verificationData|verificationData} object, and the second argument, `next`, is a callback. `next` must be called to continue.
 * @param {string} [options.email] The email used for verification. (maximum length 255)
 * @param {string} [options.mobilePhoneNumber] The mobile phone number used for verification. Only numbers; remove dashes, parenthesis and other characters. (maximum length 25)
 * @param {object} [options.billingAddress] An {@link ThreeDSecure~billingAddress|billingAddress} object for verification.
 * @param {object} [options.additionalInformation] An {@link ThreeDSecure~additionalInformation|additionalInformation} object for verification.
 * @param {object} [options.customer] **Deprecated** Customer information for use in 3DS 1.0 verifications. Can contain any subset of a {@link ThreeDSecure~verifyCardCustomerObject|verifyCardCustomerObject}. Only to be used for 3DS 1.0 integrations.
 * @param {callback} options.addFrame **Deprecated** This {@link ThreeDSecure~addFrameCallback|addFrameCallback} will be called when the bank frame needs to be added to your page. Only to be used for 3DS 1.0 integrations.
 * @param {callback} options.removeFrame **Deprecated** For use in 3DS 1.0 Flows. This {@link ThreeDSecure~removeFrameCallback|removeFrameCallback} will be called when the bank frame needs to be removed from your page. Only to be used in 3DS 1.0 integrations.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~verifyPayload|verifyPayload}.

 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * <caption>Verifying a payment method nonce with 3DS 2.0</caption>
 * var my3DSContainer;
 *
 * // set up listener after initialization
 * threeDSecure.on(('lookup-complete', function (data, next) {
 *   // use `data` here, then call `next()`
 *   next();
 * });
 *
 * // call verifyCard after tokenizing a card
 * threeDSecure.verifyCard({
 *   amount: '123.45',
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin,
 *   email: 'test@example.com'
 *   billingAddress: {
 *     givenName: 'Jill',
 *     surname: 'Doe',
 *     phoneNumber: '8101234567',
 *     streetAddress: '555 Smith St.',
 *     extendedAddress: '#5',
 *     locality: 'Oakland',
 *     region: 'CA',
 *     postalCode: '12345',
 *     countryCodeAlpha2: 'US'
 *   },
 *   additionalInformation: {
 *     workPhoneNumber: '5555555555',
 *     shippingGivenName: 'Jill',
 *     shippingSurname: 'Doe',
 *     shippingAddress: {
 *       streetAddress: '555 Smith st',
 *       extendedAddress: '#5',
 *       locality: 'Oakland',
 *       region: 'CA',
 *       postalCode: '12345',
 *       countryCodeAlpha2: 'US'
 *     }
 *     shippingPhone: '8101234567'
 *   }
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 * <caption>Verifying a payment method nonce with 3DS 2.0 with onLookupComplete callback</caption>
 * var my3DSContainer;
 *
 * threeDSecure.verifyCard({
 *   amount: '123.45',
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin,
 *   email: 'test@example.com'
 *   billingAddress: {
 *     givenName: 'Jill',
 *     surname: 'Doe',
 *     phoneNumber: '8101234567',
 *     streetAddress: '555 Smith St.',
 *     extendedAddress: '#5',
 *     locality: 'Oakland',
 *     region: 'CA',
 *     postalCode: '12345',
 *     countryCodeAlpha2: 'US'
 *   },
 *   additionalInformation: {
 *     workPhoneNumber: '5555555555',
 *     shippingGivenName: 'Jill',
 *     shippingSurname: 'Doe',
 *     shippingAddress: {
 *       streetAddress: '555 Smith st',
 *       extendedAddress: '#5',
 *       locality: 'Oakland',
 *       region: 'CA',
 *       postalCode: '12345',
 *       countryCodeAlpha2: 'US'
 *     }
 *     shippingPhone: '8101234567'
 *   },
 *   onLookupComplete: function (data, next) {
 *     // use `data` here, then call `next()`
 *     next();
 *   }
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 * @example
 * <caption>Handling 3DS lookup errors</caption>
 * var my3DSContainer;
 *
 * // set up listener after initialization
 * threeDSecure.on(('lookup-complete', function (data, next) {
 *   // use `data` here, then call `next()`
 *   next();
 * });
 *
 * // call verifyCard after tokenizing a card
 * threeDSecure.verifyCard({
 *   amount: '123.45',
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin,
 *   email: 'test@example.com',
 *   billingAddress: billingAddressFromCustomer,
 *   additionalInformation: additionalInfoFromCustomer
 * }, function (err, payload) {
 *   if (err) {
 *     if (err.code.indexOf('THREEDS_LOOKUP') === 0) {
 *       // an error occurred during the initial lookup request
 *
 *       if (err.code === 'THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR') {
 *         // either the passed payment method nonce does not exist
 *         // or it was already consumed before the lookup call was made
 *       } else if (err.code.indexOf('THREEDS_LOOKUP_VALIDATION') === 0) {
 *         // a validation error occurred
 *         // likely some non-ascii characters were included in the billing
 *         // address given name or surname fields, or the cardholdername field
 *
 *         // Instruct your user to check their data and try again
 *       } else {
 *         // an unknown lookup error occurred
 *       }
 *     } else {
 *       // some other kind of error
 *     }
 *     return;
 *   }
 *
 *   // handle success
 * });
 * @example
 * <caption>Deprecated: Verifying an existing nonce with 3DS 1.0</caption>
 * var my3DSContainer;
 *
 * threeDSecure.verifyCard({
 *   nonce: existingNonce,
 *   amount: 123.45,
 *   addFrame: function (err, iframe) {
 *     // Set up your UI and add the iframe.
 *     my3DSContainer = document.createElement('div');
 *     my3DSContainer.appendChild(iframe);
 *     document.body.appendChild(my3DSContainer);
 *   },
 *   removeFrame: function () {
 *     // Remove UI that you added in addFrame.
 *     document.body.removeChild(my3DSContainer);
 *   }
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 */
ThreeDSecure.prototype.verifyCard = function (options) {
  var privateOptions;

  if (this.hasListener('lookup-complete')) {
    privateOptions = {
      ignoreOnLookupCompleteRequirement: true
    };
  }

  return this._framework.verifyCard(options, privateOptions);
};

/* eslint-disable-next-line valid-jsdoc */
/**
 * Launch the iframe challenge using a 3D Secure lookup response from a server side lookup.
 *
 * @public
 * @param {(object|string)} lookupResponse The lookup response from the server side call to lookup the 3D Secure information. The raw string or a parsed object can be passed.
 * @returns {Promise} Returns a promise.
 * @example
 * var my3DSContainer;
 *
 * threeDSecure.initializeChallengeWithLookupResponse(lookupResponseFromServer).then(function (payload) {
 *   if (payload.liabilityShifted) {
 *     // Liability has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liability may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liability has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 */
ThreeDSecure.prototype.initializeChallengeWithLookupResponse = function (lookupResponse) {
  if (typeof lookupResponse === 'string') {
    lookupResponse = JSON.parse(lookupResponse);
  }

  return this._framework.initializeChallengeWithLookupResponse(lookupResponse);
};

/**
 * Gather the data needed for a 3D Secure lookup call.
 *
 * @public
 * @param {object} options Options for 3D Secure lookup.
 * @param {string} options.nonce The nonce representing the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.nonce`.
 * @param {string} [options.bin] The numeric Bank Identification Number (bin) of the card from a tokenization payload. For example, this can be a {@link HostedFields~tokenizePayload|tokenizePayload} returned by Hosted Fields under `payload.details.bin`. Though not required to start the verification, it is required to receive a 3DS 2.0 lookup response.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~prepareLookupPayload|prepareLookupPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~prepareLookupPayload|prepareLookupPayload}.

 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * <caption>Preparing data for a 3D Secure lookup</caption>
 * threeDSecure.prepareLookup({
 *   nonce: hostedFieldsTokenizationPayload.nonce,
 *   bin: hostedFieldsTokenizationPayload.details.bin
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   // send payload to server to do server side lookup
 * });
 */
ThreeDSecure.prototype.prepareLookup = function (options) {
  return this._framework.prepareLookup(options).then(function (data) {
    return JSON.stringify(data);
  });
};

/**
 * Cancel the 3DS flow and return the verification payload if available. If using 3D Secure version 2, this will not close the UI of the authentication modal. It is recommended that this method only be used in the {@link ThreeDSecure#event:lookup-complete|`lookup-complete`} event or the `onLookupComplete` callback.
 * @public
 * @param {callback} [callback] The second argument is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If there is no verifyPayload (the initial lookup did not complete), an error will be returned. If no callback is passed, `cancelVerifyCard` will return a promise.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example <caption>Cancel the verification in `lookup-complete` event</caption>
 * // set up listener after instantiation
 * threeDSecure.on('lookup-complete', function (data, next) {
 *   // determine if you want to call next to start the challenge,
 *   // if not, call cancelVerifyCard
 *   threeDSecure.cancelVerifyCard(function (err, verifyPayload) {
 *     if (err) {
 *       // Handle error
 *       console.log(err.message); // No verification payload available
 *       return;
 *     }
 *
 *     verifyPayload.nonce; // The nonce returned from the 3ds lookup call
 *     verifyPayload.liabilityShifted; // boolean
 *     verifyPayload.liabilityShiftPossible; // boolean
 *   });
 * });
 *
 * // after tokenizing a credit card
 * threeDSecure.verifyCard({
 *   amount: '100.00',
 *   nonce: nonceFromTokenizationPayload,
 *   bin: binFromTokenizationPayload
 *   // other fields such as billing address
 * }, function (verifyError, payload) {
 *   if (verifyError) {
 *     if (verifyError.code === 'THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT ') {
 *       // flow was canceled by merchant, 3ds info can be found in the payload
 *       // for cancelVerifyCard
 *     }
 *   }
 * });
 * @example <caption>Cancel the verification in onLookupComplete callback</caption>
 * threeDSecure.verifyCard({
 *   amount: '100.00',
 *   nonce: nonceFromTokenizationPayload,
 *   bin: binFromTokenizationPayload,
 *   // other fields such as billing address
 *   onLookupComplete: function (data, next) {
 *     // determine if you want to call next to start the challenge,
 *     // if not, call cancelVerifyCard
 *     threeDSecure.cancelVerifyCard(function (err, verifyPayload) {
 *       if (err) {
 *         // Handle error
 *         console.log(err.message); // No verification payload available
 *         return;
 *       }
 *
 *       verifyPayload.nonce; // The nonce returned from the 3ds lookup call
 *       verifyPayload.liabilityShifted; // boolean
 *       verifyPayload.liabilityShiftPossible; // boolean
 *     });
 *   }
 * }, function (verifyError, payload) {
 *   if (verifyError) {
 *     if (verifyError.code === 'THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT ') {
 *       // flow was canceled by merchant, 3ds info can be found in the payload
 *       // for cancelVerifyCard
 *     }
 *   }
 * });
 * @example <caption>Cancel the verification in 3D Secure version 1</caption>
 * // unlike with v2, this will not cause `verifyCard` to error, it will simply
 * // never call the callback
 * threeDSecure.cancelVerifyCard(function (err, verifyPayload) {
 *   if (err) {
 *     // Handle error
 *     console.log(err.message); // No verification payload available
 *     return;
 *   }
 *
 *   verifyPayload.nonce; // The nonce returned from the 3ds lookup call
 *   verifyPayload.liabilityShifted; // boolean
 *   verifyPayload.liabilityShiftPossible; // boolean
 * });
 */
ThreeDSecure.prototype.cancelVerifyCard = function () {
  return this._framework.cancelVerifyCard();
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/three-d-secure.create|create}.
 * @public
 * @param {callback} [callback] Called on completion. If no callback is passed, `teardown` will return a promise.
 * @example
 * threeDSecure.teardown();
 * @example <caption>With callback</caption>
 * threeDSecure.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
ThreeDSecure.prototype.teardown = function () {
  var methodNames = methods(ThreeDSecure.prototype).concat(methods(EventEmitter.prototype));

  convertMethodsToError(this, methodNames);

  return this._framework.teardown();
};

module.exports = wrapPromise.wrapPrototype(ThreeDSecure);

},{"../../lib/convert-methods-to-error":100,"../../lib/methods":128,"./frameworks":142,"@braintree/event-emitter":40,"@braintree/wrap-promise":50}],147:[function(require,module,exports){
'use strict';
/** @module braintree-web/three-d-secure */

var ThreeDSecure = require('./external/three-d-secure');
var isHTTPS = require('../lib/is-https').isHTTPS;
var basicComponentVerification = require('../lib/basic-component-verification');
var createDeferredClient = require('../lib/create-deferred-client');
var createAssetsUrl = require('../lib/create-assets-url');
var BraintreeError = require('../lib/braintree-error');
var analytics = require('../lib/analytics');
var errors = require('./shared/errors');
var VERSION = "3.78.2";
var Promise = require('../lib/promise');
var wrapPromise = require('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {object} [options.cardinalSDKConfig] A config for the underlying Cardinal SDK.
 * @param {object} [options.cardinalSDKConfig.logging] The logging configuration for the Cardinal SDK. See [Cardinal's documentation for the logging object](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-Logging) for more information.
 * @param {number} [options.cardinalSDKConfig.timeout] The time in milliseconds to wait before a request to Cardinal's API times out. See [Cardinal's documentation for root level configuration](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-RootLevelConfiguration) for more information.
 * @param {number} [options.cardinalSDKConfig.maxRequestRetries] How many times a request should be re-attempted to Cardinal's API before giving up as a failure. See [Cardinal's documentation for root level configuration](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-RootLevelConfiguration) for more information.
 * @param {object} [options.cardinalSDKConfig.payment] An object to describe how you want the user interactions to behave. Only a subset of the [Cardinal SDK payment configuration object](https://cardinaldocs.atlassian.net/wiki/spaces/CC/pages/1409568/Configurations#Configurations-Payment) are supported: `displayLoading` and `displayExitButton`.
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {(number|string)} [options.version=1] The version of 3D Secure to use. Possible options:
 * * 1 - The legacy 3D Secure v1.0 integration.
 * * 2 - A 3D Secure v2.0 integration that uses a modal to host the 3D Secure iframe.
 * * 2-bootstrap3-modal - A 3D Secure v2.0 integration that uses a modal styled with Bootstrap 3 styles to host the 3D Secure iframe. Requires having the Bootstrap 3 script files and stylesheets on your page.
 * * 2-inline-iframe - A 3D Secure v2.0 integration that provides the authentication iframe directly to the merchant.
 * @param {callback} [callback] The second argument, `data`, is the {@link ThreeDSecure} instance. If no callback is provided, it returns a promise that resolves the {@link ThreeDSecure} instance.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
@example
 * <caption>Creating a v2 3D Secure component using 2 version (Cardinal modal)</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2'
 * }, function (createError, threeDSecure) {
 *   // set up lookup-complete listener
 *   threeDSecure.on('lookup-complete', function (data, next) {
 *     // check lookup data
 *
 *     next();
 *   });
 *
 *   // using Hosted Fields, use `tokenize` to get back a credit card nonce
 *
 *   threeDSecure.verifyCard({
 *     nonce: nonceFromTokenizationPayload,,
 *     bin: binFromTokenizationPayload,
 *     amount: '100.00'
 *   }, function (verifyError, payload) {
 *     // inspect payload
 *     // send payload.nonce to your server
 *   });
 * });
 * @example
 * <caption>Creating a v2 3D Secure component using 2-bootstrap3-modal version</caption>
 * // must have the boostrap js, css and jquery files on your page
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2-bootstrap3-modal'
 * }, function (createError, threeDSecure) {
 *   // set up lookup-complete listener
 *   threeDSecure.on('lookup-complete', function (data, next) {
 *     // check lookup data
 *
 *     next();
 *   });
 *
 *   // using Hosted Fields, use `tokenize` to get back a credit card nonce
 *
 *   // challenge will be presented in a bootstrap 3 modal
 *   threeDSecure.verifyCard({
 *     nonce: nonceFromTokenizationPayload,
 *     bin: binFromTokenizationPayload,
 *     amount: '100.00'
 *   }, function (verifyError, payload) {
 *     // inspect payload
 *     // send payload.nonce to your server
 *   });
 * });
 * @example
 * <caption>Creating a v2 3D Secure component using 2-inline-iframe version</caption>
 * braintree.threeDSecure.create({
 *   client: clientInstance,
 *   version: '2-inline-iframe'
 * }, function (createError, threeDSecure) {
 *   // set up lookup-complete listener
 *   threeDSecure.on('lookup-complete', function (data, next) {
 *     // check lookup data
 *
 *     next();
 *   });
 *   // set up iframe listener
 *   threeDSecure.on('authentication-iframe-available', function (event, next) {
 *     var element = event.element; // an html element that contains the iframe
 *
 *     document.body.appendChild(element); // put it on your page
 *
 *     next(); // let the sdk know the element has been added to the page
 *   });
 *
 *   // using Hosted Fields, use `tokenize` to get back a credit card nonce
 *
 *   threeDSecure.verifyCard({
 *     nonce: nonceFromTokenizationPayload,,
 *     bin: binFromTokenizationPayload,
 *     amount: '100.00'
 *   }, function (verifyError, payload) {
 *     // inspect payload
 *     // send payload.nonce to your server
 *   });
 * });
 */
function create(options) {
  var name = '3D Secure';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    var assetsUrl = createAssetsUrl.create(options.authorization);
    var framework = getFramework(options);
    var createPromise = createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: assetsUrl,
      name: name
    }).then(function (client) {
      var error, isProduction;
      var config = client.getConfiguration();
      var gwConfig = config.gatewayConfiguration;

      options.client = client;

      if (!gwConfig.threeDSecureEnabled) {
        error = errors.THREEDS_NOT_ENABLED;
      }

      if (config.authorizationType === 'TOKENIZATION_KEY') {
        error = errors.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY;
      }

      isProduction = gwConfig.environment === 'production';

      if (isProduction && !isHTTPS()) {
        error = errors.THREEDS_HTTPS_REQUIRED;
      }

      if (framework !== 'legacy' && !(gwConfig.threeDSecure && gwConfig.threeDSecure.cardinalAuthenticationJWT)) {
        analytics.sendEvent(options.client, 'three-d-secure.initialization.failed.missing-cardinalAuthenticationJWT');
        error = errors.THREEDS_NOT_ENABLED_FOR_V2;
      }

      if (error) {
        return Promise.reject(new BraintreeError(error));
      }

      analytics.sendEvent(options.client, 'three-d-secure.initialized');

      return client;
    });
    var instance = new ThreeDSecure({
      client: options.client,
      assetsUrl: assetsUrl,
      createPromise: createPromise,
      loggingEnabled: options.loggingEnabled,
      cardinalSDKConfig: options.cardinalSDKConfig,
      framework: framework
    });

    if (options.client) {
      return createPromise.then(function () {
        return instance;
      });
    }

    return instance;
  });
}

function getFramework(options) {
  var version = String(options.version || '');

  if (!version || version === '1') {
    return 'legacy';
  }

  switch (version) {
    case '2':
    case '2-cardinal-modal':
      return 'cardinal-modal';
    case '2-bootstrap3-modal':
      return 'bootstrap3-modal';
    case '2-inline-iframe':
      return 'inline-iframe';
    default:
      throw new BraintreeError({
        code: errors.THREEDS_UNRECOGNIZED_VERSION.code,
        type: errors.THREEDS_UNRECOGNIZED_VERSION.type,
        message: 'Version `' + options.version + '` is not a recognized version. You may need to update the version of your Braintree SDK to support this version.'
      });
  }
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":93,"../lib/basic-component-verification":96,"../lib/braintree-error":98,"../lib/create-assets-url":102,"../lib/create-deferred-client":104,"../lib/is-https":125,"../lib/promise":130,"./external/three-d-secure":146,"./shared/errors":149,"@braintree/wrap-promise":50}],148:[function(require,module,exports){
'use strict';

module.exports = {
  LANDING_FRAME_NAME: 'braintreethreedsecurelanding',
  CARDINAL_SCRIPT_SOURCE: {
    production: 'https://songbird.cardinalcommerce.com/edge/v1/songbird.js',
    sandbox: 'https://songbirdstag.cardinalcommerce.com/edge/v1/songbird.js'
  }
};

},{}],149:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.3D Secure - Creation Error Codes
 * @description Errors that occur when [creating the 3D Secure component](./module-braintree-web_three-d-secure.html#.create).
 * @property {MERCHANT} THREEDS_NOT_ENABLED Occurs when 3D Secure is not enabled in the Braintree control panel.
 * @property {MERCHANT} THREEDS_CAN_NOT_USE_TOKENIZATION_KEY Occurs when 3D Secure component is created without a Client Token.
 * @property {MERCHANT} THREEDS_HTTPS_REQUIRED Occurs when 3D Secure component is created in production over HTTPS.
 * @property {MERCHANT} THREEDS_NOT_ENABLED_FOR_V2 Occurs when 3D Secure component is created with version 2 parameter, but merchant is not enabled to use version 2.
 * @property {MERCHANT} THREEDS_UNRECOGNIZED_VERSION Occurs when unrecognized version enum is passed into the create call.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_SETUP_FAILED Occurs when Cardinal's Songbird.js library fails to setup for an unknown reason.
 * @property {NETWORK} THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED Occurs when using version 2 and Cardinal's Songbird.js script could not be loaded.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT Occurs when Cardinal's Songbird.js library takes longer than 60 seconds to set up.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT Occurs when Cardinal sends a response indicating a timeout on /Validate, /Confirm, or /Continue.
 * @property {MERCHANT} THREEDS_CARDINAL_SDK_BAD_CONFIG Occurs when there is no JWT in the request. Also when there's some other malformed aspect of config.
 * @property {MERCHANT} THREEDS_CARDINAL_SDK_BAD_JWT Occurs when a malformed config causes a either a missing response JWT or a malformed Cardinal response.
 * @property {UNKNOWN} THREEDS_CARDINAL_SDK_ERROR Occurs when a "general error" or a Cardinal hosted fields error happens. Description contains more details.
 * @property {CUSTOMER} THREEDS_CARDINAL_SDK_CANCELED Occurs when customer cancels the transaction mid-flow, usually with alt-pays that have their own cancel buttons.
*/

/**
 * @name BraintreeError.3D Secure - verifyCard Error Codes
 * @description Errors that occur when using the [`verifyCard` method](./ThreeDSecure.html#verifyCard).
 * @property {MERCHANT} THREEDS_AUTHENTICATION_IN_PROGRESS Occurs when another verification is already in progress.
 * @property {MERCHANT} THREEDS_MISSING_VERIFY_CARD_OPTION Occurs when a required option is missing.
 * @property {UNKNOWN} THREEDS_JWT_AUTHENTICATION_FAILED Occurs when something went wrong authenticating the JWT from the Cardinal SDK.
 * @property {MERCHANT} THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR Occurs when the supplied payment method nonce does not exist or the payment method nonce has already been consumed.
 * @property {CUSTOMER} THREEDS_LOOKUP_VALIDATION_ERROR Occurs when a validation error occurs during the 3D Secure lookup.
 * @property {UNKNOWN} THREEDS_LOOKUP_ERROR An unknown error occurred while attempting the 3D Secure lookup.
 * @property {MERCHANT} THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT Occurs when the 3D Secure flow is canceled by the merchant using `cancelVerifyCard` (3D Secure v2 flows only).
 * @property {UNKNOWN} THREEDS_INLINE_IFRAME_DETAILS_INCORRECT An unknown error occurred while attempting to use the inline iframe framework.
 */

/**
 * @name BraintreeError.3D Secure - cancelVerifyCard Error Codes
 * @description Errors that occur when using the [`cancelVerifyCard` method](./ThreeDSecure.html#cancelVerifyCard).
 * @property {MERCHANT} THREEDS_NO_VERIFICATION_PAYLOAD Occurs when the 3D Secure flow is canceled, but there is no 3D Secure information available.
 */

/**
 * @name BraintreeError.3D Secure - Internal Error Codes
 * @ignore
 * @description Errors that occur internally
 * @property {INTERNAL} THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN Occurs when iframe is initialized on a non-verified domain.
 * @property {INTERNAL} THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED Occurs when a 3D Secure framework method is not implemented.
 */

var BraintreeError = require('../../lib/braintree-error');

module.exports = {
  THREEDS_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NOT_ENABLED',
    message: '3D Secure is not enabled for this merchant.'
  },
  THREEDS_CAN_NOT_USE_TOKENIZATION_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_CAN_NOT_USE_TOKENIZATION_KEY',
    message: '3D Secure can not use a tokenization key for authorization.'
  },
  THREEDS_HTTPS_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_HTTPS_REQUIRED',
    message: '3D Secure requires HTTPS.'
  },
  THREEDS_NOT_ENABLED_FOR_V2: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NOT_ENABLED_FOR_V2',
    message: '3D Secure version 2 is not enabled for this merchant. Contact Braintree Support for assistance at https://help.braintreepayments.com/'
  },
  THREEDS_UNRECOGNIZED_VERSION: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_UNRECOGNIZED_VERSION'
  },
  THREEDS_CARDINAL_SDK_SETUP_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_SETUP_FAILED',
    message: 'Something went wrong setting up Cardinal\'s Songbird.js library.'
  },
  THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED',
    message: 'Cardinal\'s Songbird.js library could not be loaded.'
  },
  THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT',
    message: 'Cardinal\'s Songbird.js took too long to setup.'
  },
  THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT',
    message: 'Cardinal\'s API took too long to respond.'
  },
  THREEDS_CARDINAL_SDK_BAD_CONFIG: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_CARDINAL_SDK_BAD_CONFIG',
    message: 'JWT or other required field missing. Please check your setup configuration.'
  },
  THREEDS_CARDINAL_SDK_BAD_JWT: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_CARDINAL_SDK_BAD_JWT',
    message: 'Cardinal JWT missing or malformed. Please check your setup configuration.'
  },
  THREEDS_CARDINAL_SDK_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_CARDINAL_SDK_ERROR',
    message: 'A general error has occurred with Cardinal. See description for more information.'
  },
  THREEDS_CARDINAL_SDK_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'THREEDS_CARDINAL_SDK_CANCELED',
    message: 'Canceled by user.'
  },
  THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT',
    message: '3D Secure verfication canceled by merchant.'
  },
  THREEDS_AUTHENTICATION_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_AUTHENTICATION_IN_PROGRESS',
    message: 'Cannot call verifyCard while existing authentication is in progress.'
  },
  THREEDS_MISSING_VERIFY_CARD_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_MISSING_VERIFY_CARD_OPTION'
  },
  THREEDS_JWT_AUTHENTICATION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_JWT_AUTHENTICATION_FAILED',
    message: 'Something went wrong authenticating the JWT from Cardinal'
  },
  THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR',
    message: 'Either the payment method nonce passed to `verifyCard` does not exist, or it was already consumed'
  },
  THREEDS_LOOKUP_VALIDATION_ERROR: {
    type: BraintreeError.types.CUSTOMER,
    code: 'THREEDS_LOOKUP_VALIDATION_ERROR',
    message: 'The data passed in `verifyCard` did not pass validation checks. See details for more info'
  },
  THREEDS_LOOKUP_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_LOOKUP_ERROR',
    message: 'Something went wrong during the 3D Secure lookup'
  },
  THREEDS_INLINE_IFRAME_DETAILS_INCORRECT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'THREEDS_INLINE_IFRAME_DETAILS_INCORRECT',
    message: 'Something went wrong when attempting to add the authentication iframe to the page.'
  },
  THREEDS_NO_VERIFICATION_PAYLOAD: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NO_VERIFICATION_PAYLOAD',
    message: 'No verification payload available.'
  },
  THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
    type: BraintreeError.types.INTERNAL,
    code: 'THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN',
    message: 'Term Url must be on a Braintree domain.'
  },
  THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED: {
    type: BraintreeError.types.INTERNAL,
    code: 'THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED',
    message: 'Method not implemented for this framework.'
  }
};

},{"../../lib/braintree-error":98}],150:[function(require,module,exports){
'use strict';

var enumerate = require('../../lib/enumerate');

module.exports = enumerate([
  'AUTHENTICATION_COMPLETE'
], 'threedsecure:');

},{"../../lib/enumerate":107}],151:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Vault Manager - deletePaymentMethod Error Codes
 * @description Errors that occur when using the [`deletePaymentMethod` method](./VaultManager.html#deletePaymentMethod).
 * @property {MERCHANT} VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN Occurs when vault manager is initialized with a tokenization key instead of a Client Token.
 * @property {MERCHANT} VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND Occurs when the specified payment method can not be found.
 * @property {UNKNOWN} VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR Occurs when there is an error attempting to delete the payment method.
 */

var BraintreeError = require('../lib/braintree-error');

module.exports = {
  VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN: {
    type: BraintreeError.types.MERCHANT,
    code: 'VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN',
    message: 'A client token with a customer id must be used to delete a payment method nonce.'
  },
  VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND: {
    type: BraintreeError.types.MERCHANT,
    code: 'VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND'
  },
  VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR'
  }
};

},{"../lib/braintree-error":98}],152:[function(require,module,exports){
'use strict';
/**
 * @module braintree-web/vault-manager
 * @description Manages customer's payment methods.
 */

var basicComponentVerification = require('../lib/basic-component-verification');
var createDeferredClient = require('../lib/create-deferred-client');
var createAssetsUrl = require('../lib/create-assets-url');
var VaultManager = require('./vault-manager');
var VERSION = "3.78.2";
var wrapPromise = require('@braintree/wrap-promise');

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {callback} callback The second argument, `data`, is the {@link VaultManager} instance.
 * @returns {void}
 */
function create(options) {
  var name = 'Vault Manager';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    return new VaultManager({
      createPromise: createDeferredClient.create({
        authorization: options.authorization,
        client: options.client,
        debug: options.debug,
        assetsUrl: createAssetsUrl.create(options.authorization),
        name: name
      })
    });
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/basic-component-verification":96,"../lib/create-assets-url":102,"../lib/create-deferred-client":104,"./vault-manager":153,"@braintree/wrap-promise":50}],153:[function(require,module,exports){
'use strict';

var analytics = require('../lib/analytics');
var BraintreeError = require('../lib/braintree-error');
var errors = require('./errors');
var convertMethodsToError = require('../lib/convert-methods-to-error');
var methods = require('../lib/methods');
var Promise = require('../lib/promise');
var wrapPromise = require('@braintree/wrap-promise');

var DELETE_PAYMENT_METHOD_MUTATION = 'mutation DeletePaymentMethodFromSingleUseToken($input: DeletePaymentMethodFromSingleUseTokenInput!) {' +
'  deletePaymentMethodFromSingleUseToken(input: $input) {' +
'    clientMutationId' +
'  }' +
'}';

/**
 * @typedef {array} VaultManager~fetchPaymentMethodsPayload The customer's payment methods.
 * @property {object} paymentMethod The payment method object.
 * @property {string} paymentMethod.nonce A nonce that can be sent to your server to transact on the payment method.
 * @property {boolean} paymentMethod.default Whether or not this is the default payment method for the customer.
 * @property {object} paymentMethod.details Any additional details about the payment method. Varies depending on the type of payment method.
 * @property {string} paymentMethod.type A constant indicating the type of payment method.
 * @property {?string} paymentMethod.description Additional description about the payment method.
 * @property {?object} paymentMethod.binData Bin data about the payment method.
 *
 */

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/vault-manager.create|braintree.vault-manager.create} instead.</strong>
 * @classdesc This class allows you to manage a customer's payment methods on the client.
 */
function VaultManager(options) {
  this._createPromise = options.createPromise;
}

/**
 * Fetches payment methods owned by the customer whose id was used to generate the client token used to create the {@link module:braintree-web/client|client}.
 * @public
 * @param {object} [options] Options for fetching payment methods.
 * @param {boolean} [options.defaultFirst = false] If `true`, the payment methods will be returned with the default payment method for the customer first. Otherwise, the payment methods will be returned with the most recently used payment method first.
 * @param {callback} [callback] The second argument is a {@link VaultManager~fetchPaymentMethodsPayload|fetchPaymentMethodsPayload}. This is also what is resolved by the promise if no callback is provided.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * vaultManagerInstance.fetchPaymentMethods(function (err, paymentMethods) {
 *   paymentMethods.forEach(function (paymentMethod) {
 *     // add payment method to UI
 *     // paymentMethod.nonce <- transactable nonce associated with payment method
 *     // paymentMethod.details <- object with additional information about payment method
 *     // paymentMethod.type <- a constant signifying the type
 *   });
 * });
 */
VaultManager.prototype.fetchPaymentMethods = function (options) {
  var defaultFirst;

  options = options || {};

  defaultFirst = options.defaultFirst === true ? 1 : 0;

  return this._createPromise.then(function (client) {
    return client.request({
      endpoint: 'payment_methods',
      method: 'get',
      data: {
        defaultFirst: defaultFirst
      }
    });
  }).then(function (paymentMethodsPayload) {
    analytics.sendEvent(this._createPromise, 'vault-manager.fetch-payment-methods.succeeded');

    return paymentMethodsPayload.paymentMethods.map(formatPaymentMethodPayload);
  }.bind(this));
};

// TODO hide from jsdoc for now until the GraphQL API is on for all merchants by default
/**
 * Deletes a payment method owned by the customer whose id was used to generate the client token used to create the {@link module:braintree-web/client|client}.
 * @public
 * @ignore
 * @param {string} paymentMethodNonce The payment method nonce that references a vaulted payment method.
 * @param {callback} [callback] No data is returned if the operation is successful.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * vaultManagerInstance.deletePaymentMethod('nonce-to-delete', function (err) {
 *   // handle err if it exists
 * });
 */
VaultManager.prototype.deletePaymentMethod = function (paymentMethodNonce) {
  return this._createPromise.then(function (client) {
    var usesClientToken = client.getConfiguration().authorizationType === 'CLIENT_TOKEN';

    if (!usesClientToken) {
      return Promise.reject(new BraintreeError(errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN));
    }

    return client.request({
      api: 'graphQLApi',
      data: {
        query: DELETE_PAYMENT_METHOD_MUTATION,
        variables: {
          input: {
            singleUseTokenId: paymentMethodNonce
          }
        },
        operationName: 'DeletePaymentMethodFromSingleUseToken'
      }
    }).then(function () {
      analytics.sendEvent(client, 'vault-manager.delete-payment-method.succeeded');

      // noop to prevent sending back the raw graphql data
    }).catch(function (error) {
      var originalError = error.details.originalError;
      var formattedError;

      analytics.sendEvent(client, 'vault-manager.delete-payment-method.failed');

      if (originalError[0] && originalError[0].extensions.errorClass === 'NOT_FOUND') {
        formattedError = new BraintreeError({
          type: errors.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.type,
          code: errors.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.code,
          message: 'A payment method for payment method nonce `' + paymentMethodNonce + '` could not be found.',
          details: {
            originalError: originalError
          }
        });
      }

      if (!formattedError) {
        formattedError = new BraintreeError({
          type: errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.type,
          code: errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.code,
          message: 'An unknown error occured when attempting to delete the payment method assocaited with the payment method nonce `' + paymentMethodNonce + '`.',
          details: {
            originalError: originalError
          }
        });
      }

      return Promise.reject(formattedError);
    });
  });
};

function formatPaymentMethodPayload(paymentMethod) {
  var formattedPaymentMethod = {
    nonce: paymentMethod.nonce,
    'default': paymentMethod.default,
    details: paymentMethod.details,
    hasSubscription: paymentMethod.hasSubscription,
    type: paymentMethod.type
  };

  if (paymentMethod.description) {
    formattedPaymentMethod.description = paymentMethod.description;
  }

  if (paymentMethod.binData) {
    formattedPaymentMethod.binData = paymentMethod.binData;
  }

  return formattedPaymentMethod;
}

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/vault-manager.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * vaultManagerInstance.teardown();
 * @example <caption>With callback</caption>
 * vaultManagerInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
VaultManager.prototype.teardown = function () {
  convertMethodsToError(this, methods(VaultManager.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(VaultManager);

},{"../lib/analytics":93,"../lib/braintree-error":98,"../lib/convert-methods-to-error":100,"../lib/methods":128,"../lib/promise":130,"./errors":151,"@braintree/wrap-promise":50}],154:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var venmo_desktop_1 = __importDefault(require("./venmo-desktop"));
module.exports = function createVenmoDesktop(options) {
    var instance = new venmo_desktop_1.default(options);
    return instance.initialize();
};

},{"./venmo-desktop":156}],155:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENMO_PAYMENT_CONTEXT_STATUS_QUERY = exports.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY = exports.UPDATE_PAYMENT_CONTEXT_QUERY = exports.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY = exports.CREATE_PAYMENT_CONTEXT_QUERY = exports.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY = void 0;
exports.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY = "mutation CreateVenmoQRCodePaymentContext($input: CreateVenmoQRCodePaymentContextInput!) {\n  createVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n    venmoQRCodePaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}";
exports.CREATE_PAYMENT_CONTEXT_QUERY = "mutation CreateVenmoPaymentContext($input: CreateVenmoPaymentContextInput!) {\n  createVenmoPaymentContext(input: $input) {\n    clientMutationId\n    venmoPaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}";
exports.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY = "mutation UpdateVenmoQRCodePaymentContext($input: UpdateVenmoQRCodePaymentContextInput!) {\n  updateVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n  }\n}";
exports.UPDATE_PAYMENT_CONTEXT_QUERY = "mutation UpdateVenmoPaymentContextStatus($input: UpdateVenmoPaymentContextStatusInput!) {\n  updateVenmoPaymentContextStatus(input: $input) {\n    clientMutationId\n  }\n}";
exports.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY = "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoQRCodePaymentContext {\n      status\n      paymentMethodId\n      userName\n    }\n  }\n}";
exports.VENMO_PAYMENT_CONTEXT_STATUS_QUERY = "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoPaymentContext {\n      status\n      paymentMethodId\n      userName\n    }\n  }\n}";

},{}],156:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var framebus_1 = __importDefault(require("framebus"));
var iframer_1 = __importDefault(require("@braintree/iframer"));
var uuid_1 = __importDefault(require("@braintree/uuid"));
var events_1 = require("../shared/events");
var queries_1 = require("./queries");
var VENMO_DESKTOP_POLLING_INTERVAL = 1000; // 1 second
var VISUAL_DELAY_BEFORE_SIGNALLING_COMPLETION = 2000; // 2 seconds
var VenmoDesktop = /** @class */ (function () {
    function VenmoDesktop(options) {
        this.isHidden = true;
        this.env = options.environment;
        this.id = uuid_1.default();
        this.profileId = options.profileId;
        this.displayName = options.displayName;
        this.paymentMethodUsage = options.paymentMethodUsage;
        this.shouldUseLegacyQRCodeMutation = !this.paymentMethodUsage;
        var frameUrl = options.url + "#" + this.env + "_" + this.id;
        this.bus = new framebus_1.default({
            channel: this.id,
            verifyDomain: options.verifyDomain,
        });
        this.apiRequest = options.apiRequest;
        this.sendEvent = options.sendEvent;
        this.Promise = options.Promise;
        this.alertBox = document.createElement("div");
        this.alertBox.setAttribute("data-venmo-desktop-id", this.id);
        this.alertBox.setAttribute("role", "alert");
        this.alertBox.style.position = "fixed";
        this.alertBox.style.display = "none";
        this.alertBox.style.height = "1px";
        this.alertBox.style.width = "1px";
        this.alertBox.style.overflow = "hidden";
        this.alertBox.style.zIndex = "0";
        this.iframe = iframer_1.default({
            src: frameUrl,
            name: "venmo-desktop-iframe",
            style: {
                display: "none",
                position: "fixed",
                top: "0",
                bottom: "0",
                right: "0",
                left: "0",
                height: "100%",
                width: "100%",
                zIndex: "9999999",
            },
            title: "Venmo Desktop",
        });
    }
    VenmoDesktop.prototype.initialize = function () {
        var _this = this;
        return new this.Promise(function (resolve) {
            _this.bus.on(events_1.VENMO_DESKTOP_IFRAME_READY, function () {
                resolve(_this);
            });
            _this.bus.on(events_1.VENMO_DESKTOP_REQUEST_NEW_QR_CODE, function () {
                _this.sendEvent("venmo.tokenize.desktop.restarted-from-error-view");
                _this.startPolling();
            });
            document.body.appendChild(_this.iframe);
            document.body.appendChild(_this.alertBox);
        });
    };
    VenmoDesktop.prototype.launchDesktopFlow = function () {
        var _this = this;
        this.isHidden = false;
        var promise = new this.Promise(function (resolve, reject) {
            _this.launchDesktopPromiseRejectFunction = reject;
            var removeListeners = function () {
                /* eslint-disable @typescript-eslint/no-use-before-define */
                _this.bus.off(events_1.VENMO_DESKTOP_CUSTOMER_CANCELED, customerCancelledHandler);
                _this.bus.off(events_1.VENMO_DESKTOP_AUTHORIZATION_COMPLETED, completedHandler);
                _this.bus.off(events_1.VENMO_DESKTOP_UNKNOWN_ERROR, unknownErrorHandler);
                /* eslint-enable @typescript-eslint/no-use-before-define */
            };
            var unknownErrorHandler = function (err) {
                removeListeners();
                _this.sendEvent("venmo.tokenize.desktop.unknown-error");
                reject({
                    allowUIToHandleError: false,
                    reason: "UNKNOWN_ERROR",
                    err: err,
                });
            };
            var customerCancelledHandler = function () {
                removeListeners();
                _this.updateVenmoDesktopPaymentContext("CANCELED");
                _this.sendEvent("venmo.tokenize.desktop.status-change.canceled-from-modal");
                reject({
                    allowUIToHandleError: false,
                    reason: "CUSTOMER_CANCELED",
                });
            };
            var completedHandler = function (payload) {
                removeListeners();
                resolve(payload);
            };
            _this.bus.on(events_1.VENMO_DESKTOP_CUSTOMER_CANCELED, customerCancelledHandler);
            _this.bus.on(events_1.VENMO_DESKTOP_AUTHORIZATION_COMPLETED, completedHandler);
            _this.bus.on(events_1.VENMO_DESKTOP_UNKNOWN_ERROR, unknownErrorHandler);
        });
        this.iframe.style.display = "block";
        this.setAlert("Generating a QR code, get your Venmo app ready");
        this.iframe.focus();
        this.startPolling();
        return promise
            .then(function (result) {
            delete _this.venmoContextId;
            delete _this.launchDesktopPromiseRejectFunction;
            return result;
        })
            .catch(function (err) {
            delete _this.venmoContextId;
            delete _this.launchDesktopPromiseRejectFunction;
            return _this.Promise.reject(err);
        });
    };
    VenmoDesktop.prototype.triggerCompleted = function (result) {
        var _this = this;
        if (this.isHidden) {
            return;
        }
        setTimeout(function () {
            _this.bus.emit(events_1.VENMO_DESKTOP_AUTHORIZATION_COMPLETED, result);
        }, VISUAL_DELAY_BEFORE_SIGNALLING_COMPLETION);
    };
    VenmoDesktop.prototype.triggerRejected = function (err) {
        if (this.launchDesktopPromiseRejectFunction) {
            this.launchDesktopPromiseRejectFunction(err);
        }
    };
    VenmoDesktop.prototype.hideDesktopFlow = function () {
        this.setAlert("");
        this.iframe.style.display = "none";
        this.bus.emit(events_1.VENMO_DESKTOP_CLOSED_FROM_PARENT);
        this.isHidden = true;
    };
    VenmoDesktop.prototype.displayError = function (message) {
        if (this.isHidden) {
            return;
        }
        this.bus.emit(events_1.VENMO_DESKTOP_DISPLAY_ERROR, {
            message: message,
        });
        this.setAlert(message);
    };
    VenmoDesktop.prototype.displayQRCode = function (id, merchantId) {
        if (this.isHidden) {
            return;
        }
        this.bus.emit(events_1.VENMO_DESKTOP_DISPLAY_QR_CODE, {
            id: id,
            merchantId: merchantId,
        });
        this.setAlert("To scan the QR code, open your Venmo app");
    };
    VenmoDesktop.prototype.authorize = function () {
        if (this.isHidden) {
            return;
        }
        this.bus.emit(events_1.VENMO_DESKTOP_AUTHORIZE);
        this.setAlert("Venmo account authorized");
    };
    VenmoDesktop.prototype.authorizing = function () {
        if (this.isHidden) {
            return;
        }
        this.bus.emit(events_1.VENMO_DESKTOP_AUTHORIZING);
        this.setAlert("Authorize on your Venmo app");
    };
    VenmoDesktop.prototype.startPolling = function () {
        var _this = this;
        return this.createVenmoDesktopPaymentContext()
            .then(function (result) {
            var expiresIn = new Date(result.expiresAt).getTime() -
                new Date(result.createdAt).getTime();
            var expiredTime = Date.now() + expiresIn;
            _this.displayQRCode(result.id, result.merchantId);
            return _this.pollForStatusChange(result.status, expiredTime);
        })
            .then(function (result) {
            if (!result) {
                return;
            }
            // since we are manually adding a prepended @ sign
            // we want to make sure that the username does not
            // start giving us the @ sign up front in the future
            var username = result.userName || "";
            username = "@" + username.replace("@", "");
            _this.triggerCompleted({
                paymentMethodNonce: result.paymentMethodId,
                username: username,
            });
        })
            .catch(function (err) {
            if (err.allowUIToHandleError) {
                // noop here and let the UI handle the customer error
                return;
            }
            _this.sendEvent("venmo.tokenize.desktop.unhandled-error");
            _this.triggerRejected(err);
        });
    };
    VenmoDesktop.prototype.pollForStatusChange = function (status, expiredTime) {
        var _this = this;
        if (!this.venmoContextId) {
            return this.Promise.resolve();
        }
        if (Date.now() > expiredTime) {
            return this.updateVenmoDesktopPaymentContext("EXPIRED").then(function () {
                _this.displayError("Something went wrong");
                _this.sendEvent("venmo.tokenize.desktop.status-change.sdk-timeout");
                return _this.Promise.reject({
                    allowUIToHandleError: true,
                    reason: "TIMEOUT",
                });
            });
        }
        return this.lookupVenmoDesktopPaymentContext().then(function (response) {
            if (!_this.venmoContextId || !response) {
                return _this.Promise.resolve();
            }
            var newStatus = response.status;
            if (newStatus !== status) {
                status = newStatus;
                _this.sendEvent("venmo.tokenize.desktop.status-change." + status.toLowerCase());
                switch (status) {
                    case "CREATED":
                        // noop, no need to do anything here
                        // should never be able to get to this point
                        // but we'll keep it in to enumerate the statuses
                        break;
                    case "EXPIRED":
                    case "FAILED":
                    case "CANCELED":
                        var message = status === "CANCELED"
                            ? "The authorization was canceled"
                            : "Something went wrong";
                        _this.displayError(message);
                        // these are all terminal states, so we end it here
                        return _this.Promise.reject({
                            allowUIToHandleError: true,
                            reason: status,
                        });
                    case "SCANNED":
                        _this.authorizing();
                        break;
                    case "APPROVED":
                        _this.authorize();
                        return _this.Promise.resolve(response);
                    default:
                    // any other statuses are irrelevant to the polling
                    // and can just be ignored
                }
            }
            return new _this.Promise(function (resolve, reject) {
                setTimeout(function () {
                    _this.pollForStatusChange(status, expiredTime)
                        .then(resolve)
                        .catch(reject);
                }, VENMO_DESKTOP_POLLING_INTERVAL);
            });
        });
    };
    VenmoDesktop.prototype.teardown = function () {
        this.bus.teardown();
        if (this.iframe.parentNode) {
            this.iframe.parentNode.removeChild(this.iframe);
        }
        if (this.alertBox.parentNode) {
            this.alertBox.parentNode.removeChild(this.alertBox);
        }
    };
    VenmoDesktop.prototype.setAlert = function (message) {
        this.alertBox.style.display = message ? "block" : "none";
        this.alertBox.textContent = message;
    };
    VenmoDesktop.prototype.createPaymentContextFromGraphqlLegacyQRCodeMutation = function (intent) {
        return this.apiRequest(queries_1.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY, {
            input: {
                environment: this.env,
                intent: intent,
            },
        }).then(function (response) {
            return response.createVenmoQRCodePaymentContext
                .venmoQRCodePaymentContext;
        });
    };
    VenmoDesktop.prototype.createPaymentContextFromGraphQL = function (intent) {
        var input = {
            intent: intent,
            paymentMethodUsage: this.paymentMethodUsage,
            customerClient: "DESKTOP",
        };
        if (this.profileId) {
            input.merchantProfileId = this.profileId;
        }
        if (this.displayName) {
            input.displayName = this.displayName;
        }
        return this.apiRequest(queries_1.CREATE_PAYMENT_CONTEXT_QUERY, {
            input: input,
        }).then(function (response) {
            return response.createVenmoPaymentContext
                .venmoPaymentContext;
        });
    };
    VenmoDesktop.prototype.createVenmoDesktopPaymentContext = function () {
        var _this = this;
        var contextPromise = this.shouldUseLegacyQRCodeMutation
            ? this.createPaymentContextFromGraphqlLegacyQRCodeMutation("PAY_FROM_APP")
            : this.createPaymentContextFromGraphQL("PAY_FROM_APP");
        return contextPromise.then(function (context) {
            _this.venmoContextId = context.id;
            var merchantId = _this.profileId || context.merchantId;
            return {
                id: context.id,
                status: context.status,
                merchantId: merchantId,
                createdAt: context.createdAt,
                expiresAt: context.expiresAt,
            };
        });
    };
    VenmoDesktop.prototype.updateVenmoDesktopPaymentContext = function (status, additionalOptions) {
        if (additionalOptions === void 0) { additionalOptions = {}; }
        if (!this.venmoContextId) {
            return this.Promise.resolve();
        }
        var data = {
            input: __assign({ id: this.venmoContextId, status: status }, additionalOptions),
        };
        var query = this.shouldUseLegacyQRCodeMutation
            ? queries_1.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY
            : queries_1.UPDATE_PAYMENT_CONTEXT_QUERY;
        return this.apiRequest(query, data).then(function () {
            // noop so we can resolve without any data to match the type
        });
    };
    VenmoDesktop.prototype.lookupVenmoDesktopPaymentContext = function () {
        if (!this.venmoContextId) {
            return this.Promise.resolve();
        }
        var query = this.shouldUseLegacyQRCodeMutation
            ? queries_1.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY
            : queries_1.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;
        return this.apiRequest(query, {
            id: this.venmoContextId,
        }).then(function (response) {
            return response.node;
        });
    };
    return VenmoDesktop;
}());
exports.default = VenmoDesktop;

},{"../shared/events":161,"./queries":155,"@braintree/iframer":42,"@braintree/uuid":46,"framebus":172}],157:[function(require,module,exports){
'use strict';
/** @module braintree-web/venmo */

var analytics = require('../lib/analytics');
var basicComponentVerification = require('../lib/basic-component-verification');
var createDeferredClient = require('../lib/create-deferred-client');
var createAssetsUrl = require('../lib/create-assets-url');
var errors = require('./shared/errors');
var wrapPromise = require('@braintree/wrap-promise');
var BraintreeError = require('../lib/braintree-error');
var Venmo = require('./venmo');
var Promise = require('../lib/promise');
var supportsVenmo = require('./shared/supports-venmo');
var VERSION = "3.78.2";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} [options.client] A {@link Client} instance.
 * @param {string} [options.authorization] A tokenizationKey or clientToken. Can be used in place of `options.client`.
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications. Doing so causes {@link Venmo#isBrowserSupported|isBrowserSupported} to return true only for mobile web browsers that support returning from the Venmo app to the same tab.
 * @param {boolean} [options.allowWebviews=true] This should be set to false if your payment flow does not occur from within a webview that you control. Doing so causes {@link Venmo#isBrowserSupported|isBrowserSupported} to return true only for mobile web browsers that are not webviews.
 * @param {boolean} [options.ignoreHistoryChanges=false] When the Venmo app returns to the website, it will modify the hash of the url to include data about the tokenization. By default, the SDK will put the state of the hash back to where it was before the change was made. Pass `true` to handle the hash change instead of the SDK.
 * @param {string} [options.profileId] The Venmo profile ID to be used during payment authorization. Customers will see the business name and logo associated with this Venmo profile, and it will show up in the Venmo app as a "Connected Merchant". Venmo profile IDs can be found in the Braintree Control Panel. Omitting this value will use the default Venmo profile.
 * @param {string} [options.deepLinkReturnUrl] An override for the URL that the Venmo iOS app opens to return from an app switch.
 * @param {boolean} [options.requireManualReturn=false] When `true`, the customer will have to manually switch back to the browser/webview that is presenting Venmo to complete the payment.
 * @param {boolean} [options.useRedirectForIOS=false] Normally, the Venmo flow is launched using `window.open` and the Venmo app intercepts that call and opens the Venmo app instead. If the customer does not have the Venmo app installed, it opens the Venmo website in a new window and instructs the customer to install the app.
 *
 * In iOS webviews and Safari View Controllers (a webview-like environment which is indistinguishable from Safari for JavaScript environments), this call to `window.open` will always fail to app switch to Venmo, resulting instead in a white screen. Because of this, an alternate approach is required to launch the Venmo flow.
 *
 * When `useRedirectForIOS` is `true` and the Venmo flow is started in an iOS environment, the Venmo flow will be started by setting `window.location.href` to the Venmo website (which will still be intercepted by the Venmo app and should be the same behavior as if `window.open` was called). However, if the customer does not have the Venmo app installed, the merchant page will instead be replaced with the Venmo website and the customer will need to use the browser's back button to return to the merchant's website. Ensure that your customer's checkout information will not be lost if they are navigated away from the website and return using the browser back button.
 *
 * Due to a bug in iOS's implementation of `window.open` in iOS webviews and Safari View Controllers, if `useRedirectForIOS` is not set to `true` and the flow is launched from an iOS webview or Safari View Controller, the customer will be presented with a blank screen, halting the flow and leaving the customer unable to return to the merchant's website. Setting `useRedirectForIOS` to `true` will allow the flow to continue, but the Venmo app will be unable to return back to the webview/Safari View Controller. It will instead open the merchant's site in a new window in the customer's browser, which means the merchant site must be able to process the Venmo payment. If the SDK is configured with `allowNewBrowserTab = false`, it is unlikely that the website is set up to process the Venmo payment from a new window.
 *
 * If processing the payment from a new window is not possible, use this flag in conjunction with `requireManualReturn` so that the customer may start the flow from a webview/Safari View Controller or their Safari browser and manually return to the place that originated the flow once the Venmo app has authorized the payment and instructed them to do so.
 * @param {string} [options.paymentMethodUsage] The intended usage for the Venmo payment method nonce. Possible options are:
 * * single_use - intended as a one time transaction
 * * multi_use - intended to be vaulted and used for multiple transactions
 * @param {string} [options.displayName] The business name that will be displayed in the Venmo app payment approval screen. Only applicable when used with `paymentMethodUsage` and used by merchants onboarded as PayFast channel partners.
 * @param {callback} [callback] The second argument, `data`, is the {@link Venmo} instance. If no callback is provided, `create` returns a promise that resolves with the {@link Venmo} instance.
 * @example
 * braintree.venmo.create({
 *   client: clientInstance
 * }).then(function (venmoInstance) {
 *   // venmoInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating Venmo instance', createErr);
 * });
 * @example <caption>Allow desktop flow to be used</caption>
 * braintree.venmo.create({
 *   client: clientInstance,
 * }).then(function (venmoInstance) {
 *   // venmoInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating Venmo instance', createErr);
 * });
 * @returns {(Promise|void)} Returns the Venmo instance.
 */
function create(options) {
  var name = 'Venmo';

  return basicComponentVerification.verify({
    name: name,
    client: options.client,
    authorization: options.authorization
  }).then(function () {
    var createPromise, instance;

    if (options.profileId && typeof options.profileId !== 'string') {
      return Promise.reject(new BraintreeError(errors.VENMO_INVALID_PROFILE_ID));
    }

    if (options.deepLinkReturnUrl && typeof options.deepLinkReturnUrl !== 'string') {
      return Promise.reject(new BraintreeError(errors.VENMO_INVALID_DEEP_LINK_RETURN_URL));
    }

    createPromise = createDeferredClient.create({
      authorization: options.authorization,
      client: options.client,
      debug: options.debug,
      assetsUrl: createAssetsUrl.create(options.authorization),
      name: name
    }).then(function (client) {
      var configuration = client.getConfiguration();

      options.client = client;

      if (!configuration.gatewayConfiguration.payWithVenmo) {
        return Promise.reject(new BraintreeError(errors.VENMO_NOT_ENABLED));
      }

      return client;
    });

    options.createPromise = createPromise;
    instance = new Venmo(options);

    analytics.sendEvent(createPromise, 'venmo.initialized');

    return createPromise.then(function () {
      return instance;
    });
  });
}

/**
 * @static
 * @function isBrowserSupported
 * @param {object} [options] browser support options:
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications.
 * @param {boolean} [options.allowWebviews=true] This should be set to false if your payment flow does not occur from within a webview that you control.
 * @example
 * if (braintree.venmo.isBrowserSupported()) {
 *   // set up Venmo
 * }
 * @example <caption>Explicitly require browser support returning to the same tab</caption>
 * if (braintree.venmo.isBrowserSupported({
 *   allowNewBrowserTab: false
 * })) {
 *   // set up Venmo
 * }
 * @example <caption>Explicitly set webviews as disallowed browsers</caption>
 * if (braintree.venmo.isBrowserSupported({
 *   allowWebviews: false
 * })) {
 *   // set up Venmo
 * }
 * @returns {boolean} Whether or not the browser supports Venmo.
 */
function isBrowserSupported(options) {
  return supportsVenmo.isBrowserSupported(options);
}

module.exports = {
  create: wrapPromise(create),
  isBrowserSupported: isBrowserSupported,
  /**
   * @description The current version of the SDK, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"../lib/analytics":93,"../lib/basic-component-verification":96,"../lib/braintree-error":98,"../lib/create-assets-url":102,"../lib/create-deferred-client":104,"../lib/promise":130,"./shared/errors":160,"./shared/supports-venmo":162,"./venmo":163,"@braintree/wrap-promise":50}],158:[function(require,module,exports){
'use strict';

var isAndroid = require('@braintree/browser-detection/is-android');
var isChrome = require('@braintree/browser-detection/is-chrome');
var isIos = require('@braintree/browser-detection/is-ios');
var isIosSafari = require('@braintree/browser-detection/is-ios-safari');
var isIosWebview = require('@braintree/browser-detection/is-ios-webview');

function isAndroidWebview() {
  return isAndroid() && window.navigator.userAgent.toLowerCase().indexOf('wv') > -1;
}

function doesNotSupportWindowOpenInIos() {
  return isIosWebview() || (isIos() && isChrome());
}

module.exports = {
  isAndroid: isAndroid,
  isAndroidWebview: isAndroidWebview,
  isChrome: isChrome,
  isIos: isIos,
  isIosSafari: isIosSafari,
  isIosWebview: isIosWebview,
  doesNotSupportWindowOpenInIos: doesNotSupportWindowOpenInIos
};

},{"@braintree/browser-detection/is-android":26,"@braintree/browser-detection/is-chrome":28,"@braintree/browser-detection/is-ios":37,"@braintree/browser-detection/is-ios-safari":34,"@braintree/browser-detection/is-ios-webview":35}],159:[function(require,module,exports){
'use strict';

module.exports = {
  DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY: 500,
  DEFAULT_PROCESS_RESULTS_DELAY: 1000,
  VENMO_OPEN_URL: 'https://venmo.com/braintree/checkout'
};

},{}],160:[function(require,module,exports){
'use strict';

/**
 * @name BraintreeError.Venmo - Creation Error Codes
 * @description Errors that occur when [creating the Venmo component](./module-braintree-web_venmo.html#.create).
 * @property {MERCHANT} VENMO_NOT_ENABLED Occurs when Venmo is not enabled on the Braintree control panel.
 * @property {MERCHANT} VENMO_INVALID_PROFILE_ID Occurs when Venmo is initialized with a profile id, but it is invalid.
 * @property {UNKNOWN} VENMO_MOBILE_POLLING_SETUP_FAILED __Deprecated__ No longer returned. Use `VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED` instead.
 * @property {UNKNOWN} VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED Occurs when the request to set up a Venmo Payment Context object fails.
 */

/**
 * @name BraintreeError.Venmo - tokenize Error Codes
 * @description Errors that occur when using the [`tokenize` method](./Venmo.html#tokenize).
 * @property {MERCHANT} VENMO_TOKENIZATION_REQUEST_ACTIVE Occurs when `tokenize` is called when the flow is already in progress.
 * @property {MERCHANT} VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE Occurs when `cancelTokenization` is called when the flow is not in progress.
 * @property {UNKNOWN} VENMO_APP_FAILED Occurs when tokenization fails.
 * @property {CUSTOMER} VENMO_APP_CANCELED Occurs when customer cancels flow from the Venmo app.
 * @property {CUSTOMER} VENMO_CANCELED Occurs when customer cancels the flow or Venmo app is not available.
 * @property {CUSTOMER} VENMO_DESKTOP_CANCELED Occurs when customer cancels the Venmo Desktop flow by closing the modal.
 * @property {MERCHANT} VENMO_TOKENIZATION_CANCELED_BY_MERCHANT Occurs when `cancelTokenization` is called while tokenization is in progress.
 * @property {UNKNOWN} VENMO_DESKTOP_UNKNOWN_ERROR Occurs when an unknown error causes the Venmo Desktop flow to fail.
 * @property {UNKNOWN} VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR Occurs when an unknown network error causes the mobile polling process to fail.
 * @property {CUSTOMER} VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED Occurs when the polling has expired and the payment cannot be completed.
 * @property {CUSTOMER} VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED Occurs when the polling operation is canceled by the customer.
 * @property {CUSTOMER} VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT Occurs when customer takes too long to complete payment.
 * @property {UNKNOWN} VENMO_MOBILE_POLLING_TOKENIZATION_FAILED Occurs if there is an unknown error during the mobile polling process.
 */

var BraintreeError = require('../../lib/braintree-error');

module.exports = {
  VENMO_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_NOT_ENABLED',
    message: 'Venmo is not enabled for this merchant.'
  },
  VENMO_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_TOKENIZATION_REQUEST_ACTIVE',
    message: 'Another tokenization request is active.'
  },
  VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE',
    message: 'No tokenization in progress.'
  },
  VENMO_APP_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VENMO_APP_FAILED',
    message: 'Venmo app encountered a problem.'
  },
  VENMO_APP_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_APP_CANCELED',
    message: 'Venmo app authorization was canceled.'
  },
  VENMO_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_CANCELED',
    message: 'User canceled Venmo authorization, or Venmo app is not available.'
  },
  VENMO_DESKTOP_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_DESKTOP_CANCELED',
    message: 'User canceled Venmo authorization by closing the Venmo Desktop modal.'
  },
  VENMO_TOKENIZATION_CANCELED_BY_MERCHANT: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_TOKENIZATION_CANCELED_BY_MERCHANT',
    message: 'The Venmo tokenization was canceled by the merchant.'
  },
  VENMO_DESKTOP_UNKNOWN_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VENMO_DESKTOP_UNKNOWN_ERROR',
    message: 'Something went wrong with the Venmo Desktop flow.'
  },
  VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED',
    message: 'Something went wrong creating the Venmo Payment Context.'
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR',
    message: 'Something went wrong during mobile polling.'
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED',
    message: 'The Venmo authorization request is expired.'
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED',
    message: 'The Venmo authorization was canceled'
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT',
    message: 'Customer took too long to authorize Venmo payment.'
  },
  VENMO_MOBILE_POLLING_TOKENIZATION_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VENMO_MOBILE_POLLING_TOKENIZATION_FAILED',
    message: 'The Venmo authorization failed.'
  },
  VENMO_INVALID_PROFILE_ID: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_INVALID_PROFILE_ID',
    message: 'Venmo profile ID is invalid.'
  },
  VENMO_INVALID_DEEP_LINK_RETURN_URL: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_INVALID_DEEP_LINK_RETURN_URL',
    message: 'Venmo deep link return URL is invalid.'
  }
};

},{"../../lib/braintree-error":98}],161:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENMO_DESKTOP_UNKNOWN_ERROR = exports.VENMO_DESKTOP_REQUEST_NEW_QR_CODE = exports.VENMO_DESKTOP_CLOSED_FROM_PARENT = exports.VENMO_DESKTOP_IFRAME_READY = exports.VENMO_DESKTOP_DISPLAY_QR_CODE = exports.VENMO_DESKTOP_DISPLAY_ERROR = exports.VENMO_DESKTOP_CUSTOMER_CANCELED = exports.VENMO_DESKTOP_AUTHORIZATION_COMPLETED = exports.VENMO_DESKTOP_AUTHORIZING = exports.VENMO_DESKTOP_AUTHORIZE = exports.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT = void 0;
exports.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT = "VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT";
exports.VENMO_DESKTOP_AUTHORIZE = "VENMO_DESKTOP_AUTHORIZE";
exports.VENMO_DESKTOP_AUTHORIZING = "VENMO_DESKTOP_AUTHORIZING";
exports.VENMO_DESKTOP_AUTHORIZATION_COMPLETED = "VENMO_DESKTOP_AUTHORIZATION_COMPLETED";
exports.VENMO_DESKTOP_CUSTOMER_CANCELED = "VENMO_DESKTOP_CUSTOMER_CANCELED";
exports.VENMO_DESKTOP_DISPLAY_ERROR = "VENMO_DESKTOP_DISPLAY_ERROR";
exports.VENMO_DESKTOP_DISPLAY_QR_CODE = "VENMO_DESKTOP_DISPLAY_QR_CODE";
exports.VENMO_DESKTOP_IFRAME_READY = "VENMO_DESKTOP_IFRAME_READY";
exports.VENMO_DESKTOP_CLOSED_FROM_PARENT = "VENMO_DESKTOP_CLOSED_FROM_PARENT";
exports.VENMO_DESKTOP_REQUEST_NEW_QR_CODE = "VENMO_DESKTOP_REQUEST_NEW_QR_CODE";
exports.VENMO_DESKTOP_UNKNOWN_ERROR = "VENMO_DESKTOP_UNKNOWN_ERROR";

},{}],162:[function(require,module,exports){
'use strict';

var browserDetection = require('./browser-detection');

function isBrowserSupported(options) {
  var merchantAllowsReturningToNewBrowserTab, merchantAllowsWebviews, merchantAllowsDesktopBrowsers;
  var isAndroid = browserDetection.isAndroid();
  var isMobileDevice = isAndroid || browserDetection.isIos();
  var isAndroidChrome = isAndroid && browserDetection.isChrome();
  var isMobileDeviceThatSupportsReturnToSameTab = browserDetection.isIosSafari() || isAndroidChrome;

  options = options || {};
  // NEXT_MAJOR_VERSION allowDesktop will default to true, but can be opted out
  merchantAllowsDesktopBrowsers = options.allowDesktop === true;
  merchantAllowsReturningToNewBrowserTab = options.hasOwnProperty('allowNewBrowserTab') ? options.allowNewBrowserTab : true;
  // NEXT_MAJOR_VERSION webviews are not supported, except for the case where
  // the merchant themselves is presenting venmo in a webview using the deep
  // link url to get back to their app. For the next major version, we should
  // just not have this option and instead require the merchant to determine
  // if the venmo button should be displayed when presenting it in the
  // merchant's app via a webview.
  merchantAllowsWebviews = options.hasOwnProperty('allowWebviews') ? options.allowWebviews : true;

  if (!merchantAllowsWebviews && (browserDetection.isAndroidWebview() || browserDetection.isIosWebview())) {
    return false;
  }

  if (!merchantAllowsReturningToNewBrowserTab) {
    if (isMobileDeviceThatSupportsReturnToSameTab) {
      return true;
    }

    return merchantAllowsDesktopBrowsers && !isMobileDevice;
  }

  if (!merchantAllowsDesktopBrowsers) {
    return isMobileDevice;
  }

  return true;
}

module.exports = {
  isBrowserSupported: isBrowserSupported
};

},{"./browser-detection":158}],163:[function(require,module,exports){
'use strict';

var analytics = require('../lib/analytics');
var isBrowserSupported = require('./shared/supports-venmo');
var browserDetection = require('./shared/browser-detection');
var constants = require('./shared/constants');
var errors = require('./shared/errors');
var querystring = require('../lib/querystring');
var isVerifiedDomain = require('../lib/is-verified-domain');
var methods = require('../lib/methods');
var convertMethodsToError = require('../lib/convert-methods-to-error');
var wrapPromise = require('@braintree/wrap-promise');
var BraintreeError = require('../lib/braintree-error');
var inIframe = require('../lib/in-iframe');
var Promise = require('../lib/promise');
var ExtendedPromise = require('@braintree/extended-promise');
// NEXT_MAJOR_VERSION the source code for this is actually in a
// typescript repo called venmo-desktop, once the SDK is migrated
// to typescript, we can move the TS files out of that separate
// repo and into the web SDK properly
var createVenmoDesktop = require('./external/');
var graphqlQueries = require('./external/queries');

var VERSION = "3.78.2";
var DEFAULT_MOBILE_POLLING_INTERVAL = 250; // 1/4 second
var DEFAULT_MOBILE_EXPIRING_THRESHOLD = 300000; // 5 minutes

/**
 * Venmo tokenize payload.
 * @typedef {object} Venmo~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `VenmoAccount`.
 * @property {object} details Additional Venmo account details.
 * @property {string} details.username Username of the Venmo account.
 */

/**
 * @class
 * @param {object} options The Venmo {@link module:braintree-web/venmo.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/venmo.create|braintree-web.venmo.create} instead.</strong>
 * @classdesc This class represents a Venmo component produced by {@link module:braintree-web/venmo.create|braintree-web/venmo.create}. Instances of this class have methods for tokenizing Venmo payments.
 */
function Venmo(options) {
  var self = this;

  this._createPromise = options.createPromise;
  this._allowNewBrowserTab = options.allowNewBrowserTab !== false;
  this._allowWebviews = options.allowWebviews !== false;
  this._allowDesktop = options.allowDesktop === true;
  this._requireManualReturn = options.requireManualReturn === true;
  this._useRedirectForIOS = options.useRedirectForIOS === true;
  this._profileId = options.profileId;
  this._displayName = options.displayName;
  this._deepLinkReturnUrl = options.deepLinkReturnUrl;
  this._ignoreHistoryChanges = options.ignoreHistoryChanges;
  this._paymentMethodUsage = (options.paymentMethodUsage || '').toUpperCase();
  this._shouldUseLegacyFlow = !this._paymentMethodUsage;
  this._useDesktopFlow = this._allowDesktop && this._isDesktop();
  this._cannotHaveReturnUrls = inIframe() || this._requireManualReturn;
  this._shouldCreateVenmoPaymentContext = this._cannotHaveReturnUrls || !this._shouldUseLegacyFlow;

  analytics.sendEvent(this._createPromise, 'venmo.desktop-flow.configured.' + String(Boolean(this._allowDesktop)));

  // if the url has a tokenization result, that indicates
  // that it cannot be the desktop flow or the manual return
  // flow. If it's the hash change with paymentMethodUsage
  // flow, we want to skip creating a new payment context, since
  // there is already a pending payment context waiting to be
  // processed. For the hash change flow without paymentMethodUsage,
  // no further actions are needed.
  if (this.hasTokenizationResult()) {
    analytics.sendEvent(this._createPromise, 'venmo.appswitch.return-in-new-tab');
  } else if (this._useDesktopFlow) {
    this._createPromise = this._createPromise.then(function (client) {
      var config = client.getConfiguration().gatewayConfiguration;

      return createVenmoDesktop({
        url: config.assetsUrl + '/web/' + VERSION + '/html/venmo-desktop-frame.html',
        environment: config.environment === 'production' ? 'PRODUCTION' : 'SANDBOX',
        profileId: self._profileId || config.payWithVenmo.merchantId,
        paymentMethodUsage: self._paymentMethodUsage,
        displayName: self._displayName,
        Promise: Promise,
        apiRequest: function (query, data) {
          return client.request({
            api: 'graphQLApi',
            data: {
              query: query,
              variables: data
            }
          }).then(function (response) {
            return response.data;
          });
        },
        sendEvent: function (eventName) {
          analytics.sendEvent(self._createPromise, eventName);
        },
        verifyDomain: isVerifiedDomain
      }).then(function (venmoDesktopInstance) {
        self._venmoDesktopInstance = venmoDesktopInstance;
        analytics.sendEvent(self._createPromise, 'venmo.desktop-flow.presented');

        return client;
      }).catch(function () {
        analytics.sendEvent(self._createPromise, 'venmo.desktop-flow.setup-failed');
        self._useDesktopFlow = false;

        return client;
      });
    });
  } else if (this._shouldCreateVenmoPaymentContext) {
    // these variables are only relevant for the manual return flow
    // and they are only set to make testing easier (so they can
    // be overwritten with smaller values in the tests)
    this._mobilePollingInterval = DEFAULT_MOBILE_POLLING_INTERVAL;
    this._mobilePollingExpiresThreshold = DEFAULT_MOBILE_EXPIRING_THRESHOLD;

    this._createPromise = this._createPromise.then(function (client) {
      var analyticsCategory = self._cannotHaveReturnUrls ?
        'manual-return' : 'mobile-payment-context';
      var config = client.getConfiguration().gatewayConfiguration;

      self._mobilePollingContextEnvironment = config.environment.toUpperCase();

      return self._createVenmoPaymentContext(client).then(function () {
        analytics.sendEvent(self._createPromise, 'venmo.' + analyticsCategory + '.presented');

        return client;
      }).catch(function (err) {
        analytics.sendEvent(self._createPromise, 'venmo.' + analyticsCategory + '.setup-failed');

        return Promise.reject(new BraintreeError({
          type: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.type,
          code: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.code,
          message: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.message,
          details: {
            originalError: err
          }
        }));
      });
    });
  }
}

Venmo.prototype._createVenmoPaymentContext = function (client, cancelIfTokenizationInProgress) {
  var self = this;
  var promise;

  if (!this._shouldCreateVenmoPaymentContext) {
    return Promise.resolve();
  }

  if (this._shouldUseLegacyFlow) {
    promise = client.request({
      api: 'graphQLApi',
      data: {
        query: graphqlQueries.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY,
        variables: {
          input: {
            environment: this._mobilePollingContextEnvironment,
            intent: 'PAY_FROM_APP'
          }
        }
      }
    }).then(function (response) {
      return response.data.createVenmoQRCodePaymentContext.venmoQRCodePaymentContext;
    });
  } else {
    promise = client.request({
      api: 'graphQLApi',
      data: {
        query: graphqlQueries.CREATE_PAYMENT_CONTEXT_QUERY,
        variables: {
          input: {
            paymentMethodUsage: this._paymentMethodUsage,
            intent: 'CONTINUE',
            customerClient: 'MOBILE_WEB',
            displayName: this._displayName
          }
        }
      }
    }).then(function (response) {
      return response.data.createVenmoPaymentContext.venmoPaymentContext;
    });
  }

  return promise.then(function (context) {
    var expiredTime = new Date(context.expiresAt) - new Date(context.createdAt);
    var refreshIn = expiredTime * 0.6666;

    // prevents multiple setTimeouts from firing from separate calls
    // to create a payment context by canceling the previous one
    // if there is a pending call
    clearTimeout(self._refreshPaymentContextTimeout);
    self._refreshPaymentContextTimeout = setTimeout(function () {
      if (self._tokenizationInProgress) {
        return;
      }
      self._createVenmoPaymentContext(client, true);
    }, refreshIn);

    if (cancelIfTokenizationInProgress && self._tokenizationInProgress) {
      return;
    }

    self._venmoPaymentContextStatus = context.status;
    self._venmoPaymentContextId = context.id;
  });
};

Venmo.prototype.appSwitch = function (url) {
  if (this._deepLinkReturnUrl) {
    if (isIosWebviewInDeepLinkReturnUrlFlow()) {
      analytics.sendEvent(this._createPromise, 'venmo.appswitch.start.ios-webview');
      // Deep link URLs do not launch iOS apps from a webview when using window.open or PopupBridge.open.
      window.location.href = url;
    } else if (window.popupBridge && typeof window.popupBridge.open === 'function') {
      analytics.sendEvent(this._createPromise, 'venmo.appswitch.start.popup-bridge');
      window.popupBridge.open(url);
    } else {
      analytics.sendEvent(this._createPromise, 'venmo.appswitch.start.webview');
      window.open(url);
    }
  } else {
    analytics.sendEvent(this._createPromise, 'venmo.appswitch.start.browser');

    if (browserDetection.doesNotSupportWindowOpenInIos() || this._shouldUseRedirectStrategy()) {
      window.location.href = url;
    } else {
      window.open(url);
    }
  }
};

Venmo.prototype.getUrl = function () {
  return this._createPromise.then(function (client) {
    var configuration = client.getConfiguration();
    var params = {};
    var currentUrl = this._deepLinkReturnUrl || window.location.href.replace(window.location.hash, '');
    var venmoConfiguration = configuration.gatewayConfiguration.payWithVenmo;
    var analyticsMetadata = configuration.analyticsMetadata;
    var accessToken = venmoConfiguration.accessToken;
    var braintreeData = {
      _meta: {
        version: analyticsMetadata.sdkVersion,
        integration: analyticsMetadata.integration,
        platform: analyticsMetadata.platform,
        sessionId: analyticsMetadata.sessionId
      }
    };

    currentUrl = currentUrl.replace(/#*$/, '');

    /* eslint-disable camelcase */
    if (this._venmoPaymentContextId) {
      if (this._shouldUseLegacyFlow) {
        // NEXT_MAJOR_VERSION stop adding the context id to the access token.
        // the context id is placed here for backwards compatiblity
        // with versions of the venmo app that did not support
        // pulling the resource id off of the query params
        accessToken += '|pcid:' + this._venmoPaymentContextId;
      } else {
        params.resource_id = this._venmoPaymentContextId;
      }
    }

    if (this._shouldIncludeReturnUrls()) {
      params['x-success'] = currentUrl + '#venmoSuccess=1';
      params['x-cancel'] = currentUrl + '#venmoCancel=1';
      params['x-error'] = currentUrl + '#venmoError=1';
    } else {
      params['x-success'] = 'NOOP';
      params['x-cancel'] = 'NOOP';
      params['x-error'] = 'NOOP';
    }
    params.ua = window.navigator.userAgent;
    params.braintree_merchant_id = this._profileId || venmoConfiguration.merchantId;
    params.braintree_access_token = accessToken;
    params.braintree_environment = venmoConfiguration.environment;
    params.braintree_sdk_data = btoa(JSON.stringify(braintreeData));
    /* eslint-enable camelcase */

    return constants.VENMO_OPEN_URL + '?' + querystring.stringify(params);
  }.bind(this));
};

/**
 * Returns a boolean indicating whether the current browser supports Venmo as a payment method.
 *
 * If `options.allowNewBrowserTab` is false when calling {@link module:braintree-web/venmo.create|venmo.create}, this method will return true only for browsers known to support returning from the Venmo app to the same browser tab. Currently, this is limited to iOS Safari and Android Chrome.
 * If `options.allowWebviews` is false when calling {@link module:braintree-web/venmo.create|venmo.create}, this method will return true only for mobile browsers that are not webviews.
 * @public
 * @returns {boolean} True if the current browser is supported, false if not.
 */
Venmo.prototype.isBrowserSupported = function () {
  return isBrowserSupported.isBrowserSupported({
    allowNewBrowserTab: this._allowNewBrowserTab,
    allowWebviews: this._allowWebviews,
    allowDesktop: this._allowDesktop
  });
};

/**
 * Returns a boolean indicating whether a Venmo tokenization result is ready to be processed immediately.
 *
 * This method should be called after initialization to see if the result of Venmo authorization is available. If it returns true, call {@link Venmo#tokenize|tokenize} immediately to process the results.
 *
 * @public
 * @returns {boolean} True if the results of Venmo payment authorization are available and ready to process.
 */
Venmo.prototype.hasTokenizationResult = function () {
  return this._hasTokenizationResult();
};

// a private version that lets us pass in a custom hash
// when listening on a hashchange event
Venmo.prototype._hasTokenizationResult = function (hash) {
  var params = getFragmentParameters(hash);

  return typeof (params.venmoSuccess || params.venmoError || params.venmoCancel) !== 'undefined';
};

Venmo.prototype._shouldIncludeReturnUrls = function () {
  // when a deep link return url is passed, we should always
  // respect it and include the return urls so the venmo app
  // can app switch back to it
  if (this._deepLinkReturnUrl) {
    return true;
  }

  // when the sdk is initialized within an iframe, it's
  // impossible to return back to the correct place automatically
  // without also setting a deepLinkReturnUrl. When the return
  // urls are omitted, the Venmo app prompts the user to return
  // manually.
  return !this._cannotHaveReturnUrls;
};

Venmo.prototype._isDesktop = function () {
  return !(browserDetection.isIos() || browserDetection.isAndroid());
};

/**
 * Launches the Venmo flow and returns a nonce payload.
 *
 * If {@link Venmo#hasTokenizationResult|hasTokenizationResult} returns true, calling tokenize will immediately process and return the results without initiating the Venmo payment authorization flow.
 *
 * Only one Venmo flow can be active at a time. One way to achieve this is to disable your Venmo button while the flow is open.
 * @public
 * @param {object} [options] Options for tokenization.
 * @param {number} [options.processResultsDelay=500] The amount of time in milliseconds to delay processing the results. In most cases, this value should be left as the default.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link Venmo~tokenizePayload|tokenizePayload}. If no callback is provided, the method will return a Promise that resolves with a {@link Venmo~tokenizePayload|tokenizePayload}.
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * button.addEventListener('click', function () {
 *   // Disable the button so that we don't attempt to open multiple popups.
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because tokenize opens a new window, this must be called
 *   // as a result of a user action, such as a button click.
 *   venmoInstance.tokenize().then(function (payload) {
 *     // Submit payload.nonce to your server
 *     // Use payload.username to get the Venmo username and display any UI
 *   }).catch(function (tokenizeError) {
 *     // Handle flow errors or premature flow closure
 *     switch (tokenizeErr.code) {
 *       case 'VENMO_APP_CANCELED':
 *         console.log('User canceled Venmo flow.');
 *         break;
 *       case 'VENMO_CANCELED':
 *         console.log('User canceled Venmo, or Venmo app is not available.');
 *         break;
 *       default:
 *         console.error('Error!', tokenizeErr);
 *     }
 *   }).then(function () {
 *     button.removeAttribute('disabled');
 *   });
 * });
 */
Venmo.prototype.tokenize = function (options) {
  var self = this;
  var tokenizationPromise;

  options = options || {};

  if (this._tokenizationInProgress === true) {
    return Promise.reject(new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_ACTIVE));
  }

  this._tokenizationInProgress = true;

  if (this._useDesktopFlow) {
    // for the desktop flow, we create a venmo payment
    // context and then present a qr code modal to the
    // customer and they will open up their venmo app
    // and scan it and approve the purchase on their
    // mobile device. The sdk will start polling
    // in order to determine when the status of the
    // payment context has updated and then pass the
    // resulting nonce back to the merchant.
    tokenizationPromise = this._tokenizeForDesktop(options);
  } else if (this._cannotHaveReturnUrls) {
    // in the manual return strategy, we create the payment
    // context on initialization, then continually poll once
    // the app switch begins until we get a response indiciating
    // the payment context was approved by the customer on the
    // Venmo app. The payment context response also includes a
    // nonce. There are 2 cases where we use the manual return
    // strategy:
    // 1. the sdk is instantiated in an iframe, because
    //    the venmo app is unable to redirect automatically
    //    when that is the case so we rely on the customer
    //    to do a manual redirect and continunally poll for
    //    updates on the payment context to get the nonce
    // 2. same deal for when `requireManualReturn` is configured
    tokenizationPromise = this._tokenizeForMobileWithManualReturn();
  } else {
    // the default mobile flow is to app switch to the
    // venmo app, and then have the venmo app switch
    // back to the page with the venmo nonce details
    // encoded into the hash portion of the url. If
    // `paymentMethodUsage` is provided when instantiating
    // the sdk, we also create a payment context and pass
    // the resource id to the Venmo app during the app switch.
    // Once we get a succesful return, we ping the payment
    // context query to get any additional data needed
    // to send back to the merchant.
    tokenizationPromise = this._tokenizeForMobileWithHashChangeListeners(options);
  }

  return tokenizationPromise.then(function (payload) {
    return self._createPromise.then(function (client) {
      return self._createVenmoPaymentContext(client);
    }).then(function () {
      self._tokenizationInProgress = false;

      return formatTokenizePayload(payload);
    });
  }).catch(function (err) {
    return self._createPromise.then(function (client) {
      return self._createVenmoPaymentContext(client);
    }).then(function () {
      self._tokenizationInProgress = false;

      return Promise.reject(err);
    });
  });
};

/**
 * Cancels the venmo tokenization process
 *
 * @public
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 * @example
 * venmoTokenizeButton.addEventListener('click', function () {
 *   venmoInstance.tokenize().then(function (payload) {
 *     // handle payload
 *   }).catch(function (err) {
 *     if (err.code === 'VENMO_TOKENIZATION_CANCELED_BY_MERCHANT') {
 *       // tokenization was canceled by calling cancelTokenization
 *     }
 *   });
 * });
 *
 * venmoCancelButton.addEventListener('click', function () {
 *   // Hide the button when the venmo flow is not in progress
 *   venmoCancelButton.style.display = "none";
 *
 *   venmoInstance.cancelTokenization().then(function () {
 *     // done canceling the flow
 *   }).catch(function (err) {
 *     // should only get here if there is no tokenization in progress
 *   });
 * });
 */
Venmo.prototype.cancelTokenization = function () {
  if (!this._tokenizationInProgress) {
    return Promise.reject(new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE));
  }

  this._removeVisibilityEventListener();

  // important to reject the tokenization promise first
  // so the tokenize method rejects with this error
  // rather than a customer canceled error in the mobile
  // polling and desktop flows
  if (this._tokenizePromise) {
    this._tokenizePromise.reject(new BraintreeError(errors.VENMO_TOKENIZATION_CANCELED_BY_MERCHANT));
  }

  return Promise.all([
    this._cancelMobilePaymentContext(),
    this._cancelVenmoDesktopContext()
  ]);
};

Venmo.prototype._queryPaymentContextStatus = function (id) {
  var self = this;

  return this._createPromise.then(function (client) {
    var query = self._shouldUseLegacyFlow ?
      graphqlQueries.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY :
      graphqlQueries.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;

    return client.request({
      api: 'graphQLApi',
      data: {
        query: query,
        variables: {
          id: id
        }
      }
    });
  }).then(function (response) {
    return response.data.node;
  });
};

Venmo.prototype._pollForStatusChange = function () {
  var self = this;

  if (Date.now() > self._mobilePollingContextExpiresIn) {
    return Promise.reject(new BraintreeError(errors.VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT));
  }

  return this._queryPaymentContextStatus(this._venmoPaymentContextId).catch(function (networkError) {
    return Promise.reject(new BraintreeError({
      type: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.type,
      code: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.code,
      message: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.message,
      details: {
        originalError: networkError
      }
    }));
  }).then(function (node) {
    var newStatus = node.status;

    if (newStatus !== self._venmoPaymentContextStatus) {
      self._venmoPaymentContextStatus = newStatus;

      analytics.sendEvent(self._createPromise, 'venmo.tokenize.manual-return.status-change.' + newStatus.toLowerCase());

      switch (newStatus) {
        case 'EXPIRED':
        case 'FAILED':
        case 'CANCELED':
          return Promise.reject(new BraintreeError(errors['VENMO_MOBILE_POLLING_TOKENIZATION_' + newStatus]));
        case 'APPROVED':
          return Promise.resolve(node);
        case 'CREATED':
        case 'SCANNED':
        default:
          // any other statuses are irrelevant to the polling
          // and can just be ignored
      }
    }

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        self._pollForStatusChange()
          .then(resolve)
          .catch(reject);
      }, self._mobilePollingInterval);
    });
  });
};

Venmo.prototype._tokenizeForMobileWithManualReturn = function () {
  var self = this;

  analytics.sendEvent(this._createPromise, 'venmo.tokenize.manual-return.start');

  this._mobilePollingContextExpiresIn = Date.now() + this._mobilePollingExpiresThreshold;
  this._tokenizePromise = new ExtendedPromise();

  this._pollForStatusChange().then(function (payload) {
    analytics.sendEvent(self._createPromise, 'venmo.tokenize.manual-return.success');

    self._tokenizePromise.resolve({
      paymentMethodNonce: payload.paymentMethodId,
      username: '@' + (payload.userName || '').replace('@', '')
    });
  }).catch(function (err) {
    analytics.sendEvent(self._createPromise, 'venmo.tokenize.manual-return.failure');

    self._tokenizePromise.reject(err);
  });

  return this.getUrl().then(function (url) {
    self.appSwitch(url);

    return self._tokenizePromise;
  });
};

Venmo.prototype._shouldUseRedirectStrategy = function () {
  if (!browserDetection.isIos()) {
    return false;
  }

  return this._useRedirectForIOS;
};

Venmo.prototype._tokenizeForMobileWithHashChangeListeners = function (options) {
  var self = this;
  var resultProcessingInProgress, visibilityChangeListenerTimeout;

  if (this.hasTokenizationResult()) {
    return this.processResultsFromHash();
  }

  analytics.sendEvent(this._createPromise, 'venmo.tokenize.mobile.start');
  this._tokenizePromise = new ExtendedPromise();

  this._previousHash = window.location.hash;

  function completeFlow(hash) {
    var error;

    self.processResultsFromHash(hash).catch(function (err) {
      error = err;
    }).then(function (res) {
      if (!self._ignoreHistoryChanges && window.location.hash !== self._previousHash) {
        window.location.hash = self._previousHash;
      }
      self._removeVisibilityEventListener();

      if (error) {
        self._tokenizePromise.reject(error);
      } else {
        self._tokenizePromise.resolve(res);
      }
      delete self._tokenizePromise;
    });
  }

  // The Venmo SDK app switches back with the results of the
  // tokenization encoded in the hash
  this._onHashChangeListener = function (e) {
    var hash = e.newURL.split('#')[1];

    if (!self._hasTokenizationResult(hash)) {
      return;
    }

    resultProcessingInProgress = true;
    clearTimeout(visibilityChangeListenerTimeout);
    completeFlow(hash);
  };

  window.addEventListener('hashchange', this._onHashChangeListener, false);

  // Subscribe to document visibility change events to detect when app switch
  // has returned. Acts as a fallback for the hashchange listener and catches
  // the cancel case via manual app switch back
  this._visibilityChangeListener = function () {
    var delay = options.processResultsDelay || constants.DEFAULT_PROCESS_RESULTS_DELAY;

    if (!window.document.hidden) {
      if (!resultProcessingInProgress) {
        visibilityChangeListenerTimeout = setTimeout(completeFlow, delay);
      }
    }
  };

  return this.getUrl().then(function (url) {
    self.appSwitch(url);

    // Add a brief delay to ignore visibility change events that occur right before app switch
    setTimeout(function () {
      window.document.addEventListener(documentVisibilityChangeEventName(), self._visibilityChangeListener);
    }, constants.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY);

    return self._tokenizePromise;
  });
};

Venmo.prototype._tokenizeForDesktop = function () {
  var self = this;

  analytics.sendEvent(this._createPromise, 'venmo.tokenize.desktop.start');

  this._tokenizePromise = new ExtendedPromise();

  this._createPromise.then(function () {
    return self._venmoDesktopInstance.launchDesktopFlow();
  }).then(function (payload) {
    self._venmoDesktopInstance.hideDesktopFlow();

    analytics.sendEvent(self._createPromise, 'venmo.tokenize.desktop.success');

    self._tokenizePromise.resolve(payload);
  }).catch(function (err) {
    analytics.sendEvent(self._createPromise, 'venmo.tokenize.desktop.failure');

    if (self._venmoDesktopInstance) {
      self._venmoDesktopInstance.hideDesktopFlow();
    }

    if (err && err.reason === 'CUSTOMER_CANCELED') {
      self._tokenizePromise.reject(new BraintreeError(errors.VENMO_DESKTOP_CANCELED));

      return;
    }

    self._tokenizePromise.reject(new BraintreeError({
      type: errors.VENMO_DESKTOP_UNKNOWN_ERROR.type,
      code: errors.VENMO_DESKTOP_UNKNOWN_ERROR.code,
      message: errors.VENMO_DESKTOP_UNKNOWN_ERROR.message,
      details: {
        originalError: err
      }
    }));
  });

  return this._tokenizePromise;
};

// TODO remove this once initial testing is done
Venmo.prototype._updateVenmoDesktopPaymentContext = function (status, options) {
  return this._venmoDesktopInstance.updateVenmoDesktopPaymentContext(status, options);
};

Venmo.prototype._cancelMobilePaymentContext = function () {
  var self = this;

  return this._createPromise.then(function (client) {
    var query;

    if (self._venmoPaymentContextId) {
      query = self._shouldUseLegacyFlow ?
        graphqlQueries.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY :
        graphqlQueries.UPDATE_PAYMENT_CONTEXT_QUERY;

      return client.request({
        api: 'graphQLApi',
        data: {
          query: query,
          variables: {
            input: {
              id: self._venmoPaymentContextId,
              status: 'CANCELED'
            }
          }
        }
      });
    }

    return Promise.resolve();
  });
};

Venmo.prototype._cancelVenmoDesktopContext = function () {
  var self = this;

  return this._createPromise.then(function () {
    if (self._venmoDesktopInstance) {
      self._venmoDesktopInstance.updateVenmoDesktopPaymentContext('CANCELED');
    }

    return Promise.resolve();
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/venmo.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * venmoInstance.teardown();
 * @example <caption>With callback</caption>
 * venmoInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {(Promise|void)} Returns a promise if no callback is provided.
 */
Venmo.prototype.teardown = function () {
  var self = this;

  this._removeVisibilityEventListener();

  return this._createPromise.then(function () {
    if (self._venmoDesktopInstance) {
      self._venmoDesktopInstance.teardown();
    }

    clearTimeout(self._refreshPaymentContextTimeout);
    self._cancelMobilePaymentContext();

    convertMethodsToError(this, methods(Venmo.prototype));
  }.bind(this));
};

Venmo.prototype._removeVisibilityEventListener = function () {
  window.removeEventListener('hashchange', this._onHashChangeListener);
  window.document.removeEventListener(documentVisibilityChangeEventName(), this._visibilityChangeListener);

  delete this._visibilityChangeListener;
  delete this._onHashChangeListener;
};

Venmo.prototype.processResultsFromHash = function (hash) {
  var self = this;
  var params = getFragmentParameters(hash);

  return new Promise(function (resolve, reject) {
    if (params.venmoSuccess) {
      analytics.sendEvent(self._createPromise, 'venmo.appswitch.handle.success');

      if (params.resource_id && !self._shouldUseLegacyFlow) {
        self._queryPaymentContextStatus(params.resource_id).then(function (result) {
          if (result.status !== 'APPROVED') {
            analytics.sendEvent(self._createPromise, 'venmo.process-results.unexpected-payment-context-status.' + result.status.toLowerCase());
            resolve(params);

            return;
          }
          resolve({
            paymentMethodNonce: result.paymentMethodId,
            username: result.userName
          });
        }).catch(function () {
          analytics.sendEvent(self._createPromise, 'venmo.process-results.payment-context-status-query-failed');
          resolve(params);
        });
      } else {
        resolve(params);
      }
    } else if (params.venmoError) {
      analytics.sendEvent(self._createPromise, 'venmo.appswitch.handle.error');
      reject(new BraintreeError({
        type: errors.VENMO_APP_FAILED.type,
        code: errors.VENMO_APP_FAILED.code,
        message: errors.VENMO_APP_FAILED.message,
        details: {
          originalError: {
            message: decodeURIComponent(params.errorMessage),
            code: params.errorCode
          }
        }
      }));
    } else if (params.venmoCancel) {
      analytics.sendEvent(self._createPromise, 'venmo.appswitch.handle.cancel');
      reject(new BraintreeError(errors.VENMO_APP_CANCELED));
    } else {
      // User has either manually switched back to browser, or app is not available for app switch
      analytics.sendEvent(self._createPromise, 'venmo.appswitch.cancel-or-unavailable');
      reject(new BraintreeError(errors.VENMO_CANCELED));
    }

    self._clearFragmentParameters();
  });
};

Venmo.prototype._clearFragmentParameters = function () {
  if (this._ignoreHistoryChanges) {
    return;
  }

  if (typeof window.history.replaceState === 'function' && window.location.hash) {
    history.pushState({}, '', window.location.href.slice(0, window.location.href.indexOf('#')));
  }
};

function getFragmentParameters(hash) {
  var keyValuesArray = (hash || window.location.hash.substring(1)).split('&');

  return keyValuesArray.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split('=');
    // some Single Page Apps may pre-pend a / to the first value
    // in the hash, assuming it's a route in their app
    // instead of information from Venmo, this removes all
    // non-alphanumeric characters from the keys in the params
    var key = decodeURIComponent(parts[0]).replace(/\W/g, '');
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;

    return toReturn;
  }, {});
}

function formatTokenizePayload(payload) {
  return {
    nonce: payload.paymentMethodNonce,
    type: 'VenmoAccount',
    details: {
      // NEXT_MAJOR_VERSION the web sdks have a prepended @ sign
      // but the ios and android ones do not. This should be standardized
      username: payload.username
    }
  };
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function documentVisibilityChangeEventName() {
  var visibilityChange;

  if (typeof window.document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    visibilityChange = 'visibilitychange';
  } else if (typeof window.document.msHidden !== 'undefined') {
    visibilityChange = 'msvisibilitychange';
  } else if (typeof window.document.webkitHidden !== 'undefined') {
    visibilityChange = 'webkitvisibilitychange';
  }

  return visibilityChange;
}

function isIosWebviewInDeepLinkReturnUrlFlow() {
  // we know it's a webview because this flow only gets
  // used when checking the deep link flow
  // test the platform here to get around custom useragents
  return window.navigator.platform &&
    /iPhone|iPad|iPod/.test(window.navigator.platform);
}

module.exports = wrapPromise.wrapPrototype(Venmo);

},{"../lib/analytics":93,"../lib/braintree-error":98,"../lib/convert-methods-to-error":100,"../lib/in-iframe":123,"../lib/is-verified-domain":126,"../lib/methods":128,"../lib/promise":130,"../lib/querystring":131,"./external/":154,"./external/queries":155,"./shared/browser-detection":158,"./shared/constants":159,"./shared/errors":160,"./shared/supports-venmo":162,"@braintree/extended-promise":41,"@braintree/wrap-promise":50}],164:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var cardTypes = require("./lib/card-types");
var add_matching_cards_to_results_1 = require("./lib/add-matching-cards-to-results");
var is_valid_input_type_1 = require("./lib/is-valid-input-type");
var find_best_match_1 = require("./lib/find-best-match");
var clone_1 = require("./lib/clone");
var customCards = {};
var cardNames = {
    VISA: "visa",
    MASTERCARD: "mastercard",
    AMERICAN_EXPRESS: "american-express",
    DINERS_CLUB: "diners-club",
    DISCOVER: "discover",
    JCB: "jcb",
    UNIONPAY: "unionpay",
    MAESTRO: "maestro",
    ELO: "elo",
    MIR: "mir",
    HIPER: "hiper",
    HIPERCARD: "hipercard",
};
var ORIGINAL_TEST_ORDER = [
    cardNames.VISA,
    cardNames.MASTERCARD,
    cardNames.AMERICAN_EXPRESS,
    cardNames.DINERS_CLUB,
    cardNames.DISCOVER,
    cardNames.JCB,
    cardNames.UNIONPAY,
    cardNames.MAESTRO,
    cardNames.ELO,
    cardNames.MIR,
    cardNames.HIPER,
    cardNames.HIPERCARD,
];
var testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
function findType(cardType) {
    return customCards[cardType] || cardTypes[cardType];
}
function getAllCardTypes() {
    return testOrder.map(function (cardType) { return clone_1.clone(findType(cardType)); });
}
function getCardPosition(name, ignoreErrorForNotExisting) {
    if (ignoreErrorForNotExisting === void 0) { ignoreErrorForNotExisting = false; }
    var position = testOrder.indexOf(name);
    if (!ignoreErrorForNotExisting && position === -1) {
        throw new Error('"' + name + '" is not a supported card type.');
    }
    return position;
}
function creditCardType(cardNumber) {
    var results = [];
    if (!is_valid_input_type_1.isValidInputType(cardNumber)) {
        return results;
    }
    if (cardNumber.length === 0) {
        return getAllCardTypes();
    }
    testOrder.forEach(function (cardType) {
        var cardConfiguration = findType(cardType);
        add_matching_cards_to_results_1.addMatchingCardsToResults(cardNumber, cardConfiguration, results);
    });
    var bestMatch = find_best_match_1.findBestMatch(results);
    if (bestMatch) {
        return [bestMatch];
    }
    return results;
}
creditCardType.getTypeInfo = function (cardType) {
    return clone_1.clone(findType(cardType));
};
creditCardType.removeCard = function (name) {
    var position = getCardPosition(name);
    testOrder.splice(position, 1);
};
creditCardType.addCard = function (config) {
    var existingCardPosition = getCardPosition(config.type, true);
    customCards[config.type] = config;
    if (existingCardPosition === -1) {
        testOrder.push(config.type);
    }
};
creditCardType.updateCard = function (cardType, updates) {
    var originalObject = customCards[cardType] || cardTypes[cardType];
    if (!originalObject) {
        throw new Error("\"" + cardType + "\" is not a recognized type. Use `addCard` instead.'");
    }
    if (updates.type && originalObject.type !== updates.type) {
        throw new Error("Cannot overwrite type parameter.");
    }
    var clonedCard = clone_1.clone(originalObject);
    clonedCard = __assign(__assign({}, clonedCard), updates);
    customCards[clonedCard.type] = clonedCard;
};
creditCardType.changeOrder = function (name, position) {
    var currentPosition = getCardPosition(name);
    testOrder.splice(currentPosition, 1);
    testOrder.splice(position, 0, name);
};
creditCardType.resetModifications = function () {
    testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
    customCards = {};
};
creditCardType.types = cardNames;
module.exports = creditCardType;

},{"./lib/add-matching-cards-to-results":165,"./lib/card-types":166,"./lib/clone":167,"./lib/find-best-match":168,"./lib/is-valid-input-type":169}],165:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMatchingCardsToResults = void 0;
var clone_1 = require("./clone");
var matches_1 = require("./matches");
function addMatchingCardsToResults(cardNumber, cardConfiguration, results) {
    var i, patternLength;
    for (i = 0; i < cardConfiguration.patterns.length; i++) {
        var pattern = cardConfiguration.patterns[i];
        if (!matches_1.matches(cardNumber, pattern)) {
            continue;
        }
        var clonedCardConfiguration = clone_1.clone(cardConfiguration);
        if (Array.isArray(pattern)) {
            patternLength = String(pattern[0]).length;
        }
        else {
            patternLength = String(pattern).length;
        }
        if (cardNumber.length >= patternLength) {
            clonedCardConfiguration.matchStrength = patternLength;
        }
        results.push(clonedCardConfiguration);
        break;
    }
}
exports.addMatchingCardsToResults = addMatchingCardsToResults;

},{"./clone":167,"./matches":170}],166:[function(require,module,exports){
"use strict";
var cardTypes = {
    visa: {
        niceType: "Visa",
        type: "visa",
        patterns: [4],
        gaps: [4, 8, 12],
        lengths: [16, 18, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    mastercard: {
        niceType: "Mastercard",
        type: "mastercard",
        patterns: [[51, 55], [2221, 2229], [223, 229], [23, 26], [270, 271], 2720],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    "american-express": {
        niceType: "American Express",
        type: "american-express",
        patterns: [34, 37],
        gaps: [4, 10],
        lengths: [15],
        code: {
            name: "CID",
            size: 4,
        },
    },
    "diners-club": {
        niceType: "Diners Club",
        type: "diners-club",
        patterns: [[300, 305], 36, 38, 39],
        gaps: [4, 10],
        lengths: [14, 16, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    discover: {
        niceType: "Discover",
        type: "discover",
        patterns: [6011, [644, 649], 65],
        gaps: [4, 8, 12],
        lengths: [16, 19],
        code: {
            name: "CID",
            size: 3,
        },
    },
    jcb: {
        niceType: "JCB",
        type: "jcb",
        patterns: [2131, 1800, [3528, 3589]],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: "CVV",
            size: 3,
        },
    },
    unionpay: {
        niceType: "UnionPay",
        type: "unionpay",
        patterns: [
            620,
            [624, 626],
            [62100, 62182],
            [62184, 62187],
            [62185, 62197],
            [62200, 62205],
            [622010, 622999],
            622018,
            [622019, 622999],
            [62207, 62209],
            [622126, 622925],
            [623, 626],
            6270,
            6272,
            6276,
            [627700, 627779],
            [627781, 627799],
            [6282, 6289],
            6291,
            6292,
            810,
            [8110, 8131],
            [8132, 8151],
            [8152, 8163],
            [8164, 8171],
        ],
        gaps: [4, 8, 12],
        lengths: [14, 15, 16, 17, 18, 19],
        code: {
            name: "CVN",
            size: 3,
        },
    },
    maestro: {
        niceType: "Maestro",
        type: "maestro",
        patterns: [
            493698,
            [500000, 504174],
            [504176, 506698],
            [506779, 508999],
            [56, 59],
            63,
            67,
            6,
        ],
        gaps: [4, 8, 12],
        lengths: [12, 13, 14, 15, 16, 17, 18, 19],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    elo: {
        niceType: "Elo",
        type: "elo",
        patterns: [
            401178,
            401179,
            438935,
            457631,
            457632,
            431274,
            451416,
            457393,
            504175,
            [506699, 506778],
            [509000, 509999],
            627780,
            636297,
            636368,
            [650031, 650033],
            [650035, 650051],
            [650405, 650439],
            [650485, 650538],
            [650541, 650598],
            [650700, 650718],
            [650720, 650727],
            [650901, 650978],
            [651652, 651679],
            [655000, 655019],
            [655021, 655058],
        ],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVE",
            size: 3,
        },
    },
    mir: {
        niceType: "Mir",
        type: "mir",
        patterns: [[2200, 2204]],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: "CVP2",
            size: 3,
        },
    },
    hiper: {
        niceType: "Hiper",
        type: "hiper",
        patterns: [637095, 63737423, 63743358, 637568, 637599, 637609, 637612],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
    hipercard: {
        niceType: "Hipercard",
        type: "hipercard",
        patterns: [606282],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            size: 3,
        },
    },
};
module.exports = cardTypes;

},{}],167:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
function clone(originalObject) {
    if (!originalObject) {
        return null;
    }
    return JSON.parse(JSON.stringify(originalObject));
}
exports.clone = clone;

},{}],168:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBestMatch = void 0;
function hasEnoughResultsToDetermineBestMatch(results) {
    var numberOfResultsWithMaxStrengthProperty = results.filter(function (result) { return result.matchStrength; }).length;
    /*
     * if all possible results have a maxStrength property that means the card
     * number is sufficiently long enough to determine conclusively what the card
     * type is
     * */
    return (numberOfResultsWithMaxStrengthProperty > 0 &&
        numberOfResultsWithMaxStrengthProperty === results.length);
}
function findBestMatch(results) {
    if (!hasEnoughResultsToDetermineBestMatch(results)) {
        return null;
    }
    return results.reduce(function (bestMatch, result) {
        if (!bestMatch) {
            return result;
        }
        /*
         * If the current best match pattern is less specific than this result, set
         * the result as the new best match
         * */
        if (Number(bestMatch.matchStrength) < Number(result.matchStrength)) {
            return result;
        }
        return bestMatch;
    });
}
exports.findBestMatch = findBestMatch;

},{}],169:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidInputType = void 0;
function isValidInputType(cardNumber) {
    return typeof cardNumber === "string" || cardNumber instanceof String;
}
exports.isValidInputType = isValidInputType;

},{}],170:[function(require,module,exports){
"use strict";
/*
 * Adapted from https://github.com/polvo-labs/card-type/blob/aaab11f80fa1939bccc8f24905a06ae3cd864356/src/cardType.js#L37-L42
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
function matchesRange(cardNumber, min, max) {
    var maxLengthToCheck = String(min).length;
    var substr = cardNumber.substr(0, maxLengthToCheck);
    var integerRepresentationOfCardNumber = parseInt(substr, 10);
    min = parseInt(String(min).substr(0, substr.length), 10);
    max = parseInt(String(max).substr(0, substr.length), 10);
    return (integerRepresentationOfCardNumber >= min &&
        integerRepresentationOfCardNumber <= max);
}
function matchesPattern(cardNumber, pattern) {
    pattern = String(pattern);
    return (pattern.substring(0, cardNumber.length) ===
        cardNumber.substring(0, pattern.length));
}
function matches(cardNumber, pattern) {
    if (Array.isArray(pattern)) {
        return matchesRange(cardNumber, pattern[0], pattern[1]);
    }
    return matchesPattern(cardNumber, pattern);
}
exports.matches = matches;

},{}],171:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framebus = void 0;
var is_not_string_1 = require("./lib/is-not-string");
var subscription_args_invalid_1 = require("./lib/subscription-args-invalid");
var broadcast_1 = require("./lib/broadcast");
var package_payload_1 = require("./lib/package-payload");
var constants_1 = require("./lib/constants");
var DefaultPromise = (typeof window !== "undefined" &&
    window.Promise);
var Framebus = /** @class */ (function () {
    function Framebus(options) {
        if (options === void 0) { options = {}; }
        this.origin = options.origin || "*";
        this.channel = options.channel || "";
        this.verifyDomain = options.verifyDomain;
        this.isDestroyed = false;
        this.listeners = [];
    }
    Framebus.setPromise = function (PromiseGlobal) {
        Framebus.Promise = PromiseGlobal;
    };
    Framebus.target = function (options) {
        return new Framebus(options);
    };
    Framebus.prototype.include = function (childWindow) {
        if (childWindow == null) {
            return false;
        }
        if (childWindow.Window == null) {
            return false;
        }
        if (childWindow.constructor !== childWindow.Window) {
            return false;
        }
        constants_1.childWindows.push(childWindow);
        return true;
    };
    Framebus.prototype.target = function (options) {
        return Framebus.target(options);
    };
    Framebus.prototype.emit = function (eventName, data, reply) {
        if (this.isDestroyed) {
            return false;
        }
        var origin = this.origin;
        eventName = this.namespaceEvent(eventName);
        if (is_not_string_1.isntString(eventName)) {
            return false;
        }
        if (is_not_string_1.isntString(origin)) {
            return false;
        }
        if (typeof data === "function") {
            reply = data;
            data = undefined; // eslint-disable-line no-undefined
        }
        var payload = package_payload_1.packagePayload(eventName, origin, data, reply);
        if (!payload) {
            return false;
        }
        broadcast_1.broadcast(window.top || window.self, payload, origin);
        return true;
    };
    Framebus.prototype.emitAsPromise = function (eventName, data) {
        var _this = this;
        return new Framebus.Promise(function (resolve, reject) {
            var didAttachListener = _this.emit(eventName, data, function (payload) {
                resolve(payload);
            });
            if (!didAttachListener) {
                reject(new Error("Listener not added for \"" + eventName + "\""));
            }
        });
    };
    Framebus.prototype.on = function (eventName, originalHandler) {
        if (this.isDestroyed) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        var origin = this.origin;
        var handler = originalHandler;
        eventName = this.namespaceEvent(eventName);
        if (subscription_args_invalid_1.subscriptionArgsInvalid(eventName, handler, origin)) {
            return false;
        }
        if (this.verifyDomain) {
            /* eslint-disable no-invalid-this, @typescript-eslint/ban-ts-comment */
            handler = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // @ts-ignore
                if (self.checkOrigin(this && this.origin)) {
                    originalHandler.apply(void 0, args);
                }
            };
            /* eslint-enable no-invalid-this, @typescript-eslint/ban-ts-comment */
        }
        this.listeners.push({
            eventName: eventName,
            handler: handler,
            originalHandler: originalHandler,
        });
        constants_1.subscribers[origin] = constants_1.subscribers[origin] || {};
        constants_1.subscribers[origin][eventName] = constants_1.subscribers[origin][eventName] || [];
        constants_1.subscribers[origin][eventName].push(handler);
        return true;
    };
    Framebus.prototype.off = function (eventName, originalHandler) {
        var handler = originalHandler;
        if (this.isDestroyed) {
            return false;
        }
        if (this.verifyDomain) {
            for (var i = 0; i < this.listeners.length; i++) {
                var listener = this.listeners[i];
                if (listener.originalHandler === originalHandler) {
                    handler = listener.handler;
                }
            }
        }
        eventName = this.namespaceEvent(eventName);
        var origin = this.origin;
        if (subscription_args_invalid_1.subscriptionArgsInvalid(eventName, handler, origin)) {
            return false;
        }
        var subscriberList = constants_1.subscribers[origin] && constants_1.subscribers[origin][eventName];
        if (!subscriberList) {
            return false;
        }
        for (var i = 0; i < subscriberList.length; i++) {
            if (subscriberList[i] === handler) {
                subscriberList.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Framebus.prototype.teardown = function () {
        if (this.isDestroyed) {
            return;
        }
        this.isDestroyed = true;
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            this.off(listener.eventName, listener.handler);
        }
        this.listeners.length = 0;
    };
    Framebus.prototype.checkOrigin = function (postMessageOrigin) {
        var merchantHost;
        var a = document.createElement("a");
        a.href = location.href;
        if (a.protocol === "https:") {
            merchantHost = a.host.replace(/:443$/, "");
        }
        else if (a.protocol === "http:") {
            merchantHost = a.host.replace(/:80$/, "");
        }
        else {
            merchantHost = a.host;
        }
        var merchantOrigin = a.protocol + "//" + merchantHost;
        if (merchantOrigin === postMessageOrigin) {
            return true;
        }
        if (this.verifyDomain) {
            return this.verifyDomain(postMessageOrigin);
        }
        return true;
    };
    Framebus.prototype.namespaceEvent = function (eventName) {
        if (!this.channel) {
            return eventName;
        }
        return this.channel + ":" + eventName;
    };
    Framebus.Promise = DefaultPromise;
    return Framebus;
}());
exports.Framebus = Framebus;

},{"./lib/broadcast":175,"./lib/constants":176,"./lib/is-not-string":179,"./lib/package-payload":181,"./lib/subscription-args-invalid":183}],172:[function(require,module,exports){
"use strict";
var attach_1 = require("./lib/attach");
var framebus_1 = require("./framebus");
attach_1.attach();
module.exports = framebus_1.Framebus;

},{"./framebus":171,"./lib/attach":173}],173:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detach = exports.attach = void 0;
var message_1 = require("./message");
var isAttached = false;
function attach() {
    if (isAttached || typeof window === "undefined") {
        return;
    }
    isAttached = true;
    window.addEventListener("message", message_1.onmessage, false);
}
exports.attach = attach;
// removeIf(production)
function detach() {
    isAttached = false;
    window.removeEventListener("message", message_1.onmessage, false);
}
exports.detach = detach;
// endRemoveIf(production)

},{"./message":180}],174:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastToChildWindows = void 0;
var broadcast_1 = require("./broadcast");
var constants_1 = require("./constants");
function broadcastToChildWindows(payload, origin, source) {
    for (var i = constants_1.childWindows.length - 1; i >= 0; i--) {
        var childWindow = constants_1.childWindows[i];
        if (childWindow.closed) {
            constants_1.childWindows.splice(i, 1);
        }
        else if (source !== childWindow) {
            broadcast_1.broadcast(childWindow.top, payload, origin);
        }
    }
}
exports.broadcastToChildWindows = broadcastToChildWindows;

},{"./broadcast":175,"./constants":176}],175:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = void 0;
var has_opener_1 = require("./has-opener");
function broadcast(frame, payload, origin) {
    var i = 0;
    var frameToBroadcastTo;
    try {
        frame.postMessage(payload, origin);
        if (has_opener_1.hasOpener(frame) && frame.opener.top !== window.top) {
            broadcast(frame.opener.top, payload, origin);
        }
        // previously, our max value was frame.frames.length
        // but frames.length inherits from window.length
        // which can be overwritten if a developer does
        // `var length = value;` outside of a function
        // scope, it'll prevent us from looping through
        // all the frames. With this, we loop through
        // until there are no longer any frames
        // eslint-disable-next-line no-cond-assign
        while ((frameToBroadcastTo = frame.frames[i])) {
            broadcast(frameToBroadcastTo, payload, origin);
            i++;
        }
    }
    catch (_) {
        /* ignored */
    }
}
exports.broadcast = broadcast;

},{"./has-opener":178}],176:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribers = exports.childWindows = exports.prefix = void 0;
exports.prefix = "/*framebus*/";
exports.childWindows = [];
exports.subscribers = {};

},{}],177:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = void 0;
var constants_1 = require("./constants");
function dispatch(origin, event, data, reply, e) {
    if (!constants_1.subscribers[origin]) {
        return;
    }
    if (!constants_1.subscribers[origin][event]) {
        return;
    }
    var args = [];
    if (data) {
        args.push(data);
    }
    if (reply) {
        args.push(reply);
    }
    for (var i = 0; i < constants_1.subscribers[origin][event].length; i++) {
        constants_1.subscribers[origin][event][i].apply(e, args);
    }
}
exports.dispatch = dispatch;

},{"./constants":176}],178:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOpener = void 0;
function hasOpener(frame) {
    if (frame.top !== frame) {
        return false;
    }
    if (frame.opener == null) {
        return false;
    }
    if (frame.opener === frame) {
        return false;
    }
    if (frame.opener.closed === true) {
        return false;
    }
    return true;
}
exports.hasOpener = hasOpener;

},{}],179:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isntString = void 0;
function isntString(str) {
    return typeof str !== "string";
}
exports.isntString = isntString;

},{}],180:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onmessage = void 0;
var is_not_string_1 = require("./is-not-string");
var unpack_payload_1 = require("./unpack-payload");
var dispatch_1 = require("./dispatch");
var broadcast_to_child_windows_1 = require("./broadcast-to-child-windows");
function onmessage(e) {
    if (is_not_string_1.isntString(e.data)) {
        return;
    }
    var payload = unpack_payload_1.unpackPayload(e);
    if (!payload) {
        return;
    }
    var data = payload.eventData;
    var reply = payload.reply;
    dispatch_1.dispatch("*", payload.event, data, reply, e);
    dispatch_1.dispatch(e.origin, payload.event, data, reply, e);
    broadcast_to_child_windows_1.broadcastToChildWindows(e.data, payload.origin, e.source);
}
exports.onmessage = onmessage;

},{"./broadcast-to-child-windows":174,"./dispatch":177,"./is-not-string":179,"./unpack-payload":184}],181:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packagePayload = void 0;
var subscribe_replier_1 = require("./subscribe-replier");
var constants_1 = require("./constants");
function packagePayload(event, origin, data, reply) {
    var packaged;
    var payload = {
        event: event,
        origin: origin,
    };
    if (typeof reply === "function") {
        payload.reply = subscribe_replier_1.subscribeReplier(reply, origin);
    }
    payload.eventData = data;
    try {
        packaged = constants_1.prefix + JSON.stringify(payload);
    }
    catch (e) {
        throw new Error("Could not stringify event: " + e.message);
    }
    return packaged;
}
exports.packagePayload = packagePayload;

},{"./constants":176,"./subscribe-replier":182}],182:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeReplier = void 0;
var framebus_1 = require("../framebus");
var uuid_1 = __importDefault(require("@braintree/uuid"));
function subscribeReplier(fn, origin) {
    var uuid = uuid_1.default();
    function replier(data, replyOriginHandler) {
        fn(data, replyOriginHandler);
        framebus_1.Framebus.target({
            origin: origin,
        }).off(uuid, replier);
    }
    framebus_1.Framebus.target({
        origin: origin,
    }).on(uuid, replier);
    return uuid;
}
exports.subscribeReplier = subscribeReplier;

},{"../framebus":171,"@braintree/uuid":46}],183:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionArgsInvalid = void 0;
var is_not_string_1 = require("./is-not-string");
function subscriptionArgsInvalid(event, fn, origin) {
    if (is_not_string_1.isntString(event)) {
        return true;
    }
    if (typeof fn !== "function") {
        return true;
    }
    return is_not_string_1.isntString(origin);
}
exports.subscriptionArgsInvalid = subscriptionArgsInvalid;

},{"./is-not-string":179}],184:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackPayload = void 0;
var constants_1 = require("./constants");
var package_payload_1 = require("./package-payload");
function unpackPayload(e) {
    var payload;
    if (e.data.slice(0, constants_1.prefix.length) !== constants_1.prefix) {
        return false;
    }
    try {
        payload = JSON.parse(e.data.slice(constants_1.prefix.length));
    }
    catch (err) {
        return false;
    }
    if (payload.reply) {
        var replyOrigin_1 = e.origin;
        var replySource_1 = e.source;
        var replyEvent_1 = payload.reply;
        payload.reply = function reply(replyData) {
            if (!replySource_1) {
                return;
            }
            var replyPayload = package_payload_1.packagePayload(replyEvent_1, replyOrigin_1, replyData);
            if (!replyPayload) {
                return;
            }
            replySource_1.postMessage(replyPayload, replyOrigin_1);
        };
    }
    return payload;
}
exports.unpackPayload = unpackPayload;

},{"./constants":176,"./package-payload":181}],185:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],186:[function(require,module,exports){
(function (setImmediate){(function (){
'use strict';

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

function allSettled(arr) {
  var P = this;
  return new P(function(resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(
        new TypeError(
          typeof arr +
            ' ' +
            arr +
            ' is not iterable(cannot read property Symbol(Symbol.iterator))'
        )
      );
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        var then = val.then;
        if (typeof then === 'function') {
          then.call(
            val,
            function(val) {
              res(i, val);
            },
            function(e) {
              args[i] = { status: 'rejected', reason: e };
              if (--remaining === 0) {
                resolve(args);
              }
            }
          );
          return;
        }
      }
      args[i] = { status: 'fulfilled', value: val };
      if (--remaining === 0) {
        resolve(args);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.allSettled = allSettled;

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

}).call(this)}).call(this,require("timers").setImmediate)
},{"timers":190}],187:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIos = exports.isIE9 = exports.isSamsungBrowser = exports.isAndroidChrome = exports.isKitKatWebview = void 0;
// server side rendering check
var UA = (typeof window !== "undefined" &&
    window.navigator &&
    window.navigator.userAgent);
// TODO remove this when browser detection is converted to typescript
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
var isAndroid = require("@braintree/browser-detection/is-android");
// @ts-ignore
var isChromeOs = require("@braintree/browser-detection/is-chrome-os");
// @ts-ignore
var isChrome = require("@braintree/browser-detection/is-chrome");
// @ts-ignore
var isIos = require("@braintree/browser-detection/is-ios");
exports.isIos = isIos;
// @ts-ignore
var isIE9 = require("@braintree/browser-detection/is-ie9");
exports.isIE9 = isIE9;
/* eslint-enable @typescript-eslint/ban-ts-ignore */
// Old Android Webviews used specific versions of Chrome with 0.0.0 as their version suffix
// https://developer.chrome.com/multidevice/user-agent#webview_user_agent
var KITKAT_WEBVIEW_REGEX = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;
function isOldSamsungBrowserOrSamsungWebview(ua) {
    return !isChrome(ua) && ua.indexOf("Samsung") > -1;
}
function isKitKatWebview(ua) {
    if (ua === void 0) { ua = UA; }
    return isAndroid(ua) && KITKAT_WEBVIEW_REGEX.test(ua);
}
exports.isKitKatWebview = isKitKatWebview;
function isAndroidChrome(ua) {
    if (ua === void 0) { ua = UA; }
    return (isAndroid(ua) || isChromeOs(ua)) && isChrome(ua);
}
exports.isAndroidChrome = isAndroidChrome;
function isSamsungBrowser(ua) {
    if (ua === void 0) { ua = UA; }
    return /SamsungBrowser/.test(ua) || isOldSamsungBrowserOrSamsungWebview(ua);
}
exports.isSamsungBrowser = isSamsungBrowser;

},{"@braintree/browser-detection/is-android":26,"@braintree/browser-detection/is-chrome":28,"@braintree/browser-detection/is-chrome-os":27,"@braintree/browser-detection/is-ie9":33,"@braintree/browser-detection/is-ios":37}],188:[function(require,module,exports){
"use strict";
var device_1 = require("./lib/device");
module.exports = function supportsInputFormatting() {
    // Digits get dropped in samsung browser
    return !device_1.isSamsungBrowser();
};

},{"./lib/device":187}],189:[function(require,module,exports){
module.exports = require("./dist/supports-input-formatting");

},{"./dist/supports-input-formatting":188}],190:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":185,"timers":190}],191:[function(require,module,exports){
'use strict';

module.exports = {
  paymentOptionIDs: {
    card: 'card',
    paypal: 'paypal',
    paypalCredit: 'paypalCredit',
    applePay: 'applePay',
    venmo: 'venmo',
    googlePay: 'googlePay'
  },
  paymentMethodTypes: {
    card: 'CreditCard',
    paypal: 'PayPalAccount',
    paypalCredit: 'PayPalAccount',
    applePay: 'ApplePayCard',
    venmo: 'VenmoAccount',
    googlePay: 'AndroidPayCard'
  },
  analyticsKinds: {
    CreditCard: 'card',
    PayPalAccount: 'paypal',
    ApplePayCard: 'applepay',
    VenmoAccount: 'venmo',
    AndroidPayCard: 'googlepay'
  },
  paymentMethodCardTypes: {
    Visa: 'visa',
    MasterCard: 'master-card',
    'American Express': 'american-express',
    'Diners Club': 'diners-club',
    Discover: 'discover',
    JCB: 'jcb',
    UnionPay: 'unionpay',
    Maestro: 'maestro'
  },
  configurationCardTypes: {
    visa: 'Visa',
    'master-card': 'MasterCard',
    'american-express': 'American Express',
    'diners-club': 'Discover',
    discover: 'Discover',
    jcb: 'JCB',
    unionpay: 'UnionPay',
    maestro: 'Maestro'
  },
  dependencySetupStates: {
    DONE: 'done',
    FAILED: 'failed',
    INITIALIZING: 'initializing',
    NOT_ENABLED: 'not-enabled'
  },
  errors: {
    NO_PAYMENT_METHOD_ERROR: 'No payment method is available.',
    DEVELOPER_MISCONFIGURATION_MESSAGE: 'Developer Error: Something went wrong. Check the console for details.'
  },
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  ANALYTICS_PREFIX: 'web.dropin.',
  CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT: 200,
  CHECKOUT_JS_SOURCE: 'https://www.paypalobjects.com/api/checkout.min.js',
  GOOGLE_PAYMENT_SOURCE: 'https://pay.google.com/gp/p/js/pay.js',
  INTEGRATION: 'dropin2',
  PAYPAL_CHECKOUT_SCRIPT_ID: 'braintree-dropin-paypal-checkout-script',
  GOOGLE_PAYMENT_SCRIPT_ID: 'braintree-dropin-google-payment-script',
  DATA_COLLECTOR_SCRIPT_ID: 'braintree-dropin-data-collector-script',
  STYLESHEET_ID: 'braintree-dropin-stylesheet'
};

},{}],192:[function(require,module,exports){
'use strict';

var analytics = require('./lib/analytics');
var DropinError = require('./lib/dropin-error');
var EventEmitter = require('@braintree/event-emitter');
var constants = require('./constants');
var paymentMethodTypes = constants.paymentMethodTypes;
var paymentOptionIDs = constants.paymentOptionIDs;
var dependencySetupStates = constants.dependencySetupStates;
var isGuestCheckout = require('./lib/is-guest-checkout');
var Promise = require('./lib/promise');
var paymentSheetViews = require('./views/payment-sheet-views');
var vaultManager = require('braintree-web/vault-manager');

var VAULTED_PAYMENT_METHOD_TYPES_THAT_SHOULD_BE_HIDDEN = [
  paymentMethodTypes.applePay,
  paymentMethodTypes.googlePay,
  paymentMethodTypes.venmo
];
var DEFAULT_PAYMENT_OPTION_PRIORITY = [
  paymentOptionIDs.card,
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit,
  paymentOptionIDs.venmo,
  paymentOptionIDs.applePay,
  paymentOptionIDs.googlePay
];
var NON_PAYMENT_OPTION_DEPENDENCIES = ['threeDSecure', 'dataCollector'];
var ASYNC_DEPENDENCIES = DEFAULT_PAYMENT_OPTION_PRIORITY.concat(NON_PAYMENT_OPTION_DEPENDENCIES);
var DEPENDENCY_READY_CHECK_INTERVAL = 200;

function DropinModel(options) {
  this.rootNode = options.container;
  this.componentID = options.componentID;
  this.merchantConfiguration = options.merchantConfiguration;
  this.isGuestCheckout = isGuestCheckout(options.client);
  this.dependencyStates = ASYNC_DEPENDENCIES.reduce(function (total, dependencyKey) {
    if (this._shouldIncludeDependency(dependencyKey)) {
      total[dependencyKey] = dependencySetupStates.INITIALIZING;
    }

    return total;
  }.bind(this), {});

  this.failedDependencies = {};
  this._options = options;
  this._setupComplete = false;

  while (this.rootNode.parentNode) {
    this.rootNode = this.rootNode.parentNode;
  }
  this.isInShadowDom = this.rootNode.toString() === '[object ShadowRoot]';

  EventEmitter.call(this);
}

EventEmitter.createChild(DropinModel);

DropinModel.prototype.initialize = function () {
  var dep;
  var self = this;
  var dependencyReadyInterval = setInterval(function () {
    for (dep in self.dependencyStates) {
      if (self.dependencyStates[dep] === dependencySetupStates.INITIALIZING) {
        return;
      }
    }

    clearInterval(dependencyReadyInterval);

    self._emit('asyncDependenciesReady');
  }, DEPENDENCY_READY_CHECK_INTERVAL);

  return vaultManager.create({
    client: self._options.client
  }).then(function (vaultManagerInstance) {
    self._vaultManager = vaultManagerInstance;

    return self._getSupportedPaymentOptions(self._options);
  }).then(function (paymentOptions) {
    self.supportedPaymentOptions = paymentOptions;

    return self.getVaultedPaymentMethods();
  }).then(function (paymentMethods) {
    self._paymentMethods = paymentMethods;
    self._paymentMethodIsRequestable = self._paymentMethods.length > 0;
  });
};

DropinModel.prototype.confirmDropinReady = function () {
  this._setupComplete = true;
};

DropinModel.prototype.isPaymentMethodRequestable = function () {
  return Boolean(this._paymentMethodIsRequestable);
};

DropinModel.prototype.addPaymentMethod = function (paymentMethod) {
  this._paymentMethods.push(paymentMethod);
  this._emit('addPaymentMethod', paymentMethod);
  this.changeActivePaymentMethod(paymentMethod);
};

DropinModel.prototype.removePaymentMethod = function (paymentMethod) {
  var paymentMethodLocation = this._paymentMethods.indexOf(paymentMethod);

  if (paymentMethodLocation === -1) {
    return;
  }

  this._paymentMethods.splice(paymentMethodLocation, 1);
  this._emit('removePaymentMethod', paymentMethod);
};

DropinModel.prototype.refreshPaymentMethods = function () {
  var self = this;

  return self.getVaultedPaymentMethods().then(function (paymentMethods) {
    self._paymentMethods = paymentMethods;

    self._emit('refreshPaymentMethods');
  });
};

DropinModel.prototype.changeActivePaymentMethod = function (paymentMethod) {
  this._activePaymentMethod = paymentMethod;
  this._emit('changeActivePaymentMethod', paymentMethod);
};

DropinModel.prototype.changeActiveView = function (paymentViewID) {
  var previousViewId = this._activePaymentViewId;

  this._activePaymentViewId = paymentViewID;
  this._emit('changeActiveView', {
    previousViewId: previousViewId,
    newViewId: paymentViewID
  });
};

DropinModel.prototype.removeActivePaymentMethod = function () {
  this._activePaymentMethod = null;
  this._emit('removeActivePaymentMethod');
  this.setPaymentMethodRequestable({
    isRequestable: false
  });
};

DropinModel.prototype.selectPaymentOption = function (paymentViewID) {
  this._emit('paymentOptionSelected', {
    paymentOption: paymentViewID
  });
};

DropinModel.prototype.enableEditMode = function () {
  analytics.sendEvent(this._options.client, 'manager.appeared');
  this._isInEditMode = true;
  this._emit('enableEditMode');
};

DropinModel.prototype.disableEditMode = function () {
  this._isInEditMode = false;
  this._emit('disableEditMode');
};

DropinModel.prototype.isInEditMode = function () {
  return Boolean(this._isInEditMode);
};

DropinModel.prototype.confirmPaymentMethodDeletion = function (paymentMethod) {
  this._paymentMethodWaitingToBeDeleted = paymentMethod;
  this._emit('confirmPaymentMethodDeletion', paymentMethod);
};

DropinModel.prototype._shouldIncludeDependency = function (key) {
  if (key === 'card') {
    // card is turned on by default unless the merchant explicitly
    // passes a value of `false` or omits it from a custom
    // `paymentOptionPriority` array
    if (this.merchantConfiguration.card === false) {
      return false;
    }
  } else if (!this.merchantConfiguration[key]) {
    // if the merchant does not have the non-card dependency
    // configured, do not include the dependency
    return false;
  }

  if (NON_PAYMENT_OPTION_DEPENDENCIES.indexOf(key) > -1) {
    // if the dependency is not a payment option (3DS, data collector)
    // include it since the merchant configured Drop-in for it

    return true;
  }

  if (this.merchantConfiguration.paymentOptionPriority) {
    // if the merchant passed a custom `paymentOptionPriority` array,
    // only include the dependency if it was configured _and_
    // included in the array
    return this.merchantConfiguration.paymentOptionPriority.indexOf(key) > -1;
  }

  // otherwise, include it if it is a valid payment option
  return DEFAULT_PAYMENT_OPTION_PRIORITY.indexOf(key) > -1;
};

DropinModel.prototype._shouldEmitRequestableEvent = function (options) {
  var requestableStateHasNotChanged = this.isPaymentMethodRequestable() === options.isRequestable;
  var nonce = options.selectedPaymentMethod && options.selectedPaymentMethod.nonce;
  var nonceHasNotChanged = nonce === this._paymentMethodRequestableNonce;

  if (!this._setupComplete) {
    // don't emit event until after Drop-in is fully set up
    // fixes issues with lazy loading of imports where event
    // should not be emitted
    // https://github.com/braintree/braintree-web-drop-in/issues/511
    return false;
  }

  if (requestableStateHasNotChanged && (!options.isRequestable || nonceHasNotChanged)) {
    return false;
  }

  return true;
};

DropinModel.prototype.setPaymentMethodRequestable = function (options) {
  var shouldEmitEvent = this._shouldEmitRequestableEvent(options);
  var paymentMethodRequestableResponse = {
    paymentMethodIsSelected: Boolean(options.selectedPaymentMethod),
    type: options.type
  };

  this._paymentMethodIsRequestable = options.isRequestable;

  if (options.isRequestable) {
    this._paymentMethodRequestableNonce = options.selectedPaymentMethod && options.selectedPaymentMethod.nonce;
  } else {
    delete this._paymentMethodRequestableNonce;
  }

  if (!shouldEmitEvent) {
    return;
  }

  if (options.isRequestable) {
    this._emit('paymentMethodRequestable', paymentMethodRequestableResponse);
  } else {
    this._emit('noPaymentMethodRequestable');
  }
};

DropinModel.prototype.getPaymentMethods = function () {
  // we want to return a copy of the Array
  // so we can loop through it in dropin.updateConfiguration
  // while calling model.removePaymentMethod
  // which updates the original array
  return this._paymentMethods.slice();
};

DropinModel.prototype.getActivePaymentMethod = function () {
  return this._activePaymentMethod;
};

DropinModel.prototype.getActivePaymentViewId = function () {
  return this._activePaymentViewId;
};

DropinModel.prototype.reportAppSwitchPayload = function (payload) {
  this.appSwitchPayload = payload;
};

DropinModel.prototype.reportAppSwitchError = function (sheetId, error) {
  this.appSwitchError = {
    id: sheetId,
    error: error
  };
};

DropinModel.prototype.hasAtLeastOneAvailablePaymentOption = function () {
  var self = this;
  var i;

  for (i = 0; i < this.supportedPaymentOptions.length; i++) {
    if (self.dependencyStates[this.supportedPaymentOptions[i]] === dependencySetupStates.DONE) {
      return true;
    }
  }

  return false;
};

DropinModel.prototype.asyncDependencyReady = function (key) {
  this.dependencyStates[key] = dependencySetupStates.DONE;
};

DropinModel.prototype.asyncDependencyFailed = function (options) {
  if (this.failedDependencies.hasOwnProperty(options.view)) {
    return;
  }
  this.failedDependencies[options.view] = options.error;
  this.dependencyStates[options.view] = dependencySetupStates.FAILED;
};

DropinModel.prototype.cancelInitialization = function (error) {
  this._emit('cancelInitialization', error);
};

DropinModel.prototype.reportError = function (error) {
  this._emit('errorOccurred', error);
};

DropinModel.prototype.clearError = function () {
  this._emit('errorCleared');
};

DropinModel.prototype.preventUserAction = function () {
  this._emit('preventUserAction');
};

DropinModel.prototype.allowUserAction = function () {
  this._emit('allowUserAction');
};

DropinModel.prototype.deleteVaultedPaymentMethod = function () {
  var self = this;
  var promise = Promise.resolve();
  var error;

  this._emit('startVaultedPaymentMethodDeletion');

  if (!self.isGuestCheckout) {
    promise = this._vaultManager.deletePaymentMethod(this._paymentMethodWaitingToBeDeleted.nonce).catch(function (err) {
      error = err;
    });
  }

  return promise.then(function () {
    delete self._paymentMethodWaitingToBeDeleted;

    return self.refreshPaymentMethods();
  }).then(function () {
    self.disableEditMode();
    self._emit('finishVaultedPaymentMethodDeletion', error);
  });
};

DropinModel.prototype.cancelDeleteVaultedPaymentMethod = function () {
  this._emit('cancelVaultedPaymentMethodDeletion');

  delete this._paymentMethodWaitingToBeDeleted;
};

DropinModel.prototype.getVaultedPaymentMethods = function () {
  var self = this;

  if (self.isGuestCheckout) {
    return Promise.resolve([]);
  }

  return self._vaultManager.fetchPaymentMethods({
    defaultFirst: this.merchantConfiguration.showDefaultPaymentMethodFirst !== false
  }).then(function (paymentMethods) {
    return self._getSupportedPaymentMethods(paymentMethods).map(function (paymentMethod) {
      paymentMethod.vaulted = true;

      return paymentMethod;
    });
  }).catch(function () {
    return Promise.resolve([]);
  });
};

DropinModel.prototype._getSupportedPaymentMethods = function (paymentMethods) {
  var supportedPaymentMethods = this.supportedPaymentOptions.reduce(function (array, key) {
    var paymentMethodType = paymentMethodTypes[key];

    if (canShowVaultedPaymentMethodType(paymentMethodType)) {
      array.push(paymentMethodType);
    }

    return array;
  }, []);

  return paymentMethods.filter(function (paymentMethod) {
    return supportedPaymentMethods.indexOf(paymentMethod.type) > -1;
  });
};

DropinModel.prototype._getSupportedPaymentOptions = function (options) {
  var self = this;
  var paymentOptionPriority = options.merchantConfiguration.paymentOptionPriority || DEFAULT_PAYMENT_OPTION_PRIORITY;
  var promises;

  if (!(paymentOptionPriority instanceof Array)) {
    throw new DropinError('paymentOptionPriority must be an array.');
  }

  // Remove duplicates
  paymentOptionPriority = paymentOptionPriority.filter(function (item, pos) { return paymentOptionPriority.indexOf(item) === pos; });

  promises = paymentOptionPriority.map(function (paymentOption) {
    return getPaymentOption(paymentOption, options).then(function (result) {
      if (!result.success) {
        self.dependencyStates[result.id] = dependencySetupStates.NOT_ENABLED;
      }

      return result;
    });
  });

  return Promise.all(promises).then(function (result) {
    result = result.filter(function (item) {
      return item.success;
    });

    if (result.length === 0) {
      return Promise.reject(new DropinError('No valid payment options available.'));
    }

    return result.map(function (item) { return item.id; });
  });
};

function getPaymentOption(paymentOption, options) {
  return isPaymentOptionEnabled(paymentOption, options).then(function (success) {
    return {
      success: success,
      id: paymentOptionIDs[paymentOption]
    };
  });
}

function isPaymentOptionEnabled(paymentOption, options) {
  var SheetView = paymentSheetViews[paymentOptionIDs[paymentOption]];

  if (!SheetView) {
    return Promise.reject(new DropinError('paymentOptionPriority: Invalid payment option specified.'));
  }

  return SheetView.isEnabled({
    client: options.client,
    merchantConfiguration: options.merchantConfiguration
  }).catch(function (error) {
    console.error(SheetView.ID + ' view errored when checking if it was supported.'); // eslint-disable-line no-console
    console.error(error); // eslint-disable-line no-console

    return Promise.resolve(false);
  });
}

function canShowVaultedPaymentMethodType(paymentMethodType) {
  return paymentMethodType && VAULTED_PAYMENT_METHOD_TYPES_THAT_SHOULD_BE_HIDDEN.indexOf(paymentMethodType) === -1;
}

module.exports = DropinModel;

},{"./constants":191,"./lib/analytics":196,"./lib/dropin-error":201,"./lib/is-guest-checkout":203,"./lib/promise":208,"./views/payment-sheet-views":259,"@braintree/event-emitter":40,"braintree-web/vault-manager":152}],193:[function(require,module,exports){
'use strict';

var assign = require('./lib/assign').assign;
var analytics = require('./lib/analytics');
var classList = require('@braintree/class-list');
var constants = require('./constants');
var DropinError = require('./lib/dropin-error');
var DropinModel = require('./dropin-model');
var EventEmitter = require('@braintree/event-emitter');
var assets = require('@braintree/asset-loader');

var MainView = require('./views/main-view');
var paymentMethodsViewID = require('./views/payment-methods-view').ID;
var paymentOptionsViewID = require('./views/payment-options-view').ID;
var paymentOptionIDs = constants.paymentOptionIDs;
var translations = require('./translations').translations;
var isUtf8 = require('./lib/is-utf-8');
var uuid = require('@braintree/uuid');
var Promise = require('./lib/promise');
var sanitizeHtml = require('./lib/sanitize-html');
var DataCollector = require('./lib/data-collector');
var ThreeDSecure = require('./lib/three-d-secure');
var wrapPrototype = require('@braintree/wrap-promise').wrapPrototype;

var mainHTML = "<div class=\"braintree-dropin\">\n  <div data-braintree-id=\"methods-label\" class=\"braintree-heading\">&nbsp;</div>\n  <div data-braintree-id=\"methods-edit\" class=\"braintree-hidden braintree-heading\" role=\"button\" tabindex=\"0\">{{edit}}</div>\n  <div data-braintree-id=\"choose-a-way-to-pay\" class=\"braintree-heading\">{{chooseAWayToPay}}</div>\n  <div class=\"braintree-placeholder\">&nbsp;</div>\n\n  <div data-braintree-id=\"upper-container\" class=\"braintree-upper-container\">\n    <div data-braintree-id=\"loading-container\" class=\"braintree-loader__container\">\n      <div data-braintree-id=\"loading-indicator\" class=\"braintree-loader__indicator\">\n        <svg width=\"14\" height=\"16\" class=\"braintree-loader__lock\">\n          <use xlink:href=\"#iconLockLoader\"></use>\n        </svg>\n      </div>\n    </div>\n\n    <div data-braintree-id=\"delete-confirmation\" class=\"braintree-delete-confirmation braintree-sheet\">\n      <div data-braintree-id=\"delete-confirmation__message\"></div>\n      <div class=\"braintree-delete-confirmation__button-container\">\n        <div tabindex=\"0\" role=\"button\" data-braintree-id=\"delete-confirmation__no\" class=\"braintree-delete-confirmation__button\">{{deleteCancelButton}}</div>\n        <div tabindex=\"0\" role=\"button\" data-braintree-id=\"delete-confirmation__yes\" class=\"braintree-delete-confirmation__button\">{{deleteConfirmationButton}}</div>\n      </div>\n    </div>\n\n    <div data-braintree-id=\"methods\" class=\"braintree-methods braintree-methods-initial\">\n      <div data-braintree-id=\"methods-container\"></div>\n    </div>\n\n    <div data-braintree-id=\"options\" class=\"braintree-test-class braintree-options braintree-options-initial\">\n      <div data-braintree-id=\"payment-options-container\" class=\"braintree-options-list\"></div>\n    </div>\n\n    <div data-braintree-id=\"sheet-container\" class=\"braintree-sheet__container\">\n      <div data-braintree-id=\"paypal\" class=\"braintree-paypal braintree-sheet\">\n        <div data-braintree-id=\"paypal-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPal\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"paypalCredit\" class=\"braintree-paypalCredit braintree-sheet\">\n        <div data-braintree-id=\"paypal-credit-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPalCredit\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal Credit}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-credit-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"applePay\" class=\"braintree-applePay braintree-sheet\">\n        <div data-braintree-id=\"apple-pay-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg height=\"24\" width=\"40\">\n              <use xlink:href=\"#logoApplePay\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{Apple Pay}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"apple-pay-button\" class=\"braintree-sheet__button--apple-pay apple-pay-button\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"googlePay\" class=\"braintree-googlePay braintree-sheet\">\n        <div data-braintree-id=\"google-pay-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg height=\"24\" width=\"40\">\n              <use xlink:href=\"#logoGooglePay\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{Google Pay}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"google-pay-button\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"venmo\" class=\"braintree-venmo braintree-sheet\">\n        <div data-braintree-id=\"venmo-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg height=\"24\" width=\"40\">\n              <use xlink:href=\"#logoVenmo\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{Venmo}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <svg data-braintree-id=\"venmo-button\" class=\"braintree-sheet__button--venmo\">\n            <use xlink:href=\"#buttonVenmo\"></use>\n          </svg>\n        </div>\n      </div>\n      <div data-braintree-id=\"card\" class=\"braintree-card braintree-form braintree-sheet\">\n        <div data-braintree-id=\"card-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                <use xlink:href=\"#iconCardFront\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__text\">{{payWithCard}}</div>\n          </div>\n          <div data-braintree-id=\"card-view-icons\" class=\"braintree-sheet__icons\"></div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--form\">\n          <div data-braintree-id=\"cardholder-name-field-group\" class=\"braintree-form__field-group\">\n            <label for=\"braintree__card-view-input__cardholder-name\">\n              <div class=\"braintree-form__label\">{{cardholderNameLabel}}</div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form-cardholder-name braintree-form__hosted-field\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n            </label>\n            <div data-braintree-id=\"cardholder-name-field-error\" class=\"braintree-form__field-error\"></div>\n          </div>\n          <div data-braintree-id=\"number-field-group\" class=\"braintree-form__field-group\">\n            <label>\n              <div class=\"braintree-form__label\">{{cardNumberLabel}}</div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form-number braintree-form__hosted-field\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div data-braintree-id=\"card-number-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                    <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                    <use data-braintree-id=\"card-number-icon-svg\" xlink:href=\"#iconCardFront\"></use>\n                    </svg>\n                  </div>\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n            </label>\n            <div data-braintree-id=\"number-field-error\" class=\"braintree-form__field-error\"></div>\n          </div>\n\n          <div class=\"braintree-form__flexible-fields\">\n            <div data-braintree-id=\"expiration-date-field-group\" class=\"braintree-form__field-group\">\n              <label>\n                <div class=\"braintree-form__label\">{{expirationDateLabel}}\n                  <span class=\"braintree-form__descriptor\">{{expirationDateLabelSubheading}}</span>\n                </div>\n                <div class=\"braintree-form__field\">\n                  <div class=\"braintree-form__hosted-field braintree-form-expiration\"></div>\n                  <div class=\"braintree-form__icon-container\">\n                    <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                      <svg width=\"24\" height=\"24\">\n                        <use xlink:href=\"#iconError\"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n              </label>\n              <div data-braintree-id=\"expiration-date-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n\n\n            <div data-braintree-id=\"cvv-field-group\" class=\"braintree-form__field-group\">\n              <label>\n                <div class=\"braintree-form__label\">{{cvvLabel}}\n                  <span data-braintree-id=\"cvv-label-descriptor\" class=\"braintree-form__descriptor\">{{cvvThreeDigitLabelSubheading}}</span>\n                </div>\n                <div class=\"braintree-form__field\">\n                  <div class=\"braintree-form__hosted-field braintree-form-cvv\"></div>\n                  <div class=\"braintree-form__icon-container\">\n                    <div data-braintree-id=\"cvv-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                      <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                      <use data-braintree-id=\"cvv-icon-svg\" xlink:href=\"#iconCVVBack\"></use>\n                      </svg>\n                    </div>\n                    <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                      <svg width=\"24\" height=\"24\">\n                        <use xlink:href=\"#iconError\"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n              </label>\n              <div data-braintree-id=\"cvv-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n\n            <div data-braintree-id=\"postal-code-field-group\" class=\"braintree-form__field-group\">\n              <label>\n                <div class=\"braintree-form__label\">{{postalCodeLabel}}</div>\n                <div class=\"braintree-form__field\">\n                  <div class=\"braintree-form__hosted-field braintree-form-postal-code\"></div>\n                  <div class=\"braintree-form__icon-container\">\n                    <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                      <svg width=\"24\" height=\"24\">\n                        <use xlink:href=\"#iconError\"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n              </label>\n              <div data-braintree-id=\"postal-code-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n          </div>\n\n          <div data-braintree-id=\"save-card-field-group\" class=\"braintree-form__field-group braintree-hidden\">\n            <label>\n              <div class=\"braintree-form__field braintree-form__checkbox\">\n                <input type=\"checkbox\" data-braintree-id=\"save-card-input\" checked />\n              </div>\n              <div class=\"braintree-form__label\">{{saveCardLabel}}</div>\n            </label>\n          </div>\n        </div>\n      </div>\n\n      <div data-braintree-id=\"sheet-error\" class=\"braintree-sheet__error\">\n        <div class=\"braintree-form__icon braintree-sheet__error-icon\">\n          <svg width=\"24\" height=\"24\">\n            <use xlink:href=\"#iconError\"></use>\n          </svg>\n        </div>\n        <div data-braintree-id=\"sheet-error-text\" class=\"braintree-sheet__error-text\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div data-braintree-id=\"lower-container\" class=\"braintree-test-class braintree-options braintree-hidden\">\n    <div data-braintree-id=\"other-ways-to-pay\" class=\"braintree-heading\">{{otherWaysToPay}}</div>\n  </div>\n\n  <div data-braintree-id=\"toggle\" class=\"braintree-large-button braintree-toggle braintree-hidden\" tabindex=\"0\">\n    <span>{{chooseAnotherWayToPay}}</span>\n  </div>\n</div>\n<div data-braintree-id=\"disable-wrapper\" class=\"braintree-dropin__disabled braintree-hidden\"></div>\n";
var svgHTML = "<svg data-braintree-id=\"svgs\" style=\"display: none\">\n  <defs>\n    <symbol id=\"icon-visa\" viewBox=\"0 0 40 24\">\n      <title>Visa</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M0 22.033C0 23.12.892 24 1.992 24h36.016c1.1 0 1.992-.88 1.992-1.967V20.08H0v1.953z\" style=\"fill: #F8B600\" />\n      <path d=\"M0 3.92h40V1.967C40 .88 39.108 0 38.008 0H1.992C.892 0 0 .88 0 1.967V3.92zM19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z\" style=\"fill: #1A1F71\" />\n    </symbol>\n\n    <symbol id=\"icon-master-card\" viewBox=\"0 0 40 24\">\n      <title>MasterCard</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M11.085 22.2v-1.36c0-.522-.318-.863-.864-.863-.272 0-.568.09-.773.386-.16-.25-.386-.386-.727-.386-.228 0-.455.068-.637.318v-.272h-.478V22.2h.478v-1.202c0-.386.204-.567.523-.567.318 0 .478.205.478.568V22.2h.477v-1.202c0-.386.23-.567.524-.567.32 0 .478.205.478.568V22.2h.523zm7.075-2.177h-.774v-.658h-.478v.658h-.432v.43h.432v.998c0 .5.205.795.75.795.206 0 .433-.068.592-.16l-.136-.407c-.136.09-.296.114-.41.114-.227 0-.318-.137-.318-.363v-.976h.774v-.43zm4.048-.046c-.273 0-.454.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .204.023.295.046l.137-.454c-.09-.023-.228-.023-.32-.023zm-6.118.227c-.228-.16-.546-.227-.888-.227-.546 0-.91.272-.91.703 0 .363.274.567.75.635l.23.023c.25.045.385.113.385.227 0 .16-.182.272-.5.272-.32 0-.57-.113-.728-.227l-.228.363c.25.18.59.272.932.272.637 0 1-.295 1-.703 0-.385-.295-.59-.75-.658l-.227-.022c-.205-.023-.364-.068-.364-.204 0-.16.16-.25.41-.25.272 0 .545.114.682.182l.205-.386zm12.692-.227c-.273 0-.455.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .203.023.294.046L29.1 20c-.09-.023-.227-.023-.318-.023zm-6.096 1.134c0 .66.455 1.135 1.16 1.135.32 0 .546-.068.774-.25l-.228-.385c-.182.136-.364.204-.57.204-.385 0-.658-.272-.658-.703 0-.407.273-.68.66-.702.204 0 .386.068.568.204l.228-.385c-.228-.182-.455-.25-.774-.25-.705 0-1.16.477-1.16 1.134zm4.413 0v-1.087h-.48v.272c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.317 0 .545-.113.68-.317v.272h.48v-1.09zm-1.753 0c0-.384.25-.702.66-.702.387 0 .66.295.66.703 0 .387-.273.704-.66.704-.41-.022-.66-.317-.66-.703zm-5.71-1.133c-.636 0-1.09.454-1.09 1.134 0 .682.454 1.135 1.114 1.135.32 0 .638-.09.888-.295l-.228-.34c-.18.136-.41.227-.636.227-.296 0-.592-.136-.66-.522h1.615v-.18c.022-.704-.388-1.158-1.002-1.158zm0 .41c.297 0 .502.18.547.52h-1.137c.045-.295.25-.52.59-.52zm11.852.724v-1.95h-.48v1.135c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.68-.317v.272h.48v-1.09zm-1.752 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703zm-15.97 0v-1.087h-.476v.272c-.16-.204-.387-.318-.683-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.682-.317v.272h.477v-1.09zm-1.773 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703z\" style=\"fill: #000\" />\n      <path style=\"fill: #FF5F00\" d=\"M23.095 3.49H15.93v12.836h7.165\" />\n      <path d=\"M16.382 9.91c0-2.61 1.23-4.922 3.117-6.42-1.39-1.087-3.14-1.745-5.05-1.745-4.528 0-8.19 3.65-8.19 8.164 0 4.51 3.662 8.162 8.19 8.162 1.91 0 3.66-.657 5.05-1.746-1.89-1.474-3.118-3.81-3.118-6.417z\" style=\"fill: #EB001B\" />\n      <path d=\"M32.76 9.91c0 4.51-3.664 8.162-8.19 8.162-1.91 0-3.662-.657-5.05-1.746 1.91-1.496 3.116-3.81 3.116-6.417 0-2.61-1.228-4.922-3.116-6.42 1.388-1.087 3.14-1.745 5.05-1.745 4.526 0 8.19 3.674 8.19 8.164z\" style=\"fill: #F79E1B\" />\n    </symbol>\n\n    <symbol id=\"icon-unionpay\" viewBox=\"0 0 40 24\">\n      <title>Union Pay</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.877 2h8.126c1.135 0 1.84.93 1.575 2.077l-3.783 16.35c-.267 1.142-1.403 2.073-2.538 2.073H5.13c-1.134 0-1.84-.93-1.574-2.073L7.34 4.076C7.607 2.93 8.74 2 9.878 2z\" style=\"fill: #E21836\" />\n      <path d=\"M17.325 2h9.345c1.134 0 .623.93.356 2.077l-3.783 16.35c-.265 1.142-.182 2.073-1.32 2.073H12.58c-1.137 0-1.84-.93-1.574-2.073l3.783-16.35C15.056 2.93 16.19 2 17.324 2z\" style=\"fill: #00447B\" />\n      <path d=\"M26.3 2h8.126c1.136 0 1.84.93 1.575 2.077l-3.782 16.35c-.266 1.142-1.402 2.073-2.54 2.073h-8.122c-1.137 0-1.842-.93-1.574-2.073l3.78-16.35C24.03 2.93 25.166 2 26.303 2z\" style=\"fill: #007B84\" />\n      <path d=\"M27.633 14.072l-.99 3.3h.266l-.208.68h-.266l-.062.212h-.942l.064-.21H23.58l.193-.632h.194l1.005-3.35.2-.676h.962l-.1.34s.255-.184.498-.248c.242-.064 1.636-.088 1.636-.088l-.206.672h-.33zm-1.695 0l-.254.843s.285-.13.44-.172c.16-.04.395-.057.395-.057l.182-.614h-.764zm-.38 1.262l-.263.877s.29-.15.447-.196c.157-.037.396-.066.396-.066l.185-.614h-.766zm-.614 2.046h.767l.222-.74h-.765l-.223.74z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M28.055 13.4h1.027l.01.385c-.005.065.05.096.17.096h.208l-.19.637h-.555c-.48.035-.662-.172-.65-.406l-.02-.71zM28.193 16.415h-.978l.167-.566H28.5l.16-.517h-1.104l.19-.638h3.072l-.193.638h-1.03l-.16.516h1.032l-.17.565H29.18l-.2.24h.454l.11.712c.013.07.014.116.036.147.023.026.158.038.238.038h.137l-.21.694h-.348c-.054 0-.133-.004-.243-.01-.105-.008-.18-.07-.25-.105-.064-.03-.16-.11-.182-.24l-.11-.712-.507.7c-.162.222-.38.39-.748.39h-.712l.186-.62h.273c.078 0 .15-.03.2-.056.052-.023.098-.05.15-.126l.74-1.05zM17.478 14.867h2.59l-.19.622H18.84l-.16.53h1.06l-.194.64h-1.06l-.256.863c-.03.095.25.108.353.108l.53-.072-.212.71h-1.193c-.096 0-.168-.013-.272-.037-.1-.023-.145-.07-.19-.138-.043-.07-.11-.128-.064-.278l.343-1.143h-.588l.195-.65h.592l.156-.53h-.588l.188-.623zM19.223 13.75h1.063l-.194.65H18.64l-.157.136c-.067.066-.09.038-.18.087-.08.04-.254.123-.477.123h-.466l.19-.625h.14c.118 0 .198-.01.238-.036.046-.03.098-.096.157-.203l.267-.487h1.057l-.187.356zM20.74 13.4h.905l-.132.46s.286-.23.487-.313c.2-.075.65-.143.65-.143l1.464-.007-.498 1.672c-.085.286-.183.472-.244.555-.055.087-.12.16-.248.23-.124.066-.236.104-.34.115-.096.007-.244.01-.45.012h-1.41l-.4 1.324c-.037.13-.055.194-.03.23.02.03.068.066.135.066l.62-.06-.21.726h-.698c-.22 0-.383-.004-.495-.013-.108-.01-.22 0-.295-.058-.065-.058-.164-.133-.162-.21.007-.073.037-.192.082-.356l1.268-4.23zm1.922 1.69h-1.484l-.09.3h1.283c.152-.018.184.004.196-.003l.096-.297zm-1.402-.272s.29-.266.786-.353c.112-.022.82-.015.82-.015l.106-.357h-1.496l-.216.725z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M23.382 16.1l-.084.402c-.036.125-.067.22-.16.302-.1.084-.216.172-.488.172l-.502.02-.004.455c-.006.13.028.117.048.138.024.022.045.032.067.04l.157-.008.48-.028-.198.663h-.552c-.385 0-.67-.008-.765-.084-.092-.057-.105-.132-.103-.26l.035-1.77h.88l-.013.362h.212c.072 0 .12-.007.15-.026.027-.02.047-.048.06-.093l.087-.282h.692zM10.84 7.222c-.032.143-.596 2.763-.598 2.764-.12.53-.21.91-.508 1.152-.172.14-.37.21-.6.21-.37 0-.587-.185-.624-.537l-.007-.12.113-.712s.593-2.388.7-2.703c.002-.017.005-.026.007-.035-1.152.01-1.357 0-1.37-.018-.007.024-.037.173-.037.173l-.605 2.688-.05.23-.1.746c0 .22.042.4.13.553.275.485 1.06.557 1.504.557.573 0 1.11-.123 1.47-.345.63-.375.797-.962.944-1.48l.067-.267s.61-2.48.716-2.803c.003-.017.006-.026.01-.035-.835.01-1.08 0-1.16-.018zM14.21 12.144c-.407-.006-.55-.006-1.03.018l-.018-.036c.042-.182.087-.363.127-.548l.06-.25c.086-.39.173-.843.184-.98.007-.084.036-.29-.2-.29-.1 0-.203.048-.307.096-.058.207-.174.79-.23 1.055-.118.558-.126.62-.178.897l-.036.037c-.42-.006-.566-.006-1.05.018l-.024-.04c.08-.332.162-.668.24-.998.203-.9.25-1.245.307-1.702l.04-.028c.47-.067.585-.08 1.097-.185l.043.047-.077.287c.086-.052.168-.104.257-.15.242-.12.51-.155.658-.155.223 0 .468.062.57.323.098.232.034.52-.094 1.084l-.066.287c-.13.627-.152.743-.225 1.174l-.05.036zM15.87 12.144c-.245 0-.405-.006-.56 0-.153 0-.303.008-.532.018l-.013-.02-.015-.02c.062-.238.097-.322.128-.406.03-.084.06-.17.115-.41.072-.315.116-.535.147-.728.033-.187.052-.346.075-.53l.02-.014.02-.018c.244-.036.4-.057.56-.082.16-.024.32-.055.574-.103l.008.023.008.022c-.047.195-.094.39-.14.588-.047.197-.094.392-.137.587-.093.414-.13.57-.152.68-.02.105-.026.163-.063.377l-.022.02-.023.017zM19.542 10.728c.143-.633.033-.928-.108-1.11-.213-.273-.59-.36-.978-.36-.235 0-.793.023-1.23.43-.312.29-.458.687-.546 1.066-.088.387-.19 1.086.447 1.344.198.085.48.108.662.108.466 0 .945-.13 1.304-.513.278-.312.405-.775.448-.965zm-1.07-.046c-.02.106-.113.503-.24.673-.086.123-.19.198-.305.198-.033 0-.235 0-.238-.3-.003-.15.027-.304.063-.47.108-.478.236-.88.56-.88.255 0 .27.298.16.78zM29.536 12.187c-.493-.004-.635-.004-1.09.015l-.03-.037c.124-.472.248-.943.358-1.42.142-.62.175-.882.223-1.244l.037-.03c.49-.07.625-.09 1.135-.186l.015.044c-.093.388-.186.777-.275 1.166-.19.816-.258 1.23-.33 1.658l-.044.035z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M29.77 10.784c.144-.63-.432-.056-.525-.264-.14-.323-.052-.98-.62-1.2-.22-.085-.732.025-1.17.428-.31.29-.458.683-.544 1.062-.088.38-.19 1.078.444 1.328.2.085.384.11.567.103.638-.034 1.124-1.002 1.483-1.386.277-.303.326.115.368-.07zm-.974-.047c-.024.1-.117.503-.244.67-.083.117-.283.192-.397.192-.032 0-.232 0-.24-.3 0-.146.03-.3.067-.467.11-.47.235-.87.56-.87.254 0 .363.293.254.774zM22.332 12.144c-.41-.006-.55-.006-1.03.018l-.018-.036c.04-.182.087-.363.13-.548l.057-.25c.09-.39.176-.843.186-.98.008-.084.036-.29-.198-.29-.1 0-.203.048-.308.096-.057.207-.175.79-.232 1.055-.115.558-.124.62-.176.897l-.035.037c-.42-.006-.566-.006-1.05.018l-.022-.04.238-.998c.203-.9.25-1.245.307-1.702l.038-.028c.472-.067.587-.08 1.098-.185l.04.047-.073.287c.084-.052.17-.104.257-.15.24-.12.51-.155.655-.155.224 0 .47.062.575.323.095.232.03.52-.098 1.084l-.065.287c-.133.627-.154.743-.225 1.174l-.05.036zM26.32 8.756c-.07.326-.282.603-.554.736-.225.114-.498.123-.78.123h-.183l.013-.074.336-1.468.01-.076.007-.058.132.015.71.062c.275.105.388.38.31.74zM25.88 7.22l-.34.003c-.883.01-1.238.006-1.383-.012l-.037.182-.315 1.478-.793 3.288c.77-.01 1.088-.01 1.22.004l.21-1.024s.153-.644.163-.667c0 0 .047-.066.096-.092h.07c.665 0 1.417 0 2.005-.437.4-.298.675-.74.797-1.274.03-.132.054-.29.054-.446 0-.205-.04-.41-.16-.568-.3-.423-.896-.43-1.588-.433zM33.572 9.28l-.04-.043c-.502.1-.594.118-1.058.18l-.034.034-.005.023-.003-.007c-.345.803-.334.63-.615 1.26-.003-.03-.003-.048-.004-.077l-.07-1.37-.044-.043c-.53.1-.542.118-1.03.18l-.04.034-.006.056.003.007c.06.315.047.244.108.738.03.244.065.49.093.73.05.4.077.6.134 1.21-.328.55-.408.757-.722 1.238l.017.044c.478-.018.587-.018.94-.018l.08-.088c.265-.578 2.295-4.085 2.295-4.085zM16.318 9.62c.27-.19.304-.45.076-.586-.23-.137-.634-.094-.906.095-.273.186-.304.45-.075.586.228.134.633.094.905-.096z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M31.238 13.415l-.397.684c-.124.232-.357.407-.728.41l-.632-.01.184-.618h.124c.064 0 .11-.004.148-.022.03-.01.054-.035.08-.072l.233-.373h.988z\" style=\"fill: #FEFEFE\" />\n    </symbol>\n\n    <symbol id=\"icon-american-express\" viewBox=\"0 0 40 24\">\n      <title>American Express</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path style=\"fill: #1478BE\" d=\"M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z\" />\n      <path d=\"M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z\" style=\"fill: #1478BE\" />\n    </symbol>\n\n    <symbol id=\"icon-jcb\" viewBox=\"0 0 40 24\">\n      <title>JCB</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M33.273 2.01h.013v17.062c-.004 1.078-.513 2.103-1.372 2.746-.63.47-1.366.67-2.14.67-.437 0-4.833.026-4.855 0-.01-.01 0-.07 0-.082v-6.82c0-.04.004-.064.033-.064h5.253c.867 0 1.344-.257 1.692-.61.44-.448.574-1.162.294-1.732-.24-.488-.736-.78-1.244-.913-.158-.04-.32-.068-.483-.083-.01 0-.064 0-.07-.006-.03-.034.023-.04.038-.046.102-.033.215-.042.32-.073.532-.164.993-.547 1.137-1.105.15-.577-.05-1.194-.524-1.552-.34-.257-.768-.376-1.187-.413-.43-.038-4.774-.022-5.21-.022-.072 0-.05-.02-.05-.09V5.63c0-.31.01-.616.073-.92.126-.592.41-1.144.815-1.59.558-.615 1.337-1.01 2.16-1.093.478-.048 4.89-.017 5.305-.017zm-4.06 8.616c.06.272-.01.567-.204.77-.173.176-.407.25-.648.253-.195.003-1.725 0-1.788 0l.003-1.645c.012-.027.02-.018.06-.018.097 0 1.713-.004 1.823.005.232.02.45.12.598.306.076.096.128.208.155.328zm-2.636 2.038h1.944c.242.002.47.063.652.228.226.204.327.515.283.815-.04.263-.194.5-.422.634-.187.112-.39.125-.6.125h-1.857v-1.8z\" style=\"fill: #53B230\" />\n      <path d=\"M6.574 13.89c-.06-.03-.06-.018-.07-.06-.006-.026-.005-8.365.003-8.558.04-.95.487-1.857 1.21-2.47.517-.434 1.16-.71 1.83-.778.396-.04.803-.018 1.2-.018.69 0 4.11-.013 4.12 0 .008.008.002 16.758 0 17.074-.003.956-.403 1.878-1.105 2.523-.506.465-1.15.77-1.83.86-.41.056-5.02.032-5.363.032-.066 0-.054.013-.066-.024-.01-.025 0-7 0-7.17.66.178 1.35.28 2.03.348.662.067 1.33.093 1.993.062.93-.044 1.947-.192 2.712-.762.32-.238.574-.553.73-.922.148-.353.2-.736.2-1.117 0-.348.006-3.93-.016-3.942-.023-.014-2.885-.015-2.9.012-.012.022 0 3.87 0 3.95-.003.47-.16.933-.514 1.252-.468.42-1.11.47-1.707.423-.687-.055-1.357-.245-1.993-.508-.157-.065-.312-.135-.466-.208z\" style=\"fill: #006CB9\" />\n      <path d=\"M15.95 9.835c-.025.02-.05.04-.072.06V6.05c0-.295-.012-.594.01-.888.12-1.593 1.373-2.923 2.944-3.126.382-.05 5.397-.042 5.41-.026.01.01 0 .062 0 .074v16.957c0 1.304-.725 2.52-1.89 3.1-.504.25-1.045.35-1.605.35-.322 0-4.757.015-4.834 0-.05-.01-.023.01-.035-.02-.007-.022 0-6.548 0-7.44v-.422c.554.48 1.256.75 1.96.908.536.12 1.084.176 1.63.196.537.02 1.076.01 1.61-.037.546-.05 1.088-.136 1.625-.244.137-.028.274-.057.41-.09.033-.006.17-.017.187-.044.013-.02 0-.097 0-.12v-1.324c-.582.292-1.19.525-1.83.652-.778.155-1.64.198-2.385-.123-.752-.326-1.2-1.024-1.274-1.837-.076-.837.173-1.716.883-2.212.736-.513 1.7-.517 2.553-.38.634.1 1.245.305 1.825.58.078.037.154.075.23.113V9.322c0-.02.013-.1 0-.118-.02-.028-.152-.038-.188-.046-.066-.016-.133-.03-.2-.045C22.38 9 21.84 8.908 21.3 8.85c-.533-.06-1.068-.077-1.603-.066-.542.01-1.086.054-1.62.154-.662.125-1.32.337-1.883.716-.085.056-.167.117-.245.18z\" style=\"fill: #E20138\" />\n    </symbol>\n\n    <symbol id=\"icon-discover\" viewBox=\"0 0 40 24\">\n      <title>Discover</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M38.995 11.75S27.522 20.1 6.5 23.5h31.495c.552 0 1-.448 1-1V11.75z\" style=\"fill: #F48024\" />\n      <path d=\"M5.332 11.758c-.338.305-.776.438-1.47.438h-.29V8.55h.29c.694 0 1.115.124 1.47.446.37.33.595.844.595 1.372 0 .53-.224 1.06-.595 1.39zM4.077 7.615H2.5v5.515h1.57c.833 0 1.435-.197 1.963-.637.63-.52 1-1.305 1-2.116 0-1.628-1.214-2.762-2.956-2.762zM7.53 13.13h1.074V7.616H7.53M11.227 9.732c-.645-.24-.834-.397-.834-.695 0-.347.338-.61.8-.61.322 0 .587.132.867.446l.562-.737c-.462-.405-1.015-.612-1.618-.612-.975 0-1.718.678-1.718 1.58 0 .76.346 1.15 1.355 1.513.42.148.635.247.743.314.215.14.322.34.322.57 0 .448-.354.78-.834.78-.51 0-.924-.258-1.17-.736l-.695.67c.495.726 1.09 1.05 1.907 1.05 1.116 0 1.9-.745 1.9-1.812 0-.876-.363-1.273-1.585-1.72zM13.15 10.377c0 1.62 1.27 2.877 2.907 2.877.462 0 .858-.09 1.347-.32v-1.267c-.43.43-.81.604-1.297.604-1.082 0-1.85-.785-1.85-1.9 0-1.06.792-1.895 1.8-1.895.512 0 .9.183 1.347.62V7.83c-.472-.24-.86-.34-1.322-.34-1.627 0-2.932 1.283-2.932 2.887zM25.922 11.32l-1.468-3.705H23.28l2.337 5.656h.578l2.38-5.655H27.41M29.06 13.13h3.046v-.934h-1.973v-1.488h1.9v-.934h-1.9V8.55h1.973v-.935H29.06M34.207 10.154h-.314v-1.67h.33c.67 0 1.034.28 1.034.818 0 .554-.364.852-1.05.852zm2.155-.91c0-1.033-.71-1.628-1.95-1.628H32.82v5.514h1.073v-2.215h.14l1.487 2.215h1.32l-1.733-2.323c.81-.165 1.255-.72 1.255-1.563z\" style=\"fill: #221F20\" />\n      <path d=\"M23.6 10.377c0 1.62-1.31 2.93-2.927 2.93-1.617.002-2.928-1.31-2.928-2.93s1.31-2.932 2.928-2.932c1.618 0 2.928 1.312 2.928 2.932z\" style=\"fill: #F48024\" />\n    </symbol>\n\n    <symbol id=\"icon-diners-club\" viewBox=\"0 0 40 24\">\n      <title>Diners Club</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.02 11.83c0-5.456 4.54-9.88 10.14-9.88 5.6 0 10.139 4.424 10.139 9.88-.002 5.456-4.54 9.88-10.14 9.88-5.6 0-10.14-4.424-10.14-9.88z\" style=\"fill: #FEFEFE\" />\n      <path style=\"fill: #FFF\" d=\"M32.522 22H8.5V1.5h24.022\" />\n      <path d=\"M25.02 11.732c-.003-2.534-1.607-4.695-3.868-5.55v11.102c2.26-.857 3.865-3.017 3.87-5.552zm-8.182 5.55V6.18c-2.26.86-3.86 3.017-3.867 5.55.007 2.533 1.61 4.69 3.868 5.55zm2.158-14.934c-5.25.002-9.503 4.202-9.504 9.384 0 5.182 4.254 9.38 9.504 9.382 5.25 0 9.504-4.2 9.505-9.382 0-5.182-4.254-9.382-9.504-9.384zM18.973 22C13.228 22.027 8.5 17.432 8.5 11.84 8.5 5.726 13.228 1.5 18.973 1.5h2.692c5.677 0 10.857 4.225 10.857 10.34 0 5.59-5.18 10.16-10.857 10.16h-2.692z\" style=\"fill: #004A97\" />\n    </symbol>\n\n    <symbol id=\"icon-maestro\" viewBox=\"0 0 40 24\">\n      <title>Maestro</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M14.67 22.39V21c.022-.465-.303-.86-.767-.882h-.116c-.3-.023-.603.14-.788.394-.164-.255-.442-.417-.743-.394-.256-.023-.51.116-.65.324v-.278h-.487v2.203h.487v-1.183c-.046-.278.162-.533.44-.58h.094c.325 0 .488.21.488.58v1.23h.487v-1.23c-.047-.278.162-.556.44-.58h.093c.325 0 .487.21.487.58v1.23l.534-.024zm2.712-1.09v-1.113h-.487v.28c-.162-.21-.417-.326-.695-.326-.65 0-1.16.51-1.16 1.16 0 .65.51 1.16 1.16 1.16.278 0 .533-.117.695-.325v.278h.487V21.3zm-1.786 0c.024-.37.348-.65.72-.626.37.023.65.348.626.72-.023.347-.302.625-.673.625-.372 0-.674-.28-.674-.65-.023-.047-.023-.047 0-.07zm12.085-1.16c.163 0 .325.024.465.094.14.046.278.14.37.255.117.115.186.23.256.37.117.3.117.626 0 .927-.046.14-.138.255-.254.37-.116.117-.232.186-.37.256-.303.116-.65.116-.952 0-.14-.046-.28-.14-.37-.255-.118-.116-.187-.232-.257-.37-.116-.302-.116-.627 0-.928.047-.14.14-.255.256-.37.115-.117.23-.187.37-.256.163-.07.325-.116.488-.093zm0 .465c-.092 0-.185.023-.278.046-.092.024-.162.094-.232.14-.07.07-.116.14-.14.232-.068.185-.068.394 0 .58.024.092.094.162.14.23.07.07.14.117.232.14.186.07.37.07.557 0 .092-.023.16-.092.23-.14.07-.068.117-.138.14-.23.07-.186.07-.395 0-.58-.023-.093-.093-.162-.14-.232-.07-.07-.138-.116-.23-.14-.094-.045-.187-.07-.28-.045zm-7.677.695c0-.695-.44-1.16-1.043-1.16-.65 0-1.16.534-1.137 1.183.023.65.534 1.16 1.183 1.136.325 0 .65-.093.905-.302l-.23-.348c-.187.14-.42.232-.65.232-.326.023-.627-.21-.673-.533h1.646v-.21zm-1.646-.21c.023-.3.278-.532.58-.532.3 0 .556.232.556.533h-1.136zm3.664-.346c-.207-.116-.44-.186-.695-.186-.255 0-.417.093-.417.255 0 .163.162.186.37.21l.233.022c.488.07.766.278.766.672 0 .395-.37.72-1.02.72-.348 0-.673-.094-.95-.28l.23-.37c.21.162.465.232.743.232.324 0 .51-.094.51-.28 0-.115-.117-.185-.395-.23l-.232-.024c-.487-.07-.765-.302-.765-.65 0-.44.37-.718.927-.718.325 0 .627.07.905.232l-.21.394zm2.32-.116h-.788v.997c0 .23.07.37.325.37.14 0 .3-.046.417-.115l.14.417c-.186.116-.395.162-.604.162-.58 0-.765-.302-.765-.812v-1.02h-.44v-.44h.44v-.673h.487v.672h.79v.44zm1.67-.51c.117 0 .233.023.35.07l-.14.463c-.093-.045-.21-.045-.302-.045-.325 0-.464.208-.464.58v1.25h-.487v-2.2h.487v.277c.116-.255.325-.37.557-.394z\" style=\"fill: #000\" />\n      <path style=\"fill: #7673C0\" d=\"M23.64 3.287h-7.305V16.41h7.306\" />\n      <path d=\"M16.8 9.848c0-2.55 1.183-4.985 3.2-6.56C16.384.435 11.12 1.06 8.29 4.7 5.435 8.32 6.06 13.58 9.703 16.41c3.038 2.387 7.283 2.387 10.32 0-2.04-1.578-3.223-3.99-3.223-6.562z\" style=\"fill: #EB001B\" />\n      <path d=\"M33.5 9.848c0 4.613-3.735 8.346-8.35 8.346-1.88 0-3.69-.626-5.15-1.785 3.618-2.83 4.245-8.092 1.415-11.71-.418-.532-.882-.996-1.415-1.413C23.618.437 28.883 1.06 31.736 4.7 32.873 6.163 33.5 7.994 33.5 9.85z\" style=\"fill: #00A1DF\" />\n    </symbol>\n\n    <symbol id=\"logoPayPal\" viewBox=\"0 0 48 29\">\n      <title>PayPal Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" />\n      <path d=\"M31.216 16.4c.394-.7.69-1.5.886-2.4.196-.8.196-1.6.1-2.2-.1-.7-.396-1.2-.79-1.7-.195-.3-.59-.5-.885-.7.1-.8.1-1.5 0-2.1-.1-.6-.394-1.1-.886-1.6-.885-1-2.56-1.6-4.922-1.6h-6.4c-.492 0-.787.3-.886.8l-2.658 17.2c0 .2 0 .3.1.4.097.1.294.2.393.2h4.036l-.295 1.8c0 .1 0 .3.1.4.098.1.195.2.393.2h3.35c.393 0 .688-.3.786-.7v-.2l.59-4.1v-.2c.1-.4.395-.7.788-.7h.59c1.675 0 3.152-.4 4.137-1.1.59-.5 1.083-1 1.478-1.7h-.002z\" style=\"fill: #263B80\" />\n      <path d=\"M21.364 9.4c0-.3.196-.5.492-.6.098-.1.196-.1.394-.1h5.02c.592 0 1.183 0 1.675.1.1 0 .295.1.394.1.098 0 .294.1.393.1.1 0 .1 0 .197.102.295.1.492.2.69.3.295-1.6 0-2.7-.887-3.8-.985-1.1-2.658-1.6-4.923-1.6h-6.4c-.49 0-.885.3-.885.8l-2.758 17.3c-.098.3.197.6.59.6h3.94l.985-6.4 1.083-6.9z\" style=\"fill: #263B80\" />\n      <path d=\"M30.523 9.4c0 .1 0 .3-.098.4-.887 4.4-3.742 5.9-7.484 5.9h-1.87c-.492 0-.787.3-.886.8l-.985 6.2-.296 1.8c0 .3.196.6.492.6h3.348c.394 0 .69-.3.787-.7v-.2l.592-4.1v-.2c.1-.4.394-.7.787-.7h.69c3.248 0 5.808-1.3 6.497-5.2.296-1.6.197-3-.69-3.9-.196-.3-.49-.5-.885-.7z\" style=\"fill: #159BD7\" />\n      <path d=\"M29.635 9c-.098 0-.295-.1-.394-.1-.098 0-.294-.1-.393-.1-.492-.102-1.083-.102-1.673-.102h-5.022c-.1 0-.197 0-.394.1-.198.1-.394.3-.492.6l-1.083 6.9v.2c.1-.5.492-.8.886-.8h1.87c3.742 0 6.598-1.5 7.484-5.9 0-.1 0-.3.098-.4-.196-.1-.492-.2-.69-.3 0-.1-.098-.1-.196-.1z\" style=\"fill: #232C65\" />\n    </symbol>\n\n    <symbol id=\"logoPayPalCredit\" viewBox=\"0 0 48 29\">\n      <title>PayPal Credit Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" fill-rule=\"nonzero\" />\n      <path d=\"M27.44 21.6h.518c1.377 0 2.67-.754 2.953-2.484.248-1.588-.658-2.482-2.14-2.482h-.38c-.093 0-.172.067-.187.16l-.763 4.805zm-1.254-6.646c.024-.158.16-.273.32-.273h2.993c2.47 0 4.2 1.942 3.81 4.436-.4 2.495-2.752 4.436-5.21 4.436h-3.05c-.116 0-.205-.104-.187-.218l1.323-8.38zM22.308 16.907l-.192 1.21h2.38c.116 0 .204.103.186.217l-.23 1.462c-.023.157-.16.273-.318.273h-2.048c-.16 0-.294.114-.32.27l-.203 1.26h2.52c.117 0 .205.102.187.217l-.228 1.46c-.025.16-.16.275-.32.275h-4.55c-.116 0-.204-.104-.186-.218l1.322-8.38c.025-.158.16-.273.32-.273h4.55c.116 0 .205.104.187.22l-.23 1.46c-.024.158-.16.274-.32.274H22.63c-.16 0-.295.115-.32.273M35.325 23.552h-1.81c-.115 0-.203-.104-.185-.218l1.322-8.38c.025-.158.16-.273.32-.273h1.81c.115 0 .203.104.185.22l-1.322 8.38c-.025.156-.16.272-.32.272M14.397 18.657h.224c.754 0 1.62-.14 1.777-1.106.158-.963-.345-1.102-1.15-1.104h-.326c-.097 0-.18.07-.197.168l-.326 2.043zm3.96 4.895h-2.37c-.102 0-.194-.058-.238-.15l-1.565-3.262h-.023l-.506 3.19c-.02.128-.13.222-.26.222h-1.86c-.116 0-.205-.104-.187-.218l1.33-8.432c.02-.128.13-.22.26-.22h3.222c1.753 0 2.953.834 2.66 2.728-.2 1.224-1.048 2.283-2.342 2.506l2.037 3.35c.076.125-.014.286-.16.286zM40.216 23.552h-1.808c-.116 0-.205-.104-.187-.218l1.06-6.7h-1.684c-.116 0-.205-.104-.187-.218l.228-1.462c.025-.157.16-.273.32-.273h5.62c.116 0 .205.104.186.22l-.228 1.46c-.025.158-.16.274-.32.274h-1.63l-1.05 6.645c-.025.156-.16.272-.32.272M11.467 17.202c-.027.164-.228.223-.345.104-.395-.405-.975-.62-1.6-.62-1.41 0-2.526 1.083-2.75 2.458-.21 1.4.588 2.41 2.022 2.41.592 0 1.22-.225 1.74-.6.144-.105.34.02.313.194l-.328 2.03c-.02.12-.108.22-.226.254-.702.207-1.24.355-1.9.355-3.823 0-4.435-3.266-4.238-4.655.553-3.894 3.712-4.786 5.65-4.678.623.034 1.182.117 1.73.323.177.067.282.25.252.436l-.32 1.99\" style=\"fill: #21306F\" />\n      <path d=\"M23.184 7.67c-.11.717-.657.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.105.123.137.305.097.557zm-.23-1.87h-1.998c-.137 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h1.024c.095 0 .177-.07.192-.164l.23-1.452c.02-.135.136-.235.273-.235h.63c1.317 0 2.076-.636 2.275-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51z\" style=\"fill: #0093C7\" />\n      <path d=\"M8.936 7.67c-.11.717-.656.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.104.123.136.305.096.557zm-.23-1.87H6.708c-.136 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h.955c.136 0 .252-.1.274-.234l.217-1.382c.02-.135.137-.235.274-.235h.633c1.316 0 2.075-.636 2.274-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51zM13.343 9.51c-.092.545-.526.912-1.08.912-.277 0-.5-.09-.642-.258-.14-.168-.193-.406-.148-.672.086-.542.527-.92 1.072-.92.27 0 .492.09.637.26.148.172.205.412.163.677zm1.334-1.863h-.957c-.082 0-.152.06-.164.14l-.042.268-.067-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.135 1.923-.092.56.038 1.097.356 1.47.29.344.708.487 1.204.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.017-.102-.06-.193-.163-.193z\" style=\"fill: #21306F\" />\n      <path d=\"M27.59 9.51c-.09.545-.525.912-1.078.912-.278 0-.5-.09-.643-.258-.142-.168-.195-.406-.15-.672.086-.542.526-.92 1.07-.92.273 0 .494.09.64.26.146.172.203.412.16.677zm1.334-1.863h-.956c-.082 0-.152.06-.164.14l-.043.268-.065-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.136 1.923-.092.56.038 1.097.355 1.47.292.344.71.487 1.205.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.015-.102-.063-.193-.166-.193z\" style=\"fill: #0093C7\" />\n      <path d=\"M19.77 7.647h-.96c-.092 0-.178.045-.23.122L17.254 9.72l-.562-1.877c-.035-.118-.143-.198-.266-.198h-.945c-.113 0-.194.112-.157.22l1.06 3.108-.997 1.404c-.078.11 0 .262.136.262h.96c.092 0 .177-.044.23-.12l3.196-4.614c.077-.11-.002-.26-.137-.26\" style=\"fill: #21306F\" />\n      <path d=\"M30.052 5.94l-.82 5.216c-.016.1.062.192.165.192h.824c.138 0 .254-.1.275-.234l.81-5.122c.015-.1-.064-.193-.166-.193h-.924c-.082 0-.15.06-.164.14\" style=\"fill: #0093C7\" />\n    </symbol>\n\n    <symbol id=\"iconCardFront\" viewBox=\"0 0 48 29\">\n      <title>Generic Card</title>\n      <path d=\"M46.177 29H1.823C.9 29 0 28.13 0 27.187V1.813C0 .87.9 0 1.823 0h44.354C47.1 0 48 .87 48 1.813v25.375C48 28.13 47.1 29 46.177 29z\" style=\"fill: #FFF\" />\n      <path d=\"M4.8 9.14c0-.427.57-.973 1.067-.973h7.466c.496 0 1.067.546 1.067.972v3.888c0 .425-.57.972-1.067.972H5.867c-.496 0-1.067-.547-1.067-.972v-3.89z\" style=\"fill: #828282\" />\n      <rect style=\"fill: #828282\" x=\"10.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <rect style=\"fill: #828282\" x=\"4.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <path d=\"M6.55 16.333h34.9c.966 0 1.75.784 1.75 1.75 0 .967-.784 1.75-1.75 1.75H6.55c-.966 0-1.75-.783-1.75-1.75 0-.966.784-1.75 1.75-1.75z\" style=\"fill: #828282\" />\n      <ellipse style=\"fill: #828282\" cx=\"40.2\" cy=\"6.417\" rx=\"3\" ry=\"2.917\" />\n    </symbol>\n\n    <symbol id=\"iconCVVBack\" viewBox=\"0 0 40 24\">\n      <title>CVV Back</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\"/>\n      <path style=\"fill: #828282\" d=\"M0 5h40v4H0z\" />\n      <path d=\"M20 13.772v5.456c0 .423.37.772.82.772h13.36c.45 0 .82-.35.82-.772v-5.456c0-.423-.37-.772-.82-.772H20.82c-.45 0-.82.35-.82.772zm-1-.142c0-.9.76-1.63 1.68-1.63h13.64c.928 0 1.68.737 1.68 1.63v5.74c0 .9-.76 1.63-1.68 1.63H20.68c-.928 0-1.68-.737-1.68-1.63v-5.74z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"16.5\" r=\"1.5\" />\n    </symbol>\n\n    <symbol id=\"iconCVVFront\" viewBox=\"0 0 40 24\">\n      <title>CVV Front</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\" />\n      <path d=\"M16 5.772v5.456c0 .423.366.772.81.772h17.38c.444 0 .81-.348.81-.772V5.772C35 5.35 34.634 5 34.19 5H16.81c-.444 0-.81.348-.81.772zm-1-.142c0-.9.75-1.63 1.66-1.63h17.68c.917 0 1.66.737 1.66 1.63v5.74c0 .9-.75 1.63-1.66 1.63H16.66c-.917 0-1.66-.737-1.66-1.63V5.63z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"19.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"8.5\" r=\"1.5\" />\n      <path d=\"M4 7.833C4 7.47 4.476 7 4.89 7h6.22c.414 0 .89.47.89.833v3.334c0 .364-.476.833-.89.833H4.89c-.414 0-.89-.47-.89-.833V7.833zM4 18.5c0-.828.668-1.5 1.5-1.5h29c.828 0 1.5.666 1.5 1.5 0 .828-.668 1.5-1.5 1.5h-29c-.828 0-1.5-.666-1.5-1.5z\" style=\"fill: #828282\" />\n    </symbol>\n\n    <symbol id=\"iconCheck\" viewBox=\"0 0 42 32\">\n      <title>Check</title>\n      <path class=\"path1\" d=\"M14.379 29.76L39.741 3.415 36.194.001l-21.815 22.79-10.86-11.17L0 15.064z\" />\n    </symbol>\n\n    <symbol id=\"iconX\" viewBox=\"0 0 32 32\">\n      <title>X</title>\n      <path d=\"M29 3.54L25.46 0 14.5 10.97 3.54 0.01 0 3.54 10.96 14.5 0.01 25.46 3.54 28.99 14.5 18.04 25.46 29 28.99 25.46 18.03 14.5 29 3.54z\"/>\n    </symbol>\n\n    <symbol id=\"iconLockLoader\" viewBox=\"0 0 28 32\">\n      <title>Lock Loader</title>\n      <path d=\"M6 10V8c0-4.422 3.582-8 8-8 4.41 0 8 3.582 8 8v2h-4V7.995C18 5.79 16.205 4 14 4c-2.21 0-4 1.792-4 3.995V10H6zM.997 14c-.55 0-.997.445-.997.993v16.014c0 .548.44.993.997.993h26.006c.55 0 .997-.445.997-.993V14.993c0-.548-.44-.993-.997-.993H.997z\" />\n    </symbol>\n\n    <symbol id=\"iconError\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n      <path d=\"M0 0h24v24H0z\" style=\"fill: none\" />\n      <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\" />\n    </symbol>\n\n    <symbol id=\"logoApplePay\" viewBox=\"0 0 165.52 105.97\" width=\"24\">\n      <title>Apple Pay Logo</title>\n      <defs>\n      <style>\n        .cls-1{fill:#231f20;}.cls-2{fill:#fff;}\n      </style>\n      </defs>\n      <path id=\"_Path_\" data-name=\"&lt;Path&gt;\" class=\"cls-1\" d=\"M150.7 0h-139a20.78 20.78 0 0 0-3.12.3 10.51 10.51 0 0 0-3 1 9.94 9.94 0 0 0-4.31 4.32 10.46 10.46 0 0 0-1 3A20.65 20.65 0 0 0 0 11.7v82.57a20.64 20.64 0 0 0 .3 3.11 10.46 10.46 0 0 0 1 3 9.94 9.94 0 0 0 4.35 4.35 10.47 10.47 0 0 0 3 1 20.94 20.94 0 0 0 3.11.27h142.06a21 21 0 0 0 3.11-.27 10.48 10.48 0 0 0 3-1 9.94 9.94 0 0 0 4.35-4.35 10.4 10.4 0 0 0 1-3 20.63 20.63 0 0 0 .27-3.11V11.69a20.64 20.64 0 0 0-.27-3.11 10.4 10.4 0 0 0-1-3 9.94 9.94 0 0 0-4.35-4.35 10.52 10.52 0 0 0-3-1 20.84 20.84 0 0 0-3.1-.23h-1.43z\"/>\n      <path id=\"_Path_2\" data-name=\"&lt;Path&gt;\" class=\"cls-2\" d=\"M150.7 3.53h3.03a17.66 17.66 0 0 1 2.58.22 7 7 0 0 1 2 .65 6.41 6.41 0 0 1 2.8 2.81 6.88 6.88 0 0 1 .64 2 17.56 17.56 0 0 1 .22 2.58v82.38a17.54 17.54 0 0 1-.22 2.59 6.85 6.85 0 0 1-.64 2 6.41 6.41 0 0 1-2.81 2.81 6.92 6.92 0 0 1-2 .65 18 18 0 0 1-2.57.22H11.79a18 18 0 0 1-2.58-.22 6.94 6.94 0 0 1-2-.65 6.41 6.41 0 0 1-2.8-2.8 6.93 6.93 0 0 1-.65-2 17.47 17.47 0 0 1-.22-2.58v-82.4a17.49 17.49 0 0 1 .22-2.59 6.92 6.92 0 0 1 .65-2 6.41 6.41 0 0 1 2.8-2.8 7 7 0 0 1 2-.65 17.63 17.63 0 0 1 2.58-.22H150.7\"/>\n      <g id=\"_Group_\" data-name=\"&lt;Group&gt;\">\n      <g id=\"_Group_2\" data-name=\"&lt;Group&gt;\">\n      <path id=\"_Path_3\" data-name=\"&lt;Path&gt;\" class=\"cls-1\" d=\"M43.51 35.77a9.15 9.15 0 0 0 2.1-6.52 9.07 9.07 0 0 0-6 3.11 8.56 8.56 0 0 0-2.16 6.27 7.57 7.57 0 0 0 6.06-2.86\"/>\n      <path id=\"_Path_4\" data-name=\"&lt;Path&gt;\" class=\"cls-1\" d=\"M45.59 39.08c-3.35-.2-6.2 1.9-7.79 1.9s-4-1.8-6.7-1.75a9.87 9.87 0 0 0-8.4 5.1c-3.6 6.2-.95 15.4 2.55 20.45 1.7 2.5 3.75 5.25 6.45 5.15s3.55-1.65 6.65-1.65 4 1.65 6.7 1.6 4.55-2.5 6.25-5a22.2 22.2 0 0 0 2.8-5.75 9.08 9.08 0 0 1-5.45-8.25A9.26 9.26 0 0 1 53 43.13a9.57 9.57 0 0 0-7.45-4\"/>\n      </g>\n      <g id=\"_Group_3\" data-name=\"&lt;Group&gt;\">\n      <path id=\"_Compound_Path_\" data-name=\"&lt;Compound Path&gt;\" class=\"cls-1\" d=\"M79 32.11c7.28 0 12.35 5 12.35 12.32S86.15 56.8 78.79 56.8h-8.06v12.82h-5.82V32.11zm-8.27 19.81h6.68c5.07 0 8-2.73 8-7.46S82.48 37 77.44 37h-6.71z\"/>\n      <path id=\"_Compound_Path_2\" data-name=\"&lt;Compound Path&gt;\" class=\"cls-1\" d=\"M92.76 61.85c0-4.81 3.67-7.56 10.42-8l7.25-.44v-2.06c0-3-2-4.7-5.56-4.7-2.94 0-5.07 1.51-5.51 3.82h-5.24c.16-4.86 4.73-8.4 10.92-8.4 6.65 0 11 3.48 11 8.89v18.66h-5.38v-4.5h-.13a9.59 9.59 0 0 1-8.58 4.78c-5.42 0-9.19-3.22-9.19-8.05zm17.68-2.42v-2.11l-6.47.42c-3.64.23-5.54 1.59-5.54 4s2 3.77 5.07 3.77c3.95-.05 6.94-2.57 6.94-6.08z\"/>\n      <path id=\"_Compound_Path_3\" data-name=\"&lt;Compound Path&gt;\" class=\"cls-1\" d=\"M121 79.65v-4.5a17.14 17.14 0 0 0 1.72.1c2.57 0 4-1.09 4.91-3.9l.52-1.66-9.88-27.29h6.08l6.86 22.15h.13l6.86-22.15h5.93l-10.21 28.67c-2.34 6.58-5 8.73-10.68 8.73a15.93 15.93 0 0 1-2.24-.15z\"/>\n      </g>\n      </g>\n    </symbol>\n    <symbol id=\"logoGooglePay\" viewbox=\"0 0 752 400\" >\n      <g>\n        <title>Google Pay Mark</title>\n        <path d=\"m552.7,0l-352,0c-110,0 -200,90 -200,200l0,0c0,110 90,200 200,200l352,0c110,0 200,-90 200,-200l0,0c0,-110 -90,-200 -200,-200z\" fill=\"#FFFFFF\" id=\"Base_1_\"/>\n        <path d=\"m552.7,16.2c24.7,0 48.7,4.9 71.3,14.5c21.9,9.3 41.5,22.6 58.5,39.5c16.9,16.9 30.2,36.6 39.5,58.5c9.6,22.6 14.5,46.6 14.5,71.3s-4.9,48.7 -14.5,71.3c-9.3,21.9 -22.6,41.5 -39.5,58.5c-16.9,16.9 -36.6,30.2 -58.5,39.5c-22.6,9.6 -46.6,14.5 -71.3,14.5l-352,0c-24.7,0 -48.7,-4.9 -71.3,-14.5c-21.9,-9.3 -41.5,-22.6 -58.5,-39.5c-16.9,-16.9 -30.2,-36.6 -39.5,-58.5c-9.6,-22.6 -14.5,-46.6 -14.5,-71.3s4.9,-48.7 14.5,-71.3c9.3,-21.9 22.6,-41.5 39.5,-58.5c16.9,-16.9 36.6,-30.2 58.5,-39.5c22.6,-9.6 46.6,-14.5 71.3,-14.5l352,0m0,-16.2l-352,0c-110,0 -200,90 -200,200l0,0c0,110 90,200 200,200l352,0c110,0 200,-90 200,-200l0,0c0,-110 -90,-200 -200,-200l0,0z\" fill=\"#3C4043\" id=\"Outline\"/>\n        <g id=\"G_Pay_Lockup_1_\">\n         <g id=\"Pay_Typeface_3_\">\n          <path d=\"m359.3,214.2l0,60.5l-19.2,0l0,-149.4l50.9,0c12.9,0 23.9,4.3 32.9,12.9c9.2,8.6 13.8,19.1 13.8,31.5c0,12.7 -4.6,23.2 -13.8,31.7c-8.9,8.5 -19.9,12.7 -32.9,12.7l-31.7,0l0,0.1zm0,-70.5l0,52.1l32.1,0c7.6,0 14,-2.6 19,-7.7c5.1,-5.1 7.7,-11.3 7.7,-18.3c0,-6.9 -2.6,-13 -7.7,-18.1c-5,-5.3 -11.3,-7.9 -19,-7.9l-32.1,0l0,-0.1z\" fill=\"#3C4043\" id=\"Letter_p_3_\"/>\n          <path d=\"m487.9,169.1c14.2,0 25.4,3.8 33.6,11.4c8.2,7.6 12.3,18 12.3,31.2l0,63l-18.3,0l0,-14.2l-0.8,0c-7.9,11.7 -18.5,17.5 -31.7,17.5c-11.3,0 -20.7,-3.3 -28.3,-10s-11.4,-15 -11.4,-25c0,-10.6 4,-19 12,-25.2c8,-6.3 18.7,-9.4 32,-9.4c11.4,0 20.8,2.1 28.1,6.3l0,-4.4c0,-6.7 -2.6,-12.3 -7.9,-17c-5.3,-4.7 -11.5,-7 -18.6,-7c-10.7,0 -19.2,4.5 -25.4,13.6l-16.9,-10.6c9.3,-13.5 23.1,-20.2 41.3,-20.2zm-24.8,74.2c0,5 2.1,9.2 6.4,12.5c4.2,3.3 9.2,5 14.9,5c8.1,0 15.3,-3 21.6,-9s9.5,-13 9.5,-21.1c-6,-4.7 -14.3,-7.1 -25,-7.1c-7.8,0 -14.3,1.9 -19.5,5.6c-5.3,3.9 -7.9,8.6 -7.9,14.1z\" fill=\"#3C4043\" id=\"Letter_a_3_\"/>\n          <path d=\"m638.2,172.4l-64,147.2l-19.8,0l23.8,-51.5l-42.2,-95.7l20.9,0l30.4,73.4l0.4,0l29.6,-73.4l20.9,0z\" fill=\"#3C4043\" id=\"Letter_y_3_\"/>\n         </g>\n         <g id=\"G_Mark_1_\">\n          <path d=\"m282.93,202c0,-6.26 -0.56,-12.25 -1.6,-18.01l-80.48,0l0,33l46.35,0.01c-1.88,10.98 -7.93,20.34 -17.2,26.58l0,21.41l27.59,0c16.11,-14.91 25.34,-36.95 25.34,-62.99z\" fill=\"#4285F4\" id=\"Blue_500\"/>\n          <path d=\"m230.01,243.58c-7.68,5.18 -17.57,8.21 -29.14,8.21c-22.35,0 -41.31,-15.06 -48.1,-35.36l-28.46,0l0,22.08c14.1,27.98 43.08,47.18 76.56,47.18c23.14,0 42.58,-7.61 56.73,-20.71l-27.59,-21.4z\" fill=\"#34A853\" id=\"Green_500_1_\"/>\n          <path d=\"m150.09,200.05c0,-5.7 0.95,-11.21 2.68,-16.39l0,-22.08l-28.46,0c-5.83,11.57 -9.11,24.63 -9.11,38.47s3.29,26.9 9.11,38.47l28.46,-22.08c-1.73,-5.18 -2.68,-10.69 -2.68,-16.39z\" fill=\"#FABB05\" id=\"Yellow_500_1_\"/>\n          <path d=\"m200.87,148.3c12.63,0 23.94,4.35 32.87,12.85l24.45,-24.43c-14.85,-13.83 -34.21,-22.32 -57.32,-22.32c-33.47,0 -62.46,19.2 -76.56,47.18l28.46,22.08c6.79,-20.3 25.75,-35.36 48.1,-35.36z\" fill=\"#E94235\" id=\"Red_500\"/>\n         </g>\n        </g>\n       </g>\n    </symbol>\n\n    <symbol id=\"logoVenmo\" viewBox=\"0 0 48 32\">\n      <title>Venmo</title>\n      <g fill=\"none\" fill-rule=\"evenodd\">\n        <rect fill=\"#3D95CE\" width=\"47.4074074\" height=\"31.6049383\" rx=\"3.16049383\"/>\n        <path d=\"M33.1851852,10.1131555 C33.1851852,14.8373944 29.2425262,20.9745161 26.0425868,25.2839506 L18.7337285,25.2839506 L15.8024691,7.35534396 L22.202175,6.73384536 L23.7519727,19.4912014 C25.2000422,17.0781163 26.9870326,13.2859484 26.9870326,10.7005 C26.9870326,9.28531656 26.7500128,8.32139205 26.3796046,7.52770719 L32.207522,6.32098765 C32.8813847,7.45939896 33.1851852,8.63196439 33.1851852,10.1131555 Z\" fill=\"#FFF\"/>\n      </g>\n    </symbol>\n    <symbol id=\"buttonVenmo\" viewBox=\"0 0 295 42\">\n      <g fill=\"none\" fill-rule=\"evenodd\">\n        <rect fill=\"#3D95CE\" width=\"295\" height=\"42\" rx=\"3\"/>\n        <path d=\"M11.3250791 0C11.7902741.780434316 12 1.58428287 12 2.59970884 12 5.838396 9.27822123 10.0456806 7.06917212 13L2.02356829 13 0 .709099732 4.41797878.283033306 5.48786751 9.02879887C6.48752911 7.3745159 7.72116169 4.77480706 7.72116169 3.00236102 7.72116169 2.03218642 7.55753727 1.37137098 7.30182933.827262801L11.3250791 0 11.3250791 0zM17.5051689 5.68512193C18.333931 5.68512193 20.4203856 5.28483546 20.4203856 4.03281548 20.4203856 3.43161451 20.0177536 3.13172102 19.5432882 3.13172102 18.7131868 3.13172102 17.6238766 4.18269796 17.5051689 5.68512193L17.5051689 5.68512193zM17.4102028 8.1647385C17.4102028 9.69351403 18.2153451 10.293301 19.2827401 10.293301 20.4451012 10.293301 21.5580312 9.99340752 23.0045601 9.21725797L22.4597224 13.1234575C21.440541 13.649203 19.8521716 14 18.310433 14 14.3996547 14 13 11.49596 13 8.36552446 13 4.30815704 15.2767521 0 19.9706358 0 22.554932 0 24 1.52864698 24 3.65720949 24.0002435 7.08869546 19.8287953 8.13992948 17.4102028 8.1647385L17.4102028 8.1647385zM37 2.84753211C37 3.32189757 36.9261179 4.00994664 36.8526108 4.45959542L35.4649774 12.9998782 30.9621694 12.9998782 32.2279161 5.1711436C32.2519185 4.95879931 32.3256755 4.53131032 32.3256755 4.29412759 32.3256755 3.72466988 31.9603904 3.5825794 31.5212232 3.5825794 30.9379171 3.5825794 30.3532359 3.84326124 29.9638234 4.03356751L28.5281854 13 24 13 26.0686989.213683657 29.9878258.213683657 30.0374555 1.23425123C30.9620444.641294408 32.1795365 3.90379019e-8 33.9069526 3.90379019e-8 36.1955476-.000243475057 37 1.1387937 37 2.84753211L37 2.84753211zM51.2981937 1.39967969C52.6582977.49918987 53.9425913 0 55.7133897 0 58.1518468 0 59 1.13900518 59 2.84769558 59 3.32204771 58.9223438 4.01007745 58.8448195 4.4597136L57.3830637 12.9997565 52.6328518 12.9997565 53.9932194 5.00577861C54.0182698 4.792101 54.0708756 4.53142648 54.0708756 4.36608506 54.0708756 3.72493046 53.6854953 3.58272222 53.2224587 3.58272222 52.6325881 3.58272222 52.0429812 3.81989829 51.6052587 4.03369766L50.0914245 12.9998782 45.3423992 12.9998782 46.7027668 5.00590037C46.7278172 4.79222275 46.7788409 4.53154824 46.7788409 4.36620681 46.7788409 3.72505221 46.3933287 3.58284398 45.9318743 3.58284398 45.3153711 3.58284398 44.7000546 3.84351849 44.2893602 4.03381941L42.7740757 13 38 13 40.1814929.214042876 44.2643098.214042876 44.3925941 1.28145692C45.3423992.641763367 46.6253743.000487014507 48.3452809.000487014507 49.8344603 0 50.8094476.593061916 51.2981937 1.39967969L51.2981937 1.39967969zM67.5285327 5.39061542C67.5285327 4.29258876 67.2694573 3.54396333 66.4936812 3.54396333 64.7759775 3.54396333 64.4232531 6.76273249 64.4232531 8.4093242 64.4232531 9.65848482 64.7530184 10.4315735 65.5285529 10.4315735 67.1521242 10.4315735 67.5285327 7.03707905 67.5285327 5.39061542L67.5285327 5.39061542zM60 8.21054461C60 3.96893154 62.1170713 0 66.988027 0 70.6583423 0 72 2.29633967 72 5.46592624 72 9.65835674 69.905767 14 64.9173573 14 61.2233579 14 60 11.4294418 60 8.21054461L60 8.21054461z\" transform=\"translate(112 14)\" fill=\"#FFF\"/>\n      </g>\n    </symbol>\n\n    <symbol id=\"iconClose\" width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" overflow=\"visible\">\n      <path d=\"M16 5.414L14.586 4 10 8.586 5.414 4 4 5.414 8.586 10 4 14.586 5.414 16 10 11.414 14.586 16 16 14.586 11.414 10\"/>\n    </symbol>\n  </defs>\n</svg>\n";

var PASS_THROUGH_EVENTS = [
  'changeActiveView',
  'paymentMethodRequestable',
  'noPaymentMethodRequestable',
  'paymentOptionSelected',

  // Card View Events
  'card:binAvailable',
  'card:blur',
  'card:cardTypeChange',
  'card:empty',
  'card:focus',
  'card:inputSubmitRequest',
  'card:notEmpty',
  'card:validityChange',

  // 3DS Events
  '3ds:customer-canceled',
  '3ds:authentication-modal-render',
  '3ds:authentication-modal-close'
];
var UPDATABLE_CONFIGURATION_OPTIONS = [
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit,
  paymentOptionIDs.applePay,
  paymentOptionIDs.googlePay,
  'threeDSecure'
];
var UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED = [
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit,
  paymentOptionIDs.applePay,
  paymentOptionIDs.googlePay
];
var HAS_RAW_PAYMENT_DATA = {};
var VERSION = '1.30.1';

HAS_RAW_PAYMENT_DATA[constants.paymentMethodTypes.googlePay] = true;
HAS_RAW_PAYMENT_DATA[constants.paymentMethodTypes.applePay] = true;

/**
 * @typedef {object} Dropin~cardPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the card.
 * @property {object} details Additional account details. See a full list of details in the [Hosted Fields client reference](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#~tokenizePayload).
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard` when the method requested is a card.
 * @property {object} binData Information about the card based on the bin. Documented {@link Dropin~binData|here}.
 * @property {?boolean} vaulted If present and true, indicates that the payment method refers to a vaulted payment method.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 * @property {?boolean} liabilityShifted If 3D Secure is configured, whether or not liability did shift.
 * @property {?boolean} liabilityShiftPossible If 3D Secure is configured, whether or not liability shift is possible.
 * @property {?object} threeDSecureInfo If 3D Secure is configured, the `threeDSecureInfo` documented in the [Three D Secure client reference](http://braintree.github.io/braintree-web/3.78.2/ThreeDSecure.html#~verifyPayload)
 */

/**
 * @typedef {object} Dropin~paypalPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the PayPal account.
 * @property {?boolean} vaulted If present and true, indicates that the payment method refers to a vaulted payment method.
 * @property {object} details Additional PayPal account details. See a full list of details in the [PayPal client reference](http://braintree.github.io/braintree-web/3.78.2/PayPalCheckout.html#~tokenizePayload).
 * @property {string} type The payment method type, always `PayPalAccount` when the method requested is a PayPal account.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} Dropin~applePayPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the Apple Pay provided card.
 * @property {?boolean} vaulted If present and true, indicates that the payment method refers to a vaulted payment method.
 * @property {string} details.cardType Type of card, ex: Visa, Mastercard.
 * @property {string} details.cardHolderName The name of the card holder.
 * @property {string} details.dpanLastTwo Last two digits of card number.
 * @property {external:ApplePayPayment} details.rawPaymentData The raw response back from the Apple Pay flow, which includes billing/shipping address, phone and email if passed in as required parameters.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `ApplePayCard` when the method requested is an Apple Pay provided card.
 * @property {object} binData Information about the card based on the bin. Documented {@link Dropin~binData|here}.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} ApplePayPayment An [Apple Pay Payment object](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment).
 * @external ApplePayPayment
 * @see {@link https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment ApplePayPayment}
 */

/**
 * @typedef {object} Dropin~venmoPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the Venmo account.
 * @property {?boolean} vaulted If present and true, indicates that the payment method refers to a vaulted payment method.
 * @property {string} details.username The Venmo username.
 * @property {string} type The payment method type, always `VenmoAccount` when the method requested is a Venmo account.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} Dropin~googlePayPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the Google Pay card.
 * @property {?boolean} vaulted If present and true, indicates that the payment method refers to a vaulted payment method.
 * @property {string} details.cardType Type of card, ex: Visa, Mastercard.
 * @property {string} details.lastFour The last 4 digits of the card.
 * @property {string} details.lastTwo The last 2 digits of the card.
 * @property {boolean} details.isNetworkTokenized True if the card is network tokenized. A network tokenized card is a generated virtual card with a device-specific account number (DPAN) that is used in place of the underlying source card.
 * @property {string} details.bin First six digits of card number.
 * @property {external:GooglePayPaymentData} details.rawPaymentData The raw response back from the Google Pay flow, which includes shipping address, phone and email if passed in as required parameters.
 * @property {string} type The payment method type, always `AndroidPayCard` when the method requested is a Google Pay Card.
 * @property {object} binData Information about the card based on the bin. Documented {@link Dropin~binData|here}.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} GooglePayPaymentData A [Google Pay Payment Data object](https://developers.google.com/pay/api/web/object-reference#PaymentData).
 * @external GooglePayPaymentData
 * @see {@link https://developers.google.com/pay/api/web/object-reference#PaymentData PaymentData}
 */

/**
 * @typedef {object} Dropin~binData Information about the card based on the bin.
 * @property {string} commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} countryOfIssuance The country of issuance.
 * @property {string} debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} issuingBank The issuing bank.
 * @property {string} payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} productId The product id.
 */

/**
 * @name Dropin#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. `event` should be one of the following:
 *
 *  * [`changeActiveView`](#event:changeActiveView)
 *  * [`paymentMethodRequestable`](#event:paymentMethodRequestable)
 *  * [`noPaymentMethodRequestable`](#event:noPaymentMethodRequestable)
 *  * [`paymentOptionSelected`](#event:paymentOptionSelected)
 *
 *  _Card View Specific Events_
 *  * [`card:binAvailable`](#event:card:binAvailable)
 *  * [`card:blur`](#event:card:blur)
 *  * [`card:cardTypeChange`](#event:card:cardTypeChange)
 *  * [`card:empty`](#event:card:empty)
 *  * [`card:focus`](#event:card:focus)
 *  * [`card:inputSubmitRequest`](#event:card:inputSubmitRequest)
 *  * [`card:notEmpty`](#event:card:notEmpty)
 *  * [`card:validityChange`](#event:card:validityChange)
 *
 *  _3DS Specific Events_
 *  * [`3ds:customer-canceled`](#event:3ds:customer-canceled)
 *  * [`3ds:authentication-modal-render`](#event:3ds:authentication-modal-render)
 *  * [`3ds:authentication-modal-close`](#event:3ds:authentication-modal-close)
 * @returns {void}
 * @example
 * <caption>Dynamically enable or disable your submit button based on whether or not the payment method is requestable</caption>
 * var submitButton = document.querySelector('#submit-button');
 *
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   submitButton.addEventListener('click', function () {
 *     dropinInstance.requestPaymentMethod(function (err, payload) {
 *       // Send payload.nonce to your server.
 *     });
 *   });
 *
 *   if (dropinInstance.isPaymentMethodRequestable()) {
 *     // This will be true if you generated the client token
 *     // with a customer ID and there is a saved payment method
 *     // available to tokenize with that customer.
 *     submitButton.removeAttribute('disabled');
 *   }
 *
 *   dropinInstance.on('paymentMethodRequestable', function (event) {
 *     console.log(event.type); // The type of Payment Method, e.g 'CreditCard', 'PayPalAccount'.
 *     console.log(event.paymentMethodIsSelected); // true if a customer has selected a payment method when paymentMethodRequestable fires
 *
 *     submitButton.removeAttribute('disabled');
 *   });
 *
 *   dropinInstance.on('noPaymentMethodRequestable', function () {
 *     submitButton.setAttribute('disabled', true);
 *   });
 * });
 *
 * @example
 * <caption>Automatically submit nonce to server as soon as it becomes available</caption>
 * var submitButton = document.querySelector('#submit-button');
 *
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   function sendNonceToServer() {
 *     dropinInstance.requestPaymentMethod(function (err, payload) {
 *       if (err) {
 *         // handle errors
 *       }
 *
 *       // send payload.nonce to your server
 *     });
 *   }
 *
 *   // allows us to still request the payment method manually, such as
 *   // when filling out a credit card form
 *   submitButton.addEventListener('click', sendNonceToServer);
 *
 *   dropinInstance.on('paymentMethodRequestable', function (event) {
 *     // if the nonce is already available (via PayPal authentication
 *     // or by using a stored payment method), we can request the
 *     // nonce right away. Otherwise, we wait for the customer to
 *     // request the nonce by pressing the submit button once they
 *     // are finished entering their credit card details. This is
 *     // particularly important if your credit card form includes a
 *     // postal code input. The `paymentMethodRequestable` event
 *     // could fire before the customer has finished entering their
 *     // postal code. (International postal codes can be as few as 3
 *     // characters in length)
 *     if (event.paymentMethodIsSelected) {
 *       sendNonceToServer();
 *     }
 *   });
 * });
 * @example
 * <caption>Listen for when the customer navigates to different views in Drop-in</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   dropinInstance.on('changeActiveView', function (event) {
 *     // fires when the view changes, such as going from the
 *     // credit card view to the saved payment methods view
 *     event.oldActivePaymentViewId; // card
 *     event.newActivePaymentViewId; // methods
 *   });
 * });
 * @example
 * <caption>Listen on various events from the card view</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   dropinInstance.on('card:focus', function (event) {
 *     // a card field was focussed
 *   });
 *   dropinInstance.on('card:blur', function (event) {
 *     // a card field was blurred
 *   });
 *   dropinInstance.on('card:validityChange', function (event) {
 *     // the card form went from invalid to valid or valid to invalid
 *   });
 * });
 */

/**
 * @name Dropin#off
 * @function
 * @param {string} event The name of the event to which you are unsubscribing.
 * @param {function} handler A callback to unsubscribe from the event.
 * @description Unsubscribes a handler function to a named event.
 * @returns {void}
 * @example
 * <caption>Subscribe and then unsubscribe from event</caption>
 * var callback = function (event) {
 *   // do something
 * };
 * dropinInstance.on('paymentMethodRequestable', callback);
 *
 * // later on
 * dropinInstance.off('paymentMethodRequestable', callback);
 */

/**
 * This event is emitted when the payment method available in Drop-in changes. This includes when the state of Drop-in transitions from having no payment method available to having a payment method available and when the kind of payment method available changes. This event is not fired if there is no payment method available on initialization. To check if there is a payment method requestable on initialization, use {@link Dropin#isPaymentMethodRequestable|`isPaymentMethodRequestable`}.
 * @event Dropin#paymentMethodRequestable
 * @type {Dropin~paymentMethodRequestablePayload}
 */

/**
 * @typedef {object} Dropin~paymentMethodRequestablePayload
 * @description The event payload sent from {@link Dropin#on|`on`} with the {@link Dropin#event:paymentMethodRequestable|`paymentMethodRequestable`} event.
 * @property {string} type The type of payment method that is requestable. Either `CreditCard` or `PayPalAccount`.
 * @property {boolean} paymentMethodIsSelected A property to determine if a payment method is currently selected when the payment method becomes requestable.
 *
 * This will be `true` any time a payment method is visibly selected in the Drop-in UI, such as when PayPal authentication completes or a stored payment method is selected.
 *
 * This will be `false` when {@link Dropin#requestPaymentMethod|`requestPaymentMethod`} can be called, but a payment method is not currently selected. For instance, when a card form has been filled in with valid values, but has not been submitted to be converted into a payment method nonce.
 */

/**
 * This event is emitted when there is no payment method available in Drop-in. This event is not fired if there is no payment method available on initialization. To check if there is a payment method requestable on initialization, use {@link Dropin#isPaymentMethodRequestable|`isPaymentMethodRequestable`}. No payload is available in the callback for this event.
 * @event Dropin#noPaymentMethodRequestable
 */

/**
 * This event is emitted when the customer selects a new payment option type (e.g. PayPal, PayPal Credit, credit card). This event is not emitted when the user changes between existing saved payment methods. Only relevant when accepting multiple payment options.
 * @event Dropin#paymentOptionSelected
 * @type {Dropin~paymentOptionSelectedPayload}
 */

/**
 * This event is emitted when the Drop-in view changes what is presented as the active view.
 * @event Dropin#changeActiveView
 * @type {Dropin~changeActiveView}
 */

/**
 * @typedef {object} Dropin~changeActiveView
 * @description The event payload sent from {@link Dropin#on|`on`} with the {@link Dropin#event:changeActiveView|`changeActiveView`} event.
 * @property {string} previousViewId The id for the previously active view. Possible values are:
 * * `card` - The credit card form view
 * * `paypal` - The PayPal view
 * * `payapCredit` - The PayPal Credit view
 * * `venmo` - The Venmo View
 * * `googlePay` - The Google Pay view
 * * `applePay` - The Apple Pay view
 * * `methods` - The view presenting the available payment methods (already vaulted or tokenized payment methods)
 * * `options` - The view presenting the available payment options (where the customer chooses what payment method option to use). Note, if both the methods view and the options view are presented at the same time, `methods` will be shown as the view id.
 * * `delete-confirmation` - The view where the customer confirms they would like to delete their saved payment method.
 * @property {string} newViewId The id for the new active view. The possible values are the same as `previousViewId`.
 */

/**
 * The underlying [hosted fields `binAvailable` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:binAvailable).
 * @event Dropin#card:binAvailable
 * @type {Dropin~card:binAvailable}
 */

/**
 * The underlying [hosted fields `blur` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:blur).
 * @event Dropin#card:blur
 * @type {Dropin~card:blur}
 */

/**
 * The underlying [hosted fields `cardTypeChange` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:cardTypeChange).
 * @event Dropin#card:cardTypeChange
 * @type {Dropin~card:cardTypeChange}
 */

/**
 * The underlying [hosted fields `empty` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:empty).
 * @event Dropin#card:empty
 * @type {Dropin~card:empty}
 */

/**
 * The underlying [hosted fields `focus` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:focus).
 * @event Dropin#card:focus
 * @type {Dropin~card:focus}
 */

/**
 * The underlying [hosted fields `inputSubmitRequest` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:inputSubmitRequest).
 * @event Dropin#card:inputSubmitRequest
 * @type {Dropin~card:inputSubmitRequest}
 */

/**
 * The underlying [hosted fields `notEmpty` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:notEmpty).
 * @event Dropin#card:notEmpty
 * @type {Dropin~card:notEmpty}
 */

/**
 * The underlying [hosted fields `validityChange` event](http://braintree.github.io/braintree-web/3.78.2/HostedFields.html#event:validityChange).
 * @event Dropin#card:validityChange
 * @type {Dropin~card:validityChange}
 */

/**
 * The underlying [3D Secure `customer-canceled` event](http://braintree.github.io/braintree-web/3.78.2/ThreeDSecure.html#event:customer-canceled).
 * @event Dropin#3ds:customer-canceled
 * @type {Dropin~3ds:customer-canceled}
 */

/**
 * The underlying [3D Secure `authentication-modal-render` event](http://braintree.github.io/braintree-web/3.78.2/ThreeDSecure.html#event:authentication-modal-render).
 * @event Dropin#3ds:authentication-modal-render
 * @type {Dropin~3ds:authentication-modal-render}
 */

/**
 * The underlying [3D Secure `authentication-modal-close` event](http://braintree.github.io/braintree-web/3.78.2/ThreeDSecure.html#event:authentication-modal-close).
 * @event Dropin#3ds:authentication-modal-close
 * @type {Dropin~3ds:authentication-modal-close}
 */

/**
 * @typedef {object} Dropin~paymentOptionSelectedPayload
 * @description The event payload sent from {@link Dropin#on|`on`} with the {@link Dropin#event:paymentOptionSelected|`paymentOptionSelected`} event.
 * @property {string} paymentOption The payment option view selected. Either `card`, `paypal`, or `paypalCredit`.
 */

/**
 * @class
 * @param {object} options For create options, see {@link module:braintree-web-drop-in|dropin.create}.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web-drop-in|dropin.create} instead.</strong>
 * @classdesc This class represents a Drop-in component, that will create a pre-made UI for accepting cards and PayPal on your page. Instances of this class have methods for requesting a payment method and subscribing to events. For more information, see the [Drop-in guide](https://developers.braintreepayments.com/guides/drop-in/javascript/v3) in the Braintree Developer Docs. To be used in conjunction with the [Braintree Server SDKs](https://developers.braintreepayments.com/start/hello-server/).
 */
function Dropin(options) {
  this._client = options.client;
  this._componentID = uuid();
  this._dropinWrapper = document.createElement('div');
  this._dropinWrapper.id = 'braintree--dropin__' + this._componentID;
  this._dropinWrapper.setAttribute('data-braintree-id', 'wrapper');
  this._dropinWrapper.style.display = 'none';
  this._dropinWrapper.className = 'braintree-loading';
  this._merchantConfiguration = options.merchantConfiguration;

  EventEmitter.call(this);
}

EventEmitter.createChild(Dropin);

Dropin.prototype._initialize = function (callback) {
  var localizedStrings, localizedHTML;
  var self = this;
  var container = self._merchantConfiguration.container || self._merchantConfiguration.selector;

  if (!container) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('options.container is required.'));

    return;
  } else if (self._merchantConfiguration.container && self._merchantConfiguration.selector) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('Must only have one options.selector or options.container.'));

    return;
  }

  if (typeof container === 'string') {
    container = document.querySelector(container);
  }

  if (!container || container.nodeType !== 1) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('options.selector or options.container must reference a valid DOM node.'));

    return;
  }

  if (container.innerHTML.trim()) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('options.selector or options.container must reference an empty DOM node.'));

    return;
  }

  // Backfill with `en`
  self._strings = assign({}, translations.en);
  if (self._merchantConfiguration.locale) {
    localizedStrings = translations[self._merchantConfiguration.locale] || translations[self._merchantConfiguration.locale.split('_')[0]];
    // Fill `strings` with `localizedStrings` that may exist
    self._strings = assign(self._strings, localizedStrings);
  }

  if (!isUtf8()) {
    // non-utf-8 encodings often don't support the bullet character
    self._strings.endingIn = self._strings.endingIn.replace(/•/g, '*');
  }

  if (self._merchantConfiguration.translations) {
    Object.keys(self._merchantConfiguration.translations).forEach(function (key) {
      self._strings[key] = sanitizeHtml(self._merchantConfiguration.translations[key]);
    });
  }

  localizedHTML = Object.keys(self._strings).reduce(function (result, stringKey) {
    var stringValue = self._strings[stringKey];

    return result.replace(RegExp('{{' + stringKey + '}}', 'g'), stringValue);
  }, mainHTML);

  self._dropinWrapper.innerHTML = svgHTML + localizedHTML;
  container.appendChild(self._dropinWrapper);

  self._model = new DropinModel({
    client: self._client,
    container: container,
    componentID: self._componentID,
    merchantConfiguration: self._merchantConfiguration
  });

  self._injectStylesheet();

  self._model.initialize().then(function () {
    self._model.on('cancelInitialization', function (err) {
      self._dropinWrapper.innerHTML = '';
      analytics.sendEvent(self._client, 'load-error');
      callback(err);
    });

    self._model.on('asyncDependenciesReady', function () {
      if (self._model.hasAtLeastOneAvailablePaymentOption()) {
        analytics.sendEvent(self._client, 'appeared');
        self._disableErroredPaymentMethods();

        self._handleAppSwitch();

        self._model.confirmDropinReady();

        callback(null, self);
      } else {
        self._model.cancelInitialization(new DropinError('All payment options failed to load.'));
      }
    });

    PASS_THROUGH_EVENTS.forEach(function (eventName) {
      self._model.on(eventName, function (event) {
        self._emit(eventName, event);
      });
    });

    return self._setUpDependenciesAndViews();
  }).catch(function (err) {
    self.teardown().then(function () {
      callback(err);
    });
  });
};

/**
 * Modify your configuration initially set in {@link module:braintree-web-drop-in|`dropin.create`}.
 *
 * If `updateConfiguration` is called after a user completes the PayPal authorization flow, any PayPal accounts not stored in the Vault record will be removed.
 * @public
 * @param {string} property The top-level property to update. Either `paypal`, `paypalCredit`, `applePay`, or `googlePay`.
 * @param {string} key The key of the property to update, such as `amount` or `currency`.
 * @param {any} value The value of the property to update. Must be the type of the property specified in {@link module:braintree-web-drop-in|`dropin.create`}.
 * @returns {void}
 * @example
 * dropinInstance.updateConfiguration('paypal', 'amount', '10.00');
 */
Dropin.prototype.updateConfiguration = function (property, key, value) {
  var view;

  if (UPDATABLE_CONFIGURATION_OPTIONS.indexOf(property) === -1) {
    return;
  }

  if (property === 'threeDSecure') {
    if (this._threeDSecure) {
      this._threeDSecure.updateConfiguration(key, value);
    }

    return;
  }

  view = this._mainView.getView(property);

  if (!view) {
    return;
  }

  view.updateConfiguration(key, value);

  if (UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED.indexOf(property) === -1) {
    return;
  }

  this._removeUnvaultedPaymentMethods(function (paymentMethod) {
    return paymentMethod.type === constants.paymentMethodTypes[property];
  });
  this._navigateToInitialView();
};

/**
 * Get a list of the available payment methods presented to the user. This is useful for knowing if a paricular payment option was presented to a customer that is browser dependant such as Apple Pay, Google Pay and Venmo. Returns an array of strings. Possible values:
 * * `applePay`
 * * `card`
 * * `googlePay`
 * * `paypalCredit`
 * * `paypal`
 * * `venmo`
 *
 * @public
 * @returns {string[]} An array of possible payment options.
 * @example
 * var paymentOptions = dropinInstance.getAvailablePaymentOptions(); // ['card', 'venmo', 'paypal']
 *
 * if (paymentOptions.includes('venmo')) {
 *   // special logic for when venmo is displayed
 * }
 */
Dropin.prototype.getAvailablePaymentOptions = function () {
  return this._model.supportedPaymentOptions;
};

/**
 * Removes the currently selected payment method and returns the customer to the payment options view. Does not remove vaulted payment methods.
 * @public
 * @returns {void}
 * @example
 * dropinInstance.requestPaymentMethod(function (requestPaymentMethodError, payload) {
 *   if (requestPaymentMethodError) {
 *     // handle errors
 *     return;
 *   }
 *
 *   functionToSendNonceToServer(payload.nonce, function (transactionError, response) {
 *     if (transactionError) {
 *       // transaction sale with selected payment method failed
 *       // clear the selected payment method and add a message
 *       // to the checkout page about the failure
 *       dropinInstance.clearSelectedPaymentMethod();
 *       divForErrorMessages.textContent = 'my error message about entering a different payment method.';
 *     } else {
 *       // redirect to success page
 *     }
 *   });
 * });
 */
Dropin.prototype.clearSelectedPaymentMethod = function () {
  this._removeUnvaultedPaymentMethods();
  this._model.removeActivePaymentMethod();

  if (this._model.getPaymentMethods().length === 0) {
    this._navigateToInitialView();

    return;
  }

  this._mainView.showLoadingIndicator();

  this._model.refreshPaymentMethods().then(function () {
    this._navigateToInitialView();
    this._mainView.hideLoadingIndicator();
  }.bind(this));
};

Dropin.prototype._setUpDataCollector = function () {
  var self = this;
  var config = assign({}, self._merchantConfiguration.dataCollector, {client: self._client});

  this._dataCollector = new DataCollector(config);

  this._dataCollector.initialize().then(function () {
    self._model.asyncDependencyReady('dataCollector');
  }).catch(function (err) {
    self._model.cancelInitialization(new DropinError({
      message: 'Data Collector failed to set up.',
      braintreeWebError: err
    }));
  });
};

Dropin.prototype._setUpThreeDSecure = function () {
  var self = this;

  this._threeDSecure = new ThreeDSecure(this._client, this._model);

  this._threeDSecure.initialize().then(function () {
    self._model.asyncDependencyReady('threeDSecure');
  }).catch(function (err) {
    self._model.cancelInitialization(new DropinError({
      message: '3D Secure failed to set up.',
      braintreeWebError: err
    }));
  });
};

Dropin.prototype._setUpDependenciesAndViews = function () {
  if (this._merchantConfiguration.dataCollector) {
    this._setUpDataCollector();
  }

  if (this._merchantConfiguration.threeDSecure) {
    this._setUpThreeDSecure();
  }

  this._mainView = new MainView({
    client: this._client,
    element: this._dropinWrapper,
    model: this._model,
    strings: this._strings
  });
};

Dropin.prototype._removeUnvaultedPaymentMethods = function (filter) {
  filter = filter || function () { return true; };

  this._model.getPaymentMethods().forEach(function (paymentMethod) {
    if (filter(paymentMethod) && !paymentMethod.vaulted) {
      this._model.removePaymentMethod(paymentMethod);
    }
  }.bind(this));
};

Dropin.prototype._navigateToInitialView = function () {
  var hasNoSavedPaymentMethods, hasOnlyOneSupportedPaymentOption;
  var isOnMethodsView = this._mainView.primaryView.ID === paymentMethodsViewID;

  if (isOnMethodsView) {
    hasNoSavedPaymentMethods = this._model.getPaymentMethods().length === 0;

    if (hasNoSavedPaymentMethods) {
      hasOnlyOneSupportedPaymentOption = this._model.supportedPaymentOptions.length === 1;

      if (hasOnlyOneSupportedPaymentOption) {
        this._mainView.setPrimaryView(this._model.supportedPaymentOptions[0]);
      } else {
        this._mainView.setPrimaryView(paymentOptionsViewID);
      }
    }
  }
};

Dropin.prototype._supportsPaymentOption = function (paymentOption) {
  return this._model.supportedPaymentOptions.indexOf(paymentOption) !== -1;
};

Dropin.prototype._disableErroredPaymentMethods = function () {
  var paymentMethodOptionsElements;
  var failedDependencies = Object.keys(this._model.failedDependencies);

  if (failedDependencies.length === 0) {
    return;
  }

  paymentMethodOptionsElements = this._mainView.getOptionsElements();

  failedDependencies.forEach(function (paymentMethodId) {
    var element = paymentMethodOptionsElements[paymentMethodId];
    var div = element.div;
    var clickHandler = element.clickHandler;
    var error = this._model.failedDependencies[paymentMethodId];
    var errorMessageDiv = div.querySelector('.braintree-option__disabled-message');

    classList.add(div, 'braintree-disabled');
    div.removeEventListener('click', clickHandler);
    errorMessageDiv.innerHTML = constants.errors.DEVELOPER_MISCONFIGURATION_MESSAGE;
    console.error(error); // eslint-disable-line no-console
  }.bind(this));
};

Dropin.prototype._sendVaultedPaymentMethodAppearAnalyticsEvents = function () {
  var i, type;
  var typesThatSentAnEvent = {};
  var paymentMethods = this._model._paymentMethods;

  for (i = 0; i < paymentMethods.length; i++) {
    type = paymentMethods[i].type;

    if (type in typesThatSentAnEvent) {
      // prevents us from sending the analytic multiple times
      // for the same payment method type
      continue;
    }

    typesThatSentAnEvent[type] = true;

    analytics.sendEvent(this._client, 'vaulted-' + constants.analyticsKinds[type] + '.appear');
  }
};

Dropin.prototype._handleAppSwitch = function () {
  if (this._model.appSwitchError) {
    this._mainView.setPrimaryView(this._model.appSwitchError.id);
    this._model.reportError(this._model.appSwitchError.error);
  } else if (this._model.appSwitchPayload) {
    this._model.addPaymentMethod(this._model.appSwitchPayload);
  } else {
    this._sendVaultedPaymentMethodAppearAnalyticsEvents();
  }
};

/**
 * Requests a payment method object which includes the payment method nonce used by by the [Braintree Server SDKs](https://developers.braintreepayments.com/start/hello-server/).
 *
 * If a payment method is not available, an error will appear in the UI. When a callback is used, an error will be passed to it. If no callback is used, the returned Promise will be rejected with an error.
 * @public
 * @param {object} [options] All options for requesting a payment method.
 * @param {object} [options.threeDSecure] Any of the options in the [Braintree 3D Secure client reference](https://braintree.github.io/braintree-web/3.78.2/ThreeDSecure.html#verifyCard) except for `nonce`, `bin`, and `onLookupComplete`. If `amount` is provided, it will override the value of `amount` in the [3D Secure create options](module-braintree-web-drop-in.html#~threeDSecureOptions). The more options provided, the more likely the customer will not need to answer a 3DS challenge. When 3DS is enabled, both credit cards and non-network tokenized Google Pay cards will perform verfication. The recommended fields for achieving a 3DS v2 verification are:
 * * `email`
 * * `mobilePhoneNumber`
 * * `billingAddress`
 *
 * For an example of verifying 3D Secure within Drop-in, [check out this codepen](https://codepen.io/braintree/pen/KjWqGx).
 * @param {callback} [callback] May be used as the only parameter in requestPaymentMethod if no `options` are provided. The first argument will be an error if no payment method is available and will otherwise be null. The second argument will be an object containing a payment method nonce; either a {@link Dropin~cardPaymentMethodPayload|cardPaymentMethodPayload}, a {@link Dropin~paypalPaymentMethodPayload|paypalPaymentMethodPayload}, a {@link Dropin~venmoPaymentMethodPayload|venmoPaymentMethodPayload}, a {@link Dropin~googlePayPaymentMethodPayload|googlePayPaymentMethodPayload} or an {@link Dropin~applePayPaymentMethodPayload|applePayPaymentMethodPayload}. If no callback is provided, `requestPaymentMethod` will return a promise.
 * @returns {(void|Promise)} Returns a promise if no callback is provided.
 * @example <caption>Requesting a payment method</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // handle error
 *      return;
 *    }
 *    hiddenNonceInput.value = payload.nonce;
 *    form.submit();
 *  });
 * });
 * @example <caption>Requesting a payment method with data collector</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 * var hiddenDeviceDataInput = document.querySelector('#my-device-data-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // handle error
 *      return;
 *    }
 *    hiddenNonceInput.value = payload.nonce;
 *    hiddenDeviceDataInput.value = payload.deviceData;
 *    form.submit();
 *  });
 * });
 *
 * @example <caption>Requesting a payment method with 3D Secure</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // Handle error
 *      return;
 *    }
 *
 *    if (payload.liabilityShifted || (payload.type !== 'CreditCard' && payload.type !== 'AndroidPayCard')) {
 *      hiddenNonceInput.value = payload.nonce;
 *      form.submit();
 *    } else {
 *      // Decide if you will force the user to enter a different payment method
 *      // if liability was not shifted
 *      dropinInstance.clearSelectedPaymentMethod();
 *    }
 *  });
 * });
 */
Dropin.prototype.requestPaymentMethod = function (options) {
  // NEXT_MAJOR_VERSION
  // what should happen when this method is called while a payment
  // method is already being requested? Should it error? Should
  // they both resolve with the payload from the original request?
  // this is only important because when doing 3ds, multiple
  // requests in quick succession can get you into a state
  // where it errors because the 3ds verification is called twice
  var self = this;

  options = options || {};

  return this._mainView.requestPaymentMethod().then(function (payload) {
    if (self._shouldPerformThreeDSecureVerification(payload)) {
      self._mainView.showLoadingIndicator();

      return self._threeDSecure.verify(payload, options.threeDSecure).then(function (newPayload) {
        payload.nonce = newPayload.nonce;
        payload.liabilityShifted = newPayload.liabilityShifted;
        payload.liabilityShiftPossible = newPayload.liabilityShiftPossible;
        payload.threeDSecureInfo = newPayload.threeDSecureInfo;

        self._mainView.hideLoadingIndicator();

        return payload;
      }).catch(function (err) {
        self.clearSelectedPaymentMethod();

        return self._model.refreshPaymentMethods().then(function () {
          self._mainView.hideLoadingIndicator();

          return Promise.reject(new DropinError({
            message: 'Something went wrong during 3D Secure authentication. Please try again.',
            braintreeWebError: err
          }));
        });
      });
    }

    return payload;
  }).then(function (payload) {
    if (self._dataCollector) {
      payload.deviceData = self._dataCollector.getDeviceData();
    }

    return payload;
  }).then(function (payload) {
    return formatPaymentMethodPayload(payload);
  });
};

Dropin.prototype._shouldPerformThreeDSecureVerification = function (payload) {
  if (!this._threeDSecure) {
    return false;
  }

  if (payload.liabilityShifted != null) {
    return false;
  }

  if (payload.type === constants.paymentMethodTypes.card) {
    return true;
  }

  if (payload.type === constants.paymentMethodTypes.googlePay && payload.details.isNetworkTokenized === false) {
    return true;
  }

  return false;
};

Dropin.prototype._removeStylesheet = function () {
  var stylesheet = document.getElementById(constants.STYLESHEET_ID);

  if (stylesheet) {
    stylesheet.parentNode.removeChild(stylesheet);
  }
};

Dropin.prototype._injectStylesheet = function () {
  var assetsUrl;
  var loadStylesheetOptions = {
    id: constants.STYLESHEET_ID
  };

  if (document.getElementById(constants.STYLESHEET_ID)) { return; }

  assetsUrl = this._client.getConfiguration().gatewayConfiguration.assetsUrl;
  loadStylesheetOptions.href = assetsUrl + '/web/dropin/' + VERSION + '/css/dropin.css';

  if (this._model.isInShadowDom) {
    // if Drop-in is in the shadow DOM, put the
    // style sheet in the shadow DOM node instead of
    // in the head of the document
    loadStylesheetOptions.container = this._model.rootNode;
  }

  assets.loadStylesheet(loadStylesheetOptions);
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web-drop-in|dropin.create}. This may be be useful in a single-page app.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. No data is returned if teardown completes successfully. If no callback is provided, `teardown` will return a promise.
 * @returns {(void|Promise)} Returns a promise if no callback is provided.
 */
Dropin.prototype.teardown = function () {
  var teardownError;
  var promise = Promise.resolve();
  var self = this;

  this._removeStylesheet();

  if (this._mainView) {
    promise.then(function () {
      return self._mainView.teardown().catch(function (err) {
        teardownError = err;
      });
    });
  }

  if (this._dataCollector) {
    promise.then(function () {
      return this._dataCollector.teardown().catch(function (error) {
        teardownError = new DropinError({
          message: 'Drop-in errored tearing down Data Collector.',
          braintreeWebError: error
        });
      });
    }.bind(this));
  }

  if (this._threeDSecure) {
    promise.then(function () {
      return this._threeDSecure.teardown().catch(function (error) {
        teardownError = new DropinError({
          message: 'Drop-in errored tearing down 3D Secure.',
          braintreeWebError: error
        });
      });
    }.bind(this));
  }

  return promise.then(function () {
    return self._removeDropinWrapper();
  }).then(function () {
    if (teardownError) {
      return Promise.reject(teardownError);
    }

    return Promise.resolve();
  });
};

/**
 * Returns a boolean indicating if a payment method is available through {@link Dropin#requestPaymentMethod|requestPaymentMethod}. Particularly useful for detecting if using a client token with a customer ID to show vaulted payment methods.
 * @public
 * @returns {Boolean} True if a payment method is available, otherwise false.
 */
Dropin.prototype.isPaymentMethodRequestable = function () {
  return this._model.isPaymentMethodRequestable();
};

Dropin.prototype._removeDropinWrapper = function () {
  this._dropinWrapper.parentNode.removeChild(this._dropinWrapper);

  return Promise.resolve();
};

function formatPaymentMethodPayload(paymentMethod) {
  var formattedPaymentMethod = {
    nonce: paymentMethod.nonce,
    details: paymentMethod.details,
    type: paymentMethod.type
  };

  if (paymentMethod.vaulted != null) {
    formattedPaymentMethod.vaulted = paymentMethod.vaulted;
  }

  if (paymentMethod.type === constants.paymentMethodTypes.card) {
    formattedPaymentMethod.description = paymentMethod.description;
  }

  if (paymentMethod.type in HAS_RAW_PAYMENT_DATA) {
    formattedPaymentMethod.details.rawPaymentData = paymentMethod.rawPaymentData;
  }

  if (typeof paymentMethod.liabilityShiftPossible === 'boolean') {
    formattedPaymentMethod.liabilityShifted = paymentMethod.liabilityShifted;
    formattedPaymentMethod.liabilityShiftPossible = paymentMethod.liabilityShiftPossible;
  }

  if (paymentMethod.threeDSecureInfo) {
    formattedPaymentMethod.threeDSecureInfo = paymentMethod.threeDSecureInfo;
  }

  if (paymentMethod.deviceData) {
    formattedPaymentMethod.deviceData = paymentMethod.deviceData;
  }

  if (paymentMethod.binData) {
    formattedPaymentMethod.binData = paymentMethod.binData;
  }

  return formattedPaymentMethod;
}

module.exports = wrapPrototype(Dropin);

},{"./constants":191,"./dropin-model":192,"./lib/analytics":196,"./lib/assign":197,"./lib/data-collector":200,"./lib/dropin-error":201,"./lib/is-utf-8":205,"./lib/promise":208,"./lib/sanitize-html":209,"./lib/three-d-secure":211,"./translations":232,"./views/main-view":251,"./views/payment-methods-view":253,"./views/payment-options-view":254,"@braintree/asset-loader":1,"@braintree/class-list":39,"@braintree/event-emitter":40,"@braintree/uuid":46,"@braintree/wrap-promise":50}],194:[function(require,module,exports){
'use strict';
/**
 * @module braintree-web-drop-in
 * @description There are two ways to integrate Drop-in into your page: a script tag integration and a JavaScript integration using [`dropin.create`](#.create).
 *
 * The script tag integration is the fastest way to integrate. All you need to do is add the Drop-in script inside your form element where you want Drop-in to appear and include a `data-braintree-dropin-authorization` property with your [tokenization key](https://developers.braintreepayments.com/guides/authorization/tokenization-key/javascript/v3) or [client token](https://developers.braintreepayments.com/guides/authorization/client-token).
 *
 * When your form is submitted, Drop-in will intercept the form submission and attempt to tokenize the payment method. If the tokenization is successful, it will insert the payment method nonce into a hidden input with the name `payment_method_nonce` and then submit your form. If the tokenization is unsuccessful, a relevant error will be shown in the UI.
 *
 * If you have data collector enabled, the device data will be injected into a hidden input with the name `device_data` before form submission.
 *
 * Specify creation options as data attributes in your script tag, as shown in the examples below. The following configuration properties may be set:
 *
 * * `data-locale`
 * * `data-card.cardholder-name.required`
 * * `data-payment-option-priority`
 * * `data-data-collector.kount`
 * * `data-data-collector.paypal`
 * * `data-paypal.amount`
 * * `data-paypal.currency`
 * * `data-paypal.flow`
 * * `data-paypal-credit.amount`
 * * `data-paypal-credit.currency`
 * * `data-paypal-credit.flow`
 *
 * For more control and customization, use [`dropin.create` instead](#.create).
 *
 * See our [demo app](../../script-tag-integration.html) for an example of using our script tag integration.
 *
 * @example
 * <caption>A full example accepting only cards</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="utf-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"
 *        data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *       ></script>
 *       <input type="submit" value="Purchase"></input>
 *     </form>
 *   </body>
 * </html>
 *
 * @example
 * <caption>A full example accepting cards, PayPal, and PayPal credit</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="utf-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"
 *        data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *        data-paypal.flow="checkout"
 *        data-paypal.amount="10.00"
 *        data-paypal.currency="USD"
 *        data-paypal-credit.flow="vault"
 *       ></script>
 *       <input type="submit" value="Purchase"></input>
 *     </form>
 *   </body>
 * </html>
 *
 * @example
 * <caption>Specifying a locale and payment option priority</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-locale="de_DE"
 *    data-payment-option-priority='["paypal","card", "paypalCredit"]'
 *    data-paypal.flow="checkout"
 *    data-paypal.amount="10.00"
 *    data-paypal.currency="USD"
 *    data-paypal-credit.flow="vault"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 *
 * @example
 * <caption>Including an optional cardholder name field in card form</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-card.cardholder-name.required="false"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 *
 * @example
 * <caption>Including a required cardholder name field in card form</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-card.cardholder-name.required="true"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 */

var Dropin = require('./dropin');
var client = require('braintree-web/client');
var createFromScriptTag = require('./lib/create-from-script-tag');
var constants = require('./constants');
var analytics = require('./lib/analytics');
var DropinError = require('./lib/dropin-error');
var Promise = require('./lib/promise');
var wrapPromise = require('@braintree/wrap-promise');

var VERSION = '1.30.1';

/**
 * @typedef {object} cardCreateOptions The configuration options for cards. Internally, Drop-in uses [Hosted Fields](http://braintree.github.io/braintree-web/3.78.2/module-braintree-web_hosted-fields.html) to render the card form. The `overrides.fields` and `overrides.styles` allow the Hosted Fields to be customized.
 *
 * @param {(boolean|object)} [cardholderName] Will enable a cardholder name field above the card number field. If set to an object, you can specify whether or not the field is required. If set to a `true`, it will default the field to being present, but not required.
 * @param {boolean} [cardholderName.required=false] When true, the cardholder name field will be required to request the payment method nonce.
 * @param {object} [overrides.fields] The Hosted Fields [`fields` options](http://braintree.github.io/braintree-web/3.78.2/module-braintree-web_hosted-fields.html#~fieldOptions). Only `number`, `cvv`, `expirationDate` and `postalCode` can be configured. Each is a [Hosted Fields `field` object](http://braintree.github.io/braintree-web/3.78.2/module-braintree-web_hosted-fields.html#~field). `selector` cannot be modified.
 * @param {object} [overrides.styles] The Hosted Fields [`styles` options](http://braintree.github.io/braintree-web/3.78.2/module-braintree-web_hosted-fields.html#~styleOptions). These can be used to add custom styles to the Hosted Fields iframes. To style the rest of Drop-in, [review the documentation for customizing Drop-in](https://developers.braintreepayments.com/guides/drop-in/customization/javascript/v3#customize-your-ui).
 * @param {boolean} [clearFieldsAfterTokenization=true] When false, the card form will not clear the card data when the customer returns to the card view after a successful tokenization.
 * @param {object} [vault] Configuration for vaulting credit cards. Only applies when using a [client token with a customer id](https://developers.braintreepayments.com/reference/request/client-token/generate/#customer_id).
 * @param {boolean} [vault.allowVaultCardOverride=false] When true, the card form will include an option to let the customer decide not to vault the credit card they enter.
 * @param {boolean} [vault.vaultCard=true] Whether or not to vault the card upon tokenization. When set to `false` with `allowVaultCardOverride` set to `false`, then cards will not be vaulted.
 */

/**
 * @typedef {object} dataCollectorOptions The configuration options for Data Collector. Requires [advanced fraud protection](https://developers.braintreepayments.com/guides/advanced-fraud-tools/client-side/javascript/v3) to be enabled in the Braintree gateway. If using Kount, contact our [support team](https://developers.braintreepayments.com/forms/contact) to configure your Kount ID. The device data will be included on the {@link Dropin#requestPaymentMethod|requestPaymentMethod payload}.
 *
 * @param {boolean} [kount] If true, Kount fraud data collection is enabled.
 */

/**
 * @typedef {object} threeDSecureOptions Configuration options to pass when creating the 3D Secure module used in Drop-in. `amount` for 3D Secure verification can be passed here, but it's recomended that it and all other 3D Secure verification options be passed to the {@link Dropin#requestPaymentMethod|requestPaymentMethod options} instead. Any `cardinalSDKConfig` options must be passed here when creating Drop-in.
 *
 * @param {options} cardinalSDKConfig A configuration object to adjust the configuration for the underlying Cardinal SDK (Braintree's 3D Secure provider). See [`cardinalSDKConfig` options](http://braintree.github.io/braintree-web/3.78.2/module-braintree-web_three-d-secure.html#.create) for all options.
 * @param {string} amount __Deprecated__ The amount to verify with 3D Secure. Set amount in the {@link Dropin#requestPaymentMethod|requestPaymentMethod options} instead.
 */

/** @typedef {object} paypalCreateOptions The configuration options for PayPal and PayPalCredit. For a full list of options see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/3.78.2/PayPalCheckout.html#createPayment).
 *
 * @param {string} flow Either `checkout` for a one-time [Checkout with PayPal](https://developers.braintreepayments.com/guides/paypal/checkout-with-paypal/javascript/v3) flow or `vault` for a [Vault flow](https://developers.braintreepayments.com/guides/paypal/vault/javascript/v3). Required when using PayPal or PayPal Credit.
 * @param {(string|number)} [amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [currency] The currency code of the amount, such as `USD`. Required when using the Checkout flow.
 * @param {object} [buttonStyle] The style object to apply to the PayPal button. Button customization includes color, shape, size, and label. The options [found here](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/customize-button/#button-styles) are available.
 * @param {boolean} [commit] The user action to show on the PayPal review page. If true, a `Pay Now` button will be shown. If false, a `Continue` button will be shown.
 * @param {object} [vault] Configuration for vaulting PayPal accounts. Only applies when using a [client token with a customer id](https://developers.braintreepayments.com/reference/request/client-token/generate/#customer_id).
 * @param {boolean} [vault.vaultPayPal=true] Whether or not to vault the PayPal account upon tokenization.
 */

/** @typedef {object} applePayCreateOptions The configuration options for Apple Pay.
 *
 * @param {string} [buttonStyle=black] Configures the Apple Pay button style. Valid values are `black`, `white`, `white-outline`.
 * @param {string} displayName The canonical name for your store. Use a non-localized name. This parameter should be a utf-8 string that is a maximum of 128 characters. The system may display this name to the user.
 * @param {number} [applePaySessionVersion=2] The [version of the `ApplePaySession`](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_on_the_web_version_history) to use. It's recommended to use the lowest version that contains all the features you need for your checkout to maximize compatibility.
 * @param {external:ApplePayPaymentRequest} paymentRequest The payment request details to apply on top of those from Braintree.
 */

/** @typedef {object} googlePayCreateOptions The configuration options for Google Pay. Additional options from the few listed here are available, many have default values applied based on the settings found in the Braintree Gateway. For more information, see [Google's Documentation](https://developers.google.com/pay/api/web/object-reference#request-objects).
 *
 * @param {string} merchantId The ID provided by Google for processing transactions in production. Not necessary for testing in sandbox.
 * @param {string} [googlePayVersion=1] The version of the Google Pay API to use. Defaults to 1, but 2 can be passed in.
 * @param {external:GooglePayTransactionInfo} transactionInfo The transaction details necessary for processing the payment.
 * @param {external:GooglePayButtonOptions} [button] The button options for configuring the look of the Google Pay button. The `onClick` property cannot be overwritten.
 */

/**
 * @typedef {object} ApplePayPaymentRequest An [Apple Pay Payment Request object](https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest).
 * @external ApplePayPaymentRequest
 * @see {@link https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest PaymentRequest}
 */

/**
 * @typedef {object} GooglePayTransactionInfo A [Google Pay TransactionInfo object](https://developers.google.com/pay/api/web/object-reference#TransactionInfo).
 * @external GooglePayTransactionInfo
 * @see {@link https://developers.google.com/pay/api/web/object-reference#TransactionInfo TransactionInfo}
 */

/**
 * @typedef {object} GooglePayButtonOptions A [Google Pay ButtonOptions object](https://developers.google.com/pay/api/web/reference/object#ButtonOptions).
 * @external GooglePayButtonOptions
 * @see {@link https://developers.google.com/pay/api/web/reference/object#ButtonOptions ButtonOptions}
 */

/** @typedef {(object|boolean)} venmoCreateOptions The configuration options for Venmo. If `true` is passed instead of a configuration object, the default settings listed will be used.
 *
 * @param {boolean} [allowNewBrowserTab=true] If false, it restricts supported browsers to those that can app switch to the Venmo app without opening a new tab.
 */

/**
 * @static
 * @function create
 * @description This function is the entry point for `braintree.dropin`. It is used for creating {@link Dropin} instances.
 * @param {object} options Object containing all {@link Dropin} options:
 * @param {string} options.authorization A [tokenization key](https://developers.braintreepayments.com/guides/authorization/tokenization-key/javascript/v3) or a [client token](https://developers.braintreepayments.com/guides/authorization/client-token). If authorization is a client token created with a [customer ID](https://developers.braintreepayments.com/guides/drop-in/javascript/v3#customer-id), Drop-in will render saved payment methods and automatically store any newly-added payment methods in their Vault record.
 * @param {(string|HTMLElement)} options.container A reference to an empty element, such as a `<div>`, where Drop-in will be included on your page or the selector for the empty element. e.g. `#dropin-container`.
 * @param {string} options.selector Deprecated: Now an alias for `options.container`.
 * @param {string} [options.locale=`en_US`] Use this option to change the language, links, and terminology used throughout Drop-in. Supported locales include:
 * `ar_EG`,
 * `cs_CZ`,
 * `da_DK`,
 * `de_DE`,
 * `el_GR`,
 * `en_AU`,
 * `en_GB`,
 * `en_IN`,
 * `en_US`,
 * `es_ES`,
 * `es_XC`,
 * `fi_FI`,
 * `fr_CA`,
 * `fr_FR`,
 * `fr_XC`,
 * `he_IL`,
 * `hu_HU`,
 * `id_ID`,
 * `it_IT`,
 * `ja_JP`,
 * `ko_KR`,
 * `nl_NL`,
 * `no_NO`,
 * `pl_PL`,
 * `pt_BR`,
 * `pt_PT`,
 * `ru_RU`,
 * `sk_SK`,
 * `sv_SE`,
 * `th_TH`,
 * `zh_CN`,
 * `zh_HK`,
 * `zh_TW`,
 * `zh_XC`.
 *
 * @param {object} [options.translations] To use your own translations, pass an object with the strings you wish to replace. This object must use the same structure as the object used internally for supported translations, which can be found [here](https://github.com/braintree/braintree-web-drop-in/blob/main/src/translations/en_US.js). Any strings that are not included will be those from the provided `locale` or `en_US` if no `locale` is provided. See below for an example of creating Drop-in with custom translations.
 * @param {array} [options.paymentOptionPriority] Use this option to indicate the order in which enabled payment options should appear when multiple payment options are enabled. By default, payment options will appear in this order: `['card', 'paypal', 'paypalCredit', 'venmo', 'applePay', 'googlePay']`. Payment options omitted from this array will not be offered to the customer.
 *
 * @param {(boolean|object)} [options.card] The configuration options for cards. See [`cardCreateOptions`](#~cardCreateOptions) for all `card` options. If this option is omitted, cards will still appear as a payment option. To remove cards, pass `false` for the value.
 * @param {object} [options.paypal] The configuration options for PayPal. To include a PayPal option in your Drop-in integration, include the `paypal` parameter and [enable PayPal in the Braintree Control Panel](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#go-live). To test in Sandbox, you will need to [link a PayPal sandbox test account to your Braintree sandbox account](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing).
 *
 * Some of the PayPal configuration options are listed [here](#~paypalCreateOptions), but for a full list see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/3.78.2/PayPalCheckout.html#createPayment).
 *
 * PayPal is not [supported in Internet Explorer versions lower than 11](https://developer.paypal.com/docs/checkout/reference/faq/#which-browsers-does-paypal-checkout-support).
 *
 * @param {object} [options.paypalCredit] The configuration options for PayPal Credit. To include a PayPal Credit option in your Drop-in integration, include the `paypalCredit` parameter and [enable PayPal in the Braintree Control Panel](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#go-live).
 *
 * Some of the PayPal Credit configuration options are listed [here](#~paypalCreateOptions), but for a full list see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/3.78.2/PayPalCheckout.html#createPayment). For more information on PayPal Credit, see the [Braintree Developer Docs](https://developers.braintreepayments.com/guides/paypal/paypal-credit/javascript/v3).
 *
 * PayPal Credit is not [supported in Internet Explorer versions lower than 11](https://developer.paypal.com/docs/checkout/reference/faq/#which-browsers-does-paypal-checkout-support).
 *
 * @param {(object|boolean)} [options.venmo] The configuration options for Pay with Venmo. To include a Venmo option in your Drop-in integration, include the `venmo` parameter and [follow the documentation for setting up Venmo in the Braintree control panel](https://articles.braintreepayments.com/guides/payment-methods/venmo#setup). If a user's browser does not support Venmo, the Venmo option will not be rendered.
 *
 * See [`venmoCreateOptions`](#~venmoCreateOptions) for `venmo` options.
 *
 * @param {object} [options.applePay] The configuration options for Apple Pay. To include an Apple Pay option in your Drop-in integration, include the `applePay` parameter and [enable Apple Pay in the Braintree Control Panel](https://developers.braintreepayments.com/guides/apple-pay/configuration/javascript/v3). If a user's browser does not support Apple Pay, the Apple Pay option will not be rendered. See [Apple's documentation](https://support.apple.com/en-us/HT201469) for browser and device support.
 *
 * See [`applePayCreateOptions`](#~applePayCreateOptions) for `applePay` options.
 *
 * @param {object} [options.googlePay] The configuration options for Google Pay. To include a Google Pay option in your Drop-in integration, include the `googlePay` parameter and [enable Google Pay in the Braintree Control Panel](https://developers.braintreepayments.com/guides/google-pay/configuration/javascript/v3). If a user's browser does not support Google Pay, the Google Pay option will not be rendered. See [Google's documentation](https://developers.google.com/pay/api/web/test-and-deploy) for browser and device support.
 *
 * See [`googlePayCreateOptions`](#~googlePayCreateOptions) for `googlePay` options.
 *
 * @param {object|boolean} [options.dataCollector] If `true` is passed, Drop-in will be configured to collect data for use with Advanced Fraud Protection. If collecting data via Kount, pass a [`dataCollectorOptions` object](#~dataCollectorOptions) with `kount: true` instead. If Data Collector is configured and fails to load, Drop-in creation will fail.
 *
 * @param {(boolean|object)} [options.threeDSecure] When `true` is passed, the 3D Secure module will be created with a default configuration. See [`threeDSecureOptions`](#~threeDSecureOptions) for additional create options. If 3D Secure is configured and fails to load, Drop-in creation will fail.
 *
 * @param {boolean} [options.vaultManager=false] Whether or not to allow a customer to delete saved payment methods when used with a [client token with a customer id](https://developers.braintreepayments.com/reference/request/client-token/generate/#customer_id). *Note:* Deleting a payment method from Drop-in will permanently delete the payment method, so this option is not recommended for merchants using Braintree's recurring billing system. This feature is not supported in Internet Explorer 9.
 *
 * @param {boolean} [options.preselectVaultedPaymentMethod=true] Whether or not to initialize Drop-in with a vaulted payment method pre-selected. Only applicable when using a [client token with a customer id](https://developers.braintreepayments.com/reference/request/client-token/generate/#customer_id) and a customer with saved payment methods.
 *
 * @param {boolean} [options.showDefaultPaymentMethodFirst=true] When `true` or left out, the customer's default payment method will be displayed first in the list of vaulted payment methods. When `false`, the Braintree API will determine which payment method to display first, typically the latest payment method added to the customer. Only applicable when using a [client token with a customer id](https://developers.braintreepayments.com/reference/request/client-token/generate/#customer_id) and a customer with saved payment methods.
 *
 * @param {function} [callback] The second argument, `data`, is the {@link Dropin} instance. Returns a promise if no callback is provided.
 * @returns {(void|Promise)} Returns a promise if no callback is provided.
 * @example
 * <caption>A full example of accepting credit cards with callback API</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="utf-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <div id="dropin-container"></div>
 *     <button id="submit-button">Purchase</button>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>
 *
 *     <script>
 *       var submitButton = document.querySelector('#submit-button');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }, function (err, dropinInstance) {
 *         if (err) {
 *           // Handle any errors that might've occurred when creating Drop-in
 *           console.error(err);
 *           return;
 *         }
 *         submitButton.addEventListener('click', function () {
 *           dropinInstance.requestPaymentMethod(function (err, payload) {
 *             if (err) {
 *               // Handle errors in requesting payment method
 *             }
 *
 *             // Send payload.nonce to your server
 *           });
 *         });
 *       });
 *     </script>
 *   </body>
 * </html>
 * @example
 * <caption>A full example of accepting credit cards with promise API</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="utf-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <div id="dropin-container"></div>
 *     <button id="submit-button">Purchase</button>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>
 *
 *     <script>
 *       var submitButton = document.querySelector('#submit-button');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }).then(function (dropinInstance) {
 *         submitButton.addEventListener('click', function () {
 *           dropinInstance.requestPaymentMethod().then(function (payload) {
 *             // Send payload.nonce to your server
 *           }).catch(function (err) {
 *             // Handle errors in requesting payment method
 *           });
 *         });
 *       }).catch(function (err) {
 *         // Handle any errors that might've occurred when creating Drop-in
 *         console.error(err);
 *       });
 *     </script>
 *   </body>
 * </html>
 * @example
 * <caption>Setting up a Drop-in instance to accept credit cards, PayPal, PayPal Credit, Venmo, and Apple Pay</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   applePay: {
 *     displayName: 'Merchant Name',
 *     paymentRequest: {
   *     label: 'Localized Name',
 *       total: '10.00'
 *     }
 *   },
 *   paypal: {
 *     flow: 'checkout',
 *     amount: '10.00',
 *     currency: 'USD'
 *   },
 *  paypalCredit: {
 *    flow: 'checkout',
 *    amount: '10.00',
 *    currency: 'USD'
 *   },
 *   venmo: true
 * }, function (err, dropinInstance) {
 *   // Set up a handler to request a payment method and
 *   // submit the payment method nonce to your server
 * });
 * @example
 * <caption>Setting up a Drop-in instance to accept Venmo with restricted browser support</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   venmo: {
 *     allowNewBrowserTab: false
 *   }
 * }, function (err, dropinInstance) {
 *   // Set up a handler to request a payment method and
 *   // submit the payment method nonce to your server
 * });
 *
 * @example
 * <caption>Submitting the payment method nonce to the server using a form</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="utf-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <div id="dropin-container"></div>
 *       <input type="submit" value="Purchase"></input>
 *       <input type="hidden" id="nonce" name="payment_method_nonce"></input>
 *     </form>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/1.30.1/js/dropin.min.js"></script>
 *
 *     <script>
 *       var form = document.querySelector('#payment-form');
 *       var nonceInput = document.querySelector('#nonce');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }, function (err, dropinInstance) {
 *         if (err) {
 *           // Handle any errors that might've occurred when creating Drop-in
 *           console.error(err);
 *           return;
 *         }
 *         form.addEventListener('submit', function (event) {
 *           event.preventDefault();
 *
 *           dropinInstance.requestPaymentMethod(function (err, payload) {
 *             if (err) {
 *               // Handle errors in requesting payment method
 *               return;
 *             }
 *
 *             // Send payload.nonce to your server
 *             nonceInput.value = payload.nonce;
 *             form.submit();
 *           });
 *         });
 *       });
 *     </script>
 *   </body>
 * </html>
 *
 * @example
 * <caption>Use your own translations</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   translations: {
 *     payingWith: 'You are paying with {{paymentSource}}',
 *     chooseAnotherWayToPay: 'My custom chooseAnotherWayToPay string',
 *     // Any other custom translation strings
 *   }
 * }, callback);
 *
 * @example
 * <caption>Customizing Drop-in with card form overrides</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     overrides: {
 *       fields: {
 *         number: {
 *           placeholder: '1111 1111 1111 1111' // Update the number field placeholder
 *         },
 *         postalCode: {
 *           minlength: 5 // Set the minimum length of the postal code field
 *         },
 *         cvv: null // Remove the CVV field from your form
 *       },
 *       styles: {
 *         input: {
 *           'font-size': '18px' // Change the font size for all inputs
 *         },
 *         ':focus': {
 *           color: 'red' // Change the focus color to red for all inputs
 *         }
 *       }
 *     }
 *   }
 * }, callback);
 *
 * @example
 * <caption>Mask Card Inputs</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     overrides: {
 *       fields: {
 *         number: {
 *           maskInput: {
 *             showLastFour: true
 *           }
 *         },
 *         cvv: {
 *           maskInput: true
 *         }
 *       }
 *     }
 *   }
 * }, callback);
 *
 * @example
 * <caption>Including a cardholder name field</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     cardholderName: true
 *   }
 * }, callback);
 *
 * @example
 * <caption>Including a required cardholder name field</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     cardholderName: {
 *       required: true
 *     }
 *   }
 * }, callback);
 *
 * @example
 * <caption>Enabling 3D Secure</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   threeDSecure: true
 * }, function (err, dropinInstance) {
 *   // setup payment button
 *   btn.addEventListener('click', function (e) {
 *     e.preventDefault();
 *
 *     dropinInstance.requestPaymentMethod(|
 *       threeDSecure: {
 *         amount: '100.00',
 *         billingAddress: {
 *           givenName: 'Jill', // ASCII-printable characters required, else will throw a validation error
 *           surname: 'Doe', // ASCII-printable characters required, else will throw a validation error
 *           phoneNumber: '8101234567',
 *           streetAddress: '555 Smith St.',
 *           extendedAddress: '#5',
 *           locality: 'Oakland',
 *           region: 'CA',
 *           postalCode: '12345',
 *           countryCodeAlpha2: 'US'
 *         },
 *         // additional 3ds params
 *       }
 *     }, function (err, payload) {
 *       // inspect payload.liablityShifted
 *       // send payload.nonce to server
 *     });
 *   });
 * });
 *
 * @example
 * <caption>Enabled Vault Manager</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   vaultManager: true
 * }, callback);
 */

function create(options) {
  if (!options.authorization) {
    return Promise.reject(new DropinError('options.authorization is required.'));
  }

  return client.create({
    authorization: options.authorization
  }).catch(function (err) {
    return Promise.reject(new DropinError({
      message: 'There was an error creating Drop-in.',
      braintreeWebError: err
    }));
  }).then(function (clientInstance) {
    clientInstance = setAnalyticsIntegration(clientInstance);

    if (clientInstance.getConfiguration().authorizationType === 'TOKENIZATION_KEY') {
      analytics.sendEvent(clientInstance, 'started.tokenization-key');
    } else {
      analytics.sendEvent(clientInstance, 'started.client-token');
    }

    return new Promise(function (resolve, reject) {
      new Dropin({
        merchantConfiguration: options,
        client: clientInstance
      })._initialize(function (err, instance) {
        if (err) {
          reject(err);

          return;
        }

        resolve(instance);
      });
    });
  });
}

function setAnalyticsIntegration(clientInstance) {
  var configuration = clientInstance.getConfiguration();

  configuration.analyticsMetadata.integration = constants.INTEGRATION;
  configuration.analyticsMetadata.integrationType = constants.INTEGRATION;
  configuration.analyticsMetadata.dropinVersion = VERSION;

  clientInstance.getConfiguration = function () {
    return configuration;
  };

  return clientInstance;
}

// we check for document's existence to support server side rendering
createFromScriptTag(create, typeof document !== 'undefined' && document.querySelector('script[data-braintree-dropin-authorization]'));

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of Drop-in, i.e. `1.30.1`.
   * @type {string}
   */
  VERSION: VERSION
};

},{"./constants":191,"./dropin":193,"./lib/analytics":196,"./lib/create-from-script-tag":199,"./lib/dropin-error":201,"./lib/promise":208,"@braintree/wrap-promise":50,"braintree-web/client":59}],195:[function(require,module,exports){
'use strict';

function addSelectionEventHandler(element, func) {
  element.addEventListener('click', func);
  element.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      func();
    }
  });
}

module.exports = addSelectionEventHandler;

},{}],196:[function(require,module,exports){
'use strict';

var atob = require('./polyfill').atob;
var constants = require('../constants');
var braintreeClientVersion = require('braintree-web/client').VERSION;

function _millisToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function sendAnalyticsEvent(client, kind, callback) {
  var configuration = client.getConfiguration();
  var analyticsRequest = client._request;
  var timestamp = _millisToSeconds(Date.now());
  var url = configuration.gatewayConfiguration.analytics.url;
  var data = {
    analytics: [{
      kind: constants.ANALYTICS_PREFIX + kind,
      timestamp: timestamp
    }],
    _meta: configuration.analyticsMetadata,
    braintreeLibraryVersion: braintreeClientVersion
  };

  if (configuration.authorizationType === 'TOKENIZATION_KEY') {
    data.tokenizationKey = configuration.authorization;
  } else {
    data.authorizationFingerprint = JSON.parse(atob(configuration.authorization)).authorizationFingerprint;
  }

  analyticsRequest({
    url: url,
    method: 'post',
    data: data,
    timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
  }, callback);
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};

},{"../constants":191,"./polyfill":207,"braintree-web/client":59}],197:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"dup":95}],198:[function(require,module,exports){
'use strict';

var isIe9 = require('@braintree/browser-detection/is-ie9');
var isIe10 = require('@braintree/browser-detection/is-ie10');

module.exports = {
  isIe9: isIe9,
  isIe10: isIe10
};

},{"@braintree/browser-detection/is-ie10":32,"@braintree/browser-detection/is-ie9":33}],199:[function(require,module,exports){
'use strict';

var analytics = require('./analytics');
var find = require('./find-parent-form');
var uuid = require('@braintree/uuid');
var DropinError = require('./dropin-error');
var kebabCaseToCamelCase = require('./kebab-case-to-camel-case');
var WHITELISTED_DATA_ATTRIBUTES = [
  'locale',
  'payment-option-priority',

  'data-collector.kount',
  'data-collector.paypal',

  // camelcase version was accidentally used initially.
  // we add the kebab case version to match the docs, but
  // we retain the camelcase version for backwards compatibility
  'card.cardholderName',
  'card.cardholderName.required',
  'card.cardholder-name',
  'card.cardholder-name.required',

  'paypal.amount',
  'paypal.currency',
  'paypal.flow',
  'paypal.landing-page-type',

  'paypal-credit.amount',
  'paypal-credit.currency',
  'paypal-credit.flow',
  'paypal-credit.landing-page-type'
];

function injectHiddenInput(name, value, form) {
  var input = form.querySelector('[name="' + name + '"]');

  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    form.appendChild(input);
  }

  input.value = value;
}

function addCompositeKeyValuePairToObject(obj, key, value) {
  var decomposedKeys = key.split('.');
  var topLevelKey = kebabCaseToCamelCase(decomposedKeys[0]);

  if (decomposedKeys.length === 1) {
    obj[topLevelKey] = deserialize(value);
  } else {
    obj[topLevelKey] = obj[topLevelKey] || {};
    addCompositeKeyValuePairToObject(obj[topLevelKey], decomposedKeys.slice(1).join('.'), value);
  }
}

function deserialize(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

function createFromScriptTag(createFunction, scriptTag) {
  var authorization, container, createOptions, form;

  if (!scriptTag) {
    return;
  }

  authorization = scriptTag.getAttribute('data-braintree-dropin-authorization');

  if (!authorization) {
    throw new DropinError('Authorization not found in data-braintree-dropin-authorization attribute');
  }

  container = document.createElement('div');
  container.id = 'braintree-dropin-' + uuid();

  form = find.findParentForm(scriptTag);

  if (!form) {
    throw new DropinError('No form found for script tag integration.');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  scriptTag.parentNode.insertBefore(container, scriptTag);

  createOptions = {
    authorization: authorization,
    container: container
  };

  WHITELISTED_DATA_ATTRIBUTES.forEach(function (compositeKey) {
    var value = scriptTag.getAttribute('data-' + compositeKey);

    if (value == null) {
      return;
    }

    addCompositeKeyValuePairToObject(createOptions, compositeKey, value);
  });

  createFunction(createOptions).then(function (instance) {
    analytics.sendEvent(instance._client, 'integration-type.script-tag');
    form.addEventListener('submit', function () {
      instance.requestPaymentMethod(function (requestPaymentError, payload) {
        if (requestPaymentError) {
          return;
        }

        injectHiddenInput('payment_method_nonce', payload.nonce, form);

        if (payload.deviceData) {
          injectHiddenInput('device_data', payload.deviceData, form);
        }

        form.submit();
      });
    });
  });
}

module.exports = createFromScriptTag;

},{"./analytics":196,"./dropin-error":201,"./find-parent-form":202,"./kebab-case-to-camel-case":206,"@braintree/uuid":46}],200:[function(require,module,exports){
(function (global){(function (){
'use strict';

var constants = require('../constants');
var analytics = require('./analytics');
var assets = require('@braintree/asset-loader');
var Promise = require('./promise');

function DataCollector(config) {
  this._config = config;
}

DataCollector.prototype.initialize = function () {
  var self = this;

  return Promise.resolve().then(function () {
    var braintreeWebVersion;

    if (global.braintree && global.braintree.dataCollector) {
      return Promise.resolve();
    }

    braintreeWebVersion = self._config.client.getVersion();

    return assets.loadScript({
      src: 'https://js.braintreegateway.com/web/' + braintreeWebVersion + '/js/data-collector.min.js',
      id: constants.DATA_COLLECTOR_SCRIPT_ID
    });
  }).then(function () {
    return global.braintree.dataCollector.create(self._config);
  }).then(function (instance) {
    self._instance = instance;
  }).catch(function (err) {
    analytics.sendEvent(self._config.client, 'data-collector.setup-failed');
    // log the Data Collector setup error
    // but do not prevent Drop-in from loading
    self.log(err);
  });
};

DataCollector.prototype.log = function (message) {
  console.log(message); // eslint-disable-line no-console
};

DataCollector.prototype.getDeviceData = function () {
  if (!this._instance) {
    return '';
  }

  return this._instance.deviceData;
};

DataCollector.prototype.teardown = function () {
  if (!this._instance) {
    return Promise.resolve();
  }

  return this._instance.teardown();
};

module.exports = DataCollector;

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants":191,"./analytics":196,"./promise":208,"@braintree/asset-loader":1}],201:[function(require,module,exports){
'use strict';

function isBraintreeWebError(err) {
  return err.name === 'BraintreeError';
}

function DropinError(err) {
  this.name = 'DropinError';

  if (typeof err === 'string') {
    this.message = err;
  } else {
    this.message = err.message;
  }

  if (isBraintreeWebError(err)) {
    this._braintreeWebError = err;
  } else {
    this._braintreeWebError = err.braintreeWebError;
  }
}

DropinError.prototype = Object.create(Error.prototype);
DropinError.prototype.constructor = DropinError;

module.exports = DropinError;

},{}],202:[function(require,module,exports){
'use strict';

function findParentForm(element) {
  var parentNode = element.parentNode;

  if (!parentNode || parentNode.nodeName === 'FORM') {
    return parentNode;
  }

  return findParentForm(parentNode);
}

module.exports = {
  findParentForm: findParentForm
};

},{}],203:[function(require,module,exports){
'use strict';

var atob = require('./polyfill').atob;

module.exports = function (client) {
  var authorizationFingerprint;
  var configuration = client.getConfiguration();

  if (configuration.authorizationType !== 'TOKENIZATION_KEY') {
    authorizationFingerprint = JSON.parse(atob(configuration.authorization)).authorizationFingerprint;

    return !authorizationFingerprint || authorizationFingerprint.indexOf('customer_id=') === -1;
  }

  return true;
};

},{"./polyfill":207}],204:[function(require,module,exports){
(function (global){(function (){
'use strict';

function isHTTPS() {
  return global.location.protocol === 'https:';
}

module.exports = {
  isHTTPS: isHTTPS
};

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],205:[function(require,module,exports){
(function (global){(function (){
'use strict';

module.exports = function (win) {
  win = win || global;

  return Boolean(win.document.characterSet && win.document.characterSet.toLowerCase() === 'utf-8');
};

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],206:[function(require,module,exports){
'use strict';

function kebabCaseToCamelCase(kebab) {
  var parts = kebab.split('-');
  var first = parts.shift();
  var capitalizedParts = parts.map(function (part) {
    return part.charAt(0).toUpperCase() + part.substring(1);
  });

  return [first].concat(capitalizedParts).join('');
}

module.exports = kebabCaseToCamelCase;

},{}],207:[function(require,module,exports){
(function (global){(function (){
'use strict';
/* eslint-disable no-mixed-operators */

var atobNormalized = typeof global.atob === 'function' ? global.atob : atob;

function atob(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var result = '';

  if (!base64Matcher.test(base64String)) {
    throw new Error('Non base64 encoded input passed to window.atob polyfill');
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
    b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
    c = (b3 & 0x3) << 6 | b4 & 0x3F;

    result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: function (base64String) {
    return atobNormalized.call(global, base64String);
  },
  _atob: atob
};

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],208:[function(require,module,exports){
(function (global){(function (){
'use strict';

var Promise = global.Promise || require('promise-polyfill');

module.exports = Promise;

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"promise-polyfill":186}],209:[function(require,module,exports){
'use strict';

module.exports = function (string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

},{}],210:[function(require,module,exports){
'use strict';

module.exports = function () {
  var el = document.createElement('div');
  var prop = 'flex-basis: 1px';
  var prefixes = [
    '-webkit-',
    '-moz-',
    '-ms-',
    '-o-',
    ''
  ];

  prefixes.forEach(function (prefix) {
    el.style.cssText += prefix + prop;
  });

  return Boolean(el.style.length);
};

},{}],211:[function(require,module,exports){
'use strict';

var assign = require('./assign').assign;
var threeDSecure = require('braintree-web/three-d-secure');

var DEFAULT_ACS_WINDOW_SIZE = '03';
var PASSTHROUGH_EVENTS = [
  'customer-canceled',
  'authentication-modal-render',
  'authentication-modal-close'
];

function ThreeDSecure(client, model) {
  this._client = client;
  this._model = model;
  this._config = assign({}, model.merchantConfiguration.threeDSecure);
}

ThreeDSecure.prototype.initialize = function () {
  var self = this;
  var options = {
    client: this._client,
    version: 2
  };

  if (this._config.cardinalSDKConfig) {
    options.cardinalSDKConfig = this._config.cardinalSDKConfig;
  }

  return threeDSecure.create(options).then(function (instance) {
    self._instance = instance;

    PASSTHROUGH_EVENTS.forEach(function (eventName) {
      self._instance.on(eventName, function (event) {
        self._model._emit('3ds:' + eventName, event);
      });
    });
  });
};

ThreeDSecure.prototype.verify = function (payload, merchantProvidedData) {
  var verifyOptions = assign({
    amount: this._config.amount
  }, merchantProvidedData, {
    nonce: payload.nonce,
    bin: payload.details.bin,
    // TODO in the future, we will allow
    // merchants to pass in a custom
    // onLookupComplete hook
    onLookupComplete: function (data, next) {
      next();
    }
  });

  verifyOptions.additionalInformation = verifyOptions.additionalInformation || {};
  verifyOptions.additionalInformation.acsWindowSize = verifyOptions.additionalInformation.acsWindowSize || DEFAULT_ACS_WINDOW_SIZE;

  return this._instance.verifyCard(verifyOptions);
};

ThreeDSecure.prototype.updateConfiguration = function (key, value) {
  this._config[key] = value;
};

ThreeDSecure.prototype.teardown = function () {
  return this._instance.teardown();
};

module.exports = ThreeDSecure;

},{"./assign":197,"braintree-web/three-d-secure":147}],212:[function(require,module,exports){
'use strict';

var browserDetection = require('./browser-detection');

function isHidden(element) {
  if (!element) { // no parentNode, so nothing containing the element is hidden
    return false;
  }

  if (element.style.display === 'none') {
    return true;
  }

  return isHidden(element.parentNode);
}

function onTransitionEnd(element, propertyName, callback) {
  if (browserDetection.isIe9() || isHidden(element)) {
    callback();

    return;
  }

  function transitionEventListener(event) {
    if (event.propertyName === propertyName) {
      element.removeEventListener('transitionend', transitionEventListener);
      callback();
    }
  }

  element.addEventListener('transitionend', transitionEventListener);
}

module.exports = {
  onTransitionEnd: onTransitionEnd
};

},{"./browser-detection":198}],213:[function(require,module,exports){
'use strict';

var Promise = require('./promise');

function delay(time) {
  time = time || 0;

  return new Promise(function (resolve) {
    window.setTimeout(resolve, time);
  });
}

module.exports = {
  delay: delay
};

},{"./promise":208}],214:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "الدفع باستخدام {{paymentSource}}",
  "chooseAnotherWayToPay": "اختر طريقة دفع أخرى",
  "chooseAWayToPay": "اختر طريقة الدفع",
  "otherWaysToPay": "طرق أخرى للدفع",
  "edit": "تحرير",
  "doneEditing": "تم",
  "editPaymentMethods": "تحرير طرق الدفع",
  "CreditCardDeleteConfirmationMessage": "هل تريد حذف البطاقة ({{secondaryIdentifier}}) التي تنتهي بالرقم {{identifier}}؟",
  "PayPalAccountDeleteConfirmationMessage": "هل تريد حذف حساب {{identifier}} على PayPal؟",
  "VenmoAccountDeleteConfirmationMessage": "هل تريد فعلاً حذف حساب Venmo الذي يحمل اسم المستخدم {{identifier}}؟",
  "genericDeleteConfirmationMessage": "هل تريد فعلاً حذف طريقة الدفع هذه؟",
  "deleteCancelButton": "إلغاء",
  "deleteConfirmationButton": "حذف",
  "fieldEmptyForCvv": "يرجى إدخال رمز حماية البطاقة.",
  "fieldEmptyForExpirationDate": "يرجى إدخال تاريخ انتهاء الصلاحية.",
  "fieldEmptyForCardholderName": "يرجى إدخال اسم صاحب البطاقة.",
  "fieldTooLongForCardholderName": "يجب أن يقل اسم صاحب البطاقة عن 256 حرفاً.",
  "fieldEmptyForNumber": "يرجى إدخال رقم.",
  "fieldEmptyForPostalCode": "يرجى إدخال الرمز البريدي.",
  "fieldInvalidForCardholderName": "اسم حامل البطاقة غير صحيح.",
  "fieldInvalidForCvv": "رمز الحماية هذا غير صحيح.",
  "fieldInvalidForExpirationDate": "تاريخ انتهاء الصلاحية هذا غير صحيح.",
  "fieldInvalidForNumber": "رقم هذه البطاقة غير صحيح.",
  "fieldInvalidForPostalCode": "الرمز البريدي هذا غير صحيح.",
  "genericError": "وقع خطأ ما من جانبنا.",
  "hostedFieldsTokenizationFailOnDuplicateError": "هذه البطاقة الائتمانية موجودة حالياً كطريقة دفع محفوظة.",
  "hostedFieldsFailedTokenizationError": "يرجى مراجعة بياناتك وإعادة المحاولة.",
  "hostedFieldsFieldsInvalidError": "يرجى مراجعة بياناتك وإعادة المحاولة.",
  "hostedFieldsTokenizationNetworkErrorError": "خطأ في الشبكة. يرجى إعادة المحاولة.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "فشلت مصادقة بطاقة الائتمان. يرجى مراجعة بياناتك وإعادة المحاولة.",
  "paypalButtonMustBeUsed": "استخدم زر PayPal لاستئناف الدفع.",
  "paypalAccountTokenizationFailedError": "وقع خطأ أثناء إضافة حساب PayPal. يرجى إعادة المحاولة.",
  "paypalFlowFailedError": "وقع خطأ أثناء الاتصال بـ PayPal. يرجى إعادة المحاولة.",
  "paypalTokenizationRequestActiveError": "تفويض الدفع عبر PayPal قيد التنفيذ.",
  "venmoCanceledError": "وقع خطأ ما. تأكد أن أحدث إصدار من تطبيق Venmo مثبت في جهازك وأن متصفحك يدعم التبديل إلى Venmo.",
  "vaultManagerPaymentMethodDeletionError": "فشل حذف طريقة الدفع. أعد المحاولة.",
  "venmoAppFailedError": "تطبيق Venmo غير موجود في جهازك.",
  "unsupportedCardTypeError": "نوع هذه البطاقة غير مدعوم. يرجى استخدام بطاقة أخرى.",
  "applePayTokenizationError": "وقع خطأ في الشبكة أثناء معالجة الدفع عبر Apple Pay. يرجى إعادة المحاولة.",
  "applePayActiveCardError": "إضافة بطاقة مدعومة إلى محفظة Apple Pay.",
  "cardholderNameLabel": "اسم صاحب البطاقة",
  "cardNumberLabel": "رقم البطاقة",
  "cvvLabel": "رمز حماية البطاقة",
  "cvvThreeDigitLabelSubheading": "(3 أرقام)",
  "cvvFourDigitLabelSubheading": "(4 أرقام)",
  "cardholderNamePlaceholder": "اسم صاحب البطاقة",
  "expirationDateLabel": "تاريخ انتهاء الصلاحية",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "الرمز البريدي",
  "saveCardLabel": "حفظ البطاقة",
  "payWithCard": "الدفع باستخدام بطاقة",
  "endingIn": "التي تنتهي بالرقم {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "بطاقة",
  "PayPal": "Paypal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],215:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Způsob platby: {{paymentSource}}",
  "chooseAnotherWayToPay": "Vybrat jiný způsob platby",
  "chooseAWayToPay": "Vybrat způsob platby",
  "otherWaysToPay": "Jiné způsoby platby",
  "edit": "Upravit",
  "doneEditing": "Hotovo",
  "editPaymentMethods": "Upravit způsoby platby",
  "CreditCardDeleteConfirmationMessage": "Chcete kartu {{secondaryIdentifier}} s koncovým číslem {{identifier}} odstranit?",
  "PayPalAccountDeleteConfirmationMessage": "Chcete účet {{identifier}} ve službě PayPal odstranit?",
  "VenmoAccountDeleteConfirmationMessage": "Opravdu chcete účet Venmo s uživatelským jménem {{identifier}} odstranit?",
  "genericDeleteConfirmationMessage": "Opravdu chcete tento způsob platby odstranit?",
  "deleteCancelButton": "Zrušit",
  "deleteConfirmationButton": "Odstranit",
  "fieldEmptyForCvv": "Vyplňte kód CVV.",
  "fieldEmptyForExpirationDate": "Vyplňte datum vypršení platnosti.",
  "fieldEmptyForCardholderName": "Vyplňte jméno držitele karty.",
  "fieldTooLongForCardholderName": "Jméno držitele karty musí obsahovat méně než 256 znaků.",
  "fieldEmptyForNumber": "Vyplňte číslo.",
  "fieldEmptyForPostalCode": "Vyplňte PSČ.",
  "fieldInvalidForCardholderName": "Toto jméno držitele karty není platné.",
  "fieldInvalidForCvv": "Tento bezpečnostní kód není platný.",
  "fieldInvalidForExpirationDate": "Toto datum vypršení platnosti není platné.",
  "fieldInvalidForNumber": "Toto číslo karty není platné.",
  "fieldInvalidForPostalCode": "Toto PSČ není platné.",
  "genericError": "Došlo k chybě na naší straně.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Tato kreditní karta je již jako způsob platby uložena.",
  "hostedFieldsFailedTokenizationError": "Zkontrolujte zadané údaje a zkuste to znovu.",
  "hostedFieldsFieldsInvalidError": "Zkontrolujte zadané údaje a zkuste to znovu.",
  "hostedFieldsTokenizationNetworkErrorError": "Došlo k chybě sítě. Zkuste to znovu.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Ověření kreditní karty se nezdařilo. Zkontrolujte zadané údaje a zkuste to znovu.",
  "paypalButtonMustBeUsed": "Chcete-li přejít k platbě, použijte tlačítko PayPal.",
  "paypalAccountTokenizationFailedError": "Při přidávání účtu PayPal došlo k chybě. Zkuste to znovu.",
  "paypalFlowFailedError": "Při připojování ke službě PayPal došlo k chybě. Zkuste to znovu.",
  "paypalTokenizationRequestActiveError": "Autorizace platby přes PayPal již probíhá.",
  "venmoCanceledError": "Došlo k chybě. Zkontrolujte, zda máte v zařízení nainstalovanou nejnovější verzi aplikace Venmo a zda prohlížeč přechod na aplikaci Venmo podporuje.",
  "vaultManagerPaymentMethodDeletionError": "Způsob platby se nepodařilo odstranit. Zkuste to znovu.",
  "venmoAppFailedError": "Aplikaci Venmo se ve vašem zařízení nepodařilo najít.",
  "unsupportedCardTypeError": "Tento typ karty není podporován. Vyzkoušejte jinou kartu.",
  "applePayTokenizationError": "Při zpracování platby přes Apple Pay došlo k chybě sítě. Zkuste to znovu.",
  "applePayActiveCardError": "Přidejte si podporovanou kartu do peněženky Apple Pay.",
  "cardholderNameLabel": "Jméno držitele karty",
  "cardNumberLabel": "Číslo karty",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 číslice)",
  "cvvFourDigitLabelSubheading": "(4 číslice)",
  "cardholderNamePlaceholder": "Jméno držitele karty",
  "expirationDateLabel": "Datum vypršení platnosti",
  "expirationDateLabelSubheading": "(MM/RR)",
  "expirationDatePlaceholder": "MM/RR",
  "postalCodeLabel": "PSČ",
  "saveCardLabel": "Uložit kartu",
  "payWithCard": "Zaplatit kartou",
  "endingIn": "Koncové číslo: {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Karta",
  "PayPal": "Společnost PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],216:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Betaler med {{paymentSource}}",
  "chooseAnotherWayToPay": "Vælg en anden betalingsmetode",
  "chooseAWayToPay": "Vælg, hvordan du vil betale",
  "otherWaysToPay": "Andre betalingsmetoder",
  "edit": "Rediger",
  "doneEditing": "Udført",
  "editPaymentMethods": "Rediger betalingsmetoder",
  "CreditCardDeleteConfirmationMessage": "Vil du slette {{secondaryIdentifier}}-kortet, der slutter på {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Vil du slette PayPal-kontoen {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Er du sikker på, at du vil slette Venmo-kontoen med brugernavnet {{identifier}}?",
  "genericDeleteConfirmationMessage": "Er du sikker på, at du vil slette denne betalingsmetode?",
  "deleteCancelButton": "Annuller",
  "deleteConfirmationButton": "Slet",
  "fieldEmptyForCvv": "Du skal angive kontrolcifrene.",
  "fieldEmptyForExpirationDate": "Du skal angive udløbsdatoen.",
  "fieldEmptyForCardholderName": "Du skal angive kortindehaverens navn.",
  "fieldTooLongForCardholderName": "Kortejerens navn skal være mindre end 256 tegn.",
  "fieldEmptyForNumber": "Du skal angive et nummer.",
  "fieldEmptyForPostalCode": "Du skal angive et postnummer.",
  "fieldInvalidForCardholderName": "Kortindehaverens navn er ugyldigt.",
  "fieldInvalidForCvv": "Sikkerhedskoden er ugyldig.",
  "fieldInvalidForExpirationDate": "Udløbsdatoen er ugyldig.",
  "fieldInvalidForNumber": "Kortnummeret er ugyldigt.",
  "fieldInvalidForPostalCode": "Postnummeret er ugyldigt.",
  "genericError": "Der opstod en fejl.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Dette betalingskort er allerede en gemt betalingsmetode.",
  "hostedFieldsFailedTokenizationError": "Tjek oplysningerne, og prøv igen.",
  "hostedFieldsFieldsInvalidError": "Tjek oplysningerne, og prøv igen.",
  "hostedFieldsTokenizationNetworkErrorError": "Netværksfejl. Prøv igen.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Betalingskortet blev ikke bekræftet. Tjek oplysningerne, og prøv igen.",
  "paypalButtonMustBeUsed": "Brug PayPal-knappen for at fortsætte med din betaling.",
  "paypalAccountTokenizationFailedError": "PayPal-kontoen blev ikke tilføjet. Prøv igen.",
  "paypalFlowFailedError": "Der kunne ikke oprettes forbindelse til PayPal. Prøv igen.",
  "paypalTokenizationRequestActiveError": "PayPal-betalingen er i gang med at blive autoriseret.",
  "venmoCanceledError": "Der opstod en fejl. Sørg for, at du har den seneste version af Venmo-appen installeret på din enhed, og at din browser understøtter skift til Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Vi kunne ikke slette betalingsmetoden. Prøv igen.",
  "venmoAppFailedError": "Venmo-appen blev ikke fundet på din enhed.",
  "unsupportedCardTypeError": "Korttypen understøttes ikke. Prøv et andet kort.",
  "applePayTokenizationError": "Der opstod en netværksfejl under behandlingen af betalingen med Apple Pay. Prøv igen.",
  "applePayActiveCardError": "Knyt et understøttet kort til din Apple Pay-e-pung.",
  "cardholderNameLabel": "Kortindehaverens navn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "Kontrolcifre",
  "cvvThreeDigitLabelSubheading": "(3 cifre)",
  "cvvFourDigitLabelSubheading": "(4 cifre)",
  "cardholderNamePlaceholder": "Kortindehaverens navn",
  "expirationDateLabel": "Udløbsdato",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "saveCardLabel": "Gem kort",
  "payWithCard": "Betal med kort",
  "endingIn": "Der slutter på {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],217:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Zahlen mit {{paymentSource}}",
  "chooseAnotherWayToPay": "Andere Zahlungsmethode wählen",
  "chooseAWayToPay": "Wie möchten Sie bezahlen?",
  "otherWaysToPay": "Andere Zahlungsmethoden",
  "edit": "Bearbeiten",
  "doneEditing": "Fertig",
  "editPaymentMethods": "Zahlungsquellen bearbeiten",
  "CreditCardDeleteConfirmationMessage": "{{secondaryIdentifier}} Karte mit den Endziffern {{identifier}} löschen?",
  "PayPalAccountDeleteConfirmationMessage": "PayPal-Konto {{identifier}} löschen?",
  "VenmoAccountDeleteConfirmationMessage": "Wollen Sie das Venmo-Konto mit dem Benutzernamen {{identifier}} wirklich löschen?",
  "genericDeleteConfirmationMessage": "Wollen Sie diese Zahlungsquelle wirklich löschen?",
  "deleteCancelButton": "Abbrechen",
  "deleteConfirmationButton": "Löschen",
  "fieldEmptyForCvv": "Geben Sie die Kartenprüfnummer ein.",
  "fieldEmptyForExpirationDate": "Geben Sie das Ablaufdatum ein.",
  "fieldEmptyForCardholderName": "Geben Sie den Namen des Karteninhabers ein.",
  "fieldTooLongForCardholderName": "Der Name des Karteninhabers darf 255 Zeichen nicht übersteigen.",
  "fieldEmptyForNumber": "Geben Sie die Nummer ein.",
  "fieldEmptyForPostalCode": "Geben Sie die PLZ ein.",
  "fieldInvalidForCardholderName": "Der Name des Karteninhabers ist nicht gültig.",
  "fieldInvalidForCvv": "Die Kartenprüfnummer ist ungültig.",
  "fieldInvalidForExpirationDate": "Das Ablaufdatum ist ungültig.",
  "fieldInvalidForNumber": "Die Kreditkartennummer ist ungültig.",
  "fieldInvalidForPostalCode": "Die PLZ ist ungültig.",
  "genericError": "Bei uns ist ein Problem aufgetreten.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Diese Kreditkarte ist bereits als gespeicherte Zahlungsmethode vorhanden.",
  "hostedFieldsFailedTokenizationError": "Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "hostedFieldsFieldsInvalidError": "Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "hostedFieldsTokenizationNetworkErrorError": "Netzwerkfehler. Versuchen Sie es erneut.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Überprüfung der Karte fehlgeschlagen. Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "paypalButtonMustBeUsed": "Verwenden Sie den PayPal-Button, um mit der Zahlung fortfahren.",
  "paypalAccountTokenizationFailedError": "Beim Hinzufügen des PayPal-Kontos ist ein Problem aufgetreten. Versuchen Sie es erneut.",
  "paypalFlowFailedError": "Beim Verbinden mit PayPal ist ein Problem aufgetreten. Versuchen Sie es erneut.",
  "paypalTokenizationRequestActiveError": "Die PayPal-Zahlung wird bereits autorisiert.",
  "venmoCanceledError": "Etwas ist schief gelaufen. Vergewissern Sie sich, dass Sie die neueste Version der Venmo-App auf Ihrem Gerät installiert haben und Ihr Browser den Wechsel zu Venmo unterstützt.",
  "vaultManagerPaymentMethodDeletionError": "Die Zahlungsquelle konnte nicht gelöscht werden. Versuchen Sie es erneut.",
  "venmoAppFailedError": "Die Venmo-App wurde auf Ihrem Gerät nicht gefunden.",
  "unsupportedCardTypeError": "Dieser Kreditkartentyp wird nicht unterstützt. Versuchen Sie es mit einer anderen Karte.",
  "applePayTokenizationError": "Netzwerkfehler bei der Zahlungsabwicklung mit Apple Pay. Versuchen Sie es erneut.",
  "applePayActiveCardError": "Fügen Sie der Apple-Pay-Börse eine unterstützte Kreditkarte hinzu.",
  "cardholderNameLabel": "Name des Karteninhabers",
  "cardNumberLabel": "Kartennummer",
  "cvvLabel": "Prüfnr.",
  "cvvThreeDigitLabelSubheading": "(3-stellig)",
  "cvvFourDigitLabelSubheading": "(4-stellig)",
  "cardholderNamePlaceholder": "Name des Karteninhabers",
  "expirationDateLabel": "Gültig bis",
  "expirationDateLabelSubheading": "(MM/JJ)",
  "expirationDatePlaceholder": "MM/JJ",
  "postalCodeLabel": "PLZ",
  "saveCardLabel": "Karte speichern",
  "payWithCard": "Mit Kreditkarte zahlen",
  "endingIn": "Mit den Endziffern {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kreditkarte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],218:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Πληρωμή μέσω {{paymentSource}}",
  "chooseAnotherWayToPay": "Επιλέξτε έναν άλλον τρόπο πληρωμής",
  "chooseAWayToPay": "Επιλογή τρόπου πληρωμής",
  "otherWaysToPay": "Άλλοι τρόποι πληρωμής",
  "edit": "Επεξεργασία",
  "doneEditing": "Τέλος",
  "editPaymentMethods": "Επεξεργασία μεθόδων πληρωμής",
  "CreditCardDeleteConfirmationMessage": "Διαγραφή κάρτας {{secondaryIdentifier}} που λήγει σε {{identifier}};",
  "PayPalAccountDeleteConfirmationMessage": "Διαγραφή λογαριασμού PayPal {{identifier}};",
  "VenmoAccountDeleteConfirmationMessage": "Θέλετε σίγουρα να διαγράψετε τον λογαριασμό Venmo με το όνομα χρήστη {{identifier}};",
  "genericDeleteConfirmationMessage": "Θέλετε σίγουρα να διαγράψετε αυτήν τη μέθοδο πληρωμής;",
  "deleteCancelButton": "Ακύρωση",
  "deleteConfirmationButton": "Διαγραφή",
  "fieldEmptyForCvv": "Συμπληρώστε έναν CVV.",
  "fieldEmptyForExpirationDate": "Συμπληρώστε ημερομηνία λήξης.",
  "fieldEmptyForCardholderName": "Συμπληρώστε το όνομα ενός κατόχου κάρτας.",
  "fieldTooLongForCardholderName": "Το όνομα του κατόχου της κάρτας πρέπει να περιέχει λιγότερους από 256 χαρακτήρες.",
  "fieldEmptyForNumber": "Συμπληρώστε έναν αριθμό.",
  "fieldEmptyForPostalCode": "Συμπληρώστε έναν ταχυδρομικό κώδικα.",
  "fieldInvalidForCardholderName": "Αυτό το όνομα κατόχου κάρτας δεν είναι έγκυρο.",
  "fieldInvalidForCvv": "Αυτός ο κωδικός ασφαλείας δεν είναι έγκυρος.",
  "fieldInvalidForExpirationDate": "Αυτή η ημερομηνία λήξης δεν είναι έγκυρη.",
  "fieldInvalidForNumber": "Αυτός ο αριθμός κάρτας δεν είναι έγκυρος.",
  "fieldInvalidForPostalCode": "Αυτός ο ταχυδρομικός κώδικας δεν είναι έγκυρος.",
  "genericError": "Προέκυψε ένα πρόβλημα στο σύστημά μας.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Αυτή η πιστωτική κάρτα υπάρχει ήδη ως αποθηκευμένη μέθοδος πληρωμής.",
  "hostedFieldsFailedTokenizationError": "Ελέγξτε τα στοιχεία σας και δοκιμάστε ξανά.",
  "hostedFieldsFieldsInvalidError": "Ελέγξτε τα στοιχεία σας και δοκιμάστε ξανά.",
  "hostedFieldsTokenizationNetworkErrorError": "Σφάλμα δικτύου. Δοκιμάστε ξανά.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Η επαλήθευση της πιστωτικής κάρτας απέτυχε. Ελέγξτε τα στοιχεία σας και δοκιμάστε ξανά.",
  "paypalButtonMustBeUsed": "Χρησιμοποιήστε το κουμπί PayPal για να συνεχίσετε με την πληρωμή.",
  "paypalAccountTokenizationFailedError": "Προέκυψε κάποιο πρόβλημα με την προσθήκη του λογαριασμού PayPal. Δοκιμάστε ξανά.",
  "paypalFlowFailedError": "Προέκυψε κάποιο πρόβλημα με τη σύνδεση στην PayPal. Δοκιμάστε ξανά.",
  "paypalTokenizationRequestActiveError": "Η εξουσιοδότηση πληρωμής PayPal βρίσκεται ήδη σε εξέλιξη.",
  "venmoCanceledError": "Προέκυψε πρόβλημα. Βεβαιωθείτε ότι έχετε την πιο πρόσφατη έκδοση της εφαρμογής Venmo εγκατεστημένη στη συσκευή σας και ότι το πρόγραμμα περιήγησής σας υποστηρίζει τη μετάβαση στη Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Η διαγραφή της μεθόδου πληρωμής είναι αδύνατη, δοκιμάστε ξανά.",
  "venmoAppFailedError": "Η εφαρμογή Venmo δεν βρέθηκε στη συσκευή σας.",
  "unsupportedCardTypeError": "Αυτός ο τύπος κάρτας δεν υποστηρίζεται. Δοκιμάστε άλλη κάρτα.",
  "applePayTokenizationError": "Προέκυψε σφάλμα δικτύου κατά την επεξεργασία της πληρωμής μέσω Apple Pay. Δοκιμάστε ξανά.",
  "applePayActiveCardError": "Προσθέστε μια υποστηριζόμενη κάρτα στο πορτοφόλι Apple Pay.",
  "cardholderNameLabel": "Όνομα κατόχου κάρτας",
  "cardNumberLabel": "Αριθμός κάρτας",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 ψηφία)",
  "cvvFourDigitLabelSubheading": "(4 ψηφία)",
  "cardholderNamePlaceholder": "Όνομα κατόχου κάρτας",
  "expirationDateLabel": "Ημερομηνία λήξης",
  "expirationDateLabelSubheading": "(ΜΜ/ΕΕ)",
  "expirationDatePlaceholder": "MM/ΕΕ",
  "postalCodeLabel": "Ταχυδρομικός κώδικας",
  "saveCardLabel": "Αποθήκευση κάρτας",
  "payWithCard": "Πληρωμή με κάρτα",
  "endingIn": "που λήγει σε {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Κάρτα",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],219:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Paying with {{paymentSource}}",
  "chooseAnotherWayToPay": "Choose another way to pay",
  "chooseAWayToPay": "Choose a way to pay",
  "otherWaysToPay": "Other ways to pay",
  "edit": "Edit",
  "doneEditing": "Done",
  "editPaymentMethods": "Edit payment methods",
  "CreditCardDeleteConfirmationMessage": "Delete {{secondaryIdentifier}} card ending in {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Delete PayPal account {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Are you sure you want to delete the Venmo account with username {{identifier}}?",
  "genericDeleteConfirmationMessage": "Are you sure you want to delete this payment method?",
  "deleteCancelButton": "Cancel",
  "deleteConfirmationButton": "Delete",
  "fieldEmptyForCvv": "Please fill out a CVV.",
  "fieldEmptyForExpirationDate": "Please fill out an expiry date.",
  "fieldEmptyForCardholderName": "Please fill out a cardholder name.",
  "fieldTooLongForCardholderName": "Cardholder name must be less than 256 characters.",
  "fieldEmptyForNumber": "Please fill out a number.",
  "fieldEmptyForPostalCode": "Please fill out a postcode.",
  "fieldInvalidForCardholderName": "This cardholder name isn't valid.",
  "fieldInvalidForCvv": "This security code is not valid.",
  "fieldInvalidForExpirationDate": "This expiry date is not valid.",
  "fieldInvalidForNumber": "This card number is not valid.",
  "fieldInvalidForPostalCode": "This postcode is not valid.",
  "genericError": "Something went wrong on our end.",
  "hostedFieldsTokenizationFailOnDuplicateError": "This credit card already exists as a saved payment method.",
  "hostedFieldsFailedTokenizationError": "Check your entries and try again.",
  "hostedFieldsFieldsInvalidError": "Check your entries and try again.",
  "hostedFieldsTokenizationNetworkErrorError": "Network error. Please try again.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Credit card verification failed. Check your entries and try again.",
  "paypalButtonMustBeUsed": "Use the PayPal button to continue with your payment.",
  "paypalAccountTokenizationFailedError": "Something went wrong while adding the PayPal account. Please try again.",
  "paypalFlowFailedError": "Something went wrong while connecting to PayPal. Please try again.",
  "paypalTokenizationRequestActiveError": "PayPal payment authorisation is already in progress.",
  "venmoCanceledError": "We're sorry, something seems to have gone wrong. Please ensure you have the most recent version of the Venmo app installed on your device and your browser supports switching to Venmo.",
  "vaultManagerPaymentMethodDeletionError": "We're sorry. We couldn't delete that payment method. Please try again.",
  "venmoAppFailedError": "The Venmo app wasn't found on your device.",
  "unsupportedCardTypeError": "This card type is not supported. Please try another card.",
  "applePayTokenizationError": "A network error occurred while processing the Apple Pay payment. Please try again.",
  "applePayActiveCardError": "Link a supported card to your Apple Pay Wallet.",
  "cardholderNameLabel": "Cardholder Name",
  "cardNumberLabel": "Card Number",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 digits)",
  "cvvFourDigitLabelSubheading": "(4 digits)",
  "cardholderNamePlaceholder": "Cardholder Name",
  "expirationDateLabel": "Expiry date",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "Postcode",
  "saveCardLabel": "Save card",
  "payWithCard": "Pay with credit or debit card",
  "endingIn": "Ending in {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Card",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],220:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Paying with {{paymentSource}}",
  "chooseAnotherWayToPay": "Choose another way to pay",
  "chooseAWayToPay": "Choose a way to pay",
  "otherWaysToPay": "Other ways to pay",
  "edit": "Edit",
  "doneEditing": "Done",
  "editPaymentMethods": "Edit funding sources",
  "CreditCardDeleteConfirmationMessage": "Delete {{secondaryIdentifier}} card ending in {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Delete PayPal account {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Are you sure you want to delete the Venmo account with username {{identifier}}?",
  "genericDeleteConfirmationMessage": "Are you sure you want to delete this funding source?",
  "deleteCancelButton": "Cancel",
  "deleteConfirmationButton": "Delete",
  "fieldEmptyForCvv": "Please fill in a CSC.",
  "fieldEmptyForExpirationDate": "Please fill in an expiry date.",
  "fieldEmptyForCardholderName": "Please fill in a cardholder name.",
  "fieldTooLongForCardholderName": "Cardholder name must be less than 256 characters.",
  "fieldEmptyForNumber": "Please fill in a number.",
  "fieldEmptyForPostalCode": "Please fill in a postcode.",
  "fieldInvalidForCardholderName": "This cardholder name isn't valid.",
  "fieldInvalidForCvv": "This security code is not valid.",
  "fieldInvalidForExpirationDate": "This expiry date is not valid.",
  "fieldInvalidForNumber": "This card number is not valid.",
  "fieldInvalidForPostalCode": "This postcode is not valid.",
  "genericError": "Something went wrong on our end.",
  "hostedFieldsTokenizationFailOnDuplicateError": "This credit card has already been added to your account as a funding source.",
  "hostedFieldsFailedTokenizationError": "Please check your information and try again.",
  "hostedFieldsFieldsInvalidError": "Please check your information and try again.",
  "hostedFieldsTokenizationNetworkErrorError": "Network error. Please try again.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Credit card verification failed. Please check your information and try again.",
  "paypalButtonMustBeUsed": "Use the PayPal button to continue with your payment.",
  "paypalAccountTokenizationFailedError": "Something went wrong while adding the PayPal account. Please try again.",
  "paypalFlowFailedError": "Something went wrong while connecting to PayPal. Please try again.",
  "paypalTokenizationRequestActiveError": "PayPal payment authorisation is already in progress.",
  "venmoCanceledError": "We're sorry, something seems to have gone wrong. Make sure you have the most recent version of the Venmo app installed on your device and your browser supports the switch to Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Unable to delete funding source, try again.",
  "venmoAppFailedError": "The Venmo app isn't on your device.",
  "unsupportedCardTypeError": "This card type is not supported. Please try another card.",
  "applePayTokenizationError": "A network error occurred while processing the Apple Pay payment. Please try again.",
  "applePayActiveCardError": "Add a supported card to your Apple Pay wallet.",
  "cardholderNameLabel": "Cardholder name",
  "cardNumberLabel": "Card number",
  "cvvLabel": "CSC",
  "cvvThreeDigitLabelSubheading": "(3 digits)",
  "cvvFourDigitLabelSubheading": "(4 digits)",
  "cardholderNamePlaceholder": "Cardholder name",
  "expirationDateLabel": "Expiry date",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "Postcode",
  "saveCardLabel": "Save card",
  "payWithCard": "Pay with card",
  "endingIn": "Ending in {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Card",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],221:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Paying with {{paymentSource}}",
  "chooseAnotherWayToPay": "Choose another way to pay",
  "chooseAWayToPay": "Choose a way to pay",
  "otherWaysToPay": "Other ways to pay",
  "edit": "Edit",
  "doneEditing": "Done",
  "editPaymentMethods": "Edit payment methods",
  "CreditCardDeleteConfirmationMessage": "Delete {{secondaryIdentifier}} card ending in {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Delete PayPal account {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Are you sure you want to delete the Venmo account with username {{identifier}}?",
  "genericDeleteConfirmationMessage": "Are you sure you want to delete this payment method?",
  "deleteCancelButton": "Cancel",
  "deleteConfirmationButton": "Delete",
  "fieldEmptyForCvv": "Please enter a CVV.",
  "fieldEmptyForExpirationDate": "Please enter an expiry date.",
  "fieldEmptyForCardholderName": "Please enter a cardholder name.",
  "fieldTooLongForCardholderName": "Cardholder name must have less than 256 characters.",
  "fieldEmptyForNumber": "Please enter a number.",
  "fieldEmptyForPostalCode": "Please enter a PIN code.",
  "fieldInvalidForCardholderName": "This cardholder name isn't valid.",
  "fieldInvalidForCvv": "This security code isn't valid.",
  "fieldInvalidForExpirationDate": "This expiration date isn't valid.",
  "fieldInvalidForNumber": "This card number isn't valid.",
  "fieldInvalidForPostalCode": "This PIN code isn't valid.",
  "genericError": "We're sorry, something seems to have gone wrong.",
  "hostedFieldsTokenizationFailOnDuplicateError": "This credit card already exists as a saved payment method.",
  "hostedFieldsFailedTokenizationError": "Please check your information and try again.",
  "hostedFieldsFieldsInvalidError": "Please check your information and try again.",
  "hostedFieldsTokenizationNetworkErrorError": "Network error. Please try again.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Credit card verification failed. Please check your information and try again.",
  "paypalButtonMustBeUsed": "Use the PayPal button to continue with your payment.",
  "paypalAccountTokenizationFailedError": "Something went wrong adding the PayPal account. Please try again.",
  "paypalFlowFailedError": "Something went wrong connecting to PayPal. Please try again.",
  "paypalTokenizationRequestActiveError": "PayPal payment authorisation is already in progress.",
  "venmoCanceledError": "We're sorry, something seems to have gone wrong. Please ensure you have the most recent version of the Venmo app installed on your device and your browser supports switching to Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Unable to delete payment method. Please try again.",
  "venmoAppFailedError": "The Venmo app couldn't be found on your device.",
  "unsupportedCardTypeError": "This card type isn't supported. Please try another card.",
  "applePayTokenizationError": "A network error occurred while processing the Apple Pay payment. Please try again.",
  "applePayActiveCardError": "Add a supported card to your Apple Pay wallet.",
  "cardholderNameLabel": "Cardholder name",
  "cardNumberLabel": "Card number",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 digits)",
  "cvvFourDigitLabelSubheading": "(4 digits)",
  "cardholderNamePlaceholder": "Cardholder name",
  "expirationDateLabel": "Expiry date",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "PIN code",
  "saveCardLabel": "Save card",
  "payWithCard": "Pay with card",
  "endingIn": "Ending in {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Card",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],222:[function(require,module,exports){
'use strict';

module.exports = {
  payingWith: 'Paying with {{paymentSource}}',
  chooseAnotherWayToPay: 'Choose another way to pay',
  chooseAWayToPay: 'Choose a way to pay',
  otherWaysToPay: 'Other ways to pay',
  edit: 'Edit',
  doneEditing: 'Done',
  editPaymentMethods: 'Edit payment methods',
  CreditCardDeleteConfirmationMessage: 'Delete {{secondaryIdentifier}} card ending in {{identifier}}?',
  PayPalAccountDeleteConfirmationMessage: 'Delete PayPal account {{identifier}}?',
  VenmoAccountDeleteConfirmationMessage: 'Are you sure you want to delete Venmo account with username {{identifier}}?',
  genericDeleteConfirmationMessage: 'Are you sure you want to delete this payment method?',
  deleteCancelButton: 'Cancel',
  deleteConfirmationButton: 'Delete',
  // Errors
  fieldEmptyForCvv: 'Please fill out a CVV.',
  fieldEmptyForExpirationDate: 'Please fill out an expiration date.',
  fieldEmptyForCardholderName: 'Please fill out a cardholder name.',
  fieldEmptyForNumber: 'Please fill out a card number.',
  fieldEmptyForPostalCode: 'Please fill out a postal code.',
  fieldInvalidForCardholderName: 'This cardholder name is not valid.',
  fieldInvalidForCvv: 'This security code is not valid.',
  fieldInvalidForExpirationDate: 'This expiration date is not valid.',
  fieldInvalidForNumber: 'This card number is not valid.',
  fieldInvalidForPostalCode: 'This postal code is not valid.',
  fieldTooLongForCardholderName: 'Cardholder name must be less than 256 characters.',
  genericError: 'Something went wrong on our end.',
  hostedFieldsTokenizationFailOnDuplicateError: 'This credit card already exists as a saved payment method.',
  hostedFieldsFailedTokenizationError: 'Please check your information and try again.',
  hostedFieldsTokenizationCvvVerificationFailedError: 'Credit card verification failed. Please check your information and try again.',
  hostedFieldsTokenizationNetworkErrorError: 'Network error. Please try again.',
  hostedFieldsFieldsInvalidError: 'Please check your information and try again.',
  paypalButtonMustBeUsed: 'Use the PayPal button to continue with your payment.',
  paypalAccountTokenizationFailedError: 'Something went wrong adding the PayPal account. Please try again.',
  paypalFlowFailedError: 'Something went wrong connecting to PayPal. Please try again.',
  paypalTokenizationRequestActiveError: 'PayPal payment authorization is already in progress.',
  applePayTokenizationError: 'A network error occurred while processing the Apple Pay payment. Please try again.',
  applePayActiveCardError: 'Add a supported card to your Apple Pay wallet.',
  vaultManagerPaymentMethodDeletionError: 'Unable to delete payment method, try again.',
  venmoCanceledError: 'Something went wrong. Ensure you have the most recent version of the Venmo app installed on your device and your browser supports switching to Venmo.',
  venmoAppFailedError: 'The Venmo app could not be found on your device.',
  unsupportedCardTypeError: 'This card type is not supported. Please try another card.',
  // Card form
  cardholderNameLabel: 'Cardholder Name',
  cardNumberLabel: 'Card Number',
  cvvLabel: 'CVV',
  cvvThreeDigitLabelSubheading: '(3 digits)',
  cvvFourDigitLabelSubheading: '(4 digits)',
  expirationDateLabel: 'Expiration Date',
  expirationDateLabelSubheading: '(MM/YY)',
  cardholderNamePlaceholder: 'Cardholder Name',
  expirationDatePlaceholder: 'MM/YY',
  postalCodeLabel: 'Postal Code',
  saveCardLabel: 'Save card',
  payWithCard: 'Pay with card',
  // Payment Method descriptions
  endingIn: 'Ending in {{lastFourCardDigits}}',
  Card: 'Card',
  PayPal: 'PayPal',
  'PayPal Credit': 'PayPal Credit',
  'Apple Pay': 'Apple Pay',
  'Google Pay': 'Google Pay',
  'Venmo': 'Venmo',
  'American Express': 'American Express',
  Discover: 'Discover',
  'Diners Club': 'Diners Club',
  MasterCard: 'Mastercard',
  Visa: 'Visa',
  JCB: 'JCB',
  Maestro: 'Maestro',
  UnionPay: 'UnionPay'
};

},{}],223:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Pago con {{paymentSource}}",
  "chooseAnotherWayToPay": "Selecciona otra forma de pago.",
  "chooseAWayToPay": "Selecciona una forma de pago.",
  "otherWaysToPay": "Otras formas de pago",
  "edit": "Modificar",
  "doneEditing": "Hecho",
  "editPaymentMethods": "Editar formas de pago",
  "CreditCardDeleteConfirmationMessage": "¿Quieres eliminar la tarjeta {{secondaryIdentifier}} que termina en {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "¿Quieres eliminar la cuenta PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "¿Seguro de que deseas eliminar la cuenta de Venmo con nombre de usuario {{identifier}}?",
  "genericDeleteConfirmationMessage": "¿Seguro que deseas eliminar esta forma de pago?",
  "deleteCancelButton": "Cancelar",
  "deleteConfirmationButton": "Eliminar",
  "fieldEmptyForCvv": "Escribe el código CVV.",
  "fieldEmptyForExpirationDate": "Escribe la fecha de vencimiento.",
  "fieldEmptyForCardholderName": "Escribe el nombre de un titular de la tarjeta.",
  "fieldTooLongForCardholderName": "El nombre del titular de la tarjeta debe tener menos de 256 caracteres.",
  "fieldEmptyForNumber": "Escribe un número.",
  "fieldEmptyForPostalCode": "Escribe el código postal.",
  "fieldInvalidForCardholderName": "El nombre del titular de la tarjeta no es válido.",
  "fieldInvalidForCvv": "Este código de seguridad no es válido.",
  "fieldInvalidForExpirationDate": "Esta fecha de vencimiento no es válida.",
  "fieldInvalidForNumber": "Este número de tarjeta no es válido.",
  "fieldInvalidForPostalCode": "Este código postal no es válido.",
  "genericError": "Hemos tenido algún problema.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Esta tarjeta de crédito ya existe como forma de pago guardada.",
  "hostedFieldsFailedTokenizationError": "Comprueba la información e inténtalo de nuevo.",
  "hostedFieldsFieldsInvalidError": "Comprueba la información e inténtalo de nuevo.",
  "hostedFieldsTokenizationNetworkErrorError": "Error de red. Inténtalo de nuevo.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Error de verificación de la tarjeta de crédito. Comprueba la información e inténtalo de nuevo.",
  "paypalButtonMustBeUsed": "Utiliza el botón de PayPal para continuar con el pago.",
  "paypalAccountTokenizationFailedError": "Se ha producido un error al vincular la cuenta PayPal. Inténtalo de nuevo.",
  "paypalFlowFailedError": "Se ha producido un error al conectarse a PayPal. Inténtalo de nuevo.",
  "paypalTokenizationRequestActiveError": "Ya hay una autorización de pago de PayPal en curso.",
  "venmoCanceledError": "Ha habido un problema. Asegúrate de que tienes la versión más reciente de la aplicación de Venmo instalada en tu dispositivo y de que tu navegador es compatible con cambiar a Venmo.",
  "vaultManagerPaymentMethodDeletionError": "No se ha podido eliminar la forma de pago. Inténtalo de nuevo.",
  "venmoAppFailedError": "No se ha encontrado la aplicación de Venmo en tu dispositivo.",
  "unsupportedCardTypeError": "No se admite este tipo de tarjeta. Prueba con otra tarjeta.",
  "applePayTokenizationError": "Se ha producido un error de red al procesar el pago con Apple Pay. Inténtalo de nuevo.",
  "applePayActiveCardError": "Añade una tarjeta admitida a tu Wallet de Apple Pay.",
  "cardholderNameLabel": "Nombre del titular de la tarjeta",
  "cardNumberLabel": "Número de tarjeta",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nombre del titular de la tarjeta",
  "expirationDateLabel": "Fecha de vencimiento",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Código postal",
  "saveCardLabel": "Guardar tarjeta",
  "payWithCard": "Pagar con tarjeta",
  "endingIn": "Terminada en {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Tarjeta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],224:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Pagando con {{paymentSource}}",
  "chooseAnotherWayToPay": "Elija otra forma de pago",
  "chooseAWayToPay": "Elija una forma de pago",
  "otherWaysToPay": "Otras formas de pago",
  "edit": "Editar",
  "doneEditing": "Listo",
  "editPaymentMethods": "Editar formas de pago",
  "CreditCardDeleteConfirmationMessage": "¿Desea eliminar la tarjeta {{secondaryIdentifier}} con terminación en {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "¿Desea eliminar la cuenta de PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "¿Seguro que desea eliminar la cuenta de Venmo con el nombre de usuario {{identifier}}?",
  "genericDeleteConfirmationMessage": "¿Seguro que desea eliminar esta forma de pago?",
  "deleteCancelButton": "Cancelar",
  "deleteConfirmationButton": "Eliminar",
  "fieldEmptyForCvv": "Ingrese un CVV.",
  "fieldEmptyForExpirationDate": "Complete una fecha de vencimiento.",
  "fieldEmptyForCardholderName": "Ingrese el nombre del titular de la tarjeta.",
  "fieldTooLongForCardholderName": "El nombre del titular de la tarjeta debe tener menos de 256 caracteres.",
  "fieldEmptyForNumber": "Ingrese un número.",
  "fieldEmptyForPostalCode": "Ingrese un código postal.",
  "fieldInvalidForCardholderName": "El nombre del titular de la tarjeta no es válido.",
  "fieldInvalidForCvv": "Este código de seguridad no es válido.",
  "fieldInvalidForExpirationDate": "Esta fecha de vencimiento no es válida.",
  "fieldInvalidForNumber": "Este número de tarjeta no es válido.",
  "fieldInvalidForPostalCode": "Este código postal no es válido.",
  "genericError": "Se ha producido un error.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Esta tarjeta de crédito ya existe como forma de pago guardada.",
  "hostedFieldsFailedTokenizationError": "Verifique su información e inténtelo de nuevo.",
  "hostedFieldsFieldsInvalidError": "Verifique su información e inténtelo de nuevo.",
  "hostedFieldsTokenizationNetworkErrorError": "Error de red. Inténtelo de nuevo.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "La verificación de la tarjeta de crédito falló. Revise su información e inténtelo de nuevo.",
  "paypalButtonMustBeUsed": "Utilice el botón de PayPal para continuar con su pago.",
  "paypalAccountTokenizationFailedError": "Se ha producido un error al agregar la cuenta de PayPal. Inténtelo de nuevo.",
  "paypalFlowFailedError": "Se ha producido un error al conectar con PayPal. Inténtelo de nuevo.",
  "paypalTokenizationRequestActiveError": "La autorización de pago de PayPal ya está en curso.",
  "venmoCanceledError": "Se ha producido un error. Asegúrese de que tiene la versión más reciente de la aplicación de Venmo instalada en su dispositivo y que su navegador admita el sitio web Venmo.",
  "vaultManagerPaymentMethodDeletionError": "No se pudo eliminar la forma de pago, inténtelo de nuevo.",
  "venmoAppFailedError": "No se pudo encontrar la aplicación de Venmo en su dispositivo.",
  "unsupportedCardTypeError": "Este tipo de tarjeta no es compatible. Inténtelo con otra tarjeta.",
  "applePayTokenizationError": "Se ha producido un error de red al procesar el pago de Apple Pay. Inténtelo de nuevo.",
  "applePayActiveCardError": "Agregue una tarjeta compatible a su cartera de Apple Pay.",
  "cardholderNameLabel": "Nombre del titular de la tarjeta",
  "cardNumberLabel": "Número de tarjeta",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nombre del titular de la tarjeta",
  "expirationDateLabel": "Fecha de vencimiento",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Código postal",
  "saveCardLabel": "Guardar tarjeta",
  "payWithCard": "Pagar con tarjeta",
  "endingIn": "Con terminación en {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Tarjeta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],225:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Maksutapa: {{paymentSource}}",
  "chooseAnotherWayToPay": "Valitse toinen maksutapa",
  "chooseAWayToPay": "Valitse maksutapa",
  "otherWaysToPay": "Muut maksutavat",
  "edit": "Muokkaa",
  "doneEditing": "Valmis",
  "editPaymentMethods": "Muokkaa maksutapoja",
  "CreditCardDeleteConfirmationMessage": "Haluatko poistaa {{secondaryIdentifier}}-kortin, jonka numero päättyy {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Haluatko poistaa PayPal-tilin {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Haluatko varmasti poistaa Venmo-tilin, jonka käyttäjätunnus on {{identifier}}?",
  "genericDeleteConfirmationMessage": "Haluatko varmasti poistaa tämän maksutavan?",
  "deleteCancelButton": "Peruuta",
  "deleteConfirmationButton": "Poista",
  "fieldEmptyForCvv": "Täytä CVV.",
  "fieldEmptyForExpirationDate": "Täytä voimassaolon päättymispäivämäärä.",
  "fieldEmptyForCardholderName": "Täytä kortinhaltijan nimi.",
  "fieldTooLongForCardholderName": "Kortin haltijan nimen on oltava alle 256 merkkiä.",
  "fieldEmptyForNumber": "Täytä numero.",
  "fieldEmptyForPostalCode": "Täytä postinumero.",
  "fieldInvalidForCardholderName": "Kortinhaltijan nimi ei ole kelvollinen.",
  "fieldInvalidForCvv": "Tämä turvakoodi ei ole kelvollinen.",
  "fieldInvalidForExpirationDate": "Tämä päättymispäivämäärä ei ole kelvollinen.",
  "fieldInvalidForNumber": "Tämä kortin numero ei ole kelvollinen.",
  "fieldInvalidForPostalCode": "Tämä postinumero ei ole kelvollinen.",
  "genericError": "Jokin meni pieleen meidän päässämme.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Tämä luottokortti on jo tallennettu maksutavaksi.",
  "hostedFieldsFailedTokenizationError": "Tarkista tiedot ja yritä uudelleen.",
  "hostedFieldsFieldsInvalidError": "Tarkista tiedot ja yritä uudelleen.",
  "hostedFieldsTokenizationNetworkErrorError": "Verkkovirhe. Yritä uudelleen.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Luottokortin varmennus epäonnistui. Tarkista tiedot ja yritä uudelleen.",
  "paypalButtonMustBeUsed": "Jatka maksua PayPal-painikkeen avulla.",
  "paypalAccountTokenizationFailedError": "Jotain meni pieleen PayPal-tiliä lisätessä. Yritä uudelleen.",
  "paypalFlowFailedError": "Jotain meni pieleen muodostettaessa yhteyttä PayPaliin. Yritä uudelleen.",
  "paypalTokenizationRequestActiveError": "PayPal-maksun valtuutus on jo meneillään.",
  "venmoCanceledError": "Jokin meni pieleen. Varmista, että laitteeseesi on asennettu Venmo-sovelluksen viimeisin versio, ja että selain tukee vaihtamista Venmoon.",
  "vaultManagerPaymentMethodDeletionError": "Maksutavan poistaminen ei onnistu, yritä uudelleen.",
  "venmoAppFailedError": "Venmo-sovellusta ei löytynyt laitteesta.",
  "unsupportedCardTypeError": "Tätä korttityyppiä ei tueta. Kokeile toista korttia.",
  "applePayTokenizationError": "Tapahtui verkkovirhe Apple Pay -maksun käsittelyssä. Yritä uudelleen.",
  "applePayActiveCardError": "Lisää tuettu kortti Apple Pay -lompakkoon.",
  "cardholderNameLabel": "Kortinhaltijan nimi",
  "cardNumberLabel": "Kortin numero",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(kolme numeroa)",
  "cvvFourDigitLabelSubheading": "(neljä numeroa)",
  "cardholderNamePlaceholder": "Kortinhaltijan nimi",
  "expirationDateLabel": "Päättymispäivämäärä",
  "expirationDateLabelSubheading": "(KK/VV)",
  "expirationDatePlaceholder": "KK/VV",
  "postalCodeLabel": "Postinumero",
  "saveCardLabel": "Tallenna kortti",
  "payWithCard": "Maksa kortilla",
  "endingIn": "Päättyy {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kortti",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],226:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Payer avec {{paymentSource}}",
  "chooseAnotherWayToPay": "Choisir un autre mode de paiement",
  "chooseAWayToPay": "Choisir le mode de paiement",
  "otherWaysToPay": "Autres modes de paiement",
  "edit": "Modifier",
  "doneEditing": "Terminé",
  "editPaymentMethods": "Modifier les modes de paiement",
  "CreditCardDeleteConfirmationMessage": "Supprimer la carte {{secondaryIdentifier}} se terminant par {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Supprimer le compte PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Souhaitez-vous vraiment supprimer le compte Venmo avec le nom d’utilisateur {{identifier}}?",
  "genericDeleteConfirmationMessage": "Voulez-vous vraiment supprimer ce mode de paiement?",
  "deleteCancelButton": "Annuler",
  "deleteConfirmationButton": "Supprimer",
  "fieldEmptyForCvv": "Veuillez saisir un cryptogramme visuel.",
  "fieldEmptyForExpirationDate": "Veuillez saisir une date d'expiration.",
  "fieldEmptyForCardholderName": "Veuillez saisir un nom de titulaire de la carte.",
  "fieldTooLongForCardholderName": "Le nom du titulaire de la carte doit contenir moins de 256 caractères.",
  "fieldEmptyForNumber": "Veuillez saisir un numéro.",
  "fieldEmptyForPostalCode": "Veuillez saisir un code postal.",
  "fieldInvalidForCardholderName": "Le nom de ce titulaire de la carte n'est pas valide.",
  "fieldInvalidForCvv": "Ce cryptogramme visuel n'est pas valide.",
  "fieldInvalidForExpirationDate": "Cette date d'expiration n'est pas valide.",
  "fieldInvalidForNumber": "Ce numéro de carte n'est pas valide.",
  "fieldInvalidForPostalCode": "Ce code postal n'est pas valide.",
  "genericError": "Une erreur s'est produite de notre côté.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Cette carte de crédit existe déjà comme mode de paiement enregistré.",
  "hostedFieldsFailedTokenizationError": "Vérifiez vos informations, puis réessayez.",
  "hostedFieldsFieldsInvalidError": "Vérifiez vos informations, puis réessayez.",
  "hostedFieldsTokenizationNetworkErrorError": "Erreur réseau. Veuillez réessayer.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "La vérification de la carte de crédit a échoué. Vérifiez vos informations, puis réessayez.",
  "paypalButtonMustBeUsed": "Utilisez le bouton PayPal pour poursuivre votre paiement.",
  "paypalAccountTokenizationFailedError": "Une erreur s'est produite lors de l'enregistrement du compte PayPal. Veuillez réessayer.",
  "paypalFlowFailedError": "Une erreur s'est produite au cours de la connexion à PayPal. Veuillez réessayer.",
  "paypalTokenizationRequestActiveError": "L'autorisation de paiement PayPal est déjà en cours.",
  "venmoCanceledError": "Une erreur s'est produite. Assurez-vous que la version la plus récente de l'application Venmo est installée sur votre appareil et que votre navigateur prend Venmo en charge.",
  "vaultManagerPaymentMethodDeletionError": "Impossible de supprimer le mode de paiement, essayez de nouveau.",
  "venmoAppFailedError": "L'application Venmo est introuvable sur votre appareil.",
  "unsupportedCardTypeError": "Ce type de carte n'est pas pris en charge. Veuillez essayer une autre carte.",
  "applePayTokenizationError": "Une erreur de réseau s'est produite lors du traitement du paiement avec Apple Pay. Veuillez réessayer.",
  "applePayActiveCardError": "Ajoutez une carte prise en charge à Apple Pay.",
  "cardholderNameLabel": "Nom du titulaire de la carte",
  "cardNumberLabel": "Numéro de carte",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 chiffres)",
  "cvvFourDigitLabelSubheading": "(4 chiffres)",
  "cardholderNamePlaceholder": "Nom du titulaire de la carte",
  "expirationDateLabel": "Date d'expiration",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Code postal",
  "saveCardLabel": "Enregistrer la carte",
  "payWithCard": "Payer par carte",
  "endingIn": "Se terminant par {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Carte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],227:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Payer avec {{paymentSource}}",
  "chooseAnotherWayToPay": "Choisissez une autre façon de payer.",
  "chooseAWayToPay": "Choisissez comment payer.",
  "otherWaysToPay": "Autres façons de payer",
  "edit": "Modifier",
  "doneEditing": "Terminé",
  "editPaymentMethods": "Modifier les sources d'approvisionnement",
  "CreditCardDeleteConfirmationMessage": "Supprimer la carte {{secondaryIdentifier}} se terminant par {{identifier}} ?",
  "PayPalAccountDeleteConfirmationMessage": "Supprimer le compte PayPal {{identifier}} ?",
  "VenmoAccountDeleteConfirmationMessage": "Êtes-vous sûr de vouloir supprimer le compte Venmo avec le nom d'utilisateur {{identifier}} ?",
  "genericDeleteConfirmationMessage": "Êtes-vous sûr de vouloir supprimer cette source d'approvisionnement ?",
  "deleteCancelButton": "Annuler",
  "deleteConfirmationButton": "Supprimer",
  "fieldEmptyForCvv": "Entrez un cryptogramme visuel.",
  "fieldEmptyForExpirationDate": "Entrez une date d'expiration.",
  "fieldEmptyForCardholderName": "Entrez un nom du titulaire de la carte.",
  "fieldTooLongForCardholderName": "Le nom du titulaire de la carte doit contenir moins de 256 caractères.",
  "fieldEmptyForNumber": "Entrez un numéro.",
  "fieldEmptyForPostalCode": "Entrez un code postal.",
  "fieldInvalidForCardholderName": "Le nom de ce titulaire de la carte est incorrect.",
  "fieldInvalidForCvv": "Ce cryptogramme visuel n'est pas valide.",
  "fieldInvalidForExpirationDate": "Cette date d'expiration n'est pas valide.",
  "fieldInvalidForNumber": "Ce numéro de carte n'est pas valide.",
  "fieldInvalidForPostalCode": "Ce code postal n'est pas valide.",
  "genericError": "Une erreur est survenue.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Cette carte bancaire existe déjà comme mode de paiement enregistré.",
  "hostedFieldsFailedTokenizationError": "Vérifiez vos informations et réessayez.",
  "hostedFieldsFieldsInvalidError": "Vérifiez vos informations et réessayez.",
  "hostedFieldsTokenizationNetworkErrorError": "Erreur réseau. Réessayez.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Échec de vérification de la carte bancaire. Vérifiez vos informations et réessayez.",
  "paypalButtonMustBeUsed": "Utilisez le bouton PayPal pour poursuivre votre paiement.",
  "paypalAccountTokenizationFailedError": "Une erreur est survenue lors de l'ajout du compte PayPal. Réessayez.",
  "paypalFlowFailedError": "Une erreur est survenue lors de la connexion à PayPal. Réessayez.",
  "paypalTokenizationRequestActiveError": "L'autorisation de paiement PayPal est déjà en cours.",
  "venmoCanceledError": "Une erreur est survenue. Vérifiez que vous disposez de la dernière version de l'application Venmo sur votre appareil et que votre navigateur prend en charge la redirection vers Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Impossible de supprimer la source d'approvisionnement. Réessayez.",
  "venmoAppFailedError": "L'application Venmo est introuvable sur votre appareil.",
  "unsupportedCardTypeError": "Ce type de carte n'est pas pris en charge. Essayez une autre carte.",
  "applePayTokenizationError": "Une erreur réseau s'est produite lors du traitement du paiement Apple Pay. Réessayez.",
  "applePayActiveCardError": "Enregistrez une carte prise en charge sur Apple Pay.",
  "cardholderNameLabel": "Nom du titulaire de la carte",
  "cardNumberLabel": "Nº de carte",
  "cvvLabel": "Cryptogramme visuel",
  "cvvThreeDigitLabelSubheading": "(3 chiffres)",
  "cvvFourDigitLabelSubheading": "(4 chiffres)",
  "cardholderNamePlaceholder": "Nom du titulaire de la carte",
  "expirationDateLabel": "Date d'expiration",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Code postal",
  "saveCardLabel": "Enregistrer une carte",
  "payWithCard": "Payer par carte",
  "endingIn": "Se terminant par {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Carte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],228:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Payer avec {{paymentSource}}",
  "chooseAnotherWayToPay": "Choisir un autre mode de paiement",
  "chooseAWayToPay": "Choisir un mode de paiement",
  "otherWaysToPay": "Autres modes de paiement",
  "edit": "Modifier",
  "doneEditing": "Terminé",
  "editPaymentMethods": "Modifier les modes de paiement",
  "CreditCardDeleteConfirmationMessage": "Supprimer la carte {{secondaryIdentifier}} se terminant par {{identifier}} ?",
  "PayPalAccountDeleteConfirmationMessage": "Supprimer le compte PayPal {{identifier}} ?",
  "VenmoAccountDeleteConfirmationMessage": "Souhaitez-vous vraiment supprimer le compte Venmo associé au nom d'utilisateur {{identifier}}?",
  "genericDeleteConfirmationMessage": "Souhaitez-vous vraiment supprimer ce mode de paiement ?",
  "deleteCancelButton": "Annuler",
  "deleteConfirmationButton": "Supprimer",
  "fieldEmptyForCvv": "Saisissez un cryptogramme visuel.",
  "fieldEmptyForExpirationDate": "Indiquez une date d'expiration.",
  "fieldEmptyForCardholderName": "Saisissez le nom du titulaire de la carte.",
  "fieldTooLongForCardholderName": "Le nom du titulaire de la carte doit comporter moins de 256 caractères.",
  "fieldEmptyForNumber": "Indiquez un numéro.",
  "fieldEmptyForPostalCode": "Indiquez un code postal.",
  "fieldInvalidForCardholderName": "Le nom de ce titulaire de la carte est incorrect.",
  "fieldInvalidForCvv": "Ce cryptogramme visuel n'est pas valide.",
  "fieldInvalidForExpirationDate": "Cette date d'expiration n'est pas valide.",
  "fieldInvalidForNumber": "Ce numéro de carte n'est pas valide.",
  "fieldInvalidForPostalCode": "Ce code postal n'est pas valide.",
  "genericError": "Une erreur est survenue.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Cette carte bancaire existe déjà en tant que mode de paiement enregistré.",
  "hostedFieldsFailedTokenizationError": "Vérifiez les informations et réessayez.",
  "hostedFieldsFieldsInvalidError": "Vérifiez les informations et réessayez.",
  "hostedFieldsTokenizationNetworkErrorError": "Erreur réseau. Réessayez.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Échec de la vérification de carte bancaire. Vérifiez les informations et réessayez.",
  "paypalButtonMustBeUsed": "Utilisez le bouton PayPal pour poursuivre le paiement.",
  "paypalAccountTokenizationFailedError": "Un problème est survenu lors de l'ajout du compte PayPal. Réessayez.",
  "paypalFlowFailedError": "Une erreur est survenue lors de la connexion à PayPal. Réessayez.",
  "paypalTokenizationRequestActiveError": "L'autorisation de paiement PayPal est déjà en cours.",
  "venmoCanceledError": "Une erreur est survenue. Vérifiez que la dernière version de l'application Venmo est installée sur votre appareil et que votre navigateur prend en charge la redirection vers Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Impossible de supprimer le mode de paiement, réessayez.",
  "venmoAppFailedError": "Nous n'avons pas trouvé l'application Venmo sur votre appareil.",
  "unsupportedCardTypeError": "Ce type de carte n'est pas pris en charge. Essayez une autre carte.",
  "applePayTokenizationError": "Une erreur réseau s'est produite lors du traitement du paiement Apple Pay. Réessayez.",
  "applePayActiveCardError": "Ajoutez une carte prise en charge à votre portefeuille Apple Pay.",
  "cardholderNameLabel": "Nom du titulaire de la carte",
  "cardNumberLabel": "Numéro de carte",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 chiffres)",
  "cvvFourDigitLabelSubheading": "(4 chiffres)",
  "cardholderNamePlaceholder": "Nom du titulaire de la carte",
  "expirationDateLabel": "Date d'expiration",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Code postal",
  "saveCardLabel": "Enregistrer la carte",
  "payWithCard": "Payer avec la carte",
  "endingIn": "Se terminant par {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Carte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],229:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "שליחת תשלום באמצעות {{paymentSource}}",
  "chooseAnotherWayToPay": "עליך לבחור שיטת תשלום אחרת",
  "chooseAWayToPay": "עליך לבחור שיטת תשלום",
  "otherWaysToPay": "שיטות תשלום אחרות",
  "edit": "עריכה",
  "doneEditing": "סיום",
  "editPaymentMethods": "עריכת שיטות תשלום",
  "CreditCardDeleteConfirmationMessage": "ברצונך למחוק את כרטיס ה-{{secondaryIdentifier}} שמסתיים בספרות {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "ברצונך למחוק את חשבון ה-PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "האם אתה בטוח שברצונך למחוק את חשבון Venmo הרשום תחת שם המשתמש {{identifier}}?",
  "genericDeleteConfirmationMessage": "האם אתה בטוח שברצונך למחוק שיטת תשלום זו?",
  "deleteCancelButton": "ביטול",
  "deleteConfirmationButton": "מחיקה",
  "fieldEmptyForCvv": "עליך למלא את מספר האבטחה של כרטיס האשראי.",
  "fieldEmptyForExpirationDate": "עליך למלא את תאריך פקיעת התוקף.",
  "fieldEmptyForCardholderName": "עליך למלא את שם בעל הכרטיס.",
  "fieldTooLongForCardholderName": "שם בעל הכרטיס יכול להכיל 256 תווים לכל היותר.",
  "fieldEmptyForNumber": "עליך למלא את המספר.",
  "fieldEmptyForPostalCode": "עליך למלא את המיקוד.",
  "fieldInvalidForCardholderName": "שם בעל הכרטיס אינו חוקי.",
  "fieldInvalidForCvv": "קוד אבטחה זה אינו חוקי.",
  "fieldInvalidForExpirationDate": "תאריך פקיעת התוקף הזה אינו חוקי.",
  "fieldInvalidForNumber": "מספר כרטיס האשראי הזה אינו חוקי.",
  "fieldInvalidForPostalCode": "מיקוד זה אינו חוקי.",
  "genericError": "נראה שמשהו השתבש בצד שלנו.",
  "hostedFieldsTokenizationFailOnDuplicateError": "כרטיס אשראי זה כבר שמור כשיטת תשלום.",
  "hostedFieldsFailedTokenizationError": "עליך לבדוק את הפרטים שלך ולנסות שוב.",
  "hostedFieldsFieldsInvalidError": "עליך לבדוק את הפרטים שלך ולנסות שוב.",
  "hostedFieldsTokenizationNetworkErrorError": "שגיאת רשת. יש לנסות שוב.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "אימות כרטיס האשראי נכשל. עליך לבדוק את הפרטים שלך ולנסות שוב.",
  "paypalButtonMustBeUsed": "להשתמש בלחצן PayPal כדי להמשיך בביצוע התשלום שלך.",
  "paypalAccountTokenizationFailedError": "משהו השתבש בו בעת הוספת חשבון PayPal. יש לנסות שוב.",
  "paypalFlowFailedError": "משהו השתבש בהתחברות ל-PayPal. יש לנסות שוב.",
  "paypalTokenizationRequestActiveError": "אישור התשלום של PayPal כבר מתבצע.",
  "venmoCanceledError": "נראה שמשהו השתבש. עליך לוודא שהגרסה העדכנית ביותר של אפליקציית Venmo מותקנת במכשיר שלך, ושהדפדפן שלך תומך במעבר ל-Venmo.",
  "vaultManagerPaymentMethodDeletionError": "לא הצלחנו למחוק את שיטת התשלום, עליך לנסות שוב.",
  "venmoAppFailedError": "לא מצאנו למצוא את אפליקציית Venmo במכשיר שלך.",
  "unsupportedCardTypeError": "סוג כרטיס זה אינו נתמך. עליך לנסות כרטיס אחר.",
  "applePayTokenizationError": "אירעה שגיאת רשת בעת עיבוד תשלום התשלומים של Apple Pay. יש לנסות שוב.",
  "applePayActiveCardError": "הוספת כרטיס נתמך לארנק Apple Pay שלך.",
  "cardholderNameLabel": "שם בעל הכרטיס",
  "cardNumberLabel": "מספר הכרטיס",
  "cvvLabel": "קוד האבטחה (CVV)",
  "cvvThreeDigitLabelSubheading": "(3 ספרות)",
  "cvvFourDigitLabelSubheading": "(ארבע ספרות)",
  "cardholderNamePlaceholder": "שם בעל הכרטיס",
  "expirationDateLabel": "תאריך פקיעת תוקף",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "מיקוד",
  "saveCardLabel": "שמירת הכרטיס",
  "payWithCard": "תשלום באמצעות כרטיס אשראי",
  "endingIn": "המסתיים בספרות {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "כרטיס",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],230:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Fizetve ezzel {{paymentSource}}",
  "chooseAnotherWayToPay": "Válasszon másik fizetési módot",
  "chooseAWayToPay": "Válasszon fizetési módot",
  "otherWaysToPay": "Egyéb fizetési módok",
  "edit": "Szerkesztés",
  "doneEditing": "Kész",
  "editPaymentMethods": "Fizetési módok szerkesztése",
  "CreditCardDeleteConfirmationMessage": "Törli a(z) {{identifier}}-re végződő {{secondaryIdentifier}} kártyát?",
  "PayPalAccountDeleteConfirmationMessage": "Törli a(z) {{identifier}} PayPal-számlát?",
  "VenmoAccountDeleteConfirmationMessage": "Biztosan törli a(z) {{identifier}} felhasználónévhez tartozó Venmo-számlát?",
  "genericDeleteConfirmationMessage": "Biztosan törli ezt a fizetési módot?",
  "deleteCancelButton": "Mégse",
  "deleteConfirmationButton": "Törés",
  "fieldEmptyForCvv": "Adja meg a CVV-t.",
  "fieldEmptyForExpirationDate": "Töltse ki a lejárati dátumot.",
  "fieldEmptyForCardholderName": "Töltse ki a kártyatulajdonos nevét.",
  "fieldTooLongForCardholderName": "A kártyatulajdonos neve nem lehet hosszabb mint 256 karakter.",
  "fieldEmptyForNumber": "Töltse ki a számot.",
  "fieldEmptyForPostalCode": "Töltse ki az irányítószámot.",
  "fieldInvalidForCardholderName": "Ez a kártyabirtokos neve nem érvényes.",
  "fieldInvalidForCvv": "Ez a biztonsági kód nem érvényes.",
  "fieldInvalidForExpirationDate": "Ez a lejárati dátum nem érvényes.",
  "fieldInvalidForNumber": "Ez a kártyaszám nem érvényes.",
  "fieldInvalidForPostalCode": "Ez az irányítószám nem érvényes.",
  "genericError": "Hiba történt a mi oldalunkon.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Ez a hitelkártya már szerepel mentett fizetési módként.",
  "hostedFieldsFailedTokenizationError": "Ellenőrizze adatait, majd próbálja újra.",
  "hostedFieldsFieldsInvalidError": "Ellenőrizze adatait, majd próbálja újra.",
  "hostedFieldsTokenizationNetworkErrorError": "Hálózati hiba. Próbálja újra.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "A hitelkártya hitelesítése sikertelen. Ellenőrizze adatait, majd próbálja újra.",
  "paypalButtonMustBeUsed": "A fizetés folytatásához használja a PayPal-gombot.",
  "paypalAccountTokenizationFailedError": "Hiba történt a PayPal-számla hozzáadása közben. Próbálja újra.",
  "paypalFlowFailedError": "Hiba történt a PayPalhoz való kapcsolódás közben. Próbálja újra.",
  "paypalTokenizationRequestActiveError": "A PayPal-fizetés engedélyezése már folyamatban van.",
  "venmoCanceledError": "Hiba történt. Ellenőrizze, hogy eszközére a Venmo-alkalmazás legfrissebb verziója van-e telepítve, és hogy a böngészője támogatja-e a Venmo-ra történő átváltást.",
  "vaultManagerPaymentMethodDeletionError": "Nem sikerült törölni a fizetési módot, próbálja újra.",
  "venmoAppFailedError": "A Venmo-alkalmazást nem találja a rendszer az eszközön.",
  "unsupportedCardTypeError": "Ez a kártyatípus nem támogatott. Próbáljon meg másik kártyát.",
  "applePayTokenizationError": "Hálózati hiba történt az Apple Pay-kifizetés közben. Próbálja újra.",
  "applePayActiveCardError": "Adjon egy támogatott kártyáját az Apple Pay pénztárcához.",
  "cardholderNameLabel": "Kártyatulajdonos neve",
  "cardNumberLabel": "Kártyaszám",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 számjegy)",
  "cvvFourDigitLabelSubheading": "(4 számjegy)",
  "cardholderNamePlaceholder": "Kártyatulajdonos neve",
  "expirationDateLabel": "Lejárati dátum",
  "expirationDateLabelSubheading": "(HH/ÉÉ)",
  "expirationDatePlaceholder": "HH/ÉÉ",
  "postalCodeLabel": "Irányítószám",
  "saveCardLabel": "Kártya mentése",
  "payWithCard": "Fizetés kártyával",
  "endingIn": "{{lastFourCardDigits}} végű",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "-kártya",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],231:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Membayar dengan {{paymentSource}}",
  "chooseAnotherWayToPay": "Pilih metode pembayaran lain",
  "chooseAWayToPay": "Pilih metode pembayaran",
  "otherWaysToPay": "Metode pembayaran lain",
  "edit": "Edit",
  "doneEditing": "Selesai",
  "editPaymentMethods": "Edit metode pembayaran",
  "CreditCardDeleteConfirmationMessage": "Hapus kartu {{secondaryIdentifier}} yang berakhiran {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Hapus {{identifier}} rekening PayPal?",
  "VenmoAccountDeleteConfirmationMessage": "Yakin akan menghapus rekening Venmo dengan nama pengguna {{identifier}}?",
  "genericDeleteConfirmationMessage": "Yakin akan menghapus metode pembayaran ini?",
  "deleteCancelButton": "Batalkan",
  "deleteConfirmationButton": "Hapus",
  "fieldEmptyForCvv": "Masukkan CVV.",
  "fieldEmptyForExpirationDate": "Masukkan tanggal akhir berlaku.",
  "fieldEmptyForCardholderName": "Masukkan nama pemegang kartu.",
  "fieldTooLongForCardholderName": "Nama pemegang kartu harus kurang dari 256 karakter.",
  "fieldEmptyForNumber": "Masukkan nomor.",
  "fieldEmptyForPostalCode": "Masukkan kode pos.",
  "fieldInvalidForCardholderName": "Nama pemilik kartu ini tidak valid.",
  "fieldInvalidForCvv": "Kode keamanan ini tidak valid.",
  "fieldInvalidForExpirationDate": "Tanggal akhir berlaku ini tidak valid.",
  "fieldInvalidForNumber": "Nomor kartu ini tidak valid.",
  "fieldInvalidForPostalCode": "Kode pos ini tidak valid.",
  "genericError": "Ada yang salah pada sistem kami.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Kartu kredit ini sudah dimasukkan sebagai metode pembayaran tersimpan.",
  "hostedFieldsFailedTokenizationError": "Periksa informasi Anda dan coba lagi.",
  "hostedFieldsFieldsInvalidError": "Periksa informasi Anda dan coba lagi.",
  "hostedFieldsTokenizationNetworkErrorError": "Masalah jaringan. Coba lagi.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Verifikasi kartu kredit gagal. Periksa informasi Anda dan coba lagi.",
  "paypalButtonMustBeUsed": "Gunakan tombol PayPal untuk melanjutkan pembayaran Anda.",
  "paypalAccountTokenizationFailedError": "Terjadi kesalahan saat menambahkan rekening PayPal. Coba lagi.",
  "paypalFlowFailedError": "Terjadi kesalahan saat menyambung ke PayPal. Coba lagi.",
  "paypalTokenizationRequestActiveError": "Otorisasi pembayaran PayPal sedang diproses.",
  "venmoCanceledError": "Terdapat kesalahan. Pastikan Anda telah menginstal aplikasi Venmo versi terbaru pada perangkat dan peramban Anda mendukung untuk beralih ke Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Tidak dapat menghapus metode pembayaran, coba lagi.",
  "venmoAppFailedError": "Aplikasi Venmo tidak dapat ditemukan pada perangkat Anda.",
  "unsupportedCardTypeError": "Jenis kartu ini tidak didukung. Coba kartu lainnya.",
  "applePayTokenizationError": "Terjadi kesalahan jaringan sewaktu memproses pembayaran melalui Apple Pay. Coba lagi.",
  "applePayActiveCardError": "Tambahkan kartu yang didukung ke wallet Apple Pay.",
  "cardholderNameLabel": "Nama Pemegang Kartu",
  "cardNumberLabel": "Nomor Kartu",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 angka)",
  "cvvFourDigitLabelSubheading": "(4 angka)",
  "cardholderNamePlaceholder": "Nama Pemegang Kartu",
  "expirationDateLabel": "Tanggal Kedaluwarsa",
  "expirationDateLabelSubheading": "(BB/TT)",
  "expirationDatePlaceholder": "BB/TT",
  "postalCodeLabel": "Kode Pos",
  "saveCardLabel": "Simpan kartu",
  "payWithCard": "Bayar dengan kartu",
  "endingIn": "Berakhiran {{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kartu",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],232:[function(require,module,exports){
/* eslint-disable camelcase */
'use strict';

var assign = require('../lib/assign').assign;

var fiveCharacterLocales = {
  ar_EG: require('./ar_EG'),
  cs_CZ: require('./cs_CZ'),
  da_DK: require('./da_DK'),
  de_DE: require('./de_DE'),
  el_GR: require('./el_GR'),
  en_AU: require('./en_AU'),
  en_GB: require('./en_GB'),
  en_IN: require('./en_IN'),
  en_US: require('./en_US'),
  es_ES: require('./es_ES'),
  es_XC: require('./es_XC'),
  fi_FI: require('./fi_FI'),
  fr_CA: require('./fr_CA'),
  fr_FR: require('./fr_FR'),
  fr_XC: require('./fr_XC'),
  he_IL: require('./he_IL'),
  hu_HU: require('./hu_HU'),
  id_ID: require('./id_ID'),
  it_IT: require('./it_IT'),
  ja_JP: require('./ja_JP'),
  ko_KR: require('./ko_KR'),
  nl_NL: require('./nl_NL'),
  no_NO: require('./no_NO'),
  pl_PL: require('./pl_PL'),
  pt_BR: require('./pt_BR'),
  pt_PT: require('./pt_PT'),
  ru_RU: require('./ru_RU'),
  sk_SK: require('./sk_SK'),
  sv_SE: require('./sv_SE'),
  th_TH: require('./th_TH'),
  zh_CN: require('./zh_CN'),
  zh_HK: require('./zh_HK'),
  zh_TW: require('./zh_TW'),
  zh_XC: require('./zh_XC')
};

var twoCharacterLocaleAliases = {
  ar: fiveCharacterLocales.ar_EG,
  cs: fiveCharacterLocales.cs_CZ,
  da: fiveCharacterLocales.da_DK,
  de: fiveCharacterLocales.de_DE,
  el: fiveCharacterLocales.el_GR,
  en: fiveCharacterLocales.en_US,
  es: fiveCharacterLocales.es_ES,
  fi: fiveCharacterLocales.fi_FI,
  fr: fiveCharacterLocales.fr_FR,
  id: fiveCharacterLocales.id_ID,
  it: fiveCharacterLocales.it_IT,
  hu: fiveCharacterLocales.hu_HU,
  ja: fiveCharacterLocales.ja_JP,
  ko: fiveCharacterLocales.ko_KR,
  nl: fiveCharacterLocales.nl_NL,
  no: fiveCharacterLocales.no_NO,
  pl: fiveCharacterLocales.pl_PL,
  pt: fiveCharacterLocales.pt_PT,
  ru: fiveCharacterLocales.ru_RU,
  sk: fiveCharacterLocales.sk_SK,
  sv: fiveCharacterLocales.sv_SE,
  th: fiveCharacterLocales.th_TH,
  zh: fiveCharacterLocales.zh_CN
};

module.exports = {
  twoCharacterLocaleAliases: twoCharacterLocaleAliases,
  fiveCharacterLocales: fiveCharacterLocales,
  translations: assign({}, twoCharacterLocaleAliases, fiveCharacterLocales)
};
/* eslint-enable camelcase */

},{"../lib/assign":197,"./ar_EG":214,"./cs_CZ":215,"./da_DK":216,"./de_DE":217,"./el_GR":218,"./en_AU":219,"./en_GB":220,"./en_IN":221,"./en_US":222,"./es_ES":223,"./es_XC":224,"./fi_FI":225,"./fr_CA":226,"./fr_FR":227,"./fr_XC":228,"./he_IL":229,"./hu_HU":230,"./id_ID":231,"./it_IT":233,"./ja_JP":234,"./ko_KR":235,"./nl_NL":236,"./no_NO":237,"./pl_PL":238,"./pt_BR":239,"./pt_PT":240,"./ru_RU":241,"./sk_SK":242,"./sv_SE":243,"./th_TH":244,"./zh_CN":245,"./zh_HK":246,"./zh_TW":247,"./zh_XC":248}],233:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Pagamento con {{paymentSource}}",
  "chooseAnotherWayToPay": "Scegli di pagare in un altro modo",
  "chooseAWayToPay": "Scegli come pagare",
  "otherWaysToPay": "Altri modi di pagare",
  "edit": "Modifica",
  "doneEditing": "Fine",
  "editPaymentMethods": "Modifica i metodi di pagamento",
  "CreditCardDeleteConfirmationMessage": "Eliminare la carta {{secondaryIdentifier}} le cui ultime cifre sono {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Eliminare il conto PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Vuoi eliminare il conto Venmo con nome utente {{identifier}}?",
  "genericDeleteConfirmationMessage": "Vuoi eliminare questo metodo di pagamento?",
  "deleteCancelButton": "Annulla",
  "deleteConfirmationButton": "Rimuovi",
  "fieldEmptyForCvv": "Immetti il codice di sicurezza (CVV).",
  "fieldEmptyForExpirationDate": "Immetti la data di scadenza.",
  "fieldEmptyForCardholderName": "Immetti il nome del titolare della carta.",
  "fieldTooLongForCardholderName": "Il nome del titolare della carta deve avere meno di 256 caratteri.",
  "fieldEmptyForNumber": "Immetti il numero di carta.",
  "fieldEmptyForPostalCode": "Immetti il CAP.",
  "fieldInvalidForCardholderName": "Il nome del titolare non è valido.",
  "fieldInvalidForCvv": "Il codice di sicurezza non è valido.",
  "fieldInvalidForExpirationDate": "La data di scadenza non è valida.",
  "fieldInvalidForNumber": "Il numero di carta non è valido.",
  "fieldInvalidForPostalCode": "Il CAP non è valido.",
  "genericError": "Si è verificato un errore nei nostri sistemi.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Questa carta di credito è già registrata come metodo di pagamento salvato.",
  "hostedFieldsFailedTokenizationError": "Controlla e riprova.",
  "hostedFieldsFieldsInvalidError": "Controlla e riprova.",
  "hostedFieldsTokenizationNetworkErrorError": "Errore di rete. Riprova.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "La verifica della carta di credito non è andata a buon fine. Controlla i dati e riprova.",
  "paypalButtonMustBeUsed": "Usa il pulsante PayPal per procedere al pagamento.",
  "paypalAccountTokenizationFailedError": "Si è verificato un errore nel collegamento del conto PayPal. Riprova.",
  "paypalFlowFailedError": "Si è verificato un errore di connessione a PayPal. Riprova.",
  "paypalTokenizationRequestActiveError": "L'autorizzazione di pagamento PayPal è già in corso.",
  "venmoCanceledError": "Si è verificato un errore. Assicurati di avere la versione più recente dell'app Venmo installata sul tuo dispositivo e che il browser supporti l'uso di Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Impossibile eliminare il metodo di pagamento; riprova.",
  "venmoAppFailedError": "Impossibile trovare l'app Venmo sul dispositivo in uso.",
  "unsupportedCardTypeError": "Questo tipo di carta non è supportato. Prova con un'altra carta.",
  "applePayTokenizationError": "Si è verificato un errore di rete durante l'elaborazione del pagamento con Apple Pay. Riprova.",
  "applePayActiveCardError": "Collega una carta supportata al tuo Apple Pay Wallet.",
  "cardholderNameLabel": "Titolare della carta",
  "cardNumberLabel": "Numero di carta",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 cifre)",
  "cvvFourDigitLabelSubheading": "(4 cifre)",
  "cardholderNamePlaceholder": "Titolare della carta",
  "expirationDateLabel": "Data di scadenza",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "CAP",
  "saveCardLabel": "Salva carta",
  "payWithCard": "Paga con una carta",
  "endingIn": "Le cui ultime cifre sono {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Carta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],234:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "{{paymentSource}}で支払う",
  "chooseAnotherWayToPay": "別の支払方法を選択する",
  "chooseAWayToPay": "支払方法を選択する",
  "otherWaysToPay": "その他の支払方法",
  "edit": "編集",
  "doneEditing": "完了",
  "editPaymentMethods": "支払方法の編集",
  "CreditCardDeleteConfirmationMessage": "末尾が{{identifier}}の{{secondaryIdentifier}}カードを削除しますか?",
  "PayPalAccountDeleteConfirmationMessage": "PayPalアカウント{{identifier}}を削除しますか?",
  "VenmoAccountDeleteConfirmationMessage": "ユーザー名{{identifier}}のVenmoアカウントを削除してよろしいですか?",
  "genericDeleteConfirmationMessage": "この支払い方法を削除してよろしいですか?",
  "deleteCancelButton": "キャンセル",
  "deleteConfirmationButton": "削除",
  "fieldEmptyForCvv": "セキュリティコードを入力してください。",
  "fieldEmptyForExpirationDate": "有効期限を入力してください。",
  "fieldEmptyForCardholderName": "カード保有者の名前を入力してください。",
  "fieldTooLongForCardholderName": "カード保有者の名前は256文字未満にしてください。",
  "fieldEmptyForNumber": "番号を入力してください。",
  "fieldEmptyForPostalCode": "郵便番号を入力してください。",
  "fieldInvalidForCardholderName": "このカード保有者の名前は無効です。",
  "fieldInvalidForCvv": "このセキュリティコードは無効です。",
  "fieldInvalidForExpirationDate": "この有効期限は無効です。",
  "fieldInvalidForNumber": "このカード番号は無効です。",
  "fieldInvalidForPostalCode": "この郵便番号は無効です。",
  "genericError": "弊社側で問題が発生しました。",
  "hostedFieldsTokenizationFailOnDuplicateError": "このクレジットカードは、保存済みの支払方法としてすでに登録されています。",
  "hostedFieldsFailedTokenizationError": "情報を確認してもう一度お試しください。",
  "hostedFieldsFieldsInvalidError": "情報を確認してもう一度お試しください。",
  "hostedFieldsTokenizationNetworkErrorError": "ネットワークエラーです。もう一度お試しください。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "クレジットカードの認証に失敗しました。情報を確認してもう一度お試しください。",
  "paypalButtonMustBeUsed": "お客さまの支払いを続行するには、PayPalボタンを使用します。",
  "paypalAccountTokenizationFailedError": "PayPalアカウントの追加で問題が発生しました。もう一度お試しください。",
  "paypalFlowFailedError": "PayPalへの接続に問題が発生しました。もう一度お試しください。",
  "paypalTokenizationRequestActiveError": "PayPal支払いの承認はすでに処理中です。",
  "venmoCanceledError": "問題が発生しました。お客さまの端末にインストールされているVenmoアプリが最新のバージョンであること、お使いのブラウザがVenmoへの切り替えをサポートしていることを確認してください。",
  "vaultManagerPaymentMethodDeletionError": "支払方法を削除できません。もう一度お試しください。",
  "venmoAppFailedError": "お客さまの端末でVenmoアプリが見つかりませんでした。",
  "unsupportedCardTypeError": "このカードタイプはサポートされていません。別のカードをご使用ください。",
  "applePayTokenizationError": "Apple Payの支払いを処理する際にネットワークエラーが発生しました。もう一度お試しください。",
  "applePayActiveCardError": "Apple Payウォレットに対応しているカードを追加してください。",
  "cardholderNameLabel": "カード保有者の名前",
  "cardNumberLabel": "カード番号",
  "cvvLabel": "セキュリティコード",
  "cvvThreeDigitLabelSubheading": "(3桁)",
  "cvvFourDigitLabelSubheading": "(4桁)",
  "cardholderNamePlaceholder": "カード保有者の名前",
  "expirationDateLabel": "有効期限",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "郵便番号",
  "saveCardLabel": "カードを保存",
  "payWithCard": "カードで支払う",
  "endingIn": "末尾が{{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "カード",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "銀聯(UnionPay)"
};

},{}],235:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "{{paymentSource}}(으)로 결제",
  "chooseAnotherWayToPay": "다른 결제수단 선택",
  "chooseAWayToPay": "결제수단 선택",
  "otherWaysToPay": "다른 방법으로 결제",
  "edit": "편집",
  "doneEditing": "완료",
  "editPaymentMethods": "결제수단 편집",
  "CreditCardDeleteConfirmationMessage": "끝번호가 {{identifier}}인 {{secondaryIdentifier}} 카드를 삭제하시겠어요?",
  "PayPalAccountDeleteConfirmationMessage": "PayPal 계정 {{identifier}}을(를) 삭제하시겠어요?",
  "VenmoAccountDeleteConfirmationMessage": "사용자 이름이 {{identifier}}인 Venmo 계정을 삭제하시겠어요?",
  "genericDeleteConfirmationMessage": "이 결제수단을 삭제하시겠어요?",
  "deleteCancelButton": "취소",
  "deleteConfirmationButton": "삭제",
  "fieldEmptyForCvv": "CVV를 입력하세요.",
  "fieldEmptyForExpirationDate": "만료일을 입력하세요.",
  "fieldEmptyForCardholderName": "카드 소유자 이름을 입력하세요.",
  "fieldTooLongForCardholderName": "카드 소유자 이름은 256자 미만이어야 합니다.",
  "fieldEmptyForNumber": "번호를 입력하세요.",
  "fieldEmptyForPostalCode": "우편번호를 입력하세요.",
  "fieldInvalidForCardholderName": "이 카드 소유자 이름은 유효하지 않습니다.",
  "fieldInvalidForCvv": "이 보안 코드가 올바르지 않습니다.",
  "fieldInvalidForExpirationDate": "이 만료일이 올바르지 않습니다.",
  "fieldInvalidForNumber": "이 카드 번호가 올바르지 않습니다.",
  "fieldInvalidForPostalCode": "이 우편번호가 올바르지 않습니다.",
  "genericError": "저희 쪽에 문제가 발생했습니다.",
  "hostedFieldsTokenizationFailOnDuplicateError": "저장된 결제수단에 이미 이 신용카드가 존재합니다.",
  "hostedFieldsFailedTokenizationError": "정보를 확인하고 다시 시도해 주세요.",
  "hostedFieldsFieldsInvalidError": "정보를 확인하고 다시 시도해 주세요.",
  "hostedFieldsTokenizationNetworkErrorError": "네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "신용카드 인증에 실패했습니다. 정보를 확인하고 다시 시도해 주세요.",
  "paypalButtonMustBeUsed": "결제를 계속하려면 PayPal 버튼을 사용하세요.",
  "paypalAccountTokenizationFailedError": "PayPal 계정을 추가하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
  "paypalFlowFailedError": "PayPal 계정을 연결하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
  "paypalTokenizationRequestActiveError": "PayPal 결제 승인이 이미 진행 중입니다.",
  "venmoCanceledError": "오류가 발생했습니다. 기기에 최신 버전의 Venmo 앱이 설치되어 있으며 브라우저가 Venmo로 전환 기능을 지원하는지 확인하세요.",
  "vaultManagerPaymentMethodDeletionError": "결제수단을 삭제할 수 없습니다. 다시 시도해 주세요.",
  "venmoAppFailedError": "기기에서 Venmo 앱을 찾을 수 없습니다.",
  "unsupportedCardTypeError": "이 카드 형식은 지원되지 않습니다. 다른 카드로 시도해 주세요.",
  "applePayTokenizationError": "Apple Pay 결제를 처리하는 동안 네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
  "applePayActiveCardError": "Apple Pay 전자지갑에 지원되는 카드를 추가하세요.",
  "cardholderNameLabel": "카드 소유자 이름",
  "cardNumberLabel": "카드 번호",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3자리)",
  "cvvFourDigitLabelSubheading": "(4자리)",
  "cardholderNamePlaceholder": "카드 소유자 이름",
  "expirationDateLabel": "만료일",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "우편번호",
  "saveCardLabel": "카드 저장",
  "payWithCard": "카드로 결제",
  "endingIn": "끝번호: {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "카드",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],236:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Betalen met {{paymentSource}}",
  "chooseAnotherWayToPay": "Kies een andere betaalmethode",
  "chooseAWayToPay": "Kies een betaalwijze",
  "otherWaysToPay": "Andere manieren om te betalen",
  "edit": "Bewerk",
  "doneEditing": "Klaar",
  "editPaymentMethods": "Betaalmethoden aanpassen",
  "CreditCardDeleteConfirmationMessage": "{{secondaryIdentifier}}-kaart eindigend op {{identifier}} verwijderen?",
  "PayPalAccountDeleteConfirmationMessage": "PayPal-rekening {{identifier}} verwijderen?",
  "VenmoAccountDeleteConfirmationMessage": "Weet u zeker dat u Venmo-rekening met gebruikersnaam {{identifier}} wilt verwijderen?",
  "genericDeleteConfirmationMessage": "Weet u zeker dat u deze betaalmethode wilt verwijderen?",
  "deleteCancelButton": "Annuleren",
  "deleteConfirmationButton": "Verwijderen",
  "fieldEmptyForCvv": "Vul een CSC in.",
  "fieldEmptyForExpirationDate": "Vul een vervaldatum in.",
  "fieldEmptyForCardholderName": "Vul een naam voor de kaarthouder in.",
  "fieldTooLongForCardholderName": "De naam van de kaarthouder moet korter zijn dan 256 tekens.",
  "fieldEmptyForNumber": "Vul een nummer in.",
  "fieldEmptyForPostalCode": "Vul een postcode in.",
  "fieldInvalidForCardholderName": "Naam kaarthouder is ongeldig.",
  "fieldInvalidForCvv": "Deze CSC is ongeldig.",
  "fieldInvalidForExpirationDate": "Deze vervaldatum is ongeldig.",
  "fieldInvalidForNumber": "Dit creditcardnummer is ongeldig.",
  "fieldInvalidForPostalCode": "Deze postcode is ongeldig.",
  "genericError": "Er is iets fout gegaan.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Deze creditcard staat al geregistreerd als een opgeslagen betaalmethode.",
  "hostedFieldsFailedTokenizationError": "Controleer uw gegevens en probeer het opnieuw.",
  "hostedFieldsFieldsInvalidError": "Controleer uw gegevens en probeer het opnieuw.",
  "hostedFieldsTokenizationNetworkErrorError": "Netwerkfout. Probeer het opnieuw.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "De controle van de creditcard is mislukt. Controleer uw gegevens en probeer het opnieuw.",
  "paypalButtonMustBeUsed": "Gebruik de PayPal-knop om door te gaan met uw betaling.",
  "paypalAccountTokenizationFailedError": "Er is iets misgegaan bij het toevoegen van de PayPal-rekening. Probeer het opnieuw.",
  "paypalFlowFailedError": "Er is iets misgegaan bij de verbinding met PayPal. Probeer het opnieuw.",
  "paypalTokenizationRequestActiveError": "De autorisatie van de PayPal-betaling is al in behandeling.",
  "venmoCanceledError": "Er ging iets fout. Controleer of de meest recente versie van de Venmo-app op je apparaat is geïnstalleerd en dat je browser overschakelen naar Venmo ondersteunt.",
  "vaultManagerPaymentMethodDeletionError": "Kan de betaalmethode niet verwijderen, probeer het opnieuw.",
  "venmoAppFailedError": "De Venmo-app is niet aangetroffen op je apparaat.",
  "unsupportedCardTypeError": "Dit type creditcard wordt niet ondersteund. Gebruik een andere creditcard.",
  "applePayTokenizationError": "Er is een netwerkfout opgetreden bij het verwerken van de Apple Pay-betaling. Probeer het opnieuw.",
  "applePayActiveCardError": "Voeg een ondersteunde creditcard toe aan je Apple Pay-wallet.",
  "cardholderNameLabel": "Naam kaarthouder",
  "cardNumberLabel": "Creditcardnummer",
  "cvvLabel": "CSC",
  "cvvThreeDigitLabelSubheading": "(3 cijfers)",
  "cvvFourDigitLabelSubheading": "(4 cijfers)",
  "cardholderNamePlaceholder": "Naam kaarthouder",
  "expirationDateLabel": "Vervaldatum",
  "expirationDateLabelSubheading": "(MM/JJ)",
  "expirationDatePlaceholder": "MM/JJ",
  "postalCodeLabel": "Postcode",
  "saveCardLabel": "Creditcard opslaan",
  "payWithCard": "Betalen met creditcard",
  "endingIn": "Eindigend op {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Creditcard",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],237:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Betaling med {{paymentSource}}",
  "chooseAnotherWayToPay": "Velg en annen måte å betale på",
  "chooseAWayToPay": "Velg betalingsmåte",
  "otherWaysToPay": "Andre måter å betale på",
  "edit": "Rediger",
  "doneEditing": "Fullført",
  "editPaymentMethods": "Endre betalingsmetodene dine",
  "CreditCardDeleteConfirmationMessage": "Vil du slette {{secondaryIdentifier}}-kortet som slutter på {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Vil du slette PayPal-kontoen {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Er du sikker på at du vil slette Venmo-kontoen med brukernavnet {{identifier}}?",
  "genericDeleteConfirmationMessage": "Er du sikker på at du vil slette denne betalingsmetoden?",
  "deleteCancelButton": "Avbryt",
  "deleteConfirmationButton": "Slett",
  "fieldEmptyForCvv": "Oppgi en kortsikkerhetskode (CVV).",
  "fieldEmptyForExpirationDate": "Oppgi en utløpsdato.",
  "fieldEmptyForCardholderName": "Oppgi et navn for kortinnehaveren.",
  "fieldTooLongForCardholderName": "Makslengden for kortinnehaverens navn er 256 tegn.",
  "fieldEmptyForNumber": "Oppgi et nummer.",
  "fieldEmptyForPostalCode": "Oppgi et postnummer.",
  "fieldInvalidForCardholderName": "Denne kortinnehaverens navn er ikke gyldig.",
  "fieldInvalidForCvv": "Denne sikkerhetskoden er ikke gyldig.",
  "fieldInvalidForExpirationDate": "Denne utløpsdatoen er ikke gyldig.",
  "fieldInvalidForNumber": "Dette kortnummeret er ikke gyldig.",
  "fieldInvalidForPostalCode": "Dette postnummeret er ikke gyldig.",
  "genericError": "Noe gikk galt hos oss.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Dette betalingskortet eksisterer allerede som en lagret betalingsmetode.",
  "hostedFieldsFailedTokenizationError": "Kontroller informasjonen og prøv på nytt.",
  "hostedFieldsFieldsInvalidError": "Kontroller informasjonen og prøv på nytt.",
  "hostedFieldsTokenizationNetworkErrorError": "Nettverksfeil. Prøv på nytt.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Bekreftelsen av betalingskortet mislyktes. Kontroller informasjonen og prøv på nytt.",
  "paypalButtonMustBeUsed": "Bruk PayPal-knappen for å fortsette med betalingen.",
  "paypalAccountTokenizationFailedError": "Noe gikk galt da PayPal-kontoen ble lagt til. Prøv på nytt.",
  "paypalFlowFailedError": "Det oppsto et problem med tilkoblingen til PayPal. Prøv på nytt.",
  "paypalTokenizationRequestActiveError": "Godkjenning av PayPal-betalingen pågår allerede",
  "venmoCanceledError": "Noe gikk galt. Kontroller at du har installert den nyeste versjonen av Venmo-appen på enheten og at nettleseren din støtter bytte til Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Kunne ikke slette betalingsmetoden. Prøv på nytt.",
  "venmoAppFailedError": "Finner ikke Venmo-appen på enheten.",
  "unsupportedCardTypeError": "Denne korttypen støttes ikke. Prøv med et annet kort.",
  "applePayTokenizationError": "Det oppsto en nettverksfeil under behandlingen av Apple Pay-betalingen. Prøv på nytt.",
  "applePayActiveCardError": "Legg til et kort som støttes i Apple Pay-lommeboken din.",
  "cardholderNameLabel": "Kortinnehaverens navn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 siffer)",
  "cvvFourDigitLabelSubheading": "(4 siffer)",
  "cardholderNamePlaceholder": "Kortinnehaverens navn",
  "expirationDateLabel": "Utløpsdato",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "saveCardLabel": "Lagre kort",
  "payWithCard": "Betal med kort",
  "endingIn": "Slutter på {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],238:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Źródło finansowania płatności: {{paymentSource}}",
  "chooseAnotherWayToPay": "Wybierz inne źródło finansowania płatności",
  "chooseAWayToPay": "Wybierz źródło finansowania płatności",
  "otherWaysToPay": "Inne źródła finansowania płatności",
  "edit": "Edytuj",
  "doneEditing": "Gotowe",
  "editPaymentMethods": "Edytuj źródła finansowania płatności",
  "CreditCardDeleteConfirmationMessage": "Usunąć kartę {{secondaryIdentifier}} o numerze zakończonym cyframi {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Usunąć konto PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Czy na pewno chcesz usunąć konto Venmo z nazwą użytkownika {{identifier}}?",
  "genericDeleteConfirmationMessage": "Czy na pewno chcesz usunąć to źródło finansowania płatności?",
  "deleteCancelButton": "Anuluj",
  "deleteConfirmationButton": "Usuń",
  "fieldEmptyForCvv": "Podaj kod bezpieczeństwa.",
  "fieldEmptyForExpirationDate": "Podaj datę ważności.",
  "fieldEmptyForCardholderName": "Podaj imię i nazwisko posiadacza karty.",
  "fieldTooLongForCardholderName": "Imię i nazwisko posiadacza karty musi mieć mniej niż 256 znaków.",
  "fieldEmptyForNumber": "Podaj numer.",
  "fieldEmptyForPostalCode": "Podaj kod pocztowy.",
  "fieldInvalidForCardholderName": "To imię i nazwisko posiadacza karty jest nieprawidłowe.",
  "fieldInvalidForCvv": "Podany kod bezpieczeństwa jest nieprawidłowy.",
  "fieldInvalidForExpirationDate": "Podana data ważności jest nieprawidłowa.",
  "fieldInvalidForNumber": "Podany numer karty jest nieprawidłowy.",
  "fieldInvalidForPostalCode": "Podany kod pocztowy jest nieprawidłowy.",
  "genericError": "Wystąpił błąd po naszej stronie.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Ta karta kredytowa jest już zapisana jako źródło finansowania płatności.",
  "hostedFieldsFailedTokenizationError": "Sprawdź swoje informacje i spróbuj ponownie.",
  "hostedFieldsFieldsInvalidError": "Sprawdź swoje informacje i spróbuj ponownie.",
  "hostedFieldsTokenizationNetworkErrorError": "Błąd sieci. Spróbuj ponownie.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Weryfikacja karty kredytowej nie powiodła się. Sprawdź swoje informacje i spróbuj ponownie.",
  "paypalButtonMustBeUsed": "Użyj przycisku PayPal, aby kontynuować płatność.",
  "paypalAccountTokenizationFailedError": "Coś poszło nie tak podczas dodawania konta PayPal. Spróbuj ponownie.",
  "paypalFlowFailedError": "Coś poszło nie tak podczas łączenia z systemem PayPal. Spróbuj ponownie.",
  "paypalTokenizationRequestActiveError": "Autoryzacja płatności PayPal jest już w trakcie realizacji.",
  "venmoCanceledError": "Wystąpił problem. Upewnij się, czy na swoim urządzeniu masz zainstalowaną najnowszą wersję aplikacji Venmo i Twoja przeglądarka ją obsługuje.",
  "vaultManagerPaymentMethodDeletionError": "Nie można usunąć źródła finansowania płatności. Spróbuj ponownie.",
  "venmoAppFailedError": "Nie można odnaleźć aplikacji Venmo na urządzeniu.",
  "unsupportedCardTypeError": "Ten typ karty nie jest obsługiwany. Spróbuj użyć innej karty.",
  "applePayTokenizationError": "Wystąpił błąd sieci podczas przetwarzania płatności Apple Pay. Spróbuj ponownie.",
  "applePayActiveCardError": "Dodaj obsługiwaną kartę do portfela Apple Pay.",
  "cardholderNameLabel": "Imię i nazwisko posiadacza karty",
  "cardNumberLabel": "Numer karty",
  "cvvLabel": "Kod CVC",
  "cvvThreeDigitLabelSubheading": "(3 cyfry)",
  "cvvFourDigitLabelSubheading": "(4 cyfry)",
  "cardholderNamePlaceholder": "Imię i nazwisko posiadacza karty",
  "expirationDateLabel": "Data ważności",
  "expirationDateLabelSubheading": "(MM/RR)",
  "expirationDatePlaceholder": "MM/RR",
  "postalCodeLabel": "Kod pocztowy",
  "saveCardLabel": "Zapisz kartę",
  "payWithCard": "Zapłać kartą",
  "endingIn": "O numerze zakończonym cyframi {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Karta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],239:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Pagando com {{paymentSource}}",
  "chooseAnotherWayToPay": "Escolher outro meio de pagamento",
  "chooseAWayToPay": "Escolher um meio de pagamento",
  "otherWaysToPay": "Outro meio de pagamento",
  "edit": "Editar",
  "doneEditing": "Concluído",
  "editPaymentMethods": "Editar meios de pagamento",
  "CreditCardDeleteConfirmationMessage": "Excluir cartão com {{secondaryIdentifier}} com final {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Excluir conta do PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Tem certeza de que deseja excluir a conta do Venmo com o nome de usuário {{identifier}}?",
  "genericDeleteConfirmationMessage": "Tem certeza de que deseja excluir este meio de pagamento?",
  "deleteCancelButton": "Cancelar",
  "deleteConfirmationButton": "Excluir",
  "fieldEmptyForCvv": "Informe o Código de Segurança.",
  "fieldEmptyForExpirationDate": "Informe a data de vencimento.",
  "fieldEmptyForCardholderName": "Informe o nome do titular do cartão.",
  "fieldTooLongForCardholderName": "O nome do titular do cartão deve ter menos de 256 caracteres.",
  "fieldEmptyForNumber": "Informe um número.",
  "fieldEmptyForPostalCode": "Informe um CEP.",
  "fieldInvalidForCardholderName": "O nome do titular do cartão é inválido.",
  "fieldInvalidForCvv": "Este código de segurança não é válido.",
  "fieldInvalidForExpirationDate": "Esta data de vencimento não é válida.",
  "fieldInvalidForNumber": "O número do cartão não é válido.",
  "fieldInvalidForPostalCode": "Este CEP não é válido.",
  "genericError": "Ocorreu um erro.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Este cartão de crédito já está salvo em seus meios de pagamento.",
  "hostedFieldsFailedTokenizationError": "Verifique as informações e tente novamente.",
  "hostedFieldsFieldsInvalidError": "Verifique as informações e tente novamente.",
  "hostedFieldsTokenizationNetworkErrorError": "Erro de rede. Tente novamente.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Falha ao verificar o cartão de crédito. Verifique as informações e tente novamente.",
  "paypalButtonMustBeUsed": "Use o botão do PayPal para prosseguir com o seu pagamento.",
  "paypalAccountTokenizationFailedError": "Ocorreu um erro ao adicionar a conta do PayPal. Tente novamente.",
  "paypalFlowFailedError": "Ocorreu um erro de conexão com o PayPal. Tente novamente.",
  "paypalTokenizationRequestActiveError": "A autorização de pagamento do PayPal já está em andamento.",
  "venmoCanceledError": "Ocorreu um erro. Certifique-se de ter a versão mais recente do aplicativo Venmo instalado no seu dispositivo e que o seu navegador suporte a mudança para o Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Não é possível excluir o meio de pagamento, tente novamente.",
  "venmoAppFailedError": "Não foi possível encontrar o aplicativo Venmo no seu dispositivo.",
  "unsupportedCardTypeError": "Este tipo de cartão não é aceito. Experimente outro cartão.",
  "applePayTokenizationError": "Ocorreu um erro de rede ao processar o pagamento com Apple Pay. Tente novamente.",
  "applePayActiveCardError": "Adicione cartão suportado à sua carteira do Apple Pay.",
  "cardholderNameLabel": "Nome do titular do cartão",
  "cardNumberLabel": "Número do cartão",
  "cvvLabel": "CSC",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nome do titular do cartão",
  "expirationDateLabel": "Data de vencimento",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "CEP",
  "saveCardLabel": "Salvar cartão",
  "payWithCard": "Pague com seu cartão",
  "endingIn": "Com final {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Cartão",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],240:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Pagar com {{paymentSource}}",
  "chooseAnotherWayToPay": "Escolher outra forma de pagamento",
  "chooseAWayToPay": "Escolha um meio de pagamento",
  "otherWaysToPay": "Outras formas de pagamento",
  "edit": "Editar",
  "doneEditing": "Concluído",
  "editPaymentMethods": "Editar meios de pagamento",
  "CreditCardDeleteConfirmationMessage": "Eliminar o cartão {{secondaryIdentifier}} terminado em {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Eliminar {{identifier}} da conta PayPal?",
  "VenmoAccountDeleteConfirmationMessage": "Tem a certeza de que pretende eliminar a conta Venmo com o nome de utilizador {{identifier}}?",
  "genericDeleteConfirmationMessage": "Tem certeza de que pretende eliminar este meio de pagamento?",
  "deleteCancelButton": "Cancelar",
  "deleteConfirmationButton": "Eliminar",
  "fieldEmptyForCvv": "Introduza o código CVV.",
  "fieldEmptyForExpirationDate": "Introduza a data de validade.",
  "fieldEmptyForCardholderName": "Introduza um nome do titular do cartão.",
  "fieldTooLongForCardholderName": "O nome do titular do cartão tem de ter menos de 256 carateres.",
  "fieldEmptyForNumber": "Introduza um número.",
  "fieldEmptyForPostalCode": "Introduza o código postal.",
  "fieldInvalidForCardholderName": "Este nome do titular do cartão não é válido.",
  "fieldInvalidForCvv": "Este código de segurança não é válido.",
  "fieldInvalidForExpirationDate": "Esta data de validade não é correta.",
  "fieldInvalidForNumber": "Este número de cartão não é válido.",
  "fieldInvalidForPostalCode": "Este código postal não é válido.",
  "genericError": "Tudo indica que houve um problema.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Este cartão de crédito já está registado como um meio de pagamento guardado.",
  "hostedFieldsFailedTokenizationError": "Verifique os dados e tente novamente.",
  "hostedFieldsFieldsInvalidError": "Verifique os dados e tente novamente.",
  "hostedFieldsTokenizationNetworkErrorError": "Erro de rede. Tente novamente.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "A verificação do cartão de crédito falhou. Verifique os dados e tente novamente.",
  "paypalButtonMustBeUsed": "Use o botão PayPal para continuar com o seu pagamento.",
  "paypalAccountTokenizationFailedError": "Ocorreu um erro ao associar a conta PayPal. Tente novamente.",
  "paypalFlowFailedError": "Ocorreu um erro na ligação com PayPal. Tente novamente.",
  "paypalTokenizationRequestActiveError": "Já há uma autorização de pagamento PayPal em curso.",
  "venmoCanceledError": "Ocorreu um erro. Certifique-se de que tem a versão mais recente da aplicação Venmo instalada no seu dispositivo e que o navegador suporta a mudança para o Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Não é possível eliminar o meio de pagamento, tente novamente.",
  "venmoAppFailedError": "Não foi possível encontrar a aplicação Venmo no dispositivo.",
  "unsupportedCardTypeError": "Este tipo de cartão não é suportado. Tente usar outro cartão.",
  "applePayTokenizationError": "Ocorreu um erro de rede ao processar o pagamento com Apple Pay. Tente novamente.",
  "applePayActiveCardError": "Adicione um cartão suportado à sua carteira Apple Pay.",
  "cardholderNameLabel": "Nome do titular do cartão",
  "cardNumberLabel": "Número do cartão",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nome do titular do cartão",
  "expirationDateLabel": "Data de validade",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Código postal",
  "saveCardLabel": "Guardar cartão",
  "payWithCard": "Pagar com cartão",
  "endingIn": "Terminado em {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Cartão",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],241:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Способы оплаты: {{paymentSource}}",
  "chooseAnotherWayToPay": "Выберите другой способ оплаты",
  "chooseAWayToPay": "Выберите способ оплаты",
  "otherWaysToPay": "Другие способы оплаты",
  "edit": "Редактировать",
  "doneEditing": "Готово",
  "editPaymentMethods": "Редактировать способы оплаты",
  "CreditCardDeleteConfirmationMessage": "Удалить карту {{secondaryIdentifier}}, оканчивающуюся на {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Удалить счет PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Вы действительно хотите удалить счет Venmo с именем пользователя {{identifier}}?",
  "genericDeleteConfirmationMessage": "Вы действительно хотите удалить этот способ оплаты?",
  "deleteCancelButton": "Отмена",
  "deleteConfirmationButton": "Удалить",
  "fieldEmptyForCvv": "Укажите код безопасности.",
  "fieldEmptyForExpirationDate": "Укажите дату окончания срока действия.",
  "fieldEmptyForCardholderName": "Введите имя и фамилию владельца карты.",
  "fieldTooLongForCardholderName": "Имя владельца карты должно содержать не более 256 символов.",
  "fieldEmptyForNumber": "Введите номер.",
  "fieldEmptyForPostalCode": "Укажите почтовый индекс.",
  "fieldInvalidForCardholderName": "Недопустимое имя владельца карты.",
  "fieldInvalidForCvv": "Этот код безопасности недействителен.",
  "fieldInvalidForExpirationDate": "Эта дата окончания срока действия недействительна.",
  "fieldInvalidForNumber": "Этот номер карты недействителен.",
  "fieldInvalidForPostalCode": "Этот почтовый индекс недействителен.",
  "genericError": "Возникла проблема с нашей стороны.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Эта кредитная карта уже указана как сохраненный источник средств.",
  "hostedFieldsFailedTokenizationError": "Проверьте правильность ввода данных и повторите попытку.",
  "hostedFieldsFieldsInvalidError": "Проверьте правильность ввода данных и повторите попытку.",
  "hostedFieldsTokenizationNetworkErrorError": "Ошибка сети. Повторите попытку.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Проверка банковской карты не выполнена. Проверьте правильность ввода данных и повторите попытку.",
  "paypalButtonMustBeUsed": "Используйте кнопку PayPal, чтобы продолжить совершение оплаты.",
  "paypalAccountTokenizationFailedError": "Что-то пошло не так — не удалось добавить учетную запись PayPal. Повторите попытку.",
  "paypalFlowFailedError": "Что-то пошло не так — не удалось подключиться к системе PayPal. Повторите попытку.",
  "paypalTokenizationRequestActiveError": "Выполняется авторизация платежа PayPal.",
  "venmoCanceledError": "Возникла ошибка. Просим вас убедиться, что у вас установлена новейшая версия приложения Venmo и ваш браузер поддерживает переключение к Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Не удалось удалить способ оплаты. Повторите попытку.",
  "venmoAppFailedError": "Приложение Venmo не обнаружено на вашем устройстве.",
  "unsupportedCardTypeError": "Этот тип карты не поддерживается. Попробуйте воспользоваться другой картой.",
  "applePayTokenizationError": "При обработке платежа через Apple Pay возникла сетевая ошибка. Повторите попытку.",
  "applePayActiveCardError": "Добавьте поддерживаемую карту к своему счету Apple Pay.",
  "cardholderNameLabel": "Имя и фамилия владельца",
  "cardNumberLabel": "Номер карты",
  "cvvLabel": "Код безопасности",
  "cvvThreeDigitLabelSubheading": "(3 цифры)",
  "cvvFourDigitLabelSubheading": "(4 цифры)",
  "cardholderNamePlaceholder": "Имя и фамилия владельца",
  "expirationDateLabel": "Срок действия",
  "expirationDateLabelSubheading": "(ММ/ГГ)",
  "expirationDatePlaceholder": "ММ/ГГ",
  "postalCodeLabel": "Индекс",
  "saveCardLabel": "Сохранить карту",
  "payWithCard": "Оплатить картой",
  "endingIn": "Последние четыре цифры номера карты: {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Карта",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],242:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Spôsob úhrady: {{paymentSource}}",
  "chooseAnotherWayToPay": "Vyberte iný spôsob platby",
  "chooseAWayToPay": "Vyberte spôsob platby",
  "otherWaysToPay": "Iné spôsoby platby",
  "edit": "Upraviť",
  "doneEditing": "Hotovo",
  "editPaymentMethods": "Upraviť spôsoby platby",
  "CreditCardDeleteConfirmationMessage": "Odstrániť kartu {{secondaryIdentifier}} končiacu na {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Odstrániť účet PayPal {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Naozaj chcete odstrániť účet Venmo s menom používateľa {{identifier}}?",
  "genericDeleteConfirmationMessage": "Ste si istí, že chcete tento spôsob platby odstrániť?",
  "deleteCancelButton": "Zrušiť",
  "deleteConfirmationButton": "Odstrániť",
  "fieldEmptyForCvv": "Zadajte číslo CVV.",
  "fieldEmptyForExpirationDate": "Zadajte dátum skončenia platnosti.",
  "fieldEmptyForCardholderName": "Zadajte meno majiteľa karty.",
  "fieldTooLongForCardholderName": "Meno majiteľa karty musí obsahovať menej ako 256 znakov.",
  "fieldEmptyForNumber": "Zadajte číslo.",
  "fieldEmptyForPostalCode": "Zadajte PSČ.",
  "fieldInvalidForCardholderName": "Toto meno majiteľa karty je neplatné.",
  "fieldInvalidForCvv": "Tento bezpečnostný kód je neplatný.",
  "fieldInvalidForExpirationDate": "Tento dátum skončenia platnosti je neplatný.",
  "fieldInvalidForNumber": "Toto číslo karty je neplatné.",
  "fieldInvalidForPostalCode": "Toto PSČ je neplatné.",
  "genericError": "Vyskytla sa chyba na našej strane.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Táto kreditná karta už existuje ako uložená metóda platby.",
  "hostedFieldsFailedTokenizationError": "Skontrolujte údaje a skúste to znova.",
  "hostedFieldsFieldsInvalidError": "Skontrolujte údaje a skúste to znova.",
  "hostedFieldsTokenizationNetworkErrorError": "Chyba v sieti. Skúste to znova.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Overenie kreditnej karty nebolo úspešné. Skontrolujte údaje a skúste to znova.",
  "paypalButtonMustBeUsed": "Ak chcete pokračovať v platbe, použite tlačidlo PayPal.",
  "paypalAccountTokenizationFailedError": "Vyskytla sa chyba pri pridávaní účtu PayPal. Skúste to znova.",
  "paypalFlowFailedError": "Vyskytla sa chyba pri pripájaní do účtu PayPal. Skúste to znova.",
  "paypalTokenizationRequestActiveError": "Autorizácia platby PayPal už prebieha.",
  "venmoCanceledError": "Vyskytla sa chyba. Skontrolujte, či máte v zariadení nainštalovanú najnovšiu verziu aplikácie Venmo a či prehliadač podporuje prechod na aplikáciu Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Nebolo možné odstrániť spôsob platby, skúste to znova.",
  "venmoAppFailedError": "Aplikáciu Venmo sa vo vašom zariadení nepodarilo nájsť.",
  "unsupportedCardTypeError": "Tento typ karty nie je podporovaný. Skúste inú kartu.",
  "applePayTokenizationError": "Počas spracúvania platby cez Apple Pay došlo k chybe siete. Skúste to znova.",
  "applePayActiveCardError": "Pridajte si podporovanú kartu do peňaženky Apple Pay.",
  "cardholderNameLabel": "Meno majiteľa karty",
  "cardNumberLabel": "Číslo karty",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 číslice)",
  "cvvFourDigitLabelSubheading": "(4 číslice)",
  "cardholderNamePlaceholder": "Meno majiteľa karty",
  "expirationDateLabel": "Dátum skončenia platnosti",
  "expirationDateLabelSubheading": "(MM/RR)",
  "expirationDatePlaceholder": "MM/RR",
  "postalCodeLabel": "PSČ",
  "saveCardLabel": "Uložiť kartu",
  "payWithCard": "Zaplatiť kartou",
  "endingIn": "S posledným štvorčíslím {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Karta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],243:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "Betalas med {{paymentSource}}",
  "chooseAnotherWayToPay": "Välj ett annat sätt att betala",
  "chooseAWayToPay": "Välj hur du vill betala",
  "otherWaysToPay": "Andra sätt att betala",
  "edit": "Ändra",
  "doneEditing": "Klart",
  "editPaymentMethods": "Redigera betalningsmetoder",
  "CreditCardDeleteConfirmationMessage": "Ta bort {{secondaryIdentifier}}-kort som slutar på {{identifier}}?",
  "PayPalAccountDeleteConfirmationMessage": "Ta bort PayPal-konto {{identifier}}?",
  "VenmoAccountDeleteConfirmationMessage": "Är du säker på att du vill ta bort Venmo-konto med användarnamn {{identifier}}?",
  "genericDeleteConfirmationMessage": "Är du säker på att du vill ta bort den här betalningsmetoden?",
  "deleteCancelButton": "Avbryt",
  "deleteConfirmationButton": "Ta bort",
  "fieldEmptyForCvv": "Fyll i en CVV-kod.",
  "fieldEmptyForExpirationDate": "Fyll i ett utgångsdatum.",
  "fieldEmptyForCardholderName": "Fyll i kortinnehavarens namn.",
  "fieldTooLongForCardholderName": "Kortinnehavarens namn måste vara kortare än 256 tecken.",
  "fieldEmptyForNumber": "Fyll i ett nummer.",
  "fieldEmptyForPostalCode": "Fyll i ett postnummer.",
  "fieldInvalidForCardholderName": "Namnet på kortinnehavaren är ogiltigt.",
  "fieldInvalidForCvv": "Den här säkerhetskoden är inte giltig.",
  "fieldInvalidForExpirationDate": "Det här utgångsdatumet är inte giltigt.",
  "fieldInvalidForNumber": "Det här kortnumret är inte giltigt.",
  "fieldInvalidForPostalCode": "Det här postnumret är inte giltigt.",
  "genericError": "Ett fel uppstod.",
  "hostedFieldsTokenizationFailOnDuplicateError": "Det här betalkortet finns redan som en sparad betalningsmetod.",
  "hostedFieldsFailedTokenizationError": "Kontrollera uppgifterna och försök igen.",
  "hostedFieldsFieldsInvalidError": "Kontrollera uppgifterna och försök igen.",
  "hostedFieldsTokenizationNetworkErrorError": "Nätverksfel. Försök igen.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Verifieringen av betalkort misslyckades. Kontrollera uppgifterna och försök igen.",
  "paypalButtonMustBeUsed": "Använd PayPal-knappen för att fortsätta med din betalning.",
  "paypalAccountTokenizationFailedError": "Ett fel uppstod när PayPal-kontot skulle läggas till. Försök igen.",
  "paypalFlowFailedError": "Ett fel uppstod när anslutningen till PayPal skulle upprättas. Försök igen.",
  "paypalTokenizationRequestActiveError": "Betalningsgodkännandet för PayPal behandlas redan.",
  "venmoCanceledError": "Något gick fel. Se till att du har den senaste versionen av Venmo-appen installerad på din enhet och att webbläsaren stöder att gå över till Venmo.",
  "vaultManagerPaymentMethodDeletionError": "Det gick inte att ta bort betalningsmetoden. Försök igen.",
  "venmoAppFailedError": "Venmo-appen kunde inte hittas på din enhet.",
  "unsupportedCardTypeError": "Den här korttypen stöds inte. Pröva med ett annat kort.",
  "applePayTokenizationError": "Ett nätverksfel inträffade när Apple Pay-betalningen skulle behandlas. Försök igen.",
  "applePayActiveCardError": "Lägg till ett kort som stöds i Apple Pay-e-plånboken.",
  "cardholderNameLabel": "Kortinnehavarens namn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 siffror)",
  "cvvFourDigitLabelSubheading": "(4 siffror)",
  "cardholderNamePlaceholder": "Kortinnehavarens namn",
  "expirationDateLabel": "Utgångsdatum",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "saveCardLabel": "Spara kort",
  "payWithCard": "Betala med kort",
  "endingIn": "Slutar på {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],244:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "การชำระเงินด้วย {{paymentSource}}",
  "chooseAnotherWayToPay": "เลือกวิธีอื่นเพื่อชำระเงิน",
  "chooseAWayToPay": "เลือกวิธีชำระเงิน",
  "otherWaysToPay": "วิธีอื่นๆ ในการชำระเงิน",
  "edit": "แก้ไข",
  "doneEditing": "เสร็จแล้ว",
  "editPaymentMethods": "แก้ไขวิธีการชำระเงิน",
  "CreditCardDeleteConfirmationMessage": "ลบบัตร {{secondaryIdentifier }} ที่ลงท้ายด้วย {{identifier}} หรือไม่",
  "PayPalAccountDeleteConfirmationMessage": "ลบ {{identifier}} บัญชี PayPal หรือไม่",
  "VenmoAccountDeleteConfirmationMessage": "คุณมั่นใจว่าต้องการลบบัญชี Venmo ที่มีชื่อผู้ใช้ {{identifier}} หรือไม่",
  "genericDeleteConfirmationMessage": "คุณมั่นใจว่าต้องการลบวิธีการชำระเงินนี้หรือไม่",
  "deleteCancelButton": "ยกเลิก",
  "deleteConfirmationButton": "ลบ",
  "fieldEmptyForCvv": "โปรดกรอก CVV (รหัสการตรวจสอบยืนยันบัตร)",
  "fieldEmptyForExpirationDate": "โปรดกรอกวันที่หมดอายุ",
  "fieldEmptyForCardholderName": "โปรดกรอกชื่อเจ้าของบัตร",
  "fieldTooLongForCardholderName": "ชื่อผู้ถือบัตรจะต้องไม่เกิน 256 อักขระ",
  "fieldEmptyForNumber": "โปรดกรอกหมายเลข",
  "fieldEmptyForPostalCode": "โปรดกรอกรหัสไปรษณีย์",
  "fieldInvalidForCardholderName": "ชื่อผู้ถือบัตรนี้ไม่ถูกต้องชื่อผู้ถือบัตรนี้ไม่ถูกต้อง",
  "fieldInvalidForCvv": "รหัสความปลอดภัยนี้ไม่ถูกต้อง",
  "fieldInvalidForExpirationDate": "วันที่หมดอายุนี้ไม่ถูกต้อง",
  "fieldInvalidForNumber": "หมายเลขบัตรนี้ไม่ถูกต้อง",
  "fieldInvalidForPostalCode": "รหัสไปรษณีย์นี้ไม่ถูกต้อง",
  "genericError": "เกิดข้อผิดพลาดขึ้นในระบบของเรา",
  "hostedFieldsTokenizationFailOnDuplicateError": "บัตรเครดิตนี้ถูกบันทึกไว้เป็นวิธีการชำระเงิน",
  "hostedFieldsFailedTokenizationError": "โปรดตรวจสอบข้อมูลของคุณ แล้วลองใหม่อีกครั้ง",
  "hostedFieldsFieldsInvalidError": "โปรดตรวจสอบข้อมูลของคุณ แล้วลองใหม่อีกครั้ง",
  "hostedFieldsTokenizationNetworkErrorError": "ข้อผิดพลาดด้านเครือข่าย โปรดลองอีกครั้ง",
  "hostedFieldsTokenizationCvvVerificationFailedError": "การตรวจสอบยืนยันบัตรเครดิตล้มเหลว โปรดตรวจสอบข้อมูลของคุณ แล้วลองใหม่อีกครั้ง",
  "paypalButtonMustBeUsed": "ใช้ปุ่ม PayPal เพื่อดำเนินการชำระเงินต่อ",
  "paypalAccountTokenizationFailedError": "เกิดข้อผิดพลาดในการเพิ่มบัญชี PayPal โปรดลองอีกครั้ง",
  "paypalFlowFailedError": "เกิดข้อผิดพลาดในการเชื่อมต่อกับ PayPal โปรดลองอีกครั้ง",
  "paypalTokenizationRequestActiveError": "การอนุญาตการชำระเงินของ PayPal อยู่ในระหว่างดำเนินการ",
  "venmoCanceledError": "เกิดข้อผิดพลาดบางประการ ตรวจสอบว่าคุณมีแอป Venmo เวอร์ชันล่าสุดติดตั้งในอุปกรณ์ของคุณ และมีเบราเซอร์ที่รองรับ Venmo",
  "vaultManagerPaymentMethodDeletionError": "ไม่สามารถลบวิธีการชำระเงินได้ ลองอีกครั้ง",
  "venmoAppFailedError": "ไม่พบแอป Venmo บนอุปกรณ์ของคุณ",
  "unsupportedCardTypeError": "ไม่รองรับบัตรประเภทนี้ โปรดลองใช้บัตรใบอื่น",
  "applePayTokenizationError": "เกิดข้อผิดพลาดด้านเครือข่ายขึ้นขณะดำเนินการชำระเงินด้วย Apple Pay โปรดลองอีกครั้ง",
  "applePayActiveCardError": "เพิ่มบัตรที่รองรับในกระเป๋าสตางค์ Apple Pay ของคุณ",
  "cardholderNameLabel": "ชื่อเจ้าของบัตร",
  "cardNumberLabel": "หมายเลขบัตร",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 หลัก)",
  "cvvFourDigitLabelSubheading": "(4 หลัก)",
  "cardholderNamePlaceholder": "ชื่อเจ้าของบัตร",
  "expirationDateLabel": "วันหมดอายุ",
  "expirationDateLabelSubheading": "(ดด/ปป)",
  "expirationDatePlaceholder": "ดด/ปป",
  "postalCodeLabel": "รหัสไปรษณีย์",
  "saveCardLabel": "บันทึกบัตร",
  "payWithCard": "ชำระเงินด้วยบัตร",
  "endingIn": "ลงท้ายด้วย {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "บัตร",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],245:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "正在使用{{paymentSource}}付款",
  "chooseAnotherWayToPay": "选择其他付款方式",
  "chooseAWayToPay": "选择付款方式",
  "otherWaysToPay": "其他付款方式",
  "edit": "编辑",
  "doneEditing": "完成",
  "editPaymentMethods": "编辑付款方式",
  "CreditCardDeleteConfirmationMessage": "删除尾号为{{identifier}}的{{secondaryIdentifier}}卡？",
  "PayPalAccountDeleteConfirmationMessage": "删除PayPal账户{{identifier}}？",
  "VenmoAccountDeleteConfirmationMessage": "确定要删除用户名为{{identifier}}的Venmo账户吗？",
  "genericDeleteConfirmationMessage": "确定要删除该付款方式吗？",
  "deleteCancelButton": "取消",
  "deleteConfirmationButton": "删除",
  "fieldEmptyForCvv": "请填写CVV。",
  "fieldEmptyForExpirationDate": "请填写有效期限。",
  "fieldEmptyForCardholderName": "请填写持卡人的姓名。",
  "fieldTooLongForCardholderName": "持卡人姓名必须少于256个字符。",
  "fieldEmptyForNumber": "请填写一个号码。",
  "fieldEmptyForPostalCode": "请填写邮政编码。",
  "fieldInvalidForCardholderName": "此持卡人姓名无效。",
  "fieldInvalidForCvv": "此安全代码无效。",
  "fieldInvalidForExpirationDate": "此有效期限无效。",
  "fieldInvalidForNumber": "此卡号无效。",
  "fieldInvalidForPostalCode": "此邮政编码无效。",
  "genericError": "我们遇到了一些问题",
  "hostedFieldsTokenizationFailOnDuplicateError": "此信用卡已作为保存后的付款方式存在。",
  "hostedFieldsFailedTokenizationError": "请检查您的信息，然后重试。",
  "hostedFieldsFieldsInvalidError": "请检查您的信息，然后重试。",
  "hostedFieldsTokenizationNetworkErrorError": "网络错误。请重试。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "信用卡验证失败。请检查您的信息，然后重试。",
  "paypalButtonMustBeUsed": "使用PayPal按钮继续进行付款。",
  "paypalAccountTokenizationFailedError": "添加PayPal账户时出错。请重试。",
  "paypalFlowFailedError": "连接到PayPal时出错。请重试。",
  "paypalTokenizationRequestActiveError": "PayPal付款授权已在进行中。",
  "venmoCanceledError": "我们遇到了问题。请确保您的设备上已安装最新版本的Venmo应用，并且您的浏览器支持切换到Venmo。",
  "vaultManagerPaymentMethodDeletionError": "无法删除付款方式，请重试。",
  "venmoAppFailedError": "在您的设备上找不到Venmo应用。",
  "unsupportedCardTypeError": "不支持该卡类型。请尝试其他卡。",
  "applePayTokenizationError": "处理Apple Pay付款时出现网络错误。请重试。",
  "applePayActiveCardError": "请添加受支持的卡到您的Apple Pay钱包。",
  "cardholderNameLabel": "持卡人姓名",
  "cardNumberLabel": "卡号",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "（3位数）",
  "cvvFourDigitLabelSubheading": "（4位数）",
  "cardholderNamePlaceholder": "持卡人姓名",
  "expirationDateLabel": "有效期限",
  "expirationDateLabelSubheading": "（MM/YY）",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "邮政编码",
  "saveCardLabel": "保存卡",
  "payWithCard": "用卡付款",
  "endingIn": "尾号为{{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "银联"
};

},{}],246:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "付款方式為 {{paymentSource}}",
  "chooseAnotherWayToPay": "選擇其他付款方式",
  "chooseAWayToPay": "選擇付款方式",
  "otherWaysToPay": "其他付款方式",
  "edit": "編輯",
  "doneEditing": "完成",
  "editPaymentMethods": "編輯付款方式",
  "CreditCardDeleteConfirmationMessage": "要刪除末碼為 {{identifier}} 的 {{secondaryIdentifier}} 卡嗎？",
  "PayPalAccountDeleteConfirmationMessage": "要刪除 PayPal 帳戶 {{identifier}} 嗎？",
  "VenmoAccountDeleteConfirmationMessage": "確定要刪除使用者名稱為 {{identifier}} 的 Venmo 帳戶嗎？",
  "genericDeleteConfirmationMessage": "確定要刪除此付款方式嗎？",
  "deleteCancelButton": "取消",
  "deleteConfirmationButton": "刪除",
  "fieldEmptyForCvv": "請填寫信用卡認證碼。",
  "fieldEmptyForExpirationDate": "請填寫到期日。",
  "fieldEmptyForCardholderName": "請填寫持卡人的名字。",
  "fieldTooLongForCardholderName": "持卡人姓名必須少於 256 個字元。",
  "fieldEmptyForNumber": "請填寫號碼。",
  "fieldEmptyForPostalCode": "請填寫郵遞區號。",
  "fieldInvalidForCardholderName": "持卡人姓名無效。",
  "fieldInvalidForCvv": "此安全代碼無效。",
  "fieldInvalidForExpirationDate": "此到期日無效。",
  "fieldInvalidForNumber": "此卡號無效。",
  "fieldInvalidForPostalCode": "此郵遞區號無效。",
  "genericError": "系統發生錯誤。",
  "hostedFieldsTokenizationFailOnDuplicateError": "此信用卡已存在，為已儲存的付款方式。",
  "hostedFieldsFailedTokenizationError": "請檢查你的資料並再試一次。",
  "hostedFieldsFieldsInvalidError": "請檢查你的資料並再試一次。",
  "hostedFieldsTokenizationNetworkErrorError": "網絡錯誤。再試一次。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "信用卡認證失敗。請檢查你的資料並再試一次。",
  "paypalButtonMustBeUsed": "使用 PayPal 按鈕以繼續付款。",
  "paypalAccountTokenizationFailedError": "加入 PayPal 帳戶時發生錯誤。再試一次。",
  "paypalFlowFailedError": "連接 PayPal 時發生錯誤。再試一次。",
  "paypalTokenizationRequestActiveError": "PayPal 付款授權已在處理中。",
  "venmoCanceledError": "系統發生錯誤，請確保你已在裝置上安裝最新版本的 Venmo 應用程式，而且你的瀏覽器支援切換至 Venmo。",
  "vaultManagerPaymentMethodDeletionError": "無法刪除付款方式，請再試一次。",
  "venmoAppFailedError": "在你的裝置上找不到 Venmo 應用程式。",
  "unsupportedCardTypeError": "不可使用此信用卡類型。請改用其他信用卡。",
  "applePayTokenizationError": "處理 Apple Pay 付款時發生網絡錯誤。再試一次。",
  "applePayActiveCardError": "在 Apple Pay 錢包中加入支援的信用卡。",
  "cardholderNameLabel": "持卡人名字",
  "cardNumberLabel": "卡號",
  "cvvLabel": "信用卡認證碼",
  "cvvThreeDigitLabelSubheading": "（3 位數）",
  "cvvFourDigitLabelSubheading": "（4 位數）",
  "cardholderNamePlaceholder": "持卡人名字",
  "expirationDateLabel": "到期日",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "月 / 年",
  "postalCodeLabel": "郵遞區號",
  "saveCardLabel": "儲存信用卡",
  "payWithCard": "使用信用卡付款",
  "endingIn": "末碼為 {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "信用卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],247:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "以 {{paymentSource}} 付款",
  "chooseAnotherWayToPay": "選擇付款的以其他方式付款",
  "chooseAWayToPay": "選擇付款方式",
  "otherWaysToPay": "其他付款方式",
  "edit": "編輯",
  "doneEditing": "完成",
  "editPaymentMethods": "編輯付款方式",
  "CreditCardDeleteConfirmationMessage": "確定要刪除末碼為 {{identifier}} 的 {{secondaryIdentifier}} 卡片嗎？",
  "PayPalAccountDeleteConfirmationMessage": "確定要刪除 {{identifier}} PayPal 帳戶嗎？",
  "VenmoAccountDeleteConfirmationMessage": "確定要刪除用戶名稱為 {{identifier}} 的 Venmo 帳戶嗎？",
  "genericDeleteConfirmationMessage": "確定要刪除此付款方式？",
  "deleteCancelButton": "取消",
  "deleteConfirmationButton": "刪除",
  "fieldEmptyForCvv": "請填妥信用卡驗證碼。",
  "fieldEmptyForExpirationDate": "請填妥到期日。",
  "fieldEmptyForCardholderName": "請填妥持卡人姓名。",
  "fieldTooLongForCardholderName": "持卡人姓名不能超過 256 個字元。",
  "fieldEmptyForNumber": "請填妥號碼。",
  "fieldEmptyForPostalCode": "請填寫郵遞區號。",
  "fieldInvalidForCardholderName": "此持卡人姓名無效。",
  "fieldInvalidForCvv": "這組安全代碼無效。",
  "fieldInvalidForExpirationDate": "此到期日無效。",
  "fieldInvalidForNumber": "此卡號無效。",
  "fieldInvalidForPostalCode": "此郵遞區號無效。",
  "genericError": "我們的系統發生問題。",
  "hostedFieldsTokenizationFailOnDuplicateError": "此信用卡已存在，為已儲存的付款方式。",
  "hostedFieldsFailedTokenizationError": "請檢查你的資料並重試。",
  "hostedFieldsFieldsInvalidError": "請檢查你的資料並重試。",
  "hostedFieldsTokenizationNetworkErrorError": "網路錯誤。請重試。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "信用卡認證失敗。請檢查你的資料並重試。",
  "paypalButtonMustBeUsed": "使用 PayPal 按鈕以繼續付款。",
  "paypalAccountTokenizationFailedError": "新增 PayPal 帳戶時，系統發生錯誤。請重試。",
  "paypalFlowFailedError": "連結至 PayPal 時，系統發生錯誤。請重試。",
  "paypalTokenizationRequestActiveError": "PayPal 支付款項的授權已在處理中。",
  "venmoCanceledError": "系統發生錯誤。確認你的裝置上裝有最新版本的 Venmo 應用程式，而且瀏覽器支援切換至 Venmo。",
  "vaultManagerPaymentMethodDeletionError": "無法刪除付款方式，請再試一次。",
  "venmoAppFailedError": "你的裝置上找不到 Venmo 應用程式。",
  "unsupportedCardTypeError": "不支援此卡片類型。請改用其他卡片。",
  "applePayTokenizationError": "在處理 Apple Pay 付款時發生網路錯誤。請重試。",
  "applePayActiveCardError": "新增支援的卡片至你的 Apple Pay 錢包。",
  "cardholderNameLabel": "持卡人姓名",
  "cardNumberLabel": "卡號",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "（3 位數）",
  "cvvFourDigitLabelSubheading": "（4 位數）",
  "cardholderNamePlaceholder": "持卡人姓名",
  "expirationDateLabel": "到期日",
  "expirationDateLabelSubheading": "（月 / 年）",
  "expirationDatePlaceholder": "月 / 年",
  "postalCodeLabel": "郵遞區號",
  "saveCardLabel": "儲存卡片",
  "payWithCard": "使用信用卡 / 扣帳卡付款",
  "endingIn": "末碼為 {{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "信用卡或扣帳卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal 信貸",
  "Google Pay": "Google Pay",
  "American Express": "美國運通 (American Express)",
  "Discover": "Discover",
  "Diners Club": "大來國際 (Diners Club)",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};

},{}],248:[function(require,module,exports){
'use strict';

module.exports = {
  "payingWith": "使用{{paymentSource}}付款",
  "chooseAnotherWayToPay": "选择其它付款方式",
  "chooseAWayToPay": "选择付款方式",
  "otherWaysToPay": "其它付款方式",
  "edit": "编辑",
  "doneEditing": "完成",
  "editPaymentMethods": "编辑付款方式",
  "CreditCardDeleteConfirmationMessage": "删除尾号为{{identifier}}的{{secondaryIdentifier}}卡？",
  "PayPalAccountDeleteConfirmationMessage": "删除PayPal账户{{identifier}}？",
  "VenmoAccountDeleteConfirmationMessage": "确定要删除用户名为{{identifier}}的Venmo账户吗？",
  "genericDeleteConfirmationMessage": "确定要删除此付款方式吗？",
  "deleteCancelButton": "取消",
  "deleteConfirmationButton": "删除",
  "fieldEmptyForCvv": "请填写 CVV。",
  "fieldEmptyForExpirationDate": "请填写有效期限。",
  "fieldEmptyForCardholderName": "请填写持卡人姓名。",
  "fieldTooLongForCardholderName": "持卡人姓名必须少于256个字符。",
  "fieldEmptyForNumber": "请填写号码。",
  "fieldEmptyForPostalCode": "请填写邮政编码。",
  "fieldInvalidForCardholderName": "此持卡人姓名无效。",
  "fieldInvalidForCvv": "此验证码无效。",
  "fieldInvalidForExpirationDate": "此有效期限无效。",
  "fieldInvalidForNumber": "此卡号无效。",
  "fieldInvalidForPostalCode": "此邮政编码无效。",
  "genericError": "我们遇到了一些问题。",
  "hostedFieldsTokenizationFailOnDuplicateError": "此信用卡已存在于已保存的付款方式中。",
  "hostedFieldsFailedTokenizationError": "请检查您的信息，然后重试。",
  "hostedFieldsFieldsInvalidError": "请检查您的信息，然后重试。",
  "hostedFieldsTokenizationNetworkErrorError": "网络错误。请重试。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "信用卡认证失败。请检查您的信息，然后重试。",
  "paypalButtonMustBeUsed": "使用PayPal按钮以便继续进行您的付款。",
  "paypalAccountTokenizationFailedError": "添加PayPal账户时遇到了问题。请重试。",
  "paypalFlowFailedError": "连接到PayPal时遇到了问题。请重试。",
  "paypalTokenizationRequestActiveError": "PayPal付款授权正在处理中。",
  "venmoCanceledError": "我们遇到了一些问题。请确保您的设备上安装了最新版本的Venmo应用，并且您的浏览器支持切换到Venmo。",
  "vaultManagerPaymentMethodDeletionError": "无法删除付款方式，请重试。",
  "venmoAppFailedError": "未能在您的设备上找到Venmo应用。",
  "unsupportedCardTypeError": "不支持此类型的卡。请尝试其它卡。",
  "applePayTokenizationError": "处理Apple Pay付款时出现了网络错误。请重试。",
  "applePayActiveCardError": "在您的Apple Pay钱包中添加一张受支持的卡。",
  "cardholderNameLabel": "持卡人姓名",
  "cardNumberLabel": "卡号",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "（3位数）",
  "cvvFourDigitLabelSubheading": "（4位数）",
  "cardholderNamePlaceholder": "持卡人姓名",
  "expirationDateLabel": "有效期限",
  "expirationDateLabelSubheading": "（月/年）",
  "expirationDatePlaceholder": "月/年",
  "postalCodeLabel": "邮政编码",
  "saveCardLabel": "保存卡",
  "payWithCard": "使用卡付款",
  "endingIn": "尾号为{{lastFourCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "银联"
};

},{}],249:[function(require,module,exports){
'use strict';

var assign = require('../lib/assign').assign;
var classList = require('@braintree/class-list');
var DropinError = require('../lib/dropin-error');
var errors = require('../constants').errors;
var Promise = require('../lib/promise');

function BaseView(options) {
  options = options || {};

  assign(this, options);
}

BaseView.prototype.getElementById = function (id) {
  if (!this.element) { return null; }

  return this.element.querySelector('[data-braintree-id="' + id + '"]');
};

BaseView.prototype.requestPaymentMethod = function () {
  return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
};

BaseView.prototype.getPaymentMethod = function () {
  return this.activeMethodView && this.activeMethodView.paymentMethod;
};

BaseView.prototype.onSelection = function () {};

BaseView.prototype.teardown = function () {
  return Promise.resolve();
};

BaseView.prototype.preventUserAction = function () {
  if (this.element) {
    classList.add(this.element, 'braintree-sheet--loading');
  }

  this.model.preventUserAction();
};

BaseView.prototype.allowUserAction = function () {
  if (this.element) {
    classList.remove(this.element, 'braintree-sheet--loading');
  }

  this.model.allowUserAction();
};

module.exports = BaseView;

},{"../constants":191,"../lib/assign":197,"../lib/dropin-error":201,"../lib/promise":208,"@braintree/class-list":39}],250:[function(require,module,exports){
'use strict';

var BaseView = require('./base-view');
var addSelectionEventHandler = require('../lib/add-selection-event-handler');
var paymentMethodTypes = require('../constants').paymentMethodTypes;

function DeleteConfirmationView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

DeleteConfirmationView.prototype = Object.create(BaseView.prototype);
DeleteConfirmationView.prototype.constructor = DeleteConfirmationView;
DeleteConfirmationView.ID = DeleteConfirmationView.prototype.ID = 'delete-confirmation';

DeleteConfirmationView.prototype._initialize = function () {
  this._yesButton = this.getElementById('delete-confirmation__yes');
  this._noButton = this.getElementById('delete-confirmation__no');
  this._messageBox = this.getElementById('delete-confirmation__message');

  addSelectionEventHandler(this._yesButton, function () {
    this.model.deleteVaultedPaymentMethod();
  }.bind(this));
  addSelectionEventHandler(this._noButton, function () {
    this.model.cancelDeleteVaultedPaymentMethod();
  }.bind(this));
};

DeleteConfirmationView.prototype.applyPaymentMethod = function (paymentMethod) {
  var identifier, secondaryIdentifier;
  var messageText = this.strings[paymentMethod.type + 'DeleteConfirmationMessage'];

  if (messageText) {
    switch (paymentMethod.type) {
      case paymentMethodTypes.card:
        identifier = paymentMethod.details.lastFour;
        secondaryIdentifier = paymentMethod.details.cardType;
        secondaryIdentifier = this.strings[secondaryIdentifier] || secondaryIdentifier;
        break;
      case paymentMethodTypes.paypal:
        identifier = paymentMethod.details.email;
        break;
      case paymentMethodTypes.venmo:
        identifier = paymentMethod.details.username;
        break;
      default:
        break;
    }

    messageText = messageText.replace('{{identifier}}', identifier);
    if (secondaryIdentifier) {
      messageText = messageText.replace('{{secondaryIdentifier}}', secondaryIdentifier);
    }
  } else {
    messageText = this.strings.genericDeleteConfirmationMessage;
  }
  this._messageBox.innerText = messageText;
};

DeleteConfirmationView.prototype.onSelection = function () {
  window.requestAnimationFrame(function () {
    this._yesButton.focus();
  }.bind(this));
};

module.exports = DeleteConfirmationView;

},{"../constants":191,"../lib/add-selection-event-handler":195,"./base-view":249}],251:[function(require,module,exports){
'use strict';

var analytics = require('../lib/analytics');
var analyticsKinds = require('../constants').analyticsKinds;
var BaseView = require('./base-view');
var classList = require('@braintree/class-list');
var sheetViews = require('./payment-sheet-views');
var PaymentMethodsView = require('./payment-methods-view');
var PaymentOptionsView = require('./payment-options-view');
var DeleteConfirmationView = require('./delete-confirmation-view');
var addSelectionEventHandler = require('../lib/add-selection-event-handler');
var Promise = require('../lib/promise');
var wait = require('../lib/wait');
var supportsFlexbox = require('../lib/supports-flexbox');

var CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT = require('../constants').CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT;
var DEVELOPER_MISCONFIGURATION_MESSAGE = require('../constants').errors.DEVELOPER_MISCONFIGURATION_MESSAGE;

function MainView() {
  BaseView.apply(this, arguments);

  this.dependenciesInitializing = 0;

  this._initialize();
}

MainView.prototype = Object.create(BaseView.prototype);
MainView.prototype.constructor = MainView;

MainView.prototype._initialize = function () {
  var paymentOptionsView;

  this._hasMultiplePaymentOptions = this.model.supportedPaymentOptions.length > 1;

  this._views = {};

  this.sheetContainer = this.getElementById('sheet-container');
  this.sheetErrorText = this.getElementById('sheet-error-text');

  this.toggle = this.getElementById('toggle');
  this.disableWrapper = this.getElementById('disable-wrapper');
  this.lowerContainer = this.getElementById('lower-container');

  this.loadingContainer = this.getElementById('loading-container');
  this.dropinContainer = this.element.querySelector('.braintree-dropin');

  this.supportsFlexbox = supportsFlexbox();

  this.model.on('asyncDependenciesReady', this.hideLoadingIndicator.bind(this));

  this.model.on('errorOccurred', this.showSheetError.bind(this));
  this.model.on('errorCleared', this.hideSheetError.bind(this));
  this.model.on('preventUserAction', this.preventUserAction.bind(this));
  this.model.on('allowUserAction', this.allowUserAction.bind(this));

  this.paymentSheetViewIDs = Object.keys(sheetViews).reduce(function (ids, sheetViewKey) {
    var PaymentSheetView, paymentSheetView;

    if (this.model.supportedPaymentOptions.indexOf(sheetViewKey) !== -1) {
      PaymentSheetView = sheetViews[sheetViewKey];

      paymentSheetView = new PaymentSheetView({
        element: this.getElementById(PaymentSheetView.ID),
        mainView: this,
        model: this.model,
        client: this.client,
        strings: this.strings
      });
      paymentSheetView.initialize();

      this.addView(paymentSheetView);
      ids.push(paymentSheetView.ID);
    }

    return ids;
  }.bind(this), []);

  this.paymentMethodsViews = new PaymentMethodsView({
    element: this.element,
    model: this.model,
    client: this.client,
    strings: this.strings
  });
  this.addView(this.paymentMethodsViews);

  this.deleteConfirmationView = new DeleteConfirmationView({
    element: this.getElementById('delete-confirmation'),
    model: this.model,
    strings: this.strings
  });
  this.addView(this.deleteConfirmationView);

  addSelectionEventHandler(this.toggle, this.toggleAdditionalOptions.bind(this));

  this.model.on('changeActivePaymentMethod', function () {
    wait.delay(CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT).then(function () {
      this.setPrimaryView(PaymentMethodsView.ID);
    }.bind(this));
  }.bind(this));

  this.model.on('changeActiveView', this._onChangeActiveView.bind(this));

  this.model.on('removeActivePaymentMethod', function () {
    var activePaymentView = this.getView(this.model.getActivePaymentViewId());

    if (activePaymentView && typeof activePaymentView.removeActivePaymentMethod === 'function') {
      activePaymentView.removeActivePaymentMethod();
    }
  }.bind(this));

  this.model.on('enableEditMode', this.enableEditMode.bind(this));

  this.model.on('disableEditMode', this.disableEditMode.bind(this));

  this.model.on('confirmPaymentMethodDeletion', this.openConfirmPaymentMethodDeletionDialog.bind(this));
  this.model.on('cancelVaultedPaymentMethodDeletion', this.cancelVaultedPaymentMethodDeletion.bind(this));
  this.model.on('startVaultedPaymentMethodDeletion', this.startVaultedPaymentMethodDeletion.bind(this));
  this.model.on('finishVaultedPaymentMethodDeletion', this.finishVaultedPaymentMethodDeletion.bind(this));

  if (this._hasMultiplePaymentOptions) {
    paymentOptionsView = new PaymentOptionsView({
      client: this.client,
      element: this.getElementById(PaymentOptionsView.ID),
      mainView: this,
      model: this.model,
      strings: this.strings
    });

    this.addView(paymentOptionsView);
  }

  this._sendToDefaultView();
};

MainView.prototype._onChangeActiveView = function (data) {
  var id = data.newViewId;
  var activePaymentView = this.getView(id);

  if (id === PaymentMethodsView.ID) {
    classList.add(this.paymentMethodsViews.container, 'braintree-methods--active');
    classList.remove(this.sheetContainer, 'braintree-sheet--active');
  } else {
    wait.delay(0).then(function () {
      classList.add(this.sheetContainer, 'braintree-sheet--active');
    }.bind(this));
    classList.remove(this.paymentMethodsViews.container, 'braintree-methods--active');
    if (!this.getView(id).getPaymentMethod()) {
      this.model.setPaymentMethodRequestable({
        isRequestable: false
      });
    }
  }

  activePaymentView.onSelection();
};

MainView.prototype.addView = function (view) {
  this._views[view.ID] = view;
};

MainView.prototype.getView = function (id) {
  return this._views[id];
};

MainView.prototype.setPrimaryView = function (id, secondaryViewId) {
  var paymentMethod;

  wait.delay(0).then(function () {
    this.element.className = prefixShowClass(id);
    if (secondaryViewId) {
      classList.add(this.element, prefixShowClass(secondaryViewId));
    }
  }.bind(this));

  this.primaryView = this.getView(id);
  this.model.changeActiveView(id);

  if (this.paymentSheetViewIDs.indexOf(id) !== -1) {
    if (this.model.getPaymentMethods().length > 0 || this.getView(PaymentOptionsView.ID)) {
      this.showToggle();
    } else {
      this.hideToggle();
    }
  } else if (id === PaymentMethodsView.ID) {
    this.showToggle();
    // Move options below the upper-container
    this.getElementById('lower-container').appendChild(this.getElementById('options'));
  } else if (id === PaymentOptionsView.ID) {
    this.hideToggle();
  }

  if (!this.supportsFlexbox) {
    this.element.setAttribute('data-braintree-no-flexbox', true);
  }

  paymentMethod = this.primaryView.getPaymentMethod();

  this.model.setPaymentMethodRequestable({
    isRequestable: Boolean(paymentMethod && !this.model.isInEditMode()),
    type: paymentMethod && paymentMethod.type,
    selectedPaymentMethod: paymentMethod
  });

  this.model.clearError();
};

MainView.prototype.requestPaymentMethod = function () {
  var activePaymentView = this.getView(this.model.getActivePaymentViewId());

  return activePaymentView.requestPaymentMethod().then(function (payload) {
    analytics.sendEvent(this.client, 'request-payment-method.' + analyticsKinds[payload.type]);

    return payload;
  }.bind(this)).catch(function (err) {
    analytics.sendEvent(this.client, 'request-payment-method.error');

    return Promise.reject(err);
  }.bind(this));
};

MainView.prototype.hideLoadingIndicator = function () {
  classList.remove(this.dropinContainer, 'braintree-loading');
  classList.add(this.dropinContainer, 'braintree-loaded');
  classList.add(this.loadingContainer, 'braintree-hidden');
};

MainView.prototype.showLoadingIndicator = function () {
  classList.add(this.dropinContainer, 'braintree-loading');
  classList.remove(this.dropinContainer, 'braintree-loaded');
  classList.remove(this.loadingContainer, 'braintree-hidden');
};

MainView.prototype.toggleAdditionalOptions = function () {
  var sheetViewID;
  var isPaymentSheetView = this.paymentSheetViewIDs.indexOf(this.primaryView.ID) !== -1;

  this.hideToggle();

  if (!this._hasMultiplePaymentOptions) {
    sheetViewID = this.paymentSheetViewIDs[0];

    classList.add(this.element, prefixShowClass(sheetViewID));
    this.model.changeActiveView(sheetViewID);
  } else if (isPaymentSheetView) {
    if (this.model.getPaymentMethods().length === 0) {
      this.setPrimaryView(PaymentOptionsView.ID);
    } else {
      this.setPrimaryView(PaymentMethodsView.ID, PaymentOptionsView.ID);
      this.hideToggle();
    }
  } else {
    classList.add(this.element, prefixShowClass(PaymentOptionsView.ID));
  }
};

MainView.prototype.showToggle = function () {
  if (this.model.isInEditMode()) {
    return;
  }
  classList.remove(this.toggle, 'braintree-hidden');
  classList.add(this.lowerContainer, 'braintree-hidden');
};

MainView.prototype.hideToggle = function () {
  classList.add(this.toggle, 'braintree-hidden');
  classList.remove(this.lowerContainer, 'braintree-hidden');
};

MainView.prototype.showSheetError = function (error) {
  var errorMessage;
  var genericErrorMessage = this.strings.genericError;

  if (this.strings.hasOwnProperty(error)) {
    errorMessage = this.strings[error];
  } else if (error && typeof error.code === 'string') {
    errorMessage = this.strings[snakeCaseToCamelCase(error.code) + 'Error'] || genericErrorMessage;
  } else if (error === 'developerError') {
    errorMessage = DEVELOPER_MISCONFIGURATION_MESSAGE;
  } else {
    errorMessage = genericErrorMessage;
  }

  classList.add(this.dropinContainer, 'braintree-sheet--has-error');
  this.sheetErrorText.innerHTML = errorMessage;
};

MainView.prototype.hideSheetError = function () {
  classList.remove(this.dropinContainer, 'braintree-sheet--has-error');
};

MainView.prototype.getOptionsElements = function () {
  return this._views.options.elements;
};

MainView.prototype.preventUserAction = function () {
  classList.remove(this.disableWrapper, 'braintree-hidden');
};

MainView.prototype.allowUserAction = function () {
  classList.add(this.disableWrapper, 'braintree-hidden');
};

MainView.prototype.teardown = function () {
  var error;
  var viewNames = Object.keys(this._views);
  var teardownPromises = viewNames.map(function (view) {
    return this._views[view].teardown().catch(function (err) {
      error = err;
    });
  }.bind(this));

  return Promise.all(teardownPromises).then(function () {
    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  });
};

MainView.prototype.enableEditMode = function () {
  this.setPrimaryView(this.paymentMethodsViews.ID);
  this.paymentMethodsViews.enableEditMode();
  this.hideToggle();

  this.model.setPaymentMethodRequestable({
    isRequestable: false
  });
};

MainView.prototype.disableEditMode = function () {
  var paymentMethod;

  this.hideSheetError();
  this.paymentMethodsViews.disableEditMode();
  this.showToggle();

  paymentMethod = this.primaryView.getPaymentMethod();

  this.model.setPaymentMethodRequestable({
    isRequestable: Boolean(paymentMethod),
    type: paymentMethod && paymentMethod.type,
    selectedPaymentMethod: paymentMethod
  });
};

MainView.prototype.openConfirmPaymentMethodDeletionDialog = function (paymentMethod) {
  this.deleteConfirmationView.applyPaymentMethod(paymentMethod);
  this.setPrimaryView(this.deleteConfirmationView.ID);
};

MainView.prototype.cancelVaultedPaymentMethodDeletion = function () {
  this.setPrimaryView(this.paymentMethodsViews.ID);
};

MainView.prototype.startVaultedPaymentMethodDeletion = function () {
  this.element.className = '';
  this.showLoadingIndicator();
};

MainView.prototype.finishVaultedPaymentMethodDeletion = function (error) {
  var self = this;

  this.paymentMethodsViews.refreshPaymentMethods();

  if (error && this.model.getPaymentMethods().length > 0) {
    this.model.enableEditMode();
    this.showSheetError('vaultManagerPaymentMethodDeletionError');
  } else {
    this._sendToDefaultView();
  }

  return new Promise(function (resolve) {
    wait.delay(500).then(function () {
      // allow all the views to reset before hiding the loading indicator
      self.hideLoadingIndicator();
      resolve();
    });
  });
};

MainView.prototype._sendToDefaultView = function () {
  var paymentMethods = this.model.getPaymentMethods();
  var preselectVaultedPaymentMethod = this.model.merchantConfiguration.preselectVaultedPaymentMethod !== false;

  if (paymentMethods.length > 0) {
    if (preselectVaultedPaymentMethod) {
      analytics.sendEvent(this.client, 'vaulted-card.preselect');

      this.model.changeActivePaymentMethod(paymentMethods[0]);
    } else {
      this.setPrimaryView(this.paymentMethodsViews.ID);
    }
  } else if (this._hasMultiplePaymentOptions) {
    this.setPrimaryView(PaymentOptionsView.ID);
  } else {
    this.setPrimaryView(this.paymentSheetViewIDs[0]);
  }
};
function snakeCaseToCamelCase(s) {
  return s.toLowerCase().replace(/(\_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}

function prefixShowClass(classname) {
  return 'braintree-show-' + classname;
}

module.exports = MainView;

},{"../constants":191,"../lib/add-selection-event-handler":195,"../lib/analytics":196,"../lib/promise":208,"../lib/supports-flexbox":210,"../lib/wait":213,"./base-view":249,"./delete-confirmation-view":250,"./payment-methods-view":253,"./payment-options-view":254,"./payment-sheet-views":259,"@braintree/class-list":39}],252:[function(require,module,exports){
'use strict';

var analytics = require('../lib/analytics');
var BaseView = require('./base-view');
var classList = require('@braintree/class-list');
var constants = require('../constants');

var addSelectionEventHandler = require('../lib/add-selection-event-handler');

var paymentMethodHTML = "<div class=\"braintree-method__icon-container braintree-method__delete-container\">\n  <div class=\"braintree-method__icon braintree-method__delete\">\n    <svg width=\"48\" height=\"29\">\n      <use xlink:href=\"#iconX\"></use>\n    </svg>\n  </div>\n</div>\n\n<div class=\"braintree-method__logo\">\n  <svg width=\"40\" height=\"24\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-method__label\">@TITLE<br><div class=\"braintree-method__label--small\">@SUBTITLE</div></div>\n\n<div class=\"braintree-method__icon-container braintree-method__check-container\">\n  <div class=\"braintree-method__icon braintree-method__check\">\n    <svg height=\"100%\" width=\"100%\">\n      <use xlink:href=\"#iconCheck\"></use>\n    </svg>\n  </div>\n</div>\n";

function PaymentMethodView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentMethodView.prototype = Object.create(BaseView.prototype);
PaymentMethodView.prototype.constructor = PaymentMethodView;

PaymentMethodView.prototype._initialize = function () {
  var endingInText;
  var html = paymentMethodHTML;
  var paymentMethodCardTypes = constants.paymentMethodCardTypes;
  var paymentMethodTypes = constants.paymentMethodTypes;

  this.element = document.createElement('div');
  this.element.className = 'braintree-method';
  this.element.setAttribute('tabindex', '0');
  this.element.setAttribute('role', 'button');

  addSelectionEventHandler(this.element, function () {
    if (this.model.isInEditMode()) {
      this._selectDelete();
    } else {
      this._choosePaymentMethod();
    }
  }.bind(this));

  switch (this.paymentMethod.type) {
    case paymentMethodTypes.applePay:
      html = html.replace(/@ICON/g, 'logoApplePay')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.strings['Apple Pay'])
        .replace(/@SUBTITLE/g, '');
      break;
    case paymentMethodTypes.card:
      endingInText = this.strings.endingIn.replace('{{lastFourCardDigits}}', this.paymentMethod.details.lastFour);
      html = html.replace(/@ICON/g, 'icon-' + paymentMethodCardTypes[this.paymentMethod.details.cardType])
        .replace(/@CLASSNAME/g, ' braintree-icon--bordered')
        .replace(/@TITLE/g, endingInText)
        .replace(/@SUBTITLE/g, this.strings[this.paymentMethod.details.cardType]);
      break;
    case paymentMethodTypes.googlePay:
      html = html.replace(/@ICON/g, 'logoGooglePay')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.strings['Google Pay'])
        .replace(/@SUBTITLE/g, '');
      break;
    case paymentMethodTypes.paypal:
      html = html.replace(/@ICON/g, 'logoPayPal')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.paymentMethod.details.email)
        .replace(/@SUBTITLE/g, this.strings.PayPal);
      break;
    case paymentMethodTypes.venmo:
      html = html.replace(/@ICON/g, 'logoVenmo')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.paymentMethod.details.username)
        .replace(/@SUBTITLE/g, this.strings.Venmo);
      break;
    default:
      break;
  }

  this.element.innerHTML = html;
  this.checkMark = this.element.querySelector('.braintree-method__check-container');
};

PaymentMethodView.prototype.setActive = function (isActive) {
  // setTimeout required to animate addition of new payment methods
  setTimeout(function () {
    classList.toggle(this.element, 'braintree-method--active', isActive);
  }.bind(this), 0);
};

PaymentMethodView.prototype.enableEditMode = function () {
  classList.add(this.checkMark, 'braintree-hidden');
  if (this.paymentMethod.hasSubscription) {
    classList.add(this.element, 'braintree-method--disabled');
  }
};

PaymentMethodView.prototype.disableEditMode = function () {
  classList.remove(this.checkMark, 'braintree-hidden');
  classList.remove(this.element, 'braintree-method--disabled');
};

PaymentMethodView.prototype.teardown = function () {
  if (this.element.parentNode) {
    this.element.parentNode.removeChild(this.element);
  }
};

PaymentMethodView.prototype._choosePaymentMethod = function () {
  if (this.paymentMethod.vaulted) {
    analytics.sendEvent(this.client, 'vaulted-' + constants.analyticsKinds[this.paymentMethod.type] + '.select');
  }

  this.model.changeActivePaymentMethod(this.paymentMethod);
};

PaymentMethodView.prototype._selectDelete = function () {
  this.model.confirmPaymentMethodDeletion(this.paymentMethod);
};

module.exports = PaymentMethodView;

},{"../constants":191,"../lib/add-selection-event-handler":195,"../lib/analytics":196,"./base-view":249,"@braintree/class-list":39}],253:[function(require,module,exports){
'use strict';

var BaseView = require('./base-view');
var PaymentMethodView = require('./payment-method-view');
var DropinError = require('../lib/dropin-error');
var classList = require('@braintree/class-list');
var errors = require('../constants').errors;
var Promise = require('../lib/promise');
var addSelectionEventHandler = require('../lib/add-selection-event-handler');

var PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING = {
  CreditCard: 'Card',
  PayPalAccount: 'PayPal',
  ApplePayCard: 'Apple Pay',
  AndroidPayCard: 'Google Pay',
  VenmoAccount: 'Venmo'
};

function PaymentMethodsView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentMethodsView.prototype = Object.create(BaseView.prototype);
PaymentMethodsView.prototype.constructor = PaymentMethodsView;
PaymentMethodsView.ID = PaymentMethodsView.prototype.ID = 'methods';

PaymentMethodsView.prototype._initialize = function () {
  this.views = [];
  this.container = this.getElementById('methods-container');
  this._headingLabel = this.getElementById('methods-label');
  this._editButton = this.getElementById('methods-edit');

  this.model.on('addPaymentMethod', this._addPaymentMethod.bind(this));
  this.model.on('changeActivePaymentMethod', this._changeActivePaymentMethodView.bind(this));
  this.model.on('refreshPaymentMethods', this.refreshPaymentMethods.bind(this));

  this.refreshPaymentMethods();

  if (this.model.merchantConfiguration.vaultManager) {
    this.model.on('removePaymentMethod', this._removePaymentMethod.bind(this));

    addSelectionEventHandler(this._editButton, function () {
      if (this.model.isInEditMode()) {
        this.model.disableEditMode();
      } else {
        this.model.enableEditMode();
      }
    }.bind(this));

    classList.remove(this._editButton, 'braintree-hidden');
  }
};

PaymentMethodsView.prototype.removeActivePaymentMethod = function () {
  if (!this.activeMethodView) {
    return;
  }
  this.activeMethodView.setActive(false);
  this.activeMethodView = null;
  classList.add(this._headingLabel, 'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype._getPaymentMethodString = function () {
  var stringKey, paymentMethodTypeString;

  if (!this.activeMethodView) {
    return '';
  }

  stringKey = PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING[this.activeMethodView.paymentMethod.type];
  paymentMethodTypeString = this.strings[stringKey];

  return this.strings.payingWith.replace('{{paymentSource}}', paymentMethodTypeString);
};

PaymentMethodsView.prototype.enableEditMode = function () {
  classList.add(this.container, 'braintree-methods--edit');

  this._editButton.innerHTML = this.strings.deleteCancelButton;
  this._headingLabel.innerHTML = this.strings.editPaymentMethods;

  this.views.forEach(function (view) {
    view.enableEditMode();
  });
};

PaymentMethodsView.prototype.disableEditMode = function () {
  classList.remove(this.container, 'braintree-methods--edit');

  this._editButton.innerHTML = this.strings.edit;
  this._headingLabel.innerHTML = this._getPaymentMethodString();

  this.views.forEach(function (view) {
    view.disableEditMode();
  });
};

PaymentMethodsView.prototype._addPaymentMethod = function (paymentMethod) {
  var paymentMethodView = new PaymentMethodView({
    model: this.model,
    paymentMethod: paymentMethod,
    client: this.client,
    strings: this.strings
  });

  if (this.model.isGuestCheckout && this.container.firstChild) {
    this.views[0].teardown();
    this.views.pop();
  }

  if (this.container.firstChild) {
    this.container.insertBefore(paymentMethodView.element, this.container.firstChild);
  } else {
    this.container.appendChild(paymentMethodView.element);
  }

  this.views.push(paymentMethodView);
};

PaymentMethodsView.prototype._removePaymentMethod = function (paymentMethod) {
  var i;

  for (i = 0; i < this.views.length; i++) {
    if (this.views[i].paymentMethod === paymentMethod) {
      this.views[i].teardown();
      this._headingLabel.innerHTML = '&nbsp;';
      this.views.splice(i, 1);
      break;
    }
  }
};

PaymentMethodsView.prototype._changeActivePaymentMethodView = function (paymentMethod) {
  var i;
  var previousActiveMethodView = this.activeMethodView;

  for (i = 0; i < this.views.length; i++) {
    if (this.views[i].paymentMethod === paymentMethod) {
      this.activeMethodView = this.views[i];
      this._headingLabel.innerHTML = this._getPaymentMethodString();
      break;
    }
  }

  if (previousActiveMethodView) {
    previousActiveMethodView.setActive(false);
  }
  this.activeMethodView.setActive(true);
  classList.remove(this._headingLabel, 'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype.requestPaymentMethod = function () {
  if (!this.activeMethodView || this.model.isInEditMode()) {
    return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
  }

  return Promise.resolve(this.activeMethodView.paymentMethod);
};

PaymentMethodsView.prototype.refreshPaymentMethods = function () {
  var i;
  var paymentMethods = this.model.getPaymentMethods();

  this.views.forEach(function (view) {
    view.teardown();
  });

  this.views = [];

  for (i = paymentMethods.length - 1; i >= 0; i--) {
    this._addPaymentMethod(paymentMethods[i]);
  }
};

module.exports = PaymentMethodsView;

},{"../constants":191,"../lib/add-selection-event-handler":195,"../lib/dropin-error":201,"../lib/promise":208,"./base-view":249,"./payment-method-view":252,"@braintree/class-list":39}],254:[function(require,module,exports){
'use strict';

var analytics = require('../lib/analytics');
var addSelectionEventHandler = require('../lib/add-selection-event-handler');
var BaseView = require('./base-view');

var paymentOptionIDs = require('../constants').paymentOptionIDs;

var paymentMethodOptionHTML = "<div class=\"braintree-option__logo\">\n  <svg width=\"48\" height=\"29\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-option__label\" aria-label=\"@OPTION_LABEL\">\n  @OPTION_TITLE\n  <div class=\"braintree-option__disabled-message\"></div>\n</div>\n";

function PaymentOptionsView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentOptionsView.prototype = Object.create(BaseView.prototype);
PaymentOptionsView.prototype.constructor = PaymentOptionsView;
PaymentOptionsView.ID = PaymentOptionsView.prototype.ID = 'options';

PaymentOptionsView.prototype._initialize = function () {
  this.container = this.getElementById('payment-options-container');
  this.elements = {};

  this.model.supportedPaymentOptions.forEach(function (paymentOptionID) {
    this._addPaymentOption(paymentOptionID);
  }.bind(this));
};

PaymentOptionsView.prototype._addPaymentOption = function (paymentOptionID) {
  var paymentSource;
  var div = document.createElement('div');
  var html = paymentMethodOptionHTML;
  var clickHandler = function clickHandler() {
    this.mainView.setPrimaryView(paymentOptionID);
    this.model.selectPaymentOption(paymentOptionID);
    analytics.sendEvent(this.client, 'selected.' + paymentOptionIDs[paymentOptionID]);
  }.bind(this);

  div.className = 'braintree-option braintree-option__' + paymentOptionID;
  div.setAttribute('tabindex', '0');

  switch (paymentOptionID) {
    case paymentOptionIDs.applePay:
      paymentSource = this.strings['Apple Pay'];
      html = html.replace(/@ICON/g, 'logoApplePay');
      break;
    case paymentOptionIDs.card:
      paymentSource = this.strings.Card;
      html = html.replace(/@ICON/g, 'iconCardFront');
      html = html.replace(/@CLASSNAME/g, 'braintree-icon--bordered');
      break;
    case paymentOptionIDs.googlePay:
      paymentSource = this.strings['Google Pay'];
      html = html.replace(/@ICON/g, 'logoGooglePay');
      break;
    case paymentOptionIDs.paypal:
      paymentSource = this.strings.PayPal;
      html = html.replace(/@ICON/g, 'logoPayPal');
      break;
    case paymentOptionIDs.paypalCredit:
      paymentSource = this.strings['PayPal Credit'];
      html = html.replace(/@ICON/g, 'logoPayPalCredit');
      break;
    case paymentOptionIDs.venmo:
      paymentSource = this.strings.Venmo;
      html = html.replace(/@ICON/g, 'logoVenmo');
      break;
    default:
      break;
  }

  html = html.replace(/@OPTION_LABEL/g, this._generateOptionLabel(paymentSource));
  html = html.replace(/@OPTION_TITLE/g, paymentSource);
  html = html.replace(/@CLASSNAME/g, '');

  div.innerHTML = html;

  addSelectionEventHandler(div, clickHandler);

  this.container.appendChild(div);
  this.elements[paymentOptionID] = {
    div: div,
    clickHandler: clickHandler
  };
};

PaymentOptionsView.prototype._generateOptionLabel = function (paymentSourceString) {
  return this.strings.payingWith.replace('{{paymentSource}}', paymentSourceString);
};

module.exports = PaymentOptionsView;

},{"../constants":191,"../lib/add-selection-event-handler":195,"../lib/analytics":196,"./base-view":249}],255:[function(require,module,exports){
(function (global){(function (){
'use strict';

var assign = require('../../lib/assign').assign;
var BaseView = require('../base-view');
var btApplePay = require('braintree-web/apple-pay');
var DropinError = require('../../lib/dropin-error');
var isHTTPS = require('../../lib/is-https');
var Promise = require('../../lib/promise');
var paymentOptionIDs = require('../../constants').paymentOptionIDs;

var DEFAULT_APPLE_PAY_SESSION_VERSION = 2;

function ApplePayView() {
  BaseView.apply(this, arguments);
}

ApplePayView.prototype = Object.create(BaseView.prototype);
ApplePayView.prototype.constructor = ApplePayView;
ApplePayView.ID = ApplePayView.prototype.ID = paymentOptionIDs.applePay;

ApplePayView.prototype.initialize = function () {
  var self = this;

  self.applePayConfiguration = assign({}, self.model.merchantConfiguration.applePay);
  self.applePaySessionVersion = self.applePayConfiguration.applePaySessionVersion || DEFAULT_APPLE_PAY_SESSION_VERSION;

  delete self.applePayConfiguration.applePaySessionVersion;

  return btApplePay.create({client: this.client}).then(function (applePayInstance) {
    self.buttonDiv = self.getElementById('apple-pay-button');

    self.applePayInstance = applePayInstance;

    self.buttonDiv.onclick = self._showPaymentSheet.bind(self);
    self.buttonDiv.style['-apple-pay-button-style'] = self.model.merchantConfiguration.applePay.buttonStyle || 'black';

    self.model.asyncDependencyReady(ApplePayView.ID);
  }).catch(function (err) {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError(err)
    });
  });
};

ApplePayView.prototype._showPaymentSheet = function () {
  var self = this;
  var request, session;

  if (this._sessionInProgress) {
    return false;
  }

  this._sessionInProgress = true;

  request = this.applePayInstance.createPaymentRequest(this.applePayConfiguration.paymentRequest);
  session = new global.ApplePaySession(self.applePaySessionVersion, request);

  session.onvalidatemerchant = function (event) {
    self.applePayInstance.performValidation({
      validationURL: event.validationURL,
      displayName: self.applePayConfiguration.displayName
    }).then(function (validationData) {
      session.completeMerchantValidation(validationData);
    }).catch(function (validationErr) {
      self.model.reportError(validationErr);
      self._sessionInProgress = false;
      session.abort();
    });
  };

  session.onpaymentauthorized = function (event) {
    self.applePayInstance.tokenize({
      token: event.payment.token
    }).then(function (payload) {
      self._sessionInProgress = false;
      session.completePayment(global.ApplePaySession.STATUS_SUCCESS);
      payload.rawPaymentData = event.payment;
      self.model.addPaymentMethod(payload);
    }).catch(function (tokenizeErr) {
      self.model.reportError(tokenizeErr);
      self._sessionInProgress = false;
      session.completePayment(global.ApplePaySession.STATUS_FAILURE);
    });
  };

  session.begin();

  return false;
};

ApplePayView.prototype.updateConfiguration = function (key, value) {
  this.applePayConfiguration[key] = value;
};

ApplePayView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;
  var applePayEnabled = gatewayConfiguration.applePayWeb && Boolean(options.merchantConfiguration.applePay);
  var applePaySessionVersion = options.merchantConfiguration.applePay && options.merchantConfiguration.applePay.applePaySessionVersion;
  var applePayBrowserSupported;

  applePaySessionVersion = applePaySessionVersion || DEFAULT_APPLE_PAY_SESSION_VERSION;

  if (!applePayEnabled) {
    return Promise.resolve(false);
  }

  applePayBrowserSupported = global.ApplePaySession && isHTTPS.isHTTPS();

  if (!applePayBrowserSupported) {
    return Promise.resolve(false);
  }

  if (!global.ApplePaySession.supportsVersion(applePaySessionVersion)) {
    return Promise.resolve(false);
  }

  return Promise.resolve(Boolean(global.ApplePaySession.canMakePayments()));
};

module.exports = ApplePayView;

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants":191,"../../lib/assign":197,"../../lib/dropin-error":201,"../../lib/is-https":204,"../../lib/promise":208,"../base-view":249,"braintree-web/apple-pay":53}],256:[function(require,module,exports){
(function (global){(function (){
'use strict';

var analytics = require('../../lib/analytics');
var assign = require('../../lib/assign').assign;
var browserDetection = require('../../lib/browser-detection');
var BaseView = require('../base-view');
var btPaypal = require('braintree-web/paypal-checkout');
var DropinError = require('../../lib/dropin-error');
var constants = require('../../constants');
var assets = require('@braintree/asset-loader');
var translations = require('../../translations').fiveCharacterLocales;
var Promise = require('../../lib/promise');

var ASYNC_DEPENDENCY_TIMEOUT = 30000;
var READ_ONLY_CONFIGURATION_OPTIONS = ['offerCredit', 'locale'];
var DEFAULT_CHECKOUTJS_LOG_LEVEL = 'warn';

var paypalScriptLoadInProgressPromise;

function BasePayPalView() {
  BaseView.apply(this, arguments);
}

BasePayPalView.prototype = Object.create(BaseView.prototype);

BasePayPalView.prototype.initialize = function () {
  var asyncDependencyTimeoutHandler;
  var isCredit = Boolean(this._isPayPalCredit);
  var setupComplete = false;
  var self = this;
  var paypalType = isCredit ? 'paypalCredit' : 'paypal';
  var paypalConfiguration = this.model.merchantConfiguration[paypalType];
  var dropinWrapperId = '#braintree--dropin__' + this.model.componentID;

  this.paypalConfiguration = assign({}, paypalConfiguration);

  asyncDependencyTimeoutHandler = setTimeout(function () {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError('There was an error connecting to PayPal.')
    });
  }, ASYNC_DEPENDENCY_TIMEOUT);

  return btPaypal.create({client: this.client}).then(function (paypalInstance) {
    var checkoutJSConfiguration;
    var buttonSelector = '[data-braintree-id="paypal-button"]';
    var environment = self.client.getConfiguration().gatewayConfiguration.environment === 'production' ? 'production' : 'sandbox';
    var locale = self.model.merchantConfiguration.locale;

    self.paypalInstance = paypalInstance;

    self.paypalConfiguration.offerCredit = Boolean(isCredit);
    checkoutJSConfiguration = {
      env: environment,
      style: self.paypalConfiguration.buttonStyle || {},
      commit: self.paypalConfiguration.commit,
      payment: function () {
        return paypalInstance.createPayment(self.paypalConfiguration).catch(reportError);
      },
      onAuthorize: function (data) {
        // NEXT_MAJOR_VERSION change out this vaultPayPal property
        // to something more generic, such as vaultOnTokenization so
        // all the vault objects can have the same shape (instead
        // of being specific to PayPal accounts here)
        var shouldNotVault = self.paypalConfiguration.vault && self.paypalConfiguration.vault.vaultPayPal === false;

        if (shouldNotVault) {
          data.vault = false;
        }

        return paypalInstance.tokenizePayment(data).then(function (tokenizePayload) {
          if (!shouldNotVault && self.paypalConfiguration.flow === 'vault' && !self.model.isGuestCheckout) {
            tokenizePayload.vaulted = true;
          }
          self.model.addPaymentMethod(tokenizePayload);
        }).catch(reportError);
      },
      onError: reportError
    };

    if (locale && locale in translations) {
      self.paypalConfiguration.locale = locale;
      checkoutJSConfiguration.locale = locale;
    }
    checkoutJSConfiguration.funding = {
      disallowed: []
    };

    Object.keys(global.paypal.FUNDING).forEach(function (key) {
      if (key === 'PAYPAL' || key === 'CREDIT') {
        return;
      }
      checkoutJSConfiguration.funding.disallowed.push(global.paypal.FUNDING[key]);
    });

    if (isCredit) {
      buttonSelector = '[data-braintree-id="paypal-credit-button"]';
      checkoutJSConfiguration.style.label = 'credit';
    } else {
      checkoutJSConfiguration.funding.disallowed.push(global.paypal.FUNDING.CREDIT);
    }

    buttonSelector = dropinWrapperId + ' ' + buttonSelector;

    return global.paypal.Button.render(checkoutJSConfiguration, buttonSelector).then(function () {
      self.model.asyncDependencyReady(paypalType);
      setupComplete = true;
      clearTimeout(asyncDependencyTimeoutHandler);
    });
  }).catch(reportError);

  function reportError(err) {
    if (setupComplete) {
      self.model.reportError(err);
    } else {
      self.model.asyncDependencyFailed({
        view: self.ID,
        error: err
      });
      clearTimeout(asyncDependencyTimeoutHandler);
    }
  }
};

BasePayPalView.prototype.requestPaymentMethod = function () {
  this.model.reportError('paypalButtonMustBeUsed');

  return BaseView.prototype.requestPaymentMethod.call(this);
};

BasePayPalView.prototype.updateConfiguration = function (key, value) {
  if (READ_ONLY_CONFIGURATION_OPTIONS.indexOf(key) === -1) {
    this.paypalConfiguration[key] = value;
  }
};

BasePayPalView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;
  var merchantPayPalConfig = options.merchantConfiguration.paypal || options.merchantConfiguration.paypalCredit;

  if (!gatewayConfiguration.paypalEnabled) {
    return Promise.resolve(false);
  }

  if (browserDetection.isIe9() || browserDetection.isIe10()) {
    analytics.sendEvent(options.client, options.viewID + '.checkout.js-browser-not-supported');

    return Promise.resolve(false);
  }

  if (global.paypal && global.paypal.Button) {
    return Promise.resolve(true);
  }

  if (paypalScriptLoadInProgressPromise) {
    return paypalScriptLoadInProgressPromise;
  }

  paypalScriptLoadInProgressPromise = assets.loadScript({
    src: constants.CHECKOUT_JS_SOURCE,
    id: constants.PAYPAL_CHECKOUT_SCRIPT_ID,
    dataAttributes: {
      'log-level': merchantPayPalConfig.logLevel || DEFAULT_CHECKOUTJS_LOG_LEVEL
    }
  }).then(function () {
    return Promise.resolve(true);
  }).catch(function () {
    return Promise.resolve(false);
  }).then(function (result) {
    paypalScriptLoadInProgressPromise = null;

    return Promise.resolve(result);
  });

  return paypalScriptLoadInProgressPromise;
};

module.exports = BasePayPalView;

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants":191,"../../lib/analytics":196,"../../lib/assign":197,"../../lib/browser-detection":198,"../../lib/dropin-error":201,"../../lib/promise":208,"../../translations":232,"../base-view":249,"@braintree/asset-loader":1,"braintree-web/paypal-checkout":136}],257:[function(require,module,exports){
'use strict';

var assign = require('../../lib/assign').assign;

var BaseView = require('../base-view');
var classList = require('@braintree/class-list');
var constants = require('../../constants');
var DropinError = require('../../lib/dropin-error');
var hostedFields = require('braintree-web/hosted-fields');
var isUtf8 = require('../../lib/is-utf-8');
var transitionHelper = require('../../lib/transition-helper');
var Promise = require('../../lib/promise');

var cardIconHTML = "<div data-braintree-id=\"visa-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-visa\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"master-card-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-master-card\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"unionpay-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-unionpay\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"american-express-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-american-express\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"jcb-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-jcb\"></use>\n    </svg>\n</div>\n<!-- Remove braintree-hidden class when supportedCardType accurately indicates Diners Club support -->\n<div data-braintree-id=\"diners-club-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-diners-club\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"discover-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-discover\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"maestro-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-maestro\"></use>\n    </svg>\n</div>\n";

var PASSTHROUGH_EVENTS = [
  'empty',
  // TODO should intercept this event and call tokenize
  'inputSubmitRequest',
  'binAvailable'
];

function CardView() {
  BaseView.apply(this, arguments);
}

CardView.prototype = Object.create(BaseView.prototype);
CardView.prototype.constructor = CardView;
CardView.ID = CardView.prototype.ID = constants.paymentOptionIDs.card;

CardView.prototype.initialize = function () {
  var cvvFieldGroup, postalCodeFieldGroup, hfOptions;
  var cardholderNameGroup = this.getElementById('cardholder-name-field-group');
  var cardIcons = this.getElementById('card-view-icons');

  this.merchantConfiguration = this.model.merchantConfiguration.card || {};
  this.merchantConfiguration.vault = this.merchantConfiguration.vault || {};
  this.hasCardholderName = Boolean(this.merchantConfiguration.cardholderName);
  this.cardholderNameRequired = this.hasCardholderName && this.merchantConfiguration.cardholderName.required === true;
  hfOptions = this._generateHostedFieldsOptions();

  cardIcons.innerHTML = cardIconHTML;
  this._hideUnsupportedCardIcons();

  this.hasCVV = hfOptions.fields.cvv;
  this.saveCardInput = this.getElementById('save-card-input');
  this.cardNumberIcon = this.getElementById('card-number-icon');
  this.cardNumberIconSvg = this.getElementById('card-number-icon-svg');
  this.cvvIcon = this.getElementById('cvv-icon');
  this.cvvIconSvg = this.getElementById('cvv-icon-svg');
  this.cvvLabelDescriptor = this.getElementById('cvv-label-descriptor');
  this.fieldErrors = {};

  if (!this.hasCardholderName) {
    cardholderNameGroup.parentNode.removeChild(cardholderNameGroup);
  }

  if (!this.hasCVV) {
    cvvFieldGroup = this.getElementById('cvv-field-group');
    cvvFieldGroup.parentNode.removeChild(cvvFieldGroup);
  }

  if (!hfOptions.fields.postalCode) {
    postalCodeFieldGroup = this.getElementById('postal-code-field-group');
    postalCodeFieldGroup.parentNode.removeChild(postalCodeFieldGroup);
  }

  if (!this.model.isGuestCheckout && this.merchantConfiguration.vault.allowVaultCardOverride === true) {
    classList.remove(this.getElementById('save-card-field-group'), 'braintree-hidden');
  }

  // NEXT_MAJOR_VERSION change out this vaultCard property
  // to something more generic, such as vaultOnTokenization so
  // all the vault objects can have the same shape (instead
  // of being specific to cards here)
  if (this.merchantConfiguration.vault.vaultCard === false) {
    this.saveCardInput.checked = false;
  }

  return hostedFields.create(hfOptions).then(function (hostedFieldsInstance) {
    this.hostedFieldsInstance = hostedFieldsInstance;
    this.hostedFieldsInstance.on('blur', this._onBlurEvent.bind(this));
    this.hostedFieldsInstance.on('cardTypeChange', this._onCardTypeChangeEvent.bind(this));
    this.hostedFieldsInstance.on('focus', this._onFocusEvent.bind(this));
    this.hostedFieldsInstance.on('notEmpty', this._onNotEmptyEvent.bind(this));
    this.hostedFieldsInstance.on('validityChange', this._onValidityChangeEvent.bind(this));

    PASSTHROUGH_EVENTS.forEach(function (eventName) {
      this.hostedFieldsInstance.on(eventName, function (event) {
        this.model._emit('card:' + eventName, event);
      }.bind(this));
    }.bind(this));

    this.model.asyncDependencyReady(CardView.ID);
  }.bind(this)).catch(function (err) {
    this.model.asyncDependencyFailed({
      view: this.ID,
      error: err
    });
  }.bind(this));
};

CardView.prototype._sendRequestableEvent = function () {
  if (!this._isTokenizing) {
    this.model.setPaymentMethodRequestable({
      isRequestable: this._validateForm(),
      type: constants.paymentMethodTypes.card
    });
  }
};

CardView.prototype._generateHostedFieldsOptions = function () {
  var challenges = this.client.getConfiguration().gatewayConfiguration.challenges;
  var hasCVVChallenge = challenges.indexOf('cvv') !== -1;
  var hasPostalCodeChallenge = challenges.indexOf('postal_code') !== -1;
  var overrides = this.merchantConfiguration.overrides;
  var options = {
    client: this.client,
    fields: {
      cardholderName: {
        container: this._getFieldContainer('cardholder-name'),
        placeholder: this.strings.cardholderNamePlaceholder
      },
      number: {
        container: this._getFieldContainer('number'),
        placeholder: generateCardNumberPlaceholder()
      },
      expirationDate: {
        container: this._getFieldContainer('expiration'),
        placeholder: this.strings.expirationDatePlaceholder
      },
      cvv: {
        container: this._getFieldContainer('cvv'),
        placeholder: addBullets(3)
      },
      postalCode: {
        container: this._getFieldContainer('postal-code')
      }
    },
    styles: {
      input: {
        'font-size': '16px',
        'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        color: '#000'
      },
      ':focus': {
        color: 'black'
      },
      '::-webkit-input-placeholder': {
        color: '#6a6a6a'
      },
      ':-moz-placeholder': {
        color: '#6a6a6a'
      },
      '::-moz-placeholder': {
        color: '#6a6a6a'
      },
      ':-ms-input-placeholder ': {
        color: '#6a6a6a'
      },
      'input::-ms-clear': {
        color: 'transparent'
      }
    }
  };

  if (!this.hasCardholderName) {
    delete options.fields.cardholderName;
  }

  if (!hasCVVChallenge) {
    delete options.fields.cvv;
  }

  if (!hasPostalCodeChallenge) {
    delete options.fields.postalCode;
  }

  if (!overrides) { return options; }

  if (overrides.fields) {
    if (overrides.fields.cvv && typeof overrides.fields.cvv.placeholder !== 'undefined') {
      this._hasCustomCVVPlaceholder = true;
    }

    Object.keys(overrides.fields).forEach(function (field) {
      if ((field === 'cvv' || field === 'postalCode') && overrides.fields[field] === null) {
        delete options.fields[field];

        return;
      }

      if (!options.fields[field]) {
        return;
      }

      assign(options.fields[field], overrides.fields[field], {
        selector: options.fields[field].selector
      });
    });
  }

  if (overrides.styles) {
    Object.keys(overrides.styles).forEach(function (style) {
      if (overrides.styles[style] === null) {
        delete options.styles[style];

        return;
      } else if (typeof overrides.styles[style] === 'string') {
        // it's a class name, and should override the configured styles entirely
        options.styles[style] = overrides.styles[style];

        return;
      }

      normalizeStyles(overrides.styles[style]);
      options.styles[style] = options.styles[style] || {};

      assign(options.styles[style], overrides.styles[style]);
    });
  }

  return options;
};

CardView.prototype._validateForm = function (showFieldErrors) {
  var card, cardType, cardTypeSupported, state;
  var isValid = true;
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  if (!this.hostedFieldsInstance) {
    return false;
  }

  state = this.hostedFieldsInstance.getState();

  Object.keys(state.fields).forEach(function (key) {
    var field = state.fields[key];

    if (!showFieldErrors && !isValid) {
      // return early if form is already invalid
      // and we don't need to display all field errors
      return;
    }

    if (field.isEmpty) {
      if (!this.cardholderNameRequired && key === 'cardholderName') {
        isValid = true;
      } else {
        isValid = false;

        if (showFieldErrors) {
          this.showFieldError(key, this.strings['fieldEmptyFor' + capitalize(key)]);
        }
      }
    } else if (!field.isValid) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError(key, this.strings['fieldInvalidFor' + capitalize(key)]);
      }
    }
  }.bind(this));

  if (state.fields.number.isValid) {
    card = state.cards[0];
    cardType = card && constants.configurationCardTypes[card.type];
    cardTypeSupported = cardType && supportedCardTypes.indexOf(cardType) !== -1;

    if (!cardTypeSupported) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError('number', this.strings.unsupportedCardTypeError);
      }
    }
  }

  return isValid;
};

CardView.prototype.getPaymentMethod = function () { // eslint-disable-line consistent-return
  var formIsValid = this._validateForm();

  if (formIsValid) {
    return {
      type: constants.paymentMethodTypes.card
    };
  }
};

CardView.prototype.tokenize = function () {
  var transitionCallback;
  var self = this;
  var state = self.hostedFieldsInstance.getState();
  var tokenizeOptions = {
    vault: this._shouldVault()
  };

  this.model.clearError();

  if (!this._validateForm(true)) {
    self.model.reportError('hostedFieldsFieldsInvalidError');
    self.allowUserAction();

    return Promise.reject(new DropinError(constants.errors.NO_PAYMENT_METHOD_ERROR));
  }

  if (!this.cardholderNameRequired && state.fields.cardholderName && state.fields.cardholderName.isEmpty) {
    tokenizeOptions.fieldsToTokenize = Object.keys(state.fields).filter(function (field) {
      return field !== 'cardholderName';
    });
  }

  self._isTokenizing = true;

  return self.hostedFieldsInstance.tokenize(tokenizeOptions).then(function (payload) {
    var retainCardFields = self.merchantConfiguration.clearFieldsAfterTokenization === false;

    if (!retainCardFields) {
      Object.keys(state.fields).forEach(function (field) {
        self.hostedFieldsInstance.clear(field);
      });
    }

    if (self._shouldVault()) {
      payload.vaulted = true;
    }

    return new Promise(function (resolve) {
      transitionCallback = function () {
        // Wait for braintree-sheet--tokenized class to be added in IE 9
        // before attempting to remove it
        setTimeout(function () {
          self.model.addPaymentMethod(payload);
          resolve(payload);
          classList.remove(self.element, 'braintree-sheet--tokenized');
        }, 0);
      };

      transitionHelper.onTransitionEnd(self.element, 'max-height', transitionCallback);

      setTimeout(function () {
        self.allowUserAction();
        self._isTokenizing = false;
      }, constants.CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT);

      classList.add(self.element, 'braintree-sheet--tokenized');
    });
  }).catch(function (err) {
    self._isTokenizing = false;
    // this is a little magical, but if the code property exists
    // in the translations with the word Error appended to the end,
    // then reportError will automatically print that translation.
    // See https://github.com/braintree/braintree-web-drop-in/blob/6ecba73f2f16e8b7ae2119702ac162a1a985908e/src/views/main-view.js#L255-L256
    self.model.reportError(err);
    self.allowUserAction();

    return Promise.reject(new DropinError({
      message: constants.errors.NO_PAYMENT_METHOD_ERROR,
      braintreeWebError: err
    }));
  });
};

CardView.prototype.showFieldError = function (field, errorMessage) {
  var fieldError;
  var fieldGroup = this.getElementById(camelCaseToKebabCase(field) + '-field-group');
  var input = fieldGroup.querySelector('input');

  if (!this.fieldErrors.hasOwnProperty(field)) {
    this.fieldErrors[field] = this.getElementById(camelCaseToKebabCase(field) + '-field-error');
  }

  classList.add(fieldGroup, 'braintree-form__field-group--has-error');

  fieldError = this.fieldErrors[field];
  fieldError.innerHTML = errorMessage;

  if (input) {
    input.setAttribute('aria-invalid', true);
  } else {
    this.hostedFieldsInstance.setAttribute({
      field: field,
      attribute: 'aria-invalid',
      value: true
    });
    this.hostedFieldsInstance.setMessage({
      field: field,
      message: errorMessage
    });
  }
};

CardView.prototype.hideFieldError = function (field) {
  var fieldGroup = this.getElementById(camelCaseToKebabCase(field) + '-field-group');
  var input = fieldGroup.querySelector('input');

  if (!this.fieldErrors.hasOwnProperty(field)) {
    this.fieldErrors[field] = this.getElementById(camelCaseToKebabCase(field) + '-field-error');
  }

  classList.remove(fieldGroup, 'braintree-form__field-group--has-error');

  if (input) {
    input.removeAttribute('aria-invalid');
  } else {
    this.hostedFieldsInstance.removeAttribute({
      field: field,
      attribute: 'aria-invalid'
    });
    this.hostedFieldsInstance.setMessage({
      field: field,
      message: ''
    });
  }
};

CardView.prototype.teardown = function () {
  return this.hostedFieldsInstance.teardown();
};

CardView.prototype._shouldVault = function () {
  return !this.model.isGuestCheckout && this.saveCardInput.checked;
};

CardView.prototype._getFieldContainer = function (field) {
  // we committed to not changing the data-braintree-id fields
  // so we need to convert this field to the id used in the HTML
  if (field === 'expiration') {
    field = 'expiration-date';
  }

  return this.getElementById(field + '-field-group').querySelector('.braintree-form__hosted-field');
};

CardView.prototype._onBlurEvent = function (event) {
  var field = event.fields[event.emittedBy];
  var fieldGroup = this.getElementById(camelCaseToKebabCase(event.emittedBy) + '-field-group');

  classList.remove(fieldGroup, 'braintree-form__field-group--is-focused');

  if (this._shouldApplyFieldEmptyError(event.emittedBy, field)) {
    this.showFieldError(event.emittedBy, this.strings['fieldEmptyFor' + capitalize(event.emittedBy)]);
  } else if (!field.isEmpty && !field.isValid) {
    this.showFieldError(event.emittedBy, this.strings['fieldInvalidFor' + capitalize(event.emittedBy)]);
  } else if (event.emittedBy === 'number' && !this._isCardTypeSupported(event.cards[0].type)) {
    this.showFieldError('number', this.strings.unsupportedCardTypeError);
  }

  this.model._emit('card:blur', event);

  setTimeout(function () {
    // when focusing on a field by clicking the label,
    // we need to wait a bit for the iframe to be
    // focused properly before applying validations
    if (this._shouldApplyFieldEmptyError(event.emittedBy, field)) {
      this.showFieldError(event.emittedBy, this.strings['fieldEmptyFor' + capitalize(event.emittedBy)]);
    }
  }.bind(this), 150);
};

CardView.prototype._onCardTypeChangeEvent = function (event) {
  var cardType;
  var cardNumberHrefLink = '#iconCardFront';
  var cvvHrefLink = '#iconCVVBack';
  var cvvDescriptor = this.strings.cvvThreeDigitLabelSubheading;
  var cvvPlaceholder = addBullets(3);
  var numberFieldGroup = this.getElementById('number-field-group');

  if (event.cards.length === 1) {
    cardType = event.cards[0].type;
    cardNumberHrefLink = '#icon-' + cardType;
    if (cardType === 'american-express') {
      cvvHrefLink = '#iconCVVFront';
      cvvDescriptor = this.strings.cvvFourDigitLabelSubheading;
      cvvPlaceholder = addBullets(4);
    }
    // Keep icon visible when field is not focused
    classList.add(numberFieldGroup, 'braintree-form__field-group--card-type-known');
  } else {
    classList.remove(numberFieldGroup, 'braintree-form__field-group--card-type-known');
  }

  this.cardNumberIconSvg.setAttribute('xlink:href', cardNumberHrefLink);

  if (this.hasCVV) {
    this.cvvIconSvg.setAttribute('xlink:href', cvvHrefLink);
    this.cvvLabelDescriptor.innerHTML = cvvDescriptor;

    if (!this._hasCustomCVVPlaceholder) {
      this.hostedFieldsInstance.setAttribute({
        field: 'cvv',
        attribute: 'placeholder',
        value: cvvPlaceholder
      });
    }
  }

  this.model._emit('card:cardTypeChange', event);
};

CardView.prototype._onFocusEvent = function (event) {
  var fieldGroup = this.getElementById(camelCaseToKebabCase(event.emittedBy) + '-field-group');

  classList.add(fieldGroup, 'braintree-form__field-group--is-focused');

  this.model._emit('card:focus', event);
};

CardView.prototype._onNotEmptyEvent = function (event) {
  this.hideFieldError(event.emittedBy);

  this.model._emit('card:notEmpty', event);
};

CardView.prototype._onValidityChangeEvent = function (event) {
  var isValid;
  var field = event.fields[event.emittedBy];

  if (event.emittedBy === 'number' && event.cards[0]) {
    isValid = field.isValid && this._isCardTypeSupported(event.cards[0].type);
  } else {
    isValid = field.isValid;
  }

  classList.toggle(field.container, 'braintree-form__field--valid', isValid);

  if (field.isPotentiallyValid) {
    this.hideFieldError(event.emittedBy);
  }

  this._sendRequestableEvent();

  this.model._emit('card:validityChange', event);
};

CardView.prototype.requestPaymentMethod = function () {
  this.preventUserAction();

  return this.tokenize();
};

CardView.prototype.onSelection = function () {
  if (!this.hostedFieldsInstance) {
    return;
  }

  setTimeout(function () {
    if (this.hasCardholderName) {
      this.hostedFieldsInstance.focus('cardholderName');
    } else {
      this.hostedFieldsInstance.focus('number');
    }
  }.bind(this), 50);
};

CardView.prototype._hideUnsupportedCardIcons = function () {
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  Object.keys(constants.configurationCardTypes).forEach(function (paymentMethodCardType) {
    var cardIcon;
    var configurationCardType = constants.configurationCardTypes[paymentMethodCardType];

    if (supportedCardTypes.indexOf(configurationCardType) === -1) {
      cardIcon = this.getElementById(paymentMethodCardType + '-card-icon');
      classList.add(cardIcon, 'braintree-hidden');
    }
  }.bind(this));
};

CardView.prototype._isCardTypeSupported = function (cardType) {
  var configurationCardType = constants.configurationCardTypes[cardType];
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  return supportedCardTypes.indexOf(configurationCardType) !== -1;
};

CardView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;
  var disabledByMerchant = options.merchantConfiguration.card === false;

  return Promise.resolve(!disabledByMerchant && gatewayConfiguration.creditCards.supportedCardTypes.length > 0);
};

CardView.prototype._shouldApplyFieldEmptyError = function (fieldId, field) {
  if (!field.isEmpty) {
    return false;
  }

  if (fieldId === 'cardholderName' && !this.cardholderNameRequired) {
    return false;
  }

  return isCardViewElement();
};

function isCardViewElement() {
  var activeId = document.activeElement && document.activeElement.id;
  var isHostedFieldsElement = document.activeElement instanceof HTMLIFrameElement && activeId.indexOf('braintree-hosted-field') !== -1;

  return isHostedFieldsElement;
}

function camelCaseToKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substr(1);
}

function normalizeStyles(styles) {
  Object.keys(styles).forEach(function (style) {
    var transformedKeyName = camelCaseToKebabCase(style);

    styles[transformedKeyName] = styles[style];
  });
}

function addBullets(number) {
  var bulletCharacter = isUtf8() ? '•' : '*';

  return Array(number + 1).join(bulletCharacter);
}

function generateCardNumberPlaceholder() {
  var four = addBullets(4);

  return [four, four, four, four].join(' ');
}

module.exports = CardView;

},{"../../constants":191,"../../lib/assign":197,"../../lib/dropin-error":201,"../../lib/is-utf-8":205,"../../lib/promise":208,"../../lib/transition-helper":212,"../base-view":249,"@braintree/class-list":39,"braintree-web/hosted-fields":85}],258:[function(require,module,exports){
(function (global){(function (){
'use strict';

var assign = require('../../lib/assign').assign;
var BaseView = require('../base-view');
var btGooglePay = require('braintree-web/google-payment');
var DropinError = require('../../lib/dropin-error');
var constants = require('../../constants');
var assets = require('@braintree/asset-loader');
var Promise = require('../../lib/promise');
var analytics = require('../../lib/analytics');

function GooglePayView() {
  BaseView.apply(this, arguments);
}

GooglePayView.prototype = Object.create(BaseView.prototype);
GooglePayView.prototype.constructor = GooglePayView;
GooglePayView.ID = GooglePayView.prototype.ID = constants.paymentOptionIDs.googlePay;

GooglePayView.prototype.initialize = function () {
  var self = this;
  var buttonOptions, googlePayVersion, merchantId;

  self.googlePayConfiguration = assign({}, self.model.merchantConfiguration.googlePay);
  googlePayVersion = self.googlePayConfiguration.googlePayVersion;
  merchantId = self.googlePayConfiguration.merchantId;

  buttonOptions = assign({
    buttonType: 'short'
  }, self.googlePayConfiguration.button, {
    onClick: function (event) {
      event.preventDefault();

      self.preventUserAction();

      self.tokenize().then(function () {
        self.allowUserAction();
      });
    }
  });

  delete self.googlePayConfiguration.googlePayVersion;
  delete self.googlePayConfiguration.merchantId;
  delete self.googlePayConfiguration.button;

  return btGooglePay.create({
    client: self.client,
    googlePayVersion: googlePayVersion,
    googleMerchantId: merchantId
  }).then(function (googlePayInstance) {
    self.googlePayInstance = googlePayInstance;
    self.paymentsClient = createPaymentsClient(self.client);
  }).then(function () {
    var buttonContainer = self.getElementById('google-pay-button');

    buttonContainer.appendChild(self.paymentsClient.createButton(buttonOptions));

    self.model.asyncDependencyReady(GooglePayView.ID);
  }).catch(function (err) {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError(err)
    });
  });
};

GooglePayView.prototype.tokenize = function () {
  var self = this;
  var paymentDataRequest = self.googlePayInstance.createPaymentDataRequest(self.googlePayConfiguration);
  var rawPaymentData;

  return self.paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
    rawPaymentData = paymentData;

    return self.googlePayInstance.parseResponse(paymentData);
  }).then(function (tokenizePayload) {
    tokenizePayload.rawPaymentData = rawPaymentData;
    self.model.addPaymentMethod(tokenizePayload);
  }).catch(function (err) {
    var reportedError = err;

    if (err.statusCode === 'DEVELOPER_ERROR') {
      console.error(err); // eslint-disable-line no-console
      reportedError = 'developerError';
    } else if (err.statusCode === 'CANCELED') {
      analytics.sendEvent(self.client, 'googlepay.loadPaymentData.canceled');

      return;
    } else if (err.statusCode) {
      analytics.sendEvent(self.client, 'googlepay.loadPaymentData.failed');
    }

    self.model.reportError(reportedError);
  });
};

GooglePayView.prototype.updateConfiguration = function (key, value) {
  this.googlePayConfiguration[key] = value;
};

GooglePayView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;

  if (!(gatewayConfiguration.androidPay && Boolean(options.merchantConfiguration.googlePay))) {
    return Promise.resolve(false);
  }

  return Promise.resolve().then(function () {
    if (!(global.google && global.google.payments && global.google.payments.api && global.google.payments.api.PaymentsClient)) {
      return assets.loadScript({
        id: constants.GOOGLE_PAYMENT_SCRIPT_ID,
        src: constants.GOOGLE_PAYMENT_SOURCE
      });
    }

    return Promise.resolve();
  }).then(function () {
    var paymentsClient = createPaymentsClient(options.client);

    return paymentsClient.isReadyToPay({
      allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD']
    });
  }).then(function (response) {
    return Boolean(response.result);
  });
};

function createPaymentsClient(client) {
  return new global.google.payments.api.PaymentsClient({
    environment: client.getConfiguration().gatewayConfiguration.environment === 'production' ? 'PRODUCTION' : 'TEST'
  });
}

module.exports = GooglePayView;

}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../constants":191,"../../lib/analytics":196,"../../lib/assign":197,"../../lib/dropin-error":201,"../../lib/promise":208,"../base-view":249,"@braintree/asset-loader":1,"braintree-web/google-payment":78}],259:[function(require,module,exports){
'use strict';

var paymentOptionIDs = require('../../constants').paymentOptionIDs;

var result = {};

result[paymentOptionIDs.applePay] = require('./apple-pay-view');
result[paymentOptionIDs.card] = require('./card-view');
result[paymentOptionIDs.googlePay] = require('./google-pay-view');
result[paymentOptionIDs.paypal] = require('./paypal-view');
result[paymentOptionIDs.paypalCredit] = require('./paypal-credit-view');
result[paymentOptionIDs.venmo] = require('./venmo-view');

module.exports = result;

},{"../../constants":191,"./apple-pay-view":255,"./card-view":257,"./google-pay-view":258,"./paypal-credit-view":260,"./paypal-view":261,"./venmo-view":262}],260:[function(require,module,exports){
'use strict';

var assign = require('../../lib/assign').assign;
var Promise = require('../../lib/promise');
var paymentOptionIDs = require('../../constants').paymentOptionIDs;
var BasePayPalView = require('./base-paypal-view');

function PayPalCreditView() {
  BasePayPalView.apply(this, arguments);

  this._isPayPalCredit = true;
}

PayPalCreditView.prototype = Object.create(BasePayPalView.prototype);
PayPalCreditView.prototype.constructor = PayPalCreditView;
PayPalCreditView.ID = PayPalCreditView.prototype.ID = paymentOptionIDs.paypalCredit;

PayPalCreditView.isEnabled = function (options) {
  if (!options.merchantConfiguration.paypalCredit) {
    return Promise.resolve(false);
  }

  return BasePayPalView.isEnabled(assign({
    viewID: PayPalCreditView.ID
  }, options));
};
module.exports = PayPalCreditView;

},{"../../constants":191,"../../lib/assign":197,"../../lib/promise":208,"./base-paypal-view":256}],261:[function(require,module,exports){
'use strict';

var assign = require('../../lib/assign').assign;
var Promise = require('../../lib/promise');
var paymentOptionIDs = require('../../constants').paymentOptionIDs;
var BasePayPalView = require('./base-paypal-view');

function PayPalView() {
  BasePayPalView.apply(this, arguments);
}

PayPalView.prototype = Object.create(BasePayPalView.prototype);
PayPalView.prototype.constructor = PayPalView;
PayPalView.ID = PayPalView.prototype.ID = paymentOptionIDs.paypal;

PayPalView.isEnabled = function (options) {
  if (!options.merchantConfiguration.paypal) {
    return Promise.resolve(false);
  }

  return BasePayPalView.isEnabled(assign({
    viewID: PayPalView.ID
  }, options));
};

module.exports = PayPalView;

},{"../../constants":191,"../../lib/assign":197,"../../lib/promise":208,"./base-paypal-view":256}],262:[function(require,module,exports){
'use strict';

var assign = require('../../lib/assign').assign;
var BaseView = require('../base-view');
var btVenmo = require('braintree-web/venmo');
var DropinError = require('../../lib/dropin-error');
var Promise = require('../../lib/promise');
var paymentOptionIDs = require('../../constants').paymentOptionIDs;

function VenmoView() {
  BaseView.apply(this, arguments);
}

VenmoView.prototype = Object.create(BaseView.prototype);
VenmoView.prototype.constructor = VenmoView;
VenmoView.ID = VenmoView.prototype.ID = paymentOptionIDs.venmo;

VenmoView.prototype.initialize = function () {
  var self = this;
  var venmoConfiguration = assign({}, self.model.merchantConfiguration.venmo, {client: this.client});

  return btVenmo.create(venmoConfiguration).then(function (venmoInstance) {
    self.venmoInstance = venmoInstance;

    if (!self.venmoInstance.hasTokenizationResult()) {
      return Promise.resolve();
    }

    return self.venmoInstance.tokenize().then(function (payload) {
      self.model.reportAppSwitchPayload(payload);
    }).catch(function (err) {
      if (self._isIgnorableError(err)) {
        return;
      }
      self.model.reportAppSwitchError(paymentOptionIDs.venmo, err);
    });
  }).then(function () {
    var button = self.getElementById('venmo-button');

    button.addEventListener('click', function (event) {
      event.preventDefault();

      self.preventUserAction();

      return self.venmoInstance.tokenize().then(function (payload) {
        self.model.addPaymentMethod(payload);
      }).catch(function (tokenizeErr) {
        if (self._isIgnorableError(tokenizeErr)) {
          return;
        }

        self.model.reportError(tokenizeErr);
      }).then(function () {
        self.allowUserAction();
      });
    });

    self.model.asyncDependencyReady(VenmoView.ID);
  }).catch(function (err) {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError(err)
    });
  });
};

VenmoView.prototype._isIgnorableError = function (error) {
  // customer cancels the flow in the app
  // we don't emit an error because the customer
  // initiated that action
  return error.code === 'VENMO_APP_CANCELED' || error.code === 'VENMO_DESKTOP_CANCELED';
};

VenmoView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;
  var venmoEnabled = gatewayConfiguration.payWithVenmo && Boolean(options.merchantConfiguration.venmo);

  if (!venmoEnabled) {
    return Promise.resolve(false);
  }

  return Promise.resolve(btVenmo.isBrowserSupported(options.merchantConfiguration.venmo));
};

module.exports = VenmoView;

},{"../../constants":191,"../../lib/assign":197,"../../lib/dropin-error":201,"../../lib/promise":208,"../base-view":249,"braintree-web/venmo":157}]},{},[194])(194)
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./resources/js/payment.js ***!
  \*********************************/
console.log('ciao');

var dropin = __webpack_require__(/*! braintree-web-drop-in */ "./node_modules/braintree-web-drop-in/dist/browser/dropin.js");

dropin.create({
  authorization: 'CLIENT_AUTHORIZATION',
  container: '#dropin-container',
  paypal: {
    flow: 'vault',
    amount: '10.00',
    currency: 'USD'
  }
});
})();

/******/ })()
;