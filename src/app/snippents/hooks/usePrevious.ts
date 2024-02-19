import React from 'react';

export const usePrevious = <T>(currentValue: T) => {
    const currentValueRef = React.useRef<T>(currentValue);
    const prevValueRef = React.useRef<T | string>('');

    if (currentValueRef.current !== currentValue) {
        prevValueRef.current = currentValueRef.current;
        currentValueRef.current = currentValue;
    }

    return prevValueRef.current;
};

// Another approach to get prevValue
// export const usePrevious = (currentValue: any) => {
//     const prevValueRef = React.useRef<any>('');

//     React.useLayoutEffect(() => {
//         prevValueRef.current = currentValue;
//     }, [currentValue]);

//     return prevValueRef.current;
// };
