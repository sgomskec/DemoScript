import { Logger, transports } from 'winston';

const fs = require('fs');
const path = require('path');
const simpleLogger = require('simple-node-logger');

const logFileLocation = '../../../results/logs/';
const projectLogFileLocation = '../../../results/logs/';
const PROJECT_LOG_NAME_AND_TYPE = 'ProjectLog.log';
const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4,
};

const COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  trace: 'magenta',
};

function createLogger(options) {
  const { minimalLogLevel, isRelease, env } = options;
  const logger = new Logger({
    level: minimalLogLevel,
    levels: LEVELS,
    colors: COLORS,
    transports: [
      new transports.Console({
        colorize: !isRelease && env === 'local',
        prettyPrint: !isRelease && env === 'local',
        json: isRelease,
        stringify: isRelease,
      }),
    ],
  });
  return logger;
}

function createLogCatFile(logCat, testName) {
  const date = `_${new Date().toLocaleString()}`;
  const fileName = `logCat_${testName.concat(date)}`;
  const logCatlocation = path.join(__dirname, logFileLocation);
  const createLog = logCatlocation.concat(fileName);
  fs.writeFile(createLog, JSON.stringify(logCat), (err) => {
    if (err) {
      this.projectLog(err);
      return;
    }
    this.projectLog("Logcat file created for the test in '/results/logs' folder");
  });
}

function createSysLogFile(sysLog, testName) {
  const date = `_${new Date().toLocaleString()}`;
  const fileName = `sysLogs_${testName.concat(date)}`;
  const sysLogLocation = path.join(__dirname, logFileLocation);
  const createLog = sysLogLocation.concat(fileName);
  fs.writeFile(createLog, JSON.stringify(sysLog), (err) => {
    if (err) {
      this.projectLog(err);
      return;
    }
    this.projectLog("SysLog file created for the test in '/results/logs' folder");
  });
}

function createBrowserLogFile(browserLog, testName) {
  const date = `_${new Date().toLocaleString()}`;
  const fileName = `webLogs_${testName.concat(date)}`;
  const browserLogLocation = path.join(__dirname, logFileLocation);
  const createLog = browserLogLocation.concat(fileName);
  fs.writeFile(createLog, JSON.stringify(browserLog), (err) => {
    if (err) {
      this.projectLog(err);
      return;
    }
    this.projectLog("BrowserLog file created for the test in '/results/logs' folder");
  });
}

function projectLog(logMsg, level = 'info') {
  const proLoglocation = path.join(__dirname, projectLogFileLocation, PROJECT_LOG_NAME_AND_TYPE);
  const log = simpleLogger.createSimpleLogger(proLoglocation);
  if (level === 'info') {
    log.info(logMsg);
  } else if (level === 'error') {
    log.error(logMsg);
  } else if (level === 'warn') {
    log.warn(logMsg);
  }
}
module.exports = {
  createLogCatFile,
  createSysLogFile,
  createBrowserLogFile,
  projectLog,
  createLogger,
};
