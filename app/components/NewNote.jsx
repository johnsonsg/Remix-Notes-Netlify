import { Form, useActionData, useNavigation, useSubmit } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import noteStyles from '~/styles/NewNote.css'

function NewNote() {
  const validationErrors = useActionData()

  const navigation = useNavigation()

  const isSubmitting = navigation.state !== 'idle'

  let formRef = useRef()
  // let titleRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset()
      // titleRef.current?.focus() // if you want to focus on the title field after submit.
    }
  }, [isSubmitting])

  const submit = useSubmit()

  function submitHandler(event) {
    event.preventDefault()
    submit(event.target, {
      method: 'POST'
    })
  }

  return (
    <Form
      ref={formRef}
      // method='post' Submitting Programmatically
      id='note-form'
      onSubmit={submitHandler}
    >
      <p>
        <label htmlFor='title'>Title</label>
        <input
          // ref={titleRef}
          type='text'
          id='title'
          name='title'
          required
        />
      </p>
      <p>
        <label htmlFor='content'>Content</label>
        <textarea id='content' name='content' rows='5' required />
      </p>

      {/* show server-side validation errors */}
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </Form>
  )
}

export default NewNote

export function links() {
  return [{ rel: 'stylesheet', href: noteStyles }]
}
