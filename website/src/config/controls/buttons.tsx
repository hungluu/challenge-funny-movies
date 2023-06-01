import styled, { css } from 'styled-components'
import { md } from './responsive'

const white = '#fefefe'
const black = '#171717'
const grey = '#dfdfdf'

export type IStyledButtonVariant = 'primary'
export interface IStyledButtonProps {
  variant?: IStyledButtonVariant
}

export const StyledButton = styled.button<IStyledButtonProps>`
  text-align: center;
  min-width: 6rem;
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
    const variant = props.variant as IStyledButtonVariant

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

  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  ${md(`
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  `)}
`
