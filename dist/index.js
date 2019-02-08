'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
Object.defineProperty(exports, 'CommandBodyObject', {
  enumerable: true,
  get: function get() {
    return _command.default;
  }
});
Object.defineProperty(exports, 'ResponseBodyObject', {
  enumerable: true,
  get: function get() {
    return _response.default;
  }
});
exports.MicroServiceFramework = void 0;

require('@babel/polyfill');

require('./lib/runtime');

var _isPortFree = _interopRequireDefault(require('is-port-free'));

var _path = _interopRequireDefault(require('path'));

var _fs = _interopRequireDefault(require('fs'));

var _https = _interopRequireDefault(require('https'));

var _http = _interopRequireDefault(require('http'));

var _helmet = _interopRequireDefault(require('helmet'));

var _express = _interopRequireDefault(require('express'));

var _lodash = require('lodash');

var _package = require('../package.json');

var _core = _interopRequireDefault(require('./lib/core'));

var _db = _interopRequireDefault(require('./lib/db'));

var _lib = _interopRequireDefault(require('./lib'));

var _command = _interopRequireDefault(require('./lib/template/command.js'));

var _response = _interopRequireDefault(require('./lib/template/response.js'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

var defaultServiceOptions = {
  loadBalancing: 'roundRobin',
  runOnStart: [],
  instances: 1
};

var buildSecureOptions = function buildSecureOptions(ssl) {
  try {
    return _typeof(ssl) === 'object'
      ? Object.entries(
          Object.assign(
            {},
            {
              key: void 0,
              cert: void 0,
              ca: void 0
            },
            ssl
          )
        )
          .map(function(_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              optionKey = _ref2[0],
              filePath = _ref2[1];

            return _defineProperty(
              {},
              optionKey,
              _fs.default.readFileSync(filePath)
            );
          })
          .reduce(function(acc, x) {
            return Object.assign(acc, x);
          }, {})
      : ssl;
  } catch (e) {
    throw new Error(e);
  }
};

var buildHttpOptions = function buildHttpOptions(options) {
  return {
    port: 80,
    ssl: buildSecureOptions(options.ssl),
    harden: true,
    beforeStart: function beforeStart(express) {
      return express;
    },
    middlewares: [],
    static: [],
    routes: []
  };
};

var defaultInstanceOptions = {
  mode: 'server',
  http: false,
  databaseNames: ['_defaultTable'],
  verbose: true,
  maxBuffer: 50,
  logPath: void 0,
  restartTimeout: 50,
  connectionTimeout: 1000,
  microServiceConnectionTimeout: 10000,
  microServiceConnectionAttempts: 1000,
  apiGatewayPort: 8080,
  portRangeStart: 1024,
  portRangeFinish: 65535,
  coreOperations: {},
  runOnStart: []
};

var MicroServiceFramework = (function(_ServiceCore) {
  _inherits(MicroServiceFramework, _ServiceCore);

  function MicroServiceFramework(options) {
    var _this;

    _classCallCheck(this, MicroServiceFramework);

    _this = _possibleConstructorReturn(
      this,
      _getPrototypeOf(MicroServiceFramework).call(this, options)
    );
    _this.conId = 0;
    _this.settings = Object.assign(
      defaultInstanceOptions,
      options,
      Array.isArray(options.http) && options.http.length
        ? options.http.map(function(httpSettings) {
            return buildHttpOptions(httpSettings);
          })
        : false
    );
    ['httpsServer', 'httpServer', 'inUsePorts'].forEach(function(prop) {
      return (_this[prop] = []);
    });
    _this.db =
      _this.settings.databaseNames
        .map(function(table) {
          return _defineProperty(
            {},
            table,
            new _db.default({
              databaseName: table
            }).db
          );
        })
        .reduce(function(acc, x) {
          return Object.assign(acc, x);
        }, {}) || {};
    process.env.settings = _this.settings;
    process.env.exitedProcessPorts = [];
    [
      'externalInterfaces',
      'coreOperations',
      'serviceInfo',
      'serviceOptions',
      'serviceData'
    ].forEach(function(prop) {
      return (_this[prop] = {});
    });
    [
      'assignCoreFunctions',
      'startServerFailed',
      'startServer',
      'initGateway',
      'bindGateway',
      'hardenServer',
      'startHttpServer'
    ].forEach(function(func) {
      return (_this[func] = _this[func].bind(
        _assertThisInitialized(_assertThisInitialized(_this))
      ));
    });
    return _this;
  }

  _createClass(MicroServiceFramework, [
    {
      key: 'startServerFailed',
      value: function startServerFailed() {
        return setTimeout(function() {
          return process.exit();
        }, 0);
      }
    },
    {
      key: 'startServer',
      value: function startServer() {
        var _this2 = this;

        return _asyncToGenerator(
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.prev = 0;

                      if (
                        !['client', 'server'].includes(_this2.settings.mode)
                      ) {
                        _context.next = 19;
                        break;
                      }

                      if (!(_this2.settings.mode === 'server')) {
                        _context.next = 16;
                        break;
                      }

                      _context.next = 5;
                      return _this2.assignCoreFunctions();

                    case 5:
                      _context.next = 7;
                      return _this2.initGateway();

                    case 7:
                      _context.next = 9;
                      return _this2.bindGateway();

                    case 9:
                      _context.next = 11;
                      return _this2.startServices();

                    case 11:
                      _context.next = 13;
                      return _this2.startHttpServer();

                    case 13:
                      _context.next = 15;
                      return _this2.executeInitialFunctions(
                        'coreOperations',
                        'settings'
                      );

                    case 15:
                      return _context.abrupt('return', void 0);

                    case 16:
                      _this2.log(
                        'Micro Service Framework: '.concat(_package.version),
                        'log'
                      );

                      _this2.log('Running in client mode...', 'log');

                      return _context.abrupt('return', void 0);

                    case 19:
                      throw new Error(
                        "Unsupported mode detected. Valid options are 'server' or 'client'"
                      );

                    case 22:
                      _context.prev = 22;
                      _context.t0 = _context['catch'](0);
                      throw new Error(_context.t0);

                    case 25:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
              [[0, 22]]
            );
          })
        )();
      }
    },
    {
      key: 'assignCoreFunctions',
      value: function assignCoreFunctions() {
        var _this3 = this;

        return new Promise(function(resolve) {
          Object.entries(
            Object.assign({}, _core.default, _this3.settings.coreOperations)
          ).forEach(function(_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
              name = _ref7[0],
              func = _ref7[1];

            _this3.coreOperations[name] = func.bind(_this3);
          });
          return resolve();
        });
      }
    },
    {
      key: 'defineService',
      value: function defineService(name, operations, options) {
        var resolvedPath = ''.concat(_path.default.resolve(operations), '.js');

        switch (true) {
          case typeof name === 'undefined': {
            throw new Error(
              'The name of the microservice is not defined! '.concat(name)
            );
          }

          case typeof operations === 'undefined' ||
            !_fs.default.existsSync(resolvedPath): {
            throw new Error(
              'The operations path of the microservice is not defined or cannot be found! PATH: '.concat(
                resolvedPath
              )
            );
          }

          case _typeof(require(resolvedPath)) !== 'object' ||
            !Object.keys(require(resolvedPath)).length: {
            throw new Error(
              'No operations found. Expecting an exported object with atleast one key! PATH: '.concat(
                resolvedPath
              )
            );
          }

          case this.serviceInfo.hasOwnProperty(name): {
            throw new Error(
              'The microservice '.concat(name, ' has already been defined.')
            );
          }

          default: {
            this.serviceOptions[name] = Object.assign(
              {},
              defaultServiceOptions,
              options
            );
            this.serviceInfo[name] = resolvedPath;
            return true;
          }
        }
      }
    },
    {
      key: 'initGateway',
      value: function initGateway() {
        var _this4 = this;

        this.log('Micro Service Framework: '.concat(_package.version), 'log');
        return new Promise(function(resolve, reject) {
          return (0, _isPortFree.default)(_this4.settings.apiGatewayPort)
            .then(function() {
              _this4.log('Starting service core', 'log');

              _this4.externalInterfaces.apiGateway = _this4.invokeListener(
                _this4.settings.apiGatewayPort
              );
              return !_this4.externalInterfaces.apiGateway
                ? _this4.log('Unable to start gateway, exiting!', 'error') ||
                    reject(Error('Unable to start gateway, exiting!'))
                : _this4.log('Service core started!', 'log') || resolve(true);
            })
            .catch(function(e) {
              _this4.log(
                'Gateway port not free or unknown error has occurred. INFO: '.concat(
                  JSON.stringify(e, null, 2)
                ),
                'log'
              );

              return reject(
                Error(
                  'Gateway port not free or unknown error has occurred. INFO: '.concat(
                    JSON.stringify(e, null, 2)
                  )
                )
              );
            });
        });
      }
    },
    {
      key: 'bindGateway',
      value: function bindGateway() {
        var _this5 = this;

        return new Promise(function(resolve) {
          _this5.externalInterfaces.apiGateway.on('COM_REQUEST', function(
            message,
            data
          ) {
            _this5.log(
              '['.concat(
                _this5.conId,
                '] Service core connection request recieved'
              ),
              'log'
            );

            data
              ? _this5.processComRequest(data, message, _this5.conId)
              : _this5.processComError(data, message, _this5.conId);

            _this5.log(
              '['.concat(
                _this5.conId,
                '] Service core connection request processed'
              )
            );

            return _this5.conId++;
          });

          _this5.externalInterfaces.apiGateway.on('COM_CLOSE', function(
            message
          ) {
            _this5.log(
              '['.concat(
                _this5.conId,
                '] Service core connection close requested'
              )
            );

            message.conn.destroy();

            _this5.log(
              '['.concat(
                _this5.conId,
                '] Service core connection successfully closed'
              )
            );

            return _this5.conId++;
          });

          _this5.externalInterfaces.apiGateway.on('KILL', function() {
            process.exit();
          });

          return resolve();
        });
      }
    },
    {
      key: 'startHttpServer',
      value: function startHttpServer() {
        var _this6 = this;

        return Array.isArray(this.settings.http)
          ? Promise.all(
              this.settings.http.map(function(httpSettings) {
                return new Promise(function(resolve, reject) {
                  try {
                    if (httpSettings) {
                      var expressApp = (0, _express.default)();
                      httpSettings.beforeStart(expressApp);
                      httpSettings.static.forEach(function(path) {
                        return expressApp.use(_express.default.static(path));
                      });
                      httpSettings.harden && _this6.hardenServer(expressApp);
                      httpSettings.middlewares.forEach(function(middleware) {
                        return expressApp.use(middleware);
                      });
                      httpSettings.routes
                        .filter(function(route) {
                          if (
                            ['put', 'post', 'get', 'delete', 'patch'].includes(
                              route.method.toLowerCase()
                            )
                          ) {
                            return true;
                          }

                          console.warn(
                            'This route has an unknown method, skipping: '.concat(
                              JSON.stringify(route, null, 2)
                            )
                          );
                          return false;
                        })
                        .forEach(function(route) {
                          return expressApp[route.method.toLowerCase()](
                            route.uri,
                            function(req, res, next) {
                              setTimeout(function() {
                                try {
                                  return route.handler(req, res, {
                                    sendRequest: _this6.sendRequest,
                                    CommandBodyObject: _command.default,
                                    ResponseBodyObject: _response.default
                                  });
                                } catch (e) {
                                  console.log('I am here!');
                                  return next(e);
                                }
                              }, 0);
                            }
                          );
                        });

                      if (_typeof(httpSettings.ssl) === 'object') {
                        return (
                          _this6.httpsServer.push(
                            _https.default
                              .createServer(httpSettings.ssl, expressApp)
                              .listen(httpSettings.port)
                          ) && resolve()
                        );
                      }

                      return (
                        _this6.httpServer.push(
                          _http.default
                            .createServer(expressApp)
                            .listen(httpSettings.port)
                        ) && resolve()
                      );
                    }

                    return resolve();
                  } catch (e) {
                    return reject(Error(e));
                  }
                });
              })
            )
          : new Promise(function(resolve) {
              _this6.log(
                'No HTTP(s) servers defined. Starting services only...'
              );

              return resolve();
            });
      }
    },
    {
      key: 'hardenServer',
      value: function hardenServer(expressApp) {
        return expressApp.use((0, _helmet.default)());
      }
    },
    {
      key: 'startServices',
      value: function startServices() {
        var _this7 = this;

        var serviceInfo =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : void 0;
        var customInstances =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : void 0;
        var servicesInfo = serviceInfo || this.serviceInfo;
        return new Promise(function(resolve, reject) {
          if (Object.keys(servicesInfo)) {
            return Promise.all(
              (0, _lodash.shuffle)(
                Object.keys(servicesInfo).reduce(function(acc, serviceName) {
                  var instances =
                    customInstances ||
                    _this7.serviceOptions[serviceName].instances;
                  var processList = [];

                  while (instances > 0) {
                    processList.push(serviceName);
                    --instances;
                  }

                  return acc.concat.apply(acc, processList);
                }, [])
              ).map(function(name) {
                return new Promise(function(resolveLocal, rejectLocal) {
                  return _this7.initService(name, function(result) {
                    return result === true
                      ? resolveLocal(true)
                      : rejectLocal(
                          Error(
                            'Unable to start microservice! MORE INFO: '.concat(
                              JSON.stringify(result, null, 2)
                            )
                          )
                        );
                  });
                });
              })
            )
              .then(function() {
                return resolve();
              })
              .catch(function(e) {
                return reject(e);
              });
          }

          return reject(Error('No microservices defined!'));
        });
      }
    }
  ]);

  return MicroServiceFramework;
})(_lib.default);

exports.MicroServiceFramework = MicroServiceFramework;
