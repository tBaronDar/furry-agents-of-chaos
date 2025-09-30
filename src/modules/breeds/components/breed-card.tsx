import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { CatBreed } from '../../../shared/dto/cat-breed-read';
import CatsList from '../../cats/components/cats-list';
import useBreedCard from '../hooks/use-breed-card';
import Stack from '@mui/material/Stack';
import CollapseIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandIcon from '@mui/icons-material/KeyboardArrowUp';
import Tooltip from '@mui/material/Tooltip';

export type BreedCardProps = {
  breed: CatBreed;
};

export default function BreedCard(props: BreedCardProps) {
  const { breed } = props;
  const { cats, isLoading, handleSelectBreed, selectedBreedId } = useBreedCard();
  const isExpanded = selectedBreedId === breed.id;
  return (
    <Tooltip arrow placement='top' title='Click to see more information'>
      <Card elevation={5} onClick={() => handleSelectBreed(breed.id)} sx={{ cursor: 'pointer', pb: 2 }}>
        <CardContent
          sx={{
            height: isExpanded ? 'auto' : '200px',
            overflow: isExpanded ? 'visible' : 'hidden',
            transition: 'height 0.3s ease-in-out',
          }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h4'>{breed.name}</Typography>
            {isExpanded ? <ExpandIcon /> : <CollapseIcon />}
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
            <Stack direction='column' gap={2}>
              <Stack justifyContent='space-between' alignItems='flex-start'>
                <Typography variant='body1' fontStyle='italic' color='text.secondary'>
                  Temperament:
                </Typography>
                <Typography variant='body1'>{breed.temperament}</Typography>
              </Stack>
              <Stack justifyContent='space-between' alignItems='flex-start'>
                <Typography variant='body1' fontStyle='italic' color='text.secondary'>
                  Origin:
                </Typography>
                <Typography variant='body1'>{breed.origin}</Typography>
              </Stack>
            </Stack>
            <Stack sx={{ maxWidth: '60%' }} justifyContent='flex-start' alignItems='flex-start'>
              <Typography variant='body1' fontStyle='italic' color='text.secondary'>
                Description:
              </Typography>
              <Typography variant='body1'>{breed.description}</Typography>
            </Stack>
          </Stack>
          {isExpanded && <CatsList cats={cats} isLoading={isLoading} />}
        </CardContent>
      </Card>
    </Tooltip>
  );
}
