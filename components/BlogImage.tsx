import { experimentalStyled } from '@material-ui/core/styles'

const Image = experimentalStyled('img')(
  ({ theme }) => `
   grid-column: 1 / -1;
   width: 98%;
   place-self: center center;

   ${theme.breakpoints.up('md')} {
     width: 80%;
   }
 `
)

export default Image
