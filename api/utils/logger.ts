import winston, { format } from 'winston';

const logger : winston.Logger = winston.createLogger({ 
  transports: [
    new winston.transports.Console({ 
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.colorize()
      ), 
      level: "debug" 
    })
  ]
});

export default logger;