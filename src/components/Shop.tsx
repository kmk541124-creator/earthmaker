import React from 'react';
import { Buffs, ShopItem } from '../game/types';
import { SHOP_ITEMS } from '../game/shop';

interface ShopProps {
  money: number;                    // 현재 자금 (살 수 있는지 판단)
  buffs: Buffs;                     // 이미 적용 중인 효과 (중복 구매 방지)
  onBuy: (item: ShopItem) => void;  // 아이템을 샀을 때 호출할 함수
  onClose: () => void;              // 상점 닫기
}

// 이미 효과가 적용 중이라 다시 살 필요가 없는 아이템인지
function isActive(item: ShopItem, buffs: Buffs): boolean {
  return (item.id === 'manual' && buffs.halfFail) || (item.id === 'filter' && buffs.shield);
}

function Shop({ money, buffs, onBuy, onClose }: ShopProps) {
  return (
    <div className="shop">
      <div className="shop__header">
        <span className="shop__title">🛒 상점</span>
        <span className="shop__money">보유 자금 {money}G</span>
      </div>
      <div className="shop__items">
        {SHOP_ITEMS.map((item) => (
          <button
            className="shop__item"
            key={item.id}
            disabled={money < item.price || isActive(item, buffs)}
            onClick={() => onBuy(item)}
          >
            <span className="shop__name">{item.name}</span>
            <span className="shop__desc">{item.desc}</span>
            <span className="shop__price">{isActive(item, buffs) ? '적용 중' : `${item.price}G`}</span>
          </button>
        ))}
      </div>
      <button className="next" onClick={onClose}>돌아가기</button>
    </div>
  );
}

export default Shop;
