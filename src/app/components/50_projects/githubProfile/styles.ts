import styled, { keyframes, css } from 'styled-components';

export const Input = styled.input`
    width: 100%;
    display: block;
    background-color: #4c2885;
    border: none;
    border-radius: 10px;
    color: #fff;
    padding: 1rem;
    margin-bottom: 5px;
    font-family: inherit;
    font-size: 1rem;
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
        0 15px 40px rgba(0, 0, 0, 0.1);
`;

export const Block = styled.div`
    width: 300px;
    padding: 10px;
`;

const rotation = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}`;

export const Loader = styled.div`
    width: 48px;
    height: 48px;
    border: 5px solid;
    border-color: #ff3d00 transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
`;

const Wrapper = css`
    width: 100%;
    background-color: #4c2885;
    border-radius: 20px;
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
        0 15px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 12px;
`;

export const CardWrapper = styled.div`
    ${Wrapper}

    .avatar {
        border-radius: 50%;
        border: 2px solid #2a2a72;
        height: 80px;
        width: 80px;
        margin-right: 10px;
        background: no-repeat center / cover;
    }

    h2 {
        color: #eee;
        margin-bottom: 10px;
    }

    p {
        color: #eee;
        margin-bottom: 10px;
    }

    .followers,
    .following,
    .amountRepos {
        display: flex;
    }

    .amount,
    .text {
        color: #eee;
    }

    .text {
        margin-right: 5px;
    }

    .repos {
        display: flex;
        margin-top: 10px;
    }

    .repo {
        padding: 4px;
        color: #eee;
        text-decoration: none;
        background-color: #212a72;
        
        &:not(:first-child) {
            margin-left: 5px;
        }
    }
`;

export const EmptyCardWrapper = styled.div`
    ${Wrapper}

    justify-content: center;
    align-items: center;

    h2 {
        color: #eee;
    }
`;

export const ErrorCardWrapper = styled.div`
    ${Wrapper}

    justify-content: center;
    align-items: center;

    h1,
    h2 {
        color: #eee;
    }
`;
