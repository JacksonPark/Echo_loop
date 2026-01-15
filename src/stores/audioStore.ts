import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  fileName: string | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  playbackRate: number;
  abLoopEnabled: boolean;
  startTime: number;
  endTime: number;
  isInitialized: boolean;

  setFileName: (name: string | null) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setABLoopEnabled: (enabled: boolean) => void;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  setIsInitialized: (initialized: boolean) => void;
  resetABLoop: () => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      fileName: null,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      playbackRate: 1.0,
      abLoopEnabled: false,
      startTime: 0,
      endTime: 0,
      isInitialized: false,

      setFileName: (name) => set({ fileName: name }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setPlaybackRate: (rate) => set({ playbackRate: rate }),
      setABLoopEnabled: (enabled) => set({ abLoopEnabled: enabled }),
      setStartTime: (time) => set({ startTime: time }),
      setEndTime: (time) => set({ endTime: time }),
      setIsInitialized: (initialized) => set({ isInitialized: initialized }),
      resetABLoop: () => set({ abLoopEnabled: false, startTime: 0, endTime: 0 }),
    }),
    {
      name: 'echo-loop-storage',
      partialize: (state) => ({
        fileName: state.fileName,
        currentTime: state.currentTime,
        playbackRate: state.playbackRate,
        startTime: state.startTime,
        endTime: state.endTime,
        abLoopEnabled: state.abLoopEnabled,
      }),
    }
  )
);
