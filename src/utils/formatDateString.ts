import format from 'date-fns/fp/format'
import parseISO from 'date-fns/fp/parseISO'
import R from 'ramda'

export const formatDateString = R.curry(
  (formatString: string, dateString: string) =>
    R.compose(format(formatString), parseISO)(dateString)
)
