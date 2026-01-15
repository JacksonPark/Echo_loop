'use client';

import { useMemo, useCallback } from 'react';
import { WheelPicker } from './WheelPicker';
import { splitTime, parseTime } from '@/utils/timeFormat';

interface TimePickerProps {
  value: number;
  onChange: (seconds: number) => void;
  maxHours?: number;
  label: string;
  onSetCurrent?: () => void;
}

export function TimePicker({
  value,
  onChange,
  maxHours = 24,
  label,
  onSetCurrent,
}: TimePickerProps) {
  const { hrs, mins, secs } = useMemo(() => splitTime(value), [value]);

  const hourValues = useMemo(
    () => Array.from({ length: maxHours }, (_, i) => i),
    [maxHours]
  );
  const minuteValues = useMemo(
    () => Array.from({ length: 60 }, (_, i) => i),
    []
  );
  const secondValues = useMemo(
    () => Array.from({ length: 60 }, (_, i) => i),
    []
  );

  const handleHourChange = useCallback(
    (newHrs: number) => onChange(parseTime(newHrs, mins, secs)),
    [onChange, mins, secs]
  );

  const handleMinuteChange = useCallback(
    (newMins: number) => onChange(parseTime(hrs, newMins, secs)),
    [onChange, hrs, secs]
  );

  const handleSecondChange = useCallback(
    (newSecs: number) => onChange(parseTime(hrs, mins, newSecs)),
    [onChange, hrs, mins]
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-medium text-zinc-400">{label}</span>
      <div className="flex items-center gap-1">
        <WheelPicker
          values={hourValues}
          selectedValue={hrs}
          onChange={handleHourChange}
          label="시"
        />
        <span className="text-2xl text-zinc-500 font-mono">:</span>
        <WheelPicker
          values={minuteValues}
          selectedValue={mins}
          onChange={handleMinuteChange}
          label="분"
        />
        <span className="text-2xl text-zinc-500 font-mono">:</span>
        <WheelPicker
          values={secondValues}
          selectedValue={secs}
          onChange={handleSecondChange}
          label="초"
        />
      </div>
      {onSetCurrent && (
        <button
          onClick={onSetCurrent}
          className="mt-2 px-4 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300 transition-colors"
        >
          현재 위치 설정
        </button>
      )}
    </div>
  );
}
