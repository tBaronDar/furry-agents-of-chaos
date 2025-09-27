import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Pets } from '@mui/icons-material';
import CustomAppContainer from './custom-app-contaner';

const Layout: React.FC = () => {
  return (
    <CustomAppContainer>
      <AppBar position='static'>
        <Toolbar>
          <Pets sx={{ mr: 2 }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Agents of Chaos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </CustomAppContainer>
  );
};

export default Layout;
