import React, { useCallback, useEffect,  useRef, useState } from 'react';
import categories from '../../assets/data/categories';
import { Category } from '../../types/category';
import CategoryDropDownItem from './CategoryDropDownItem';

import './index.css';

const CategoryDropDown = (): JSX.Element => {
  const [selected, setSelected] = useState<Category>();
  const [isListShow, setListShow] = useState<boolean>(true);
  const categoryElement = useRef<HTMLDivElement>(null);

  const handleItemClick = useCallback((key: string) => {
    setSelected(categories[key]);
    setListShow(false);
  }, []);

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
        <div className="category__color category-selected__color" style={{ backgroundColor: selected?.color }}></div>
        <span className="category__label">{selected?.label ?? '선택해주세요'}</span>
      </div>
      <ul className="category-list" hidden={!isListShow}>
        {categoryDropDownItems}
      </ul>
    </div>
  )
}

export default CategoryDropDown;
