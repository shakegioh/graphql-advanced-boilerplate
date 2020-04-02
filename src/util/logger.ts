import log4js from 'log4js';
import '@log4js-node/logstashudp';

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    logstash: {
      type: '@log4js-node/logstashudp',
      host: 'localhost',
      port: 5000,
      extraDataProvider: (loggingEvent: any) => ({
        pid: loggingEvent.pid,
        application: 'graphql-advanced-boilerplate', // this will be added
        fields: loggingEvent.data[1],
      })
    },
  },
  categories: {
    default: { appenders: ['console', 'logstash'], level: 'debug' },
  },
});

const logger = log4js.getLogger();
logger.level = 'debug';

export default logger;
