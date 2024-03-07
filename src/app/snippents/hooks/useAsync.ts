import React from 'react';

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

export const useAsync = <T>() => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<Error | null>(null);
    const [data, setData] = React.useState<T>();
    const [link, setLink] = React.useState<string>();

    // I could notes that I do not need to use try/catch because  I set error myself from switch/case

    React.useEffect(() => {
        if (!link) {
            return;
        }

        setIsLoading(true);

        const managementSignal = new AbortController();

        const getData = async () => {
            try {
                const response = await fetch(link, {
                    signal: managementSignal.signal,
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
    }, [link]);

    return React.useMemo(
        () => ({
            isLoading,
            error,
            data,
            fetchData: (link: string) => setLink(link),
        }),
        [data, error, isLoading]
    );
};
