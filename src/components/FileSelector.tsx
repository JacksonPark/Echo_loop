'use client';

import { useRef } from 'react';
import { useAudioStore } from '@/stores/audioStore';

interface FileSelectorProps {
  onFileSelect: (file: File) => void;
}

export function FileSelector({ onFileSelect }: FileSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fileName } = useAudioStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="audio/*, .mp3, .m4a, .m4b, .aac, .wav, .ogg, .flac, .wma"
        onChange={handleChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm text-zinc-300 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        {fileName ? '다른 파일 선택' : '오디오 파일 선택'}
      </button>
      {fileName && (
        <span className="text-xs text-zinc-500 truncate max-w-[200px]">
          {fileName}
        </span>
      )}
    </div>
  );
}
