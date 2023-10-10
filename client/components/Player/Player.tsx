import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import {
  Pause,
  PlayArrow,
  VolumeUp,
  VolumeMuteOutlined,
} from '@mui/icons-material';

import { selectPlayer } from '@/store/slices';
import { usePlayerActions, useTypedAppSelector } from '@/store/hooks';
import { TrackProgress } from '@/components';

import styles from './Player.module.scss';

let audio: HTMLAudioElement;

export const Player = () => {
  const router = useRouter();
  const { isPaused, isMuted, duration, track, volume, currentTime } =
    useTypedAppSelector(selectPlayer);

  const { togglePaused, toggleMuted, setVolume, setCurrentTime, setDuration } =
    usePlayerActions();

  const setAudio = () => {
    if (track) {
      audio.src = track.audio || '';

      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        if (!isPaused) {
          audio.play();
        }
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
    setAudio();
  }, [track]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    isPaused ? audio.pause() : audio.play();
  }, [isPaused]);

  const handleChageCurrentTime = (value: number) => {
    audio.currentTime = value;
    setCurrentTime(value);
  };

  if (!track) return null;

  return (
    <div className={styles.player}>
      <IconButton size="large" onClick={() => togglePaused()}>
        {isPaused ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid container direction="column" sx={{ width: 200, padding: '0 20px' }}>
        <Box>
          <Typography
            onClick={() => router.push('/tracks/' + track?._id || '')}
          >
            {track?.name || ''}
          </Typography>
        </Box>
        <Box sx={{ fontSize: 12, color: 'gray' }}>{track?.artist || ''}</Box>
      </Grid>

      <Grid container alignItems="center">
        <TrackProgress
          max={duration}
          value={currentTime}
          onChange={handleChageCurrentTime}
          isTimeFormat={true}
        />
      </Grid>

      <Grid
        container
        alignItems="center"
        sx={{ ml: 'auto', width: 'auto' }}
        wrap="nowrap"
      >
        <IconButton
          sx={{ mr: 1 }}
          onClick={() => {
            toggleMuted();
          }}
        >
          {isMuted ? <VolumeMuteOutlined /> : <VolumeUp />}
        </IconButton>
        <TrackProgress
          max={100}
          value={volume}
          onChange={(value) => {
            setVolume(value);
          }}
        />
      </Grid>
    </div>
  );
};

export default Player;
