import { Mood } from './mood';

// 게임 전체 스탯
export interface Stats {
  tech: number;      // 인류 기술 게이지
  pollution: number; // 환경오염 (0~100, 낮을수록 좋음)
  money: number;     // 상점에서 쓰는 자금
}

// 선택지 종류
// eco: 환경만 회복 / balanced: 기술·환경 조금씩 / bold: 기술·환경 둘 다 크게 (위험)
export type ChoiceType = 'eco' | 'balanced' | 'bold';

// 선택지 하나
export interface Choice {
  label: string;    // 버튼에 보이는 대답
  type: ChoiceType; // 선택지 종류 (효과와 실패 확률은 logic.ts의 CHOICE_EFFECTS에서 결정)
}

// 장면 하나 (지구 대사 + 선택지 3개)
export interface Scene {
  title: string;                     // 장면 이름 (화면 상단 표시)
  earthLine: string;                 // 지구 말풍선 대사
  successLine: string;               // 성공했을 때 지구 반응
  failLine: string;                  // 실패했을 때 지구 반응
  choices: [Choice, Choice, Choice]; // 선택지는 정확히 세 개
}

// 상점에서 산 아이템 효과 중 다음 선택에 적용되는 것
export interface Buffs {
  halfFail: boolean; // 다음 선택의 실패 확률 절반
  shield: boolean;   // 다음 실패 때 오염이 늘지 않음
}

// 선택 결과
export interface ChoiceResult {
  next: Stats;     // 바뀐 스탯
  failed: boolean; // 실패 여부
  shielded: boolean; // 실패했지만 정화 필터로 막았는지
}

// 상점 아이템
export interface ShopItem {
  id: string;
  name: string;  // 아이템 이름
  desc: string;  // 효과 설명
  price: number; // 가격
  apply: (stats: Stats, buffs: Buffs) => { stats: Stats; buffs: Buffs }; // 구매 시 효과
}

// 엔딩 정보
export interface Ending {
  title: string; // 엔딩 이름
  line: string;  // 지구의 엔딩 대사
  mood: Mood;    // 엔딩 때 지구 표정
}

// 돌발상황 선택지
export interface EventChoice {
  label: string;       // 버튼에 보이는 대답
  tech?: number;       // 성공 시 기술 변화량
  pollution?: number;  // 성공 시 환경오염 변화량 (음수면 감소)
  money?: number;      // 자금 변화량 (음수는 비용 — 실패해도 지불, 양수는 성공 시에만 받음)
  failRate?: number;   // 실패 확률 (없으면 항상 성공)
  resultLine: string;  // 성공했을 때 지구 반응
}

// 돌발상황
export interface GameEvent {
  id: string;
  title: string;          // 돌발상황 이름
  earthLine: string;      // 지구 말풍선 대사
  mood: Mood;             // 돌발상황이 터졌을 때 지구 표정
  failLine: string;       // 실패했을 때 지구 반응
  choices: EventChoice[]; // 선택지 (2~3개)
}

// 돌발상황 선택 결과
export interface EventResult {
  next: Stats;     // 바뀐 스탯
  failed: boolean; // 실패 여부
}
