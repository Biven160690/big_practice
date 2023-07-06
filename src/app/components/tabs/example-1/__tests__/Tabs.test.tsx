import * as React from 'react';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Tabs } from '../Tabs';

describe('Testing the update state', () => {
    const setState = jest.fn();
    const useStateMock = (initState: string) => [initState, setState];

    afterEach(() => {
        jest.clearAllMocks();
    });

    const handleClick = (value: string) => setState(value);

    test('Updating state after click', () => {
        jest.spyOn(React, 'useState').mockImplementation(
            useStateMock as () => [unknown, React.Dispatch<unknown>]
        );
        const { getByText } = render(
            <Tabs onChange={handleClick} currentTab="1">
                <Tabs.Row>
                    <Tabs.Tab value="1">Tab-1</Tabs.Tab>
                    <Tabs.Tab value="2">Tab-2</Tabs.Tab>
                </Tabs.Row>
            </Tabs>
        );
        fireEvent.click(getByText('Tab-1'));
        expect(setState).toHaveBeenCalledWith('1');

        fireEvent.click(getByText('Tab-2'));
        expect(setState).toHaveBeenCalledWith('2');
    });

    test('Tabs has row direction', () => {
        const element = renderer
            .create(
                <Tabs onChange={handleClick} currentTab="1">
                    <Tabs.Row>
                        <Tabs.Tab value="1">Tab</Tabs.Tab>
                    </Tabs.Row>
                </Tabs>
            )
            .toJSON();

        expect(element).toHaveStyleRule('flex-direction', 'row');
    });
});
