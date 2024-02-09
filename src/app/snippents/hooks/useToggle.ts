import { useState } from 'react';

export default function useToggle(
    defaultValue: boolean
): [boolean, (value?: boolean) => void] {
    const [value, setValue] = useState<boolean>(defaultValue);

    const toggleValue = (value?: boolean) => {
        setValue((prev) => (value ? value : !prev));
    };

    return [value, toggleValue];
}
