import React from 'react';

export const useAsync = <T>(fun: () => Promise<T>) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any | null>(null);
    const [data, setData] = React.useState<T | null>(null);
    const [started, setStarted] = React.useState<boolean>(false);
    const handle = React.useRef<() => Promise<T>>(fun);

    React.useEffect(() => {
        const fetchData = handle.current;

        if (!started || !fetchData) {
            return;
        }

        setIsLoading(true);
        setError(null);
        setData(null);

        fetchData()
            .then(setData)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [started]);

    return React.useMemo(
        () => ({
            isLoading,
            error,
            data,
            runFetchData: (flag: boolean) => setStarted(flag),
        }),
        [data, error, isLoading]
    );
};

// const {isLoading, error, data, fetchData, runFetchData } = useAsync()
// fetchData(() => {
//     return new Promise((resolve, reject) => {
//         const success = false
//         setTimeout(() => {
//           success ? resolve("Hi") : reject("Error")
//        }, 1000)
//    })
// })
// fetchData(() => {
    // return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
    //     if (res.ok) return res.json()
    //     return res.json().then(json => Promise.reject(json))
    //   })
// })
