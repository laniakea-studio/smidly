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
        .spinner {
          border-radius: 50%;
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-left-color: #fff;
          border-top-color: #fff;
          animation: spin 0.6s infinite linear;
        }
        @keyframes spin {
          to {
            transform: rotate(359deg);
          }
        }
      `}
    >
      {children}
    </button>
  );
}
