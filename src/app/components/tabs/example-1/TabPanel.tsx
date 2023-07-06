'use client';

import React from 'react';

import { Tabs } from './Tabs';

export const TabPanel = () => {
    const [currentTab, setCurrentTab] = React.useState<string>('1');

    const handleChange = (value: string) => setCurrentTab(value);

    return (
        <Tabs onChange={handleChange} currentTab={currentTab}>
            <Tabs.Row>
                <Tabs.Tab value="1">Tab </Tabs.Tab>
                <Tabs.Tab value="2">Tab </Tabs.Tab>
                <Tabs.Tab value="3">Tab </Tabs.Tab>
                <Tabs.Tab value="4" disabled>
                    Tab
                </Tabs.Tab>
            </Tabs.Row>
        </Tabs>
    );
};
