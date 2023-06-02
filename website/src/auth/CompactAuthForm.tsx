import React, { useCallback, useState } from 'react'
import { Form, FormBreak, FormField } from '../config/controls/forms'
import { StyledButton } from '../config/controls/buttons'
import PageModal from '../config/layouts/PageModal'
import { observer, store } from '../config/contexts'
import styled from 'styled-components'

const CompactAuthForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistration, setIsRegistration] = useState(false)
  const { auth } = store()
  const formId = 'auth-form-compact'
  const errors = auth.errors.filter(e => e !== 'invalid email')
  const hasErrors = Boolean(errors.length)

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    auth.errors = []

    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else {
      setEmail(e.target.value)
    }
  }, [])

  const onLogin = useCallback(async () => {
    setIsRegistration(await auth.login(email, password) === 'not exists')
  }, [email, password])

  return (
    <CompactAuthFormContainer>
      <Form formId={formId} inline noSubmit>
        {hasErrors
          ? (
            <FormBreak className='form__errors' marginBottom='0'>
              {errors.map(message => (
                <small key={message} className='error__item'>{message}</small>
              ))}
            </FormBreak>
            )
          : ''}
        <FormField
          className='form__email'
          formId={formId}
          name='email'
          placeholder='Email'
          value={email}
          onChange={onInputChange}
        />
        <FormField
          className='form__password'
          formId={formId}
          name='password'
          placeholder='Password'
          type='password'
          value={password}
          onChange={onInputChange}
        />
        <StyledButton
          className='form__login'
          type='button'
          title='Login or Register'
          variant='primary'
          onClick={() => { void onLogin() }}
        >Login / Register
        </StyledButton>

        <PageModal
          title='Register'
          visible={isRegistration}
          toggle={() => { setIsRegistration(!isRegistration) }}
          onConfirm={() => {
            if (!hasErrors) {
              void auth.register(email, password)
            } else {
              setIsRegistration(false)
            }
          }}
          confirmText={hasErrors ? 'Review inputs' : 'Confirm'}
        >
          {
          !hasErrors
            ? `Do you want to register new account with this email address ${email}?`
            : 'There are some errors during registration'
          }
        </PageModal>
      </Form>
    </CompactAuthFormContainer>
  )
}

const CompactAuthFormContainer = styled.div`
  .form__errors {
    color: red;
    text-align: right;
  }

  .error__item::before {
    content: '•';
    margin-right: 0.25rem;
  }
`

export default observer(CompactAuthForm)
