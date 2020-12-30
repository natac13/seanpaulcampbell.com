import startCase from 'lodash/startCase'
import { SITE_TITLE } from '../constants'

const createSEOTitle = (siteTitle?: string | null, pathname?: string) => {
  if (!pathname || !siteTitle) {
    return SITE_TITLE
  }

  const reversedPathArray = pathname
    .split('/')
    .map(startCase)
    .filter((sub: string) => !!sub)
    .reverse()

  return [...reversedPathArray, siteTitle].join(' | ')
}

export default createSEOTitle
