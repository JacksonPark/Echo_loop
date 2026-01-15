'use client';

import { formatTime } from '@/utils/timeFormat';
import { useAudioStore } from '@/stores/audioStore';

export function TimeDisplay() {
  const { currentTime, duration } = useAudioStore();

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-6xl font-mono font-light text-white tracking-tight">
        {formatTime(currentTime)}
      </span>
      <span className="text-sm text-zinc-500">
        / {formatTime(duration)}
      </span>
    </div>
  );
}
