import { FC, InputHTMLAttributes } from "react";
import { css } from "styled-components/macro";
import theme from "../../theme/theme.js";
// @ts-ignore
import Fade from "react-reveal/Fade";

// TODO: warning type: array of strings
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  hint?: string;
  className?: string;
  style?: object;
  checked?: boolean;
  warning?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputText: FC<InputProps> = ({
  name,
  style,
  label,
  onChange,
  onBlur,
  className,
  warning,
  hint,
  ...rest
}) => (
  <div
    style={style}
    className={className}
    css={`
      display: flex;
      flex-direction: column;
      padding: 10px 0 20px;
      label {
        font-size: 13px;
        color: ${theme.colorLabel};
      }
      input {
        border: 1px solid ${theme.borderColorInput};
        border-radius: 4px;
        font-size: 16px;
        margin: 4px 0;
        padding: 10px;
        &:focus {
          border-color: ${theme.borderFocus};
        }
      }
      .hint {
        color: #898989;
        font-size: 12px;
      }
      .warningText {
        span {
          font-size: 13px;
          color: tomato;
          display: inline-flex;
        }
      }
    `}
  >
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      id={name}
      {...rest}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
    />
    {hint && <p className="hint">{hint}</p>}
    {warning?.length > 0 && (
      <Fade collapse>
        <div className="warningText">
          {warning?.map((i: string) => (
            <span>{i}</span>
          ))}
        </div>
      </Fade>
    )}
  </div>
);

export const InputCheckbox: FC<InputProps> = ({
  name,
  style,
  label,
  onChange,
  checked,
  ...rest
}) => (
  <div
    style={style}
    css={`
      display: flex;
      align-items: center;
      padding: 10px 0 20px;
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      label {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        font-size: 15px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .checkmark {
        position: absolute;
        top: -1px;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: #fbfbfc;
        border: 1px solid #a0a0a0;
        border-radius: 2px;
        ${checked && "background-color: #525360;"}
      }
      .checkmark:after {
        content: "";
        position: absolute;
        display: ${checked ? "block" : "none"};
      }
      .checkmark:after {
        left: 5px;
        top: 1px;
        width: 4px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    `}
  >
    <label>
      {label}
      <input
        type="checkbox"
        id={name}
        {...rest}
        name={name}
        onChange={onChange}
      />
      <span className="checkmark"></span>
    </label>
  </div>
);
