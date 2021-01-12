import React from 'react'
import {
  Box,
  IconButton,
  Divider,
  experimentalStyled,
  Typography,
} from '@material-ui/core'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { Email, LinkedIn, GitHub, Twitter } from '@material-ui/icons'

interface Props {
  type: 'desktop' | 'mobile'
}

const StyledIconButton = experimentalStyled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`&:hover, &:focus`]: {
    color: theme.palette.text.primary,
  },
}))

const NavContact: React.FC<Props> = ({ type }: Props) => {
  const { site } = useSiteMetadata()

  return (
    <Box
      id={`nav-contact-${type}`}
      sx={{
        display: 'flex',
        flexFlow: 'column',
        gap: (theme) => theme.spacing(1),
        width: '100%',
        alignSelf: 'flex-start',
        px: 2,
      }}
    >
      <Divider />
      <Typography variant="subtitle1" color="textSecondary">
        Contact Me!
      </Typography>
      <Box sx={{ display: 'flex', gap: (theme) => theme.spacing(3) }}>
        <StyledIconButton
          href={`mailto:${site?.siteMetadata?.social?.email}?Subject=Contact from seanpaulcampbell.com`}
          title={`Send email to ${site?.siteMetadata?.author?.name}`}
          target="_blank"
        >
          <Email
            css={(theme) => ({
              width: theme.spacing(3),
            })}
          />
        </StyledIconButton>
        <StyledIconButton
          href={site?.siteMetadata?.social?.linkedIn}
          title="LinkedIn Profile"
          target="_blank"
        >
          <LinkedIn
            css={(theme) => ({
              width: theme.spacing(3),
            })}
          />
        </StyledIconButton>
        <StyledIconButton
          href={site?.siteMetadata?.social?.github}
          title="github profile"
          target="_blank"
        >
          <GitHub
            css={(theme) => ({
              width: theme.spacing(3),
            })}
          />
        </StyledIconButton>
        <StyledIconButton
          href={site?.siteMetadata?.social?.twitter}
          title="twitter profile"
          target="_blank"
        >
          <Twitter
            css={(theme) => ({
              width: theme.spacing(3),
            })}
          />
        </StyledIconButton>
      </Box>
    </Box>
  )
}

export default NavContact
