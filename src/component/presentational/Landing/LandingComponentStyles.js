import styled, { css } from 'styled-components';

export const StyledLandingContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StyledLandingSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${({alignItems}) => alignItems ? alignItems : 'center'};
    margin-bottom: 60px;
    width: 100%;
`

export const StyledIntroTextContainer = styled.div`
    margin-left: 8%;
    margin-right: 8%;
`

export const StyledIntroTextLine = styled.p`
    text-align: left;
    width: 100%;
`

export const StyledVideoDemoWrapper = styled.div`
    width: 60%;
`

const landingCardContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    padding: 0 20% 0 20%;
    height: 200px;
    background: gray;
`

export const StyledEngineersContainer = styled.div`
    ${landingCardContainer};
`

export const StyledEngineerCard = styled.div`

`

export const StyledEngineerCardName = styled.h2`

`

export const StyledTechContainer = styled.div`
    ${landingCardContainer};
`

export const StyledTechCard = styled.div`

`

export const StyledTechCardName = styled.h2`

`