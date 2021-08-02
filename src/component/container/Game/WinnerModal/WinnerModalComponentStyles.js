import styled from "styled-components";

export const StyledWinnerModalWrapper = styled.div`
    position: absolute;
    top: 0;
    display: ${({display}) => display ? 'flex' : 'none' };
    width: 100%;
    height: 100%;
    background: black;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    z-index: 2;
`

export const StyledWinnerModalContainer = styled.aside`
    width: 650px;
`

export const StyledWinnerModalHeader = styled.h2`
    color: red;
`

export const StyledWinnerModalTableContainer = styled.div`

`

export const StyledPlayAgainButton = styled.button`
    height: 40px;
    width: 120px;
    border-radius: 4px;
    margin: 30px;
`