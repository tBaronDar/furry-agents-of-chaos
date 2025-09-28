import Stack from '@mui/material/Stack';
import CatCard from './cat-card';
import type { Cat } from '../../../shared/dto/cat';

type CatsListProps = {
  cats: Array<Cat>;
  isLoading?: boolean;
};

export default function CatsList(props: CatsListProps) {
  const { cats, isLoading } = props;

  return (
    <Stack
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginTop: '16px',
        padding: '8px',
      }}>
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} isLoading={isLoading} />
      ))}
    </Stack>
  );
}
