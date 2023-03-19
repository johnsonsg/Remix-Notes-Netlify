import { Link, useLoaderData, useFetcher } from '@remix-run/react'

import { getStoredNotes, deleteNote } from '~/data/notes.server'
import styles from '~/styles/note-details.css'
import { json, redirect } from '@remix-run/node'
import { FaBackward } from 'react-icons/fa'

export default function NoteDetailsPage({ id }) {
  const note = useLoaderData()

  // const fetcher = useFetcher()

  // function deleteExpenseItemHandler() {
  //   const proceed = confirm('Are you sure? Do you want to delete this item?')
  //   if (!proceed) {
  //     return
  //   }
  //   fetcher.submit(null, {
  //     method: 'delete',
  //     action: `/notes/${id}`
  //   })
  // }

  // if (fetcher.state !== 'idle') {
  //   return (
  //     <article className='expense-item locked'>
  //       <p>Deleting...</p>
  //     </article>
  //   )
  // }

  return (
    <main id='note-details'>
      <header>
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
        <nav>
          <Link to='/notes'>
            <FaBackward />
            Back to all Notes
          </Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  )
}

export async function loader({ params }) {
  const notes = await getStoredNotes()
  const noteId = params.noteId
  const selectedNote = notes.find(note => note.id === noteId)

  if (!selectedNote) {
    throw json({ message: 'Note not found' + noteId }, { status: 404 })
  }

  return selectedNote
}

export async function action({ params, request }) {
  const noteId = params.noteId
  if (request.method === 'DELETE') {
    // console.log('DELETE', noteId)
    await deleteNote(noteId)
    return redirect('/notes')
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export function meta({ data }) {
  return {
    title: data.title,
    description: data.content
  }
}
