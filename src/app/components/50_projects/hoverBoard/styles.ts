import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgb(13, 14, 14);
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    gap: 3px;
    width: 586px;
    padding: 3px;
`;

export const Square = styled.div<{ $color: string }>`
    width: 16px;
    height: 16px;
    background-color: #1d1d1d;
    box-shadow: rgb(0, 0, 0) 0px 0px 2px;
    cursor: pointer;
    transition: background-color 3.8s ease, box-shadow 3.8s ease;

    &:hover {
        background-color: ${({ $color }) => $color};
        box-shadow: ${({ $color }) => `0 0 2px ${$color}, 0 0 10px ${$color}`};
        transition-duration: 0s;
    }
`;
