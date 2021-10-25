import { useContext } from 'react';
import styled from 'styled-components';

import { Element, ElementsContext } from './Element';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const Canvas: React.FC = () => {
  const { elements } = useContext(ElementsContext);

  return (
    <CanvasContainer>
      {elements.map((element) => {
        return <Element id={element} key={element} />;
      })}
    </CanvasContainer>
  );
};
