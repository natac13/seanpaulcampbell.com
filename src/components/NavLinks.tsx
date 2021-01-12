import { Box } from '@material-ui/core'
import { Link } from 'gatsby-material-ui-components'
import React from 'react'

const links = [
  {
    title: 'About',
    url: '#about',
  },
  {
    title: 'Projects',
    url: '#projects',
  },
  {
    title: 'Blog',
    url: '/blog',
  },
  {
    title: 'Photography',
    url: '/photography',
  },
]

const NavLinks: React.FC = () => {
  return (
    <Box
      component="nav"
      id="main-nav"
      sx={{
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: (theme) => theme.spacing(1),
        alignSelf: 'flex-start',
        p: 2,
      }}
    >
      {links.map((link) => (
        <Link to={link.url} variant="p" underline="none" color="textPrimary">
          {link.title}
        </Link>
      ))}
    </Box>
  )
}

export default NavLinks
