import { NavBar } from '@/components';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="main-layout">
      <NavBar>{children}</NavBar>
    </div>
  );
};

export default MainLayout;
