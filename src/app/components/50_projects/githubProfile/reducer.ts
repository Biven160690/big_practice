import { abortResponses } from '.';
import { Actions, Request } from './actions';

export type UserProfile = {
    avatar_url: string;
    login: string;
    followers: number;
    following: number;
    public_repos: number;
    repos: { name: string; html_url: string }[];
};

export type Errors = {
    name: string;
    message: string;
};

export type State = {
    error: Errors | null;
    loading: boolean;
    gitHubProfile: UserProfile | null;
};

export const initialState: State = {
    error: null,
    loading: false,
    gitHubProfile: null,
};

export const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case Request.INITIAL:
            return {
                loading: true,
                gitHubProfile: null,
                error: null,
            };

        case Request.SUCCESSFUL:
            return {
                gitHubProfile: action.payload,
                loading: false,
                error: null,
            };

        case Request.ERROR:
            return {
                gitHubProfile: null,
                error: action.payload,
                loading: false,
            };

        case Request.ABORT:
            if (!state.gitHubProfile) {
                abortResponses(action.payload);
            }
            return state;

        default:
            throw Error('Unknown action: ' + action);
    }
};
