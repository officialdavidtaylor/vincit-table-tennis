import { Spinner } from "@icons";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: ((arg0?: any) => null) | ((arg0?: any) => Promise<any>);
}

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    type,
    onClick,
    isLoading = false,
    ...rest
  } = props;
  return (
    <>
      {isLoading ? (
        <button
          type={type}
          className={`${className} flex h-full w-full items-center justify-center gap-2 bg-purple-500`}
          onClick={onClick}
          {...rest}
        >
          <Spinner />
          Loading...
        </button>
      ) : (
        <button type={type} className={className} onClick={onClick} {...rest}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
