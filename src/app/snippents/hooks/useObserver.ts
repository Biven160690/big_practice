import React from 'react';

export type ObserverManagement =
    | {
          prevTarget: HTMLElement;
          observer: IntersectionObserver;
      }
    | {
          prevTarget: null;
          observer: null;
      };

export const useObserver = () => {
    const observerManagement = React.useRef<ObserverManagement>({
        prevTarget: null,
        observer: null,
    });

    React.useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const { observer, prevTarget } = observerManagement.current;
            if (observer) {
                observer.unobserve(prevTarget);
            }
        };
    }, []);

    return React.useMemo(
        () => ({
            runObserver: (
                options: IntersectionObserverInit,
                target: HTMLElement,
                fn: () => void
            ) => {
                const { observer, prevTarget } = observerManagement.current;

                if (observer) {
                    observer.unobserve(prevTarget);
                }
                observerManagement.current.observer = new IntersectionObserver(
                    ([entries]) => entries.isIntersecting && fn(),
                    options
                );
                observerManagement.current.observer.observe(target);
                observerManagement.current.prevTarget = target;
            },
        }),
        []
    );
};
