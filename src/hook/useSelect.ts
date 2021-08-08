import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const useSelect = <T>(): [T | undefined, Dispatch<SetStateAction<T | undefined>>, (item: T) => void] => {
  const [selected, setSelected] = useState<T>();

  const handleSelect = useCallback((selectedItem: T) => {
    setSelected(selectedItem);
  }, [])

  return [selected, setSelected, handleSelect];
}

export default useSelect;