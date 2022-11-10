import React from "react";

interface InputProps {
  autoCapitalize?: "none";
  autoCorrect?: "off";
  autoComplete?: "on" | "off";
  title: string;
  type?: string;
  spellCheck?: "true" | "false";
  value?: string | number;
  readOnly?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      autoCapitalize,
      autoCorrect,
      autoComplete,
      title,
      type,
      placeholder,
      spellCheck,
      value,
      defaultValue,
      readOnly,
      ...rest
    } = props;
    return (
      <>
        <label className="flex flex-col">
          <span className=" text-sm font-bold">{title}</span>
          <input
            id="playerName"
            type={type}
            ref={ref}
            className="input-box"
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoComplete={autoComplete}
            spellCheck={spellCheck}
            placeholder={placeholder}
            readOnly={readOnly}
            value={value}
            defaultValue={defaultValue}
            {...rest}
          />
        </label>
      </>
    );
  }
);

export default Input;
