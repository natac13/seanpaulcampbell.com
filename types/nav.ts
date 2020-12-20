import React from 'react'

export interface NavLink {
  text: string
  url: string
}

export type NavLinks = NavLink[]

export interface NavIconLink {
  text: string
  url: string
  icon: React.ReactElement
}

export type NavIconLinks = NavIconLink[]
