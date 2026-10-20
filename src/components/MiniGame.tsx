import React, { useEffect, useRef, useState } from 'react';
import { MINIGAME_CLEAN, MINIGAME_MONEY, MINIGAME_PENALTY } from '../game/logic';

const TRASH = ['🥤', '🛍️', '🧴', '🛢️', '🥫', '📦', '🧃']; // 주워야 하는 쓰레기
const LIFE = ['🐢', '🐦', '🌸', '🐟', '🦋'];               // 누르면 안 되는 생물
const DURATION = 10;      // 게임 시간(초)
const SPAWN_MS = 520;     // 새 물건이 나타나는 간격(ms)
const ITEM_LIFE_MS = 1500; // 물건이 화면에 머무는 시간(ms)
const TRASH_RATE = 0.75;  // 쓰레기가 나올 확률 (나머지는 생물)

// 화면에 떠 있는 물건 하나
interface Item {
  id: number;
  emoji: string;
  good: boolean; // true면 쓰레기(주워야 함), false면 생물(누르면 감점)
  x: number;     // 가로 위치(%)
  y: number;     // 세로 위치(%)
}

interface MiniGameProps {
  onFinish: (caught: number, mistakes: number) => void; // 끝났을 때 결과 전달
}

function MiniGame({ onFinish }: MiniGameProps) {
  const [stage, setStage] = useState<'intro' | 'play' | 'done'>('intro'); // 진행 단계
  const [items, setItems] = useState<Item[]>([]);     // 지금 떠 있는 물건들
  const [timeLeft, setTimeLeft] = useState(DURATION); // 남은 시간
  const [caught, setCaught] = useState(0);            // 주운 쓰레기 수
  const [mistakes, setMistakes] = useState(0);        // 잘못 누른 생물 수
  const nextId = useRef(0);                           // 물건마다 고유 번호

  // 게임 중일 때 물건 생성 + 1초 타이머
  useEffect(() => {
    if (stage !== 'play') return;
    const spawn = setInterval(() => {
      const id = nextId.current++;
      const good = Math.random() < TRASH_RATE;
      const pool = good ? TRASH : LIFE;
      const item: Item = {
        id,
        emoji: pool[Math.floor(Math.random() * pool.length)],
        good,
        x: 6 + Math.random() * 84,
        y: 12 + Math.random() * 72,
      };
      setItems((prev) => [...prev, item]);
      setTimeout(() => setItems((prev) => prev.filter((it) => it.id !== id)), ITEM_LIFE_MS);
    }, SPAWN_MS);
    const tick = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => {
      clearInterval(spawn);
      clearInterval(tick);
    };
  }, [stage]);

  // 시간이 다 되면 종료
  useEffect(() => {
    if (stage === 'play' && timeLeft <= 0) {
      setStage('done');
      setItems([]);
    }
  }, [stage, timeLeft]);

  // 물건을 눌렀을 때
  const handleHit = (item: Item) => {
    setItems((prev) => prev.filter((it) => it.id !== item.id));
    if (item.good) setCaught((c) => c + 1);
    else setMistakes((m) => m + 1);
  };

  return (
    <div className="minigame">
      {stage === 'intro' && (
        <div className="minigame__card">
          <h3>🧹 쓰레기 줍기 대작전!</h3>
          <p>{DURATION}초 동안 나타나는 쓰레기를 눌러서 주워 주세요.</p>
          <p>쓰레기 1개당 환경오염 -{MINIGAME_CLEAN}, 자금 +{MINIGAME_MONEY}G</p>
          <p className="minigame__warn">🐢🐦🌸 생물을 누르면 환경오염 +{MINIGAME_PENALTY}!</p>
          <button className="next" onClick={() => setStage('play')}>시작!</button>
        </div>
      )}

      {stage === 'play' && (
        <>
          <div className="minigame__hud">
            ⏱ {timeLeft}초 · 🗑 {caught}개 · ❌ {mistakes}
          </div>
          {items.map((item) => (
            <button
              key={item.id}
              className="minigame__item"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => handleHit(item)}
            >
              {item.emoji}
            </button>
          ))}
        </>
      )}

      {stage === 'done' && (
        <div className="minigame__card">
          <h3>끝!</h3>
          <p>쓰레기 {caught}개를 주웠고, 실수는 {mistakes}번이었습니다.</p>
          <button className="next" onClick={() => onFinish(caught, mistakes)}>결과 받기</button>
        </div>
      )}
    </div>
  );
}

export default MiniGame;
