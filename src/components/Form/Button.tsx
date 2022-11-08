interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <>
      <button className={className} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;
