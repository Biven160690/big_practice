import React from 'react';
import { Block, Input, Loader } from './styles';
import { Card } from './card';
import { ErrorContent } from './error';
import { EmptyCard } from './card/emptyCard';
import { initialState, reducer, UserProfile } from './reducer';
import { requestInitial, getUserData, getRequestError, requestAbort } from './actions';

const API_URL = 'https://api.github.com/users/';
const REPO_PATH = '/repos?sort=created&per_page=3';
const ABORTING_SIGNAL = 'abortingSignal';

type UserProfileData = {
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
};

type RepoData = {
    name: string;
    html_url: string;
}[];

type ResponseType = UserProfileData & RepoData;

export type AbortResponse = React.MutableRefObject<{
    userData: AbortController;
    userRepos: AbortController;
}>;

const fields = {
    user: ['avatar_url', 'followers', 'following', 'public_repos'],
    repo: ['name', 'html_url'],
};

const collectUserProfile = (
    item: { [key: string]: string },
    fields: string[]
) => {
    const obj: { [key: string]: string[] | string } = {};

    fields.forEach((field) => {
        obj[field] = item[field];
    });

    return obj;
};

const formattingData = (response: ResponseType[]) => {
    return response.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return {
                ...acc,
                repos: item.map((item) =>
                    collectUserProfile(item, fields.repo)
                ),
            };
        }

        return { ...acc, ...collectUserProfile(item, fields.user) };
    }, {});
};

export const abortResponses = (abortResponse: AbortResponse) => {
    abortResponse.current.userData.abort();
    abortResponse.current.userRepos.abort();
};

const updateResponseSignal = (abortResponse: AbortResponse) => {
    abortResponse.current.userData = new AbortController();
    abortResponse.current.userRepos = new AbortController();
};

export const Container = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const abortResponse = React.useRef({
        userData: new AbortController(),
        userRepos: new AbortController(),
    });

    const { gitHubProfile, error, loading } = state;

    React.useEffect(() => {
        const fetchData = (inputData: string) => {
            dispatch(requestInitial());

            const { userRepos, userData } = abortResponse.current;

            const fetchPromise = Promise.allSettled([
                fetch(`${API_URL}${inputData}${REPO_PATH}`, {
                    signal: userRepos.signal,
                }),

                fetch(`${API_URL}${inputData}`, {
                    signal: userData.signal,
                }),
            ]);

            const abortingSignal = new Promise((_, reject) => {
                timeoutId.current = setTimeout(() => {
                    reject({ name: ABORTING_SIGNAL, message: ABORTING_SIGNAL });
                }, 10000);
            });

            Promise.race([fetchPromise, abortingSignal])
                .then((results) => {
                    const fulfilledResult =
                        results as PromiseFulfilledResult<Response>[];

                    const responseOk = fulfilledResult.some(
                        (element) => element.value?.ok
                    );

                    if (!responseOk) {
                        throw new Error(`HTTP error! Status: 404`);
                    }

                    const response = fulfilledResult
                        .filter((response) => response.status === 'fulfilled')
                        .map((response) => response.value.json());

                    return Promise.all(response) as unknown as ResponseType[];
                })
                .then((response) => {
                    dispatch(
                        getUserData(formattingData(response) as UserProfile)
                    );
                    clearTimeout(timeoutId.current);
                })
                .catch((error: Error) => {
                    if (error.name === ABORTING_SIGNAL) {                        
                        dispatch(requestAbort(abortResponse));
                    }

                    dispatch(getRequestError(error));
                });
        };

        const handleKeyboardEvent = (event: KeyboardEvent) => {
            const input = inputRef.current;

            if (!input) {
                return;
            }

            if (event.key === 'Enter' && input.value !== '') {
                if (loading) {
                    abortResponses(abortResponse);
                    updateResponseSignal(abortResponse);
                    clearTimeout(timeoutId.current);
                }

                fetchData(input.value);
                input.value = '';
                input.blur();
            }
        };

        document.addEventListener('keydown', handleKeyboardEvent);

        return () =>
            document.removeEventListener('keydown', handleKeyboardEvent);
    }, [loading]);

    React.useEffect(
        () => () => {
            abortResponses(abortResponse);
            clearTimeout(timeoutId.current);
        },
        []
    );

    return (
        <Block>
            <Input ref={inputRef} />
            {(() => {
                switch (true) {
                    case loading:
                        return <Loader />;
                    case error !== null:
                        return <ErrorContent errorContent={error} />;
                    case gitHubProfile !== null:
                        return <Card {...gitHubProfile} />;
                    default:
                        return <EmptyCard />;
                }
            })()}
        </Block>
    );
};
