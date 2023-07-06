import { useInfiniteCarousel } from '../hooks/useInfiniteCarousel';

import { Carousel } from '../carousel';

import styles from './styles.module.scss';

const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
const step = 115;

export const InfiniteCarousel = () => {
    const {
        cardPosition,
        cardList,
        handleDirectionNext,
        handleDirectionPrev,
        onMouseWheel,
    } = useInfiniteCarousel(cards);

    return (
        <div className={styles.infiniteCarousel}>
            <button
                onClick={handleDirectionNext}
                className={styles.infiniteCarousel__button_left}
            >
                &lt;
            </button>
            <div className={styles.infiniteCarousel__body}>
                <Carousel.Infinite
                    onMouseWheel={onMouseWheel}
                    step={step}
                    cardPosition={cardPosition}
                >
                    {cardList.map(({ id }, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.infiniteCarousel__card}
                            >
                                {id}
                            </div>
                        );
                    })}
                </Carousel.Infinite>
            </div>
            <button
                onClick={handleDirectionPrev}
                className={styles.infiniteCarousel__button_right}
            >
                &gt;
            </button>
        </div>
    );
};
