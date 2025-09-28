import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import CustomAppContainer from './custom-app-contaner';
import CustomAppBar from './custom-app-bar';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../config/store';
import { ensureGuestExists } from '../reducers/app.reducer';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const guest = useSelector((state: RootState) => state.app.guest);

  useEffect(() => {
    if (!guest) {
      dispatch(ensureGuestExists());
    }
  }, [guest, dispatch]);

  if (!guest) {
    return <div>Loading...</div>;
  }

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
