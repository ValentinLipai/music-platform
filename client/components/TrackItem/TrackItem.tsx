import Image from 'next/image';
import { Box, Card, Grid, IconButton } from '@mui/material';
import { Delete, PlayArrow, Pause } from '@mui/icons-material';
import { ITrack } from '@/types/track';

import styles from './TrackItem.module.scss';

interface ITrackItemProps {
  track: ITrack;
  active?: boolean;
}

export const TrackItem: React.FC<ITrackItemProps> = ({
  track,
  active = false,
}) => {
  return (
    <Card className={styles.track}>
      <IconButton size="large">{active ? <Pause /> : <PlayArrow />}</IconButton>
      <Image
        src={track.picture}
        width={70}
        height={70}
        alt={track.name}
        className={styles.image}
      />
      <Grid container direction="column" sx={{ width: 200, padding: '0 20px' }}>
        <Box>{track.name}</Box>
        <Box sx={{ fontSize: 12, color: 'gray' }}>{track.artist}</Box>
      </Grid>
      {active && <Box>02:42 / 03:22</Box>}
      <IconButton sx={{ marginLeft: 'auto' }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
