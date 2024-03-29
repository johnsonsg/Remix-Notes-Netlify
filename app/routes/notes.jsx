import { json, redirect } from '@remix-run/node'
import { Link, useCatch, useLoaderData } from '@remix-run/react'
import NewNote, { links as newNoteLinks } from '~/components/NewNote'
import NoteList, { links as noteListLinks } from '~/components/NoteList'
import { addNote, getStoredNotes, deleteNote } from '~/data/notes.server'
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
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes. Let's add one!" },
      { status: 404, statusText: 'Not Found' }
    )
  }
  // return notes
  return json(notes, { headers: { 'cache-control': 'max-age=5' } })
}

export async function action({ params, request }) {
  // const noteId = params.id

  if (request.method === 'POST') {
    const formData = await request.formData()
    const noteData = Object.fromEntries(formData)

    try {
      validateNoteInput(noteData)
    } catch (error) {
      return error
    }

    await addNote(noteData)
    return redirect('/notes')
  }
  // else if (request.method === 'DELETE') {
  //   await deleteNote(noteId)
  //   console.log('DELETE', deleteNote)
  //   return redirect('/notes')
  // }
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()]
}

export function meta() {
  return {
    title: 'All Notes',
    description: 'A list of all your notes'
  }
}

export function CatchBoundary() {
  const caughtResponse = useCatch()
  const message = caughtResponse.data?.message || 'Data not found.'

  return (
    <main>
      <NewNote />
      <p className='info-message'>{message}</p>
    </main>
  )
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
