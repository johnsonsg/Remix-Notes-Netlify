import { redirect } from '@remix-run/node'
import NewNote, { links as newNoteLinks } from '~/components/NewNote'
// import { getStoredNotes, storeNotes } from '~/data/notes'
import { addNote } from '~/data/notes.server'
import { validateNoteInput } from '~/data/validation.server'

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  // const noteData = {
  //   title: formData.get('title'),
  //   content: formData.get('content'),
  // }

  // shortcut
  const noteData = Object.fromEntries(formData)

  // getStoredNotes is Mock data
  // const existingNotes = await getStoredNotes()
  // noteData.id = new Date().toISOString()

  // Mock Data
  // const updatedNotes = existingNotes.concat(noteData)

  // Validation
  try {
    validateNoteInput(noteData)
  } catch (error) {
    return error
  }

  await addNote(noteData)

  // Mock Data
  // await storeNotes(updatedNotes)

  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks()]
}
