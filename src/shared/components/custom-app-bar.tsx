import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Pets from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const linkStyles: SxProps = {
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
};

export default function CustomAppBar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Pets sx={{ mr: 2 }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Furry Agents of Chaos(or FAC)
        </Typography>
        <Stack direction='row' spacing={2}>
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
