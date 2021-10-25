import { createContext, MouseEvent } from 'react';
import { DraggableCore } from 'react-draggable';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import randomMC from 'random-material-color';
import { atom, atomFamily, useRecoilState, useSetRecoilState } from 'recoil';

const ElementContainer = styled.div`
  position: absolute;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  width: 200px;
  height: 170px;
  background-color: rgba(17, 17, 17, 0.45);
  backdrop-filter: blur(30px);
`;

const ElementInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type ElementProps = {
  id: number;
};

export type ElementState = {
  top: number;
  left: number;
  color: string;
};

export const elementState = atomFamily({
  key: 'element',
  default: () => ({
    top: 0,
    left: 0,
    color: randomMC.getColor(),
  }),
});

export const selectedElementIdState = atom<null | number>({
  key: 'selectedElementId',
  default: null,
});

type ElementsContext = {
  elements: number[];
  setElements: React.Dispatch<React.SetStateAction<number[]>>;
};

export const ElementsContext = createContext<ElementsContext>({
  elements: [],
  setElements: () => undefined,
});

export const Element: React.FC<ElementProps> = ({ id }) => {
  const [element, setElement] = useRecoilState(elementState(id));
  const setSelectedElement = useSetRecoilState(selectedElementIdState);

  return (
    <ElementContainer
      style={{
        top: element.top,
        left: element.left,
        backgroundColor: hexToRgba(element.color, 0.45),
      }}
      onMouseDown={() => {
        setSelectedElement(id);
      }}
    >
      <DraggableCore
        onDrag={(e: MouseEvent<HTMLElement | SVGElement>) => {
          setElement({
            ...element,
            top: element.top + e.movementY,
            left: element.left + e.movementX,
          });
        }}
      >
        <ElementInnerContainer>
          <div>Top: {element.top}</div>
          <div>Left: {element.left}</div>
        </ElementInnerContainer>
      </DraggableCore>
    </ElementContainer>
  );
};
