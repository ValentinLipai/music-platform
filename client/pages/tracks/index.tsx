import { Card, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Add } from '@mui/icons-material';
import { TrackList, MLink } from '@/components';

import {
  getRunningQueriesThunk,
  getTracks,
  storeWrapper,
  useGetTracksQuery,
} from '@/store';
import { useRouter } from 'next/router';

const Tracks = () => {
  const router = useRouter();

  const result = useGetTracksQuery(null, { skip: router.isFallback });

  const { data: tracks, isLoading, error } = result;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    let errMsg = 'Something went wrong';

    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    }

    return <Typography>{errMsg}</Typography>;
  }

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 900 }}>
        <Box p={3}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h1" gutterBottom>
              Track list
            </Typography>
            <MLink
              href="/tracks/create"
              variant="contained"
              color="primary"
              size="large"
            >
              <Add />
              Add Track
            </MLink>
          </Grid>
        </Box>
        <TrackList tracks={tracks || []} />
      </Card>
    </Grid>
  );
};

export default Tracks;

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getTracks.initiate(null));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
