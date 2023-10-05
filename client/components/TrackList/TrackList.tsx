import { Box, Grid } from '@mui/material';
import { ITrack } from '@/types/track';
import { TrackItem } from '../TrackItem';

interface ITrackListProps {
  tracks: ITrack[];
}

export const TrackList: React.FC<ITrackListProps> = ({ tracks }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
