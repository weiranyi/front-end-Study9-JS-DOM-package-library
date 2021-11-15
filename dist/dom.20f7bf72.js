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
})({"fRxd":[function(require,module,exports) {
window.dom = {
    // 1.1、【增】创建一个节点
    create: function create(string) {
        // 'template'标签可以容纳任意标签
        var container = document.createElement('template');
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },

    // 1.2、【增】新增一个弟弟
    after: function after(node, node2) {
        // console.log(node.nextSibling); 打印出下一个节点
        node.parentNode.insertBefore(node2, node.nextSibling);
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
        dom.before(node, parent); // 增加一个兄弟
        dom.append(parent, node); // 再追加到node后
    },

    // 2.1、【删】移除
    remove: function remove(node) {
        // node.remove();该接口比较新,老些的浏览器不怎么支持
        node.parentNode.removeChild(node);
        return node;
    },

    // 2.2、【删】清空
    empty: function empty(node) {
        // node.innerHTML = '';
        var childNodes = node.childNodes; // const childNodes = node.childNodes;

        var array = [];
        var x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },

    // 3.1、【改】读写
    /*
     * 实现重载功能
     */
    attr: function attr(node, name, value) {
        if (arguments.length === 3) {
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
            return node.innerHTML = string;
        }
    },

    // 3.3、【改】改样式
    style: function style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div,'color','red')
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div,'color')
                return node.style[name];
            } else if (name instanceof Object) {
                var object = name;
                for (var key in object) {
                    // dom.style(div,{color:'red'})
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
    // 3.4、【改】改事件
    on: function on(node, evenName, fn) {
        node.addEventListener(evenName, fn);
    },
    off: function off(node, evenName, fn) {
        node.removeEventListener(evenName, fn);
    },

    // 4.1、【查】查事件
    find: function find(selector, scope) {
        // 返回一个数组
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
                if (list[i] === node) {
                    break;
                }
            }
            return i;
        }
    }
};
},{}]},{},["fRxd"], null)
//# sourceMappingURL=dom.20f7bf72.map