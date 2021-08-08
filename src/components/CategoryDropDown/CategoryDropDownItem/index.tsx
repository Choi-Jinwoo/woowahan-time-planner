import React, { useCallback, useEffect } from 'react';
import { Category } from '../../../types/category';

type PropTypes = {
  key: string;
  category: Category;
  onClick: (key: string) => void;
}

const CategoryDropDownItem = ({
  key,
  category,
  onClick,
}: PropTypes) => {
  const handleClick = useCallback(() => {
    onClick(key);
  }, [key, onClick]);

  const { color, label } = category;
  return (
    <li className="category-item" onClick={handleClick}>
      <div className="category-item__color" style={{ backgroundColor: color }} />
      <span className="category-item__label">{label}</span>
    </li>
  )
}