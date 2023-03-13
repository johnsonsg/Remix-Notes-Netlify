import { json, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import NewNote, { links as newNoteLinks } from '~/components/NewNote'
import NoteList, { links as noteListLinks } from '~/components/NoteList'
import { addNote, getStoredNotes } from '~/data/notes.server'
import { validateNoteInput } from '~/data/validation.server'

export default function NotesPage() {
  const notes = useLoaderData()
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}

// Fetch notes data from the server
export async function loader() {
  const notes = await getStoredNotes()
  // return notes
  return json(notes, { headers: { 'cache-control': 'max-age=5' } })
}

export async function action({ request }) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  // if (noteData.title.trim().length > 5) {
  //   return { message: 'Invalid title - must be at least 5 characters long.' }
  // }
  // Use server-side validation instead with validation.server.js with try/catch
  try {
    validateNoteInput(noteData)
  } catch (error) {
    return error
  }

  await addNote(noteData)
  await new Promise(resolve => setTimeout(resolve, 500))
  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()]
}

export function ErrorBoundary({ error }) {
  return (
    <main className='error'>
      <h1>An error related to your notes occurred!</h1>
      <p>{error.message}</p>
      <p>
        <Link to='/'>Back to safety</Link>
      </p>
    </main>
  )
}
