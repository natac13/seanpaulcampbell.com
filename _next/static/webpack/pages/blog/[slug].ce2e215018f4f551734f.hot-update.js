webpackHotUpdate_N_E("pages/blog/[slug]",{

/***/ "./components/BlogBody.tsx":
/*!*********************************!*\
  !*** ./components/BlogBody.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"./node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! remark-gfm */ \"./node_modules/remark-gfm/index.js\");\n/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(remark_gfm__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! remark-unwrap-images */ \"./node_modules/remark-unwrap-images/index.js\");\n/* harmony import */ var remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _BlogCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BlogCode */ \"./components/BlogCode.tsx\");\n/* harmony import */ var _BlogImage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BlogImage */ \"./components/BlogImage.tsx\");\n/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Link */ \"./node_modules/@material-ui/core/Link/index.js\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/styles/index.js\");\n\n\nvar _jsxFileName = \"/home/natac/projects/seanpaulcampbell.com/components/BlogBody.tsx\",\n    _this = undefined;\n\n\n\n\n\n\n\n\n\nvar StyledLink = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__[\"experimentalStyled\"])(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(function (_ref) {\n  var theme = _ref.theme;\n  return \"\\n  color: \".concat(theme.palette.error.main, \";\\n  '&:visited' {\\n    color: \").concat(theme.palette.primary.dark, \" !important;\\n  }\");\n});\n\nvar BlogBody = function BlogBody(props) {\n  var content = props.content;\n  return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_markdown__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    plugins: [remark_gfm__WEBPACK_IMPORTED_MODULE_3___default.a, remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4___default.a],\n    renderers: {\n      code: _BlogCode__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n      image: _BlogImage__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n      link: StyledLink\n    },\n    children: content\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 27,\n    columnNumber: 5\n  }, _this);\n};\n\n_c = BlogBody;\n/* harmony default export */ __webpack_exports__[\"default\"] = (BlogBody);\n\nvar _c;\n\n$RefreshReg$(_c, \"BlogBody\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/next/node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9CbG9nQm9keS50c3g/ZDc2NCJdLCJuYW1lcyI6WyJTdHlsZWRMaW5rIiwiZXhwZXJpbWVudGFsU3R5bGVkIiwiTGluayIsInRoZW1lIiwicGFsZXR0ZSIsImVycm9yIiwibWFpbiIsInByaW1hcnkiLCJkYXJrIiwiQmxvZ0JvZHkiLCJwcm9wcyIsImNvbnRlbnQiLCJnZm0iLCJydWkiLCJjb2RlIiwiQ29kZSIsImltYWdlIiwiSW1hZ2UiLCJsaW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQU1BLElBQU1BLFVBQVUsR0FBR0MsbUZBQWtCLENBQUNDLDhEQUFELENBQWxCLENBQ2pCO0FBQUEsTUFBR0MsS0FBSCxRQUFHQSxLQUFIO0FBQUEsOEJBQ1NBLEtBQUssQ0FBQ0MsT0FBTixDQUFjQyxLQUFkLENBQW9CQyxJQUQ3Qiw0Q0FHV0gsS0FBSyxDQUFDQyxPQUFOLENBQWNHLE9BQWQsQ0FBc0JDLElBSGpDO0FBQUEsQ0FEaUIsQ0FBbkI7O0FBUUEsSUFBTUMsUUFBeUIsR0FBRyxTQUE1QkEsUUFBNEIsQ0FBQ0MsS0FBRCxFQUFrQjtBQUFBLE1BQzFDQyxPQUQwQyxHQUM5QkQsS0FEOEIsQ0FDMUNDLE9BRDBDO0FBR2xELFNBQ0UsOEVBQUMscURBQUQ7QUFDRSxXQUFPLEVBQUUsQ0FBQ0MsaURBQUQsRUFBTUMsMkRBQU4sQ0FEWDtBQUVFLGFBQVMsRUFBRTtBQUNUQyxVQUFJLEVBQUVDLGlEQURHO0FBRVRDLFdBQUssRUFBRUMsa0RBRkU7QUFHVEMsVUFBSSxFQUFFbEI7QUFIRyxLQUZiO0FBQUEsY0FRR1c7QUFSSDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUFZRCxDQWZEOztLQUFNRixRO0FBaUJTQSx1RUFBZiIsImZpbGUiOiIuL2NvbXBvbmVudHMvQmxvZ0JvZHkudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0TWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nXG5pbXBvcnQgZ2ZtIGZyb20gJ3JlbWFyay1nZm0nXG5pbXBvcnQgcnVpIGZyb20gJ3JlbWFyay11bndyYXAtaW1hZ2VzJ1xuaW1wb3J0IENvZGUgZnJvbSAnLi9CbG9nQ29kZSdcbmltcG9ydCBJbWFnZSBmcm9tICcuL0Jsb2dJbWFnZSdcbmltcG9ydCBMaW5rIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0xpbmsnXG5pbXBvcnQgTmV4dExpbmsgZnJvbSAnbmV4dC9saW5rJ1xuaW1wb3J0IHsgZXhwZXJpbWVudGFsU3R5bGVkIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJ1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBjb250ZW50OiBzdHJpbmdcbn1cblxuY29uc3QgU3R5bGVkTGluayA9IGV4cGVyaW1lbnRhbFN0eWxlZChMaW5rKShcbiAgKHsgdGhlbWUgfSkgPT4gYFxuICBjb2xvcjogJHt0aGVtZS5wYWxldHRlLmVycm9yLm1haW59O1xuICAnJjp2aXNpdGVkJyB7XG4gICAgY29sb3I6ICR7dGhlbWUucGFsZXR0ZS5wcmltYXJ5LmRhcmt9ICFpbXBvcnRhbnQ7XG4gIH1gXG4pXG5cbmNvbnN0IEJsb2dCb2R5OiBSZWFjdC5GQzxQcm9wcz4gPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gIGNvbnN0IHsgY29udGVudCB9ID0gcHJvcHNcblxuICByZXR1cm4gKFxuICAgIDxSZWFjdE1hcmtkb3duXG4gICAgICBwbHVnaW5zPXtbZ2ZtLCBydWldfVxuICAgICAgcmVuZGVyZXJzPXt7XG4gICAgICAgIGNvZGU6IENvZGUsXG4gICAgICAgIGltYWdlOiBJbWFnZSxcbiAgICAgICAgbGluazogU3R5bGVkTGluayxcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NvbnRlbnR9XG4gICAgPC9SZWFjdE1hcmtkb3duPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2dCb2R5XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/BlogBody.tsx\n");

/***/ })

})