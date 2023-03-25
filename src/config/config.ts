import { currentLocale, translated } from '../utils/i18n'

const url = new URL(window.location)
const searchParams = url.searchParams
const mediaQueryObj = window.matchMedia('(prefers-color-scheme: dark)')
const isDarkMode = searchParams.get('dark') || mediaQueryObj.matches

const additionalMetaTags = [
  {
    name: 'theme-color',
    content: isDarkMode ? '#000000' : '#FFFFFF'
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: isDarkMode ? '#000000' : '#FFFFFF'
  },
  {
    name: 'msapplication-TileColor',
    content: isDarkMode ? '#000000' : '#FFFFFF'
  },
  {
    name: 'apple-mobile-web-app-title',
    content: translated('app_title')
  },
  {
    name: 'subject',
    content: translated('app_subject')
  },
  {
    name: 'author',
    content: translated('name')
  },
  {
    name: 'owner',
    content: translated('name')
  },
  {
    name: 'copyright',
    content: translated('name')
  },
  {
    name: 'language',
    content: currentLocale
  }
]
const additionalLinkTags = [
  {
    rel: 'manifest',
    href: `/manifest/${isDarkMode ? 'dark' : 'light'
      }/manifest-${currentLocale}.json`
  }
]
const properties = ['G-PV930WQQFT']

export { additionalLinkTags, additionalMetaTags, properties }

