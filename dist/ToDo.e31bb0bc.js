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
})({"util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFromLSasJSON = exports.setToLSasJSON = exports.getFromLS = exports.setToLS = void 0;

var setToLS = function setToLS(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    alert(error);
  }
};

exports.setToLS = setToLS;

var getFromLS = function getFromLS(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    alert(error);
  }
};

exports.getFromLS = getFromLS;

var setToLSasJSON = function setToLSasJSON(key, value) {
  try {
    var JSONedValue = JSON.stringify(value);
    localStorage.setItem(key, JSONedValue);
  } catch (error) {
    alert(error);
  }
};

exports.setToLSasJSON = setToLSasJSON;

var getFromLSasJSON = function getFromLSasJSON(key) {
  try {
    var lsItem = localStorage.getItem(key);

    if (lsItem === null) {
      alert("Alas");
    }

    return JSON.parse(lsItem);
  } catch (error) {
    alert(error);
  }
};

exports.getFromLSasJSON = getFromLSasJSON;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _util = require("./util.js");

// загрузка списка при загрузке страницы
var init = function init() {
  // Переменные
  var superStorageKey = "key";
  var taskArray = [];
  var index = 0;
  var currentUID = 0; // Селекторы

  var currentDateElement = document.querySelector(".Date");
  var editWindow = document.querySelector('#formEditing');
  var listOfCurrentTasks = document.querySelector(".listOfCurrentTasks");
  var addTask = document.querySelector(".addTask");
  var modalWindow = document.querySelector('#formCreation');
  var currentEditForm = document.querySelector('form[name="editForm"]');
  var currentForm = document.querySelector('form[name="Form"]'); // Логика работы
  // Устанавливаем дату

  currentDateElement.innerHTML = new Date().toLocaleDateString(); // Создание нового элемента списка задач

  var createNewTask = function createNewTask(taskItem) {
    var listItem = document.createElement("li");

    if (taskItem.formIsValid == false) {
      listItem.classList.add("elementIsNotValid");
    }

    ;
    listItem.innerHTML = taskItem.taskName; // присвоение атрибута data-uid для того, чтобы обращаться к элементу списка по номеру.

    listItem.dataset.uid = index;
    listOfCurrentTasks.appendChild(listItem);
    listItem.addEventListener("click", processor);
    index++;
    taskArray.push(taskItem);
  }; // Работа с LS


  var localStorageTaskArray = (0, _util.getFromLSasJSON)(superStorageKey);

  if (localStorageTaskArray && localStorageTaskArray.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = localStorageTaskArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var arrayElement = _step.value;
        createNewTask(arrayElement);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var writeCurrentTaskArraytoLS = function writeCurrentTaskArraytoLS() {
    (0, _util.setToLSasJSON)(superStorageKey, taskArray);
  }; // Обработчики event'ов
  // первое объявление переменной на редактирование формы
  // создается обработчик события (processor), дающий возможность обратиться к конкретному элементу формы. Именованная функция, чтобы решить проблему с разнесением логики


  function processor(event) {
    currentUID = event.target.dataset.uid;
    editWindow.classList.remove("Modal-disabled");
    var currentEditForm = document.querySelector('form[name="editForm"]'); // работа с html напрямую. 

    var formElement = currentEditForm.elements; // создается переменная, которая обращается к выбранному элементу в taskArray 

    var pickedArrayElement = taskArray[currentUID]; // каждому input назначается хранимое значение в taskArray

    formElement.taskName.value = pickedArrayElement.taskName;
    formElement.taskDescription.value = pickedArrayElement.taskDescription;
    formElement.selectPriority.value = pickedArrayElement.selectPriority;
    formElement.plannedDate.value = pickedArrayElement.plannedDate;
    formElement.actualDate.value = pickedArrayElement.actualDate;
  }

  ;

  var addTaskOnClick = function addTaskOnClick() {
    modalWindow.classList.toggle("Modal-disabled");
  };

  addTask.addEventListener("click", addTaskOnClick); // и тут в игру врывается редактирование форм! Удар! Разработчик рыдает и пропускает переменную! Еще удар! Разработчик забивает на переменные! Зрители в экстазе! 

  var currentEditFormOnSubmit = function currentEditFormOnSubmit(event) {
    event.preventDefault();
    var formElement = event.target.elements;
    var taskName = formElement.taskName.value;
    var taskDescription = formElement.taskDescription.value;
    var selectPriority = formElement.selectPriority.value;
    var plannedDate = formElement.plannedDate.value;
    var actualDate = formElement.actualDate.value;
    var formIsValid = taskName && taskDescription && plannedDate;
    var taskItem = {
      taskName: taskName,
      taskDescription: taskDescription,
      selectPriority: selectPriority,
      plannedDate: plannedDate,
      actualDate: actualDate,
      formIsValid: formIsValid
    };
    taskArray.splice(currentUID, 1, taskItem);
    writeCurrentTaskArraytoLS();
    window.location.reload();
  }; // Комментирую как хочу. И переменные называю как хочу. Эту вот хотела назвать Симба. Тут вешаается событие на редактирование формы.


  currentEditForm.addEventListener("submit", currentEditFormOnSubmit);

  var deleteFormOnReset = function deleteFormOnReset(event) {
    editWindow.classList.add("Modal-disabled");
    var toDelete = confirm("Вы действительно хотите удалить задачу?");

    if (toDelete) {
      listOfCurrentTasks.removeChild(listOfCurrentTasks.children[currentUID]);
      taskArray.splice(currentUID, 1);
      writeCurrentTaskArraytoLS();
    }
  };

  currentEditForm.addEventListener("reset", deleteFormOnReset); // События на добавление формы (отправить и отменить)

  var currentFormOnSubmit = function currentFormOnSubmit(event) {
    event.preventDefault();
    var formElement = event.target.elements;
    var taskName = formElement.taskName.value;
    var taskDescription = formElement.taskDescription.value;
    var selectPriority = formElement.selectPriority.value;
    var plannedDate = formElement.plannedDate.value;
    var actualDate = formElement.actualDate.value;
    var formIsValid = taskName && taskDescription && plannedDate;
    var taskItem = {
      taskName: taskName,
      taskDescription: taskDescription,
      selectPriority: selectPriority,
      plannedDate: plannedDate,
      actualDate: actualDate,
      formIsValid: formIsValid
    };
    createNewTask(taskItem); // localStorage.setItem(superStorageKey, JSON.stringify(taskArray)); - старая версия
    // делаем запись в LS с преобразованием JSON в виде строки. Преобразуем taskArray 

    (0, _util.setToLSasJSON)(superStorageKey, taskArray); // modalWindow.classList.add("Modal-disabled");

    currentForm.reset();
  };

  currentForm.addEventListener("submit", currentFormOnSubmit);

  var currentFormOnReset = function currentFormOnReset() {
    modalWindow.classList.add("Modal-disabled");
  };

  currentForm.addEventListener("reset", currentFormOnReset);
};

document.addEventListener("DOMContentLoaded", init);
},{"./util.js":"util.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49653" + '/');

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/ToDo.e31bb0bc.map