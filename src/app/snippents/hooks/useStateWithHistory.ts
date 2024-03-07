import React from 'react';

export const useStateWithHistory = <T>(
    fun: (value: T | any) => void,
    defaultValue?: T
) => {
    const handlerRef = React.useRef<(value: T | any) => void>(fun);
    const historyRef = React.useRef<T[]>(defaultValue ? [defaultValue] : []);
    const pointHistoryRef = React.useRef<number>(-1);

    return React.useMemo(
        () => ({
            set: (value: T | any) => historyRef.current.push(value),
            reset: () => {
                historyRef.current = [];
            },
            back: () => {
                if (pointHistoryRef.current > 0) {
                    handlerRef.current(
                        historyRef.current[--pointHistoryRef.current]
                    );
                }
            },
            forward: () => {
                if (pointHistoryRef.current < historyRef.current.length - 1) {
                    handlerRef.current(
                        historyRef.current[++pointHistoryRef.current]
                    );
                }
            },
            go: (index: number) => {
                if (index >= 0 && index <= historyRef.current.length - 1) {
                    handlerRef.current(
                        historyRef.current[(pointHistoryRef.current = index)]
                    );
                }
            },
        }),
        []
    );
};
