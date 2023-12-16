import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

const mocks = {
    title: 'Hello I am frontend',
    text: 'I like js, html, scss, react and also I will learn another language',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    firstName: 'Sergion',
    lastName: 'Conor',
    birthday: 'Oct 08, 2020',
};

type Data = {
    title: string;
    text: string;
    img: string;
    avatar: string;
    firstName: string;
    lastName: string;
    birthday: string;
};

export const Placeholder = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<Data>();

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setData(mocks);
            setLoading(false);
        }, 2000);

        return () => clearInterval(intervalId);
    });

    return (
        <div className={cx(styles.base, loading && styles.base__loading)}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${data?.img})` }}
            />
            <div className={styles.content}>
                <h3 className={styles.title}>{data?.title}</h3>
                <p className={styles.text}>{data?.text}</p>
            </div>
            <div className={styles.userInfo}>
                <div
                    className={styles.avatar}
                    style={{ backgroundImage: `url(${data?.avatar})` }}
                />
                <div className={styles.description}>
                    <div className={styles.fullName}>
                        <strong className={styles.firstName}>
                            {data?.firstName}
                        </strong>
                        <strong className={styles.lastName}>
                            {data?.lastName}
                        </strong>
                    </div>
                    <small className={styles.birthday}>{data?.birthday}</small>
                </div>
            </div>
        </div>
    );
};
