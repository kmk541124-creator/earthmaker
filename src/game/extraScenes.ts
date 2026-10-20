import { Scene } from './types';

// 추가 장면 데이터 — scenes.ts의 장면들과 합쳐서 무작위로 뽑힙니다.
// 선택지 순서: eco(환경만 회복) → balanced(기술·환경 조금씩) → bold(둘 다 크게, 위험)
// (화면에서는 순서가 섞여서 나옵니다)

// 첫 장면 후보 (scenes.ts의 FIRST_SCENE과 함께 이 중 하나가 무작위로 나옴)
export const EXTRA_FIRST_SCENES: Scene[] = [
  {
    title: '눈을 뜬 날',
    earthLine: '음냐… 누가 나를 깨웠어? 아, 너희가 인류구나! 앞으로 나를 어떻게 대해 줄 거야?',
    successLine: '후후, 마음에 드는 대답이야. 잘 부탁해!',
    failLine: '깨우자마자 땅을 파헤치다니… 아직 졸린데 너무하잖아.',
    choices: [
      { label: '조심조심, 네가 놀라지 않게 살게.', type: 'eco' },
      { label: '너한테 배우면서 하나씩 만들어 갈게.', type: 'balanced' },
      { label: '너를 우주에서 제일 멋진 별로 만들어 줄게!', type: 'bold' },
    ],
  },
  {
    title: '새로운 동반자',
    earthLine: '반가워, 새 친구! 나랑 오래오래 같이 지내려면 뭐부터 하고 싶어?',
    successLine: '좋아, 우리 잘 맞을 것 같아!',
    failLine: '시작부터 실수했네… 괜찮아, 다음엔 잘할 거지?',
    choices: [
      { label: '네 이야기부터 귀 기울여 들을게.', type: 'eco' },
      { label: '작은 마을부터 차근차근 지을게.', type: 'balanced' },
      { label: '첫날부터 큰 도시를 세워 보자!', type: 'bold' },
    ],
  },
];

// 마지막 장면 후보
export const EXTRA_FINAL_SCENES: Scene[] = [
  {
    title: '마지막 밤',
    earthLine: '내일이면 모든 게 결정된대. 오늘 밤은 별이 참 많네… 마지막으로 무엇을 할 거야?',
    successLine: '고마워. 내일 아침이 기다려져.',
    failLine: '마지막 밤에 큰불이 났어… 그래도 너를 믿어.',
    choices: [
      { label: '조용히 나무 한 그루를 더 심을게.', type: 'eco' },
      { label: '모두가 쓸 수 있는 깨끗한 기술을 나눌게.', type: 'balanced' },
      { label: '남은 힘을 모두 연구소에 쏟을게!', type: 'bold' },
    ],
  },
  {
    title: '약속의 날',
    earthLine: '첫날 했던 약속 기억해? 오늘이 그 약속을 지키는 날이야. 어떻게 마무리할래?',
    successLine: '약속 지켜 줬구나… 나 지금 조금 울 것 같아.',
    failLine: '마지막에 삐끗했네. 그래도 여기까지 온 것만으로 고마워.',
    choices: [
      { label: '처음처럼 너를 먼저 생각할게.', type: 'eco' },
      { label: '지금까지 쌓은 걸 차분히 정리할게.', type: 'balanced' },
      { label: '마지막 실험을 성공시켜 보이겠어!', type: 'bold' },
    ],
  },
];

// 중간 장면 추가분
export const EXTRA_MIDDLE_SCENES: Scene[] = [
  {
    title: '빨대 한 개',
    earthLine: '거북이 코에 빨대가 꽂혀 있었대… 작은 거지만 바다 친구들한텐 너무 아파.',
    successLine: '바다 친구들이 한결 편해졌대. 작은 거라도 큰 차이야!',
    failLine: '대체품 공장에서 폐수가 나왔어… 이러면 소용없잖아.',
    choices: [
      { label: '일회용 빨대를 쓰지 않을게.', type: 'eco' },
      { label: '먹을 수 있는 빨대를 개발할게.', type: 'balanced' },
      { label: '모든 일회용품을 새 소재로 바꾸자!', type: 'bold' },
    ],
  },
  {
    title: '버려지는 옷',
    earthLine: '옷을 너무 많이 만들고 금방 버린대. 사막에 옷 무덤이 생겼어…',
    successLine: '옷 무덤이 줄어들고 있어. 오래 입어 줘서 고마워.',
    failLine: '옷을 태우다가 검은 연기가 피어올랐어… 콜록.',
    choices: [
      { label: '한 벌을 오래오래 입을게.', type: 'eco' },
      { label: '헌 옷을 새 옷으로 되살리는 공장을 지을게.', type: 'balanced' },
      { label: '저절로 분해되는 옷감을 발명하자!', type: 'bold' },
    ],
  },
  {
    title: '소들의 한숨',
    earthLine: '소가 내뿜는 가스도 나를 덥게 만든대. 소들은 잘못 없는데… 어쩌지?',
    successLine: '공기가 조금 가벼워졌어. 소들도 편안해 보여.',
    failLine: '사료를 바꾸다가 소들이 배탈이 났어… 가스가 더 나와!',
    choices: [
      { label: '고기를 조금씩 줄여 볼게.', type: 'eco' },
      { label: '가스가 덜 나오는 사료를 연구할게.', type: 'balanced' },
      { label: '실험실에서 고기를 키우자!', type: 'bold' },
    ],
  },
  {
    title: '하늘의 구멍',
    earthLine: '내 하늘 막에 구멍이 뚫렸대. 햇빛이 따끔따끔해… 피부가 타는 것 같아.',
    successLine: '구멍이 조금씩 메워지고 있어! 햇빛이 다시 포근해.',
    failLine: '하늘에 뿌린 약품이 오히려 구멍을 넓혔어…',
    choices: [
      { label: '구멍을 내는 가스를 쓰지 않을게.', type: 'eco' },
      { label: '안전한 냉장고 가스를 개발할게.', type: 'balanced' },
      { label: '하늘 막을 직접 수리하는 비행선을 띄우자!', type: 'bold' },
    ],
  },
  {
    title: '말라 가는 우물',
    earthLine: '땅속 물을 너무 많이 퍼 써서 우물이 말라 가. 내 속이 텅 빈 느낌이야.',
    successLine: '땅속이 다시 촉촉해지고 있어. 고마워.',
    failLine: '더 깊이 파다가 땅이 꺼져 버렸어… 아야!',
    choices: [
      { label: '물을 아껴 쓰는 습관을 들일게.', type: 'eco' },
      { label: '빗물을 모아 쓰는 시설을 만들게.', type: 'balanced' },
      { label: '바닷물을 마실 물로 바꾸는 공장을 짓자!', type: 'bold' },
    ],
  },
  {
    title: '잠기는 섬',
    earthLine: '바닷물이 높아져서 작은 섬이 잠기고 있어. 거기 사는 사람들이 걱정돼.',
    successLine: '섬 사람들이 안전해졌대. 바닷물도 조금 잠잠해졌어.',
    failLine: '방파제가 무너져서 바닷물이 마을까지 들어왔어…',
    choices: [
      { label: '바닷가에 맹그로브 숲을 심을게.', type: 'eco' },
      { label: '물에 뜨는 집을 설계할게.', type: 'balanced' },
      { label: '섬 전체를 둘러싸는 거대 방벽을 세우자!', type: 'bold' },
    ],
  },
  {
    title: '바람개비 언덕',
    earthLine: '언덕 위에 커다란 바람개비를 세운대. 바람으로 전기를 만든다니 신기해!',
    successLine: '바람개비가 빙글빙글~ 깨끗한 전기가 술술 나와!',
    failLine: '날개에 새들이 부딪혔어… 새들한테 미안해.',
    choices: [
      { label: '새들이 다니지 않는 곳만 골라 세울게.', type: 'eco' },
      { label: '새를 피하는 똑똑한 풍력 발전기를 만들게.', type: 'balanced' },
      { label: '바다 위에 거대 풍력 단지를 짓자!', type: 'bold' },
    ],
  },
  {
    title: '물로 가는 자동차',
    earthLine: '물에서 뽑은 수소로 달리는 차가 있대. 배기구에서 물만 나온다며? 정말이야?',
    successLine: '진짜 물만 나와! 차가 지나가도 공기가 깨끗해.',
    failLine: '수소 탱크에서 사고가 났어… 깜짝 놀랐잖아!',
    choices: [
      { label: '당분간은 걸어 다닐게.', type: 'eco' },
      { label: '수소 버스부터 조금씩 늘릴게.', type: 'balanced' },
      { label: '나라 전체를 수소 에너지로 바꾸자!', type: 'bold' },
    ],
  },
  {
    title: '남극 탐사',
    earthLine: '남극에 연구하러 간다고? 펭귄들이 깜짝 놀라지 않게 조심해 줘.',
    successLine: '펭귄들이 너희한테 손을 흔들었대! 귀엽지?',
    failLine: '기지에서 기름이 새서 얼음이 까맣게 물들었어…',
    choices: [
      { label: '펭귄을 위해 탐사를 미룰게.', type: 'eco' },
      { label: '작은 친환경 연구 기지를 세울게.', type: 'balanced' },
      { label: '얼음 밑까지 파고드는 대규모 탐사를 하자!', type: 'bold' },
    ],
  },
  {
    title: '깊은 바다의 보물',
    earthLine: '깊은 바닷속 바닥에 귀한 금속이 잔뜩 있대. 거긴 아무도 안 가 본 곳인데…',
    successLine: '심해 친구들을 지키면서 해냈구나. 대단해!',
    failLine: '바닥을 긁어내다가 심해 생물들의 집이 다 부서졌어…',
    choices: [
      { label: '심해는 그대로 두자.', type: 'eco' },
      { label: '버려진 금속을 재활용해서 대신할게.', type: 'balanced' },
      { label: '심해 채굴 로봇을 내려보내자!', type: 'bold' },
    ],
  },
  {
    title: '메뚜기 떼',
    earthLine: '하늘이 까매질 만큼 메뚜기 떼가 몰려오고 있어! 밭이 다 먹히겠어!',
    successLine: '메뚜기 떼가 지나갔어. 밭도 무사해!',
    failLine: '약을 너무 뿌려서 다른 곤충들까지 사라졌어…',
    choices: [
      { label: '메뚜기를 먹는 새들을 불러올게.', type: 'eco' },
      { label: '메뚜기 길을 예측하는 시스템을 만들게.', type: 'balanced' },
      { label: '메뚜기만 쫓는 음파 장치를 쏘자!', type: 'bold' },
    ],
  },
  {
    title: '서랍 속 휴대폰',
    earthLine: '안 쓰는 휴대폰이 서랍마다 잠들어 있대. 그 안에 내 금속이 잔뜩 들어 있는데…',
    successLine: '내 금속들이 다시 쓰이게 됐어. 뿌듯해!',
    failLine: '분해하다가 배터리가 터졌어… 매캐한 연기가 나.',
    choices: [
      { label: '고장 날 때까지 오래 쓸게.', type: 'eco' },
      { label: '휴대폰 수거·재활용 센터를 열게.', type: 'balanced' },
      { label: '고쳐 쓰기 쉬운 조립식 휴대폰을 만들자!', type: 'bold' },
    ],
  },
  {
    title: '해파리 바다',
    earthLine: '바다에 해파리가 엄청 많아졌어. 바다가 더워지고 물고기가 줄어서래.',
    successLine: '바다 균형이 돌아오고 있어. 물고기들이 반가워해.',
    failLine: '해파리를 잡다가 그물에 물고기까지 다 걸렸어…',
    choices: [
      { label: '물고기를 덜 잡을게.', type: 'eco' },
      { label: '해파리로 비료를 만드는 연구를 할게.', type: 'balanced' },
      { label: '해파리 수확 로봇 선단을 띄우자!', type: 'bold' },
    ],
  },
  {
    title: '이상한 한파',
    earthLine: '이번 겨울은 갑자기 너무 추워. 내 날씨가 고장 난 것 같아… 으슬으슬.',
    successLine: '다들 따뜻하게 겨울을 났대. 다행이야.',
    failLine: '난방을 너무 돌려서 하늘이 연기로 가득해졌어…',
    choices: [
      { label: '집에 단열재를 꼼꼼히 붙일게.', type: 'eco' },
      { label: '땅속 열로 난방하는 시설을 만들게.', type: 'balanced' },
      { label: '도시 전체를 데우는 열 공급망을 깔자!', type: 'bold' },
    ],
  },
  {
    title: '다가오는 태풍',
    earthLine: '바다 위에서 거대한 태풍이 빙글빙글 돌고 있어. 점점 세지고 있어!',
    successLine: '태풍이 약해진 채 지나갔어. 모두 무사해!',
    failLine: '태풍을 막으려던 장치가 날아가 버렸어… 피해가 커.',
    choices: [
      { label: '미리 대피하고 단단히 대비할게.', type: 'eco' },
      { label: '태풍 길을 정확히 예보하는 위성을 띄울게.', type: 'balanced' },
      { label: '태풍의 힘을 약하게 만드는 장치를 띄우자!', type: 'bold' },
    ],
  },
  {
    title: '교실의 약속',
    earthLine: '학교에서 아이들이 나에 대해 배운대. 아이들이 나를 어떻게 기억해 줄까?',
    successLine: '아이들이 나한테 편지를 썼어! "지구야, 아프지 마"래.',
    failLine: '수업 자료를 다 종이로 뽑아서 숲이 조금 줄었어…',
    choices: [
      { label: '숲으로 나가서 직접 보여 줄게.', type: 'eco' },
      { label: '환경 교육 프로그램을 만들게.', type: 'balanced' },
      { label: '전 세계 학교를 잇는 과학 수업을 열자!', type: 'bold' },
    ],
  },
  {
    title: '연기를 붙잡아라',
    earthLine: '하늘로 올라간 이산화탄소를 다시 붙잡을 수 있대. 그런 게 정말 가능해?',
    successLine: '하늘이 맑아지고 있어! 진짜 붙잡았나 봐!',
    failLine: '포집 장치가 고장 나서 모아 둔 가스가 다 새 버렸어…',
    choices: [
      { label: '나무를 심어서 천천히 붙잡을게.', type: 'eco' },
      { label: '작은 탄소 포집기를 시험해 볼게.', type: 'balanced' },
      { label: '거대 탄소 포집 공장을 세우자!', type: 'bold' },
    ],
  },
  {
    title: '뜨거운 서버',
    earthLine: '인터넷을 돌리는 컴퓨터 건물이 엄청 뜨겁대. 그 열이 다 나한테 오고 있어.',
    successLine: '서버 열로 마을을 데운대! 버리는 게 없네.',
    failLine: '냉각 장치가 고장 나서 강물이 뜨거워졌어… 물고기가 놀랐어.',
    choices: [
      { label: '꼭 필요한 데이터만 남길게.', type: 'eco' },
      { label: '서버 열로 근처 마을을 데울게.', type: 'balanced' },
      { label: '서버를 바닷속에 넣어 식히자!', type: 'bold' },
    ],
  },
  {
    title: '우주 태양광',
    earthLine: '우주에 거대한 태양광 판을 띄우면 밤에도 전기를 만들 수 있대. 꿈 같은 얘기다!',
    successLine: '우주에서 깨끗한 빛이 내려와! 인공태양도 머지않았어.',
    failLine: '발사하다가 로켓이 폭발했어… 하늘에 연기가 가득해.',
    choices: [
      { label: '지금은 지붕 위 태양광부터 할게.', type: 'eco' },
      { label: '작은 시험 위성부터 띄울게.', type: 'balanced' },
      { label: '거대 우주 발전소를 바로 쏘아 올리자!', type: 'bold' },
    ],
  },
  {
    title: '초록 도시',
    earthLine: '회색 빌딩 숲 대신 진짜 숲 같은 도시를 만들 수는 없을까?',
    successLine: '빌딩마다 나무가 자라! 도시가 숨을 쉬는 것 같아.',
    failLine: '공사를 너무 크게 벌여서 먼지만 잔뜩 났어…',
    choices: [
      { label: '빈 땅마다 작은 공원을 만들게.', type: 'eco' },
      { label: '벽에 식물이 자라는 건물을 지을게.', type: 'balanced' },
      { label: '도시 전체를 숲속 도시로 다시 짓자!', type: 'bold' },
    ],
  },
  {
    title: '반딧불이의 밤',
    earthLine: '옛날엔 여름밤마다 반딧불이가 반짝였는데… 요즘은 하나도 안 보여.',
    successLine: '반짝! 반딧불이가 돌아왔어. 너무 예쁘다.',
    failLine: '반딧불이 서식지를 만든다고 개울을 바꿨다가 망가뜨렸어…',
    choices: [
      { label: '개울가를 깨끗하게 지킬게.', type: 'eco' },
      { label: '반딧불이 복원 연구를 시작할게.', type: 'balanced' },
      { label: '반딧불이 생태 공원을 크게 짓자!', type: 'bold' },
    ],
  },
  {
    title: '쓰레기 없는 장보기',
    earthLine: '장 보고 오면 비닐이 한가득이래. 그 비닐들, 결국 다 나한테 오는 거지?',
    successLine: '비닐이 확 줄었어! 장바구니 든 사람들이 멋져 보여.',
    failLine: '포장재를 바꾸다가 오히려 쓰레기가 두 배가 됐어…',
    choices: [
      { label: '장바구니를 들고 다닐게.', type: 'eco' },
      { label: '리필 가게를 동네마다 열게.', type: 'balanced' },
      { label: '모든 포장을 먹을 수 있는 소재로 바꾸자!', type: 'bold' },
    ],
  },
];
