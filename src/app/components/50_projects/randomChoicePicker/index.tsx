import React from 'react';
import styles from './styles.module.scss';

export const RandomChoicePicker = () => {
    const [inputText, setInputText] = React.useState<string[]>([]);

    return (
        <div className={styles.base}>
            <textarea
                className={styles.textarea}
                onChange={(e) =>
                    setInputText(e.target.value.split(/,/).filter(Boolean))
                }
            />
            <div className={styles.container}>
                {inputText.map((text, index) => {
                    return (
                        <p key={index} className={styles.p}>
                            {text}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};
