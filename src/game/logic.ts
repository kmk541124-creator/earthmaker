import { Buffs, Choice, ChoiceResult, ChoiceType, Ending, EventChoice, EventResult, Scene, Stats } from './types';
import { FINAL_SCENE, FIRST_SCENE, MIDDLE_SCENES } from './scenes';
import { EXTRA_FINAL_SCENES, EXTRA_FIRST_SCENES, EXTRA_MIDDLE_SCENES } from './extraScenes';

export const MAX_POLLUTION = 100; // 오염 최대치 (도달하면 배드엔딩)
export const FAIL_POLLUTION = 10; // 실패 시 늘어나는 오염량
export const SUN_TECH = 30;       // 엔딩 시점에 이 이상이면 인공태양 개발 성공
export const TURN_INCOME = 100;   // 매 선택마다 들어오는 자금
export const TOTAL_TURNS = 15;    // 엔딩까지 진행하는 날짜 수
export const EVENT_CHANCE = 0.35; // 하루가 끝날 때 돌발상황이 터질 확률
export const MINIGAME_EVERY = 4;  // 며칠마다 미니게임을 할지

// 미니게임 보상 (쓰레기 하나당 / 실수 하나당)
export const MINIGAME_CLEAN = 1;   // 쓰레기 하나 주울 때 줄어드는 오염
export const MINIGAME_MONEY = 15;  // 쓰레기 하나 주울 때 받는 자금
export const MINIGAME_PENALTY = 2; // 동물·꽃을 잘못 눌렀을 때 늘어나는 오염

// 선택지 종류별 효과 (tech: 기술 상승량, clean: 오염 감소량, failRate: 실패 확률)
export const CHOICE_EFFECTS: Record<ChoiceType, { tech: number; clean: number; failRate: number }> = {
  eco: { tech: 0, clean: 8, failRate: 0.1 },
  balanced: { tech: 2, clean: 3, failRate: 0.25 },
  bold: { tech: 5, clean: 6, failRate: 0.5 },
};

// 게임 시작 스탯
export const INITIAL_STATS: Stats = {
  tech: 0,
  pollution: 30,
  money: 200,
};

export const INITIAL_BUFFS: Buffs = {
  halfFail: false,
  shield: false,
};

// 오염 수치를 0~100 사이로 고정
export function clampPollution(value: number): number {
  return Math.max(0, Math.min(MAX_POLLUTION, value));
}

// 배열을 무작위로 섞은 새 배열 (피셔-예이츠 셔플)
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 배열에서 무작위로 하나 고르기
export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// 장면의 선택지 순서를 섞은 복사본
function withShuffledChoices(scene: Scene): Scene {
  return { ...scene, choices: shuffle(scene.choices) as Scene['choices'] };
}

// 한 판의 장면 순서 만들기: 첫 장면 후보 중 하나 + 무작위 중간 장면들 + 마지막 장면 후보 중 하나
export function buildScenario(): Scene[] {
  const first = pickRandom([FIRST_SCENE, ...EXTRA_FIRST_SCENES]);
  const final = pickRandom([FINAL_SCENE, ...EXTRA_FINAL_SCENES]);
  const middle = shuffle([...MIDDLE_SCENES, ...EXTRA_MIDDLE_SCENES]).slice(0, TOTAL_TURNS - 2);
  return [first, ...middle, final].map(withShuffledChoices);
}

// 오늘이 미니게임 날인지 (마지막 날 제외)
export function isMiniGameDay(turn: number): boolean {
  return (turn + 1) % MINIGAME_EVERY === 0 && turn < TOTAL_TURNS - 1;
}

// 미니게임 결과 반영
export function resolveMiniGame(stats: Stats, caught: number, mistakes: number): Stats {
  return {
    ...stats,
    money: stats.money + caught * MINIGAME_MONEY,
    pollution: clampPollution(stats.pollution - caught * MINIGAME_CLEAN + mistakes * MINIGAME_PENALTY),
  };
}

// 두 스탯의 차이 (화면에 +/- 로 보여 주기 위함)
export function diffStats(before: Stats, after: Stats): Stats {
  return {
    tech: after.tech - before.tech,
    pollution: after.pollution - before.pollution,
    money: after.money - before.money,
  };
}

// 선택지를 고르면 스탯을 계산하는 함수
export function resolveChoice(stats: Stats, choice: Choice, buffs: Buffs): ChoiceResult {
  const effect = CHOICE_EFFECTS[choice.type];
  const failRate = buffs.halfFail ? effect.failRate / 2 : effect.failRate; // 안전 매뉴얼 효과
  const failed = Math.random() < failRate;                                 // 변수 발생: 확률로 실패
  const next = { ...stats, money: stats.money + TURN_INCOME };             // 복사 + 자금 지급

  if (failed) {
    // 실패하면 기술은 그대로, 환경오염만 증가 (정화 필터가 있으면 막음)
    if (!buffs.shield) next.pollution = clampPollution(next.pollution + FAIL_POLLUTION);
    return { next, failed, shielded: buffs.shield };
  }

  next.tech += effect.tech;
  next.pollution = clampPollution(next.pollution - effect.clean);
  return { next, failed, shielded: false };
}

// 돌발상황 선택지를 고르면 스탯을 계산하는 함수
export function resolveEventChoice(stats: Stats, choice: EventChoice): EventResult {
  const failed = Math.random() < (choice.failRate ?? 0);
  const next = { ...stats };
  const money = choice.money ?? 0;

  if (money < 0) next.money += money; // 비용은 성공·실패와 상관없이 지불

  if (failed) {
    next.pollution = clampPollution(next.pollution + FAIL_POLLUTION);
    return { next, failed };
  }

  if (money > 0) next.money += money;
  next.tech += choice.tech ?? 0;
  next.pollution = clampPollution(next.pollution + (choice.pollution ?? 0));
  return { next, failed };
}

// 인공태양 개발에 성공했는지 (오염 100 배드엔딩이 아니고 기술이 목표 이상)
export function isSunDeveloped(stats: Stats): boolean {
  return stats.pollution < MAX_POLLUTION && stats.tech >= SUN_TECH;
}

// 엔딩 판정
export function getEnding(stats: Stats, sunDeveloped: boolean): Ending {
  if (stats.pollution >= MAX_POLLUTION) {
    return {
      title: '잿빛 지구',
      line: '콜록… 이제 숨을 쉴 수가 없어. 너희가 만든 기술도, 나도… 여기까지인가 봐.',
      mood: 'destroyed',
    };
  }
  if (sunDeveloped) {
    return {
      title: '인공태양의 아침',
      line: '이게… 인공태양이야? 깨끗한 빛이 하늘을 덮은 연기를 걷어 내고 있어! 숲도 바다도 다시 숨을 쉬어. 고마워, 정말 고마워!',
      mood: 'love',
    };
  }
  if (stats.pollution <= 40) {
    return {
      title: '조용한 초록 행성',
      line: '인공태양까지는 못 갔지만, 나는 아주 건강해. 천천히 가도 괜찮아.',
      mood: 'happy',
    };
  }
  return {
    title: '갈림길의 지구',
    line: '인공태양까지 조금만 더 가면 됐는데… 다음엔 우리 조금 더 잘해 보자.',
    mood: 'sad',
  };
}
