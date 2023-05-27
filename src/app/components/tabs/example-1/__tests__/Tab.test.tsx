import 'jest-styled-components';
import renderer from 'react-test-renderer';

import { TabsContext } from '../useTabsContext';
import { Tabs } from '../Tabs';

describe('After user click should updated currentTab', () => {
    const tabText = 'Test Tab';
    const value = { currentTab: '1', handleClick: jest.fn() };

    test('render Tab', () => {
        const element = renderer.create(
            <TabsContext.Provider value={value}>
                <Tabs.Tab value="test" disabled>
                    {tabText}
                </Tabs.Tab>
            </TabsContext.Provider>
        );

        expect(element.root.findByType('button').children).toEqual([tabText]);
        expect(element.root.findByType('button').props.disabled).toBeTruthy();
    });
});
