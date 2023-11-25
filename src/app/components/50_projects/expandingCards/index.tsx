import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

const images: { [key: string]: string } = {
    0: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    1: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    2: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
    3: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    4: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
};

export const ExpandingCards = () => {
    const [indexActiveCard, setIndexActiveCard] = React.useState<number>(0);

    return (
        <div className={styles.base}>
            {new Array(5).fill(0).map((_, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            backgroundImage: `url(${images[String(index)]})`,
                        }}
                        className={cx(
                            styles.card,
                            index === indexActiveCard && styles.card__active
                        )}
                        onClick={() => setIndexActiveCard(index)}
                    />
                );
            })}
        </div>
    );
};
