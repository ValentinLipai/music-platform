import { ITrack } from '@/types/track';

export interface PlayerState {
  track: ITrack | null;
  volume: number;
  duration: number;
  currentTime: number;
  isPaused: boolean;
  isMuted: boolean;
}
