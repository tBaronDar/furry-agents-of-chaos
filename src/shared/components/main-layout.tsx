import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import CustomAppContainer from './custom-app-contaner';
import CustomAppBar from './custom-app-bar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../config/store';

const Layout: React.FC = () => {
  const guest = useSelector((state: RootState) => state.app.guest);

  return (
    <CustomAppContainer>
      <CustomAppBar guest={guest} />
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </CustomAppContainer>
  );
};

export default Layout;
