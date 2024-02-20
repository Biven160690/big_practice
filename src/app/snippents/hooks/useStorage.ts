import React from 'react';

export type StorageType<T> = {
    defaultKey: string;
    defaultValue: T;
    storage: Storage;
};

export const useStorage = <T>(
    defaultKey: string,
    defaultValue: T,
    storage: Storage
) => {
    const storageRef = React.useRef<StorageType<T>>({
        defaultKey,
        defaultValue,
        storage,
    });

    const initialStorage = React.useCallback(() => {
        const { defaultKey, defaultValue, storage } = storageRef.current;
        const result = storage.getItem(defaultKey);

        if (!result) {
            storage.setItem(defaultKey, JSON.stringify(defaultValue));

            return defaultValue;
        }

        return JSON.parse(result);
    }, []);

    const set = React.useCallback(<VT>
        (value: VT, key: string = storageRef.current.defaultKey) => {
            const data = JSON.stringify(value);
            storageRef.current.storage.setItem(key, data);
        },
        []
    );

    const get = React.useCallback(
        (key: string = storageRef.current.defaultKey) => {
            const result = storageRef.current.storage.getItem(key);

            if (!result) {
                throw new Error(`key ${key} is not correct`);
            }

            return JSON.parse(result);
        },
        []
    );

    const remove = React.useCallback(
        (key: string = storageRef.current.defaultKey) => {
            storageRef.current.storage.removeItem(key);
        },
        []
    );

    React.useEffect(() => {
        return () => {
            window.removeEventListener('storage', remove),
                window.removeEventListener('storage', get),
                window.removeEventListener('storage', initialStorage),
                window.removeEventListener('storage', set);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return React.useMemo(
        () => ({
            set,
            get,
            remove,
            initialStorage,
        }),
        [get, remove, set, initialStorage]
    );
};

export const useStorageWithState = <T>(
    defaultKey: string,
    defaultValue: T,
    storage: Storage
) => {
    const { set, initialStorage } = useStorage<T>(
        defaultKey,
        defaultValue,
        storage
    );
    const [value, setValue] = React.useState<T>(() => initialStorage());

    React.useLayoutEffect(() => {
        if (value) {
            set(value);
        }
    }, [set, value]);

    return React.useMemo(
        () => ({
            value,
            setValue,
        }),
        [value]
    );
};
