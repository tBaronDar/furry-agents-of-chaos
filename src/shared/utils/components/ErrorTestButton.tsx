import { Button, Box } from '@mui/material';
import { useState } from 'react';

// Component that throws error during render
function ErrorComponent(): never {
  throw new Error('This is a test error to demonstrate the error boundary!');
}

// Component that will throw error during render when event error occurs
function EventErrorComponent(): never {
  throw new Error('Event handler error - now caught by error boundary!');
}

export default function ErrorTestButton() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [eventError, setEventError] = useState(false);

  if (shouldThrow) {
    return <ErrorComponent />;
  }

  if (eventError) {
    return <EventErrorComponent />;
  }

  const handleEventError = () => {
    try {
      // Simulate an error in event handler
      throw new Error('Event handler error - now caught by error boundary!');
    } catch (error) {
      // Set state to trigger re-render with error component
      console.error('Event handler error:', error);
      setEventError(true);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9999, display: 'flex', gap: 1 }}>
      <Button variant='contained' color='error' onClick={() => setShouldThrow(true)} size='small'>
        Test Error Boundary
      </Button>
      <Button variant='outlined' color='secondary' onClick={handleEventError} size='small'>
        Test Event Error
      </Button>
    </Box>
  );
}
