import React from 'react';

type SetProps<S> = S extends string
    ? <V>(value: V, key?: string) => void
    : <V>(value: V, key: string) => void;

type StorageValue<T> = T extends undefined ? any : T;

type GetProps<S, T> = S extends string
    ? (key?: string) => StorageValue<T> | null
    : (key: string) => StorageValue<T> | null;

type RemoveProps<S> = S extends string
    ? (key?: string) => void
    : (key: string) => void;

export type StorageSettings<K, V> = {
    storage: Storage;
    defaultKey?: K;
    defaultValue?: V;
};

const getStorageKey = <K>(defaultKey: K | undefined, key?: string) => {
    const storageKey = key ?? defaultKey;

    if (!storageKey) {
        throw new Error('Don`t have key');
    }

    return storageKey;
};

// I need to re-watch my way in this code.

export const useStorage = <K extends string | undefined, V>(
    storage: Storage,
    defaultKey?: K,
    defaultValue?: V
) => {
    const storageRef = React.useRef<StorageSettings<K, V>>({
        defaultKey,
        defaultValue,
        storage,
    });

    return React.useMemo(() => {
        const set: SetProps<K> = <F>(value: F, key?: string) => {
            const { defaultKey, storage } = storageRef.current;
            const storageKey = getStorageKey<K>(defaultKey, key);

            storage.setItem(storageKey, JSON.stringify(value));
        };

        const get: GetProps<K, V> = (key?: string) => {
            const { defaultKey, storage } = storageRef.current;
            const storageKey = getStorageKey<K>(defaultKey, key);

            const result = storage.getItem(storageKey);
            return result ? JSON.parse(result) : null;
        };

        const initialStorage = () => {
            const { defaultValue, defaultKey } = storageRef.current;
            const storageKey = getStorageKey<K>(defaultKey);

            const result = get(storageKey);

            if (!result && defaultValue !== undefined) {
                set(defaultValue, storageKey);
                return defaultValue;
            }

            if (result === null) {
                throw new Error('Don`t have defaultValue');
            }

            return result;
        };

        const remove: RemoveProps<K> = (key?: string) => {
            const { defaultKey, storage } = storageRef.current;
            const storageKey = getStorageKey<K>(defaultKey, key);

            storage.removeItem(storageKey);
        };

        return {
            set,
            get,
            remove,
            initialStorage,
        };
    }, []);
};
