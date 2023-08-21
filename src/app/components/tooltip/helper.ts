interface TooltipInterface {
    tooltip: HTMLDivElement;
    content: HTMLDivElement;
    children: HTMLDivElement;
}

export class TooltipManagement implements TooltipInterface {
    tooltip: HTMLDivElement;
    content: HTMLDivElement;
    children: HTMLDivElement;

    constructor(
        tooltip: HTMLDivElement,
        content: HTMLDivElement,
        children: HTMLDivElement
    ) {
        this.tooltip = tooltip;
        this.content = content;
        this.children = children;
    }

    getProperties() {
        return {
            childrenWidth: this.children.offsetWidth,
            childrenHeight: this.children.offsetHeight,
            topChildren: this.children.offsetTop,
            leftChildren: this.children.offsetLeft,
            contentWidth: this.content.offsetWidth,
            contentHeight: this.content.offsetHeight,
            clientHeight: document.documentElement.clientHeight,
            clientWidth: document.documentElement.clientWidth,
        };
    }

    getAvailableSpace(event: MouseEvent) {
        const {
            childrenWidth,
            childrenHeight,
            leftChildren,
            topChildren,
            contentWidth,
            contentHeight,
            clientHeight,
            clientWidth,
        } = this.getProperties();
        const { pageX } = event;

        const isFreeTop = topChildren > contentHeight;
        const isFreeRight =
            clientWidth - (leftChildren + childrenWidth) > contentWidth;
        const isFreeLeft = leftChildren > contentWidth;
        const isFreeBottom =
            clientHeight - (topChildren + childrenHeight) > contentHeight;
        const isLeft = pageX < leftChildren + Math.ceil(childrenWidth / 2);

        if (isFreeLeft && isFreeTop && isFreeRight && isFreeBottom) {
            return isLeft ? 'left' : 'right';
        }

        if (isFreeTop && isFreeRight) {
            return 'rightTop';
        }

        if (isFreeTop && isFreeLeft) {
            return 'leftTop';
        }

        if (isFreeBottom && isFreeLeft) {
            return 'leftBottom';
        }

        if (isFreeBottom && isFreeRight) {
            return 'rightBottom';
        }
    }

    updatePosition(event: MouseEvent) {
        const { contentWidth, contentHeight } = this.getProperties();
        const { pageY, pageX } = event;
        const point = this.getAvailableSpace(event);

        const styleContent = this.content.style;

        switch (point) {
            case 'left':
                styleContent.display = 'block';
                styleContent.left = `${pageX - contentWidth + 10}px`;
                styleContent.top = `${pageY - contentHeight + 5}px`;
                break;
            case 'right':
                styleContent.display = 'block';

                styleContent.left = `${pageX + 10}px`;
                styleContent.top = `${pageY - contentHeight + 5}px`;
                break;
            case 'rightBottom':
                styleContent.display = 'block';

                styleContent.left = `${pageX + 25}px`;
                styleContent.top = `${pageY + 5}px`;
                break;
            case 'rightTop':
                styleContent.display = 'block';

                styleContent.left = `${pageX + 25}px`;
                styleContent.top = `${pageY - contentHeight + 5}px`;
                break;
            case 'leftTop':
                styleContent.display = 'block';
                styleContent.left = `${pageX - contentWidth + 25}px`;
                styleContent.top = `${pageY - contentHeight + 5}px`;
                break;
            case 'leftBottom':
                styleContent.display = 'block';
                styleContent.left = `${pageX - contentWidth + 25}px`;
                styleContent.top = `${pageY + 5}px`;
                break;
            default:
                throw new Error('This window has not free place for tooltip');
        }
    }

    hide() {
        this.content.style.display = 'none';
    }
}
