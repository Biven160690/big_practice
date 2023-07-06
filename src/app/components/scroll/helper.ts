function getIncreasedCardList<T>(data: T[]): T[] {
    const newCardList: T[] = [];

    for (let i = 0; i < 5; i++) {
        newCardList.push(...data);
    }

    return newCardList;
}

const parameters: {
    [key: string]: number[];
} = {
    next: [-1, 1, 0, 0],
    prev: [0, 1, 0],
};

const reverseArrayItems = (item: number[], key: string): number[] => {
    const newItems = [...item];
    const [start, deleteCount, startIndex, newCount = newItems.length] =
        parameters[key];

    newItems.splice(
        newCount,
        startIndex,
        ...newItems.splice(start, deleteCount)
    );

    return newItems;
};

const getScrollPosition = (
    container: HTMLDivElement,
    scrollArea: HTMLDivElement,
    cardWidth: number,
    selectedCard: number
) => {
    const containerWidth = container.clientWidth;
    const scrollAreaWidth = scrollArea.clientWidth;

    const paddingIndent = (containerWidth - scrollAreaWidth) / 2;
    const scrollPosition = selectedCard * cardWidth + paddingIndent;

    if (scrollPosition < containerWidth) {
        return 0;
    }

    return scrollPosition - containerWidth;
};

export { getIncreasedCardList, reverseArrayItems, getScrollPosition };
