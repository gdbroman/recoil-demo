import { useContext } from 'react';
import { FiSquare } from 'react-icons/fi';
import styled from 'styled-components';

import { Title } from '../ui';
import { ElementsContext } from '../Element';

const InsertButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: rgba(10, 10, 10, 0.3);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const InsertElementSection = () => {
  const { setElements } = useContext(ElementsContext);

  return (
    <div>
      <Title>Insert</Title>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <InsertButton
          onClick={() => {
            setElements((elements) => [...elements, elements.length]);
          }}
        >
          <FiSquare color="white" size={35} />
        </InsertButton>
        <div style={{ width: 15 }} />
      </div>
    </div>
  );
};
