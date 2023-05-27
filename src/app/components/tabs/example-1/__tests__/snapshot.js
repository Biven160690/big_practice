import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { StyledTab, TabsRow, TabsColumn } from '../styles';
import { Tabs } from '../Tabs';
import { TabPanel } from '../TabPanel';
import { TabsContext } from '../useTabsContext';

it('renders StyledTab', () => {
    const tree = renderer.create(<StyledTab />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders TabsRow', () => {
    const tree = renderer.create(<TabsRow />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders TabsColumn', () => {
    const tree = renderer.create(<TabsColumn />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders Tabs', () => {
    const { container } = render(<Tabs />);
    expect(container).toMatchSnapshot();
});

it('renders Tab', () => {
    const tabText = 'Test Tab';
    const value = { currentTab: '1', handleClick: jest.fn() };

    const { container } = render(
        <TabsContext.Provider value={value}>
            <Tabs.Tab value="test" disabled>
                {tabText}
            </Tabs.Tab>
        </TabsContext.Provider>
    );
    expect(container).toMatchSnapshot();
});

it('renders TabPanel', () => {
    const { container } = render(<TabPanel />);
    expect(container).toMatchSnapshot();
});
