import * as React from "react";
import { css } from "styled-components/macro";
import theme from "../../theme/theme.js";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Button.
 *
 * @param {ButtonProps} props button's props
 * @returns {React.ReactElement<ButtonProps>} Button.
 */

export function Button(props: ButtonProps): React.ReactElement<ButtonProps> {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      css={`
        color: ${theme.colorBtnPrimary};
        background: ${theme.bgBtnPrimary};
        height: 42px;
        border: 2px solid ${theme.bgBtnPrimary};
        border-radius: 3px;
        min-width: 160px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        &:hover {
          opacity: 0.94;
        }
        &:disabled {
          cursor: default;
          opacity: 0.3;
        }
      `}
    >
      {children}
    </button>
  );
}
