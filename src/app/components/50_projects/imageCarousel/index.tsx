import React from 'react';
import {
    Container,
    CardsContainer,
    Card,
    ButtonContainer,
    Button,
} from './styles';
import { animated, useSpring } from 'react-spring';

export type Ref<T> = React.MutableRefObject<T>;
export type Setting = {
    cardWidth: number;
    amountCards: number;
    containerPosition: Ref<number>;
};

const mockData = [
    {
        color: 'red',
    },
    {
        color: 'green',
    },

    {
        color: 'blue',
    },
    {
        color: 'yellow',
    },
];

const checkRef = (
    ref: Ref<HTMLDivElement | null>,
    fn: (setting: Setting) => void,
    containerPosition: Ref<number>
) => {
    const cardsContainer = ref.current;

    if (!cardsContainer) {
        return;
    }

    const cardWidth = cardsContainer.children[0].clientWidth;
    const amountCards = cardsContainer.children.length - 1;

    fn({ cardWidth, amountCards, containerPosition });
};

const runInterval = (
    intervalID: Ref<NodeJS.Timeout | undefined>,
    fn: () => void
) => {
    clearInterval(intervalID.current);

    intervalID.current = setInterval(() => {
        fn();
    }, 1500);
};

export const ImageCarousel = () => {
    const cardsContainerRef = React.useRef<HTMLDivElement | null>(null);
    const containerPosition = React.useRef<number>(0);
    const intervalID = React.useRef<NodeJS.Timeout>();

    const [containerStyles, api] = useSpring(() => ({
        from: { transform: 'translateX(0)' },
    }));

    const handleShowPrevCard = ({
        cardWidth,
        amountCards,
        containerPosition,
    }: Setting) => {
        const point =
            containerPosition.current === 0
                ? (containerPosition.current += amountCards * cardWidth)
                : (containerPosition.current -= cardWidth);

        api.set({
            transform: `translateX(-${point}px)`,
        });

        runInterval(intervalID, () =>
            checkRef(cardsContainerRef, handleShowNextCard, containerPosition)
        );
    };

    const handleShowNextCard = React.useCallback(
        ({ cardWidth, amountCards, containerPosition }: Setting) => {
            const point =
                containerPosition.current >= amountCards * cardWidth
                    ? (containerPosition.current -= amountCards * cardWidth)
                    : (containerPosition.current += cardWidth);

            api.set({
                transform: `translateX(-${point}px)`,
            });

            runInterval(intervalID, () =>
                checkRef(
                    cardsContainerRef,
                    handleShowNextCard,
                    containerPosition
                )
            );
        },
        [api]
    );

    React.useEffect(() => {
        intervalID.current = setInterval(() => {
            checkRef(cardsContainerRef, handleShowNextCard, containerPosition);
        }, 1500);
        return () => clearInterval(intervalID.current);
    }, [handleShowNextCard]);

    return (
        <Container>
            <CardsContainer
                as={animated.div}
                ref={cardsContainerRef}
                style={containerStyles}
            >
                {mockData.map((card, index) => (
                    <Card
                        key={index}
                        style={{ backgroundColor: `${card.color}` }}
                    />
                ))}
            </CardsContainer>
            <ButtonContainer>
                <Button
                    onClick={() =>
                        checkRef(
                            cardsContainerRef,
                            handleShowPrevCard,
                            containerPosition
                        )
                    }
                >
                    Prev
                </Button>
                <Button
                    onClick={() =>
                        checkRef(
                            cardsContainerRef,
                            handleShowNextCard,
                            containerPosition
                        )
                    }
                >
                    Next
                </Button>
            </ButtonContainer>
        </Container>
    );
};
