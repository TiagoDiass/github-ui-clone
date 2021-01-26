import 'react-calendar-heatmap/dist/styles.css';

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header, Footer } from './components';
import { Profile, Repo } from './pages';
import GlobalStyles from './styles/GlobalStyles';

import { ThemeProvider } from 'styled-components';
import { ThemeName, themes } from './styles/themes';

function App() {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const currentTheme = themes[themeName];

  return (
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <Header themeName={themeName} setThemeName={setThemeName} />

        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/:username' element={<Profile />} />
          <Route path='/:username/:repo' element={<Repo />} />
        </Routes>

        <Footer />
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
