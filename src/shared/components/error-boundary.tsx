import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxWidth='md' sx={{ mt: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 4,
              textAlign: 'center',
            }}>
            <Typography variant='h4' color='error' gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant='body1' color='text.secondary' paragraph>
              We encountered an unexpected error. Please try refreshing the page.
            </Typography>
            <Button variant='contained' color='primary' onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            {import.meta.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                <Typography variant='body2' color='error.contrastText'>
                  {this.state.error.message}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
