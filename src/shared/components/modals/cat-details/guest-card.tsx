import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function GuestCard() {
  return (
    <Card>
      <CardHeader>
        <Typography variant='h6'>Wait!</Typography>
      </CardHeader>
      <CardContent>
        <Typography variant='h6'>Guest</Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary'>
          Sign up
        </Button>
      </CardActions>
    </Card>
  );
}
