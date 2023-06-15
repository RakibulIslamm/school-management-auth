/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../../../config';
import ApiError from '../../../../errors/ApiError';
import { handleValidationError } from '../../../../errors/handleValidationError';
import { handleZodError } from '../../../../errors/handleZodError';
import { GenericErrorMessageType } from '../../../../interfaces/error';
import { errorLogger } from '../../../../shared/logger';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // Logger is not save when application is running development mode
  config.env === 'development'
    ? console.log('Global Error Handler: ', error)
    : errorLogger.error(error);

  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorMessages: GenericErrorMessageType[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedZodError = handleZodError(error);
    statusCode = simplifiedZodError.statusCode;
    message = simplifiedZodError.message;
    errorMessages = simplifiedZodError.errorMessages;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [{ path: '', message: error.message }]
      : [];
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? error.stack : '',
  });
  next();
};
