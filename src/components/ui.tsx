import styled, { createGlobalStyle } from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

export const SidebarDiv = styled.div`
  width: 300px;
  height: 100%;
  background-color: #363636;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 32px 0 16px 0;
`;

export const GlobalStyles = createGlobalStyle`
    body {
        color: #FFF;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        box-sizing: border-box;
    }
`;
