import ButtonProps from '@/components/common/Button/types';

const sizeClassMap = {
  sm: 'h-8 text-sm',
  md: 'h-10',
  lg: 'h-12 text-lg',
} as const;

const colorClassMap = {
  success: 'bg-success-default text-white hover:bg-success-hover',
  danger: 'bg-danger-default text-white hover:bg-danger-hover',
  dark: 'bg-main-header text-white',
  outline: 'border border-black text-black',
} as const;

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'success',
  size = 'md',
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  const sizeClass = sizeClassMap[size];
  const colorClass = colorClassMap[color];

  const combinedClassName = `w-full rounded-2xl transition-colors focus:outline-none ${sizeClass} ${colorClass} ${className}`;

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
