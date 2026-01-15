'use client';

import { useState, useEffect } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useWakeLock } from '@/hooks/useWakeLock';
import { useAudioStore } from '@/stores/audioStore';
import { TimeDisplay } from './TimeDisplay';
import { PlaybackControls } from './PlaybackControls';
import { SpeedSlider } from './SpeedSlider';
import { ABLoopControls } from './ABLoopControls';
import { FileSelector } from './FileSelector';
import { StartOverlay } from './StartOverlay';

export function AudioPlayer() {
  const [showOverlay, setShowOverlay] = useState(true);
  const { loadFile, togglePlay, skip, getCurrentTime, seek } = useAudioPlayer();
  const { requestWakeLock, releaseWakeLock } = useWakeLock();
  const {
    fileName,
    isPlaying,
    isInitialized,
    currentTime: savedCurrentTime,
    setFileName,
    setIsInitialized,
  } = useAudioStore();

  // Handle wake lock based on playing state
  useEffect(() => {
    if (isPlaying) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
  }, [isPlaying, requestWakeLock, releaseWakeLock]);

  const handleStart = () => {
    setShowOverlay(false);
    setIsInitialized(true);
  };

  const handleFileSelect = (file: File) => {
    loadFile(file);
    setFileName(file.name);

    // If this is the same file, restore position
    if (file.name === fileName && savedCurrentTime > 0) {
      setTimeout(() => {
        seek(savedCurrentTime);
      }, 100);
    }
  };

  // Show overlay on first load or if not initialized
  if (showOverlay && !isInitialized) {
    return <StartOverlay onStart={handleStart} previousFileName={fileName} />;
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto px-4 py-8">
      {/* Header - File Name */}
      <div className="w-full text-center">
        <h1 className="text-lg font-semibold text-white">Echo-Loop</h1>
        {fileName && (
          <p className="text-sm text-zinc-400 truncate mt-1">{fileName}</p>
        )}
      </div>

      {/* File Selector */}
      <FileSelector onFileSelect={handleFileSelect} />

      {/* Time Display */}
      <TimeDisplay />

      {/* Playback Controls */}
      <PlaybackControls onTogglePlay={togglePlay} onSkip={skip} />

      {/* Speed Slider */}
      <SpeedSlider />

      {/* A-B Loop Controls */}
      <ABLoopControls onGetCurrentTime={getCurrentTime} onSeek={seek} />
    </div>
  );
}
