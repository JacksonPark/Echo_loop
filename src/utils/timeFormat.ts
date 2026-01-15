export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function parseTime(hrs: number, mins: number, secs: number): number {
  return hrs * 3600 + mins * 60 + secs;
}

export function splitTime(seconds: number): { hrs: number; mins: number; secs: number } {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return { hrs, mins, secs };
}
