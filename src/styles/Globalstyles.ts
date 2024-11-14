import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
        font-size: 16px;
    }
    html {
        height: 100%; 

    }
    body {
        height: 100%; 
        overflow-y: scroll; 
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #ffffff;
        margin-bottom: 100px;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    ol, ul {
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
    input {
        &:focus {
            outline: none; 
            border: 1px solid #B3D5EB;
        }
    }
    textarea {
        &:focus {
            outline: none; 
            border: 1px solid #B3D5EB;
        }
    }
    select {
        &:focus {
            outline: none; 
            border: 1px solid #B3D5EB;
        }
    }
`;

export default GlobalStyles;
