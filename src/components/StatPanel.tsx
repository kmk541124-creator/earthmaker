import React from 'react';
import { Buffs, Stats } from '../game/types';
import { MAX_POLLUTION, SUN_TECH } from '../game/logic';

interface StatPanelProps {
  stats: Stats; // 표시할 스탯
  buffs: Buffs; // 적용 중인 아이템 효과
}

function StatPanel({ stats, buffs }: StatPanelProps) {
  return (
    <div className="panel stat-panel">
      <h2 className="panel__title">인류 기술</h2>
      <div className="stat">
        <span className="stat__label">기술</span>
        <div className="stat__bar">
          <div
            className="stat__fill stat__fill--tech"
            style={{ width: `${Math.min(100, (stats.tech / SUN_TECH) * 100)}%` }}
          />
        </div>
        <span className="stat__value">{stats.tech}</span>
      </div>
      <p className="stat__goal">
        {stats.tech >= SUN_TECH ? '☀ 인공태양 개발 가능!' : `☀ 인공태양까지 ${SUN_TECH - stats.tech}`}
      </p>

      <h2 className="panel__title">지구 상태</h2>
      <div className="stat">
        <span className="stat__label">환경오염</span>
        <div className="stat__bar">
          <div
            className="stat__fill stat__fill--pollution"
            style={{ width: `${(stats.pollution / MAX_POLLUTION) * 100}%` }}
          />
        </div>
        <span className="stat__value">{stats.pollution}</span>
      </div>

      <h2 className="panel__title">소지품</h2>
      <p className="stat__money">💰 자금 {stats.money}G</p>
      {buffs.halfFail && <p className="buff">📘 안전 매뉴얼 적용 중</p>}
      {buffs.shield && <p className="buff">🧪 정화 필터 적용 중</p>}
    </div>
  );
}

export default StatPanel;
