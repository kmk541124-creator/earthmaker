import { ShopItem } from './types';
import { clampPollution } from './logic';

// 상점 아이템 목록 — 아이템을 추가하려면 이 배열에 객체만 추가하면 됩니다.
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'forest',
    name: '🌳 숲 조성 키트',
    desc: '환경오염 -10',
    price: 150,
    apply: (stats, buffs) => ({ stats: { ...stats, pollution: clampPollution(stats.pollution - 10) }, buffs }),
  },
  {
    id: 'lab',
    name: '🔬 연구 지원금',
    desc: '기술 +3',
    price: 200,
    apply: (stats, buffs) => ({ stats: { ...stats, tech: stats.tech + 3 }, buffs }),
  },
  {
    id: 'manual',
    name: '📘 안전 매뉴얼',
    desc: '다음 선택의 실패 확률 절반',
    price: 120,
    apply: (stats, buffs) => ({ stats, buffs: { ...buffs, halfFail: true } }),
  },
  {
    id: 'filter',
    name: '🧪 정화 필터',
    desc: '다음 실패 때 환경오염이 늘지 않음',
    price: 120,
    apply: (stats, buffs) => ({ stats, buffs: { ...buffs, shield: true } }),
  },
  {
    id: 'plant',
    name: '⚡ 청정 에너지 발전소',
    desc: '기술 +5, 환경오염 -5',
    price: 600,
    apply: (stats, buffs) => ({
      stats: { ...stats, tech: stats.tech + 5, pollution: clampPollution(stats.pollution - 5) },
      buffs,
    }),
  },
  {
    id: 'cleanup',
    name: '🌊 대청소 작전',
    desc: '환경오염 -25',
    price: 380,
    apply: (stats, buffs) => ({ stats: { ...stats, pollution: clampPollution(stats.pollution - 25) }, buffs }),
  },
];
