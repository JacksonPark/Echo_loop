'use client';

import { useAudioStore } from '@/stores/audioStore';

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

export function SpeedSlider() {
  const { playbackRate, setPlaybackRate } = useAudioStore();

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">재생 속도</span>
        <span className="text-sm font-mono text-white">{playbackRate.toFixed(2)}x</span>
      </div>
      <div className="flex items-center gap-2">
        {SPEED_OPTIONS.map((speed) => (
          <button
            key={speed}
            onClick={() => setPlaybackRate(speed)}
            className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${
              playbackRate === speed
                ? 'bg-white text-zinc-900 font-medium'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {speed}x
          </button>
        ))}
      </div>
    </div>
  );
}
