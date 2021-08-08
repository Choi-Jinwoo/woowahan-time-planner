import { Category } from './category';

export enum DateType {
  Today,
  Tomorrow,
}

export type Plan = {
  timeSection: string;
  category?: Category;
  content?: string;
}

export type DailyPlan = {
  title: string;
  todayPlan: Plan[];
  tomorrowPlan: Plan[];
  feeling: string;
}