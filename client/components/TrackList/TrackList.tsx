import { Box, Grid } from '@mui/material';
import { ITrack } from '@/types/track';
import { TrackItem } from '../TrackItem';
import { selectTrack, useTypedAppSelector } from '@/store';

interface ITrackListProps {
  tracks: ITrack[];
}

export const TrackList: React.FC<ITrackListProps> = ({ tracks }) => {
  const activeTrack = useTypedAppSelector(selectTrack);

  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem
            key={track._id}
            track={track}
            active={track._id === activeTrack?._id}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;
