import { FontFamily } from './context/fontFamily'

export const SITE_TITLE = `Sean Campbell's Blog & Photo Gallery`
export const IS_DEV = process.env.NODE_ENV === 'development'

// localStorage keys
export const SOUND_ON = 'SOUND_ON'
export const DARK_MODE = 'DARK_MODE'
export const FONT_SIZE = 'FONT_SIZE'
export const FONT_FAMILY = 'FONT_FAMILY'

// default website settings
export const FONT_SIZE_DEFAULT = 16
export const FONT_FAMILY_DEFAULT: FontFamily = 'sans-serif'
export const SOUND_ON_DEFAULT = true
