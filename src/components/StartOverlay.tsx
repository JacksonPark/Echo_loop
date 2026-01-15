'use client';

interface StartOverlayProps {
  onStart: () => void;
  previousFileName?: string | null;
}

export function StartOverlay({ onStart, previousFileName }: StartOverlayProps) {
  return (
    <div className="fixed inset-0 bg-zinc-900 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8 p-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-white">Echo-Loop</h1>
          <p className="text-zinc-400">영어 쉐도잉 학습 플레이어</p>
        </div>

        {previousFileName && (
          <div className="text-sm text-zinc-400">
            이전에 듣던 <span className="text-white">{previousFileName}</span>를<br />
            다시 선택해주세요
          </div>
        )}

        <button
          onClick={onStart}
          className="px-8 py-4 bg-white text-zinc-900 rounded-full text-lg font-semibold hover:bg-zinc-200 transition-colors"
        >
          Start Learning
        </button>

        <p className="text-xs text-zinc-500 max-w-[280px]">
          iOS에서 오디오 재생을 위해<br />이 버튼을 눌러 시작해주세요
        </p>
      </div>
    </div>
  );
}
