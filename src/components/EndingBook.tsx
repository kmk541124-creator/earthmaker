import React from 'react';
import { ALL_ENDINGS } from '../game/collection';

interface EndingBookProps {
  seen: string[]; // 지금까지 본 엔딩 이름들
}

function EndingBook({ seen }: EndingBookProps) {
  const count = ALL_ENDINGS.filter((title) => seen.includes(title)).length;
  return (
    <div className="ending-book">
      <span className="ending-book__title">📖 엔딩 도감 {count}/{ALL_ENDINGS.length}</span>
      <div className="ending-book__list">
        {ALL_ENDINGS.map((title) => (
          <span key={title} className={`ending-book__item ${seen.includes(title) ? 'is-seen' : ''}`}>
            {seen.includes(title) ? title : '???'}
          </span>
        ))}
      </div>
    </div>
  );
}

export default EndingBook;
