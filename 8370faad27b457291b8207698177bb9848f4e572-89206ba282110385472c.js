(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"9Gx4":function(e,t,a){"use strict";var n=a("wx14"),r=a("zLVn"),i=a("q1tI"),o=a("17x9"),l=a.n(o),s=(a("E9XD"),a("ODXe")),c=a("6XBH"),d=a("2mql"),u=a.n(d),p=a("Rq+t"),f=a("Th4q"),b=a("J2uW"),m=a("iAeH"),h=function(e,t){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return a?f.a.indexOf(e)<=f.a.indexOf(t):f.a.indexOf(e)<f.a.indexOf(t)},g=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return a?f.a.indexOf(t)<=f.a.indexOf(e):f.a.indexOf(t)<f.a.indexOf(e)},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){var a=e.withTheme,o=void 0!==a&&a,l=e.noSSR,d=void 0!==l&&l,f=e.initialWidth;function h(e){var a=Object(p.a)(),l=e.theme||a,u=Object(c.a)({theme:l,name:"MuiWithWidth",props:Object(n.a)({},e)}),h=u.initialWidth,g=u.width,v=Object(r.a)(u,["initialWidth","width"]),y=i.useState(!1),O=Object(s.a)(y,2),x=O[0],j=O[1];Object(b.a)((function(){j(!0)}),[]);var w=l.breakpoints.keys.slice().reverse().reduce((function(e,t){var a=Object(m.a)(l.breakpoints.up(t));return!e&&a?t:e}),null),k=Object(n.a)({width:g||(x||d?w:void 0)||h||f},o?{theme:l}:{},v);return void 0===k.width?null:i.createElement(t,k)}return u()(h,t),h}};function y(e){var t=e.children,a=e.only,n=e.width,r=Object(p.a)(),i=!0;if(a)if(Array.isArray(a))for(var o=0;o<a.length;o+=1){if(n===a[o]){i=!1;break}}else a&&n===a&&(i=!1);if(i)for(var l=0;l<r.breakpoints.keys.length;l+=1){var s=r.breakpoints.keys[l],c=e["".concat(s,"Up")],d=e["".concat(s,"Down")];if(c&&h(s,n)||d&&g(s,n)){i=!1;break}}return i?t:null}y.propTypes={children:l.a.node,className:l.a.string,implementation:l.a.oneOf(["js","css"]),initialWidth:l.a.oneOf(["xs","sm","md","lg","xl"]),lgDown:l.a.bool,lgUp:l.a.bool,mdDown:l.a.bool,mdUp:l.a.bool,only:l.a.oneOfType([l.a.oneOf(["xs","sm","md","lg","xl"]),l.a.arrayOf(l.a.oneOf(["xs","sm","md","lg","xl"]))]),smDown:l.a.bool,smUp:l.a.bool,width:l.a.string.isRequired,xlDown:l.a.bool,xlUp:l.a.bool,xsDown:l.a.bool,xsUp:l.a.bool};var O=v()(y),x=a("rePB"),j=a("vKg3"),w=a("Hk+Y");var k=Object(w.a)((function(e){var t={display:"none"};return e.breakpoints.keys.reduce((function(a,n){return a["only".concat(Object(j.a)(n))]=Object(x.a)({},e.breakpoints.only(n),t),a["".concat(n,"Up")]=Object(x.a)({},e.breakpoints.up(n),t),a["".concat(n,"Down")]=Object(x.a)({},e.breakpoints.down(n),t),a}),{})}),{name:"PrivateHiddenCss"})((function(e){var t=e.children,a=e.classes,n=e.className,o=e.only,l=(Object(r.a)(e,["children","classes","className","only"]),Object(p.a)()),s=[];n&&s.push(n);for(var c=0;c<l.breakpoints.keys.length;c+=1){var d=l.breakpoints.keys[c],u=e["".concat(d,"Up")],f=e["".concat(d,"Down")];u&&s.push(a["".concat(d,"Up")]),f&&s.push(a["".concat(d,"Down")])}return o&&(Array.isArray(o)?o:[o]).forEach((function(e){s.push(a["only".concat(Object(j.a)(e))])})),i.createElement("div",{className:s.join(" ")},t)}));t.a=function(e){var t=e.implementation,a=void 0===t?"js":t,o=e.lgDown,l=void 0!==o&&o,s=e.lgUp,c=void 0!==s&&s,d=e.mdDown,u=void 0!==d&&d,p=e.mdUp,f=void 0!==p&&p,b=e.smDown,m=void 0!==b&&b,h=e.smUp,g=void 0!==h&&h,v=e.xlDown,y=void 0!==v&&v,x=e.xlUp,j=void 0!==x&&x,w=e.xsDown,S=void 0!==w&&w,E=e.xsUp,C=void 0!==E&&E,I=Object(r.a)(e,["implementation","lgDown","lgUp","mdDown","mdUp","smDown","smUp","xlDown","xlUp","xsDown","xsUp"]);return"js"===a?i.createElement(O,Object(n.a)({lgDown:l,lgUp:c,mdDown:u,mdUp:f,smDown:m,smUp:g,xlDown:y,xlUp:j,xsDown:S,xsUp:C},I)):i.createElement(k,Object(n.a)({lgDown:l,lgUp:c,mdDown:u,mdUp:f,smDown:m,smUp:g,xlDown:y,xlUp:j,xsDown:S,xsUp:C},I))}},"9eSz":function(e,t,a){"use strict";var n=a("TqRt");t.__esModule=!0,t.default=void 0;var r,i=n(a("PJYZ")),o=n(a("VbXa")),l=n(a("8OQS")),s=n(a("pVnL")),c=n(a("q1tI")),d=n(a("17x9")),u=function(e){var t=(0,s.default)({},e),a=t.resolutions,n=t.sizes,r=t.critical;return a&&(t.fixed=a,delete t.resolutions),n&&(t.fluid=n,delete t.sizes),r&&(t.loading="eager"),t.fluid&&(t.fluid=j([].concat(t.fluid))),t.fixed&&(t.fixed=j([].concat(t.fixed))),t},p=function(e){var t=e.media;return!!t&&(v&&!!window.matchMedia(t).matches)},f=function(e){var t=e.fluid,a=e.fixed,n=b(t||a||[]);return n&&n.src},b=function(e){if(v&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(p);if(-1!==t)return e[t];var a=e.findIndex((function(e){return void 0===e.media}));if(-1!==a)return e[a]}return e[0]},m=Object.create({}),h=function(e){var t=u(e),a=f(t);return m[a]||!1},g="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,v="undefined"!=typeof window,y=v&&window.IntersectionObserver,O=new WeakMap;function x(e){return e.map((function(e){var t=e.src,a=e.srcSet,n=e.srcSetWebp,r=e.media,i=e.sizes;return c.default.createElement(c.default.Fragment,{key:t},n&&c.default.createElement("source",{type:"image/webp",media:r,srcSet:n,sizes:i}),a&&c.default.createElement("source",{media:r,srcSet:a,sizes:i}))}))}function j(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function w(e){return e.map((function(e){var t=e.src,a=e.media,n=e.tracedSVG;return c.default.createElement("source",{key:t,media:a,srcSet:n})}))}function k(e){return e.map((function(e){var t=e.src,a=e.media,n=e.base64;return c.default.createElement("source",{key:t,media:a,srcSet:n})}))}function S(e,t){var a=e.srcSet,n=e.srcSetWebp,r=e.media,i=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(r?'media="'+r+'" ':"")+'srcset="'+(t?n:a)+'" '+(i?'sizes="'+i+'" ':"")+"/>"}var E=function(e,t){var a=(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver((function(e){e.forEach((function(e){if(O.has(e.target)){var t=O.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(e.target),O.delete(e.target),t())}}))}),{rootMargin:"200px"})),r);return a&&(a.observe(e),O.set(e,t)),function(){a.unobserve(e),O.delete(e)}},C=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSet?'srcset="'+e.srcSet+'" ':"",r=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",s=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",c=e.loading?'loading="'+e.loading+'" ':"",d=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?S(e,!0):"")+S(e)})).join("")+"<img "+c+o+l+a+n+t+i+r+s+d+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},I=c.default.forwardRef((function(e,t){var a=e.src,n=e.imageVariants,r=e.generateSources,i=e.spreadProps,o=e.ariaHidden,l=c.default.createElement(L,(0,s.default)({ref:t,src:a},i,{ariaHidden:o}));return n.length>1?c.default.createElement("picture",null,r(n),l):l})),L=c.default.forwardRef((function(e,t){var a=e.sizes,n=e.srcSet,r=e.src,i=e.style,o=e.onLoad,d=e.onError,u=e.loading,p=e.draggable,f=e.ariaHidden,b=(0,l.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return c.default.createElement("img",(0,s.default)({"aria-hidden":f,sizes:a,srcSet:n,src:r},b,{onLoad:o,onError:d,ref:t,loading:u,draggable:p,style:(0,s.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))}));L.propTypes={style:d.default.object,onError:d.default.func,onLoad:d.default.func};var R=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=v&&h(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!g&&y&&!a.isCritical&&!a.seenBefore;var n=a.isCritical||v&&(g||!a.useIOSupport);return a.state={isVisible:n,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn,isHydrated:!1},a.imageRef=c.default.createRef(),a.placeholderRef=t.placeholderRef||c.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,i.default)(a)),a.handleRef=a.handleRef.bind((0,i.default)(a)),a}(0,o.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.setState({isHydrated:v}),this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:h(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=E(e,(function(){var e=h(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),(a=f(t))&&(m[a]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,n=e.className,r=e.style,i=void 0===r?{}:r,o=e.imgStyle,l=void 0===o?{}:o,d=e.placeholderStyle,p=void 0===d?{}:d,f=e.placeholderClassName,m=e.fluid,h=e.fixed,g=e.backgroundColor,v=e.durationFadeIn,y=e.Tag,O=e.itemProp,j=e.loading,S=e.draggable,E=m||h;if(!E)return null;var R=!1===this.state.fadeIn||this.state.imgLoaded,W=!0===this.state.fadeIn&&!this.state.imgCached,D=(0,s.default)({opacity:R?1:0,transition:W?"opacity "+v+"ms":"none"},l),T="boolean"==typeof g?"lightgray":g,U={transitionDelay:v+"ms"},z=(0,s.default)({opacity:this.state.imgLoaded?0:1},W&&U,l,p),H={title:t,alt:this.state.isVisible?"":a,style:z,className:f,itemProp:O},P=this.state.isHydrated?b(E):E[0];if(m)return c.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:(0,s.default)({position:"relative",overflow:"hidden",maxWidth:P.maxWidth?P.maxWidth+"px":null,maxHeight:P.maxHeight?P.maxHeight+"px":null},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(P.srcSet)},c.default.createElement(y,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/P.aspectRatio+"%"}}),T&&c.default.createElement(y,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:T,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},W&&U)}),P.base64&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:P.base64,spreadProps:H,imageVariants:E,generateSources:k}),P.tracedSVG&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:P.tracedSVG,spreadProps:H,imageVariants:E,generateSources:w}),this.state.isVisible&&c.default.createElement("picture",null,x(E),c.default.createElement(L,{alt:a,title:t,sizes:P.sizes,src:P.src,crossOrigin:this.props.crossOrigin,srcSet:P.srcSet,style:D,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:O,loading:j,draggable:S})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:C((0,s.default)({alt:a,title:t,loading:j},P,{imageVariants:E}))}}));if(h){var B=(0,s.default)({position:"relative",overflow:"hidden",display:"inline-block",width:P.width,height:P.height},i);return"inherit"===i.display&&delete B.display,c.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:B,ref:this.handleRef,key:"fixed-"+JSON.stringify(P.srcSet)},T&&c.default.createElement(y,{"aria-hidden":!0,title:t,style:(0,s.default)({backgroundColor:T,width:P.width,opacity:this.state.imgLoaded?0:1,height:P.height},W&&U)}),P.base64&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:P.base64,spreadProps:H,imageVariants:E,generateSources:k}),P.tracedSVG&&c.default.createElement(I,{ariaHidden:!0,ref:this.placeholderRef,src:P.tracedSVG,spreadProps:H,imageVariants:E,generateSources:w}),this.state.isVisible&&c.default.createElement("picture",null,x(E),c.default.createElement(L,{alt:a,title:t,width:P.width,height:P.height,sizes:P.sizes,src:P.src,crossOrigin:this.props.crossOrigin,srcSet:P.srcSet,style:D,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:O,loading:j,draggable:S})),this.addNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:C((0,s.default)({alt:a,title:t,loading:j},P,{imageVariants:E}))}}))}return null},t}(c.default.Component);R.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var W=d.default.shape({width:d.default.number.isRequired,height:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string}),D=d.default.shape({aspectRatio:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,sizes:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string,media:d.default.string,maxWidth:d.default.number,maxHeight:d.default.number});function T(e){return function(t,a,n){var r;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+n+"`, but their values are both `undefined`.");d.default.checkPropTypes(((r={})[a]=e,r),t,"prop",n)}}R.propTypes={resolutions:W,sizes:D,fixed:T(d.default.oneOfType([W,d.default.arrayOf(W)])),fluid:T(d.default.oneOfType([D,d.default.arrayOf(D)])),fadeIn:d.default.bool,durationFadeIn:d.default.number,title:d.default.string,alt:d.default.string,className:d.default.oneOfType([d.default.string,d.default.object]),critical:d.default.bool,crossOrigin:d.default.oneOfType([d.default.string,d.default.bool]),style:d.default.object,imgStyle:d.default.object,placeholderStyle:d.default.object,placeholderClassName:d.default.string,backgroundColor:d.default.oneOfType([d.default.string,d.default.bool]),onLoad:d.default.func,onError:d.default.func,onStartLoad:d.default.func,Tag:d.default.string,itemProp:d.default.string,loading:d.default.oneOf(["auto","lazy","eager"]),draggable:d.default.bool};var U=R;t.default=U},Cekx:function(e,t,a){"use strict";var n=a("TqRt"),r=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(a("q1tI")),o=(0,n(a("8/g6")).default)(i.createElement("path",{d:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");t.default=o},Xs8G:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),i=a("1Yd/"),o=a("b2pr"),l=a("cRy0"),s=a("ivWS"),c=a("SKiK"),d=a("zKBq"),u=a("v3sT"),p=a("9Gx4"),f=a("pGzU"),b=a("egtg"),m=a("kmrj"),h=a("Cekx"),g=a.n(h),v=a("6wvX"),y=a("ODXe"),O=a("wx14"),x=a("zLVn");function j(e,t){var a=t.disableHysteresis,n=void 0!==a&&a,r=t.threshold,i=void 0===r?100:r,o=t.target,l=e.current;return o&&(e.current=void 0!==o.pageYOffset?o.pageYOffset:o.scrollTop),!(!n&&void 0!==l&&e.current<l)&&e.current>i}var w="undefined"!=typeof window?window:null;function k(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getTrigger,a=void 0===t?j:t,r=e.target,i=void 0===r?w:r,o=Object(x.a)(e,["getTrigger","target"]),l=n.useRef(),s=n.useState((function(){return a(l,o)})),c=Object(y.a)(s,2),d=c[0],u=c[1];return n.useEffect((function(){var e=function(){u(a(l,Object(O.a)({target:i},o)))};return e(),i.addEventListener("scroll",e),function(){i.removeEventListener("scroll",e)}}),[i,a,JSON.stringify(o)]),d}var S=a("FiVM"),E=a("AeFk"),C=function(e){var t=e.children,a=k();return Object(E.b)(S.a,{appear:!1,direction:"down",in:!a},t)},I=a("/JQ8"),L=a("rePB"),R=a("iuhU"),W=a("Hk+Y"),D=a("vKg3"),T=a("oXkG"),U=a("JCAd"),z=a("yAQS"),H=a("8KHB"),P={enter:z.b.enteringScreen,exit:z.b.leavingScreen},B=n.forwardRef((function(e,t){var a=e.BackdropProps,r=e.children,i=e.classes,o=e.className,l=e.disableEscapeKeyDown,s=void 0!==l&&l,c=e.fullScreen,d=void 0!==c&&c,u=e.fullWidth,p=void 0!==u&&u,f=e.maxWidth,b=void 0===f?"sm":f,m=e.onBackdropClick,h=e.onClose,g=e.open,v=e.PaperComponent,y=void 0===v?H.a:v,j=e.PaperProps,w=void 0===j?{}:j,k=e.scroll,S=void 0===k?"paper":k,E=e.TransitionComponent,C=void 0===E?I.a:E,L=e.transitionDuration,W=void 0===L?P:L,z=e.TransitionProps,B=e["aria-describedby"],V=e["aria-labelledby"],q=Object(x.a)(e,["BackdropProps","children","classes","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps","aria-describedby","aria-labelledby"]),M=n.useRef();return n.createElement(T.a,Object(O.a)({className:Object(R.a)(i.root,o),BackdropComponent:U.a,BackdropProps:Object(O.a)({transitionDuration:W},a),closeAfterTransition:!0,disableEscapeKeyDown:s,onClose:h,open:g,ref:t,onClick:function(e){M.current&&(M.current=null,m&&m(e),h&&h(e,"backdropClick"))}},q),n.createElement(C,Object(O.a)({appear:!0,in:g,timeout:W,role:"none presentation"},z),n.createElement("div",{className:Object(R.a)(i.container,i["scroll".concat(Object(D.a)(S))]),onMouseDown:function(e){M.current=e.target===e.currentTarget}},n.createElement(y,Object(O.a)({elevation:24,role:"dialog","aria-describedby":B,"aria-labelledby":V},w,{className:Object(R.a)(i.paper,i["paperScroll".concat(Object(D.a)(S))],i["paperWidth".concat(Object(D.a)(String(b)))],w.className,d&&i.paperFullScreen,p&&i.paperFullWidth)}),r))))})),V=Object(W.a)((function(e){return{root:{"@media print":{position:"absolute !important"}},scrollPaper:{display:"flex",justifyContent:"center",alignItems:"center"},scrollBody:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}},container:{height:"100%","@media print":{height:"auto"},outline:0},paper:{margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},paperScrollPaper:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},paperScrollBody:{display:"inline-block",verticalAlign:"middle",textAlign:"left"},paperWidthFalse:{maxWidth:"calc(100% - 64px)"},paperWidthXs:{maxWidth:Math.max(e.breakpoints.values.xs,444),"&$paperScrollBody":Object(L.a)({},e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})},paperWidthSm:{maxWidth:e.breakpoints.values.sm,"&$paperScrollBody":Object(L.a)({},e.breakpoints.down(e.breakpoints.values.sm+64),{maxWidth:"calc(100% - 64px)"})},paperWidthMd:{maxWidth:e.breakpoints.values.md,"&$paperScrollBody":Object(L.a)({},e.breakpoints.down(e.breakpoints.values.md+64),{maxWidth:"calc(100% - 64px)"})},paperWidthLg:{maxWidth:e.breakpoints.values.lg,"&$paperScrollBody":Object(L.a)({},e.breakpoints.down(e.breakpoints.values.lg+64),{maxWidth:"calc(100% - 64px)"})},paperWidthXl:{maxWidth:e.breakpoints.values.xl,"&$paperScrollBody":Object(L.a)({},e.breakpoints.down(e.breakpoints.values.xl+64),{maxWidth:"calc(100% - 64px)"})},paperFullWidth:{width:"calc(100% - 64px)"},paperFullScreen:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,"&$paperScrollBody":{margin:0,maxWidth:"100%"}}}}),{name:"MuiDialog"})(B),q=a("e98E"),M=Object(q.a)(n.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),N=a("uniG"),A=a.n(N),G=a("wEEd"),F=a("Nexp"),X=Object(G.a)(d.a),J=a("HW7y"),Y=a("/eXU"),K=a("blIu"),_=a("E3+z"),$=r.a.forwardRef((function(e,t){return Object(E.b)(I.a,Object(O.a)({ref:t},e))})),Q=function(e){var t,a,i=Object(K.a)().site,o=Object(F.a)(),l=e.navLinks,s=e.navIconLinks,c=Object(n.useState)(!1),f=c[0],b=c[1],m=Object(n.useCallback)((function(){return b(!1)}),[b]),h=Object(n.useCallback)((function(){return b(!0)}),[b]),g=Object(G.d)(l.length,{opacity:1,transform:"translateY(0) scale(1)",from:{opacity:0,transform:"translateY(-60px) scale(0.6)"},config:G.b.stiff,reset:f,immediate:o}),v=Object(G.d)(s.length,{opacity:1,transform:"translateX(0) rotate(0deg)",from:{opacity:0,transform:"translateX(-60px) rotate(60deg)"},config:G.b.stiff,reset:f,immediate:o}),y=g.map((function(e,t){var a=l[t];return Object(E.b)(X,{key:a.text,style:e},Object(E.b)(Y.Link,{to:a.url,onClick:m,variant:"h4",underline:"none"},a.text))})),O=v.map((function(e,t){var a=s[t];return Object(E.b)(X,{key:a.text,style:e,sx:{display:"inline-block"}},Object(E.b)(Y.IconButton,{to:a.url||"",onClick:a.onClick},a.icon,Object(E.b)(J.a,null,a.text)))}));return Object(E.b)(r.a.Fragment,null,Object(E.b)(p.a,{smUp:!0},Object(E.b)(d.a,{component:Y.IconButton,onClick:h,sx:{zIndex:function(e){return e.zIndex.appBar+1}}},Object(E.b)(A.a,null),Object(E.b)(J.a,null,"Open Menu"))),Object(E.b)(V,{fullScreen:!0,open:f,onClose:m,TransitionComponent:$},Object(E.b)(d.a,{component:Y.IconButton,sx:{},onClick:m},Object(E.b)(M,null)),Object(E.b)(d.a,{component:"section",sx:{display:"grid",gridTemplateRows:"1fr min-content",placeItems:"center center",height:"85vh",width:"100%"}},Object(E.b)(d.a,{sx:{display:"grid",gap:function(e){return e.spacing(2)}}},y),Object(E.b)(d.a,{sx:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:function(e){return e.spacing(3)},mb:2,width:"max-content",placeItems:"center"}},Object(E.b)(_.a,null),O)),Object(E.b)(d.a,{sx:{display:"grid",placeItems:"center center",height:"100%",color:"text.secondary"}},Object(E.b)(u.a,{variant:"h6",component:"p",color:"inherit"},null==i||null===(t=i.siteMetadata)||void 0===t||null===(a=t.author)||void 0===a?void 0:a.name))))},Z=a("dRu9"),ee=a("Rq+t"),te=a("f2i/"),ae=a("OJhJ"),ne={entering:{transform:"none"},entered:{transform:"none"}},re={enter:z.b.enteringScreen,exit:z.b.leavingScreen},ie=n.forwardRef((function(e,t){var a=e.appear,r=void 0===a||a,i=e.children,o=e.in,l=e.onEnter,s=e.onEntered,c=e.onEntering,d=e.onExit,u=e.onExited,p=e.onExiting,f=e.style,b=e.timeout,m=void 0===b?re:b,h=e.TransitionComponent,g=void 0===h?Z.a:h,v=Object(x.a)(e,["appear","children","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"]),y=Object(ee.a)(),j=n.useRef(null),w=Object(ae.a)(i.ref,t),k=Object(ae.a)(j,w),S=function(e){return function(t){if(e){var a=j.current;void 0===t?e(a):e(a,t)}}},E=S(c),C=S((function(e,t){Object(te.b)(e);var a=Object(te.a)({style:f,timeout:m},{mode:"enter"});e.style.webkitTransition=y.transitions.create("transform",a),e.style.transition=y.transitions.create("transform",a),l&&l(e,t)})),I=S(s),L=S(p),R=S((function(e){var t=Object(te.a)({style:f,timeout:m},{mode:"exit"});e.style.webkitTransition=y.transitions.create("transform",t),e.style.transition=y.transitions.create("transform",t),d&&d(e)})),W=S(u);return n.createElement(g,Object(O.a)({appear:r,in:o,nodeRef:j,onEnter:C,onEntered:I,onEntering:E,onExit:R,onExited:W,onExiting:L,timeout:m},v),(function(e,t){return n.cloneElement(i,Object(O.a)({style:Object(O.a)({transform:"scale(0)",visibility:"exited"!==e||o?void 0:"hidden"},ne[e],f,i.props.style),ref:k},t))}))})),oe=function(e){var t=e.children,a=k({threshold:100,disableHysteresis:!0}),r=Object(n.useCallback)((function(e){var t=(e.target.ownerDocument||document).querySelector("#back-to-top-anchor");null==t||t.scrollIntoView({behavior:"smooth",block:"center"})}),[]);return Object(E.b)(ie,{in:a},Object(E.b)(d.a,{onClick:r,role:"presentation",sx:{position:"fixed",bottom:function(e){return e.spacing(3)},right:function(e){return e.spacing(3)}}},t))};var le=Object(l.a)(Y.Link)((function(e){var t=e.theme;return"\n  color: "+t.palette.primary.contrastText+";\n  font-size: "+t.typography.h6.fontSize+";\n  font-weight: 600;\n  text-transform: uppercase;\n"})),se=[{text:"Blog",url:"/blog"},{text:"Photography",url:"/photography"},{text:"About",url:"/about"}],ce=[{url:"https://github.com/natac13",text:"GitHub Account",icon:Object(E.b)(b.a,null)},{url:"https://www.linkedin.com/in/seancampbellnatac/",text:"LinkedIn Account",icon:Object(E.b)(m.a,null)}],de={name:"emhcoe",styles:"flex:2 0"},ue=function(){var e=Object(v.a)();return Object(E.b)(r.a.Fragment,null,Object(E.b)(C,null,Object(E.b)(s.a,{position:"fixed"},Object(E.b)(c.a,null,Object(E.b)(d.a,{id:"navbar-left",sx:{color:"primary.contrastText",display:"flex",flex:"1 0",alignItems:"center",gap:function(e){return e.spacing(3)}}},Object(E.b)(u.a,{variant:e?"h5":"h4",component:"div"},"Sean Paul Campbell")),Object(E.b)(p.a,{css:de,id:"navbar-middle",implementation:"css",mdDown:!0},Object(E.b)(d.a,{sx:{display:"flex",width:"100%",justifyContent:"space-between"}},se.map((function(e){return Object(E.b)(le,{activeStyle:{textDecoration:"underline"},partiallyActive:!0,key:e.text,to:e.url,underline:"none"},e.text)})))),Object(E.b)(d.a,{id:"navbar-right",sx:{flex:"1 0",display:"flex",alignItems:"center",justifyContent:"flex-end"}},Object(E.b)(p.a,{implementation:"css",smUp:!0},Object(E.b)(Q,{navIconLinks:ce,navLinks:se})),Object(E.b)(p.a,{implementation:"css",smDown:!0},Object(E.b)(_.a,null),ce.map((function(e){return Object(E.b)(Y.IconButton,{key:e.text,onClick:e.onClick,to:e.url||"",css:function(e){return{color:e.palette.primary.contrastText}}},e.icon,Object(E.b)(J.a,null,e.text))}))))))),Object(E.b)(c.a,{id:"back-to-top-anchor"}),Object(E.b)(oe,null,Object(E.b)(f.a,{color:"secondary",size:"small","aria-label":"scroll back to top"},Object(E.b)(g.a,null),Object(E.b)(J.a,null,"3Go to page top"))))},pe=Object(l.a)("section")((function(){return"\n  display: grid;\n  grid-template-columns: 1fr min(83ch, calc(100% - 64px)) 1fr;\n  grid-column-gap: 32px;\n  & > * {\n    grid-column: 2;\n  }\n  "}));t.a=function(e){var t=e.children;return Object(E.b)(r.a.Fragment,null,Object(E.b)(i.a,null),Object(E.b)(ue,null),Object(E.b)(pe,null,t),Object(E.b)(o.a,null))}},uniG:function(e,t,a){"use strict";var n=a("TqRt"),r=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(a("q1tI")),o=(0,n(a("8/g6")).default)(i.createElement("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),"Menu");t.default=o}}]);
//# sourceMappingURL=8370faad27b457291b8207698177bb9848f4e572-89206ba282110385472c.js.map