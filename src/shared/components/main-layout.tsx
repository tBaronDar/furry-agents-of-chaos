import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import CustomAppContainer from './custom-app-contaner';
import CustomAppBar from './custom-app-bar';

const Layout: React.FC = () => {
  return (
    <CustomAppContainer>
      <CustomAppBar />
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </CustomAppContainer>
  );
};

export default Layout;
