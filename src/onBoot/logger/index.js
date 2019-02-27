const util = require('util');
const os = require('os');
const ip = require('ip');

const { env, service } = _require('config');
const logColors = require('./colors');

const hostname = os.hostname();
const ipAddress = ip.address();
const { pid } = process;


let utilsConfig = {
  showhidden: false,
  depth: null, //Specifies the number of times to recurse while formatting the object.
  colors: false,
  maxArrayLength: 100, //Specifies the maximum number of array and TypedArray elements to include when formatting
  breakLength: 60 //The length at which an object's keys are split across multiple lines -- default: 60
};
const infraLog = {
  pid,
  hostname,
  ipAddress,
  env,
  service,
  appVer: '1.0.0'
};
const _methodMap = {
  debug: 'debug',
  error: 'error',
  fatal: 'fatal',
  info: 'info',
  warn: 'warning'
};

// Just proxy methods we don't care about on the original console object
function consoleProxy(obj) {
  const methods = ['log', 'dir', 'time', 'timeEnd', 'trace', 'assert'];

  methods.forEach(method => {
    if (!obj[method]) {
      obj[method] = () => {
        return console[method].apply(console, arguments);
      };
    }
  });
}

const frameRegex = /(?<dirName>\w+)\/(?<fileName>\w+)\.js/;

function getPathCalleeInfo(frame) {
  let dirName = 'bin';
  let fileName = 'www';

  const result = frameRegex.exec(frame);
  if (!result) {
    return { dirName, fileName };
  }

  dirName = result.groups.dirName.toUpperCase();
  fileName = result.groups.fileName;

  return { dirName, fileName };
}

const origPST = Error.prepareStackTrace;

function createLogMethod(method) {
  return function(message='', data={}) {
    Error.prepareStackTrace = (err, stack) => {
      Error.prepareStackTrace = origPST;
      return stack;
    };

    const msgType = Object.prototype.toString.call(message);
    const dataType = Object.prototype.toString.call(data);
    const stack = new Error().stack;

    // for verification purposes only
    if (__filename !== stack[0].getFileName()) {
      console.error('log files do not match', __filename);
      return;
    }

    const pathCallee = stack[1].getFileName();
    const funtionCallee = stack[1].getFunctionName();
    const { dirName, fileName } = getPathCalleeInfo(pathCallee);
    const component = `${dirName}--${fileName}--${funtionCallee}`;

    if (message && msgType === '[object Object]') {
      data = message;
      message = '';
    }

    if (dataType !== '[object Object]') {
      const { bgColor, fontColor, reset } = logColors['fatal'];
      const toWrite = `logging data must be an Object but given ${dataType}: ${data}`;
      const toStdOut = `${bgColor}${fontColor}${toWrite}${reset}\n\n`;
      return process.stdout.write(toStdOut);
    }

    let log = {
      level: method.toUpperCase(),
      component,
      message,
      data,
      time: new Date().toISOString(),
      ...infraLog
    };

    if (method === 'error') {
      log = { ...log, stackTrace: stack.join('\n   ') };
    }

    const { bgColor, fontColor, reset } = logColors[method];
    const toWrite = util.inspect(log, utilsConfig);
    const toStdOut = `${bgColor}${fontColor}${toWrite}${reset}\n\n`;
    return process.stdout.write(toStdOut);

  };
}

function spit(options) {
  let obj = {};

  obj.debug = createLogMethod('debug');
  obj.error = createLogMethod('error');
  obj.fatal = createLogMethod('fatal');
  obj.info = createLogMethod('info');
  obj.warn = createLogMethod('warn');

  consoleProxy(obj);

  return obj;
}

module.exports = function() {
  global.logger = spit();
};
