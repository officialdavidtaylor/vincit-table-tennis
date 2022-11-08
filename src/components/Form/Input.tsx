interface InputProps {
  title: string;
  type: string;
  value?: string | number;
  readOnly?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
}

const Input = (props: InputProps) => {
  const { title, type, placeholder, value, defaultValue, readOnly, ...rest } =
    props;
  return (
    <>
      <label className="flex flex-col">
        <span className=" text-sm font-bold">{title}</span>
        <input
          id="playerName"
          type={type}
          className="input-box"
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          {...rest}
        />
      </label>
    </>
  );
};

export default Input;
