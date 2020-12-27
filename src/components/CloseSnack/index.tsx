import React from 'react'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

// const useStyles = makeStyles((theme) => ({
//   close: {},
// }))

interface Props {
  closeSnackbar: () => void
}

const CloseSnack: React.FC<Props> = ({ closeSnackbar }: Props) => {
  // const classes = useStyles()
  return (
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      // className={classes.close}
      onClick={() => closeSnackbar()}
    >
      <CloseIcon />
    </IconButton>
  )
}

export default CloseSnack
