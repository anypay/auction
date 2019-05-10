
import * as winston from 'winston';

const log = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'auction' },
  transports: [

    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});


export {

  log

}
