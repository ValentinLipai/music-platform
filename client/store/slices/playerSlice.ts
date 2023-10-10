import { PlayerState } from '@/types/player';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '@/store';

export const playerSlice = createSlice({
  name: 'player',

  initialState: {
    track: null,
    currentTime: 0,
    duration: 0,
    volume: 50,
    isPaused: true,
    isMuted: false,
  } as PlayerState,

  reducers: {
    togglePaused(state) {
      state.isPaused = !state.isPaused;
    },
    pauseTrack(state) {
      state.isPaused = true;
    },
    playTrack(state) {
      state.isPaused = false;
    },
    toggleMuted(state) {
      state.isMuted = !state.isMuted;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setTrack(state, action) {
      state.track = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const {
  togglePaused,
  pauseTrack,
  playTrack,
  toggleMuted,
  setCurrentTime,
  setTrack,
  setVolume,
  setDuration,
} = playerSlice.actions;

export const selectPlayer = (state: AppState) => state.player;

// Other code such as selectors can use the imported `AppState` type
export const selectIsPaused = (state: AppState) => state.player.isPaused;
export const selectIsMuted = (state: AppState) => state.player.isMuted;
export const selectCurrentTime = (state: AppState) => state.player.currentTime;
export const selectDuration = (state: AppState) => state.player.duration;
export const selectTrack = (state: AppState) => state.player.track;
export const selectVolume = (state: AppState) => state.player.volume;

export default playerSlice.reducer;
