(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"A2+M":function(e,t,o){var a=o("X8hv");e.exports={MDXRenderer:a}},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},Ijbi:function(e,t,o){var a=o("WkPL");e.exports=function(e){if(Array.isArray(e))return a(e)}},RIqP:function(e,t,o){var a=o("Ijbi"),r=o("EbDI"),n=o("ZhPi"),l=o("Bnag");e.exports=function(e){return a(e)||r(e)||n(e)||l()}},SksO:function(e,t){function o(t,a){return e.exports=o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(t,a)}e.exports=o},WkPL:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,a=new Array(t);o<t;o++)a[o]=e[o];return a}},X8hv:function(e,t,o){var a=o("sXyB"),r=o("RIqP"),n=o("lSNA"),l=o("8OQS");function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var s=o("q1tI"),p=o("7ljp").mdx,d=o("BfwJ").useMDXScope;e.exports=function(e){var t=e.scope,o=e.children,n=l(e,["scope","children"]),c=d(t),u=s.useMemo((function(){if(!o)return null;var e=i({React:s,mdx:p},c),t=Object.keys(e),n=t.map((function(t){return e[t]}));return a(Function,["_fn"].concat(r(t),[""+o])).apply(void 0,[{}].concat(r(n)))}),[o,t]);return s.createElement(u,i({},n))}},XWzc:function(e,t,o){"use strict";o.r(t);var a=o("MUpH"),r=o("q1tI"),n=o("A2+M"),l=o("7ljp"),c=o("/eXU"),i=o("soUV"),s=o("cRy0"),p=o("zKBq"),d=o("v3sT"),u=o("wx14"),b=o("zLVn"),m=o("iuhU"),f=o("o46Q"),y=o("e98E"),g=Object(y.a)(r.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),v=o("Hk+Y"),O=o("wClv"),h=o("OJhJ"),j=o("vKg3"),C=o("A4YV");function S(e){return"Backspace"===e.key||"Delete"===e.key}var k=r.forwardRef((function(e,t){var o=e.avatar,a=e.classes,n=e.className,l=e.clickable,c=e.color,i=void 0===c?"default":c,s=e.component,p=e.deleteIcon,d=e.disabled,y=void 0!==d&&d,v=e.icon,O=e.label,k=e.onClick,x=e.onDelete,w=e.onKeyDown,P=e.onKeyUp,I=e.size,R=void 0===I?"medium":I,$=e.variant,z=void 0===$?"filled":$,D=Object(b.a)(e,["avatar","classes","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"]),E=r.useRef(null),T=Object(h.a)(E,t),L=function(e){e.stopPropagation(),x&&x(e)},V=!(!1===l||!k)||l,A="small"===R,M=s||(V||x?C.a:"div"),N=M===C.a?{component:"div",focusVisibleClassName:a.focusVisible,disableRipple:Boolean(x)}:{},X=null;if(x){var B=Object(m.a)("default"!==i&&("outlined"===z?a["deleteIconOutlinedColor".concat(Object(j.a)(i))]:a["deleteIconColor".concat(Object(j.a)(i))]),A&&a.deleteIconSmall);X=p&&r.isValidElement(p)?r.cloneElement(p,{className:Object(m.a)(p.props.className,a.deleteIcon,B),onClick:L}):r.createElement(g,{className:Object(m.a)(a.deleteIcon,B),onClick:L})}var K=null;o&&r.isValidElement(o)&&(K=r.cloneElement(o,{className:Object(m.a)(a.avatar,o.props.className,A&&a.avatarSmall,"default"!==i&&a["avatarColor".concat(Object(j.a)(i))])}));var U=null;v&&r.isValidElement(v)&&(U=r.cloneElement(v,{className:Object(m.a)(a.icon,v.props.className,A&&a.iconSmall,"default"!==i&&a["iconColor".concat(Object(j.a)(i))])}));var F=Object(f.a)(Object(u.a)({},e,{clickable:V,color:i,disabled:y,size:R,variant:z}),"MuiChip");return r.createElement(M,Object(u.a)({className:Object(m.a)(a.root,a[z],F,n,"default"!==i&&[a["color".concat(Object(j.a)(i))],V&&a["clickableColor".concat(Object(j.a)(i))],x&&a["deletableColor".concat(Object(j.a)(i))]],y&&a.disabled,A&&a.sizeSmall,V&&a.clickable,x&&a.deletable,"outlined"===z&&{primary:a.outlinedPrimary,secondary:a.outlinedSecondary}[i]),disabled:!(!V||!y)||void 0,onClick:k,onKeyDown:function(e){e.currentTarget===e.target&&S(e)&&e.preventDefault(),w&&w(e)},onKeyUp:function(e){e.currentTarget===e.target&&(x&&S(e)?x(e):"Escape"===e.key&&E.current&&E.current.blur()),P&&P(e)},ref:T},N,D),K||U,r.createElement("span",{className:Object(m.a)(a.label,A&&a.labelSmall)},O),X)})),x=Object(v.a)((function(e){var t="light"===e.palette.mode?e.palette.grey[300]:e.palette.grey[700],o=Object(O.a)(e.palette.text.primary,.26);return{root:{fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:e.palette.getContrastText(t),backgroundColor:t,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:"none",padding:0,verticalAlign:"middle",boxSizing:"border-box","&$disabled":{opacity:e.palette.action.disabledOpacity,pointerEvents:"none"},"& $avatar":{marginLeft:5,marginRight:-6,width:24,height:24,color:"light"===e.palette.mode?e.palette.grey[700]:e.palette.grey[300],fontSize:e.typography.pxToRem(12)},"& $avatarColorPrimary":{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark},"& $avatarColorSecondary":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.dark},"& $avatarSmall":{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)}},sizeSmall:{height:24},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},disabled:{},clickable:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover, &$focusVisible":{backgroundColor:Object(O.c)(t,.08)},"&:active":{boxShadow:e.shadows[1]}},clickableColorPrimary:{"&:hover, &$focusVisible":{backgroundColor:Object(O.c)(e.palette.primary.main,.08)}},clickableColorSecondary:{"&:hover, &$focusVisible":{backgroundColor:Object(O.c)(e.palette.secondary.main,.08)}},deletable:{"&$focusVisible":{backgroundColor:Object(O.c)(t,.08)}},deletableColorPrimary:{"&$focusVisible":{backgroundColor:Object(O.c)(e.palette.primary.main,.2)}},deletableColorSecondary:{"&$focusVisible":{backgroundColor:Object(O.c)(e.palette.secondary.main,.2)}},outlined:{backgroundColor:"transparent",border:"1px solid ".concat("light"===e.palette.mode?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"&$focusVisible, $clickable&:hover":{backgroundColor:Object(O.a)(e.palette.text.primary,e.palette.action.hoverOpacity)},"& $avatar":{marginLeft:4},"& $avatarSmall":{marginLeft:2},"& $icon":{marginLeft:4},"& $iconSmall":{marginLeft:2},"& $deleteIcon":{marginRight:5},"& $deleteIconSmall":{marginRight:3}},filled:{},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(e.palette.primary.main),"&$focusVisible, $clickable&:hover":{backgroundColor:Object(O.a)(e.palette.primary.main,e.palette.action.hoverOpacity)}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(e.palette.secondary.main),"&$focusVisible, $clickable&:hover":{backgroundColor:Object(O.a)(e.palette.secondary.main,e.palette.action.hoverOpacity)}},avatar:{},avatarSmall:{},avatarColorPrimary:{},avatarColorSecondary:{},icon:{color:"light"===e.palette.mode?e.palette.grey[700]:e.palette.grey[300],marginLeft:5,marginRight:-6},iconSmall:{fontSize:18,marginLeft:4,marginRight:-4},iconColorPrimary:{color:"inherit"},iconColorSecondary:{color:"inherit"},label:{overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},labelSmall:{paddingLeft:8,paddingRight:8},deleteIcon:{WebkitTapHighlightColor:"transparent",color:o,fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:Object(O.a)(o,.4)}},deleteIconSmall:{fontSize:16,marginRight:4,marginLeft:-4},deleteIconColorPrimary:{color:Object(O.a)(e.palette.primary.contrastText,.7),"&:hover, &:active":{color:e.palette.primary.contrastText}},deleteIconColorSecondary:{color:Object(O.a)(e.palette.secondary.contrastText,.7),"&:hover, &:active":{color:e.palette.secondary.contrastText}},deleteIconOutlinedColorPrimary:{color:Object(O.a)(e.palette.primary.main,.7),"&:hover, &:active":{color:e.palette.primary.main}},deleteIconOutlinedColorSecondary:{color:Object(O.a)(e.palette.secondary.main,.7),"&:hover, &:active":{color:e.palette.secondary.main}},focusVisible:{}}}),{name:"MuiChip"})(k),w=o("9eSz"),P=o.n(w),I=Object(y.a)(r.createElement("path",{d:"M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"}),"LocalOffer"),R=o("AeFk");function $(){var e=Object(a.a)(["\nfill: currentColor;\n"]);return $=function(){return e},e}var z=Object(s.a)(c.Link)($()),D={name:"1d97j0p",styles:"transform:scale(0.6);vertical-align:bottom"};t.default=function(e){var t,o,a,r,c,s,u,b=e.data;e.location;console.log(e);var m=b.mdx;return Object(R.a)(i.a,null,Object(R.a)(l.MDXProvider,{components:{a:z}},Object(R.a)("section",{css:function(e){return{gridColumn:"1 / -1",width:"80%",placeSelf:"center center",marginBottom:e.spacing(2),marginTop:e.spacing(1)}}},Object(R.a)(P.a,{fluid:null==m||null===(t=m.frontmatter)||void 0===t||null===(o=t.coverImage)||void 0===o||null===(a=o.childImageSharp)||void 0===a?void 0:a.fluid,alt:null==m||null===(r=m.frontmatter)||void 0===r?void 0:r.title})),Object(R.a)(n.MDXRenderer,null,null!==(c=null==m?void 0:m.body)&&void 0!==c?c:"")),Object(R.a)(p.a,null,Object(R.a)(d.a,{color:"textSecondary"},Object(R.a)(I,{css:D}),"Tags:"),Object(R.a)(p.a,{component:"ul",sx:{display:"flex",gap:function(e){return e.spacing(1)},flexFlow:"row wrap"}},null==m||null===(s=m.frontmatter)||void 0===s||null===(u=s.tags)||void 0===u?void 0:u.map((function(e){return Object(R.a)(x,{key:e,label:e,color:"secondary"})})))))}},ZhPi:function(e,t,o){var a=o("WkPL");e.exports=function(e,t){if(e){if("string"==typeof e)return a(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?a(e,t):void 0}}},b48C:function(e,t){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}},lSNA:function(e,t){e.exports=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}},sXyB:function(e,t,o){var a=o("SksO"),r=o("b48C");function n(t,o,l){return r()?e.exports=n=Reflect.construct:e.exports=n=function(e,t,o){var r=[null];r.push.apply(r,t);var n=new(Function.bind.apply(e,r));return o&&a(n,o.prototype),n},n.apply(null,arguments)}e.exports=n}}]);
//# sourceMappingURL=component---src-pages-blog-mdx-parent-file-relative-directory-tsx-f70615b1ea900a3a6c05.js.map