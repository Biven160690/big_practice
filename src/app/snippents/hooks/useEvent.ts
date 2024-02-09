import React from 'react';

/**
 * This is proposal: https://github.com/reactjs/rfcs/pull/220
 *
 * See also: https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 *
 * Example to use:
 * ```tsx
 * function Foo() {
 *   const [text, setText] = useState('');
 *
 *   const handleClick = useEvent(() => {
 *       sendMessage(text);
 *   });
 *
 *   // SendButton has memo HOC wrapper
 *   return <SendButton onClick={handleClick} />;
 * }
 * ```
 */

export function useEvent<A extends any[], R>(handler: (...args: A) => R) {
    const handlerRef = React.useRef(handler);

    React.useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    return React.useCallback((...args: A) => {
        const fn = handlerRef.current;
        return fn(...args);
    }, []);
}
