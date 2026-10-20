import React from 'react';
import { Choice } from '../game/types';

interface ChoiceButtonsProps {
  choices: Choice[];                  // 선택지 목록
  onSelect: (choice: Choice) => void; // 선택했을 때 호출할 함수
}

function ChoiceButtons({ choices, onSelect }: ChoiceButtonsProps) {
  return (
    <div className="choices">
      {choices.map((choice) => (
        <button className="choice" key={choice.label} onClick={() => onSelect(choice)}>
          ▶ {choice.label}
        </button>
      ))}
    </div>
  );
}

export default ChoiceButtons;
