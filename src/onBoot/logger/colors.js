// Color Configuration
const cc = {
  sys: {
      reset: '\x1b[0m',
      bold: '\x1b[1m',
      dim: '\x1b[2m',
      italic: '\x1b[3m',
      underscore: '\x1b[4m',
      reverse: '\x1b[7m',
      strikethrough: '\x1b[9m',
      backoneline: '\x1b[1A',
      cleanthisline: '\x1b[K'
  },
  font: {
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
  },
  bg: {
      black: '\x1b[40m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m'
  }
}

const logColors = {
  debug: {
    fontColor: cc.font.magenta,
    bgColor: cc.sys.reset,
    reset: cc.sys.reset
  },
  error: {
    fontColor: cc.font.red,
    bgColor: cc.sys.reset,
    reset: cc.sys.reset
  },
  fatal: {
    fontColor: cc.font.white,
    bgColor: cc.bg.red,
    reset: cc.sys.reset
  },
  info: {
    fontColor: cc.font.green,
    bgColor: cc.sys.reset,
    reset: cc.sys.reset
  },
  warn: {
    fontColor: cc.font.yellow,
    bgColor: cc.sys.reset,
    reset: cc.sys.reset
  }
};


module.exports = logColors;
