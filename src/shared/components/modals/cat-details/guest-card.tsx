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
import api from '../../../services/query/api';
import type { CatReadDTO } from '../../../dto/cat-read';
import { Stack } from '@mui/material';

export type GuestCardProps = {
  handleClose: () => void;
  currentGuest: Guest;
  selectedCat: CatReadDTO;
  setIsSelectedCat: (isSelectedCat: boolean) => void;
};

const nameSchema = z.string().min(1).max(20);

export default function GuestCard(props: GuestCardProps) {
  const { handleClose, currentGuest, selectedCat, setIsSelectedCat } = props;
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [addToFavoritesMutation] = api.useAddToFavoritesMutation();

  const handleSubmit = async () => {
    const validatedName = nameSchema.parse(name);
    const updatedGuest: Guest = {
      ...currentGuest,
      guestName: validatedName,
    };
    dispatch(setGuest(updatedGuest));
    await addToFavoritesMutation({ imageId: selectedCat.id, subId: currentGuest.id }).unwrap();
    setIsSelectedCat(true);
    handleClose();
  };
  return (
    <Card elevation={5}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={4}>
          <Typography variant='h4'>Wait!</Typography>
          <Typography variant='body1'>
            In order to add this cat to your roster of furry rascals, you need to give us your name. Join the club and
            rule the world with your furry minions!
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
        </Stack>
        <Typography
          sx={{ textAlign: 'right', fontStyle: 'italic', fontSize: '12px' }}
          color='text.secondary'
          variant='body1'>
          Max 20 characters
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
