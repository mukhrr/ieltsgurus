import { PencilLineIcon, SparklesIcon, SwatchBook, Trophy } from 'lucide-react'

export const TWEETS_COLLECTION_ID = 15896982

export const COLLECTION_IDS = [
  18259129,
  15968768,
  23598938,
  16949672,
  15807896,
  15807897,
  15969648,
  16338467,
  TWEETS_COLLECTION_ID,
  25589709,
  17139082,
  22029101,
  39696243
]

export const LINKS = [
  {
    href: '/',
    label: 'Home',
    icon: <SparklesIcon size={16} />,
    isDisabled: false
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: <PencilLineIcon size={16} />,
    isDisabled: false
  },
  {
    href: '/journey',
    label: 'Success Stories',
    icon: <Trophy size={16} />,
    isDisabled: true
  },
  // {
  //   href: '/stack',
  //   label: 'Homeworks',
  //   icon: <NotebookText size={16} />,
  //   isDisabled: true
  // },
  {
    href: '/workspace',
    label: 'Marathons',
    icon: <SwatchBook size={16} />,
    isDisabled: true
  }
]

export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20

export const SUBMIT_FEEDBACK_FORM_TITLE = 'Submit a feedback'
export const SUBMIT_FEEDBACK_FORM_DESCRIPTION =
  'Share your thoughts on what you like/hate about the project and what would be the next cool feature you want. Sharing is caring :)'
export const MAX_FEEDBACK_SUBMISSIONS_PER_DAY = 5
export const FEEDBACK_SUBMISSION_COUNT_COOKIE_NAME = 'feedback_submission_count'

export const CATEGORIES = {
  TRENDING: "Today's Trending IELTS mentors",
  WRITING: 'Top WRITING Instructors',
  SPEAKING: 'Top SPEAKING Instructors',
  LISTENING: 'Top LISTENING Instructors',
  READING: 'Top READING Instructors',
  FEATURED: 'Featured IELTS Mentors',
  NINERS: 'NINERS',
  SEARCHED: 'Search Results:'
}

export const FILTERS = [
  'Featured',
  'Niners',
  'Newest',
  'Overall 6+',
  'Overall 7+',
  'Overall 8+',
  'General IELTS Preparation',
  'Reading Guru',
  'Writing Expert',
  'Speaking Practice Master',
  'Experienced in Listening',
  'Most Recommended'
]
