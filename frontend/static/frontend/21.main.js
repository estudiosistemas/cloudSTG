(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./src/components/agencias/Agencias.js":
/*!*********************************************!*\
  !*** ./src/components/agencias/Agencias.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/auth/authContext */ \"./src/context/auth/authContext.js\");\n/* harmony import */ var _context_global_globalContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/global/globalContext */ \"./src/context/global/globalContext.js\");\n/* harmony import */ var primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primereact/inputtext */ \"./node_modules/primereact/inputtext.js\");\n/* harmony import */ var primereact_inputtext__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primereact/button */ \"./node_modules/primereact/button.js\");\n/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primereact_button__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var primereact_picklist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primereact/picklist */ \"./node_modules/primereact/picklist.js\");\n/* harmony import */ var primereact_picklist__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primereact_picklist__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _common_CoustomFunctions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/CoustomFunctions */ \"./src/components/common/CoustomFunctions.js\");\n/* harmony import */ var _hooks_useCodigoPostal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/useCodigoPostal */ \"./src/hooks/useCodigoPostal.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Agencias() {\n  //auth state\n  var authCtx = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n  var agencia = authCtx.agencia,\n      updateAgencia = authCtx.updateAgencia,\n      tokenConfig = authCtx.tokenConfig; //global state\n\n  var GlobalCtx = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_context_global_globalContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n  var showMessage = GlobalCtx.showMessage; //local state para imagen\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null),\n      _useState2 = _slicedToArray(_useState, 2),\n      selectedFile = _useState2[0],\n      setSelectedFile = _useState2[1]; // local state para picklist\n\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]),\n      _useState4 = _slicedToArray(_useState3, 2),\n      picklistSource = _useState4[0],\n      setPicklistSource = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]),\n      _useState6 = _slicedToArray(_useState5, 2),\n      picklistTarget = _useState6[0],\n      setPicklistTarget = _useState6[1];\n\n  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]),\n      _useState8 = _slicedToArray(_useState7, 2),\n      codigospostales = _useState8[0],\n      setCodigospostales = _useState8[1]; //local state para agencia\n\n\n  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({}),\n      _useState10 = _slicedToArray(_useState9, 2),\n      miAgencia = _useState10[0],\n      setmiAgencia = _useState10[1];\n\n  var nombre = miAgencia.nombre,\n      domicilio = miAgencia.domicilio,\n      codigo_postal = miAgencia.codigo_postal,\n      telefono = miAgencia.telefono,\n      porcentaje = miAgencia.porcentaje,\n      porcentaje_Bs_As = miAgencia.porcentaje_Bs_As,\n      logo = miAgencia.logo,\n      localidades = miAgencia.localidades;\n\n  var handleSubmit = function handleSubmit(e) {\n    e.preventDefault();\n\n    if (Object(_common_CoustomFunctions__WEBPACK_IMPORTED_MODULE_8__[\"isEmpty\"])(nombre) || Object(_common_CoustomFunctions__WEBPACK_IMPORTED_MODULE_8__[\"isEmpty\"])(domicilio) || picklistTarget.length == 0) {\n      showMessage({\n        msg: \"Los campos con * son obligatorios\",\n        title: \"Error\",\n        type: \"error\"\n      });\n      return;\n    }\n\n    updateAgencia(miAgencia, selectedFile);\n  };\n\n  var onChangeValue = function onChangeValue(e) {\n    setmiAgencia(_objectSpread({}, miAgencia, _defineProperty({}, e.target.name, e.target.value.toUpperCase())));\n  };\n\n  var onChangePicklist = function onChangePicklist(e) {\n    setPicklistSource(e.source);\n    setPicklistTarget(e.target);\n    setmiAgencia(_objectSpread({}, miAgencia, {\n      localidades: e.target\n    }));\n  };\n\n  var handleImageChange = function handleImageChange(e) {\n    setSelectedFile(e.target.files[0]);\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"/api/codigospostales/\", tokenConfig()).then(function (res) {\n      setCodigospostales(res.data);\n    })[\"catch\"](function (err) {\n      return console.log(err.response.statusText);\n    });\n  }, []);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    setmiAgencia({\n      id: agencia.id,\n      nombre: agencia.nombre,\n      domicilio: agencia.domicilio,\n      codigo_postal: agencia.codigo_postal.codigo,\n      telefono: agencia.telefono,\n      porcentaje: agencia.porcentaje,\n      porcentaje_Bs_As: agencia.porcentaje_Bs_As,\n      logo: agencia.logo,\n      empresa: agencia.empresa.id,\n      localidades: agencia.localidades\n    });\n  }, [agencia]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    if (codigospostales.length > 0) {\n      var disponibles = codigospostales.filter(function (cp) {\n        var ok = true;\n\n        for (var i = 0; i < localidades.length && ok; i++) {\n          var loc = localidades[i];\n          if (loc[\"codigo\"] == cp[\"codigo\"]) ok = false;\n        }\n\n        return ok;\n      });\n      setPicklistSource(disponibles);\n      setPicklistTarget(localidades);\n    }\n  }, [localidades, codigospostales]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-grid p-fluid p-justify-center\",\n    style: {\n      margin: \"30px 30px 30px 30px\"\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-col-10\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card card-w-title\",\n    style: {\n      marginLeft: \"20px\",\n      padding: \"20px 40px 20px 40px\"\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Agencia: \", agencia.nombre), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"nombre\"\n  }, \"Nombre Agencia*\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__[\"InputText\"], {\n    style: {\n      marginBottom: \"20px\"\n    },\n    placeholder: \"Nombre Agencia\",\n    id: \"nombre\",\n    type: \"text\",\n    name: \"nombre\",\n    onChange: onChangeValue,\n    value: nombre || \"\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"domicilio\"\n  }, \"Domicilio\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__[\"InputText\"], {\n    style: {\n      marginBottom: \"20px\"\n    },\n    placeholder: \"Domicilio\",\n    id: \"domicilio\",\n    type: \"text\",\n    name: \"domicilio\",\n    onChange: onChangeValue,\n    value: domicilio || \"\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-grid\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-col-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"codigo_postal\"\n  }, \"C\\xF3digo Postal\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__[\"InputText\"], {\n    style: {\n      marginBottom: \"20px\"\n    },\n    placeholder: \"C\\xF3digo Postal\",\n    id: \"codigo_postal\",\n    type: \"text\",\n    name: \"codigo_postal\",\n    onChange: onChangeValue,\n    value: codigo_postal || \"\",\n    disabled: true\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-col-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"telefono\"\n  }, \"Tel\\xE9fono\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__[\"InputText\"], {\n    style: {\n      marginBottom: \"20px\"\n    },\n    placeholder: \"Tel\\xE9fono\",\n    id: \"telefono\",\n    type: \"text\",\n    name: \"telefono\",\n    onChange: onChangeValue,\n    value: telefono || \"\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-grid\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-col-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"telefono\"\n  }, \"Porcentaje\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__[\"InputText\"], {\n    style: {\n      marginBottom: \"20px\"\n    },\n    placeholder: \"Porcentaje\",\n    id: \"porcentaje\",\n    type: \"text\",\n    name: \"porcentaje\",\n    onChange: onChangeValue,\n    value: porcentaje || \"0.00\",\n    keyfilter: \"pnum\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-col-6\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"telefono\"\n  }, \"Porcentaje Bs. As.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__[\"InputText\"], {\n    style: {\n      marginBottom: \"20px\"\n    },\n    placeholder: \"Porcentaje Bs. As.\",\n    id: \"porcentaje_Bs_As\",\n    type: \"text\",\n    name: \"porcentaje_Bs_As\",\n    onChange: onChangeValue,\n    value: porcentaje_Bs_As || \"0.00\",\n    keyfilter: \"pnum\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"asignadas\"\n  }, \"Localidades asignadas a agencia*\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_picklist__WEBPACK_IMPORTED_MODULE_7__[\"PickList\"], {\n    id: \"asignadas\",\n    source: picklistSource,\n    target: picklistTarget,\n    sourceHeader: \"Localidades\",\n    targetHeader: \"Asignadas\",\n    responsive: true,\n    showSourceControls: false,\n    showTargetControls: false,\n    itemTemplate: function itemTemplate(picklistSource) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"(\", picklistSource.codigo, \") \", picklistSource.localidad);\n    },\n    onChange: function onChange(event) {\n      onChangePicklist(event);\n    },\n    style: {\n      marginBottom: \"20px\"\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-col-12\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    htmlFor: \"logo\",\n    style: {\n      marginTop: \"1em\"\n    }\n  }, \"Logo\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"p-col-12\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: agencia ? agencia.logo : null,\n    alt: \"logo\",\n    width: \"425px\",\n    height: \"160px\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"file\",\n    id: \"logo\",\n    accept: \"image/png, image/jpeg\",\n    onChange: handleImageChange\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_button__WEBPACK_IMPORTED_MODULE_6__[\"Button\"], {\n    style: {\n      width: \"150px\",\n      \"float\": \"right\"\n    },\n    label: \"Actualizar\",\n    icon: \"pi pi-check\",\n    className: \"p-button-success\",\n    type: \"submit\"\n  }))))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Agencias);\n\n//# sourceURL=webpack:///./src/components/agencias/Agencias.js?");

/***/ }),

/***/ "./src/hooks/useCodigoPostal.js":
/*!**************************************!*\
  !*** ./src/hooks/useCodigoPostal.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var primereact_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primereact/dropdown */ \"./node_modules/primereact/dropdown.js\");\n/* harmony import */ var primereact_dropdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(primereact_dropdown__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/auth/authContext */ \"./src/context/auth/authContext.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\nvar useCodigoPostal = function useCodigoPostal(stateInicial) {\n  //state del hook\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(stateInicial),\n      _useState2 = _slicedToArray(_useState, 2),\n      state = _useState2[0],\n      actualizarState = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]),\n      _useState4 = _slicedToArray(_useState3, 2),\n      cpList = _useState4[0],\n      setCPList = _useState4[1]; //auth state\n\n\n  var authCtx = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n  var tokenConfig = authCtx.tokenConfig;\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(\"/api/codigospostales/\", tokenConfig()).then(function (res) {\n      setCPList(res.data);\n    })[\"catch\"](function (err) {\n      return console.log(err.response);\n    });\n  }, []);\n\n  var miItemTemplate = function miItemTemplate(option) {\n    return \"(\".concat(option.codigo, \") \").concat(option.localidad);\n  };\n\n  var Seleccionar = function Seleccionar() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(primereact_dropdown__WEBPACK_IMPORTED_MODULE_2__[\"Dropdown\"], {\n      style: {\n        width: \"100%\"\n      },\n      autoWidth: true,\n      value: state,\n      options: cpList,\n      itemTemplate: miItemTemplate,\n      optionLabel: \"localidad\",\n      onChange: function onChange(e) {\n        actualizarState(e.value);\n      },\n      filter: true,\n      filterPlaceholder: \"Buscar...\",\n      filterBy: \"label\",\n      placeholder: \"Seleccione Localidad\"\n    });\n  };\n\n  return [state, Seleccionar, actualizarState];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useCodigoPostal);\n\n//# sourceURL=webpack:///./src/hooks/useCodigoPostal.js?");

/***/ })

}]);