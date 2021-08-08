import { Category } from '../../types/category';

const categories: { [key: string]: Category } = {
  study: {
    'label': '공부',
    'color': '#4c17d4'
  },
  development: {
    'label': '개발',
    'color': '#0085ff'
  },
  meeting: {
    'label': '회의',
    'color': '#e8bf0a'
  },
  pair: {
    'label': '페어 프로그래밍',
    'color': '#0ecec4'
  },
  etc: {
    'label': '기타',
    'color': '#b0c4de'
  }
}

export default categories;