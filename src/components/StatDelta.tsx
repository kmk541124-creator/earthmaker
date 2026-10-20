import React from 'react';
import { Stats } from '../game/types';

interface StatDeltaProps {
  delta: Stats; // 바뀐 양 (0이면 표시 안 함)
}

// 숫자 앞에 +/- 붙이기
function signed(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

function StatDelta({ delta }: StatDeltaProps) {
  const chips: { text: string; good: boolean; kind: string }[] = [];
  if (delta.tech !== 0) chips.push({ text: `기술 ${signed(delta.tech)}`, good: delta.tech > 0, kind: 'tech' });
  if (delta.pollution !== 0) chips.push({ text: `환경오염 ${signed(delta.pollution)}`, good: delta.pollution < 0, kind: 'pollution' });
  if (delta.money !== 0) chips.push({ text: `자금 ${signed(delta.money)}G`, good: delta.money > 0, kind: 'money' });

  if (chips.length === 0) return <div className="delta"><span className="delta__chip">변화 없음</span></div>;

  return (
    <div className="delta">
      {chips.map((chip, i) => (
        <span
          key={chip.kind}
          className={`delta__chip delta__chip--${chip.good ? 'good' : 'bad'}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {chip.text}
        </span>
      ))}
    </div>
  );
}

export default StatDelta;
