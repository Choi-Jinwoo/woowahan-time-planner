import { Category } from '../../types/category';

const categories: { [key: string]: Category } = {
  study: {
    'key': 'study',
    'label': '공부',
    'color': '#4c17d4'
  },
  development: {
    'key': 'development',
    'label': '개발',
    'color': '#0085ff'
  },
  meeting: {
    'key': 'meeting',
    'label': '회의',
    'color': '#e8bf0a'
  },
  pair: {
    'key': 'pair',
    'label': '페어 프로그래밍',
    'color': '#0ecec4'
  },
  etc: {
    'key': 'etc',
    'label': '기타',
    'color': '#b0c4de'
  }
}

export default categories;