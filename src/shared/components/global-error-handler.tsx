import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QueryStatus } from '@reduxjs/toolkit/query';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import type { RootState } from '../../config/store';
import type { Error } from '../services/query/config';

export default function GlobalErrorHandler() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastError, setLastError] = useState<string | null>(null);

  const apiState = useSelector((state: RootState) => state.api);

  const getErrorMessage = (error: Error): string => {
    // errors from the api config with a response
    if ('status' in error && typeof error.status === 'number') {
      switch (error.status) {
        case 401:
          return 'Authentication failed';
        case 403:
          return 'Access forbidden';
        case 404:
          return 'Resource not found';
        case 429:
          return 'Rate limit exceeded';
        default:
          if (error.status >= 500) {
            return 'Server error';
          }
          return `HTTP ${error.status} error`;
      }
    }

    // errors from the api config without a response
    if ('status' in error && typeof error.status === 'string') {
      switch (error.status) {
        case 'FETCH_ERROR':
          return 'Network connection failed';
        case 'PARSING_ERROR':
          return 'Data parsing error';
        case 'TIMEOUT_ERROR':
          return 'Request timeout';
        case 'CUSTOM_ERROR':
          return error.error || 'Unknown error occurred';
        default:
          return 'An error occurred';
      }
    }

    return 'An error occurred';
  };

  useEffect(() => {
    const errors: Array<string> = [];

    // check queries for errors
    if (apiState.queries) {
      Object.entries(apiState.queries).forEach(([, queryState]) => {
        if (queryState && typeof queryState === 'object') {
          // Check if it's a query result with error
          if ('error' in queryState && queryState.error) {
            const error = queryState.error as unknown as Error;
            if (error) {
              const message = getErrorMessage(error) || 'An error occurred';
              errors.push(message);
            }
          }

          // Check if it's a query result with status rejected
          if ('status' in queryState && queryState.status === QueryStatus.rejected && 'error' in queryState) {
            const error = queryState.error as unknown as Error;
            if (error) {
              const message = getErrorMessage(error) || 'An error occurred';
              errors.push(message);
            }
          }
        }
      });
    }

    // Check mutations for errors
    if (apiState.mutations) {
      Object.entries(apiState.mutations).forEach(([, mutationState]) => {
        if (mutationState && typeof mutationState === 'object') {
          // Check if it's a mutation result with error
          if ('error' in mutationState && mutationState.error) {
            const error = mutationState.error as unknown as Error;
            if (error) {
              const message = getErrorMessage(error) || 'An error occurred';
              errors.push(message);
            }
          }
          // Check if it's a mutation result with status rejected
          if ('status' in mutationState && mutationState.status === QueryStatus.rejected && 'error' in mutationState) {
            const error = mutationState.error as unknown as Error;
            if (error) {
              const message = getErrorMessage(error) || 'An error occurred';
              errors.push(message);
            }
          }
        }
      });
    }

    // only shows one error, consider putting all errors in a list
    if (errors.length > 0) {
      const currentError = errors[0];
      // only update if it's a new error (avoid showing the same error multiple times)
      if (currentError !== lastError) {
        setErrorMessage(currentError || 'An error occurred');
        setLastError(currentError || null);
        setOpen(true);
      }
    }
  }, [apiState, lastError]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      slots={{ transition: Slide }}
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert severity='error'>{errorMessage}</Alert>
    </Snackbar>
  );
}
