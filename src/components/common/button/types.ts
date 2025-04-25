import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: 'success' | 'danger' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

export default ButtonProps;
