import React from 'react';

import { EventClick } from './Tabs';

export type TabsPropType = {
    children: React.ReactNode;
};

export type TabsContextType = {
    handleClick: (value: string, e: EventClick, isDisabled: boolean) => void;
    currentTab: string;
};

export const TabsContext = React.createContext<TabsContextType | null>(null);

export function useTabsContext() {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error(
            `Tabs components cannot be rendered outside the TabsProvider`
        );
    }
    return context;
}
