import React from 'react';
import styles from './styles.module.scss';

export type Notification = {
    title: number;
}[];

export const ToastNotification = () => {
    const [notification, setNotification] = React.useState<Notification>([]);
    const amountNotification = React.useRef<number>(0);

    const onClick = () => {
        setNotification((prev) => [
            ...prev,
            { title: ++amountNotification.current },
        ]);
    };

    React.useEffect(() => {
        if (!notification.length) {
            amountNotification.current = 0;
            return;
        }

        const intervalId = setInterval(() => {
            setNotification((prev) => prev.slice(1, notification.length));
        }, 500);

        return () => clearInterval(intervalId);
    }, [notification]);

    return (
        <React.Fragment>
            <button className={styles.button} onClick={onClick}>
                Show Notification
            </button>
            <div className={styles.container}>
                {notification.map(({ title }, index) => (
                    <div className={styles.notification} key={index}>
                        {title}
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};
