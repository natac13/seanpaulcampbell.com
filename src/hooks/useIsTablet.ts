import { useTheme, useMediaQuery } from '@material-ui/core'

const useIsTablet = (): boolean => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'))
  return isTablet
}

export default useIsTablet
