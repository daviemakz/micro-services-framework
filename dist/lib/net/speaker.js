'use strict';function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _net=_interopRequireDefault(require("net")),_networkBase=_interopRequireWildcard(require("./networkBase")),_constants=require("./constants");function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!==_typeof(a)&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c["default"]=a,b&&b.set(a,c),c}function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var extendsObj=function(a,b){function c(){this.constructor=a}for(var d in b)({}).hasOwnProperty.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},Speaker=function(a){function b(a){var c,d,e;for(b.__super__.constructor.call(this),this.uniqueId=1,this.sockets=[],this.waiters={},this.socketIterator=0,(d=0,e=a.length);d<e;d++)c=a[d],this.connect(c)}return extendsObj(b,a),b.prototype.connect=function(a){var b,c,d,e,f=this;return d=this,b=this.getHostByAddress(a),c=this.getPortByAddress(a),e=new _net["default"].Socket,e.uniqueSocketId=this.generateUniqueId(),e.setEncoding("utf8"),e.setNoDelay(!0),e.setMaxListeners(1/0),e.connect(c,b,function(){return"true"===process.env.verbose&&console.log("Successfully connected to address: ".concat((0,_networkBase.getAddressFormatted)(b,c))),f.sockets.push(e)}),void e.on("data",function(a){var b,c,d,e,g,h;for(g=f.tokenizeData(a),h=[],(d=0,e=g.length);d<e;d++)(c=g[d],b=JSON.parse(c),!!f.waiters[b.id])&&(f.waiters[b.id](b.data),h.push(delete f.waiters[b.id]));return h})},b.prototype.request=function(a,b,c){return null===c&&(c=null),this.send(a,b,c)},b.prototype.send=function(a,b,c){var d,e;return(null===c&&(c=null),0===this.sockets.length)?void(c&&c({error:_constants.ERR_REQ_REFUSED})):(this.sockets[this.socketIterator]||(this.socketIterator=0),c&&(d=this.generateUniqueId(),this.waiters[d]=c),e=this.prepareJsonToSend({id:d,subject:a,data:b}),this.sockets[this.socketIterator++].write(e))},b.prototype.shout=function(a,b){var c,d,e,f,g,h;for(c={subject:a,data:b},g=this.sockets,h=[],(e=0,f=g.length);e<f;e++)d=g[e],h.push(d.write(this.prepareJsonToSend(c)));return h},b.prototype.generateUniqueId=function(){var a,b;return(a="id-".concat(this.uniqueId),!this.waiters[a])?a:(this.uniqueId++===_constants.MAX_WAITERS&&(this.uniqueId=1),this.waiters[b="id-".concat(this.uniqueId)]&&delete this.waiters[b],this.generateUniqueId())},b}(_networkBase["default"]),_default=Speaker;exports["default"]=_default;