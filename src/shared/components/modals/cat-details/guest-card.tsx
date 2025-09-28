import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export type GuestCardProps = {
  handleClose: () => void;
};

export default function GuestCard(props: GuestCardProps) {
  const { handleClose } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Wait!</Typography>
        <Typography variant='body1'>
          In order to add this cat to your roster of furry rascals, you need to give us your name.
        </Typography>
        <TextField label='Name' variant='outlined' fullWidth />
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary'>
          Count Me In!
        </Button>
        <Button variant='contained' color='primary' onClick={handleClose}>
          Don&apos;t bother me with nonsense
        </Button>
      </CardActions>
    </Card>
  );
}
