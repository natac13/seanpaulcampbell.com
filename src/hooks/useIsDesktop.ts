import { useTheme, useMediaQuery } from '@material-ui/core'

const useIsDesktop = (): boolean => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  return isDesktop
}

export default useIsDesktop
