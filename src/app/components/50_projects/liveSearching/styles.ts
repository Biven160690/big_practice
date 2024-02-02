import styled from "styled-components";

export const Container = styled.div`
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 10px;
`;

export const Header = styled.div`
  background-color: rgb(30, 50, 159);
  color: rgb(232, 230, 227);
  padding: 30px 20px;

  h2 {
    margin: 0;
    margin-bottom: 5px;
  }

  p {
    margin: 0;
    margin-bottom: 15px;
  }

  input {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: initial;
    color: rgb(232, 230, 227);
    font-size: 14px;
    padding: 10px 5px;
    width: 100%;
    border: 0;
    border-radius: 50px;
  }
`;

export const FilteringContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const Circle = styled.div`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`

export const Card = styled.div`
  display: flex;
  padding: 20px;

  &:not(:last-of-type) {
    border-bottom-color: rgb(53, 57, 59);
    border-bottom: 1px solid #eee;
  }

  div {
    margin-left: 10px;
  }

  h4 {
    margin: 0 0 10px;
  }

  p {
    font-size: 12px;
  }
`;
