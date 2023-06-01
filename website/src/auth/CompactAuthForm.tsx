import React from 'react'
import { Form, FormBreak, FormField } from '../config/controls/forms'
import { StyledButton } from '../config/controls/buttons'
import PageModal from '../config/layouts/PageModal'

const ComponentAuthForm: React.FC = () => {
  const formId = 'auth-form-compact'

  return (
    <Form formId={formId} inline>
      <FormField formId={formId} name='email' placeholder='Email' />
      <FormField formId={formId} name='password' placeholder='Password' />
      <FormBreak to='sm' />
      <StyledButton type='button' title='Login or Register' variant='primary'>Login / Register</StyledButton>

      <PageModal title='Register'>
        Do you want to register new account with this email address ...?
      </PageModal>
    </Form>
  )
}

export default ComponentAuthForm
