'use client';

import React from 'react';

export type ScrollApi = {
    scrollAreaRef: React.RefObject<HTMLDivElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    updateScrollPosition: (scrollDate: ScrollToOptions) => void;
};

export const useScrollApi = (): ScrollApi => {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const updateScrollPosition = React.useCallback(
        (scrollData: ScrollToOptions) => {
            const scrollArea = scrollAreaRef.current;

            if (!scrollArea) {
                return;
            }

            scrollArea.scrollTo(scrollData);
        },
        []
    );

    return {
        scrollAreaRef,
        containerRef,
        updateScrollPosition,
    };
};
