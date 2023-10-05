import MainLayout from '@/layouts/MainLayout';
import { useRouter } from 'next/router';
import { Button, Card, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { TrackList } from '@/components';

import { ITrack } from '@/types/track';

const Tracks = () => {
  const router = useRouter();

  const tracks: ITrack[] = [
    {
      _id: '1',
      name: 'Track 1',
      artist: 'Artist 1',
      text: 'Text 1',
      listens: 0,
      picture:
        process.env.NEXT_PUBLIC_SERVER_URL +
        'image/1708d4be-78de-45db-b90c-ca27cb6afa61.png',
      audio:
        process.env.NEXT_PUBLIC_SERVER_URL +
        'audio/9320bcf9-8d1b-463d-ac1a-852d05bb86ab.mp3',
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'Artist 2',
      text: 'Text 2',
      listens: 0,
      picture:
        process.env.NEXT_PUBLIC_SERVER_URL +
        'image/ac3f9226-96a5-4d5a-93cb-c9469b975a33.png',
      audio:
        process.env.NEXT_PUBLIC_SERVER_URL +
        'audio/dc8a02e3-2b74-4315-858c-6f01fb590418.mp3',
      comments: [],
    },
    {
      _id: '3',
      name: 'Track 3',
      artist: 'Artist 3',
      text: 'Text 3',
      listens: 0,
      picture:
        process.env.NEXT_PUBLIC_SERVER_URL +
        'image/03413934-f7a6-48e6-9341-f64db00ea80c.png',
      audio:
        process.env.NEXT_PUBLIC_SERVER_URL +
        'audio/53d36746-53d5-42c5-9dc1-b56920feb5dc.mp3',
      comments: [],
    },
  ];

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card sx={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <Typography variant="h1" gutterBottom>
                Track list
              </Typography>
              <Button
                onClick={() => router.push('/tracks/create')}
                variant="contained"
                color="primary"
                size="large"
              >
                Add Track
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;
