import React from 'react';
import { EventChoice } from '../game/types';

interface EventButtonsProps {
  choices: EventChoice[];                  // 돌발상황 선택지
  money: number;                           // 현재 자금 (비용을 낼 수 있는지 판단)
  onSelect: (choice: EventChoice) => void; // 선택했을 때 호출할 함수
}

function EventButtons({ choices, money, onSelect }: EventButtonsProps) {
  return (
    <div className="choices">
      {choices.map((choice) => {
        const cost = choice.money && choice.money < 0 ? -choice.money : 0; // 비용 (없으면 0)
        return (
          <button
            className="choice choice--event"
            key={choice.label}
            disabled={money < cost}
            onClick={() => onSelect(choice)}
          >
            ▶ {choice.label}
            {cost > 0 && <span className="choice__cost">{cost}G</span>}
          </button>
        );
      })}
    </div>
  );
}

export default EventButtons;
