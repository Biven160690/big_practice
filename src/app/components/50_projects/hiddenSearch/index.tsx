import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

export const HiddenSearch = () => {
    const [isShowInput, setIsShowInput] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        const input = ref.current;

        if (input && isShowInput) {
            input.focus();
        }
    }, [isShowInput]);

    return (
        <div className={cx(styles.base, isShowInput && styles.base__show)}>
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.input}
                    ref={ref}
                />
                <button
                    className={styles.button}
                    onClick={() => setIsShowInput((prew) => !prew)}
                />
            </div>
        </div>
    );
};
