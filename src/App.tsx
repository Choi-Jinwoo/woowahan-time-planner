import React from 'react';

import './assets/styles/reset.css';
import './assets/styles/root.css';
import CategoryDropDown from './components/CategoryDropDown';

const App = (): JSX.Element => {
  return (
    <div>
      <CategoryDropDown />
    </div>
  )
}

export default App;
