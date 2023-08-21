'use client';

import React from 'react';

import { Tabs } from './Tabs';
import { Tooltip } from '../../tooltip';
import { Example } from '../../tooltip/example';

export const TabPanel = () => {
    const [currentTab, setCurrentTab] = React.useState<string>('1');

    const handleChange = (value: string) => setCurrentTab(value);

    return (
        <Tabs onChange={handleChange} currentTab={currentTab}>
            <Tabs.Row>
                <Tooltip content={<Example />}>
                    <Tabs.Tab value="1">Tab </Tabs.Tab>
                </Tooltip>
                <Tooltip content={<Example />}>
                    <Tabs.Tab value="2">Tab </Tabs.Tab>
                </Tooltip>
                <Tooltip content={<Example />}>
                    <Tabs.Tab value="3">Tab </Tabs.Tab>
                </Tooltip>
                <Tooltip content={<Example />}>
                    <Tabs.Tab value="4">Tab </Tabs.Tab>
                </Tooltip>
            </Tabs.Row>
        </Tabs>
    );
};
