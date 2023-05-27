'use client';

import React from 'react';
import { StyledContainer } from './styles';

export type EventClick = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export type Props = React.PropsWithChildren<{
    onChange: (index: number, e?: EventClick) => void;
    column?: boolean;
    currentTab?: number;
    position?: string;
}>;

export const Tabs = ({
    children,
    onChange,
    currentTab,
    column,
    position,
}: Props) => {
    const handleClick = (
        index: number,
        e: EventClick,
        isDisabled: boolean = false
    ) => {
        if (!isDisabled) {
            onChange(index + 1, e);
        }
    };
 
    return (
        <React.Fragment>
            <StyledContainer
                $currentTab={currentTab}
                column={column}
                position={position}
            >
                {React.Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) {
                        return null;
                    }
                    const prop = {
                        onClick: (e: EventClick) =>
                            handleClick(index, e, child.props.disabled),
                    };
                    return React.cloneElement(child, prop);
                })}
            </StyledContainer>
        </React.Fragment>
    );
};
