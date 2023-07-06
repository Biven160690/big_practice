import React from 'react';

export const useDragController = (
    scrollAreaRef: React.RefObject<HTMLDivElement> | undefined,
    isDragged: boolean
) => {
    const startX = React.useRef<number>(0);
    const scrollLeft = React.useRef<number>(0);

    React.useEffect(() => {
        const scrollArea = scrollAreaRef?.current;

        if (!isDragged || !scrollArea) {
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            scrollArea.style.cursor = 'grabbing';
            const x = e.pageX - scrollArea.offsetLeft;
            const walk = (x - startX.current) * 1;
            scrollArea.scrollLeft = scrollLeft.current - walk;
        };

        const onMouseUp = () => {
            scrollArea.style.cursor = 'grab';
            scrollArea.removeEventListener('mouseup', onMouseUp);
            scrollArea.removeEventListener('mousemove', onMouseMove);
        };

        const onMouseLeave = () => {
            scrollArea.style.cursor = 'default';
            scrollArea.removeEventListener('mousemove', onMouseUp);
            scrollArea.removeEventListener('mouseleave', onMouseLeave);
        };

        const onMouseEnter = () => {
            scrollArea.style.cursor = 'grab';
        };

        const onMousedown = (e: MouseEvent) => {
            startX.current = e.pageX - scrollArea.offsetLeft;
            scrollLeft.current = scrollArea.scrollLeft;

            scrollArea.addEventListener('mousemove', onMouseMove);
            scrollArea.addEventListener('mouseup', onMouseUp);
            scrollArea.addEventListener('mouseleave', onMouseLeave);
        };

        scrollArea.addEventListener('dragend', onMouseUp);
        scrollArea.addEventListener('mousedown', onMousedown);
        scrollArea.addEventListener('mouseenter', onMouseEnter);

        return () => {
            scrollArea.removeEventListener('mouseup', onMouseUp);
            scrollArea.removeEventListener('mouseleave', onMouseLeave);
            scrollArea.removeEventListener('mousemove', onMouseMove);
            scrollArea.removeEventListener('dragend', onMouseUp);
            scrollArea.removeEventListener('mousedown', onMousedown);
            scrollArea.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [startX, scrollLeft, scrollAreaRef, isDragged]);
};
