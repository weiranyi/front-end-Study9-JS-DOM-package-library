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
})({"epB2":[function(require,module,exports) {
// 创建节点
var div = dom.create('<td>12</td>');
console.log(div);

// 添加弟弟节点
dom.after(test, div);

//
var div3 = dom.create('<div id="parent"></div>');
dom.wrap(test, div3);

// 删除节点
var nodes = dom.empty(window.empty);
console.log(nodes);

// 实现写操作
dom.attr(test, 'title', "hi,I'm weiranyi");
// 实现读操作
var title = dom.attr(test, 'title');
// 输出到控制台
console.log('title:' + title);
// 写文本操作
dom.text(test, '您好，这是新的内容');
// 读取文本操作
dom.text(test);

// 改样式
dom.style(test, { border: '1px solid red', color: 'blue' });
console.log(dom.style(test, 'border')); // 读取border的值
dom.style(test, 'border', '1px solid black');

//修改样式
dom.class.add(test, 'red');
dom.class.add(test, 'blue');
dom.class.remove(test, 'blue');
console.log(dom.class.has(test, 'blue'));

// 事件
var fn = function fn() {
    console.log('点击了');
};
dom.on(test, 'click', fn);
dom.off(test, 'click', fn);

var testDiv = dom.find('#test')[0];
console.log(testDiv);
var testDiv2 = dom.find('#test2')[0];
console.log(dom.find('.red', testDiv2)[0]);
console.log(dom.parent(test));
console.log(dom.siblings(dom.find('#s2')[0]));
console.log(dom.next(dom.find('#s2')[0]));
console.log(dom.previous(dom.find('#s2')[0]));

var t = dom.find('#travel')[0];
dom.each(dom.children(t), function (n) {
    return dom.style(n, 'color', 'red');
});
console.log(dom.index(dom.find('#s2')[0]));
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.4141eb15.map