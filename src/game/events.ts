import { GameEvent } from './types';

// 돌발상황 목록 — 하루가 끝날 때 일정 확률로 이 중 하나가 터집니다.
// 돌발상황을 추가하려면 이 배열에 객체만 추가하면 됩니다.
export const EVENTS: GameEvent[] = [
  {
    id: 'meteor',
    title: '운석 낙하 경보',
    earthLine: '으악! 하늘에서 커다란 돌덩이가 떨어지고 있어! 운석이야, 어떻게 좀 해 줘!',
    mood: 'sad',
    failLine: '빗나갔어…! 운석이 바다에 떨어져서 먼지구름이 잔뜩 생겼어.',
    choices: [
      { label: '방어 위성으로 운석을 쏘아 맞히자!', money: -150, tech: 3, failRate: 0.3, resultLine: '명중! 운석이 산산조각 났어. 너희 정말 멋지다!' },
      { label: '사람들을 대피시키고 기다릴게.', pollution: 6, resultLine: '다친 사람은 없지만… 떨어진 자리에 먼지가 자욱해.' },
    ],
  },
  {
    id: 'sponsor',
    title: '수상한 후원 제안',
    earthLine: '큰 회사가 돈을 잔뜩 주겠대. 대신 내 숲에 공장을 짓게 해 달래… 어떻게 할 거야?',
    mood: 'pout',
    failLine: '',
    choices: [
      { label: '돈을 받고 공장을 허락한다.', money: 400, pollution: 12, resultLine: '흥, 돈이 그렇게 좋아? 굴뚝 연기가 벌써 매워.' },
      { label: '숲은 안 된다고 정중히 거절한다.', pollution: -3, resultLine: '역시 너는 내 편이야! 숲이 고맙대.' },
    ],
  },
  {
    id: 'wildfire',
    title: '큰 산불',
    earthLine: '숲에 불이 났어! 뜨거워, 뜨거워! 빨리 꺼 줘!',
    mood: 'sad',
    failLine: '',
    choices: [
      { label: '소방 헬기를 총동원하자!', money: -100, pollution: 2, resultLine: '불이 꺼졌어… 조금 그을렸지만 금방 다시 자랄 거야.' },
      { label: '비가 오기를 기다리자.', pollution: 12, resultLine: '비가 올 때까지 숲이 너무 많이 타 버렸어…' },
    ],
  },
  {
    id: 'scientist',
    title: '천재 과학자 등장',
    earthLine: '어떤 과학자가 대단한 발명을 했대! 다들 그 사람 얘기뿐이야.',
    mood: 'joy',
    failLine: '',
    choices: [
      { label: '연구비를 팍팍 지원한다!', money: -200, tech: 6, resultLine: '발명이 완성됐어! 기술이 한 단계 올라섰대.' },
      { label: '발명 특허를 사서 팔아 버린다.', money: 250, resultLine: '돈은 벌었지만… 그 발명, 나한테도 좋은 거였을 텐데.' },
    ],
  },
  {
    id: 'oil',
    title: '기름 유출 사고',
    earthLine: '유조선이 부서져서 바다에 기름이 쏟아졌어! 새들 날개가 새까매졌어…',
    mood: 'angry',
    failLine: '',
    choices: [
      { label: '방제선을 보내 기름을 걷어 낸다.', money: -120, pollution: -2, resultLine: '바다가 다시 반짝여. 새들도 날개를 털고 있어.' },
      { label: '저절로 사라지길 기다린다.', pollution: 15, resultLine: '이렇게 그냥 둘 거야?! 바다가 숨을 못 쉬잖아!' },
    ],
  },
  {
    id: 'donation',
    title: '지구 사랑 모금',
    earthLine: '사람들이 나를 위해 돈을 모았대! 어떻게 쓸지 너한테 맡긴대.',
    mood: 'love',
    failLine: '',
    choices: [
      { label: '숲과 바다를 되살리는 데 쓴다.', pollution: -10, resultLine: '온몸이 개운해! 다들 고마워!' },
      { label: '연구 자금으로 아껴 둔다.', money: 300, resultLine: '알뜰하네! 꼭 좋은 데 써 줘야 해.' },
      { label: '반반 나눠서 쓴다.', money: 150, pollution: -5, resultLine: '반씩이라니, 똑똑한 선택이야.' },
    ],
  },
  {
    id: 'blackout',
    title: '대정전',
    earthLine: '전기가 몽땅 나갔어! 도시가 깜깜해서 다들 우왕좌왕하고 있어.',
    mood: 'annoyed',
    failLine: '비상 발전기가 터져 버렸어… 연기만 잔뜩 났네.',
    choices: [
      { label: '석탄 발전소를 급하게 돌린다.', tech: 1, pollution: 10, resultLine: '불은 켜졌지만… 굴뚝 연기 때문에 목이 아파.' },
      { label: '태양광 비상 발전을 시험해 본다.', money: -150, tech: 4, failRate: 0.3, resultLine: '햇빛으로 도시가 다시 밝아졌어! 깨끗한 불빛이야.' },
    ],
  },
  {
    id: 'signal',
    title: '우주에서 온 신호',
    earthLine: '우주에서 이상한 신호가 왔어… 삐— 삐삐—. 누가 우리를 부르는 걸까?',
    mood: 'neutral',
    failLine: '해독하다가 거대 안테나가 과열됐어… 주변이 엉망이야.',
    choices: [
      { label: '연구팀을 꾸려 신호를 해독한다.', money: -100, tech: 5, failRate: 0.4, resultLine: '해독 성공! 깨끗한 에너지에 관한 힌트였대!' },
      { label: '신호를 녹음만 해 둔다.', tech: 1, resultLine: '녹음해 둔 신호, 언젠가 쓸모가 있겠지?' },
    ],
  },
  {
    id: 'dust',
    title: '황사 폭풍',
    earthLine: '사막에서 누런 모래바람이 몰려오고 있어! 눈을 못 뜨겠어!',
    mood: 'annoyed',
    failLine: '',
    choices: [
      { label: '바람을 막는 숲을 심는다.', money: -100, pollution: -6, resultLine: '나무들이 모래바람을 막아 줬어. 든든해!' },
      { label: '마스크를 쓰고 버틴다.', pollution: 6, resultLine: '버티긴 했는데… 온 세상이 누렇게 뒤덮였어.' },
    ],
  },
  {
    id: 'mineral',
    title: '희귀 광물 발견',
    earthLine: '내 땅속에서 반짝이는 희귀 광물이 발견됐대. 다들 눈이 반짝반짝해…',
    mood: 'pout',
    failLine: '',
    choices: [
      { label: '조심스럽게 조금만 캔다.', money: 200, pollution: 4, resultLine: '조금 간지럽지만 참아 줄게. 대신 아껴 써!' },
      { label: '몽땅 캐서 팔아 버린다.', money: 450, pollution: 14, resultLine: '아야야! 너무 깊게 팠잖아! 땅이 울퉁불퉁해졌어.' },
      { label: '그대로 묻어 둔다.', pollution: -2, resultLine: '내 보물, 지켜 줘서 고마워.' },
    ],
  },
];
