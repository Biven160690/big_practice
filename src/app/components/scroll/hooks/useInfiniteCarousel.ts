import React, { WheelEvent } from 'react';

// https://codepen.io/ryasan86/pen/QXwEbM

import { reverseArrayItems, getIncreasedCardList } from '../helper';

export type Props<T> = {
    cardList: T[];
    cardPosition: number[];
    handleDirectionNext: () => void;
    handleDirectionPrev: () => void;
    onMouseWheel: (e: WheelEvent<HTMLDivElement>) => void;
};

export function useInfiniteCarousel<T>(cards: T[]): Props<T> {
    const cardList = getIncreasedCardList(cards);

    const [cardPosition, setCardPosition] = React.useState(() =>
        cardList.map((_, i) => i)
    );

    // !!!! Delay for switch cards.

    // const [isDelay, setIsDelay] = React.useState(false);

    // React.useEffect(() => {
    //     let timeOut: NodeJS.Timeout | null = null;

    //     if (isDelay) {
    //         timeOut = setTimeout(() => setIsDelay(false), 300);
    //     }

    //     return () => {
    //         if (timeOut) {
    //             return clearTimeout(timeOut);
    //         }
    //     };
    // }, [isDelay]);

    // const handleDirectionPrev = () => {
    // if (!isDelay) {
    // setIsDelay(true);
    // setCardPosition(reverseArrayItems(cardPosition, 'prev'));
    // }
    // };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCardPosition(reverseArrayItems(cardPosition, 'next'));
        }, 5000);
        return () => clearInterval(interval);
    }, [cardPosition]);

    const handleDirectionNext = () =>
        setCardPosition(reverseArrayItems(cardPosition, 'next'));

    const handleDirectionPrev = () =>
        setCardPosition(reverseArrayItems(cardPosition, 'prev'));

    const onMouseWheel = (e: WheelEvent<HTMLDivElement>) => {
        e.deltaY < 0 ? handleDirectionNext() : handleDirectionPrev();
    };

    return {
        cardList,
        handleDirectionNext,
        handleDirectionPrev,
        cardPosition,
        onMouseWheel,
    };
}
