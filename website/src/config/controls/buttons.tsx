import styled, { css } from 'styled-components'

const white = '#fefefe'
const black = '#171717'
const grey = '#dfdfdf'

export type IButtonVariant = 'primary'
export interface IButtonProps {
  variant?: IButtonVariant
}

export const Button = styled.button<IButtonProps>`
  text-align: center;
  min-width: 6rem;
  padding: 0.5rem 0.75rem;
  font-weight: bold;

  border: none;
  outline: none;
  transition: all .3s;
  cursor: pointer;
  color: ${black};

  &:active {
    color: ${black};
  }

  &:disabled {
    color: ${white};
    background: ${grey};
    &:hover {
      background: ${grey};
    }
    &:active {
      color: ${white};
      background: ${grey};
    }
  }

  ${props => {
    const variant = props.variant as IButtonVariant

    switch (variant) {
      case 'primary':
        return css`
          color: #fefefe;
          background: #06f;
          &:hover {
            background: #3385ff;
          }
          &:active {
            background: #3385ff;
          }
        `
      default:
        return ''
    }
  }}
`
