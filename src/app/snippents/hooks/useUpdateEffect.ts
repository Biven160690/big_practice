import React from 'react';

export const useUpdateEffect = <F extends () => void, T extends any[]>(
    handler: F,
    dependencies: T
) => {
    const handlerRef = React.useRef<F>(handler);

    React.useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    React.useEffect(() => {
        return () => handlerRef.current();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies]);
};
