webpackHotUpdate_N_E("pages/blog/[slug]",{

/***/ "./pages/blog/[slug].tsx":
/*!*******************************!*\
  !*** ./pages/blog/[slug].tsx ***!
  \*******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"./node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/dist/client/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/error */ \"./node_modules/next/error.js\");\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_BlogLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/BlogLayout */ \"./components/BlogLayout.tsx\");\n/* harmony import */ var _components_BlogBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/BlogBody */ \"./components/BlogBody.tsx\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/index.js\");\n/* harmony import */ var _components_DateFormatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/DateFormatter */ \"./components/DateFormatter.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_8__);\n\n\nvar _jsxFileName = \"/home/natac/projects/seanpaulcampbell.com/pages/blog/[slug].tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nvar Post = function Post(_ref) {\n  _s();\n\n  var post = _ref.post,\n      morePosts = _ref.morePosts,\n      preview = _ref.preview;\n  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__[\"useRouter\"])();\n\n  if (!router.isFallback && !(post === null || post === void 0 ? void 0 : post.slug)) {\n    return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_error__WEBPACK_IMPORTED_MODULE_3___default.a, {\n      statusCode: 404\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 12\n    }, _this);\n  }\n\n  return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_BlogLayout__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: \"header\",\n      sx: {\n        gridColumn: '1 / -1',\n        placeSelf: 'center center',\n        textAlign: 'center',\n        my: 2\n      },\n      children: Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n        variant: \"h1\",\n        children: post.title\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 34,\n        columnNumber: 9\n      }, _this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 25,\n      columnNumber: 7\n    }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: \"div\",\n      sx: {\n        gridColumn: '1 / -1',\n        width: '80%',\n        placeSelf: 'center center',\n        textAlign: 'center',\n        my: 2\n      },\n      children: Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_image__WEBPACK_IMPORTED_MODULE_8___default.a, {\n        src: post.coverImage,\n        alt: post.title,\n        layout: \"fill\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 46,\n        columnNumber: 9\n      }, _this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 7\n    }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Paper\"],\n      sx: {\n        display: 'flex',\n        gap: function gap(theme) {\n          return theme.spacing(1);\n        },\n        flexDirection: 'column',\n        py: 1,\n        px: 2\n      },\n      children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n        sx: {\n          display: 'flex',\n          gap: function gap(theme) {\n            return theme.spacing(1);\n          }\n        },\n        children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_DateFormatter__WEBPACK_IMPORTED_MODULE_7__[\"DateFormatter\"], {\n          dateString: post.date\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 59,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"subtitle1\",\n          color: \"textSecondary\",\n          children: \"-\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 60,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"subtitle1\",\n          color: \"textSecondary\",\n          children: post.readTime\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 63,\n          columnNumber: 11\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 58,\n        columnNumber: 9\n      }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n        sx: {\n          display: 'flex',\n          gap: function gap(theme) {\n            return theme.spacing(2);\n          },\n          alignItems: 'center'\n        },\n        children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n          component: _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Avatar\"],\n          alt: post.author.name,\n          src: post.author.picture,\n          sx: {\n            width: function width(theme) {\n              return theme.spacing(8);\n            },\n            height: function height(theme) {\n              return theme.spacing(8);\n            }\n          }\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 78,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"h5\",\n          component: \"h2\",\n          children: post.author.name\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 87,\n          columnNumber: 11\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 71,\n        columnNumber: 9\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 48,\n      columnNumber: 7\n    }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_BlogBody__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      content: post.content\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 92,\n      columnNumber: 7\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 24,\n    columnNumber: 5\n  }, _this);\n};\n\n_s(Post, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function () {\n  return [next_router__WEBPACK_IMPORTED_MODULE_2__[\"useRouter\"]];\n});\n\n_c = Post;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Post);\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/next/node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYmxvZy9bc2x1Z10udHN4P2FkZjkiXSwibmFtZXMiOlsiUG9zdCIsInBvc3QiLCJtb3JlUG9zdHMiLCJwcmV2aWV3Iiwicm91dGVyIiwidXNlUm91dGVyIiwiaXNGYWxsYmFjayIsInNsdWciLCJncmlkQ29sdW1uIiwicGxhY2VTZWxmIiwidGV4dEFsaWduIiwibXkiLCJ0aXRsZSIsIndpZHRoIiwiY292ZXJJbWFnZSIsIlBhcGVyIiwiZGlzcGxheSIsImdhcCIsInRoZW1lIiwic3BhY2luZyIsImZsZXhEaXJlY3Rpb24iLCJweSIsInB4IiwiZGF0ZSIsInJlYWRUaW1lIiwiYWxpZ25JdGVtcyIsIkF2YXRhciIsImF1dGhvciIsIm5hbWUiLCJwaWN0dXJlIiwiaGVpZ2h0IiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFRQSxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxPQUF5QztBQUFBOztBQUFBLE1BQXRDQyxJQUFzQyxRQUF0Q0EsSUFBc0M7QUFBQSxNQUFoQ0MsU0FBZ0MsUUFBaENBLFNBQWdDO0FBQUEsTUFBckJDLE9BQXFCLFFBQXJCQSxPQUFxQjtBQUNwRCxNQUFNQyxNQUFNLEdBQUdDLDZEQUFTLEVBQXhCOztBQUNBLE1BQUksQ0FBQ0QsTUFBTSxDQUFDRSxVQUFSLElBQXNCLEVBQUNMLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFTSxJQUFQLENBQTFCLEVBQXVDO0FBQ3JDLFdBQU8sOEVBQUMsaURBQUQ7QUFBVyxnQkFBVSxFQUFFO0FBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBUDtBQUNEOztBQUNELFNBQ0UsOEVBQUMsOERBQUQ7QUFBQSxlQUNFLDhFQUFDLHFEQUFEO0FBQ0UsZUFBUyxFQUFDLFFBRFo7QUFFRSxRQUFFLEVBQUU7QUFDRkMsa0JBQVUsRUFBRSxRQURW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LG9CQUNHbEIsSUFBSSxDQUFDMEIsTUFBTCxDQUFZQztBQURmO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBaEJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUF4QkYsRUFvRUUsOEVBQUMsNERBQUQ7QUFBVSxhQUFPLEVBQUUzQixJQUFJLENBQUM4QjtBQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBcEVGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBd0VELENBN0VEOztHQUFNL0IsSTtVQUNXSyxxRDs7O0tBRFhMLEk7O0FBK0VTQSxtRUFBZiIsImZpbGUiOiIuL3BhZ2VzL2Jsb2cvW3NsdWddLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICduZXh0L2Vycm9yJ1xuaW1wb3J0IHsgZ2V0UG9zdEJ5U2x1ZywgZ2V0QWxsUG9zdHMgfSBmcm9tICcuLi8uLi9saWIvcG9zdHMnXG5pbXBvcnQgQmxvZ1Bvc3QgZnJvbSAnLi4vLi4vdHlwZXMvcG9zdCdcbmltcG9ydCBCbG9nTGF5b3V0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQmxvZ0xheW91dCdcbmltcG9ydCBCbG9nQm9keSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0Jsb2dCb2R5J1xuaW1wb3J0IHsgQXZhdGFyLCBCb3gsIFR5cG9ncmFwaHksIFBhcGVyIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnXG5pbXBvcnQgeyBEYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9EYXRlRm9ybWF0dGVyJ1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnXG5cbnR5cGUgUHJvcHMgPSB7XG4gIHBvc3Q6IEJsb2dQb3N0XG4gIG1vcmVQb3N0czogQmxvZ1Bvc3RbXVxuICBwcmV2aWV3PzogYm9vbGVhblxufVxuXG5jb25zdCBQb3N0ID0gKHsgcG9zdCwgbW9yZVBvc3RzLCBwcmV2aWV3IH06IFByb3BzKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG4gIGlmICghcm91dGVyLmlzRmFsbGJhY2sgJiYgIXBvc3Q/LnNsdWcpIHtcbiAgICByZXR1cm4gPEVycm9yUGFnZSBzdGF0dXNDb2RlPXs0MDR9IC8+XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8QmxvZ0xheW91dD5cbiAgICAgIDxCb3hcbiAgICAgICAgY29tcG9uZW50PVwiaGVhZGVyXCJcbiAgICAgICAgc3g9e3tcbiAgICAgICAgICBncmlkQ29sdW1uOiAnMSAvIC0xJyxcbiAgICAgICAgICBwbGFjZVNlbGY6ICdjZW50ZXIgY2VudGVyJyxcbiAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgIG15OiAyLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDFcIj57cG9zdC50aXRsZX08L1R5cG9ncmFwaHk+XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3hcbiAgICAgICAgY29tcG9uZW50PVwiZGl2XCJcbiAgICAgICAgc3g9e3tcbiAgICAgICAgICBncmlkQ29sdW1uOiAnMSAvIC0xJyxcbiAgICAgICAgICB3aWR0aDogJzgwJScsXG4gICAgICAgICAgcGxhY2VTZWxmOiAnY2VudGVyIGNlbnRlcicsXG4gICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICBteTogMixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEltYWdlIHNyYz17cG9zdC5jb3ZlckltYWdlfSBhbHQ9e3Bvc3QudGl0bGV9IGxheW91dD1cImZpbGxcIiAvPlxuICAgICAgPC9Cb3g+XG4gICAgICA8Qm94XG4gICAgICAgIGNvbXBvbmVudD17UGFwZXJ9XG4gICAgICAgIHN4PXt7XG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGdhcDogKHRoZW1lKSA9PiB0aGVtZS5zcGFjaW5nKDEpLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgIHB5OiAxLFxuICAgICAgICAgIHB4OiAyLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8Qm94IHN4PXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAodGhlbWUpID0+IHRoZW1lLnNwYWNpbmcoMSkgfX0+XG4gICAgICAgICAgPERhdGVGb3JtYXR0ZXIgZGF0ZVN0cmluZz17cG9zdC5kYXRlfSAvPlxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJzdWJ0aXRsZTFcIiBjb2xvcj1cInRleHRTZWNvbmRhcnlcIj5cbiAgICAgICAgICAgIC1cbiAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cInN1YnRpdGxlMVwiIGNvbG9yPVwidGV4dFNlY29uZGFyeVwiPlxuICAgICAgICAgICAge3Bvc3QucmVhZFRpbWV9XG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgIHsvKiA8VHlwb2dyYXBoeSAqL31cbiAgICAgICAgICB7LyogICB2YXJpYW50PVwic3VidGl0bGUxXCIgKi99XG4gICAgICAgICAgey8qICAgY29sb3I9XCJ0ZXh0U2Vjb25kYXJ5XCIgKi99XG4gICAgICAgICAgey8qID57YFdvcmQgQ291bnQ6ICR7cG9zdC53b3JkQ291bnR9YH08L1R5cG9ncmFwaHk+ICovfVxuICAgICAgICA8L0JveD5cbiAgICAgICAgPEJveFxuICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBnYXA6ICh0aGVtZSkgPT4gdGhlbWUuc3BhY2luZygyKSxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBjb21wb25lbnQ9e0F2YXRhcn1cbiAgICAgICAgICAgIGFsdD17cG9zdC5hdXRob3IubmFtZX1cbiAgICAgICAgICAgIHNyYz17cG9zdC5hdXRob3IucGljdHVyZX1cbiAgICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICAgIHdpZHRoOiAodGhlbWUpID0+IHRoZW1lLnNwYWNpbmcoOCksXG4gICAgICAgICAgICAgIGhlaWdodDogKHRoZW1lKSA9PiB0aGVtZS5zcGFjaW5nKDgpLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNVwiIGNvbXBvbmVudD1cImgyXCI+XG4gICAgICAgICAgICB7cG9zdC5hdXRob3IubmFtZX1cbiAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9Cb3g+XG4gICAgICA8QmxvZ0JvZHkgY29udGVudD17cG9zdC5jb250ZW50fSAvPlxuICAgIDwvQmxvZ0xheW91dD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3N0XG5cbnR5cGUgUGFyYW1zID0ge1xuICBwYXJhbXM6IHtcbiAgICBzbHVnOiBzdHJpbmdcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoeyBwYXJhbXMgfTogUGFyYW1zKSB7XG4gIGNvbnN0IHBvc3QgPSBnZXRQb3N0QnlTbHVnKHBhcmFtcy5zbHVnLCBbXG4gICAgJ3RpdGxlJyxcbiAgICAnZGF0ZScsXG4gICAgJ3NsdWcnLFxuICAgICdhdXRob3InLFxuICAgICdjb250ZW50JyxcbiAgICAnb2dJbWFnZScsXG4gICAgJ2NvdmVySW1hZ2UnLFxuICBdKVxuXG4gIHJldHVybiB7IHByb3BzOiB7IHBvc3QgfSB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQYXRocygpIHtcbiAgY29uc3QgcG9zdHMgPSBnZXRBbGxQb3N0cyhbJ3NsdWcnXSlcblxuICByZXR1cm4ge1xuICAgIHBhdGhzOiBwb3N0cy5tYXAoKHBvc3RzKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXJhbXM6IHsgc2x1ZzogcG9zdHMuc2x1ZyB9LFxuICAgICAgfVxuICAgIH0pLFxuICAgIGZhbGxiYWNrOiBmYWxzZSxcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/blog/[slug].tsx\n");

/***/ })

})