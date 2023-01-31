import clsx from 'clsx'
import { Link as RouteLink, LinkProps } from 'react-router-dom'

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouteLink className={clsx('text-indigo-600 hover:text-indigo-900', className)} {...props}>
      {children}
    </RouteLink>
  )
}
