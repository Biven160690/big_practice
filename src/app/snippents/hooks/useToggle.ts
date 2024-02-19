import React from 'react';

export default function useToggle(
    defaultValue: boolean
): [boolean, (value?: boolean) => void] {
    const [value, setValue] = React.useState<boolean>(defaultValue);

    const toggleValue = React.useCallback((value?: boolean) => {
        setValue((prev) => (value ? value : !prev));
    }, []);

    return [value, toggleValue];
}
