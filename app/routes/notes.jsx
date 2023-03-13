import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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
