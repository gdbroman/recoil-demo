import { useState } from 'react';
import { RecoilRoot } from 'recoil';

import { Canvas } from './components/Canvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { AppContainer, GlobalStyles } from './components/ui';
import { ElementsContext } from './components/Element';

const App: React.FC = () => {
  const [elements, setElements] = useState<number[]>([]);

  return (
    <ElementsContext.Provider value={{ elements, setElements }}>
      <AppContainer>
        <Sidebar />
        <Canvas />
        <GlobalStyles />
      </AppContainer>
    </ElementsContext.Provider>
  );
};

function Root() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

export default Root;
