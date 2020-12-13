/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react'
import { Theme as MuiTheme } from '@material-ui/core'

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}
