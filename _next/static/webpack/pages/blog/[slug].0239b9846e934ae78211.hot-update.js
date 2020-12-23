webpackHotUpdate_N_E("pages/blog/[slug]",{

/***/ "./components/BlogBody.tsx":
/*!*********************************!*\
  !*** ./components/BlogBody.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"./node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-markdown */ \"./node_modules/react-markdown/lib/react-markdown.js\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_markdown__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! remark-gfm */ \"./node_modules/remark-gfm/index.js\");\n/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(remark_gfm__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! remark-unwrap-images */ \"./node_modules/remark-unwrap-images/index.js\");\n/* harmony import */ var remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var remark_autolink_headings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! remark-autolink-headings */ \"./node_modules/remark-autolink-headings/src/index.js\");\n/* harmony import */ var _BlogCode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BlogCode */ \"./components/BlogCode.tsx\");\n/* harmony import */ var _BlogImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BlogImage */ \"./components/BlogImage.tsx\");\n/* harmony import */ var _BlogLink__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BlogLink */ \"./components/BlogLink.tsx\");\n\n\nvar _jsxFileName = \"/home/natac/projects/seanpaulcampbell.com/components/BlogBody.tsx\",\n    _this = undefined;\n\n\n\n\n\n\n\n\n\n\nvar BlogBody = function BlogBody(props) {\n  var content = props.content;\n  return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_markdown__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    plugins: [remark_gfm__WEBPACK_IMPORTED_MODULE_3___default.a, remark_unwrap_images__WEBPACK_IMPORTED_MODULE_4___default.a, remark_autolink_headings__WEBPACK_IMPORTED_MODULE_5__[\"default\"]],\n    renderers: {\n      code: _BlogCode__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n      image: _BlogImage__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n      imageReference: _BlogImage__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n      link: _BlogLink__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n      linkReference: _BlogLink__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n    },\n    children: content\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 18,\n    columnNumber: 5\n  }, _this);\n};\n\n_c = BlogBody;\n/* harmony default export */ __webpack_exports__[\"default\"] = (BlogBody);\n\nvar _c;\n\n$RefreshReg$(_c, \"BlogBody\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/next/node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9CbG9nQm9keS50c3g/ZDc2NCJdLCJuYW1lcyI6WyJCbG9nQm9keSIsInByb3BzIiwiY29udGVudCIsImdmbSIsInJ1aSIsInJhaCIsImNvZGUiLCJDb2RlIiwiaW1hZ2UiLCJJbWFnZSIsImltYWdlUmVmZXJlbmNlIiwibGluayIsIkJsb2dMaW5rIiwibGlua1JlZmVyZW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBTUEsSUFBTUEsUUFBeUIsR0FBRyxTQUE1QkEsUUFBNEIsQ0FBQ0MsS0FBRCxFQUFrQjtBQUFBLE1BQzFDQyxPQUQwQyxHQUM5QkQsS0FEOEIsQ0FDMUNDLE9BRDBDO0FBR2xELFNBQ0UsOEVBQUMscURBQUQ7QUFDRSxXQUFPLEVBQUUsQ0FBQ0MsaURBQUQsRUFBTUMsMkRBQU4sRUFBV0MsZ0VBQVgsQ0FEWDtBQUVFLGFBQVMsRUFBRTtBQUNUQyxVQUFJLEVBQUVDLGlEQURHO0FBRVRDLFdBQUssRUFBRUMsa0RBRkU7QUFHVEMsb0JBQWMsRUFBRUQsa0RBSFA7QUFJVEUsVUFBSSxFQUFFQyxpREFKRztBQUtUQyxtQkFBYSxFQUFFRCxpREFBUUE7QUFMZCxLQUZiO0FBQUEsY0FVR1Y7QUFWSDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUFjRCxDQWpCRDs7S0FBTUYsUTtBQW1CU0EsdUVBQWYiLCJmaWxlIjoiLi9jb21wb25lbnRzL0Jsb2dCb2R5LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdE1hcmtkb3duIGZyb20gJ3JlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IGdmbSBmcm9tICdyZW1hcmstZ2ZtJ1xuaW1wb3J0IHJ1aSBmcm9tICdyZW1hcmstdW53cmFwLWltYWdlcydcbmltcG9ydCByYWggZnJvbSAncmVtYXJrLWF1dG9saW5rLWhlYWRpbmdzJ1xuaW1wb3J0IENvZGUgZnJvbSAnLi9CbG9nQ29kZSdcbmltcG9ydCBJbWFnZSBmcm9tICcuL0Jsb2dJbWFnZSdcbmltcG9ydCBCbG9nTGluayBmcm9tICcuL0Jsb2dMaW5rJ1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBjb250ZW50OiBzdHJpbmdcbn1cblxuY29uc3QgQmxvZ0JvZHk6IFJlYWN0LkZDPFByb3BzPiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgY29uc3QgeyBjb250ZW50IH0gPSBwcm9wc1xuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0TWFya2Rvd25cbiAgICAgIHBsdWdpbnM9e1tnZm0sIHJ1aSwgcmFoXX1cbiAgICAgIHJlbmRlcmVycz17e1xuICAgICAgICBjb2RlOiBDb2RlLFxuICAgICAgICBpbWFnZTogSW1hZ2UsXG4gICAgICAgIGltYWdlUmVmZXJlbmNlOiBJbWFnZSxcbiAgICAgICAgbGluazogQmxvZ0xpbmssXG4gICAgICAgIGxpbmtSZWZlcmVuY2U6IEJsb2dMaW5rLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Y29udGVudH1cbiAgICA8L1JlYWN0TWFya2Rvd24+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvZ0JvZHlcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/BlogBody.tsx\n");

/***/ }),

/***/ "./node_modules/remark-autolink-headings/src/index.js":
/*!************************************************************!*\
  !*** ./node_modules/remark-autolink-headings/src/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return attacher; });\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-visit */ \"./node_modules/unist-util-visit/index.js\");\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(unist_util_visit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst behaviors = {prepend: 'unshift', append: 'push'}\n\nconst contentDefaults = {\n  type: 'element',\n  tagName: 'span',\n  properties: {className: ['icon', 'icon-link']},\n  children: []\n}\n\nconst defaults = {behavior: 'prepend', content: contentDefaults}\n\nconst splice = [].splice\n\nlet deprecationWarningIssued = false\n\nfunction attacher(options = {}) {\n  let {linkProperties, behavior, content, group} = {...defaults, ...options}\n  let method\n\n  // NOTE: Remove in next major version\n  if (options.behaviour !== undefined) {\n    if (!deprecationWarningIssued) {\n      deprecationWarningIssued = true\n      console.warn(\n        '[remark-autolink-headings] Deprecation Warning: `behaviour` is a nonstandard option. Use `behavior` instead.'\n      )\n    }\n\n    behavior = options.behaviour\n  }\n\n  if (behavior === 'wrap') {\n    method = wrap\n  } else if (behavior === 'before' || behavior === 'after') {\n    method = around\n  } else {\n    method = inject\n\n    if (!linkProperties) {\n      linkProperties = {ariaHidden: 'true', tabIndex: -1}\n    }\n  }\n\n  return (tree) => unist_util_visit__WEBPACK_IMPORTED_MODULE_0___default()(tree, 'heading', visitor)\n\n  function visitor(node, index, parent) {\n    const {data} = node\n    const id = data && data.hProperties && data.hProperties.id\n\n    if (id) {\n      return method(node, '#' + id, index, parent)\n    }\n  }\n\n  function inject(node, url) {\n    const link = create(url)\n\n    link.data = {\n      hProperties: toProps(linkProperties),\n      hChildren: toChildren(content, node)\n    }\n\n    node.children[behaviors[behavior]](link)\n  }\n\n  function around(node, url, index, parent) {\n    const link = create(url)\n    const grouping = group ? toGrouping(group, node) : undefined\n\n    link.data = {\n      hProperties: toProps(linkProperties),\n      hChildren: toChildren(content, node)\n    }\n\n    let nodes = behavior === 'before' ? [link, node] : [node, link]\n\n    if (grouping) {\n      grouping.children = nodes\n      nodes = grouping\n    }\n\n    splice.apply(parent.children, [index, 1].concat(nodes))\n\n    return [unist_util_visit__WEBPACK_IMPORTED_MODULE_0___default.a.SKIP, index + nodes.length]\n  }\n\n  function wrap(node, url) {\n    const link = create(url, node.children)\n\n    link.data = {hProperties: toProps(linkProperties)}\n\n    node.children = [link]\n  }\n\n  function toProps(value) {\n    return deepAssign({}, value)\n  }\n\n  function toNode(value, node) {\n    return typeof value === 'function' ? value(node) : value\n  }\n\n  function toChildren(value, node) {\n    let children = toNode(value, node)\n\n    children = Array.isArray(children) ? children : [children]\n\n    return typeof value === 'function' ? children : deepAssign([], children)\n  }\n\n  function toGrouping(value, node) {\n    const grouping = toNode(value, node)\n    const hName = grouping.tagName\n    const hProperties = grouping.properties\n\n    return {\n      type: 'heading-group',\n      data: {\n        hName,\n        hProperties:\n          typeof value === 'function'\n            ? deepAssign({}, hProperties)\n            : hProperties\n      },\n      children: []\n    }\n  }\n\n  function create(url, children) {\n    return {\n      type: 'link',\n      url,\n      title: null,\n      children: children || []\n    }\n  }\n\n  function deepAssign(base, value) {\n    return extend__WEBPACK_IMPORTED_MODULE_1___default()(true, base, value)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL3JlbWFyay1hdXRvbGluay1oZWFkaW5ncy9zcmMvaW5kZXguanM/NzIyZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0M7QUFDVDs7QUFFM0IsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlDQUFpQztBQUNoRDtBQUNBOztBQUVBLGtCQUFrQjs7QUFFbEI7O0FBRUE7O0FBRWUsOEJBQThCO0FBQzdDLE9BQU8seUNBQXlDLElBQUk7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQSxtQkFBbUIsdURBQUs7O0FBRXhCO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsWUFBWSx1REFBSztBQUNqQjs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsNkNBQU07QUFDakI7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9yZW1hcmstYXV0b2xpbmstaGVhZGluZ3Mvc3JjL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHZpc2l0IGZyb20gJ3VuaXN0LXV0aWwtdmlzaXQnXG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2V4dGVuZCdcblxuY29uc3QgYmVoYXZpb3JzID0ge3ByZXBlbmQ6ICd1bnNoaWZ0JywgYXBwZW5kOiAncHVzaCd9XG5cbmNvbnN0IGNvbnRlbnREZWZhdWx0cyA9IHtcbiAgdHlwZTogJ2VsZW1lbnQnLFxuICB0YWdOYW1lOiAnc3BhbicsXG4gIHByb3BlcnRpZXM6IHtjbGFzc05hbWU6IFsnaWNvbicsICdpY29uLWxpbmsnXX0sXG4gIGNoaWxkcmVuOiBbXVxufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtiZWhhdmlvcjogJ3ByZXBlbmQnLCBjb250ZW50OiBjb250ZW50RGVmYXVsdHN9XG5cbmNvbnN0IHNwbGljZSA9IFtdLnNwbGljZVxuXG5sZXQgZGVwcmVjYXRpb25XYXJuaW5nSXNzdWVkID0gZmFsc2VcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0YWNoZXIob3B0aW9ucyA9IHt9KSB7XG4gIGxldCB7bGlua1Byb3BlcnRpZXMsIGJlaGF2aW9yLCBjb250ZW50LCBncm91cH0gPSB7Li4uZGVmYXVsdHMsIC4uLm9wdGlvbnN9XG4gIGxldCBtZXRob2RcblxuICAvLyBOT1RFOiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uXG4gIGlmIChvcHRpb25zLmJlaGF2aW91ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFkZXByZWNhdGlvbldhcm5pbmdJc3N1ZWQpIHtcbiAgICAgIGRlcHJlY2F0aW9uV2FybmluZ0lzc3VlZCA9IHRydWVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1tyZW1hcmstYXV0b2xpbmstaGVhZGluZ3NdIERlcHJlY2F0aW9uIFdhcm5pbmc6IGBiZWhhdmlvdXJgIGlzIGEgbm9uc3RhbmRhcmQgb3B0aW9uLiBVc2UgYGJlaGF2aW9yYCBpbnN0ZWFkLidcbiAgICAgIClcbiAgICB9XG5cbiAgICBiZWhhdmlvciA9IG9wdGlvbnMuYmVoYXZpb3VyXG4gIH1cblxuICBpZiAoYmVoYXZpb3IgPT09ICd3cmFwJykge1xuICAgIG1ldGhvZCA9IHdyYXBcbiAgfSBlbHNlIGlmIChiZWhhdmlvciA9PT0gJ2JlZm9yZScgfHwgYmVoYXZpb3IgPT09ICdhZnRlcicpIHtcbiAgICBtZXRob2QgPSBhcm91bmRcbiAgfSBlbHNlIHtcbiAgICBtZXRob2QgPSBpbmplY3RcblxuICAgIGlmICghbGlua1Byb3BlcnRpZXMpIHtcbiAgICAgIGxpbmtQcm9wZXJ0aWVzID0ge2FyaWFIaWRkZW46ICd0cnVlJywgdGFiSW5kZXg6IC0xfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAodHJlZSkgPT4gdmlzaXQodHJlZSwgJ2hlYWRpbmcnLCB2aXNpdG9yKVxuXG4gIGZ1bmN0aW9uIHZpc2l0b3Iobm9kZSwgaW5kZXgsIHBhcmVudCkge1xuICAgIGNvbnN0IHtkYXRhfSA9IG5vZGVcbiAgICBjb25zdCBpZCA9IGRhdGEgJiYgZGF0YS5oUHJvcGVydGllcyAmJiBkYXRhLmhQcm9wZXJ0aWVzLmlkXG5cbiAgICBpZiAoaWQpIHtcbiAgICAgIHJldHVybiBtZXRob2Qobm9kZSwgJyMnICsgaWQsIGluZGV4LCBwYXJlbnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5qZWN0KG5vZGUsIHVybCkge1xuICAgIGNvbnN0IGxpbmsgPSBjcmVhdGUodXJsKVxuXG4gICAgbGluay5kYXRhID0ge1xuICAgICAgaFByb3BlcnRpZXM6IHRvUHJvcHMobGlua1Byb3BlcnRpZXMpLFxuICAgICAgaENoaWxkcmVuOiB0b0NoaWxkcmVuKGNvbnRlbnQsIG5vZGUpXG4gICAgfVxuXG4gICAgbm9kZS5jaGlsZHJlbltiZWhhdmlvcnNbYmVoYXZpb3JdXShsaW5rKVxuICB9XG5cbiAgZnVuY3Rpb24gYXJvdW5kKG5vZGUsIHVybCwgaW5kZXgsIHBhcmVudCkge1xuICAgIGNvbnN0IGxpbmsgPSBjcmVhdGUodXJsKVxuICAgIGNvbnN0IGdyb3VwaW5nID0gZ3JvdXAgPyB0b0dyb3VwaW5nKGdyb3VwLCBub2RlKSA6IHVuZGVmaW5lZFxuXG4gICAgbGluay5kYXRhID0ge1xuICAgICAgaFByb3BlcnRpZXM6IHRvUHJvcHMobGlua1Byb3BlcnRpZXMpLFxuICAgICAgaENoaWxkcmVuOiB0b0NoaWxkcmVuKGNvbnRlbnQsIG5vZGUpXG4gICAgfVxuXG4gICAgbGV0IG5vZGVzID0gYmVoYXZpb3IgPT09ICdiZWZvcmUnID8gW2xpbmssIG5vZGVdIDogW25vZGUsIGxpbmtdXG5cbiAgICBpZiAoZ3JvdXBpbmcpIHtcbiAgICAgIGdyb3VwaW5nLmNoaWxkcmVuID0gbm9kZXNcbiAgICAgIG5vZGVzID0gZ3JvdXBpbmdcbiAgICB9XG5cbiAgICBzcGxpY2UuYXBwbHkocGFyZW50LmNoaWxkcmVuLCBbaW5kZXgsIDFdLmNvbmNhdChub2RlcykpXG5cbiAgICByZXR1cm4gW3Zpc2l0LlNLSVAsIGluZGV4ICsgbm9kZXMubGVuZ3RoXVxuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChub2RlLCB1cmwpIHtcbiAgICBjb25zdCBsaW5rID0gY3JlYXRlKHVybCwgbm9kZS5jaGlsZHJlbilcblxuICAgIGxpbmsuZGF0YSA9IHtoUHJvcGVydGllczogdG9Qcm9wcyhsaW5rUHJvcGVydGllcyl9XG5cbiAgICBub2RlLmNoaWxkcmVuID0gW2xpbmtdXG4gIH1cblxuICBmdW5jdGlvbiB0b1Byb3BzKHZhbHVlKSB7XG4gICAgcmV0dXJuIGRlZXBBc3NpZ24oe30sIHZhbHVlKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9Ob2RlKHZhbHVlLCBub2RlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlKG5vZGUpIDogdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvQ2hpbGRyZW4odmFsdWUsIG5vZGUpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSB0b05vZGUodmFsdWUsIG5vZGUpXG5cbiAgICBjaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW4gOiBbY2hpbGRyZW5dXG5cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gY2hpbGRyZW4gOiBkZWVwQXNzaWduKFtdLCBjaGlsZHJlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvR3JvdXBpbmcodmFsdWUsIG5vZGUpIHtcbiAgICBjb25zdCBncm91cGluZyA9IHRvTm9kZSh2YWx1ZSwgbm9kZSlcbiAgICBjb25zdCBoTmFtZSA9IGdyb3VwaW5nLnRhZ05hbWVcbiAgICBjb25zdCBoUHJvcGVydGllcyA9IGdyb3VwaW5nLnByb3BlcnRpZXNcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnaGVhZGluZy1ncm91cCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGhOYW1lLFxuICAgICAgICBoUHJvcGVydGllczpcbiAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gZGVlcEFzc2lnbih7fSwgaFByb3BlcnRpZXMpXG4gICAgICAgICAgICA6IGhQcm9wZXJ0aWVzXG4gICAgICB9LFxuICAgICAgY2hpbGRyZW46IFtdXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlKHVybCwgY2hpbGRyZW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2xpbmsnLFxuICAgICAgdXJsLFxuICAgICAgdGl0bGU6IG51bGwsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4gfHwgW11cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWVwQXNzaWduKGJhc2UsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGV4dGVuZCh0cnVlLCBiYXNlLCB2YWx1ZSlcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/remark-autolink-headings/src/index.js\n");

/***/ })

})