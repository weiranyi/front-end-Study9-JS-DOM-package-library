// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {
    // 1.1、【增】创建一个节点
    create: function create(string) {
        // 'template'标签可以容纳任意标签
        var container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
        /* 操作template里面的dom，不能直接用template，要用template.content
        * */
    },

    // 1.2、【增】新增一个弟弟
    after: function after(node, node2) {
        // console.log(node.nextSibling); 打印出下一个节点
        node.parentNode.insertBefore(node2, node.nextSibling);
        /* node.nextSibling：下一个节点为：文本节点、null都可以运行
        * */
    },

    // 1.3、【增】新增一个哥哥
    before: function before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },

    // 1.4、【增】增加一个儿子
    append: function append(parent, node) {
        parent.appendChild(node);
    },

    // 1.5、【增】新增一个爸爸
    wrap: function wrap(node, parent) {
        dom.before(node, parent); // 增加一个兄弟（1、parent做哥哥）
        dom.append(parent, node); // 再追加到node后（2、parent做爸爸）
    },

    // 2.1、【删】移除
    remove: function remove(node) {
        // node.remove();该接口比较新,老些的浏览器不怎么支持
        node.parentNode.removeChild(node);
        return node;
    },

    // 2.2、【删】清空
    empty: function empty(node) {
        // node.innerHTML = ''; 就没有节点的引用了
        var childNodes = node.childNodes; // const childNodes = node.childNodes;

        var array = [];
        var x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        /*
        * 移除childNodes的节点时，length是动态变化的，所以采用while来遍历了！！！
        * */
        return array;
    },

    // 3.1、【改】读写
    /*
     * 实现重载功能
     */
    attr: function attr(node, name, value) {
        // 重载3个参数、2个参数
        if (arguments.length === 3) {
            // 当参数长度
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },

    // 3.2、【改】写文本，具体情况具体分析
    text: function text(node, string) {
        // 适配、兼容
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerHTML = string; // ie
            } else {
                node.textContent = string; // firefox,Chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerHTML;
            } else {
                return node.textContent;
            }
        }
    },
    html: function html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },

    // 3.3、【改】改样式
    style: function style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(test,'border','1px solid black');
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(test,'border')
                return node.style[name];
            } else if (name instanceof Object) {
                var object = name; // 设置别名
                for (var key in object) {
                    // dom.style(test,{border:'1px solid red',color:'blue'});
                    // key:border/color
                    // node.style.border = ...
                    // node.style.color = ...
                    node.style[key] = object[key];
                }
            }
        }
    },

    // 3.4、【改】改样式
    class: {
        add: function add(node, className) {
            node.classList.add(className);
        },
        remove: function remove(node, className) {
            node.classList.remove(className);
        },
        has: function has(node, className) {
            return node.classList.contains(className);
        }
    },
    // 3.5、【改】改事件
    on: function on(node, evenName, fn) {
        node.addEventListener(evenName, fn);
    },
    off: function off(node, evenName, fn) {
        node.removeEventListener(evenName, fn);
    },


    // 4.1、【查】
    find: function find(selector, scope) {
        // 返回一个数组,有范围就用scope，没有就从document中找
        return (scope || document).querySelectorAll(selector);
    },
    parent: function parent(node) {
        return node.parentNode;
    },
    children: function children(node) {
        return node.children;
    },
    siblings: function siblings(node) {
        // 兄弟姐妹伪数组，再通过Array.from转换为数组
        return Array.from(node.parentNode.children).filter(function (n) {
            return n !== node;
        });
    },
    next: function next(node) {
        // 下一个节点
        var x = node.nextSibling;
        while (x && x.nodeType === 3) {
            x = x.nextSibling;
        }
        return x;
    },
    previous: function previous(node) {
        // 下一个节点
        var x = node.previousSibling;
        while (x && x.nodeType === 3) {
            x = x.previousSibling;
        }
        return x;
    },
    each: function each(nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index: function index(node) {
        var list = dom.children(node.parentNode);
        var i = void 0;
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break;
            }
        }
        return i;
    }
};
},{}],"../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '53681' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.befe264d.map