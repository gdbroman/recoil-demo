import styled from 'styled-components';
import { selector, useRecoilState } from 'recoil';

import { Title } from '../ui';
import { ColorPicker } from '../ColorPicker';
import { ElementState, elementState, selectedElementIdState } from '../Element';

const InputLabel = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px;
`;

const Input = styled.input`
  background-color: rgba(10, 10, 10, 0.3);
  border-radius: 15px;
  padding: 10px;
  border: 0;
  width: 100%;
  outline: none;
  margin-bottom: 15px;
  color: #fff;
  font-size: 16px;
`;

const PropertyInput: React.FC<{ label: string; value: number; onChange: (value: number) => void }> =
  ({ label, value, onChange }) => {
    return (
      <>
        <InputLabel>{label}</InputLabel>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.currentTarget.value))}
        />
      </>
    );
  };

const selectedElementState = selector<ElementState | undefined>({
  key: 'selectedElement',
  get: ({ get }) => {
    const id = get(selectedElementIdState);

    if (id != null) {
      return get(elementState(id));
    }

    return undefined;
  },
  set: ({ set, get }, newElementValue) => {
    const id = get(selectedElementIdState);

    if (id != null && newElementValue) {
      set(elementState(id), newElementValue);
    }
  },
});

export const PropertiesSection: React.FC = () => {
  const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState);

  if (!selectedElement) return null;

  return (
    <div>
      <Title>Properties</Title>
      <InputLabel>Color</InputLabel>
      <ColorPicker
        value={selectedElement.color}
        onChange={(color) => {
          setSelectedElement({
            ...selectedElement,
            color,
          });
        }}
      />
      <PropertyInput
        label="Top"
        value={selectedElement.top}
        onChange={(top) => {
          setSelectedElement({
            ...selectedElement,
            top,
          });
        }}
      />
      <PropertyInput
        label="Left"
        value={selectedElement.left}
        onChange={(left) => {
          setSelectedElement({
            ...selectedElement,
            left,
          });
        }}
      />
    </div>
  );
};
