import React from 'react'
import type { HTMLAttributes, FormHTMLAttributes, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { md, type IBreakpoint, cssFromBp, cssUptoBp } from './responsive'

export interface IFormProps extends FormHTMLAttributes<any> {
  formId: string
  inline?: boolean
  noSubmit?: boolean
}
export const Form: React.FC<IFormProps> = ({ formId, children, inline, noSubmit, ...formAttrs }) => {
  return (
    <FormContainer
      {...formAttrs}
      {...noSubmit && {
        onSubmit: e => {
          e.preventDefault()

          return false
        }
      }}
      id={`form:${formId}`}
      className={classNames('form', inline && 'form--inline')}
    >
      {children}
    </FormContainer>
  )
}

const FormContainer = styled.form`
  padding: 0.5rem 0;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.form--inline {
    flex-direction: row;
    justify-content: flex-end;
  }

  ${md(`
    gap: 0.75rem;
  `)}
`

export interface IFormFieldProps extends InputHTMLAttributes<any> {
  formId: string
  name: string
  label?: string
  children?: undefined
}
export const FormField: React.FC<IFormFieldProps> = ({ formId, name, label, placeholder, type = 'text', ...inputAttrs }) => {
  return (
    <FormFieldContainer className='form__field'>
      {label && (
        <label htmlFor={`form:${formId}:${name}`}>{label}</label>
      )}
      <input
        {...inputAttrs}
        name={name}
        title={`Please input ${name}`}
        aria-label={name}
        id={`form:${formId}:${name}`}
        type={type}
        placeholder={placeholder}
      />
    </FormFieldContainer>
  )
}

const FormFieldContainer = styled.div`
  input {
    color: #171717;
    outline: none;
    border-radius: 0;
    border: solid 1px #909090;
    background: #fefefe;

    &:focus {
      border-color: #393939;
      background: #f9f9f9;
    }

    width: 5rem;
    font-size: 0.75rem;
    padding: 0.25rem;
    ${md(`
      width: 8rem;
      font-size: 1rem;
      padding: 0.5rem;
    `)}
  }
`

export interface IFormBreakProps extends HTMLAttributes<any> {
  from?: Exclude<IBreakpoint, 'xs'>
  to?: Exclude<IBreakpoint, 'xs'>
  marginBottom?: string
}

export const FormBreak = styled.div<IFormBreakProps>`
  display: flex;
  flex-direction: column;

  height: ${props => props.children ? 'auto' : 0};
  flex-basis: ${props => !props.from ? '100%' : 0};
  margin-bottom: ${props => props.marginBottom || '0.5rem'}

  ${props => props.from && cssFromBp(props.from, 'flex-basis: 100%')}
  ${props => props.to && cssUptoBp(props.to, 'flex-basis: 100%')}
`
