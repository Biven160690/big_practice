import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

export const DragNDrop = () => {
    const [hoveredElement, setHoveredElement] = React.useState<number>(-1);
    const [selectedCard, setSelectedCard] = React.useState<number>(0);

    const onDragEnd = () => {
        setSelectedCard(hoveredElement);
        setHoveredElement(-1);
    };

    return (
        <div className={styles.base}>
            {new Array(5).fill(0).map((_, index) => (
                <div
                    key={index}
                    className={cx(
                        styles.card,
                        hoveredElement === index && styles.card__dragOver
                    )}
                    onDragOver={() => setHoveredElement(index)}
                >
                    {index === selectedCard && (
                        <div
                            className={cx(
                                styles.img,
                                hoveredElement > -1 && styles.img__startDrag,
                                hoveredElement !== selectedCard &&
                                    styles.img__finishDrag
                            )}
                            draggable
                            onDragEnd={onDragEnd}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
