interface InputGroupProps {
  children: React.ReactNode;
  title?: string;
}

const InputGroup = (props: InputGroupProps) => {
  const { children, title } = props;
  return (
    <>
      <div className="-mx-2 flex flex-col gap-2 rounded-lg border-2 border-purple-200 p-2">
        {title ? <span className="text-xl font-medium">{title}</span> : <></>}
        {children}
      </div>
    </>
  );
};

export default InputGroup;
