import { Category } from '../types/category';
import { DailyPlan, Plan } from '../types/plan';

type withCount<T> = {
  count: number;
} & T;

const calcCategoryStatus = (categories: { [key: string]: withCount<Category> }, currPlan: Plan) => {
  if (currPlan.category === undefined) {
    return categories;
  }

  const { category } = currPlan;
  if (category.key in categories) {
    categories[category.key].count += 1;
  } else {
    categories[category.key] = {
      ...category,
      count: 1,
    }
  }

  return categories;
}

export const convert2MarkDown = (dailyPlan: DailyPlan): string => {
  const { todayPlan, tomorrowPlan, title, feeling} = dailyPlan;
  const planGroupedByTimeSection: [Plan, Plan][] = todayPlan
    .map((todayPlan, i) => [todayPlan, tomorrowPlan[i]]);

  const todayCategories = todayPlan.reduce(calcCategoryStatus, { });
  const tomorrowCategories = tomorrowPlan.reduce(calcCategoryStatus, { });

  return `
  # ${title} 데일리 회고

  ## 회고 및 일정
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

  ## 카테고리별 소요 시간

  ### 오늘
  ${Object.values(todayCategories).map((value) => {
    return `${value.label}: ${value.count}시간`;
  }).join("'")}

  ### 내일
  ${Object.values(tomorrowCategories).map((value) => {
    return `${value.label}: ${value.count}시간`;
  }).join("'")}

  ## 느낀점
  ${feeling}`;
}