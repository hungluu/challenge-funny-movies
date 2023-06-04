import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Form, FormBreak, FormField } from '../config/controls/forms'
import { StyledButton } from '../config/controls/buttons'
import { observer, store } from '../config/contexts'
import Medium from './Medium'
import { md } from '../config/controls/responsive'
import { useMediumFormAnimator } from './animations'

const MediumForm = () => {
  const formId = 'media-form'
  const { media } = store()
  const preview = media.sharePreview
  const errors = media.shareErrors
  const hasErrors = errors.length > 0

  const [isSharing, setIsSharing] = useState(false)
  const animator = useMediumFormAnimator()

  return (
    <MediumFormContainer className='medium-form' ref={animator}>
      {media.isShareFormOpened && (
        <Form formId={formId} className={classnames(media.isShareFormOpened || 'form--hidden')} noSubmit>
          <FormField
            className='form__url'
            formId={formId}
            name='url'
            label='Share Youtube URL'
            onChange={ev => {
              console.log(ev.target.value)
              void media.preview(ev.target.value)
            }}
          />

          {hasErrors
            ? (
              <FormBreak className='form__errors' marginBottom='0'>
                {errors.map(message => (
                  <small key={message} className='error__item'>{message}</small>
                ))}
              </FormBreak>
              )
            : ''}

          {preview && (
            <Medium
              name={preview.name}
              description={preview.description}
              thumbnail={preview.thumbnail}
              className='form__preview'
            />
          )}

          <StyledButton
            type='button'
            variant='share'
            disabled={!preview || isSharing}
            title={preview ? 'Share this youtube video' : 'Please provide youtube url'}
            onClick={() => {
              const url = preview?.url

              if (url) {
                setIsSharing(true)
                void media.share(url)
                  .then((saved) => {
                    if (saved) {
                      media.isShareFormOpened = false
                    }
                  })
                  .finally(() => {
                    setIsSharing(false)
                  })
              }
            }}
          >
            Share
          </StyledButton>
          <StyledButton
            type='button'
            disabled={isSharing}
            title='Back'
            onClick={() => {
              media.isShareFormOpened = false
              media.sharePreview = null
              media.shareErrors = []
            }}
          >
            Back
          </StyledButton>
        </Form>
      )}
    </MediumFormContainer>
  )
}

const MediumFormContainer = styled.div`
  margin: 0 auto;
  padding: 2rem 0;
  padding-top: 0;
  width: 100%;

  .form {
    max-width: 500px;
    margin: 0 auto;
  }

  .form__field {
    width: 100%;
  }

  .form__preview {
    font-size: 0.7rem;
    padding: 1rem;
    background: #dfdfdf;

    .info__title {
      ${md('margin-top: 0')}
    }

    .info__user, .info__description {
      margin-bottom: 0;
      font-size: 0.9em;
    }
  }

  .field__label {
    font-weight: bold;
    color: red;
    background: linear-gradient(to right, red, #069);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .form__url {
    width: 500px;
    max-width: 100%;

    border-color: #069;
    border-width: 4px;
    border-style: solid;
    border-image: linear-gradient(to right, red, #069) 1 1 1;
    transition: all ease-in-out 0.2s;
  }

  .form__url:focus, .form__url:active {
    border-image: linear-gradient(to left, red, #069) 1 1 1;
  }

  .form__errors {
    color: red;
    text-align: right;
  }
`

export default observer(MediumForm)
