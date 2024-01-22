import styled, { keyframes } from 'styled-components';

const completedToggle = keyframes`
  0% {
    transform: translateX(0px) scale(1);  
}

50% {
    transform: translateX(20px) scale(1.2); 
}
  100% {
    transform: translateX(40px) scale(1);  
    }
`;

const activeToggle = keyframes`
  0% {
    transform: translateX(40px) scale(1);  
}

50% {
    transform: translateX(20px) scale(1.2); 
}
  100% {
    transform: translateX(0px) scale(1);  
}`;

export const Ball = styled.button`
    background: #fff;
    height: 34px;
    width: 34px;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    align-items: center;
    justify-content: center;
    border: none;

    &.completed {
        animation: ${completedToggle} 0.3s linear forwards;
    }

    &.active {
        animation: ${activeToggle} 0.3s linear forwards;
    }

    &:hover {
        cursor: pointer;
    }
`;

export const Container = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
    padding: 20px;
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Text = styled.div`
    color: #000000;
    font-size: 18px;
    letter-spacing: 1px;
    margin-left: 10px;
`;

export const ToggleArea = styled.div`
    position: relative;
    background-color: #d0d0d0;
    border-radius: 50px;
    cursor: pointer;
    margin: 0 15px 0;
    width: 80px;
    height: 40px;
    transition: background-color 0.3s;

    &.completed {
        background-color: #8e44ad;
    }
`;

export const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & + & {
        margin-top: 10px;
    }
`;

export const Block = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    margin-top: 10px;
`