import React from 'react';

export const useDebounce = (
    handler: () => void,
    delay: number | null = null,
    dependencies: any[] = []
) => {
    const handlerRef = React.useRef<() => void>(handler);
    const delayRef = React.useRef<number | null>(delay);
    const timeOutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useLayoutEffect(() => {
        handlerRef.current = handler;
        delayRef.current = delay;
    });

    const clear = React.useCallback(() => {
      if (timeOutId.current !== null) {
          clearTimeout(timeOutId.current);
      }
  }, []);

    React.useEffect(() => {
        if (delayRef.current !== null) {
            timeOutId.current = setTimeout(
                () => handlerRef.current(),
                delayRef.current
            );
        }

        return () => clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, clear]);
};