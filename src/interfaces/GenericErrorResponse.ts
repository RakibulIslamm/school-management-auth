import { GenericErrorMessageType } from './error';

export type GenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessageType[];
};
