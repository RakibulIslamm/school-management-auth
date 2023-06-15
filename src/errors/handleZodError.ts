/* eslint-disable no-console */
import { ZodError, ZodIssue } from 'zod';
import { GenericErrorResponse } from '../interfaces/GenericErrorResponse';
import { GenericErrorMessageType } from '../interfaces/error';

export const handleZodError = (error: ZodError): GenericErrorResponse => {
  //   console.log(error);

  const statusCode = 403;
  const errors: GenericErrorMessageType[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    }
  );
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
