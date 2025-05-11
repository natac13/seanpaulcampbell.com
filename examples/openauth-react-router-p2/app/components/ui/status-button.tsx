import { BanIcon, CheckCircleIcon, Loader2Icon } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button, type ButtonProps } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

export const StatusButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    status: 'pending' | 'success' | 'error' | 'idle'
    message?: string | null
  }
>(({ message, status, className, children, ...props }, ref) => {
  const companion = {
    pending: (
      <div className="inline-flex h-6 w-6 items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    ),
    success: (
      <div className="inline-flex h-6 w-6 items-center justify-center">
        <CheckCircleIcon />
      </div>
    ),
    error: (
      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive">
        <BanIcon className="text-destructive-foreground" />
      </div>
    ),
    idle: null,
  }[status]

  return (
    <Button ref={ref} className={cn('flex justify-center gap-4', className)} {...props}>
      <div className="inline-flex items-center">{children}</div>
      {message ? (
        <Tooltip>
          <TooltipTrigger>{companion}</TooltipTrigger>
          <TooltipContent>{message}</TooltipContent>
        </Tooltip>
      ) : (
        companion
      )}
    </Button>
  )
})
StatusButton.displayName = 'Button'
