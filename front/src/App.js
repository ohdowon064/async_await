import React from 'react';
import PatchList from './pages/PatchList';
import Login from './components/Login';
import Home from './pages/Home.js';
import PatchNote from './pages/PatchNote.js';
import Header from './components/Header.js';

import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { AppContainer } from './App.style.js';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  @font-face { 
    font-family: 'MaplestoryOTFLight'; 
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFLight.woff') format('woff'); 
    font-weight: normal; 
    font-style: normal; }
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <section>
        <div className='login'>
          <Login />
        </div>
        <div className='section-content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/:name' component={PatchList} />
            <Route path='/:name/:id' component={PatchNote} />
          </Switch>
        </div>
      </section>
    </AppContainer>
  );
}

export default App;
