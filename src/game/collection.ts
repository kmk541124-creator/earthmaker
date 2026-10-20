// 엔딩 도감 — 본 엔딩 이름을 브라우저에 저장 (이 브라우저에서만 유지)
const STORAGE_KEY = 'earthmaker-endings';

// 모든 엔딩 이름 (도감에 표시할 순서)
export const ALL_ENDINGS = ['인공태양의 아침', '조용한 초록 행성', '갈림길의 지구', '잿빛 지구'];

// 저장된 엔딩 목록 불러오기 (저장소를 못 쓰면 빈 목록)
export function loadSeenEndings(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

// 엔딩 하나 추가 저장 후 새 목록 반환
export function addSeenEnding(title: string): string[] {
  const seen = loadSeenEndings();
  const next = seen.includes(title) ? seen : [...seen, title];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 저장 실패해도 게임은 계속 진행
  }
  return next;
}
