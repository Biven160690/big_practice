import React from 'react';

type RandomObject = { [key: string]: any };
type ShallowEqual = (
    obj1: RandomObject,
    obj2: RandomObject,
    fn: () => void
) => void;
type Options = RequestInit & {
    link: string;
};

const statusProcessing = <T>(
    data: T,
    status: number,
    setData: (data: T) => void,
    setIsLoading: (status: boolean) => void
) => {
    switch (true) {
        case status >= 200 && status < 300:
            setData(data);
            setIsLoading(false);
            break;
        // Here you need to place your logic for processing statuses
        default:
            throw new Error(`HTTP error! Status: ${status} Error ${data}`);
    }
};

const shallowEqual: ShallowEqual = (obj1, obj2, fn) => {
    Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every((key) => {
            return (
                Object.prototype.hasOwnProperty.call(obj2, key) &&
                obj1[key] === obj2[key]
            );
        }) &&
        fn();
};

export const useFetch = <T>() => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any | null>(null);
    const [data, setData] = React.useState<T | null>(null);
    const [options, setOptions] = React.useState<Options | null>(null);

    // I could notes that I do not need to use try/catch because I set error myself from switch/case

    React.useEffect(() => {
        if (!options) {
            return;
        }

        setIsLoading(true);
        setError(null);
        setData(null);

        const managementSignal = new AbortController();

        const getData = async () => {
            const { link, ...rest } = options;
            try {
                const response = await fetch(link, {
                    signal: managementSignal.signal,
                    ...rest,
                });

                const { status } = response;
                const data: T = await response.json();
                statusProcessing(data, status, setData, setIsLoading);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        getData();

        return () => managementSignal.abort();
    }, [options]);

    return React.useMemo(
        () => ({
            isLoading,
            error,
            data,
            fetchData: (currentOptions: Options) =>
                shallowEqual(currentOptions, options || {}, () =>
                    setOptions(currentOptions)
                ),
        }),
        [data, error, isLoading, options]
    );
};
