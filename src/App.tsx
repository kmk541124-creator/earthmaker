import React, { useState } from 'react';
import './App.css';
import EarthBubble from './components/EarthBubble';
import StatPanel from './components/StatPanel';
import ChoiceButtons from './components/ChoiceButtons';
import EventButtons from './components/EventButtons';
import Shop from './components/Shop';
import StatDelta from './components/StatDelta';
import MiniGame from './components/MiniGame';
import EndingBook from './components/EndingBook';
import { FIRST_SCENE } from './game/scenes';
import { EVENTS } from './game/events';
import { TALK_GIFTS, TALK_GIFT_CHANCE, TALK_LINES } from './game/talk';
import { addSeenEnding, loadSeenEndings } from './game/collection';
import { Mood, eventShift, moodByPollution } from './game/mood';
import { Buffs, Choice, Ending, EventChoice, GameEvent, Scene, ShopItem, Stats } from './game/types';
import {
  EVENT_CHANCE,
  INITIAL_BUFFS,
  INITIAL_STATS,
  MAX_POLLUTION,
  SUN_TECH,
  TOTAL_TURNS,
  buildScenario,
  clampPollution,
  diffStats,
  getEnding,
  isMiniGameDay,
  isSunDeveloped,
  pickRandom,
  resolveChoice,
  resolveEventChoice,
  resolveMiniGame,
  shuffle,
} from './game/logic';

// 게임 진행 단계
// 타이틀 → 질문(↔ 상점) → 결과 → (미니게임) → (돌발상황) → 다음 날 … → 엔딩
type Phase =
  | 'title'
  | 'ask'
  | 'shop'
  | 'result'
  | 'minigame'
  | 'minigameResult'
  | 'event'
  | 'eventResult'
  | 'end';

const NO_DELTA: Stats = { tech: 0, pollution: 0, money: 0 }; // 변화 없음

function App() {
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);           // 현재 스탯
  const [buffs, setBuffs] = useState<Buffs>(INITIAL_BUFFS);           // 적용 중인 아이템 효과
  const [scenario, setScenario] = useState<Scene[]>([FIRST_SCENE]);   // 이번 판의 장면 순서
  const [turn, setTurn] = useState(0);                                // 현재 날짜 (0부터)
  const [phase, setPhase] = useState<Phase>('title');                 // 현재 진행 단계
  const [failed, setFailed] = useState(false);                        // 직전 선택 실패 여부
  const [shielded, setShielded] = useState(false);                    // 직전 실패를 정화 필터로 막았는지
  const [delta, setDelta] = useState<Stats>(NO_DELTA);                // 직전 결과의 스탯 변화량
  const [shopLine, setShopLine] = useState('');                       // 상점에서 지구가 할 말
  const [eventDeck, setEventDeck] = useState<GameEvent[]>([]);        // 아직 안 나온 돌발상황들
  const [event, setEvent] = useState<GameEvent | null>(null);         // 지금 터진 돌발상황
  const [eventLine, setEventLine] = useState('');                     // 돌발상황 결과 대사
  const [miniLine, setMiniLine] = useState('');                       // 미니게임 결과 대사
  const [talked, setTalked] = useState(false);                        // 오늘 지구에게 말을 걸었는지
  const [talkLine, setTalkLine] = useState('');                       // 말 걸었을 때 지구 대답
  const [talkDelta, setTalkDelta] = useState<Stats | null>(null);     // 말 걸기 선물로 생긴 변화
  const [ending, setEnding] = useState<Ending | null>(null);          // 확정된 엔딩
  const [mood, setMood] = useState<Mood>('neutral');                  // 지구 표정 (다음 선택 전까지 유지)
  const [seenEndings, setSeenEndings] = useState<string[]>(loadSeenEndings); // 엔딩 도감

  const scene = scenario[turn];

  // 엔딩으로 이동
  const goEnding = (current: Stats) => {
    const sun = isSunDeveloped(current);
    const result = getEnding(current, sun);
    setEnding(result);
    setMood(result.mood);
    setSeenEndings(addSeenEnding(result.title));
    // 인공태양 개발 성공 시 자연 회복 (오염 0)
    if (sun) setStats({ ...current, pollution: 0 });
    setPhase('end');
  };

  // 다음 날로 이동
  const goNextDay = () => {
    setTurn(turn + 1);
    setTalked(false);
    setTalkLine('');
    setTalkDelta(null);
    setPhase('ask');
  };

  // 하루 일과가 끝난 뒤: 돌발상황이 터지거나 다음 날로
  const afterDay = () => {
    if (eventDeck.length > 0 && Math.random() < EVENT_CHANCE) {
      const [picked, ...rest] = eventDeck;
      setEvent(picked);
      setEventDeck(rest);
      setMood(moodByPollution(stats.pollution, eventShift(picked.mood)));
      setPhase('event');
      return;
    }
    goNextDay();
  };

  // 선택지를 눌렀을 때
  const handleSelect = (choice: Choice) => {
    const result = resolveChoice(stats, choice, buffs);
    setDelta(diffStats(stats, result.next));
    setStats(result.next);
    setFailed(result.failed);
    setShielded(result.shielded);
    setBuffs(INITIAL_BUFFS); // 아이템 효과는 한 번 쓰면 사라짐
    // 선택 결과로 표정 결정: 성공 -1단계(기분 좋게), 실패 +1단계, 필터로 막으면 그대로
    setMood(moodByPollution(result.next.pollution, result.failed ? (result.shielded ? 0 : 1) : -1));
    setPhase('result');
  };

  // 지구에게 말 걸기 (하루 1번)
  const handleTalk = () => {
    if (talked) return;
    setTalked(true);
    if (Math.random() < TALK_GIFT_CHANCE) {
      const gift = pickRandom(TALK_GIFTS);
      const next = {
        ...stats,
        money: stats.money + (gift.money ?? 0),
        pollution: clampPollution(stats.pollution + (gift.pollution ?? 0)),
      };
      setTalkDelta(diffStats(stats, next));
      setStats(next);
      setTalkLine(gift.line);
      return;
    }
    setTalkLine(pickRandom(TALK_LINES[mood]));
  };

  // 상점 열기
  const handleOpenShop = () => {
    setShopLine('뭐 사려고? 나한테 좋은 걸로 골라 줘!');
    setPhase('shop');
  };

  // 아이템 구매
  const handleBuy = (item: ShopItem) => {
    if (stats.money < item.price) return;
    const paid = { ...stats, money: stats.money - item.price };
    const applied = item.apply(paid, buffs);
    setStats(applied.stats);
    setBuffs(applied.buffs);
    setShopLine(`${item.name}! 고마워, 잘 쓸게.`);
  };

  // 하루 결과를 보고 '다음'을 눌렀을 때
  const handleNext = () => {
    const isLast = turn >= scenario.length - 1;
    if (stats.pollution >= MAX_POLLUTION || isLast) {
      goEnding(stats);
      return;
    }
    if (isMiniGameDay(turn)) {
      setPhase('minigame');
      return;
    }
    afterDay();
  };

  // 미니게임이 끝났을 때
  const handleMiniFinish = (caught: number, mistakes: number) => {
    const next = resolveMiniGame(stats, caught, mistakes);
    setDelta(diffStats(stats, next));
    setStats(next);
    let shift = 0;
    let lineText = '고마워! 조금 깨끗해졌어.';
    if (caught >= 10 && mistakes === 0) {
      shift = -1;
      lineText = '우와, 완벽해! 이렇게 깨끗해진 건 오랜만이야!';
    } else if (mistakes > caught / 2) {
      shift = 1;
      lineText = '아야! 쓰레기 말고 내 친구들을 누르면 어떡해!';
    }
    setMood(moodByPollution(next.pollution, shift));
    setMiniLine(lineText);
    setPhase('minigameResult');
  };

  // 미니게임 결과를 보고 '다음'을 눌렀을 때
  const handleMiniNext = () => {
    if (stats.pollution >= MAX_POLLUTION) {
      goEnding(stats);
      return;
    }
    afterDay();
  };

  // 돌발상황 선택지를 눌렀을 때
  const handleEventSelect = (choice: EventChoice) => {
    if (!event) return;
    const result = resolveEventChoice(stats, choice);
    setDelta(diffStats(stats, result.next));
    setStats(result.next);
    setFailed(result.failed);
    setEventLine(result.failed ? event.failLine : choice.resultLine);
    // 오염이 늘었거나 실패하면 기분 나쁘게, 줄었거나 기술이 오르면 기분 좋게
    const change = result.next.pollution - stats.pollution;
    let shift = 0;
    if (result.failed || change > 0) shift = 1;
    else if (change < 0 || result.next.tech > stats.tech) shift = -1;
    setMood(moodByPollution(result.next.pollution, shift));
    setPhase('eventResult');
  };

  // 돌발상황 결과를 보고 '다음'을 눌렀을 때
  const handleEventNext = () => {
    if (stats.pollution >= MAX_POLLUTION) {
      goEnding(stats);
      return;
    }
    goNextDay();
  };

  // 처음부터 다시
  const handleRestart = () => {
    setStats(INITIAL_STATS);
    setBuffs(INITIAL_BUFFS);
    setScenario(buildScenario());
    setEventDeck(shuffle(EVENTS));
    setTurn(0);
    setFailed(false);
    setShielded(false);
    setDelta(NO_DELTA);
    setEvent(null);
    setEnding(null);
    setTalked(false);
    setTalkLine('');
    setTalkDelta(null);
    setMood(moodByPollution(INITIAL_STATS.pollution));
    setPhase('ask');
  };

  // 말풍선에 띄울 대사 결정
  let line = scene.earthLine;
  if (phase === 'title') line = '안녕! 나랑 같이 미래를 만들어 볼래?';
  if (phase === 'ask' && talkLine) line = talkLine;
  if (phase === 'shop') line = shopLine;
  if (phase === 'result') line = failed ? scene.failLine : scene.successLine;
  if (phase === 'minigame') line = '내 위에 떨어진 쓰레기 좀 주워 줄래? 친구들은 누르면 안 돼!';
  if (phase === 'minigameResult') line = miniLine;
  if (phase === 'event' && event) line = event.earthLine;
  if (phase === 'eventResult') line = eventLine;
  if (phase === 'end' && ending) line = ending.line;

  // 결과 안내 문구
  let resultText = '성공! 일이 잘 풀렸습니다.';
  if (failed) resultText = shielded ? '실패…! 하지만 정화 필터가 오염을 막았습니다.' : '실패…! 환경오염이 늘어났습니다.';

  // 상단 표시 문구
  const isEventPhase = phase === 'event' || phase === 'eventResult';
  let headerText = `${turn + 1}일차 / ${TOTAL_TURNS}일 · ${scene.title}`;
  if (phase === 'title') headerText = '지구 육성 시뮬레이션';
  if (phase === 'minigame' || phase === 'minigameResult') headerText = `${turn + 1}일차 · 🧹 쓰레기 줍기`;
  if (isEventPhase && event) headerText = `⚠ 돌발상황 · ${event.title}`;
  if (phase === 'end') headerText = 'ENDING';

  return (
    <div className={`screen screen--${mood}`}>
      <div className="game">
        <header className="game__header">
          <h1 className="game__title">EARTH MAKER</h1>
          <span className={`game__era ${isEventPhase ? 'game__era--event' : ''}`}>{headerText}</span>
        </header>

        <main className="game__main">
          <section className="stage">
            <EarthBubble mood={mood} line={line} canTalk={phase === 'ask' && !talked} onTalk={handleTalk} />
            {phase === 'minigame' && <MiniGame onFinish={handleMiniFinish} />}
          </section>
          <StatPanel stats={stats} buffs={buffs} />
        </main>

        <footer className="panel dialog">
          {phase === 'title' && (
            <>
              <p className="dialog__text">
                {TOTAL_TURNS}일 동안 인류의 기술을 키우면서 지구를 지켜 주세요. 마지막 날 기술이 {SUN_TECH}에 닿으면 인공태양으로
                자연을 되살릴 수 있습니다. 욕심을 내면 실패할 수도 있고, 실패하면 환경오염이 늘어납니다. 돌발상황과 미니게임도 있어요!
              </p>
              <EndingBook seen={seenEndings} />
              <button className="next" onClick={handleRestart}>게임 시작</button>
            </>
          )}

          {phase === 'ask' && (
            <>
              {talkDelta && <StatDelta delta={talkDelta} />}
              <ChoiceButtons choices={scene.choices} onSelect={handleSelect} />
              <button className="next next--shop" onClick={handleOpenShop}>🛒 상점</button>
            </>
          )}

          {phase === 'shop' && (
            <Shop money={stats.money} buffs={buffs} onBuy={handleBuy} onClose={() => setPhase('ask')} />
          )}

          {phase === 'result' && (
            <>
              <p className={`dialog__text ${failed ? 'dialog__text--fail' : 'dialog__text--success'}`}>{resultText}</p>
              <StatDelta delta={delta} />
              <button className="next" onClick={handleNext}>다음 ▶</button>
            </>
          )}

          {phase === 'minigame' && <p className="dialog__text">화면에 나타나는 쓰레기를 눌러 주세요!</p>}

          {phase === 'minigameResult' && (
            <>
              <p className="dialog__text dialog__text--success">쓰레기 줍기 결과</p>
              <StatDelta delta={delta} />
              <button className="next" onClick={handleMiniNext}>다음 ▶</button>
            </>
          )}

          {phase === 'event' && event && (
            <EventButtons choices={event.choices} money={stats.money} onSelect={handleEventSelect} />
          )}

          {phase === 'eventResult' && (
            <>
              <p className={`dialog__text ${failed ? 'dialog__text--fail' : ''}`}>
                {failed ? '실패…! 환경오염이 늘어났습니다.' : '돌발상황이 지나갔습니다.'}
              </p>
              <StatDelta delta={delta} />
              <button className="next" onClick={handleEventNext}>다음 날 ▶</button>
            </>
          )}

          {phase === 'end' && ending && (
            <>
              <p className="dialog__text dialog__text--ending">엔딩: 「{ending.title}」</p>
              <EndingBook seen={seenEndings} />
              <button className="next" onClick={handleRestart}>다시 하기</button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

export default App;
