'use client';

import styled from 'styled-components';

export type TabProps = {
    color?: string;
    $textSize?: string;
    $bgColor?: string;
    disabled?: boolean;
}

export type ContainerProps = {
    $currentTab?: number;
    position?: string;
    column?: boolean;
}

export const Tab = styled.button<TabProps>`
    background-color: ${({ $bgColor = '#244fea' }) => ($bgColor)};
    border: none;
    color: ${({ color = '#ffffff' }) => (color)};
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: ${({ $textSize = '16' }) => ($textSize)}px;
    transition: background-color ;
    border-radius:10px;
    cursor: pointer;

    &:hover {
        filter: brightness(1.3);
    }

    &:disabled {
        filter: brightness(1);
        background-color: #cccccc;
        color: #666666;
        cursor: default; 
    }
`;

export const StyledContainer = styled.div<ContainerProps>`
    display: flex;
    justify-content: ${({ position = 'center' }) => (position)};
    flex-direction: ${({ column = false }) => (column ? 'column' : 'row')};
    width: 100%;
    margin: 0 15px;

    & ${Tab}:not(:last-child) {
        margin: ${({ column = false }) => (column ? '0 0 10px 0' : '0 10px 0 0')};
    }

    & ${Tab}:nth-child(${({ $currentTab = 1 }) => $currentTab}) {
        background-color: green;
    }
`;
