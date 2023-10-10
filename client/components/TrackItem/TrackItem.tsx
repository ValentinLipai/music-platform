import Image from 'next/image';
import Link from 'next/link';
import { Box, Card, Grid, IconButton, CircularProgress } from '@mui/material';
import { Delete, PlayArrow, Pause } from '@mui/icons-material';
import { ITrack } from '@/types/track';

import styles from './TrackItem.module.scss';
import {
  selectPlayer,
  useDeleteTrackMutation,
  usePlayerActions,
  useTypedAppSelector,
} from '@/store';
import { TrackProgress } from '@/components';

interface ITrackItemProps {
  track: ITrack;
  active?: boolean;
}

export const TrackItem: React.FC<ITrackItemProps> = ({ track, active }) => {
  const { isPaused, duration, currentTime } = useTypedAppSelector(selectPlayer);
  const { playTrack, pauseTrack, setTrack } = usePlayerActions();

  const [deleteTrack, { isLoading: isDeleting }] = useDeleteTrackMutation();

  const handlePlayPause = () => {
    if (!active) {
      setTrack(track);
      playTrack();
    } else {
      isPaused ? playTrack() : pauseTrack();
    }
  };

  return (
    <Card className={styles.track}>
      <IconButton size="large" onClick={handlePlayPause}>
        {active && !isPaused ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Link href={'/tracks/' + track._id}>
        <Image
          src={track.picture}
          width={70}
          height={70}
          alt={track.name}
          className={styles.image}
        />
      </Link>
      <Grid container direction="column" sx={{ width: 200, padding: '0 20px' }}>
        <Box>
          <Link href={'/tracks/' + track._id}>{track.name}</Link>
        </Box>
        <Box sx={{ fontSize: 12, color: 'gray' }}>{track.artist}</Box>
      </Grid>
      {active && (
        <TrackProgress
          max={duration}
          value={currentTime}
          isTimeFormat={true}
          hideSlider
        />
      )}
      <IconButton
        sx={{ marginLeft: 'auto' }}
        onClick={() => deleteTrack(track._id)}
      >
        {isDeleting ? (
          <CircularProgress size={20} color="error" />
        ) : (
          <Delete color="error" />
        )}
      </IconButton>
    </Card>
  );
};

export default TrackItem;
