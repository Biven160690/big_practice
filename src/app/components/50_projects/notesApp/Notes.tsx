import React, { ChangeEvent } from 'react';

import styles from './styles.module.scss';

const defaultStyles = {
    minWidth: '100px',
    maxWidth: '300px',
    height: '100px',
};

export type Props = {
    onDeleteNotes: () => void;
    onChangeNotes: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
};

export const Notes = ({ onDeleteNotes, onChangeNotes, value }: Props) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const areaContainerRef = React.useRef<HTMLDivElement | null>(null);

    const onEditTextarea = () => {
        const textarea = textareaRef.current;

        if (!textarea) {
            return;
        }

        textarea.disabled = !textarea.disabled;
    };

    React.useEffect(() => {
        const areaContainer = areaContainerRef.current;
        const textarea = textareaRef.current;

        if (!(areaContainer && textarea)) {
            return;
        }

        const handleResize = () => {
            const textareaWidth = textarea.offsetWidth;
            areaContainer.style.width = `${textareaWidth}px`;
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(textarea);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className={styles.areaContainer} ref={areaContainerRef}>
            <div className={styles.controlPanel}>
                <button className={styles.edit} onClick={onEditTextarea}>
                    Edit
                </button>
                <button className={styles.delete} onClick={onDeleteNotes}>
                    Delete
                </button>
            </div>
            <textarea
                ref={textareaRef}
                style={defaultStyles}
                onChange={onChangeNotes}
                defaultValue={value}
            ></textarea>
        </div>
    );
};
