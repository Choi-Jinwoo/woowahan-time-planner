import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Category } from '../../types/category';
import { Plan } from '../../types/plan';
import PlanItem from '../PlanItem';

import './index.css';

type PropTypes = {
  timeSection: string;
  todayPlans: { [key: string]: Plan };
  setTodayPlans: Dispatch<SetStateAction<{ [key: string]: Plan }>>;
  tomorrowPlans: { [key: string]: Plan };
  setTomorrowPlans: Dispatch<SetStateAction<{ [key: string]: Plan }>>;
}

const TimelyPlan = ({
  timeSection,
  todayPlans,
  setTodayPlans,
  tomorrowPlans,
  setTomorrowPlans
}: PropTypes): JSX.Element => {
  const todayPlan = useMemo(() => todayPlans[timeSection], [todayPlans, timeSection]);
  const todayCategory: Category | undefined = useMemo(() => todayPlan?.category, [todayPlan]);
  const todayContent: string | undefined = useMemo(() => todayPlan?.content, [todayPlan]);
  const tomorrowPlan = useMemo(() => tomorrowPlans[timeSection], [tomorrowPlans, timeSection]);
  const tomorrowCategory: Category | undefined = useMemo(() => tomorrowPlan?.category, [tomorrowPlan]);
  const tomorrowContent: string | undefined = useMemo(() => tomorrowPlan?.content, [tomorrowPlan]);

  const handleTomorrowCategoryChange = useCallback((category: Category) => {
    setTomorrowPlans({
      ...tomorrowPlans,
      [timeSection]: {
        ...tomorrowPlan,
        category,
      }
    });
  }, [setTomorrowPlans, tomorrowPlans, timeSection, tomorrowPlan]);

  const handleTomorrowContentChange = useCallback((content: string) => {
    setTomorrowPlans({
      ...tomorrowPlans,
      [timeSection]: {
        ...tomorrowPlan,
        content,
      }
    });
  }, [setTomorrowPlans, tomorrowPlans, timeSection, tomorrowPlan]);

  const handleTodayCategoryChange = useCallback((category: Category) => {
    setTodayPlans({
      ...todayPlans,
      [timeSection]: {
        ...todayPlan,
        category,
      }
    });
  }, [todayPlans, todayPlan, setTodayPlans, timeSection]);

  const handleTodayContentChange = useCallback((content: string) => {
    setTodayPlans({
      ...todayPlans,
      [timeSection]: {
        ...todayPlan,
        content,
      }
    });
  }, [todayPlans, todayPlan, setTodayPlans, timeSection]);

  return (
    <div className="timely-plan">
      <div className="timely-plan__time-section">{timeSection}</div>
      <PlanItem category={todayCategory}
        onCategoryChange={handleTodayCategoryChange}
        content={todayContent}
        onContentChange={handleTodayContentChange}/>

      <PlanItem category={tomorrowCategory}
        onCategoryChange={handleTomorrowCategoryChange}
        content={tomorrowContent}
        onContentChange={handleTomorrowContentChange}/>
    </div>
  )
};

export default TimelyPlan;
