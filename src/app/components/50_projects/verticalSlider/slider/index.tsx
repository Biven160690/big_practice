import { Card } from '..';
import styles from './styles.module.scss';
import cx from 'classnames';

export type Background = 'background' | 'backgroundImage';

export type Props = {
    classNames?: {
        base?: string;
        cardContainer?: string;
        button?: string;
        arrow?: string;
    };
    cards: Card[];
    onClick: () => void;
    currentCard: number;
    getBackground: (
        value: string
    ) => { background: string } | { backgroundImage: string };
};

export const Slider = ({
    classNames,
    cards,
    onClick,
    currentCard,
    getBackground,
}: Props) => {
    return (
        <div className={cx(styles.base, classNames?.base)}>
            <div
                className={styles.container}
                style={{ transform: `translateY(-${currentCard * 100}%)` }}
            >
                {cards.map(({ bg, title, text }, index) => (
                    <div
                        className={cx(
                            styles.cardContainer,
                            classNames?.cardContainer
                        )}
                        key={index}
                        style={getBackground(bg)}
                    >
                        {title && (
                            <div className={styles.content}>
                                <h1 className={styles.title}>{title}</h1>
                                <p className={styles.text}>{text}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                className={cx(styles.button, classNames?.button)}
                onClick={onClick}
            >
                <div className={cx(styles.arrow, classNames?.arrow)} />
            </button>
        </div>
    );
};
