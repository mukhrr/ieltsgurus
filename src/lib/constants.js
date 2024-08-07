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
    isDisabled: true
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

export const WORKSPACE_ITEMS = [
  {
    title: 'Richard Lampert Eiermann 2 Desk',
    url: 'https://www.richard-lampert.de/en/furniture/eiermann-2-desk-en/',
    specs: 'White, 80x160cm'
  },
  {
    title: 'Herman Miller Aeron Remastered',
    url: 'https://store.hermanmiller.com/office-chairs-aeron/aeron-chair/2195348.html',
    specs: 'Graphite, Size C'
  },
  {
    title: 'Apple Studio Display',
    url: 'https://www.apple.com/nl/studio-display/',
    specs: 'Tilt- and height-adjustable stand'
  },
  {
    title: '14" MacBook Pro',
    url: 'https://www.apple.com/nl/macbook-pro/',
    specs: 'Space Gray, M2, 16GB RAM, 256GB SSD'
  },
  {
    title: 'Apple Magic Trackpad',
    url: 'https://www.apple.com/nl/shop/product/MK2D3Z/A/magic-trackpad-wit-multi%E2%80%91touch-oppervlak',
    specs: 'White'
  },
  {
    title: 'Apple Magic Keyboard',
    url: 'https://www.apple.com/nl/shop/product/MK293N/A/magic-keyboard-met-touch-id-voor-mac-modellen-met-apple-silicon-nederlands',
    specs: 'White, Touch ID'
  },
  {
    title: 'Logitech MX Master 3S',
    url: 'https://www.logitech.com/nl-nl/products/mice/mx-master-3s.910-006560.html',
    specs: 'Pale Gray'
  },
  {
    title: 'Dyson Solarcycle Morph',
    url: 'https://www.dyson.nl/verlichting/bureaulamp/solarcycle-morph-cd06/wit-zilver',
    specs: 'White/Silver'
  },
  {
    title: 'Apple Airpods Max',
    url: 'https://www.apple.com/nl/airpods-max/',
    specs: 'Space Gray'
  },
  {
    title: 'Apple Airpods Pro',
    url: 'https://www.apple.com/nl/airpods-pro/',
    specs: '2nd generation'
  },
  {
    title: 'Braun Analogue Wall Clock',
    url: 'https://braun-clocks.com/collections/wall-clocks/products/bc17-classic-large-analogue-wall-clock-white',
    specs: 'White, BC17 Classic Large'
  },
  {
    title: 'IKEA Alex Drawer Unit',
    url: 'https://www.ikea.com/nl/en/p/alex-drawer-unit-white-00473546/',
    specs: 'White, 36x70cm'
  },
  {
    title: 'IKEA Övning Footrest',
    url: 'https://www.ikea.com/nl/en/p/oevning-multifunctional-ergonomic-footrest-00552020/',
    specs: 'Gray/Blue'
  }
]

export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20

export const SUBMIT_FEEDBACK_FORM_TITLE = 'Submit a feedback'
export const SUBMIT_FEEDBACK_FORM_DESCRIPTION =
  'Share your thoughts on what you like/hate about the project and what would be the next cool feature you want. Sharing is caring :)'
export const MAX_FEEDBACK_SUBMISSIONS_PER_DAY = 5
export const FEEDBACK_SUBMISSION_COUNT_COOKIE_NAME = 'feedback_submission_count'

export const CONTENT_TYPES = {
  PAGE: 'page',
  POST: 'post',
  LOGBOOK: 'logbook'
}

export const CATEGORIES = {
  TRENDING: "Today's Trending IELTS Gurus",
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
