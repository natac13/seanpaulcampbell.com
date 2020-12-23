import { useTheme, useMediaQuery } from '@material-ui/core'

const useIsMobile = (): boolean => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return isMobile
}

export default useIsMobile
