import React from 'react';

export const useStateWithHistory = <T>(defaultValue: T) => {
    const [value, setValue] = React.useState<T>(defaultValue);
    const historyRef = React.useRef<T[]>([defaultValue]);
    const pointHistoryRef = React.useRef<number>(0);

    const set = React.useCallback((value: any) => {
        historyRef.current.push(value);
        setValue(value);
        pointHistoryRef.current = historyRef.current.length - 1;
    }, []);

    const reset = React.useCallback(() => (historyRef.current = []), []);

    const back = React.useCallback(() => {
        if (pointHistoryRef.current > 0) {
            setValue(historyRef.current[--pointHistoryRef.current]);
        }
    }, []);

    const forward = React.useCallback(() => {
        if (pointHistoryRef.current < historyRef.current.length - 1) {
            setValue(historyRef.current[++pointHistoryRef.current]);
        }
    }, []);

    const go = React.useCallback((index: number) => {
        if (index >= 0 && index <= historyRef.current.length - 1) {
            setValue(historyRef.current[(pointHistoryRef.current = index)]);
        }
    }, []);

    return React.useMemo(
        () => ({
            value,
            back,
            forward,
            go,
            set,
            reset,
        }),
        [back, forward, go, reset, set, value]
    );
};
