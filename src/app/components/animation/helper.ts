const commonStyles = {
    from: { opacity: 0, transform: 'translateY(-100%)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
}

const styles = [
    {
        from: { opacity: 0, transform: 'translateY(-100%)' },
        to: { opacity: 1, transform: 'translateY(0%)' },
    },
    {
        from: { opacity: 0, transform: 'translateY(100%)' },
        to: { opacity: 1, transform: 'translateY(0%)' },
    },
    {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        to: { opacity: 1, transform: 'translateY(0%)' },
    },
    {
        from: { opacity: 0, transform: 'translateX(100%)' },
        to: { opacity: 1, transform: 'translateY(0%)' },
    }
];

const parentDelay = 1000;
const childrenDelay = 200;
const example = [{ elements: [1, 2, 3, 4, 5, 6] }, { elements: [1, 2, 3, 4, 5, 6] }];

const getCurrentDelay = (amountChildren: number, prevDelay: number) => {
    if (amountChildren === 0) {
        return Math.floor(prevDelay * 1.35)
    }

    return Math.floor((prevDelay + amountChildren * childrenDelay) * 1.05)
}

const getAnimationDelays = (amountParent: number, amountChildren: number = 0) => {
    return Array.from(Array(amountParent)).reduce((accum, _, index) => {
        if (index === 0) {
            accum.push(parentDelay);
        } else {
            accum.push(getCurrentDelay(amountChildren, accum[index - 1]));
        }

        return accum;
    }, []);
};

export { getAnimationDelays, example, childrenDelay, styles, commonStyles };
