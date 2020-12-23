webpackHotUpdate_N_E("pages/blog/[slug]",{

/***/ "./pages/blog/[slug].tsx":
/*!*******************************!*\
  !*** ./pages/blog/[slug].tsx ***!
  \*******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var _emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/react/jsx-dev-runtime */ \"./node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/dist/client/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/error */ \"./node_modules/next/error.js\");\n/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_BlogLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/BlogLayout */ \"./components/BlogLayout.tsx\");\n/* harmony import */ var _components_BlogBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/BlogBody */ \"./components/BlogBody.tsx\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/@material-ui/core/index.js\");\n/* harmony import */ var _components_DateFormatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/DateFormatter */ \"./components/DateFormatter.tsx\");\n/* harmony import */ var _components_BlogImage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/BlogImage */ \"./components/BlogImage.tsx\");\n\n\nvar _jsxFileName = \"/home/natac/projects/seanpaulcampbell.com/pages/blog/[slug].tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nvar Post = function Post(_ref) {\n  _s();\n\n  var post = _ref.post,\n      morePosts = _ref.morePosts,\n      preview = _ref.preview;\n  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__[\"useRouter\"])();\n\n  if (!router.isFallback && !(post === null || post === void 0 ? void 0 : post.slug)) {\n    return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(next_error__WEBPACK_IMPORTED_MODULE_3___default.a, {\n      statusCode: 404\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 22,\n      columnNumber: 12\n    }, _this);\n  }\n\n  return Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_BlogLayout__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: \"header\",\n      sx: {\n        gridColumn: '1 / -1',\n        placeSelf: 'center center',\n        textAlign: 'center',\n        my: 2\n      },\n      children: Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n        variant: \"h1\",\n        children: post.title\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 35,\n        columnNumber: 9\n      }, _this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 26,\n      columnNumber: 7\n    }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n      component: _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Paper\"],\n      sx: {\n        display: 'flex',\n        gap: function gap(theme) {\n          return theme.spacing(1);\n        },\n        flexDirection: 'column',\n        py: 1,\n        px: 2\n      },\n      children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n        sx: {\n          display: 'flex',\n          gap: function gap(theme) {\n            return theme.spacing(1);\n          }\n        },\n        children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_DateFormatter__WEBPACK_IMPORTED_MODULE_7__[\"DateFormatter\"], {\n          dateString: post.date\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 49,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"subtitle1\",\n          color: \"textSecondary\",\n          children: \"-\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 50,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"subtitle1\",\n          color: \"textSecondary\",\n          children: post.readTime\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 53,\n          columnNumber: 11\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 48,\n        columnNumber: 9\n      }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n        sx: {\n          display: 'flex',\n          gap: function gap(theme) {\n            return theme.spacing(2);\n          },\n          alignItems: 'center'\n        },\n        children: [Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Box\"], {\n          component: _material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Avatar\"],\n          alt: post.author.name,\n          src: post.author.picture,\n          sx: {\n            width: function width(theme) {\n              return theme.spacing(8);\n            },\n            height: function height(theme) {\n              return theme.spacing(8);\n            }\n          }\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 68,\n          columnNumber: 11\n        }, _this), Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Typography\"], {\n          variant: \"h5\",\n          component: \"h2\",\n          children: post.author.name\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 77,\n          columnNumber: 11\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 61,\n        columnNumber: 9\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 38,\n      columnNumber: 7\n    }, _this), post.coverImage ? Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_BlogImage__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      src: post.coverImage,\n      alt: post.title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 9\n    }, _this) : null, Object(_emotion_react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_BlogBody__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      content: post.content\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 87,\n      columnNumber: 7\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 25,\n    columnNumber: 5\n  }, _this);\n};\n\n_s(Post, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function () {\n  return [next_router__WEBPACK_IMPORTED_MODULE_2__[\"useRouter\"]];\n});\n\n_c = Post;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Post);\n\nvar _c;\n\n$RefreshReg$(_c, \"Post\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/next/node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvYmxvZy9bc2x1Z10udHN4P2FkZjkiXSwibmFtZXMiOlsiUG9zdCIsInBvc3QiLCJtb3JlUG9zdHMiLCJwcmV2aWV3Iiwicm91dGVyIiwidXNlUm91dGVyIiwiaXNGYWxsYmFjayIsInNsdWciLCJncmlkQ29sdW1uIiwicGxhY2VTZWxmIiwidGV4dEFsaWduIiwibXkiLCJ0aXRsZSIsIlBhcGVyIiwiZGlzcGxheSIsImdhcCIsInRoZW1lIiwic3BhY2luZyIsImZsZXhEaXJlY3Rpb24iLCJweSIsInB4IiwiZGF0ZSIsInJlYWRUaW1lIiwiYWxpZ25JdGVtcyIsIkF2YXRhciIsImF1dGhvciIsIm5hbWUiLCJwaWN0dXJlIiwid2lkdGgiLCJoZWlnaHQiLCJjb3ZlckltYWdlIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQVFBLElBQU1BLElBQUksR0FBRyxTQUFQQSxJQUFPLE9BQXlDO0FBQUE7O0FBQUEsTUFBdENDLElBQXNDLFFBQXRDQSxJQUFzQztBQUFBLE1BQWhDQyxTQUFnQyxRQUFoQ0EsU0FBZ0M7QUFBQSxNQUFyQkMsT0FBcUIsUUFBckJBLE9BQXFCO0FBQ3BELE1BQU1DLE1BQU0sR0FBR0MsNkRBQVMsRUFBeEI7O0FBQ0EsTUFBSSxDQUFDRCxNQUFNLENBQUNFLFVBQVIsSUFBc0IsRUFBQ0wsSUFBRCxhQUFDQSxJQUFELHVCQUFDQSxJQUFJLENBQUVNLElBQVAsQ0FBMUIsRUFBdUM7QUFDckMsV0FBTyw4RUFBQyxpREFBRDtBQUFXLGdCQUFVLEVBQUU7QUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFQO0FBQ0Q7O0FBQ0QsU0FDRSw4RUFBQyw4REFBRDtBQUFBLGVBQ0UsOEVBQUMscURBQUQ7QUFDRSxlQUFTLEVBQUMsUUFEWjtBQUVFLFFBQUUsRUFBRTtBQUNGQyxrQkFBVSxFQUFFLFFBRFY7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QUFBQTtBQUFBO0FBQUEsYUE5REY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUFrRUQsQ0F2RUQ7O0dBQU0vQixJO1VBQ1dLLHFEOzs7S0FEWEwsSTs7QUF5RVNBLG1FQUFmIiwiZmlsZSI6Ii4vcGFnZXMvYmxvZy9bc2x1Z10udHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ25leHQvZXJyb3InXG5pbXBvcnQgeyBnZXRQb3N0QnlTbHVnLCBnZXRBbGxQb3N0cyB9IGZyb20gJy4uLy4uL2xpYi9wb3N0cydcbmltcG9ydCBCbG9nUG9zdCBmcm9tICcuLi8uLi90eXBlcy9wb3N0J1xuaW1wb3J0IEJsb2dMYXlvdXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9CbG9nTGF5b3V0J1xuaW1wb3J0IEJsb2dCb2R5IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQmxvZ0JvZHknXG5pbXBvcnQgeyBBdmF0YXIsIEJveCwgVHlwb2dyYXBoeSwgUGFwZXIgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSdcbmltcG9ydCB7IERhdGVGb3JtYXR0ZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0RhdGVGb3JtYXR0ZXInXG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSdcbmltcG9ydCBCbG9nSW1hZ2UgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9CbG9nSW1hZ2UnXG5cbnR5cGUgUHJvcHMgPSB7XG4gIHBvc3Q6IEJsb2dQb3N0XG4gIG1vcmVQb3N0czogQmxvZ1Bvc3RbXVxuICBwcmV2aWV3PzogYm9vbGVhblxufVxuXG5jb25zdCBQb3N0ID0gKHsgcG9zdCwgbW9yZVBvc3RzLCBwcmV2aWV3IH06IFByb3BzKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG4gIGlmICghcm91dGVyLmlzRmFsbGJhY2sgJiYgIXBvc3Q/LnNsdWcpIHtcbiAgICByZXR1cm4gPEVycm9yUGFnZSBzdGF0dXNDb2RlPXs0MDR9IC8+XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8QmxvZ0xheW91dD5cbiAgICAgIDxCb3hcbiAgICAgICAgY29tcG9uZW50PVwiaGVhZGVyXCJcbiAgICAgICAgc3g9e3tcbiAgICAgICAgICBncmlkQ29sdW1uOiAnMSAvIC0xJyxcbiAgICAgICAgICBwbGFjZVNlbGY6ICdjZW50ZXIgY2VudGVyJyxcbiAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgIG15OiAyLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDFcIj57cG9zdC50aXRsZX08L1R5cG9ncmFwaHk+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveFxuICAgICAgICBjb21wb25lbnQ9e1BhcGVyfVxuICAgICAgICBzeD17e1xuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBnYXA6ICh0aGVtZSkgPT4gdGhlbWUuc3BhY2luZygxKSxcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICBweTogMSxcbiAgICAgICAgICBweDogMixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEJveCBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogKHRoZW1lKSA9PiB0aGVtZS5zcGFjaW5nKDEpIH19PlxuICAgICAgICAgIDxEYXRlRm9ybWF0dGVyIGRhdGVTdHJpbmc9e3Bvc3QuZGF0ZX0gLz5cbiAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwic3VidGl0bGUxXCIgY29sb3I9XCJ0ZXh0U2Vjb25kYXJ5XCI+XG4gICAgICAgICAgICAtXG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJzdWJ0aXRsZTFcIiBjb2xvcj1cInRleHRTZWNvbmRhcnlcIj5cbiAgICAgICAgICAgIHtwb3N0LnJlYWRUaW1lfVxuICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICB7LyogPFR5cG9ncmFwaHkgKi99XG4gICAgICAgICAgey8qICAgdmFyaWFudD1cInN1YnRpdGxlMVwiICovfVxuICAgICAgICAgIHsvKiAgIGNvbG9yPVwidGV4dFNlY29uZGFyeVwiICovfVxuICAgICAgICAgIHsvKiA+e2BXb3JkIENvdW50OiAke3Bvc3Qud29yZENvdW50fWB9PC9UeXBvZ3JhcGh5PiAqL31cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZ2FwOiAodGhlbWUpID0+IHRoZW1lLnNwYWNpbmcoMiksXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgY29tcG9uZW50PXtBdmF0YXJ9XG4gICAgICAgICAgICBhbHQ9e3Bvc3QuYXV0aG9yLm5hbWV9XG4gICAgICAgICAgICBzcmM9e3Bvc3QuYXV0aG9yLnBpY3R1cmV9XG4gICAgICAgICAgICBzeD17e1xuICAgICAgICAgICAgICB3aWR0aDogKHRoZW1lKSA9PiB0aGVtZS5zcGFjaW5nKDgpLFxuICAgICAgICAgICAgICBoZWlnaHQ6ICh0aGVtZSkgPT4gdGhlbWUuc3BhY2luZyg4KSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDVcIiBjb21wb25lbnQ9XCJoMlwiPlxuICAgICAgICAgICAge3Bvc3QuYXV0aG9yLm5hbWV9XG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7cG9zdC5jb3ZlckltYWdlID8gKFxuICAgICAgICA8QmxvZ0ltYWdlIHNyYz17cG9zdC5jb3ZlckltYWdlfSBhbHQ9e3Bvc3QudGl0bGV9IC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPEJsb2dCb2R5IGNvbnRlbnQ9e3Bvc3QuY29udGVudH0gLz5cbiAgICA8L0Jsb2dMYXlvdXQ+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUG9zdFxuXG50eXBlIFBhcmFtcyA9IHtcbiAgcGFyYW1zOiB7XG4gICAgc2x1Zzogc3RyaW5nXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKHsgcGFyYW1zIH06IFBhcmFtcykge1xuICBjb25zdCBwb3N0ID0gZ2V0UG9zdEJ5U2x1ZyhwYXJhbXMuc2x1ZywgW1xuICAgICd0aXRsZScsXG4gICAgJ2RhdGUnLFxuICAgICdzbHVnJyxcbiAgICAnYXV0aG9yJyxcbiAgICAnY29udGVudCcsXG4gICAgJ2NvdmVySW1hZ2UnLFxuICBdKVxuXG4gIHJldHVybiB7IHByb3BzOiB7IHBvc3QgfSB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQYXRocygpIHtcbiAgY29uc3QgcG9zdHMgPSBnZXRBbGxQb3N0cyhbJ3NsdWcnXSlcblxuICByZXR1cm4ge1xuICAgIHBhdGhzOiBwb3N0cy5tYXAoKHBvc3RzKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXJhbXM6IHsgc2x1ZzogcG9zdHMuc2x1ZyB9LFxuICAgICAgfVxuICAgIH0pLFxuICAgIGZhbGxiYWNrOiBmYWxzZSxcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/blog/[slug].tsx\n");

/***/ })

})