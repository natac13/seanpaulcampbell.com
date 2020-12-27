import R from 'ramda'
import isBefore from 'date-fns/fp/isBefore'
import addDays from 'date-fns/fp/addDays'

// sort a list of dates
const byDateAscending = R.ascend(R.identity)
export const sortDateList = R.compose<string[], Date[], Date[]>(
  R.sort(byDateAscending),
  R.map((x) => new Date(x))
)
// get the last(highest) value from a list of dates that was sorted.
export const getLastDateAfterSorting = R.compose<string[], Date[], Date>(
  R.last,
  sortDateList
)
// create member initials from the fullName
export const initialFromFullName = R.compose<
  string,
  string[],
  string[],
  string
>(
  R.join('.'),
  R.map(R.compose<string, string, string>(R.toUpper, R.head)),
  R.split(' ')
)

export const dateBeforeYesterday = R.compose(
  isBefore(addDays(-1)(new Date())),
  Date.parse
)
