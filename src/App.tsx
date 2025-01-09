import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import SidePanel from './components/SidePanel';
import Content from './components/ChildCheckin';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <SidePanel />
      <Box sx={{ flex: 1, p: 2 }}>
        <Content />
      </Box>
    </Box>
  );
};

export default App;