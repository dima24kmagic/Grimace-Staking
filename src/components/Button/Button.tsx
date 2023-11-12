import type { HTMLAttributes } from "react"
import React from "react"
import Link from "next/link"
import { css } from "@emotion/css"
import classNames from "classnames"

export type ButtonProps = { buttonType?: "filled" | "outlined" } & (
  | React.ComponentProps<typeof Link>
  | HTMLAttributes<HTMLButtonElement>
)

function Button(props: ButtonProps) {
  const { children, buttonType, className, disabled, ...rest } = props

  if ("href" in rest) {
    if (buttonType === "filled") {
      return (
        <Link
          {...rest}
          className={classNames(
            className,
            buttonFilledStyles,
            disabled && "disabled",
          )}
        >
          {children}
        </Link>
      )
    } else {
      return (
        <Link
          {...rest}
          className={classNames(
            className,
            buttonOutlinedStyles,
            disabled && "disabled",
          )}
        >
          <span>{children}</span>
        </Link>
      )
    }
  } else {
    if (buttonType === "filled") {
      return (
        <button
          {...rest}
          disabled={disabled}
          className={classNames(className, buttonFilledStyles)}
        >
          {children}
        </button>
      )
    } else {
      return (
        <button
          {...rest}
          disabled={disabled}
          className={classNames(className, buttonOutlinedStyles)}
        >
          <span>{children}</span>
        </button>
      )
    }
  }
}

const commonButtonStyles = css`
  border-radius: 12px;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const buttonFilledStyles = css`
  ${commonButtonStyles};
  padding: 12px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: var(--color-white);
  font-weight: 700;
  background: linear-gradient(270deg, #9747ff 0%, #4c1592 100%);
  cursor: pointer;
  border: none;

  &:disabled {
    font-weight: 400;
    background: linear-gradient(270deg, #454545 0%, #676767 100%);
    cursor: not-allowed;
  }

  &.disabled {
    font-weight: 400;
    background: linear-gradient(270deg, #454545 0%, #676767 100%);
    cursor: not-allowed;
  }
`

const buttonOutlinedStyles = css`
  ${commonButtonStyles};
  padding: 4px;
  text-transform: uppercase;
  color: var(--color-white);
  font-weight: 400;
  background: linear-gradient(
    90deg,
    rgba(151, 71, 255, 1) 0%,
    rgba(76, 21, 146, 1) 50%,
    rgba(219, 0, 255, 1) 100%
  );
  cursor: pointer;

  & > span {
    background: var(--color-bg);
    border-radius: 10px;
    padding: 8px 4px;
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 150ms ease;
  }

  &:hover > span {
    background: transparent;
  }
`

export default Button
