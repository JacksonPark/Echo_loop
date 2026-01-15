'use client';

import { useState } from 'react';
import { useAudioStore } from '@/stores/audioStore';
import { TimePicker } from './TimePicker';
import { formatTime } from '@/utils/timeFormat';

interface ABLoopControlsProps {
  onGetCurrentTime: () => number;
  onSeek: (time: number) => void;
}

export function ABLoopControls({ onGetCurrentTime, onSeek }: ABLoopControlsProps) {
  const {
    abLoopEnabled,
    startTime,
    endTime,
    duration,
    setABLoopEnabled,
    setStartTime,
    setEndTime,
  } = useAudioStore();

  const [tempStartTime, setTempStartTime] = useState(startTime);
  const [tempEndTime, setTempEndTime] = useState(endTime);
  const [isEditing, setIsEditing] = useState(false);

  const maxHours = Math.ceil(duration / 3600) || 24;

  const handleToggle = () => {
    if (!abLoopEnabled) {
      // 토글 켤 때 편집 모드 시작
      setTempStartTime(startTime);
      setTempEndTime(endTime);
      setIsEditing(true);
    }
    setABLoopEnabled(!abLoopEnabled);
  };

  const handleSetStartToCurrent = () => {
    const current = onGetCurrentTime();
    setTempStartTime(current);
  };

  const handleSetEndToCurrent = () => {
    const current = onGetCurrentTime();
    setTempEndTime(current);
  };

  const handleConfirm = () => {
    if (tempStartTime < tempEndTime) {
      setStartTime(tempStartTime);
      setEndTime(tempEndTime);
      setIsEditing(false);
      // 구간 시작 지점으로 이동
      onSeek(tempStartTime);
    }
  };

  const handleEdit = () => {
    setTempStartTime(startTime);
    setTempEndTime(endTime);
    setIsEditing(true);
  };

  const isValid = tempStartTime < tempEndTime;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Toggle Switch */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 rounded-xl">
        <span className="text-sm font-medium text-white">A-B 구간 반복</span>
        <button
          onClick={handleToggle}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            abLoopEnabled ? 'bg-green-500' : 'bg-zinc-600'
          }`}
          role="switch"
          aria-checked={abLoopEnabled}
        >
          <span
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
              abLoopEnabled ? 'translate-x-1' : 'translate-x-7'
            }`}
          />
        </button>
      </div>

      {/* Time Pickers or Confirmed Display */}
      {abLoopEnabled && (
        <div className="flex flex-col gap-4 p-4 bg-zinc-800/30 rounded-xl">
          {isEditing ? (
            <>
              {/* Editing Mode */}
              <div className="flex justify-around gap-4">
                <TimePicker
                  value={tempStartTime}
                  onChange={setTempStartTime}
                  maxHours={maxHours}
                  label="시작 (A)"
                  onSetCurrent={handleSetStartToCurrent}
                />
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <TimePicker
                  value={tempEndTime}
                  onChange={setTempEndTime}
                  maxHours={maxHours}
                  label="종료 (B)"
                  onSetCurrent={handleSetEndToCurrent}
                />
              </div>

              {/* Validation Message */}
              {!isValid && (
                <div className="text-center text-sm text-red-400">
                  종료 시간이 시작 시간보다 커야 합니다
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={!isValid}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  isValid
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                }`}
              >
                구간 설정 완료
              </button>
            </>
          ) : (
            <>
              {/* Confirmed Display */}
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <span className="text-xs text-zinc-500 block mb-1">시작 (A)</span>
                  <span className="text-xl font-mono text-white">{formatTime(startTime)}</span>
                </div>
                <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="text-center">
                  <span className="text-xs text-zinc-500 block mb-1">종료 (B)</span>
                  <span className="text-xl font-mono text-white">{formatTime(endTime)}</span>
                </div>
              </div>

              {/* Loop Duration */}
              <div className="text-center text-sm text-zinc-400">
                구간 길이: {Math.floor(endTime - startTime)}초
              </div>

              {/* Edit Button */}
              <button
                onClick={handleEdit}
                className="w-full py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-medium transition-colors"
              >
                구간 수정
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
