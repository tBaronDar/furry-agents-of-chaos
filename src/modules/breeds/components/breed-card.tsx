import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { CatBreedReadDTO } from '../../../shared/dto/cat-breed-read';
import CatsList from '../../cats/components/cats-list';
import useBreedCard from '../hooks/use-breed-card';
import Stack from '@mui/material/Stack';
import CollapseIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandIcon from '@mui/icons-material/KeyboardArrowUp';
import { useMediaQuery } from '@mui/material';

export type BreedCardProps = {
  breed: CatBreedReadDTO;
};

export default function BreedCard(props: BreedCardProps) {
  const { breed } = props;
  const { cats, isLoading, handleSelectBreed, selectedBreedId } = useBreedCard();
  const isExpanded = selectedBreedId === breed.id;
  const isTablet = useMediaQuery('(max-width: 720px)');
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <Card elevation={5} onClick={() => handleSelectBreed(breed.id)} sx={{ cursor: 'pointer', pb: 2 }}>
      <CardContent
        sx={{
          height: isExpanded ? 'auto' : '200px',
          overflow: isExpanded ? 'visible' : 'hidden',
          transition: 'height 0.3s ease-in-out',
        }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4' fontSize={isTablet ? '1rem' : '1.5rem'}>
            {breed.name}
          </Typography>
          <Stack direction='row' alignItems='center' gap={1}>
            {!isMobile && (
              <Typography
                variant='body1'
                fontStyle='italic'
                fontSize={isTablet ? '0.9rem' : '1rem'}
                color='text.secondary'>
                Click to see more information
              </Typography>
            )}
            {isExpanded ? <ExpandIcon /> : <CollapseIcon />}
          </Stack>
        </Stack>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
          <Stack direction='column' gap={2}>
            <Stack justifyContent='space-between' alignItems='flex-start'>
              <Typography
                variant='body1'
                fontStyle='italic'
                color='text.secondary'
                fontSize={isTablet ? '0.9rem' : '1rem'}>
                Temperament:
              </Typography>
              <Typography variant='body1' fontSize={isTablet ? '0.8rem' : '1rem'}>
                {breed.temperament}
              </Typography>
            </Stack>
            <Stack justifyContent='space-between' alignItems='flex-start'>
              <Typography
                variant='body1'
                fontStyle='italic'
                color='text.secondary'
                fontSize={isTablet ? '0.9rem' : '1rem'}>
                Origin:
              </Typography>
              <Typography variant='body1' fontSize={isTablet ? '0.8rem' : '1rem'}>
                {breed.origin}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ maxWidth: '60%' }} justifyContent='flex-start' alignItems='flex-start'>
            <Typography
              variant='body1'
              fontStyle='italic'
              color='text.secondary'
              fontSize={isTablet ? '0.9rem' : '1rem'}>
              Description:
            </Typography>
            <Typography variant='body1' fontSize={isTablet ? '0.8rem' : '1rem'}>
              {breed.description}
            </Typography>
          </Stack>
        </Stack>
        {isExpanded && <CatsList cats={cats} isLoading={isLoading} />}
      </CardContent>
    </Card>
  );
}
