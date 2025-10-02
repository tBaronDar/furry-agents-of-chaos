import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from '@mui/material';

const repoUrl = 'https://github.com/tBaronDar/furry-agents-of-chaos';
const vercelUrl = 'https://furry-agents-of-chaos.vercel.app/';
const linkedinUrl = 'https://www.linkedin.com/in/themis-darelis-320a608b/';
const githubUrl = 'https://github.com/tBaronDar';

export default function About() {
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <Card elevation={5} sx={{ maxWidth: isMobile ? '100%' : '540px', mx: 'auto', mt: 4, pb: 4 }}>
      <CardHeader title='Useful Links' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Tooltip
          title={repoUrl}
          placement='bottom-start'
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
          <Stack
            component={'a'}
            sx={{ textDecoration: 'none' }}
            href={repoUrl}
            target='_blank'
            direction='row'
            justifyContent='space-between'>
            <Typography variant='body1' color='text.primary' fontSize={isMobile ? '0.8rem' : '1rem'}>
              The github repository for this project
            </Typography>
            <LinkIcon fontSize={isMobile ? 'small' : 'medium'} />
          </Stack>
        </Tooltip>
        <Tooltip
          title={vercelUrl}
          placement='bottom-start'
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            component={'a'}
            href={vercelUrl}
            sx={{ textDecoration: 'none' }}
            target='_blank'>
            <Typography variant='body1' color='text.primary' fontSize={isMobile ? '0.8rem' : '1rem'}>
              The Vercel deployment for this project
            </Typography>
            <LinkIcon fontSize={isMobile ? 'small' : 'medium'} />
          </Stack>
        </Tooltip>
        <Tooltip
          title={githubUrl}
          placement='bottom-start'
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            component={'a'}
            href={githubUrl}
            sx={{ textDecoration: 'none' }}
            target='_blank'>
            <Typography variant='body1' color='text.primary' fontSize={isMobile ? '0.8rem' : '1rem'}>
              My GitHub profile
            </Typography>
            <LinkIcon fontSize={isMobile ? 'small' : 'medium'} />
          </Stack>
        </Tooltip>
        <Tooltip
          title={linkedinUrl}
          placement='bottom-start'
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            component={'a'}
            href={linkedinUrl}
            sx={{ textDecoration: 'none' }}
            target='_blank'>
            <Typography variant='body1' color='text.primary' fontSize={isMobile ? '0.8rem' : '1rem'}>
              My LinkedIn profile
            </Typography>
            <LinkIcon fontSize={isMobile ? 'small' : 'medium'} />
          </Stack>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
