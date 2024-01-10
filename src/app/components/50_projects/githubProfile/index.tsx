import React from 'react';
import { Block, Input, Loader } from './styles';
import { Card } from './card';
import { ErrorContent } from './error';
import { EmptyCard } from './card/emptyCard';

const API_URL = 'https://api.github.com/users/';
const REPO_PATH = '/repos?sort=created&per_page=3';

export type SelectFieldsArguments = {
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
};

const fields: { [key: string]: string[] } = {
    0: ['avatar_url', 'login', 'followers', 'following', 'public_repos'],
    1: ['name', 'html_url'],
};

interface ResponseData {
    [key: string]: unknown;
}

function selectFields<T extends ResponseData>(
    data: T,
    fields: (keyof T)[]
): Pick<T, (typeof fields)[number]> {
    const selectedData: Partial<Pick<T, (typeof fields)[number]>> = {};

    fields.forEach((field) => {
        selectedData[field] = data[field];
    });

    return selectedData as Pick<T, (typeof fields)[number]>;
}

const getData = (response: any[]): GitHubProfile => {
    return response.reduce((acc, item) => {
        if (item.hasOwnProperty(fields[0][0])) {
            return { ...acc, ...selectFields(item, fields[0]) };
        } else {
            return {
                ...acc,
                repos: item.map((result: any) => selectFields(result, fields[1])),
            };
        }
    }, {} as GitHubProfile);
};

export type GitHubProfile = {
    avatar_url: string;
    login: string;
    followers: number;
    following: number;
    public_repos: number;
    repos: { name: string; html_url: string }[];
};

export type Error = {
    name: string;
    message: string;
} | null;

export const Container = () => {
    const [gitHubProfile, setGitHubProfile] =
        React.useState<GitHubProfile | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const abortResponseUserData = new AbortController();
    const abortResponseUserRepos = new AbortController();

    React.useEffect(() => {
        const fetchData = (inputData: string) => {
            setLoading(true);
            setError(null);
            setGitHubProfile(null);

            const fetchPromise = Promise.allSettled([
                fetch(`${API_URL}${inputData}${REPO_PATH}`, {
                    signal: abortResponseUserRepos.signal,
                }),

                fetch(`${API_URL}${inputData}`, {
                    signal: abortResponseUserData.signal,
                }),
            ]);

            const abortingSignal = new Promise((_, reject) =>
                setTimeout(() => {
                    reject(new Error('oops something went wrong'));
                    abortResponseUserData.abort();
                    abortResponseUserRepos.abort();
                }, 5000)
            );

            Promise.race([fetchPromise, abortingSignal])
                .then((results) => {
                    const fulfilledResult =
                        results as PromiseFulfilledResult<Response>[];

                    const responseOk = fulfilledResult.some(
                        (element) => element.value.ok
                    );

                    if (!responseOk) {
                        throw new Error(`HTTP error! Status: 404`);
                    }

                    const response = fulfilledResult.reduce((acc, first) => {
                        if (first.status === 'fulfilled') {
                            acc.push(first.value.json());
                            return acc;
                        }
                    }, []);

                    return Promise.all(response);
                })
                .then((response) => {
                    setLoading(false);
                    setGitHubProfile(getData(response));
                })
                .catch((error) => {
                    const { name, message } = error;

                    if (error.name !== 'AbortError') {
                        setLoading(false);
                        setError({
                            name,
                            message,
                        });
                    }
                });
        };

        const handleKey = (event: KeyboardEvent) => {
            const input = inputRef.current;

            if (!input) {
                return;
            }

            if (event.key === 'Enter' && input.value !== '') {
                if (loading) {
                    abortResponseUserData.abort();
                    abortResponseUserRepos.abort();
                }

                fetchData(input.value);
                input.value = '';
                input.blur();
            }
        };

        document.addEventListener('keydown', handleKey);

        return () => document.removeEventListener('keydown', handleKey);
    }, [abortResponseUserData, abortResponseUserRepos, loading]);

    React.useEffect(
        () => () => {
            abortResponseUserData.abort();
            abortResponseUserRepos.abort();
        },
        [abortResponseUserData, abortResponseUserRepos]
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
