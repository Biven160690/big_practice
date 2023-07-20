import React from 'react';

import styles from './styles.module.scss';

export const Example = () => {
    return (
        <div className={styles.example}>
            <div className={styles.title}>Hello I am tooltip</div>
            <div className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                atque eligendi eum laudantium illum, a maiores soluta odit
                doloremque ipsum nostrum error. Fugit magnam sint maiores, vero
                quae repellendus ad!
            </div>
        </div>
    );
};
