'use client';

import React from 'react';

import { TabsContext } from './useTabsContext';

import { Tab } from './Tab';
import { TabsColumn, TabsRow } from './styles';

export type EventClick = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export type Props = React.PropsWithChildren<{
    onChange: (value: string, e?: EventClick) => void;
    currentTab: string;
}>;

export const Tabs = ({ children, onChange, currentTab }: Props) => {
    const handleClick = React.useCallback(
        (value: string, e: EventClick, isDisabled: boolean) => {
            if (!isDisabled) {
                onChange(value, e);
            }
        },
        [onChange]
    );

    const value = React.useMemo(
        () => ({ currentTab, handleClick }),
        [currentTab, handleClick]
    );

    return (
        <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
    );
};

Tabs.Tab = Tab;
Tabs.Row = TabsRow;
Tabs.Column = TabsColumn;
