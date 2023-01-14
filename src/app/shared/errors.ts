import { HttpErrorResponse } from "@angular/common/http";
import { MonoTypeOperatorFunction, catchError, EMPTY, throwError } from "rxjs";
import { Error } from "./error.model";

export const handleError = (
  status: number,
  errorCode: string,
  callback: () => void
): MonoTypeOperatorFunction<any> => {
  return catchError((error) => {
    if(hasError(error, status, errorCode)) {
      callback();

      return EMPTY;
    }

    return throwError(() => error);
  });
};

export const hasError = (
  error: any,
  status: number,
  errorCode: string
): boolean => {
  if(!(error instanceof HttpErrorResponse) || error.status !== status) {
    return false;
  }
  const errors = error.error?.errors as Error[] | undefined;

  return !!errors && errors?.some((error) => error.code === errorCode);
};
