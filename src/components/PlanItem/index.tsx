import React, { ChangeEvent, useCallback } from 'react';
import { Category } from '../../types/category';
import CategoryDropDown from '../CategoryDropDown';

import './index.css';

type PropTypes = {
  category: Category | undefined;
  onCategoryChange: (category: Category) => void;
  content: string | undefined;
  onContentChange: (value: string) => void;
  tabIndex: number;
}

const PlanItem = ({
  category,
  onCategoryChange,
  content,
  onContentChange,
  tabIndex,
}: PropTypes): JSX.Element => {
  const handleContentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onContentChange(e.target.value);
  }, [onContentChange])

  return (
    <div className="plan-item">
      <CategoryDropDown category={category} onCategoryChange={onCategoryChange}/>
      <input tabIndex={tabIndex} className="plan-item__content" value={content} onChange={handleContentChange} />
    </div>
  )
}

export default PlanItem;
