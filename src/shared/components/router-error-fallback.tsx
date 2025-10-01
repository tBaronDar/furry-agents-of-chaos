import React from 'react';
import { useRouteError, isRouteErrorResponse, Link as RouterLink } from 'react-router-dom';
import { Stack, Typography, Button, Paper, Box, Alert, AlertTitle, Divider } from '@mui/material';
import { Refresh as RefreshIcon, Home as HomeIcon } from '@mui/icons-material';

export default function RouterErrorFallback() {
  const error = useRouteError();

  console.error('Router error:', error);

  let errorMessage = 'An unexpected error occurred';
  let statusCode: number | undefined;
  let errorDetails: string | undefined;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || `HTTP ${error.status} Error`;
    errorDetails = JSON.stringify(error, null, 2);
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
    errorDetails = error;
  } else if (error !== null && error !== undefined) {
    errorMessage = 'An unknown error occurred';
    errorDetails = JSON.stringify(error, null, 2);
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'background.default',
      }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
        }}>
        <Stack spacing={3} alignItems='center'>
          <Alert severity='error' sx={{ width: '100%' }}>
            <AlertTitle>Route Error</AlertTitle>
            {statusCode && `Error ${statusCode}: `}
            {errorMessage}
          </Alert>

          <Typography variant='h4' color='error' gutterBottom>
            Oops!
          </Typography>

          <Typography variant='body1' color='text.secondary'>
            Something went wrong while loading this page. This could be due to a network issue, missing data, or a
            temporary server problem.
          </Typography>

          {errorDetails && (
            <React.Fragment>
              <Divider sx={{ width: '100%' }} />
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  width: '100%',
                  textAlign: 'left',
                }}>
                <Typography variant='caption' color='text.secondary' display='block' gutterBottom>
                  Error Details:
                </Typography>
                <Typography
                  variant='body2'
                  component='pre'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}>
                  {errorDetails}
                </Typography>
              </Box>
            </React.Fragment>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
            <Button
              variant='contained'
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ flex: 1 }}>
              Reload Page
            </Button>
            <Button variant='outlined' startIcon={<HomeIcon />} component={RouterLink} to='/' sx={{ flex: 1 }}>
              Go to Home
            </Button>
          </Stack>

          <Typography variant='caption' color='text.secondary'>
            If this problem persists, please contact support.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
