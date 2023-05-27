'use client';

import styled, { css } from 'styled-components';

export type TabDirectionProp = {
    position?: string;
};

export type StyledTab = {
    $isActive: boolean;
    color?: string;
    $textSize?: string;
    $bgColor?: string;
    disabled?: boolean;
};

export const StyledTab = styled.button<StyledTab>`
    background-color: ${({ $bgColor = '#244fea', $isActive }) =>
        $isActive ? 'green' : $bgColor};
    border: none;
    color: ${({ color = '#ffffff' }) => color};
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: ${({ $textSize = '16' }) => $textSize}px;
    transition: background-color;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        filter: brightness(1.3);
    }

    &:disabled {
        filter: brightness(1);
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
`;

const TabDirectionStyles = css`
    width: 100%;
    display: flex;
    margin: 0 15px;
`;

export const TabsRow = styled.div<TabDirectionProp>`
    ${TabDirectionStyles}

    justify-content: ${({ position = 'center' }) => position};
    flex-direction: row;

    & :not(:last-child) {
        margin: 0 10px 0 0;
    }
`;

export const TabsColumn = styled.div<TabDirectionProp>`
    ${TabDirectionStyles}

    align-items: ${({ position = 'center' }) => position};
    flex-direction: column;

    & :not(:last-child) {
        margin: 0 0 10px 0;
    }
`;
