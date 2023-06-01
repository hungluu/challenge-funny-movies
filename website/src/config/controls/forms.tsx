import React, { type FormHTMLAttributes, type InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { md, type IBreakpoint, cssFromBp, cssUptoBp } from './responsive'

export interface IFormProps extends FormHTMLAttributes<any> {
  formId: string
  inline?: boolean
}
export const Form: React.FC<IFormProps> = ({ formId, children, inline }) => {
  return (
    <FormContainer id={`form:${formId}`} className={classNames('form', inline && 'form--inline')}>
      {children}
    </FormContainer>
  )
}

const FormContainer = styled.form`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;

  &.form--inline {
    flex-direction: row;

    .form__field {
      margin-right: 0.5rem;
    }

    .form__field:last-child {
      margin-right: 0;
    }
  }
`

export interface IFormFieldProps {
  formId: string
  name: string
  label?: string
  type?: InputHTMLAttributes<string>['type']
  placeholder?: string
  children?: undefined
}
export const FormField: React.FC<IFormFieldProps> = ({ formId, name, label, placeholder, type = 'text' }) => {
  return (
    <FormFieldContainer className='form__field'>
      {label && (
        <label htmlFor={`form:${formId}:${name}`}>{label}</label>
      )}
      <input title={`Please input ${name}`} id={`form:${formId}:${name}`} type={type} placeholder={placeholder} />
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

export interface IFormBreakProps {
  from?: IBreakpoint
  to?: IBreakpoint
}

export const FormBreak = styled.div<IFormBreakProps>`
  flex-basis: 0;
  height: 0;
  width: 0;
  margin-bottom: 0.5rem;

  ${props => props.from && cssFromBp(props.from, `
    flex-basis: 100%;
  `)}

  ${props => props.to && cssUptoBp(props.to, `
    flex-basis: 100%;
  `)}
`
