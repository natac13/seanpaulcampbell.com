import React from 'react'
import Typography from '@material-ui/core/Typography'
import { format, parseISO } from 'date-fns/fp'

interface Props {
  dateString: string
  formatString?: string
}

export const DateFormatter: React.FC<Props> = (props: Props) => {
  const { dateString, formatString } = props
  const date = parseISO(dateString)

  return (
    <Typography component="time" dateTime={dateString}>
      {format(formatString || 'PPP', date)}
    </Typography>
  )
}
