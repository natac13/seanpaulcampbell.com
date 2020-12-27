import React from 'react'
import { SnackbarProvider, SnackbarKey } from 'notistack'
import CloseSnack from './CloseSnack'
import { Theme } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core'

const notistackRef = React.createRef<SnackbarProvider>()
const closeSnack = (key: SnackbarKey) =>
  notistackRef?.current?.closeSnackbar(key)

// const useStyles = makeStyles((theme) => ({
//   warning: {
//     color: theme.palette.getContrastText(theme.palette.warning.main),
//     // color: theme.palette.getContrastText(theme.palette.warning.main),
//   },
//   info: {
//     color: theme.palette.getContrastText(theme.palette.info.main),
//     // color: theme.palette.getContrastText(theme.palette.info.main),
//   },
//   success: {
//     color: theme.palette.getContrastText(theme.palette.success.main),
//     // color: theme.palette.getContrastText(theme.palette.success.main),
//   },
//   error: {
//     color: theme.palette.getContrastText(theme.palette.error.main),
//     // color: theme.palette.getContrastText(theme.palette.error.main),
//   },
// }))

interface Props {
  children: React.ReactNode
  theme: Theme
}

const SnackbarProviderComponent: React.FC<Props> = ({ children }: Props) => {
  // const classes = useStyles()
  // const isMobile = useIsMobile()

  return (
    <SnackbarProvider
      maxSnack={6}
      preventDuplicate
      ref={notistackRef}
      action={(key) => <CloseSnack closeSnackbar={() => closeSnack(key)} />}
      iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️',
      }}
      // classes={{
      //   variantSuccess: classes.success,
      //   variantError: classes.error,
      //   variantWarning: classes.warning,
      //   variantInfo: classes.info,
      // }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default SnackbarProviderComponent
