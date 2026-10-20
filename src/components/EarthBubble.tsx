import React from 'react';
import { Mood } from '../game/mood';
import happy from '../assets/earth/happy.png';
import joy from '../assets/earth/joy.png';
import love from '../assets/earth/love.png';
import neutral from '../assets/earth/neutral.png';
import pout from '../assets/earth/pout.png';
import annoyed from '../assets/earth/annoyed.png';
import angry from '../assets/earth/angry.png';
import sad from '../assets/earth/sad.png';
import destroyed from '../assets/earth/destroyed.png';

// 표정 이름 → 이미지 경로
const MOOD_IMAGES: Record<Mood, string> = {
  happy,
  joy,
  love,
  neutral,
  pout,
  annoyed,
  angry,
  sad,
  destroyed,
};

interface EarthBubbleProps {
  mood: Mood;            // 보여 줄 지구 표정
  line: string;          // 말풍선에 띄울 대사
  canTalk?: boolean;     // 지금 말을 걸 수 있는지
  onTalk?: () => void;   // 지구를 눌렀을 때 호출할 함수
}

function EarthBubble({ mood, line, canTalk = false, onTalk }: EarthBubbleProps) {
  return (
    <div className={`earth-stage ${canTalk ? 'earth-stage--talk' : ''}`} onClick={canTalk ? onTalk : undefined}>
      {/* key가 바뀌면 새 요소로 취급되어 표정이 바뀔 때마다 페이드 애니메이션이 다시 실행됨 */}
      <img key={mood} className="earth-stage__img" src={MOOD_IMAGES[mood]} alt={`지구 (${mood})`} />
      {canTalk && <span className="talk-hint">💬 지구를 눌러 말을 걸어 보세요 (하루 1번)</span>}
      <div key={line} className="bubble">
        <span className="bubble__name">지구</span>
        {line}
      </div>
    </div>
  );
}

export default EarthBubble;
