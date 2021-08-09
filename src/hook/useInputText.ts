import {  Dispatch, FormEvent, SetStateAction, useCallback, useState,  } from 'react'

const useInputText = (value: string): [string, Dispatch<SetStateAction<string>>, (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void]=> {
  const [state, setState] = useState<string>(value);

  const handleChange = useCallback((e) => {
    setState((e.target as HTMLInputElement).value);
  }, []);

  return [state, setState, handleChange];
}

export default useInputText;