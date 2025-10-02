import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Pets from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Guest } from '../dto/guest';
import { Logout } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { createInitialGuest, setGuest } from '../reducers/app.reducer';
import { useDispatch } from 'react-redux';
import api from '../services/query/api';
import { useMediaQuery } from '@mui/material';

const linkStyles: SxProps = {
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
};

export type CustomAppBarProps = {
  guest: Guest;
};

export default function CustomAppBar(props: CustomAppBarProps) {
  const { guest } = props;
  const dispatch = useDispatch();
  const handleLogout = () => {
    const result = confirm(
      'If you do this, you will lose your current roster of furry rascals and you will clear the current random cats.\nThis action cannot be undone.'
    );
    if (result) {
      const newGuest = createInitialGuest();
      dispatch(setGuest(newGuest));
      api.util.invalidateTags(['Cats']);
    }
  };

  const isTablet = useMediaQuery('(max-width: 720px)');
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <AppBar position='static'>
      <Toolbar>
        <Pets sx={{ mr: 2 }} />
        {!isMobile ? (
          <Typography variant='h6' component='div' fontSize={isTablet ? '1.5rem' : '1.25rem'} sx={{ flexGrow: 1 }}>
            {isTablet ? 'FAC' : 'Furry Agents of Chaos(or FAC)'}
          </Typography>
        ) : null}

        <Stack direction='row' spacing={isMobile ? '3px' : 2} alignItems='center'>
          {guest.guestName && (
            <Stack direction='row' spacing={2} alignItems='center'>
              {!isMobile && (
                <Typography variant='body1' sx={{ mr: 2 }}>
                  Hi, {guest.guestName}!
                </Typography>
              )}
              <IconButton onClick={handleLogout}>
                <Logout fontSize={isTablet ? 'small' : 'medium'} sx={{ color: 'white', p: isMobile ? '0px' : '2px' }} />
              </IconButton>
            </Stack>
          )}
          <Link component={RouterLink} to='/cats' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} fontSize={isTablet ? '1rem' : '1.25rem'}>
              Home
            </Typography>
          </Link>
          <Link component={RouterLink} to='/breeds' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} fontSize={isTablet ? '1rem' : '1.25rem'}>
              Breeds
            </Typography>
          </Link>
          <Link component={RouterLink} to='/favorites' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} fontSize={isTablet ? '1rem' : '1.25rem'}>
              Favorites
            </Typography>
          </Link>
          <Link component={RouterLink} to='/about' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} fontSize={isTablet ? '1rem' : '1.25rem'}>
              About
            </Typography>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
