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
      'If you do this, you will lose your current roster of furry rascals.\nThis action cannot be undone.'
    );
    if (result) {
      // Create new guest with empty name and new ID
      const newGuest = createInitialGuest();
      dispatch(setGuest(newGuest));
    }
  };
  return (
    <AppBar position='static'>
      <Toolbar>
        <Pets sx={{ mr: 2 }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Furry Agents of Chaos(or FAC)
        </Typography>

        <Stack direction='row' spacing={2} alignItems='center'>
          {guest.guestName && (
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography variant='body1' sx={{ mr: 2 }}>
                Welcome, {guest.guestName}!
              </Typography>
              <IconButton onClick={handleLogout}>
                <Logout sx={{ color: 'white' }} />
              </IconButton>
            </Stack>
          )}
          <Link component={RouterLink} to='/' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </Link>
          <Link component={RouterLink} to='/breeds' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Breeds
            </Typography>
          </Link>
          <Link component={RouterLink} to='/favorites' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Favorites
            </Typography>
          </Link>
          <Link component={RouterLink} to='/about' sx={linkStyles}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              About
            </Typography>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
