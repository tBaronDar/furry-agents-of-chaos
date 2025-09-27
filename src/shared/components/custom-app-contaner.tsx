import Stack from '@mui/material/Stack';

export default function CustomAppContainer({ children }: { children: React.ReactNode }) {
  return <Stack sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>{children}</Stack>;
}
