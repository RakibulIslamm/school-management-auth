import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { timestamp, combine, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  const newDate = new Date(timestamp);
  return `${newDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })} [${label}] ${level} ${message}`;
});

export const infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'now!' }), timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      level: 'info',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right now!' }), timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'error-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      level: 'error',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

/* 

const infoFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}, [${label}] ${level} ${message}`.bgBlue
})
const errorFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}, [${label}] ${level} ${message}`.bgRed
})

*/
