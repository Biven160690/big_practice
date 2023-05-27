'use client';

import React from 'react';
import { Tab } from './styles';
import { Tabs } from './index';

export const TabPanel = () => {
    const [value, setValue] = React.useState<number>(1);

    const handleChange = (index: number) => setValue(index);

    return (
        <Tabs onChange={handleChange} currentTab={value}>
            <Tab>button </Tab>
            <Tab>button </Tab>
            <Tab>button </Tab>
            <Tab disabled>button</Tab>
        </Tabs>
    );
};
