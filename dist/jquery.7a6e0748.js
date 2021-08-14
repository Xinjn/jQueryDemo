// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jquery.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  var elements;

  if (typeof selectorOrArrayOrTemplate === 'string') {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 创建 div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      // 查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    var container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  } //原理：让api.__proto__原型指向jQuery.prototype：解决相同属性使用同一原型链，避免开辟多余原型链


  var api = Object.create(jQuery.prototype); //添加原型链方法：创建一个对象，这个对象的__proto__为括号里面的东西
  //等价于const api = {__proto__:jQuery.prototype}

  api.oldApi = selectorOrArrayOrTemplate.oldApi; //旧的api

  api.elements = elements; //为了让jQuery.prototype中的方法访问到elements参数,jQuery.prototype中elements方式添加this调用，负责无法调用

  return api;
}; // 实例.__protp__ ==== 构造函数.prototype
//api.__proto__ === jQuery.prototype


jQuery.fn = jQuery.prototype = {
  //把公用属性全部放到jQuery.prototype上//
  constructor: jQuery,
  //prototype.constructor仅仅可以用于识别对象是由哪个构造函数初始化的，仅此而已
  //通用
  each: function each(fn) {
    for (var i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }

    return this;
  },
  print: function print() {
    console.log(this.elements);
    return this;
  },
  //查
  find: function find(selector) {
    var array = [];

    for (var i = 0; i < this.elements.length; i++) {
      var elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }

    array.oldApi = this; //this为省略对象名api：把api身上的方法复制到array.oldApi变量中为旧api

    return jQuery(array); //把旧api方法添加到jQuery中的oldApi属性中（this.oldApi）
  },
  end: function end() {
    //console.log(this);//链式调用新api链
    //console.log(this.oldApi);//返回旧api链
    return this.oldApi; // this 现在是新的 api2，从新的api2返回到旧的api1
  },
  parent: function parent() {
    var array = [];
    this.each(function (node) {
      if (array.indexOf(node.parentNode) === -1) {
        //去除重复数据
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  //查
  children: function children() {
    var array = [];
    this.each(function (node) {
      array.push.apply(array, _toConsumableArray(node.children));
    });
    return jQuery(array);
  },
  siblings: function siblings() {
    var array = [];
    this.each(function (node) {
      array.push.apply(array, _toConsumableArray(Array.from(node.parentNode.children).filter(function (n) {
        return n !== node;
      })));
    });
    return jQuery(array);
  },
  index: function index() {
    var array = [];
    this.each(function (node) {
      array.push.apply(array, _toConsumableArray(Array.from(node.parentNode.children)));
    });

    for (var i = 0; i < array.length; i++) {
      if (array[i] === this.elements[0]) {
        console.log(i);
      }
    }

    return this;
  },
  next: function next() {
    var array = [];
    var x = this.elements[0].nextSibling;

    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }

    array.push(x);
    return jQuery(array);
  },
  prev: function prev() {
    var array = [];
    var x = this.elements[0].previousSibling;

    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }

    array.push(x);
    return jQuery(array);
  },
  //增
  addClass: function addClass(className) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }

    return this;
  },
  appendTo: function appendTo(node) {
    //插入到当前节点
    if (node instanceof Element) {
      this.each(function (el) {
        node.appendChild(el);
      });
    }

    return this;
  },
  //删
  remove: function remove(childrenSelector) {
    var selector = document.querySelectorAll(childrenSelector);
    this.elements[0].removeChild(selector[0]);
    return this;
  },
  empty: function empty() {
    this.elements[0].parentNode.removeChild(this.elements[0]);
    return this;
  },
  //改
  text: function text(string) {
    if (arguments.length === 0) {
      //读取
      console.log(this.elements[0].innerText);
    } else if (arguments.length === 1) {
      //写入
      this.elements[0].innerText = string;
    }

    return this;
  },
  html: function html(string) {
    if (arguments.length === 0) {
      //读取
      console.log(this.elements[0].innerHTML);
    } else if (arguments.length === 1) {
      //写入
      this.elements[0].innerText = string;
    }

    return this;
  },
  arrt: function arrt(name, value) {
    var array = [];

    if (arguments.length === 1) {
      //读取
      array.push(this.elements[0].getAttribute(name));
      console.log(this.elements[0].getAttribute(name));
    } else if (arguments.length === 2) {
      //写入
      this.elements[0].setAttribute(name, value);
    }

    return jQuery(array);
  },
  css: function css(name, value) {
    var array = []; //写入：dom.style(div,'color','red')

    if (arguments.length === 2) {
      this.elements[0].style[name] = value;
    } else if (arguments.length === 1) {
      //读取：dom.style(div,'color')
      if (typeof name === 'string') {
        array.push(name); //写入：dom.style(test,{border:"1px solid red",color:"blue"})  
      } else if (name instanceof Object) {
        var object = name;

        for (var key in object) {
          this.elements[0].style[key] = object[key];
        }
      }
    }

    return jQuery(array);
  },
  on: function on(eventName, fn) {
    this.elements[0].addEventListener(eventName, fn);
  },
  off: function off(eventName, fn) {
    this.elements[0].removeEventListener(eventName, fn);
  }
};
},{}],"C:/Users/NING MEI/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62644" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/NING MEI/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jquery.js"], null)
//# sourceMappingURL=/jquery.7a6e0748.js.map