// 지구 표정 종류 (src/assets/earth/<이름>.png 와 1:1로 대응)
export type Mood =
  | 'happy'     // 미소
  | 'joy'       // 활짝 웃음
  | 'love'      // 하트, 아주 행복
  | 'neutral'   // 무표정
  | 'pout'      // 뾰로통
  | 'annoyed'   // 짜증
  | 'angry'     // 화남 (번개 구름)
  | 'sad'       // 울먹임 (비구름)
  | 'destroyed'; // 붕괴 (배드엔딩)

// 기분 사다리: 왼쪽일수록 기분이 좋음 (love, destroyed는 엔딩 전용)
const MOOD_LADDER: Mood[] = ['joy', 'happy', 'neutral', 'pout', 'annoyed', 'angry', 'sad'];

// 사다리의 각 칸이 끝나는 오염도 (오염 15 미만이면 joy, 30 미만이면 happy …)
const POLLUTION_STEPS = [15, 30, 45, 60, 75, 90];

// 오염도로 기본 표정 위치(사다리 칸 번호) 구하기
function ladderIndex(pollution: number): number {
  const index = POLLUTION_STEPS.findIndex((limit) => pollution < limit);
  return index === -1 ? MOOD_LADDER.length - 1 : index;
}

// 오염도에 따른 표정 + 상황에 따른 보정
// shift가 -1이면 한 단계 기분 좋게(성공), +1이면 한 단계 기분 나쁘게(실패)
export function moodByPollution(pollution: number, shift = 0): Mood {
  const index = ladderIndex(pollution) + shift;
  const clamped = Math.max(0, Math.min(MOOD_LADDER.length - 1, index));
  return MOOD_LADDER[clamped];
}

// 돌발상황 분위기 → 보정값 (좋은 소식이면 -1, 나쁜 소식이면 +1)
export function eventShift(mood: Mood): number {
  if (mood === 'joy' || mood === 'love' || mood === 'happy') return -1;
  if (mood === 'neutral') return 0;
  return 1;
}
