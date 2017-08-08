webpackJsonp(["index"],{"./src/api.js":function(a,b,c){"use strict";var d=c("./src/config.js");const e=d.a.API_HOST,f=d.a.API_CONSUMER_KEY,g=(a,b)=>fetch(`${e}${a}&consumer_key=${f}`,b);b.a=(a)=>g(`/photos/${a}?image_size=440&comments=1`)},"./src/app.js":function(a,b,c){"use strict";b.a=function(a,b){if(0<h.children.length)for(let a=0;a<h.children.length-1;a+=1)h.children.item(a).remove();0<h.textContent.length&&(h.textContent="");const d=c.i(e.a)(g(a,b));return h.appendChild(d),h};var d=c("./src/lib/router.js"),e=c("./src/lib/renderer.js"),f=c("./src/routes.js");const g=c.i(d.a)(f.a),h=document.createElement("main");h.id="app"},"./src/components/image.js":function(a,b,c){"use strict";b.a=function({src:a,alt:b,className:e}){return{type:"div",className:c.i(d.a)("image",e),children:[{type:"img",attributes:[["src",a],["alt",b]]}]}};var d=c("./src/utils/classNames.js")},"./src/components/link.js":function(a,b,c){"use strict";var d=c("./src/lib/store.js"),f=c("./src/lib/router.js");b.a=c.i(d.b)((a,b,d)=>({type:"a",attributes:[["href",d.to]],listeners:[["click",(a)=>{a.preventDefault(),a.stopPropagation(),b(c.i(f.b)(d.to))}]],children:[d.text]}))},"./src/config.js":function(a,b){"use strict";const c={development:{BASE_PATH:"",API_HOST:"https://api.500px.com/v1",API_CONSUMER_KEY:"YajGY9WC3z6ANzPiycFCdxDsM38sGJJiBYsFfx6S"},production:{BASE_PATH:"/440px",API_HOST:"https://api.500px.com/v1",API_CONSUMER_KEY:"YajGY9WC3z6ANzPiycFCdxDsM38sGJJiBYsFfx6S"}};b.a=(()=>c.production)()},"./src/index.js":function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c("./src/lib/store.js"),e=c("./src/app.js");((a)=>{const b=document.getElementById("root");b.appendChild(c.i(d.a)(a))})(e.a)},"./src/lib/renderer.js":function(a,b){"use strict";function c(a,b){if(null===a)return null;if(a instanceof HTMLElement)return a;if("string"==typeof a){const c=document.createTextNode(a);return b?b(c):c}const d=a.type,e=a.id,f=a.className,g=a.attributes,h=a.listeners,i=a.children;if(!d)throw new Error("Invalid element, must either be a string or an object with a valid HTML element type property");const j=document.createElement(d);return e&&(j.id=e),f&&(j.className=f),g&&g.length&&g.forEach(([a,b])=>{j.setAttribute(a,b)}),h&&h.length&&h.forEach(([a,b])=>{j.addEventListener(a,b)}),i&&i.length&&i.forEach((a)=>{const b=c(a);b&&j.appendChild(b)}),b?b(j):j}b.a=c},"./src/lib/router.js":function(a,b,c){"use strict";function d(a,b){switch(b.type){case f.c:return-1===b.payload.indexOf("routerMiddleware")?a:Object.assign({},a,{router:{path:window.location.pathname.replace(g,"")}});case i:return b.payload;case h:return Object.assign({},a,{router:{path:b.payload}});default:return a;}}b.a=function(a){return(b,c)=>a.reduce((a,d)=>{if(a)return a;let e;if("string"==typeof d.path&&(e=new RegExp(`^${g}${d.path}$`)),!(e instanceof RegExp))throw new Error("Route misconfigured, path must be a string or RegExp");return e.test(b.router.path)?d.component(b,c):a},null)},b.c=function(a,b,c,e){const j=d(b,c);return c.type===f.c&&(history.pushState(j,"",`${g}${window.location.pathname}`),window.addEventListener("popstate",(a)=>{a.preventDefault();const b=a.state;null!==b&&e({type:i,payload:b})},!1)),c.type===h&&history.pushState(j,"",`${g}${c.payload}`),a(j,c)};var e=c("./src/config.js"),f=c("./src/lib/store.js");const g=e.a.BASE_PATH,h="ROUTER_UPDATE_LOCATION",i="ROUTER_REPLACE_STATE";b.b=(a)=>({type:h,payload:a})},"./src/lib/store.js":function(a,b,c){"use strict";var d=c("./src/lib/router.js"),e=c("./src/reducer.js");const f="__MIDDLEWARE_APPLIED__";b.c=f;const g=function(a,b){let c=a,d=c(b||{},{type:"__INITIAL__"}),e=()=>null;const g=(a={type:"__NULL__"})=>{if(!e)throw new Error("Store is not fully configured, please call method addState");const b=c(d,a);b!==d&&(d=b,console.log("Next state",d),e(d,g))};return{attachStore:(a)=>{return e=a,e(d,g)},replaceReducer:(a)=>{c=a},dispatch:g,withState:function(a){return(...b)=>a(d,g,...b)},applyMiddleware:(...a)=>{c=a.reduce((a,b)=>(c,d)=>b(a,c,d,g),c),g({type:f,payload:a.map((a)=>a.name)})}}}(e.a,e.b);g.applyMiddleware(d.c);const h=g.withState;b.b=h;const i=g.attachStore;b.a=i},"./src/pages/home.js":function(a,b,c){"use strict";function d(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(a){return void c(a)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}b.a=function(a,b){let h=(()=>{var a=d(function*(){const a=yield c.i(g.a)("93415163"),d=yield a.json();b({type:"LOAD",payload:d.photo.image_url})});return function(){return a.apply(this,arguments)}})();return{type:"div",children:["hello world"===a.greeting?"wow":null,{type:"button",listeners:[["click",h]],children:[`${a.greeting}`]},{type:"div",children:[c.i(f.a)({to:"/image",text:"photo"})]},a.image?c.i(e.a)({src:a.image,className:"wow"}):null]}};var e=c("./src/components/image.js"),f=c("./src/components/link.js"),g=c("./src/api.js")},"./src/pages/image.js":function(a,b,c){"use strict";b.a=function(){return{type:"div",children:[c.i(d.a)({to:"/",text:"go home"}),"image page"]}};var d=c("./src/components/link.js")},"./src/reducer.js":function(a,b){"use strict";b.a=function(a,b){switch(b.type){case"LOAD":return Object.assign({},a,{greeting:"helloWorld!!",image:b.payload});default:return a;}};b.b={greeting:"hello world"}},"./src/routes.js":function(a,b,c){"use strict";var d=c("./src/pages/home.js"),e=c("./src/pages/image.js");b.a=[{path:"/",component:d.a},{path:"/image",component:e.a}]},"./src/utils/classNames.js":function(a,b){"use strict";b.a=function(...a){return a.join(" ")}},"multi /Users/ryancarey/code/patreon/src/index":function(a,b,c){a.exports=c("./src/index.js")}},["multi /Users/ryancarey/code/patreon/src/index"]);