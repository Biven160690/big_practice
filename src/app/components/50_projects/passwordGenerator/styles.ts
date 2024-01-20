import styled from 'styled-components';

export const Input = styled.input.attrs(({ type }) => ({
    type,
}))``;

export const Setting = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    justify-content: space-between;
`;

export const LabelText = styled.span`
    color: #fff;
    font-size: 16px;
`;

export const Button = styled.button<{ $mode?: string }>`
    border: none;
    background-color: #3b3b98;
    color: #fff;
    font-size: 16px;
    padding: ${props => props.$mode ? "7px 0px" : "8px 12px"};
    cursor: pointer;
    text-align: center;
    width: ${props => props.$mode ? "50px" : "100%"};
    margin-right: ${props => props.$mode ? "3px" : "0"};
`;

export const Container = styled.div`
    background-color: #23235b;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
    padding: 20px;
    width: 350px;
    max-width: 100%;
`;

export const ResultContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px 10px 10px;
    height: 20px;
    width: 100%;
    margin-bottom: 10px;
`;

export const Text = styled.div`
    color: #fff;
    font-size: 18px;
    letter-spacing: 1px;
`
