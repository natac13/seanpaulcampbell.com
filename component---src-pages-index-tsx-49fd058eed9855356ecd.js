(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"9Gx4":function(e,n,a){"use strict";var t=a("wx14"),o=a("zLVn"),i=a("q1tI"),r=a("17x9"),s=a.n(r),c=(a("E9XD"),a("ODXe")),l=a("6XBH"),d=a("2mql"),p=a.n(d),b=a("Rq+t"),u=a("Th4q"),m=a("J2uW"),w=a("iAeH"),O=function(e,n){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a?u.a.indexOf(e)<=u.a.indexOf(n):u.a.indexOf(e)<u.a.indexOf(n)},v=function(e,n){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return a?u.a.indexOf(n)<=u.a.indexOf(e):u.a.indexOf(n)<u.a.indexOf(e)},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(n){var a=e.withTheme,r=void 0!==a&&a,s=e.noSSR,d=void 0!==s&&s,u=e.initialWidth;function O(e){var a=Object(b.a)(),s=e.theme||a,p=Object(l.a)({theme:s,name:"MuiWithWidth",props:Object(t.a)({},e)}),O=p.initialWidth,v=p.width,f=Object(o.a)(p,["initialWidth","width"]),x=i.useState(!1),h=Object(c.a)(x,2),j=h[0],g=h[1];Object(m.a)((function(){g(!0)}),[]);var D=s.breakpoints.keys.slice().reverse().reduce((function(e,n){var a=Object(w.a)(s.breakpoints.up(n));return!e&&a?n:e}),null),U=Object(t.a)({width:v||(j||d?D:void 0)||O||u},r?{theme:s}:{},f);return void 0===U.width?null:i.createElement(n,U)}return p()(O,n),O}};function x(e){var n=e.children,a=e.only,t=e.width,o=Object(b.a)(),i=!0;if(a)if(Array.isArray(a))for(var r=0;r<a.length;r+=1){if(t===a[r]){i=!1;break}}else a&&t===a&&(i=!1);if(i)for(var s=0;s<o.breakpoints.keys.length;s+=1){var c=o.breakpoints.keys[s],l=e["".concat(c,"Up")],d=e["".concat(c,"Down")];if(l&&O(c,t)||d&&v(c,t)){i=!1;break}}return i?n:null}x.propTypes={children:s.a.node,className:s.a.string,implementation:s.a.oneOf(["js","css"]),initialWidth:s.a.oneOf(["xs","sm","md","lg","xl"]),lgDown:s.a.bool,lgUp:s.a.bool,mdDown:s.a.bool,mdUp:s.a.bool,only:s.a.oneOfType([s.a.oneOf(["xs","sm","md","lg","xl"]),s.a.arrayOf(s.a.oneOf(["xs","sm","md","lg","xl"]))]),smDown:s.a.bool,smUp:s.a.bool,width:s.a.string.isRequired,xlDown:s.a.bool,xlUp:s.a.bool,xsDown:s.a.bool,xsUp:s.a.bool};var h=f()(x),j=a("rePB"),g=a("vKg3"),D=a("Hk+Y");var U=Object(D.a)((function(e){var n={display:"none"};return e.breakpoints.keys.reduce((function(a,t){return a["only".concat(Object(g.a)(t))]=Object(j.a)({},e.breakpoints.only(t),n),a["".concat(t,"Up")]=Object(j.a)({},e.breakpoints.up(t),n),a["".concat(t,"Down")]=Object(j.a)({},e.breakpoints.down(t),n),a}),{})}),{name:"PrivateHiddenCss"})((function(e){var n=e.children,a=e.classes,t=e.className,r=e.only,s=(Object(o.a)(e,["children","classes","className","only"]),Object(b.a)()),c=[];t&&c.push(t);for(var l=0;l<s.breakpoints.keys.length;l+=1){var d=s.breakpoints.keys[l],p=e["".concat(d,"Up")],u=e["".concat(d,"Down")];p&&c.push(a["".concat(d,"Up")]),u&&c.push(a["".concat(d,"Down")])}return r&&(Array.isArray(r)?r:[r]).forEach((function(e){c.push(a["only".concat(Object(g.a)(e))])})),i.createElement("div",{className:c.join(" ")},n)}));n.a=function(e){var n=e.implementation,a=void 0===n?"js":n,r=e.lgDown,s=void 0!==r&&r,c=e.lgUp,l=void 0!==c&&c,d=e.mdDown,p=void 0!==d&&d,b=e.mdUp,u=void 0!==b&&b,m=e.smDown,w=void 0!==m&&m,O=e.smUp,v=void 0!==O&&O,f=e.xlDown,x=void 0!==f&&f,j=e.xlUp,g=void 0!==j&&j,D=e.xsDown,k=void 0!==D&&D,y=e.xsUp,W=void 0!==y&&y,q=Object(o.a)(e,["implementation","lgDown","lgUp","mdDown","mdUp","smDown","smUp","xlDown","xlUp","xsDown","xsUp"]);return"js"===a?i.createElement(h,Object(t.a)({lgDown:s,lgUp:l,mdDown:p,mdUp:u,smDown:w,smUp:v,xlDown:x,xlUp:g,xsDown:k,xsUp:W},q)):i.createElement(U,Object(t.a)({lgDown:s,lgUp:l,mdDown:p,mdUp:u,smDown:w,smUp:v,xlDown:x,xlUp:g,xsDown:k,xsUp:W},q))}},QeBL:function(e,n,a){"use strict";a.r(n);a("q1tI");var t=a("zKBq"),o=a("9Gx4"),i=a("Wbzz"),r=a("WA0N"),s=a("Ui+d"),c=a("2w2P"),l=a("eZYV"),d=a("AeFk"),p=function(){var e=Object(s.b)().darkMode,n=Object(l.a)(),a=Object(i.useStaticQuery)("2459055177");return Object(d.a)(t.a,{sx:{width:"100%",height:"100vh",display:"flex"}},Object(d.a)(o.a,{mdDown:!0},Object(d.a)(c.a,{type:"desktop"})),Object(d.a)(t.a,{sx:{width:n?"100%":"75%",marginLeft:n?"0":"25%"}},e?Object(d.a)(r.a,{image:Object(r.i)(a.darkbg),alt:"Golden tree against a gray sky"}):Object(d.a)(r.a,{image:Object(r.i)(a.lightbg),alt:"green grass closeup"})))},b=a("soUV");n.default=function(e){e.data;return Object(d.a)(b.a,null,Object(d.a)(p,null))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-49fd058eed9855356ecd.js.map