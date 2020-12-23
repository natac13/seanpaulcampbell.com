webpackHotUpdate_N_E("pages/blog/[slug]",{

/***/ "./pages/blog/[slug].tsx":
/*!*******************************!*\
  !*** ./pages/blog/[slug].tsx ***!
  \*******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"./node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/dist/client/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/error */ \"./node_modules/next/error.js\");\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_BlogLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/BlogLayout */ \"./components/BlogLayout.tsx\");\n/* harmony import */ var _components_BlogBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/BlogBody */ \"./components/BlogBody.tsx\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/index.js\");\n/* harmony import */ var _components_DateFormatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/DateFormatter */ \"./components/DateFormatter.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_8__);\n\n\nvar _jsxFileName = \"/home/natac/projects/seanpaulcampbell.com/pages/blog/[slug].tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nvar Post = function Post(_ref) {\n  _s();\n\n  var post = _ref.post,\n      morePosts = _ref.morePosts,\n      preview = _ref.preview;\n  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__[\"useRouter\"])();\n\n  if (!router.isFallback && !(post === null || post === void 0 ? void 0 : post.slug)) {\n    return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_error__WEBPACK_IMPORTED_MODULE_3___default.a, {\n      statusCode: 404\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 12\n    }, _this);\n  }\n\n  return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_BlogLayout__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: \"header\",\n      sx: {\n        gridColumn: '1 / -1',\n        placeSelf: 'center center',\n        textAlign: 'center',\n        my: 2\n      },\n      children: Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n        variant: \"h1\",\n        children: post.title\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 34,\n        columnNumber: 9\n      }, _this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 25,\n      columnNumber: 7\n    }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: \"div\",\n      sx: {\n        gridColumn: '1 / -1',\n        width: '80%',\n        placeSelf: 'center center',\n        textAlign: 'center',\n        my: 2\n      },\n      children: Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_image__WEBPACK_IMPORTED_MODULE_8___default.a, {\n        src: post.coverImage,\n        width: 800,\n        height: 600,\n        alt: post.title,\n        layout: \"responsive\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 46,\n        columnNumber: 9\n      }, _this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 7\n    }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Paper\"],\n      sx: {\n        display: 'flex',\n        gap: function gap(theme) {\n          return theme.spacing(1);\n        },\n        flexDirection: 'column',\n        py: 1,\n        px: 2\n      },\n      children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n        sx: {\n          display: 'flex',\n          gap: function gap(theme) {\n            return theme.spacing(1);\n          }\n        },\n        children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_DateFormatter__WEBPACK_IMPORTED_MODULE_7__[\"DateFormatter\"], {\n          dateString: post.date\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 65,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"subtitle1\",\n          color: \"textSecondary\",\n          children: \"-\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 66,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"subtitle1\",\n          color: \"textSecondary\",\n          children: post.readTime\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 69,\n          columnNumber: 11\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 64,\n        columnNumber: 9\n      }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n        sx: {\n          display: 'flex',\n          gap: function gap(theme) {\n            return theme.spacing(2);\n          },\n          alignItems: 'center'\n        },\n        children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n          component: _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Avatar\"],\n          alt: post.author.name,\n          src: post.author.picture,\n          sx: {\n            width: function width(theme) {\n              return theme.spacing(8);\n            },\n            height: function height(theme) {\n              return theme.spacing(8);\n            }\n          }\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 84,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"h5\",\n          component: \"h2\",\n          children: post.author.name\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 93,\n          columnNumber: 11\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 77,\n        columnNumber: 9\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 54,\n      columnNumber: 7\n    }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_BlogBody__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      content: post.content\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 98,\n      columnNumber: 7\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 24,\n    columnNumber: 5\n  }, _this);\n};\n\n_s(Post, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function () {\n  return [next_router__WEBPACK_IMPORTED_MODULE_2__[\"useRouter\"]];\n});\n\n_c = Post;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Post);\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/next/node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYmxvZy9bc2x1Z10udHN4P2FkZjkiXSwibmFtZXMiOlsiUG9zdCIsInBvc3QiLCJtb3JlUG9zdHMiLCJwcmV2aWV3Iiwicm91dGVyIiwidXNlUm91dGVyIiwiaXNGYWxsYmFjayIsInNsdWciLCJncmlkQ29sdW1uIiwicGxhY2VTZWxmIiwidGV4dEFsaWduIiwibXkiLCJ0aXRsZSIsIndpZHRoIiwiY292ZXJJbWFnZSIsIlBhcGVyIiwiZGlzcGxheSIsImdhcCIsInRoZW1lIiwic3BhY2luZyIsImZsZXhEaXJlY3Rpb24iLCJweSIsInB4IiwiZGF0ZSIsInJlYWRUaW1lIiwiYWxpZ25JdGVtcyIsIkF2YXRhciIsImF1dGhvciIsIm5hbWUiLCJwaWN0dXJlIiwiaGVpZ2h0IiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFRQSxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxPQUF5QztBQUFBOztBQUFBLE1BQXRDQyxJQUFzQyxRQUF0Q0EsSUFBc0M7QUFBQSxNQUFoQ0MsU0FBZ0MsUUFBaENBLFNBQWdDO0FBQUEsTUFBckJDLE9BQXFCLFFBQXJCQSxPQUFxQjtBQUNwRCxNQUFNQyxNQUFNLEdBQUdDLDZEQUFTLEVBQXhCOztBQUNBLE1BQUksQ0FBQ0QsTUFBTSxDQUFDRSxVQUFSLElBQXNCLEVBQUNMLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFTSxJQUFQLENBQTFCLEVBQXVDO0FBQ3JDLFdBQU8sOEVBQUMsaURBQUQ7QUFBVyxnQkFBVSxFQUFFO0FBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBUDtBQUNEOztBQUNELFNBQ0UsOEVBQUMsOERBQUQ7QUFBQSxlQUNFLDhFQUFDLHFEQUFEO0FBQ0UsZUFBUyxFQUFDLFFBRFo7QUFFRSxRQUFFLEVBQUU7QUFDRkMsa0JBQVUsRUFBRSxRQURW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QyxJQUFwQjtBQUF5QixtQkFBUyxFQUFDLElBQW5DO0FBQUEsb0JBQ0dsQixJQUFJLENBQUMwQixNQUFMLENBQVlDO0FBRGY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFoQkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBdkJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTlCRixFQTBFRSw4RUFBQyw0REFBRDtBQUFVLGFBQU8sRUFBRTNCLElBQUksQ0FBQzhCO0FBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUExRUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUE4RUQsQ0FuRkQ7O0dBQU0vQixJO1VBQ1dLLHFEOzs7S0FEWEwsSTs7QUFxRlNBLG1FQUFmIiwiZmlsZSI6Ii4vcGFnZXMvYmxvZy9bc2x1Z10udHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ25leHQvZXJyb3InXG5pbXBvcnQgeyBnZXRQb3N0QnlTbHVnLCBnZXRBbGxQb3N0cyB9IGZyb20gJy4uLy4uL2xpYi9wb3N0cydcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuLi8uLi90eXBlcy9wb3N0J1xuaW1wb3J0IEJsb2dMYXlvdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9CbG9nTGF5b3V0J1xuaW1wb3J0IEJsb2dCb2R5IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQmxvZ0JvZHknXG5pbXBvcnQgeyBBdmF0YXIsIEJveCwgVHlwb2dyYXBoeSwgUGFwZXIgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSdcbmltcG9ydCB7IERhdGVGb3JtYXR0ZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0RhdGVGb3JtYXR0ZXInXG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSdcblxudHlwZSBQcm9wcyA9IHtcbiAgcG9zdDogQmxvZ1Bvc3RcbiAgbW9yZVBvc3RzOiBCbG9nUG9zdFtdXG4gIHByZXZpZXc/OiBib29sZWFuXG59XG5cbmNvbnN0IFBvc3QgPSAoeyBwb3N0LCBtb3JlUG9zdHMsIHByZXZpZXcgfTogUHJvcHMpID0+IHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcbiAgaWYgKCFyb3V0ZXIuaXNGYWxsYmFjayAmJiAhcG9zdD8uc2x1Zykge1xuICAgIHJldHVybiA8RXJyb3JQYWdlIHN0YXR1c0NvZGU9ezQwNH0gLz5cbiAgfVxuICByZXR1cm4gKFxuICAgIDxCbG9nTGF5b3V0PlxuICAgICAgPEJveFxuICAgICAgICBjb21wb25lbnQ9XCJoZWFkZXJcIlxuICAgICAgICBzeD17e1xuICAgICAgICAgIGdyaWRDb2x1bW46ICcxIC8gLTEnLFxuICAgICAgICAgIHBsYWNlU2VsZjogJ2NlbnRlciBjZW50ZXInLFxuICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgbXk6IDIsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoMVwiPntwb3N0LnRpdGxlfTwvVHlwb2dyYXBoeT5cbiAgICAgIDwvQm94PlxuICAgICAgPEJveFxuICAgICAgICBjb21wb25lbnQ9XCJkaXZcIlxuICAgICAgICBzeD17e1xuICAgICAgICAgIGdyaWRDb2x1bW46ICcxIC8gLTEnLFxuICAgICAgICAgIHdpZHRoOiAnODAlJyxcbiAgICAgICAgICBwbGFjZVNlbGY6ICdjZW50ZXIgY2VudGVyJyxcbiAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgIG15OiAyLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8SW1hZ2VcbiAgICAgICAgICBzcmM9e3Bvc3QuY292ZXJJbWFnZX1cbiAgICAgICAgICB3aWR0aD17ODAwfVxuICAgICAgICAgIGhlaWdodD17NjAwfVxuICAgICAgICAgIGFsdD17cG9zdC50aXRsZX1cbiAgICAgICAgICBsYXlvdXQ9XCJyZXNwb25zaXZlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICAgPEJveFxuICAgICAgICBjb21wb25lbnQ9e1BhcGVyfVxuICAgICAgICBzeD17e1xuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBnYXA6ICh0aGVtZSkgPT4gdGhlbWUuc3BhY2luZygxKSxcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICBweTogMSxcbiAgICAgICAgICBweDogMixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJveCBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogKHRoZW1lKSA9PiB0aGVtZS5zcGFjaW5nKDEpIH19PlxuICAgICAgICAgIDxEYXRlRm9ybWF0dGVyIGRhdGVTdHJpbmc9e3Bvc3QuZGF0ZX0gLz5cbiAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwic3VidGl0bGUxXCIgY29sb3I9XCJ0ZXh0U2Vjb25kYXJ5XCI+XG4gICAgICAgICAgICAtXG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJzdWJ0aXRsZTFcIiBjb2xvcj1cInRleHRTZWNvbmRhcnlcIj5cbiAgICAgICAgICAgIHtwb3N0LnJlYWRUaW1lfVxuICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICB7LyogPFR5cG9ncmFwaHkgKi99XG4gICAgICAgICAgey8qICAgdmFyaWFudD1cInN1YnRpdGxlMVwiICovfVxuICAgICAgICAgIHsvKiAgIGNvbG9yPVwidGV4dFNlY29uZGFyeVwiICovfVxuICAgICAgICAgIHsvKiA+e2BXb3JkIENvdW50OiAke3Bvc3Qud29yZENvdW50fWB9PC9UeXBvZ3JhcGh5PiAqL31cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZ2FwOiAodGhlbWUpID0+IHRoZW1lLnNwYWNpbmcoMiksXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgY29tcG9uZW50PXtBdmF0YXJ9XG4gICAgICAgICAgICBhbHQ9e3Bvc3QuYXV0aG9yLm5hbWV9XG4gICAgICAgICAgICBzcmM9e3Bvc3QuYXV0aG9yLnBpY3R1cmV9XG4gICAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgICB3aWR0aDogKHRoZW1lKSA9PiB0aGVtZS5zcGFjaW5nKDgpLFxuICAgICAgICAgICAgICBoZWlnaHQ6ICh0aGVtZSkgPT4gdGhlbWUuc3BhY2luZyg4KSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDVcIiBjb21wb25lbnQ9XCJoMlwiPlxuICAgICAgICAgICAge3Bvc3QuYXV0aG9yLm5hbWV9XG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuICAgICAgPEJsb2dCb2R5IGNvbnRlbnQ9e3Bvc3QuY29udGVudH0gLz5cbiAgICA8L0Jsb2dMYXlvdXQ+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9zdFxuXG50eXBlIFBhcmFtcyA9IHtcbiAgcGFyYW1zOiB7XG4gICAgc2x1Zzogc3RyaW5nXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKHsgcGFyYW1zIH06IFBhcmFtcykge1xuICBjb25zdCBwb3N0ID0gZ2V0UG9zdEJ5U2x1ZyhwYXJhbXMuc2x1ZywgW1xuICAgICd0aXRsZScsXG4gICAgJ2RhdGUnLFxuICAgICdzbHVnJyxcbiAgICAnYXV0aG9yJyxcbiAgICAnY29udGVudCcsXG4gICAgJ29nSW1hZ2UnLFxuICAgICdjb3ZlckltYWdlJyxcbiAgXSlcblxuICByZXR1cm4geyBwcm9wczogeyBwb3N0IH0gfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUGF0aHMoKSB7XG4gIGNvbnN0IHBvc3RzID0gZ2V0QWxsUG9zdHMoWydzbHVnJ10pXG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoczogcG9zdHMubWFwKChwb3N0cykgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFyYW1zOiB7IHNsdWc6IHBvc3RzLnNsdWcgfSxcbiAgICAgIH1cbiAgICB9KSxcbiAgICBmYWxsYmFjazogZmFsc2UsXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/blog/[slug].tsx\n");

/***/ })

})