import { SidebarDiv } from '../ui';
import { InsertElementSection } from './InsertElementSection';
import { PropertiesSection } from './PropertiesSection';

export const Sidebar: React.FC = () => {
  return (
    <SidebarDiv>
      <InsertElementSection />
      <PropertiesSection />
    </SidebarDiv>
  );
};
