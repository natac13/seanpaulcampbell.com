import type { SVGProps } from 'react'

export function TwitchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 2H3v16h5v4l4-4h5l4-4zm-10 9V7m5 4V7"
      />
    </svg>
  )
}
