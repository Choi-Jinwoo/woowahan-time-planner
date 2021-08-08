import React, { useCallback } from 'react';
import { Category } from '../../../types/category';

import './index.css';

type PropTypes = {
  cid: string;
  category: Category;
  onClick: (key: string) => void;
}

const CategoryDropDownItem = ({
  cid,
  category,
  onClick,
}: PropTypes): JSX.Element => {
  const handleClick = useCallback(() => {
    onClick(cid);
  }, [cid, onClick]);

  const { color, label } = category;

  return (
    <li className="category-item" onClick={handleClick}>
      <div className="category__color category-item__color" style={{ backgroundColor: color }} />
      <span className="category__label">{label}</span>
    </li>
  )
}

export default CategoryDropDownItem;
