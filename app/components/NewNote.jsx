import { Form, useActionData, useNavigation, useSubmit } from '@remix-run/react'
import { useState } from 'react'
import noteStyles from '~/styles/NewNote.css'

function NewNote() {
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

  const validationErrors = useActionData()

  const navigation = useNavigation()

  const isSubmitting = navigation.state !== 'idle'

  const submit = useSubmit()

  function submitHandler(event) {
    event.preventDefault()
    submit(event.target, {
      method: 'POST'
    })

    setNoteTitle('')
    setNoteContent('')
  }

  return (
    <Form
      // method='post' Submitting Programmatically
      id='note-form'
      onSubmit={submitHandler}
    >
      <p>
        <label htmlFor='title'>Title</label>
        <input
          value={noteTitle}
          onChange={e => setNoteTitle(e.target.value)}
          type='text'
          id='title'
          name='title'
          required
        />
      </p>
      <p>
        <label htmlFor='content'>Content</label>
        <textarea
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
          id='content'
          name='content'
          rows='5'
          required
        />
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
