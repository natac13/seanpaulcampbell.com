/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react'
import { Theme as MuiTheme } from '@material-ui/core'

declare module 'remark-unwrap-images'

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
