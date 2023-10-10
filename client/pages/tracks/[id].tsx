import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';
import Image from 'next/image';
import {
  Box,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { MLink } from '@/components';
import {
  getTrackBiId,
  getRunningQueriesThunk,
  useGetTrackBiIdQuery,
  storeWrapper,
} from '@/store';

export const TrackInfo = () => {
  const router = useRouter();
  const trackId = router.query.id;

  const result = useGetTrackBiIdQuery(
    typeof trackId === 'string' ? trackId : skipToken,
    { skip: router.isFallback }
  );

  const { isLoading, error, data: track } = result;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!track) {
    return <div>Track not found</div>;
  }

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <MLink href={'/tracks'} variant="contained">
          <ArrowBack />
          To track list
        </MLink>
      </Box>
      <Grid container gap={2} alignItems="flex-start">
        <Box component={Paper} sx={{ margin: 0, padding: 2 }}>
          <Image
            style={{ display: 'block' }}
            src={track.picture}
            width={200}
            height={200}
            alt={track.name}
          />
        </Box>

        <Box flex={1} component={Paper} sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Track info:
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width={140} scope="row">
                    Title:
                  </TableCell>
                  <TableCell>{track.name}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width={140} scope="row">
                    Artist:
                  </TableCell>
                  <TableCell>{track.artist}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width={140} scope="row">
                    Listens:
                  </TableCell>
                  <TableCell>{track.listens}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
      <Box sx={{ mt: 2, p: 2 }} component={Paper}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Lyrics:
        </Typography>
        <Box>{track.text}</Box>
      </Box>
      <Grid
        sx={{ mt: 2, p: 2 }}
        component={Paper}
        flexDirection="column"
        container
        gap={2}
      >
        <Typography variant="h5">Comments:</Typography>
        <Grid container flexDirection="column" gap={2}>
          <Grid container flexDirection="column" gap={2}>
            <TextField label="Your name" fullWidth />
            <TextField label="Your comment" fullWidth multiline rows={4} />
            <Button>Send comment</Button>
          </Grid>

          <Grid container flexDirection="column" gap={2}>
            {track.comments.map((comment) => (
              <Box key={comment._id} component={Paper} sx={{ my: 1, p: 1 }}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  {comment.username}
                </Typography>
                <Typography>{comment.text}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TrackInfo;

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getTrackBiId.initiate(id));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
