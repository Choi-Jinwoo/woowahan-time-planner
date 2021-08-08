import React, { useCallback, useEffect,  useRef, useState } from 'react';
import categories from '../../assets/data/categories';
import { Category } from '../../types/category';
import CategoryDropDownItem from './CategoryDropDownItem';
import arrowDown from '../../assets/svg/arrow-down.svg';

import './index.css';

type PropTypes = {
  category: Category | undefined;
  onCategoryChange: (item: Category) => void;
}

const CategoryDropDown = ({
  category,
  onCategoryChange,
}: PropTypes): JSX.Element => {
  const [isListShow, setListShow] = useState<boolean>(false);
  const categoryElement = useRef<HTMLDivElement>(null);

  const handleItemClick = useCallback((key: string) => {
    onCategoryChange(categories[key]);
    setListShow(false);
  }, [onCategoryChange]);

  const handleSelectedClick = useCallback(() => {
    setListShow(prev => !prev);
  }, []);

  const handleCategoryBlur = useCallback((e: Event) => {
    const { target } = e;
    if (
      categoryElement.current === null ||
      categoryElement.current === target ||
      categoryElement.current.contains(target as HTMLElement)) {
      return;
    }

    setListShow(false);
  }, [categoryElement]);

  useEffect(() => {
    window.addEventListener('click', handleCategoryBlur);

    return () => {
      window.removeEventListener('click', handleCategoryBlur);
    }
  }, [handleCategoryBlur]);

  const categoryDropDownItems = Object.keys(categories).map((key) => {
    return <CategoryDropDownItem cid={key} key={key} category={categories[key]} onClick={handleItemClick}/>
  });

  return (
    <div className="category" ref={categoryElement}>
      <div className="category-selected" onClick={handleSelectedClick}>
        <div className="category-selected__category">
          <div className="category__color category-selected__color" style={{ backgroundColor: category?.color }}></div>
          <span className="category__label">{category?.label ?? '선택해주세요'}</span>
        </div>
        <img src={arrowDown} alt="" />
      </div>
      <ul className="category-list" hidden={!isListShow}>
        {categoryDropDownItems}
      </ul>
    </div>
  )
}

export default CategoryDropDown;
