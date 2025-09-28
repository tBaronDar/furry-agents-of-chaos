import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { setGuest } from '../../../reducers/app.reducer';
import type { Guest } from '../../../dto/guest';
import type { Cat } from '../../../dto/cat';

export type GuestCardProps = {
  handleClose: () => void;
  currentGuest: Guest;
  selectedCat: Cat;
};

const nameSchema = z.string().min(1).max(20);

export default function GuestCard(props: GuestCardProps) {
  const { handleClose, currentGuest, selectedCat } = props;
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
      const validatedName = nameSchema.parse(name);
      const updatedGuest: Guest = {
        ...currentGuest,
        guestName: validatedName,
        favoriteCatsIds: [...currentGuest.favoriteCatsIds, selectedCat.id],
      };
      dispatch(setGuest(updatedGuest));
      handleClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError('Name must be between 1 and 20 characters');
      }
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Wait!</Typography>
        <Typography variant='body1'>
          In order to add this cat to your roster of furry rascals, you need to give us your name.
        </Typography>
        <TextField
          label='Name'
          variant='outlined'
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          error={Boolean(error)}
          helperText={error}
        />
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary' disabled={name.length === 0} onClick={handleSubmit}>
          Count Me In!
        </Button>
        <Button variant='contained' color='primary' onClick={handleClose}>
          Don&apos;t bother me with nonsense
        </Button>
      </CardActions>
    </Card>
  );
}
