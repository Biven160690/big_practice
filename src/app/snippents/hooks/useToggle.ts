import React from 'react';

export default function useToggle(defaultValue: boolean) {
    const [value, setValue] = React.useState<boolean>(defaultValue);

    return React.useMemo(
        () => ({
            toggleValue: (value?: boolean) => {
                setValue((prev) => (value ? value : !prev));
            },
            value,
        }),
        [value]
    );
}
