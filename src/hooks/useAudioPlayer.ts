'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAudioStore } from '@/stores/audioStore';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const {
    isPlaying,
    playbackRate,
    abLoopEnabled,
    startTime,
    endTime,
    setCurrentTime,
    setDuration,
    setIsPlaying,
  } = useAudioStore();

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preservesPitch = true;
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Update playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Handle time update with requestAnimationFrame for precision
  const updateTime = useCallback(() => {
    if (!audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);

    // A-B Loop logic
    if (abLoopEnabled && endTime > startTime) {
      if (currentTime >= endTime) {
        audioRef.current.currentTime = startTime;
      }
    }

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, [abLoopEnabled, startTime, endTime, isPlaying, setCurrentTime]);

  // Start/stop animation frame loop based on playing state
  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateTime]);

  const loadFile = useCallback((file: File) => {
    if (!audioRef.current) return;

    const url = URL.createObjectURL(file);
    audioRef.current.src = url;

    audioRef.current.onloadedmetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    audioRef.current.onended = () => {
      if (!abLoopEnabled) {
        setIsPlaying(false);
      }
    };
  }, [setDuration, setIsPlaying, abLoopEnabled]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  }, [setIsPlaying]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [setIsPlaying]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, audioRef.current.duration || 0));
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [setCurrentTime]);

  const skip = useCallback((seconds: number) => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + seconds;
      seek(newTime);
    }
  }, [seek]);

  const getCurrentTime = useCallback(() => {
    return audioRef.current?.currentTime || 0;
  }, []);

  return {
    audioRef,
    loadFile,
    play,
    pause,
    togglePlay,
    seek,
    skip,
    getCurrentTime,
  };
}
