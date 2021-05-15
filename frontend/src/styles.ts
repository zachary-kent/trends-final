import styled from 'styled-components';
import colors from './constants/colors';
import fonts from './constants/fonts';

/**
 * References for CSS documentation:
 * Mozilla, W3Schools, https://forum.freecodecamp.org/t/background-gradient-not-working/272518
 */

export const AppContainer = styled.div`
    font-family: ${fonts.main};
`;

export const SectionContainer = styled.div`
    border-style: solid;
    border-width: 4px;
    border-radius: 10px;
    margin: auto;
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;
    display: inline-flex;
    background: linear-gradient(135deg, ${colors.skyblue}, ${colors.turquoise});
    white-space: nowrap;
    span {
        margin-right: 10px;
    }
    input, button {
        border-width: 5px;
        border-radius: 10px;
        margin: 10px;
    }
    textarea {
        position: relative;
        display: float;
        float: right;
        top: 15%;
        left: 60%;
        resize: none;
    }
    p {
        margin-right: 20px;
    }
`;

export const SectionWrapper = styled.div`
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const SiteHeader = styled.h1`
    font-color: ${colors.black};
    text-align: center;
`;

export const AuthContainer = styled.div`
    justify-content: center;
    text-align: center;
    width: 100%;
    h3 {
        text-align: center;
    }
`;

export const InputBar = styled.input`
    border-width: 5px;
    border-radius: 10px;
    margin: 10px;
`;

export const Checkbox = styled.input`
    margin-right: 10px;
`;

export const SectionHeader = styled.h2`

`;

export const SubmitButton = styled.input`
    border-widith: 10px;
    border-radius: 10px;
`;
