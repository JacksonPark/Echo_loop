'use client';

import { useAudioStore } from '@/stores/audioStore';

interface PlaybackControlsProps {
  onTogglePlay: () => void;
  onSkip: (seconds: number) => void;
}

export function PlaybackControls({ onTogglePlay, onSkip }: PlaybackControlsProps) {
  const { isPlaying, duration } = useAudioStore();

  const isDisabled = duration === 0;

  return (
    <div className="flex items-center justify-center gap-6">
      {/* Skip Back */}
      <button
        onClick={() => onSkip(-5)}
        disabled={isDisabled}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 transition-colors"
        aria-label="5초 뒤로"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
        <span className="sr-only">-5s</span>
      </button>

      {/* Play/Pause */}
      <button
        onClick={onTogglePlay}
        disabled={isDisabled}
        className="w-20 h-20 flex items-center justify-center rounded-full bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white transition-colors"
        aria-label={isPlaying ? '일시정지' : '재생'}
      >
        {isPlaying ? (
          <svg className="w-8 h-8 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-zinc-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Skip Forward */}
      <button
        onClick={() => onSkip(5)}
        disabled={isDisabled}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 transition-colors"
        aria-label="5초 앞으로"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
        </svg>
        <span className="sr-only">+5s</span>
      </button>
    </div>
  );
}
