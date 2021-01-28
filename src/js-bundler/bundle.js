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
})({"utils/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.refreshAddNewItemPopupDOM = exports.refreshDOM = void 0;

var getId = function getId(id) {
  return document.getElementById(id);
};

var dom = {
  curency: document.querySelectorAll('#curency'),
  headingMonth: getId('heading-month'),
  month: getId('heading-month'),
  balance: getId('balance-value'),
  monthIncome: getId('income-month'),
  monthExpense: getId('expense-month'),
  monthExpensePercent: getId('expense-month-percent'),
  incomeBtn: getId('income-btn'),
  expenseBtn: getId('expense-btn'),
  addNewItemPopup: {
    inputValue: getId('input-value'),
    inputBoxPlaceholder: document.querySelector('.input-box-placeholder'),
    radioBtns: document.querySelectorAll('.radio-btn'),
    inputDescription: getId('input-description'),
    descriptionBoxPlaceholder: document.querySelector('.description-box-placeholder'),
    cancelBtn: getId('cancel-popup-btn'),
    submitBtn: getId('submit-btn')
  },
  incomesList: getId('incomes-list'),
  expensesList: getId('expenses-list'),
  listsItems: document.querySelectorAll('#list-item'),
  editListItem: document.querySelectorAll('#item-edit'),
  deleteListItem: document.querySelectorAll('#item-delete'),
  root: document.documentElement
};

var refreshDOM = function refreshDOM() {
  dom.editListItem = document.querySelectorAll('#item-edit');
  dom.deleteListItem = document.querySelectorAll('#item-delete');
  dom.listsItems = document.querySelectorAll('#list-item');
};

exports.refreshDOM = refreshDOM;

var refreshAddNewItemPopupDOM = function refreshAddNewItemPopupDOM() {
  dom.addNewItemPopup.inputValue = getId('input-value');
  dom.addNewItemPopup.inputBoxPlaceholder = document.querySelector('.input-box-placeholder');
  dom.addNewItemPopup.radioBtns = document.querySelectorAll('.radio-btn');
  dom.addNewItemPopup.inputDescription = getId('input-description');
  dom.addNewItemPopup.descriptionBoxPlaceholder = document.querySelector('.description-box-placeholder');
  dom.addNewItemPopup.cancelBtn = getId('cancel-popup-btn');
  dom.addNewItemPopup.submitBtn = getId('submit-btn');
};

exports.refreshAddNewItemPopupDOM = refreshAddNewItemPopupDOM;
var _default = dom;
exports.default = _default;
},{}],"utils/placeholders.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var addPopupPlaceholder = "<div class=\"dark-screen\" id=\"dark-screen-popup\">\n<div class=\"container-add-new\">\n    <h4 class=\"heading-4\">Add New {%type%}</h4>\n    <div class=\"input-box\">\n        <div class=\"input-box-placeholder\">You can write also a mathematic expression here</div>\n        <div class=\"input-value-expression\" id=\"input-value\" contenteditable></div>\n        <svg class=\"backspace\">\n            <use xlink:href=\"img/svg/icons.svg#icon-backspace\"></use>\n        </svg>\n    </div>\n\n    <div class=\"categories-list\">\n        <label class=\"category-item\" for=\"salary\">\n            <input type=\"radio\" class=\"radio-btn\" id=\"salary\" name=\"category-item\">\n            <svg class=\"category-icon\">\n                <use xlink:href=\"img/svg/category-icons.svg#icon-coin-euro\"></use>\n            </svg>\n            <div class=\"category-description\">Salary</div>\n        </label>\n        <label class=\"category-item\" for=\"project\">\n            <input type=\"radio\" class=\"radio-btn\" id=\"project\" name=\"category-item\">\n            <svg class=\"category-icon\">\n                <use xlink:href=\"img/svg/category-icons.svg#icon-coin-euro\"></use>\n            </svg>\n            <div class=\"category-description\">Project</div>\n        </label>\n        <label class=\"category-item\" for=\"transferta\">\n            <input type=\"radio\" class=\"radio-btn\" id=\"transferta\" name=\"category-item\">\n            <svg class=\"category-icon\">\n                <use xlink:href=\"img/svg/category-icons.svg#icon-coin-euro\"></use>\n            </svg>\n            <div class=\"category-description\">Transferta</div>\n        </label>\n        <label class=\"category-item\" for=\"dividend\">\n            <input type=\"radio\" class=\"radio-btn\" id=\"dividend\" name=\"category-item\">\n            <svg class=\"category-icon\">\n                <use xlink:href=\"img/svg/category-icons.svg#icon-coin-euro\"></use>\n            </svg>\n            <div class=\"category-description\">Dividend</div>\n        </label>\n    </div>\n\n    <div class=\"description-box\">\n        <div class=\"description-box-placeholder\">Type a note</div>\n        <div class=\"input-description-div\" id=\"input-description\" contenteditable></div>\n    </div>\n\n    <div class=\"buttons\">\n        <button class=\"new-btn\" id=\"cancel-popup-btn\">Cancel</button>\n        <button class=\"new-btn {%class-btn%}\" data-type=\"{%add-type%}\" id=\"submit-btn\">Add New {%type%}</button>\n    </div>\n\n</div>\n</div>";
var itemPlaceholder = "<li id=\"list-item\" data-id=\"{%id%}\" data-type=\"{%type%}\" class=\"item\">\n    <div class=\"item-name\">{%name%}</div>\n    <div class=\"item-description\">{%description%}</div>\n    <div class=\"item-value {%class-color%}\">{%value%}{%percent-placeholder%}</div>\n    <div class=\"item-options\">\n    <div class=\"item-edit\" id=\"item-edit\">\n        <svg class=\"item-icon item-icon-edit\">\n            <use xlink:href=\"img/svg/icons.svg#icon-pencil\"></use>\n        </svg>\n    </div>\n    <div class=\"item-delete\" id=\"item-delete\">\n        <svg class=\"item-icon item-icon-delete\">\n            <use xlink:href=\"img/svg/icons.svg#icon-cancel-circle\"></use>\n        </svg>\n    </div>\n    </div>\n</li>";
var percentPlaceholder = "<span class=\"item-percent\" id=\"item-percent\">{%percent%}</span>";
var placeholders = {
  addPopupPlaceholder: addPopupPlaceholder,
  itemPlaceholder: itemPlaceholder,
  percentPlaceholder: percentPlaceholder
};
var _default = placeholders;
exports.default = _default;
},{}],"utils/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getMonthYear = function getMonthYear() {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date();
  return "".concat(monthNames[date.getMonth()], " ").concat(date.getFullYear());
};

var getMonthYearLocalStorage = function getMonthYearLocalStorage() {
  var monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  var date = new Date();
  return "".concat(monthNames[date.getMonth()], "-").concat(date.getFullYear());
};

var Functions = {
  getMonthYear: getMonthYear,
  getMonthYearLocalStorage: getMonthYearLocalStorage
};
var _default = Functions;
exports.default = _default;
},{}],"views/views.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dom = _interopRequireWildcard(require("./../utils/dom.js"));

var _placeholders = _interopRequireDefault(require("./../utils/placeholders.js"));

var _functions = _interopRequireDefault(require("./../utils/functions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initView = function initView(state) {
  _dom.default.curency.forEach(function (el) {
    return el.textContent = state.curency;
  });

  _dom.default.headingMonth.textContent = _functions.default.getMonthYear();
  _dom.default.headingMonth.dataset.id = _functions.default.getMonthYearLocalStorage();
  _dom.default.balance.textContent = state.balance;
  _dom.default.monthIncome.textContent = state.monthIncomesValue;
  _dom.default.monthExpense.textContent = state.monthExpensesValue;
  _dom.default.monthExpensePercent.textContent = "".concat(state.monthExpensesPercentage, "%");
  state.incomes.forEach(function (income) {
    return addNewItemToDOM(income);
  });
  state.expenses.forEach(function (expense) {
    return addNewItemToDOM(expense);
  });
};

var firstLetterUppercase = function firstLetterUppercase(text) {
  text = text.split('');
  text[0] = text[0].toUpperCase();
  return text.join('');
};

var addNewItemToDOM = function addNewItemToDOM(input) {
  var element = _placeholders.default.itemPlaceholder.replace('{%name%}', firstLetterUppercase(input.name));

  element = element.replace('{%id%}', input.id);
  element = element.replace('{%type%}', input.type);
  element = element.replace('{%description%}', input.description);
  element = element.replace('{%value%}', "".concat(input.value).concat(input.curency));

  if (input.type === '+') {
    element = element.replace('{%class-color%}', 'item-value-blue');
    element = element.replace('{%percent-placeholder%}', '');

    _dom.default.incomesList.insertAdjacentHTML('beforeend', element);
  } else if (input.type === '-') {
    element = element.replace('{%class-color%}', 'item-value-red');

    var percent = _placeholders.default.percentPlaceholder.replace('{%percent%}', "".concat(parseInt(input.percent), "%"));

    element = element.replace('{%percent-placeholder%}', " ".concat(percent));

    _dom.default.expensesList.insertAdjacentHTML('beforeend', element);
  }

  (0, _dom.refreshDOM)();
};

var removeDomItem = function removeDomItem(element) {
  element.remove();
}; // SHOW / CLOSE INPUT POPUP + other things


var showAddNewItemPopup = function showAddNewItemPopup(event) {
  var element;

  if (event.currentTarget.id === 'income-btn') {
    _dom.default.root.style.setProperty('--color-inputs', '#0d66a1');

    element = _placeholders.default.addPopupPlaceholder.replace(/{%type%}/g, 'Income');
    element = element.replace('{%class-btn%}', 'add-btn');
    element = element.replace('{%add-type%}', '+');
  } else if (event.currentTarget.id === 'expense-btn') {
    _dom.default.root.style.setProperty('--color-inputs', '#ee2727');

    element = _placeholders.default.addPopupPlaceholder.replace(/{%type%}/g, 'Expense');
    element = element.replace('{%class-btn%}', 'add-btn-red');
    element = element.replace('{%add-type%}', '-');
  }

  document.body.insertAdjacentHTML('beforeend', element);
};

var closeAddNewItemPopup = function closeAddNewItemPopup() {
  document.getElementById('dark-screen-popup').remove();
};

var selectCategory = function selectCategory(e) {
  _dom.default.addNewItemPopup.radioBtns.forEach(function (radio) {
    radio.parentElement.style.backgroundColor = '#ffffff';
  });

  if (e.target.checked) {
    e.target.parentElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-inputs');
  }
};

var updateState = function updateState(state) {
  _dom.default.balance.textContent = state.balance;
  _dom.default.monthIncome.textContent = state.monthIncomesValue;
  _dom.default.monthExpense.textContent = state.monthExpensesValue;
  _dom.default.monthExpensePercent.textContent = "".concat(parseInt(state.monthExpensesPercentage), "%");
};

var allowOnlyNumbersAndMathSymbols = function allowOnlyNumbersAndMathSymbols(element) {
  element.addEventListener('input', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var allowedChars, isOk, arr;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              console.log(e);

              if (document.querySelector('.input-box-placeholder').style.visibility !== 'hidden') {
                document.querySelector('.input-box-placeholder').style.visibility = 'hidden';
              } // const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '/', '*'];


              allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
              isOk = false;
              allowedChars.forEach(function (char) {
                if (e.data === char) isOk = true;
              });

              if (!isOk) {
                arr = e.target.textContent.split(e.data);
                e.target.textContent = arr.join('');
              }

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}; // const clearInputs = () => {
//     dom.inputDescription.value = '';
//     dom.inputValue.value = '';
// }


var addItemHoverClass = function addItemHoverClass(e) {
  _dom.default.listsItems.forEach(function (item) {
    if (item !== e.currentTarget) item.classList.remove('item-hover');
  });

  e.currentTarget.classList.toggle('item-hover');
};

var Views = {
  initView: initView,
  addNewItemToDOM: addNewItemToDOM,
  removeDomItem: removeDomItem,
  updateState: updateState,
  showAddNewItemPopup: showAddNewItemPopup,
  selectCategory: selectCategory,
  closeAddNewItemPopup: closeAddNewItemPopup,
  allowOnlyNumbersAndMathSymbols: allowOnlyNumbersAndMathSymbols,
  // clearInputs: clearInputs,
  addItemHoverClass: addItemHoverClass
};
var _default = Views;
exports.default = _default;
},{"./../utils/dom.js":"utils/dom.js","./../utils/placeholders.js":"utils/placeholders.js","./../utils/functions.js":"utils/functions.js"}],"utils/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State = /*#__PURE__*/function () {
  function State(data) {
    _classCallCheck(this, State);

    this.balance = data.balance;
    this.monthIncomesValue = data.monthIncomesValue;
    this.monthExpensesValue = data.monthExpensesValue;
    this.monthExpensesPercentage = data.monthExpensesPercentage;
    this.incomes = data.incomes;
    this.expenses = data.expenses;
    this.curency = data.curency;
  }

  _createClass(State, [{
    key: "calcPercentage",
    value: function calcPercentage() {
      var result = this.monthExpensesValue * 100 / this.monthIncomesValue;
      result = result.toFixed(2);
      this.monthExpensesPercentage = parseFloat(result);
    }
  }, {
    key: "updateIncomes",
    value: function updateIncomes(newIncome) {
      this.incomes.push(newIncome);
      this.updateIncExpValue('inc');
      this.updateBalance();
    }
  }, {
    key: "updateExpeses",
    value: function updateExpeses(newExpense) {
      this.expenses.push(newExpense);
      this.updateIncExpValue('exp');
      this.calcPercentage();
      this.updateBalance();
    }
  }, {
    key: "updateBalance",
    value: function updateBalance() {
      var val = this.monthIncomesValue - this.monthExpensesValue;
      this.balance = parseFloat(val.toFixed(2));
    }
  }, {
    key: "updateIncExpValue",
    value: function updateIncExpValue(type) {
      var sum = 0;

      if (type === 'inc') {
        this.incomes.forEach(function (income) {
          return sum += income.value;
        });
        this.monthIncomesValue = parseFloat(sum.toFixed(2));
      } else if (type === 'exp') {
        this.expenses.forEach(function (expense) {
          return sum += expense.value;
        });
        this.monthExpensesValue = parseFloat(sum.toFixed(2));
      }
    }
  }, {
    key: "deleteIncome",
    value: function deleteIncome(dataId) {
      var newIncomes = [];
      this.incomes.forEach(function (income) {
        if (income.id !== dataId) {
          newIncomes.push(income);
        }
      });
      this.incomes = newIncomes;
      this.updateIncExpValue('inc');
      this.updateBalance();
    }
  }, {
    key: "deleteExpense",
    value: function deleteExpense(dataId) {
      var newExpenses = [];
      this.expenses.forEach(function (expense) {
        if (expense.id !== dataId) {
          newExpenses.push(expense);
        }
      });
      this.expenses = newExpenses;
      this.updateIncExpValue('exp');
      this.calcPercentage();
      this.updateBalance();
    }
  }]);

  return State;
}();

var _default = State;
exports.default = _default;
},{}],"models/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _views = _interopRequireDefault(require("./../views/views.js"));

var _state = _interopRequireDefault(require("./../utils/state.js"));

var _functions = _interopRequireDefault(require("./../utils/functions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Update localStorage
var updateLocalStorage = function updateLocalStorage(newState) {
  window.localStorage.setItem(document.getElementById('heading-month').dataset.id, JSON.stringify(newState));
}; //Init State


var state;

var initState = function initState() {
  var data = _functions.default.getMonthYearLocalStorage();

  var localStorageData;

  if (window.localStorage.getItem(data)) {
    localStorageData = JSON.parse(window.localStorage.getItem(data));
  } else {
    localStorageData = {
      balance: 0,
      monthIncomesValue: 0,
      monthExpensesValue: 0,
      monthExpensesPercentage: 0,
      incomes: [],
      expenses: [],
      curency: '€'
    };
  }

  state = new _state.default(localStorageData);
  return state;
}; // Create New Income / Expense


var createNewEntry = function createNewEntry(input) {
  input.value = parseFloat(input.value);
  input.id = Date.now();

  if (input.type === '+') {
    state.updateIncomes(input);
  } else if (input.type === '-') {
    input.percent = input.value * 100 / state.monthIncomesValue;
    input.percent = input.percent.toFixed(2);
    state.updateExpeses(input);
  }

  input.curency = state.curency;

  _views.default.addNewItemToDOM(input);

  _views.default.updateState(state); // Views.clearInputs();


  updateLocalStorage(state);
  console.log(state);
};

var deleteItemFromState = function deleteItemFromState(type, id) {
  id = parseInt(id);

  if (type === '+') {
    state.deleteIncome(id);
  } else if (type === '-') {
    state.deleteExpense(id);
  }

  _views.default.updateState(state);

  updateLocalStorage(state); // console.log(state);
}; // Create an Object with all functions


var Model = {
  initState: initState,
  createNewEntry: createNewEntry,
  deleteItemFromState: deleteItemFromState
};
var _default = Model;
exports.default = _default;
},{"./../views/views.js":"views/views.js","./../utils/state.js":"utils/state.js","./../utils/functions.js":"utils/functions.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _dom = _interopRequireWildcard(require("./utils/dom.js"));

var _model = _interopRequireDefault(require("./models/model.js"));

var _views = _interopRequireDefault(require("./views/views.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from './utils/firebaseConfig.js';
// import State from './utils/state.js';
var initApp = function initApp() {
  var state = _model.default.initState();

  _views.default.initView(state); // firebase.initializeApp(firebaseConfig);

};

var addEventListenersToNewListItems = function addEventListenersToNewListItems() {
  _dom.default.listsItems.forEach(function (item) {
    return item.addEventListener('click', _views.default.addItemHoverClass);
  });

  _dom.default.deleteListItem.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var element = e.currentTarget.parentElement.parentElement;

      _views.default.removeDomItem(element);

      _model.default.deleteItemFromState(element.dataset.type, element.dataset.id);
    });
  });
};

var controller = function controller() {
  _dom.default.incomeBtn.addEventListener('click', activateAddNewItemPopup);

  _dom.default.expenseBtn.addEventListener('click', activateAddNewItemPopup); // let user introduce only decimal numbers in the value field
  // Views.valueFieldOnlyDecimalNumbers(dom.inputValue);
  // listener when user choose the type of entry (+ or -)
  // dom.inputType.addEventListener('change', e => {
  //     e.preventDefault();
  //     //change the borders of inputs
  //     Views.changeInputBorders(e.target.value);
  // });
  // Form submited
  // dom.addItemForm.addEventListener('submit', e => {
  //     e.preventDefault();
  //     const input = {
  //         type: dom.inputType.value,
  //         name: dom.inputName.value,
  //         description: dom.inputDescription.value,
  //         value: dom.inputValue.value
  //     }
  //     // create new income / expense
  //     Model.createNewEntry(input);
  //     // add event listener for the new elements inserted
  //     addEventListenersToNewListItems();
  // });

  /** Only visual looking page */

};

initApp();
controller();
addEventListenersToNewListItems();
/**************** LISTENERS CALLBACK FUNCTIONS **********************/
// activate ADD NEW ITEM POPUP

function activateAddNewItemPopup(event) {
  event.preventDefault();

  _views.default.showAddNewItemPopup(event);

  (0, _dom.refreshAddNewItemPopupDOM)();

  _views.default.allowOnlyNumbersAndMathSymbols(_dom.default.addNewItemPopup.inputValue);

  _dom.default.addNewItemPopup.inputDescription.addEventListener('input', function (e) {
    if (_dom.default.addNewItemPopup.descriptionBoxPlaceholder.style.visibility !== 'hidden') {
      _dom.default.addNewItemPopup.descriptionBoxPlaceholder.style.visibility = 'hidden';
    }
  });

  _dom.default.addNewItemPopup.radioBtns.forEach(function (radioBtn) {
    radioBtn.addEventListener('change', _views.default.selectCategory);
  });

  _dom.default.addNewItemPopup.cancelBtn.addEventListener('click', function (e) {
    e.preventDefault();

    _views.default.closeAddNewItemPopup();
  });

  _dom.default.addNewItemPopup.submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
  });

  _dom.default.addNewItemPopup.submitBtn.addEventListener('click', function (e) {
    var input = {
      type: e.currentTarget.dataset.type,
      description: _dom.default.addNewItemPopup.inputDescription.textContent,
      value: _dom.default.addNewItemPopup.inputValue.textContent
    };

    _dom.default.addNewItemPopup.radioBtns.forEach(function (radio) {
      if (radio.checked) input.name = radio.id;
    });

    console.log(input); // create new income / expense

    _model.default.createNewEntry(input); // add event listener for the new elements inserted


    addEventListenersToNewListItems(); // close popup

    _views.default.closeAddNewItemPopup();
  });
}
},{"./utils/dom.js":"utils/dom.js","./models/model.js":"models/model.js","./views/views.js":"views/views.js"}],"../../../../../.nvm/versions/node/v14.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61893" + '/');

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
},{}]},{},["../../../../../.nvm/versions/node/v14.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/bundle.js.map