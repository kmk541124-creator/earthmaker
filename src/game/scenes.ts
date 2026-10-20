import { Scene } from './types';

// 게임 대사 데이터
// 선택지 순서: eco(환경만 회복) → balanced(기술·환경 조금씩) → bold(둘 다 크게, 위험)
// 한 판은 FIRST_SCENE → MIDDLE_SCENES 중 무작위 → FINAL_SCENE 순서로 진행됩니다.
// 장면을 추가하려면 MIDDLE_SCENES 배열에 객체만 추가하면 됩니다.

export const FIRST_SCENE: Scene = {
  title: '첫 만남',
  earthLine: '안녕! 나는 지구야. 너희 인류가 나랑 같이 살아가게 됐다며? 첫 약속 하나만 해 줄래?',
  successLine: '약속한 거다? 새끼손가락… 아, 나는 손가락이 없지. 헤헤.',
  failLine: '말은 그렇게 해 놓고 벌써 쓰레기를 버렸잖아! 첫날부터 이러기야?',
  choices: [
    { label: '먼저 네 숲과 바다부터 지킬게.', type: 'eco' },
    { label: '조금씩 배우면서 같이 자라자.', type: 'balanced' },
    { label: '최고의 문명을 세워서 보여 줄게!', type: 'bold' },
  ],
};

export const FINAL_SCENE: Scene = {
  title: '마지막 선택',
  earthLine: '여기까지 와 줬구나. 이제 마지막 선택이야. 너는 나와 어떤 내일을 만들고 싶어?',
  successLine: '좋아… 이 선택, 오래오래 기억할게.',
  failLine: '마지막에 욕심을 너무 냈나 봐… 그래도 끝까지 같이 있어 줘서 고마워.',
  choices: [
    { label: '너와 천천히, 오래 함께할게.', type: 'eco' },
    { label: '기술과 자연, 둘 다 지켜 낼게.', type: 'balanced' },
    { label: '인공태양을 향해 전부 걸겠어!', type: 'bold' },
  ],
};

export const MIDDLE_SCENES: Scene[] = [
  {
    title: '메마른 땅',
    earthLine: '요즘 비가 너무 안 와. 사막이 점점 넓어지고 있어… 목이 바싹바싹 말라.',
    successLine: '촉촉해! 오랜만에 시원한 기분이야.',
    failLine: '으앗, 물을 끌어오다가 강줄기가 끊겼어… 더 목말라졌잖아.',
    choices: [
      { label: '사막 가장자리에 나무를 심을게.', type: 'eco' },
      { label: '물을 아끼는 장치를 만들게.', type: 'balanced' },
      { label: '인공 비구름 기계를 띄워 보자!', type: 'bold' },
    ],
  },
  {
    title: '반짝이는 바다',
    earthLine: '바다에 반짝이는 게 잔뜩 떠다녀. 예뻐 보여도 그거… 플라스틱이지?',
    successLine: '바다가 다시 투명해졌어! 거북이가 고맙다고 인사하래.',
    failLine: '청소하다가 기름이 새어 나왔어… 바다가 끈적끈적해.',
    choices: [
      { label: '다 같이 해변 청소에 나설게.', type: 'eco' },
      { label: '저절로 썩는 플라스틱을 개발할게.', type: 'balanced' },
      { label: '바다 청소 로봇 함대를 띄우자!', type: 'bold' },
    ],
  },
  {
    title: '별이 없는 밤',
    earthLine: '밤인데도 도시가 대낮처럼 밝아. 별이 안 보여서 철새들이 길을 잃었대.',
    successLine: '와, 별이다! 철새들도 집으로 잘 돌아가고 있어.',
    failLine: '공사 소음이랑 불빛이 더 심해졌어… 오늘 밤은 잠 못 자겠다.',
    choices: [
      { label: '필요 없는 조명은 전부 끌게.', type: 'eco' },
      { label: '사람이 있을 때만 켜지는 가로등으로 바꿀게.', type: 'balanced' },
      { label: '도시 전체를 새로 설계하자!', type: 'bold' },
    ],
  },
  {
    title: '깨어나는 화산',
    earthLine: '으으, 내 속이 부글부글 끓어. 화산이 깨어나려나 봐! 다들 괜찮을까?',
    successLine: '휴, 다친 사람 없이 지나갔어. 너희 정말 침착하구나.',
    failLine: '화산재가 하늘을 덮어 버렸어… 콜록, 앞이 안 보여!',
    choices: [
      { label: '주민부터 안전하게 대피시킬게.', type: 'eco' },
      { label: '화산 관측소를 세워서 미리 알아챌게.', type: 'balanced' },
      { label: '화산 열로 발전소를 돌려 보자!', type: 'bold' },
    ],
  },
  {
    title: '녹아내리는 빙하',
    earthLine: '북극 빙하가 녹고 있어. 북극곰이 설 자리가 없대… 나 열이 나는 것 같아.',
    successLine: '조금 시원해졌어. 북극곰이 얼음 위에서 낮잠을 자고 있어!',
    failLine: '빙하가 크게 무너져 버렸어… 바닷물이 올라오고 있어.',
    choices: [
      { label: '탄소를 줄이는 캠페인을 열게.', type: 'eco' },
      { label: '빙하를 지키는 반사막을 연구할게.', type: 'balanced' },
      { label: '거대한 냉각 위성을 쏘아 올리자!', type: 'bold' },
    ],
  },
  {
    title: '하늘 너머',
    earthLine: '하늘 너머가 궁금하다며? 설마… 나를 떠나려는 건 아니지?',
    successLine: '우주에서 본 내 모습, 예쁘지? 너희가 지켜 준 덕분이야.',
    failLine: '로켓 잔해가 우주에 잔뜩 떠다녀… 내 주위가 쓰레기장이 됐어.',
    choices: [
      { label: '우주보다 너를 먼저 돌볼게.', type: 'eco' },
      { label: '너를 지켜보는 관측 위성을 만들게.', type: 'balanced' },
      { label: '달에 연구 기지를 세우자!', type: 'bold' },
    ],
  },
  {
    title: '생각하는 기계',
    earthLine: '사람들이 생각하는 기계를 만들었대. 그 친구는 나를 어떻게 생각할까?',
    successLine: 'AI가 나한테 "아프지 마"래. 기계인데 다정하네.',
    failLine: 'AI가 전기를 너무 많이 먹어… 발전소가 쉬지를 않아.',
    choices: [
      { label: 'AI에게 자연의 소중함부터 가르칠게.', type: 'eco' },
      { label: 'AI로 오염 지도를 만들게.', type: 'balanced' },
      { label: 'AI에게 모든 연구를 맡기자!', type: 'bold' },
    ],
  },
  {
    title: '지구의 날',
    earthLine: '오늘은 지구의 날이래! 나를 위한 날이라니… 좀 쑥스러운걸.',
    successLine: '이렇게 축하받으니까 기운이 막 나! 오늘 최고야!',
    failLine: '축제가 끝나고 쓰레기 산이 생겼어… 이건 축하가 아니잖아.',
    choices: [
      { label: '하루 동안 다 같이 불을 끄자.', type: 'eco' },
      { label: '친환경 기술 박람회를 열게.', type: 'balanced' },
      { label: '세계 최대 과학 축제를 열자!', type: 'bold' },
    ],
  },
  {
    title: '사라진 꿀벌',
    earthLine: '요즘 꽃밭이 조용해. 꿀벌들이 다 어디 갔지? 이러다 꽃이 열매를 못 맺을 거야.',
    successLine: '윙윙~ 꿀벌이 돌아왔어! 꽃들이 신나서 활짝 폈어.',
    failLine: '꿀벌을 부르려다 꽃밭을 다 갈아엎었어… 더 조용해졌네.',
    choices: [
      { label: '농약을 줄이고 들꽃을 심을게.', type: 'eco' },
      { label: '꿀벌 보호 연구소를 세울게.', type: 'balanced' },
      { label: '꽃가루를 옮기는 로봇 꿀벌을 만들자!', type: 'bold' },
    ],
  },
  {
    title: '뿌연 하늘',
    earthLine: '하늘이 뿌옇고 목이 칼칼해. 미세먼지 때문에 아이들이 밖에서 못 논대.',
    successLine: '하늘이 파래! 아이들 웃음소리가 다시 들려.',
    failLine: '먼지를 잡으려다 기계가 더 많은 먼지를 뿜었어… 콜록!',
    choices: [
      { label: '차 없는 날을 만들게.', type: 'eco' },
      { label: '도시 곳곳에 공기 정화 타워를 세울게.', type: 'balanced' },
      { label: '하늘 청소 드론 떼를 날리자!', type: 'bold' },
    ],
  },
  {
    title: '쓰레기 산',
    earthLine: '도시 옆에 쓰레기가 산처럼 쌓였어. 냄새가 여기까지 나… 으으.',
    successLine: '쓰레기 산이 줄어들었어! 그 자리에 공원이 생긴대.',
    failLine: '쓰레기를 태우다가 시커먼 연기가 났어… 이건 아니야.',
    choices: [
      { label: '분리수거를 철저히 할게.', type: 'eco' },
      { label: '재활용 공장을 지을게.', type: 'balanced' },
      { label: '쓰레기를 전기로 바꾸는 발전소를 짓자!', type: 'bold' },
    ],
  },
  {
    title: '베어지는 숲',
    earthLine: '열대우림이 하루에 축구장 몇 개씩 사라지고 있대. 내 허파가 줄어드는 기분이야.',
    successLine: '숲이 다시 자라고 있어. 숨쉬기가 한결 편해졌어.',
    failLine: '나무 심는 길을 낸다고 숲을 또 베었잖아… 바보!',
    choices: [
      { label: '벌목을 멈추게 할게.', type: 'eco' },
      { label: '나무를 다시 심는 로봇을 보낼게.', type: 'balanced' },
      { label: '위성으로 숲 전체를 관리하자!', type: 'bold' },
    ],
  },
  {
    title: '하얗게 질린 산호',
    earthLine: '바닷속 산호들이 하얗게 질려 가고 있어. 바다가 너무 뜨거워졌대.',
    successLine: '산호가 다시 알록달록해졌어! 물고기들이 놀러 왔어.',
    failLine: '바다를 식히려다 물살이 엉망이 됐어… 산호가 더 아파해.',
    choices: [
      { label: '바닷가 개발을 멈출게.', type: 'eco' },
      { label: '산호를 키우는 바다 농장을 만들게.', type: 'balanced' },
      { label: '바다 온도 조절 장치를 설치하자!', type: 'bold' },
    ],
  },
  {
    title: '끓는 여름',
    earthLine: '올여름은 정말 너무 더워. 아스팔트가 녹을 지경이야… 나도 녹을 것 같아.',
    successLine: '바람이 시원해! 이 정도면 여름도 괜찮은걸.',
    failLine: '에어컨을 너무 돌려서 전기가 바닥났어… 더 더워졌잖아!',
    choices: [
      { label: '건물 옥상마다 정원을 만들게.', type: 'eco' },
      { label: '햇빛을 반사하는 지붕으로 바꿀게.', type: 'balanced' },
      { label: '도시 전체에 냉방 돔을 씌우자!', type: 'bold' },
    ],
  },
  {
    title: '작은 태양 실험',
    earthLine: '과학자들이 작은 태양을 만들어 보겠대. 멋지긴 한데… 위험하지는 않을까?',
    successLine: '작은 빛이 반짝 켜졌어! 언젠가 진짜 인공태양이 될 수도 있겠다.',
    failLine: '실험로가 과열돼서 멈췄어… 주변이 엉망이야.',
    choices: [
      { label: '아직은 위험하니 천천히 하자.', type: 'eco' },
      { label: '작은 실험로부터 조심스럽게 시작할게.', type: 'balanced' },
      { label: '대형 핵융합로를 바로 짓자!', type: 'bold' },
    ],
  },
  {
    title: '마지막 한 마리',
    earthLine: '어떤 동물이 이제 세상에 몇 마리 안 남았대. 나한테서 그 아이가 사라지는 건 싫어.',
    successLine: '새끼가 태어났대! 나 지금 너무 기뻐.',
    failLine: '보호한다고 옮기다가 다들 지쳐 버렸어… 미안해, 얘들아.',
    choices: [
      { label: '보호구역을 넓힐게.', type: 'eco' },
      { label: '유전자 은행을 만들어 지킬게.', type: 'balanced' },
      { label: '멸종 동물 복원 프로젝트를 시작하자!', type: 'bold' },
    ],
  },
  {
    title: '넘치는 강',
    earthLine: '비가 한꺼번에 쏟아져서 강이 넘치고 있어! 마을이 잠기겠어!',
    successLine: '물이 얌전히 빠졌어. 다들 무사해서 다행이야.',
    failLine: '둑이 무너졌어… 흙탕물이 온 마을을 덮쳤어.',
    choices: [
      { label: '강가에 습지를 되살릴게.', type: 'eco' },
      { label: '물높이를 알아서 조절하는 제방을 만들게.', type: 'balanced' },
      { label: '거대한 지하 수로를 뚫자!', type: 'bold' },
    ],
  },
  {
    title: '조용한 도로',
    earthLine: '자동차 소리가 시끄럽고 매연도 매워. 조금 조용한 길을 걷고 싶어.',
    successLine: '길이 조용해졌어! 새소리가 다 들리네.',
    failLine: '배터리 공장에서 폐수가 흘러나왔어… 강이 아파해.',
    choices: [
      { label: '자전거 도로를 쭉 이어 줄게.', type: 'eco' },
      { label: '다 쓴 배터리를 재활용할게.', type: 'balanced' },
      { label: '세상의 모든 차를 전기차로 바꾸자!', type: 'bold' },
    ],
  },
];
