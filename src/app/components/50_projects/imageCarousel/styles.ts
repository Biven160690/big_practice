import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 500px;
    height: 530px;
    overflow: hidden;
`;

export const CardsContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    transition: transform .4s;
`;

export const Card = styled.div`
    width: 500px;
    height: 500px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export const Button = styled.button`
    background-color: blue;
    color: #fff;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    flex: 0 1 49%;
`;
