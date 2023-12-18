import React from 'react';
import { Slider } from './slider';
import styles from './styles.module.scss';

export type Card = {
    text?: string;
    title?: string;
    bg: string;
};

const mocks: { firstSlider: Card[]; secondSlider: Card[] } = {
    firstSlider: [
        {
            title: 'Flying eagle',
            text: 'in the sunset',
            bg: '#FFB866',
        },
        {
            title: 'Nature flower',
            text: 'all in pink',
            bg: '#FD3555',
        },
        {
            title: 'Bluuue Sky',
            text: "with it's mountains",
            bg: '#2A86BA',
        },
        {
            title: 'Lonely castle',
            text: 'in the wilderness',
            bg: '#252E33',
        },
    ],
    secondSlider: [
        {
            bg: 'https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80',
        },
        {
            bg: 'https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80',
        },
        {
            bg: 'https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80',
        },
        {
            bg: 'https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80',
        },
    ],
};

const sliderBg = {
    getBackgroundColor: (value: string) => ({
        background: `${value}`,
    }),
    getBackgroundImage: (value: string) => ({
        backgroundImage: `url(${value})`,
    }),
};

export const SliderContainer = () => {
    const [firstSlider, setFirstSlider] = React.useState<number>(0);
    const [secondSlider, setSecondSlider] = React.useState<number>(
        () => mocks.secondSlider.length - 1
    );

    const amountSecondSliderCards = mocks.secondSlider.length - 1;

    const handlerFirstSliderClick = () => {
        setFirstSlider((prev) =>
            firstSlider >= amountSecondSliderCards ? 0 : prev + 1
        );
        setSecondSlider((prev) =>
            secondSlider === 0 ? amountSecondSliderCards : prev - 1
        );
    };

    const handleSecondSliderClick = () => {
        setFirstSlider((prev) =>
            firstSlider === 0 ? amountSecondSliderCards : prev - 1
        );
        setSecondSlider((prev) =>
            secondSlider >= amountSecondSliderCards ? 0 : prev + 1
        );
    };

    return (
        <div className={styles.base}>
            <Slider
                cards={mocks.firstSlider}
                classNames={{
                    base: styles.leftSlider,
                    button: styles.leftButton,
                }}
                onClick={handlerFirstSliderClick}
                currentCard={firstSlider}
                getBackground={sliderBg.getBackgroundColor}
            />
            <Slider
                cards={mocks.secondSlider}
                classNames={{
                    base: styles.rightSlider,
                    button: styles.rightButton,
                    cardContainer: styles.cardContainer,
                    arrow: styles.rightArrow,
                }}
                onClick={handleSecondSliderClick}
                currentCard={secondSlider}
                getBackground={sliderBg.getBackgroundImage}
            />
        </div>
    );
};
