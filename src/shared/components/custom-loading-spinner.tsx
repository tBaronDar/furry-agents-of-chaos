import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export type CustomLoadingSpinnerProps = {
  size?: number;
  type?: 'global' | 'local';
};

export default function CustomLoadingSpinner({ size = 40, type = 'global' }: CustomLoadingSpinnerProps) {
  console.log('CustomLoadingSpinner', size, type);

  return (
    <Box
      sx={{
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: type === 'global' ? '100vh' : '100%',
        width: '100%',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}>
      <CircularProgress />
    </Box>
  );
}
