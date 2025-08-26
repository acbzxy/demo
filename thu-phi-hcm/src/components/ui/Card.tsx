import React from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>
  Body: React.FC<CardBodyProps>
  Footer: React.FC<CardFooterProps>
} = ({ children, className, hover = false }) => {
  return (
    <div
      className={clsx(
        'card',
        {
          'transition-transform duration-200 hover:shadow-card-hover hover:-translate-y-1': hover,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={clsx('card-header', className)}>
      {children}
    </div>
  )
}

const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return (
    <div className={clsx('card-body', className)}>
      {children}
    </div>
  )
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={clsx('card-footer', className)}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
