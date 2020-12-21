import React from 'react'

export interface NavLink {
  text: string
  url: string
}

export type NavLinks = NavLink[]

export interface NavIconLink {
  text: string
  url?: string
  onClick?: () => void
  icon: React.ReactElement
}

export type NavIconLinks = NavIconLink[]
