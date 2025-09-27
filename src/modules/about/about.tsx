import { Stack, Typography } from '@mui/material';

export default function About() {
  return (
    <Stack>
      <Typography variant='h4' component='h1' gutterBottom>
        About
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        This is the about page.
      </Typography>
    </Stack>
  );
}
