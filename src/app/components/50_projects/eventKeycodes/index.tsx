import React from 'react';
import styles from './styles.module.scss';

export type Event = {
    key: string;
    keyCode: number | null;
    code: string;
};
export const EventKeycodes = () => {
    const [event, setEvent] = React.useState<Event>({
        key: '',
        keyCode: null,
        code: '',
    });

    React.useLayoutEffect(() => {
        const handleEvent = (e: KeyboardEvent) => {
            const { key, keyCode, code } = e;
            setEvent({ key, keyCode, code });
        };

        window.addEventListener('keydown', handleEvent);

        return () => {
            window.removeEventListener('keydown', handleEvent);
        };
    }, []);

    return (
        <div className={styles.base}>
            <div className={styles.block}>
                <div className={styles.text}>key</div>
                <div className={styles.key}>
                    <div className={styles.data}>{event.key}</div>
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.text}>keyCode</div>
                <div className={styles.key}>
                    <div className={styles.data}>{event.keyCode}</div>
                </div>
            </div>
            <div className={styles.block}>
                <div className={styles.text}>code</div>
                <div className={styles.key}>
                    <div className={styles.data}>{event.code}</div>
                </div>
            </div>
        </div>
    );
};
