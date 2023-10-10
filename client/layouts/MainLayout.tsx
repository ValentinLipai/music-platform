import { NavBar, Player } from '@/components';
import { Box } from '@mui/material';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box className="main-layout">
      <NavBar>{children}</NavBar>
      <Player />
    </Box>
  );
};

export default MainLayout;
