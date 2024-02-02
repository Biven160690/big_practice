import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgb(24, 26, 27);
    border-color: rgb(140, 130, 115);
    border: 3px #000 solid;
    border-radius: 10px;
    padding: 35px;
    max-width: 1000px;
    text-align: center;
`;

export const Description = styled.div`
    margin-top: 10px;
`;

export const InputContainer = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    border-radius: 5px;
    font-size: 75px;
    height: 120px;
    width: 100px;
    margin: 1%;
    text-align: center;
    font-weight: 300;
    border: none;

    &:valid {
        border: 1px solid blue;
    }

    &:focus {
        border: 1px solid #eee;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        display: none;
    }
`;

export const Footer = styled.div`
    margin-top: 40px;
    display: inline-block;
    padding: 10px;
    line-height: 20px;
    max-width: 400px;
    color: #777;
    border-radius: 5px;
    background-color: rgb(36, 39, 40);
    color: rgb(157, 148, 136);
`;
