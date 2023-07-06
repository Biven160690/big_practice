'use client';

import { useTabsContext } from './useTabsContext';
import { EventClick } from './Tabs';
import { StyledTab } from './styles';

export type Props = React.PropsWithChildren<{
    value: string;
    color?: string;
    textSize?: string;
    bgColor?: string;
    disabled?: boolean;
}>;

export const Tab = ({
    children,
    color,
    textSize,
    bgColor,
    disabled = false,
    value,
}: Props) => {
    const { currentTab, handleClick } = useTabsContext();

    return (
        <StyledTab
            $textSize={textSize}
            color={color}
            $bgColor={bgColor}
            disabled={disabled}
            onClick={(e: EventClick) => handleClick(value, e, disabled)}
            $isActive={value === currentTab}
        >
            {children}
        </StyledTab>
    );
};
