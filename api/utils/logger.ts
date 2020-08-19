import winston, { format } from 'winston';

const logger : winston.Logger = winston.createLogger({ 
  transports: [
    new winston.transports.Console({ 
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.colorize()
      ), 
      level: process.env.TEST ? 'silent' : "debug" 
    })
  ]
});

export default logger;