import React, { FormEventHandler } from 'react';

import './index.css';

type PropTypes = {
  title: string;
  onChange: FormEventHandler<HTMLInputElement>
}

const PlanTitle = ({
  title,
  onChange,
}: PropTypes): JSX.Element => {
  return (
    <div className="plan-title">
      <h1 className="plan-title__title plan-title__text"
        suppressContentEditableWarning={true}
        contentEditable={true}
        onChange={onChange}>{title}</h1>
      <h1 className="plan-title__text">.md</h1>
    </div>
  )
}

export default PlanTitle;