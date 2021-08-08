import { DailyPlan, Plan } from '../types/plan';

export const convert2MarkDown = (dailyPlan: DailyPlan): string => {
  const planGroupedByTimeSection: [Plan, Plan][] = dailyPlan.todayPlan
    .map((todayPlan, i) => [todayPlan, dailyPlan.tomorrowPlan[i]]);

  return `
    <table>
      <tr>
        <th></th>
        <th colspan="2">오늘</th>
        <th colspan="2">내일</th>
      </tr>
      <tr>
        <td>시간</td>
        <td>카테고리</td>
        <td>한 일</td>
        <td>카테고리</td>
        <td>할 일</td>
      </tr>
      ${planGroupedByTimeSection.map(([todayPlan, tomorrowPlan]) => {
        return `<tr>
            <td>${todayPlan.timeSection}</td>
            <td>${todayPlan.category?.label ?? ''}</td>
            <td>${todayPlan.content ?? ''}</td>
            <td>${tomorrowPlan.category?.label ?? ''}</td>
            <td>${tomorrowPlan.content ?? ''}</td>
          </tr>`
      }).join('')}
    </table>
  `;
}