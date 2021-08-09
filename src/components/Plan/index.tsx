import React, { useCallback, useMemo, useState } from 'react';
import useInputText from '../../hook/useInputText';
import { convert2MarkDown } from '../../lib/converter';
import { DailyPlan, Plan } from '../../types/plan';
import { date2MMdd, toHHmm } from '../../utils/datetime';
import PlanTitle from '../PlanTitle';
import TimelyPlan from '../TimelyPlan';

import './index.css';

const START_HOUR = 9;
const END_HOUR = 23;

const getTimeSections = (): string[] => {
  return Array.from(new Array(END_HOUR - START_HOUR), (_, i) => {
    const hour = i + START_HOUR;
    return `${toHHmm(hour, 0)} ~ ${toHHmm(hour + 1, 0)}`;
  });
}

const convertPlanObject2Array = (planObject: { [key: string]: Plan }): Plan[] => {
  return Object.entries(planObject).map(([key, value]) => ({
      ...value,
      timeSection: key,
    }));
}

const Plan = (): JSX.Element => {
  const currentMonthDate = useMemo(() => date2MMdd(new Date()), []);
  const timeSections = useMemo(() => getTimeSections(), []);
  const timeSectionsKeyOfObject: { [key: string]: Plan } = useMemo(() => timeSections.reduce((object, curr) => {
    return {
      ...object,
      [curr]: { timeSection: '' }
    }
  }, {}), [timeSections]);
  const [title, , onTitleChange] = useInputText(currentMonthDate);
  const [todayPlans, setTodayPlans] = useState<{ [key: string]: Plan }>(timeSectionsKeyOfObject);
  const [tomorrowPlans, setTomorrowPlans] = useState<{ [key: string]: Plan }>(timeSectionsKeyOfObject);
  const [feeling, , onFeelingChange] = useInputText('');
  

  const handleConvert2MarkDown = useCallback(() => {
    const todayPlan = convertPlanObject2Array(todayPlans)
    const tomorrowPlan = convertPlanObject2Array(tomorrowPlans);

    const dailyPlan: DailyPlan =  {
      title,
      todayPlan,
      tomorrowPlan,
      feeling,
    }

    return convert2MarkDown(dailyPlan);
  }, [todayPlans, tomorrowPlans, title, feeling]);

  const handleCopyClick = useCallback(() => {
    const markDown = handleConvert2MarkDown();
    navigator.clipboard.writeText(markDown);
  }, [handleConvert2MarkDown]);

  const timelyPlans = timeSections.map((timeSection, index) => {
    return <TimelyPlan
      todayTabIndex={index + 1}
      tomorrowTabIndex={index + timeSections.length + 1}
      key={timeSection}
      timeSection={timeSection}
      todayPlans={todayPlans}
      setTodayPlans={setTodayPlans}
      tomorrowPlans={tomorrowPlans}
      setTomorrowPlans={setTomorrowPlans} />
  })

  return (
    <div className="plan">
      <div>
        <PlanTitle title={title} onChange={onTitleChange} />
        {timelyPlans}
      </div>
      <div className="bottom-wrapper">
        <h2>느낀점</h2>
        <div className="bottom">
          <textarea value={feeling} onChange={onFeelingChange}/>
          <div className="button-wrapper">
            <button onClick={handleCopyClick}>복사</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plan;
