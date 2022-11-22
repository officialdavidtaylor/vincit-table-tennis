import React, { ChangeEventHandler } from "react";

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
  pattern?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
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
      pattern,
      onChange,
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
            onChange={onChange}
            pattern={pattern}
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
