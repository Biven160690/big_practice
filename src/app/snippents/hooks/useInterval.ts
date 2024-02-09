import React from 'react';

export type ReturnType = { [ket: string]: () => void };

export const useInterval = (
    handler: () => void,
    delay: number | null = null
): ReturnType => {
    const handlerRef = React.useRef<() => void>(handler);
    const delayRef = React.useRef<number | null>(delay);
    const timeOutId = React.useRef<NodeJS.Timeout | null>(null);

    React.useLayoutEffect(() => {
        handlerRef.current = handler;
        delayRef.current = delay;
    });

    const start = React.useCallback(() => {
        const delay = delayRef.current;

        if (delay !== null) {
            timeOutId.current = setInterval(() => handlerRef.current(), delay);
        }
    }, []);

    const clear = React.useCallback(() => {
        const id = timeOutId.current;

        if (id !== null) {
            clearTimeout(id);
        }
    }, []);

    const reset = React.useCallback(() => {
        clear();
        start();
    }, [clear, start]);

    React.useEffect(() => {
        return () => clear();
    }, [clear]);

    return { pause: clear, reset, start };
};
