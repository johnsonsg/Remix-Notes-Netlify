import { Form, useActionData, useNavigation, useSubmit } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import noteStyles from '~/styles/NewNote.css'

function NewNote() {
  // const data = useActionData() // Use validationErrors instead of data
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

  // Look at using state instead of useRef. Store inputs in state incase there is an error and inputs get errased on validation error during submit.
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

      {/* {data?.message && (
        <ul>
          <li>{data.message}</li>
        </ul>
      )}
      // Use validationErrors instead of data
      */}

      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  )
}

export default NewNote

export function links() {
  return [{ rel: 'stylesheet', href: noteStyles }]
}
