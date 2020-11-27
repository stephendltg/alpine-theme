"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var t,e=(function(t,e){t.exports=function(){var t=/^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;function e(t){var e,r=t.replace(/^v/,"").replace(/\+.*$/,""),n=-1===(e=r).indexOf("-")?e.length:e.indexOf("-"),i=r.substring(0,n).split(".");return i.push(r.substring(n+1)),i}function r(t){return isNaN(Number(t))?t:Number(t)}function n(e){if("string"!=typeof e)throw new TypeError("Invalid argument expected string");if(!t.test(e))throw new Error("Invalid argument not valid semver ('"+e+"' received)")}function i(t,i){[t,i].forEach(n);for(var s=e(t),o=e(i),a=0;a<Math.max(s.length-1,o.length-1);a++){var u=parseInt(s[a]||0,10),c=parseInt(o[a]||0,10);if(u>c)return 1;if(c>u)return-1}var f=s[s.length-1],h=o[o.length-1];if(f&&h){var d=f.split(".").map(r),p=h.split(".").map(r);for(a=0;a<Math.max(d.length,p.length);a++){if(void 0===d[a]||"string"==typeof p[a]&&"number"==typeof d[a])return-1;if(void 0===p[a]||"string"==typeof d[a]&&"number"==typeof p[a])return 1;if(d[a]>p[a])return 1;if(p[a]>d[a])return-1}}else if(f||h)return f?-1:1;return 0}var s=[">",">=","=","<","<="],o={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1]};return i.validate=function(e){return"string"==typeof e&&t.test(e)},i.compare=function(t,e,r){!function(t){if("string"!=typeof t)throw new TypeError("Invalid operator type, expected string but got "+typeof t);if(-1===s.indexOf(t))throw new TypeError("Invalid operator, expected one of "+s.join("|"))}(r);var n=i(t,e);return o[r].indexOf(n)>-1},i}()}(t={exports:{}}),t.exports),r=function(t){return null==t},n=function(t){return Object.getPrototypeOf(t)===Object.prototype},i=function(t,e){return Object.entries(t).forEach(function(s){var o=s[0],a=s[1];r(a)||!n(a)&&!Array.isArray(a)||(t[o]=i(a,e))}),new Proxy(t,{set:function(t,s,o){return!r(o)&&n(o)&&(o=i(o,e)),e.set(t,s,t[s]=o),!0}})},s={stores:{},persistenceDriver:window.localStorage,persisted:[],subscribers:[],watchers:{},disableReactivity:!1,startingCallbacks:[],startedCallbacks:[],start:function(){var t=this;this.startingCallbacks.forEach(function(t){return t()}),this.attach(),this.stores=i(this.stores,{set:function(e,r,n){if(!t.disableReactivity){t.updateSubscribers(),t.runWatchers(t.stores,e,r,n),t.disableReactivity=!0;try{t.persisted.forEach(t.updateLocalStorage.bind(t))}catch(t){}t.disableReactivity=!1}}}),this.startedCallbacks.forEach(function(t){return t()})},starting:function(t){this.startingCallbacks.push(t)},started:function(t){this.startedCallbacks.push(t)},attach:function(){if(!(navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")||window.Alpine&&e.compare(window.Alpine.version,"2.7.0",">=")))throw new Error("[Spruce] You must be using Alpine >= 2.5.0 to use Spruce.");var t=this;window.Alpine.addMagicProperty("store",function(e){return t.subscribe(e),t.stores})},store:function(t,e,r){if(void 0===r&&(r=!1),"function"==typeof e&&(e=e()),r)try{this.stores[t]=this.retrieveFromLocalStorage(t,(n={},Object.entries(e).filter(function(t){return"function"==typeof t[1]}).forEach(function(t){return n[t[0]]=t[1]}),n)),this.persisted.includes(t)||this.persisted.push(t)}catch(t){}var n;return this.stores[t]||(this.stores[t]=e),this.stores[t]},reset:function(t,e){this.stores[t]=e},subscribe:function(t){return this.subscribers.includes(t)||this.subscribers.push(t),this.stores},updateSubscribers:function(){this.subscribers.filter(function(t){return!!t.__x}).forEach(function(t){t.__x.updateElements(t)})},retrieveFromLocalStorage:function(t,e){void 0===e&&(e={});var r=this.persistenceDriver.getItem("__spruce:"+t);if(!r)return null;var n=JSON.parse(r);return"object"==typeof n&&(n=Object.assign(e,n)),n},updateLocalStorage:function(t){this.persistenceDriver.setItem("__spruce:"+t,JSON.stringify(this.store(t)))},watch:function(t,e){this.watchers[t]||(this.watchers[t]=[]),this.watchers[t].push(e)},runWatchers:function(t,e,r,n){var i=this;if(i.watchers[r])return i.watchers[r].forEach(function(t){return t(n)});Object.keys(i.watchers).filter(function(t){return t.includes(".")}).forEach(function(s){var o=s.split(".");r===o[o.length-1]&&o.reduce(function(t,o){return(t[r]===e[r]||Object.is(e,t))&&i.watchers[s].forEach(function(t){return t(n)}),t[o]},t)})},persistUsing:function(t){if(this.persisted.length>0&&console.warn("[Spruce] You have already initialised a persisted store. Changing the driver may cause issues."),"function"!=typeof t.getItem)throw new Error("[Spruce] The persistence driver must have a `getItem(key)` method.");if("function"!=typeof t.setItem)throw new Error("[Spruce] The persistence driver must have a `setItem(key, value)` method.");this.persistenceDriver=t}};window.Spruce=s;var o=window.deferLoadingAlpine||function(t){t()};window.deferLoadingAlpine=function(t){window.Spruce.start(),o(t)};export default s;