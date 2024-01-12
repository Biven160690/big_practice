import { AbortResponse } from '.';
import { Errors, UserProfile } from './reducer';

export enum Request {
    ERROR = 'ERROR',
    INITIAL = 'INITIAL',
    SUCCESSFUL = 'SUCCESSFUL',
    ABORT = 'ABORT',
}

export type ERROR = {
    type: Request.ERROR;
    payload: Errors;
};

export type SUCCESSFUL = {
    type: Request.SUCCESSFUL;
    payload: UserProfile;
};

export type ABORT = {
    type: Request.ABORT;
    payload: AbortResponse;
};

export type INITIAL = {
    type: Request.INITIAL;
};

export type Actions = ERROR | SUCCESSFUL | INITIAL | ABORT;

export const requestInitial = (): INITIAL => ({
    type: Request.INITIAL,
});

export const getUserData = (data: UserProfile): SUCCESSFUL => ({
    type: Request.SUCCESSFUL,
    payload: data,
});

export const getRequestError = (data: Errors): ERROR => ({
    type: Request.ERROR,
    payload: data,
});

export const requestAbort = (data: AbortResponse): ABORT => ({
    type: Request.ABORT,
    payload: data,
});
