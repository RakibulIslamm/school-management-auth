/* eslint-disable no-console */
import 'colors';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';

let server: Server;

async function run() {
  try {
    const conn = await mongoose.connect(config.database_url as string);
    // console.log(`Database connected on host: ${conn.connection.host}`.bgBlue)
    infoLogger.info(`Database connected on host: ${conn.connection.host}`);
    server = app.listen(config.port, () => {
      // console.log(`Server listening on port ${config.port}`)
      infoLogger.info(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      // console.log(`Database connection error: ${error.message}`.bgRed)
      errorLogger.error(`Database connection error: ${error.message}`);
    } else {
      errorLogger.error(error);
    }
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      errorLogger.error(error);
      process.exit(1);
    }
  });
}
run();

process.on('SIGTERM', () => {
  infoLogger.info('Sigterm is received');
  if (server) {
    server.close();
  }
});
