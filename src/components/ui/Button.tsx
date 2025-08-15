import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    children: ReactNode
}

export const Button = ({ asChild = false, ...props }: ButtonProps) => {
    const Component = asChild ? Slot : 'button'
    return <Component className="btn" {...props} />
}