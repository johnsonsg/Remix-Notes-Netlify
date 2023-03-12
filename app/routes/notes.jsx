import { redirect } from '@remix-run/node'
import NewNote, { links as newNoteLinks } from '~/components/NewNote'
// import { getStoredNotes, storeNotes } from '~/data/notes'
import { addNote } from '~/data/notes.server'

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

  noteData.id = new Date().toISOString()

  // Mock Data
  // const updatedNotes = existingNotes.concat(noteData)

  await addNote(noteData)

  // Mock Data
  // await storeNotes(updatedNotes)

  // redirect action
  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks()]
}
