import React, { ChangeEvent } from 'react';
import styles from './styles.module.scss';
import { Notes } from './Notes';

export type Notes = {
    id: number;
    value: string;
}[];

export type LocalStorageData = {
    currentNotes: Notes;
    prevNotes: Notes;
};

export const LOCAL_STORAGE_KEY = 'notes';

const getStorageData = () => {
    const storageData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storageData) {
        return JSON.parse(storageData);
    }

    return [];
};

const updateStorageData = (notes: Notes) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
};

const checkInputValue = (currentNotes: Notes, prevNotes: Notes) => {
    if (currentNotes !== prevNotes) {
        return true;
    }

    return currentNotes.some(
        (notes, index) => notes.value !== prevNotes[index].value
    );
};

const deleteSelectedItem = (notes: Notes, selectedIdNotes: number) =>
    notes.filter((notes) => notes.id !== selectedIdNotes);

const addNotes = (notes: Notes, id: number) => [...notes, { id, value: '' }];

export const NotesApp = () => {
    const [notes, setNotes] = React.useState<Notes>(() => getStorageData());
    const storageData = React.useRef<LocalStorageData>({
        currentNotes: getStorageData(),
        prevNotes: [],
    });

    const handleAddNotes = () => {
        const id = new Date().getTime();
        storageData.current.currentNotes = addNotes(
            storageData.current.currentNotes,
            id
        );
        setNotes((prev) => addNotes(prev, id));
    };

    const handleDeleteNotes = (id: number) => () => {
        setNotes(deleteSelectedItem(notes, id));
        storageData.current.currentNotes = deleteSelectedItem(
            storageData.current.currentNotes,
            id
        );
    };

    const handleUpdateNotes =
        (id: number) => (event: ChangeEvent<HTMLTextAreaElement>) => {
            storageData.current.currentNotes =
                storageData.current.currentNotes.map((notes) => {
                    if (notes.id === id) {
                        return { ...notes, value: event.target.value };
                    }

                    return notes;
                });
        };

    React.useEffect(() => {
        const intervalID = setInterval(() => {
            const { currentNotes, prevNotes } = storageData.current;

            if (checkInputValue(currentNotes, prevNotes)) {
                updateStorageData(currentNotes);
                storageData.current.prevNotes = currentNotes;
            }
        }, 300);

        return () => {
            clearInterval(intervalID);
        };
    }, []);

    return (
        <div className={styles.base}>
            <button className={styles.add} onClick={handleAddNotes}>
                Add note
            </button>
            <div className={styles.container}>
                {notes.map(({ id, value }) => (
                    <Notes
                        key={id}
                        onDeleteNotes={handleDeleteNotes(id)}
                        onChangeNotes={handleUpdateNotes(id)}
                        value={value}
                    />
                ))}
            </div>
        </div>
    );
};
