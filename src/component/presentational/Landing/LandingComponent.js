import React from 'react';
import { StyledEngineersContainer, StyledIntroTextContainer, StyledIntroTextLine, StyledLandingContainer, StyledLandingSection, StyledVideoDemoWrapper, StyledEngineerCard, StyledTechContainer, StyledTechCard, StyledTechCardName, StyledEngineerCardName } from './LandingComponentStyles';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const LandingComponent = () => {
    return (
        <StyledLandingContainer>
            <LandingIntro />
            <LandingDemo />
            <LandingEngineers />
            <LandingTech />
        </StyledLandingContainer>
    );
}

const LandingIntro = () => {
    return (
        <StyledLandingSection alignItems="flex-start">
            <StyledIntroTextContainer>
                <StyledIntroTextLine>
                    A card-game project involving spades for the mintbean hackathon.
                </StyledIntroTextLine>
                <StyledIntroTextLine>
                    The project features include this and that and this and that and this and that and this and that
                </StyledIntroTextLine>
                <StyledIntroTextLine>
                    Click play at the top to play the card game! Or click tutorial to find the rules of the game.
                </StyledIntroTextLine>
            </StyledIntroTextContainer>
        </StyledLandingSection>
    )
}

const LandingDemo = () => {
    return (
        <StyledLandingSection>
            <div>Demo</div>
            <StyledVideoDemoWrapper>
                <LiteYouTubeEmbed 
                    id="hddwAIXbKZo"
                    title="2k Video Demo"
                />
            </StyledVideoDemoWrapper>
        </StyledLandingSection>
    )
}

const engineersConfig = [
    {
        name: "Alex",
        image: '',
    },
    {
        name: "Carlo",
        image: '',
    },
    {
        name: "Amar",
        image: '',
    }
]

const returnEngineerCard = (engineer) => {
    return (
        <StyledEngineerCard>
            <div>
                Engineer-Image-Here
            </div>
            <StyledEngineerCardName>
                {engineer.name}
            </StyledEngineerCardName>
        </StyledEngineerCard>
    )
}

const LandingEngineers = () => {
    return (
        <StyledLandingSection>
            <StyledEngineersContainer>
                {engineersConfig.map((engineer) => returnEngineerCard(engineer))}
            </StyledEngineersContainer>
        </StyledLandingSection>
    )
}

const techConfig = [
    {
        name: 'React',
        icon: '',
    },
    {
        name: 'Styled-Components',
        icon: '',
    },
    {
        name: 'JavaScript',
        icon: '',
    },
    {
        name: 'Figma',
        icon: '',
    },
]

const returnTechCard = (techItem) => {
    return (
        <StyledTechCard>
            <div>
                Tech-Icon-Here
            </div>
            <StyledTechCardName>
                {techItem.name}
            </StyledTechCardName>
        </StyledTechCard>
    )
}

const LandingTech = () => {
    return (
        <StyledLandingSection>
            <StyledTechContainer>
                {techConfig.map((item) => returnTechCard(item))}
            </StyledTechContainer>
        </StyledLandingSection>
    )
}

export default LandingComponent;